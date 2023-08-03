import React, { useState, useEffect } from "react";
import Popup from "@/components/app/Popup";

const PopupLayout = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div>{<Popup setShow={setShowPopup} open={showPopup} />}</div>;
};

export default PopupLayout;
