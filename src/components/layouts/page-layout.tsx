import React from "react";
import MainLayout from "./main-layout";
import { cn } from "@/lib/utils";

const PageLaypout: React.FC<{
  heading: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ heading, label, children, className }) => {
  return (
    <MainLayout className={cn("container pt-16 pb-24", className)}>
      <div className="mb-12">
        <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
          {heading}
        </h2>

        <p className="text-lg text-center text-gray-600 mt-2">{label}</p>
      </div>

      {children}
    </MainLayout>
  );
};

export default PageLaypout;
