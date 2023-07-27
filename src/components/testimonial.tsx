import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState, useEffect } from "react";

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => {
  const Testimonial = () => {
    return (
      <div className="flex flex-col  m-1 rounded-xl p-10 mx-5">
        {
          <>
            <div className="mb-8 text-center"></div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-x-2">
              {testimonials.map((testimonial) => {
                return (
                  <div className="p-4 text-gray-800 rounded-lg shadow-lg w-full">
                    <div className="mb-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                          <img
                            src={testimonial.image}
                            alt="img"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                        <h5 className="font-bold text-indigo-600">
                          {testimonial.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {testimonial.designation}
                        </p>
                      </div>
                      <p className="mb-2 text-center text-gray-600 ">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        }
      </div>
    );
  };

  return (
    <Carousel emulateTouch infiniteLoop className="w-2/3 mx-auto">
      <Testimonial />
      <Testimonial />
    </Carousel>
  );
};

export default Testimonials;
