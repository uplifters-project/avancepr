import React, { useState } from "react";

const Popup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send us your inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Your full name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Your email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">What you are looking for:</label>
            <input
              type="text"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter your inquiry"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
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
