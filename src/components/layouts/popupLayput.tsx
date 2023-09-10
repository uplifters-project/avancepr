import React, { useState, useEffect } from "react";
import Popup from "@/components/app/Popup";

const POPUP_TIMEOUT_1 = 10_000;
const POPUP_TIMEOUT_2 = 60_000;

const PopupLayout = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowPopup(true && sessionStorage.getItem("POPUP") !== "0");
      sessionStorage.setItem("POPUP", "0");
    }, POPUP_TIMEOUT_1);

    const timer2 = setTimeout(() => {
      setShowPopup(true && sessionStorage.getItem("POPUP") !== "1");
      sessionStorage.setItem("POPUP", "1");
    }, POPUP_TIMEOUT_2);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return <div>{<Popup setShow={setShowPopup} open={showPopup} />}</div>;
};

export default PopupLayout;
