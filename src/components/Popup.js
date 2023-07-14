import React, { useState } from "react";


const Popup = ({ setShow }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [companyName, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // You can send the form data to your backend or perform any other actions
    console.log("Form submitted:", { fullName, email, inquiry });
    // Reset form fields
    setFullName("");
    setEmail("");
    setInquiry("");
  };
  const handleClose = () => {
    // Close the form
    setIsFormOpen(false);
    setShow(false);
  };

  if (!isFormOpen) {
    // Render null if form is closed
    return null;
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-20 rounded-lg shadow-md">
        <div className="relative">
          <div className="absolute -top-10 -right-16 mr-16 pt-10 font-bold cursor-pointer text-2xl" onClick={handleClose}>
            x
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Send us your inquiry 👋 </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border py-2 px-2 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Enter your full name"
              required
              
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border py-2 px-3 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border py-2 px-3 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border py-2 px-3 border-2 rounded-lg p-3 flex border-yellow-500"
              placeholder="Company Name"
              required
            />
          </div>


          <div className="mb-4">
            <input
              type="text"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="w-full border py-9 px-20 border-2 rounded-lg p-3 flex border-yellow-500"
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

