import React, { useState, useEffect } from "react";
import Popup from "./components/Popup";

const Layout = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {/* Rest of your layout code */}
      {showPopup && <Popup />}
    </div>
  );
};

export default Layout;
