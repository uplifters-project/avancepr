import React, { useState } from "react";

const Popup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
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
  };

  if (!isFormOpen) {
    // Render null if form is closed
    return null;
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-20 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send us your inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
            <input
              type="email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter your Phone Number"
              required
            />
          </div>
          

          <div className="mb-4">
            <input
              type="text"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="w-full border border-gray-300 rounded py-10 px-7"
              placeholder="Write your inquiry"
              required
            />
          </div>
          <div className="flex justify-end">
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Send Request
              </button>
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Close Request
              </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Popup;
