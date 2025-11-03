import { submitEnquiryForm } from "@/lib/apis";
import React, { FormEventHandler, useState } from "react";
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

const Popup: React.FC<{
  open: boolean;
  setShow: (val: boolean) => void;
}> = ({ setShow, open }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [companyName, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
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
    } catch (e: any) {
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
      <DialogContent className="border-black shadow-lg shadow-yellow-700 md:shadow-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="">
            <DialogTitle className="text-yellow-700">
              Get Free PR Strategy Consultation
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="mb-4 ">
            <Input
              type="text"
              value={fullName}
              id="fullName"
              onChange={(e) => setFullName(e.target.value)}
              className="border-yellow-700"
              placeholder="Enter your Full Name"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-yellow-700"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-yellow-700"
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompany(e.target.value)}
              className="border-yellow-700"
              placeholder="Company Name"
              required
            />
          </div>

          <div className="mb-4">
            <Textarea
              rows={5}
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="border-yellow-700"
              placeholder="Write your Inquiry"
            />
          </div>

          <DialogFooter className="flex flex-col justify-center">
            <Button
              type="submit"
              className=" bg-yellow-700  hover:bg-yellow-600 text-sm"
            >
              Send Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
