import React from "react";

import Header from "@/components/app/header";
// import PopupLayout from "@/components/layouts/popupLayput";
import Footer from "@/components/app/footer";
import Link from "next/link";
import Image from "next/image";
import { EMAIL, WHATSAPP_NO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Whatsapp = () => {
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Link href={`mailto:${EMAIL}`} target="_blank">
        <Image
          src="/final_email_icon.jpeg"
          width={60}
          height={60}
          alt="Email"
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100 mx-auto"
          onClick={() => {}}
        />
      </Link>

      <Link href={`https://wa.me/${WHATSAPP_NO}`} target="_blank">
        <Image
          src="/whatsapp.png"
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
      <div className={cn("min-h-[300px] pb-16", className)}>{children}</div>
      <Whatsapp />
      <Footer />
      {/* <PopupLayout /> */}
    </div>
  );
};

export default MainLayout;
