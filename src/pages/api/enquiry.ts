import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Record<string, string>;

function validate(body: any): { errors: FieldErrors; data: EnquiryFormType } {
  const errors: FieldErrors = {};

  const full_name = typeof body?.full_name === "string" ? body.full_name.trim() : "";
  if (!full_name) errors.full_name = "This field is required.";
  else if (full_name.length > 100) errors.full_name = "Ensure this field has no more than 100 characters.";

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!email) errors.email = "This field is required.";
  else if (email.length > 254) errors.email = "Ensure this field has no more than 254 characters.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  if (!phone) errors.phone = "This field is required.";
  else if (phone.length > 20) errors.phone = "Ensure this field has no more than 20 characters.";

  const company_name = typeof body?.company_name === "string" ? body.company_name.trim() : "";
  if (company_name.length > 50) errors.company_name = "Ensure this field has no more than 50 characters.";

  const enquiry = typeof body?.enquiry === "string" ? body.enquiry : "";

  return {
    errors,
    data: { full_name, email, phone, company_name, enquiry },
  };
}

async function notifyTelegram(data: EnquiryFormType) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) return;

  const text =
    `Enquiry Requested By\n` +
    `Name: ${data.full_name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n` +
    `Company Name: ${data.company_name}\n` +
    `Enquiry: ${data.enquiry}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    // A Telegram outage should never fail the enquiry submission itself.
    console.error("[enquiry] Telegram notification failed", err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: 'Method "' + req.method + '" not allowed.' });
  }

  const { errors, data } = validate(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const { error } = await supabaseAdmin.from("main_enquiry").insert({
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    company_name: data.company_name || null,
    enquiry: data.enquiry,
  });

  if (error) {
    console.error("[enquiry] insert failed", error);
    return res.status(500).json({ detail: "Failed to save enquiry." });
  }

  await notifyTelegram(data);

  return res.status(200).json({ ok: true });
}
