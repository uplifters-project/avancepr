import React from "react";
import MainLayout from "./main-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ServicePageLaypout: React.FC<{
  heading: string;
  label: string;
  title: string;
  description: string;
  image: string;
  data: {
    heading: string;
    text: string;
  }[];
  children: React.ReactNode;
  className?: string;
  useOnlyChild?: boolean;
  textRightPadding?: boolean;
}> = ({
  heading,
  label,
  description,
  image,
  data,
  title,
  children,
  className,
  useOnlyChild = false,
  textRightPadding = false,
}) => {
  return (
    <MainLayout className={cn("container pt-16 pb-24", className)}>
      <div className="mb-12">
        <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
          {heading}
        </h2>

        <p className="text-lg text-center text-gray-600 mt-2">{label}</p>
      </div>

      <div className="grid grid-cols-3 gap-5 items-center my-8">
        <div
          className={cn(
            "col-span-3 md:col-span-2 md:text-left pr-8",
            !description ? "w-0 hidden" : ""
          )}
        >
          <h1 className="font-heading text-4xl mb-3">{title}</h1>

          <p>{description}</p>
        </div>

        <div
          className={cn(
            "col-span-3 md:col-span-1",
            !description ? "w-full text-center" : ""
          )}
        >
          <Image
            src={image}
            width={612}
            height={408}
            alt="Content Marketing"
            className="mx-auto"
          />
        </div>
      </div>

      {!useOnlyChild && (
        <div className="w-full mt-16 text-gray-500 grid grid-cols-3 justify-center gap-4">
          {data.map((item) => {
            return (
              <div className="col-span-3 md:col-span-1 flex flex-col md:text-left">
                <div className="flex justify-start md:justify-start items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>

                  <h3 className="font-heading text-2xl font-bold">
                    {item.heading}
                  </h3>
                </div>

                <p
                  className={cn("mb-6", textRightPadding ? "pl-7 md:pl-0" : "")}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {children}
    </MainLayout>
  );
};

export default ServicePageLaypout;
