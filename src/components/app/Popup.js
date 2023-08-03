import { submitEnquiryForm } from "@/lib/apis";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const Popup = ({ setShow, open }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [companyName, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await submitEnquiryForm({
        full_name: fullName,
        email: email,
        enquiry: inquiry,
        phone: phone,
        company_name: companyName,
      });

      if (res) {
        toast({
          title: "Form submitted successfully",
          type: "foreground",
        });

        setFullName("");
        setEmail("");
        setInquiry("");
        setCompany("");
        setPhone("");
        handleClose();
      } else {
        throw new Error("Failed to submit form, please enter all the data");
      }
    } catch (e) {
      toast({
        title: "Failed to submit form",
        type: "foreground",
        description:
          e?.message ?? "Failed to submit form, please enter all the data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inquiry</DialogTitle>
          <DialogDescription>Send us your inquiry</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              value={fullName}
              id="fullName"
              onChange={(e) => setFullName(e.target.value)}
              className=""
              placeholder="Enter your Full Name"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=""
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=""
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompany(e.target.value)}
              className=""
              placeholder="Company Name"
              required
            />
          </div>

          <div className="mb-4">
            <Textarea
              type="text"
              rows={5}
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className=""
              placeholder="Write your Inquiry"
            />
          </div>
        </form>

        <DialogFooter>
          <Button onClick={handleSubmit} className="">
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
