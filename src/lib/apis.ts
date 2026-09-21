// Client-safe: called from the browser (form submit handlers), so this
// module must never import src/lib/supabase.ts or anything else that reads
// server-only env vars — see src/lib/queries.ts for the Supabase-backed
// server-only fetchers used in getStaticProps.

const submitEnquiryForm = async (data: EnquiryFormType): Promise<boolean> => {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.ok;
  } catch (e) {
    return false;
  }
};

export { submitEnquiryForm };
