import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function Testimonials() {
    const Testimonial = () => {
        return <div className="flex flex-col  m-1 rounded-xl p-10 mx-5">
            {
                <><div class="mb-8 text-center">
                </div><div class="lg:grid lg:grid-cols-3 lg:gap-x-2">
                        <div class="p-4 text-gray-800 rounded-lg shadow-md">
                            <div class="mb-2">
                                <p class="mb-2 text-center text-gray-600 ">
                                    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                                </p>
                                <div class="flex flex-col items-center justify-center">
                                    <div class="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                                        <img src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg" alt="img"
                                            class="object-cover object-center w-full h-full" />
                                    </div>
                                    <h5 class="font-bold text-indigo-600">John Doe</h5>
                                    <p class="text-sm text-gray-600">CEO / Founder</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 text-gray-800 rounded-lg shadow-md">
                            <div class="mb-2">
                                <p class="mb-2 text-center text-gray-600 ">
                                    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                                </p>
                                <div class="flex flex-col items-center justify-center">
                                    <div class="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                                        <img src="https://cdn.pixabay.com/photo/2021/07/14/17/32/manager-6466713__340.jpg" alt="img"
                                            class="object-cover object-center w-full h-full" />
                                    </div>
                                    <h5 class="font-bold text-indigo-600">michael james</h5>
                                    <p class="text-sm text-gray-600">web developer</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 text-gray-800 rounded-lg shadow-md">
                            <div class="mb-2">
                                <p class="mb-2 text-center text-gray-600 ">
                                    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                                </p>
                                <div class="flex flex-col items-center justify-center">
                                    <div class="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                                        <img src="https://cdn.pixabay.com/photo/2021/07/14/17/32/manager-6466713__340.jpg" alt="img"
                                            class="object-cover object-center w-full h-full" />
                                    </div>
                                    <h5 class="font-bold text-indigo-600">michael james</h5>
                                    <p class="text-sm text-gray-600">web developer</p>
                                </div>
                            </div>
                        </div>
                    </div></>
            }
        </div>

    }

    return (
        <Carousel
            emulateTouch infiniteLoop
            className="w-2/3 mx-auto"
        >
            <Testimonial />
            <Testimonial />
            <Testimonial />
        </Carousel>
    );
}