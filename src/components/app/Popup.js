import { submitEnquiryForm } from "@/lib/apis";
import React, { useState } from "react";
import { toast } from "../ui/use-toast";

const Popup = ({ setShow }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [companyName, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true);
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

      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setShow(false);
  };

  if (!isFormOpen) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-20 rounded-lg shadow-md">
        <div className="relative">
          <div
            className="absolute -top-10 -right-16 mr-16 pt-10 font-bold cursor-pointer text-2xl"
            onClick={handleClose}
          >
            x
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Send us your inquiry 👋{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full py-2 px-2 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-2 px-3 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full py-2 px-3 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Company Name"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="w-full py-9 px-20 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Write your inquiry"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#FF9F00] hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
