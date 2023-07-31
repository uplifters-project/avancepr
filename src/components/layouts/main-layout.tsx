import React from "react";

import Header from "@/components/app/header";
import PopupLayout from "@/components/layouts/popupLayput";
import Body from "../body";
import Footer from "@/components/app/footer";
import Link from "next/link";
import Image from "next/image";
import { EMAIL, WHATSAPP_NO } from "@/lib/constants";

const Whatsapp = () => {
  return (
    <div className="fixed right-6 bottom-6">
      <Link href={`mailto:${EMAIL}`} target="_blank">
        <Image
          src="/email_icon.jpg"
          width={80}
          height={80}
          alt="Email"
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100 mx-auto"
          onClick={() => {}}
        />
      </Link>

      <Link href={`https://wa.me/${WHATSAPP_NO}`} target="_blank">
        <Image
          src="/whatsapp.webp"
          width={80}
          height={80}
          alt="Whatsapp"
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100"
          onClick={() => {}}
        />
      </Link>
    </div>
  );
};

const MainLayout: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div>
      <Header />
      <Body>
        <div className={className}>{children}</div>
      </Body>
      <Whatsapp />
      <Footer />
      <PopupLayout /> {/* Add the Layout component here */}
    </div>
  );
};

export default MainLayout;
