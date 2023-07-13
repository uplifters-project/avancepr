import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function News() {
    const Testimonial = () => {
        return <div className="flex flex-col w-fit ring-1 ring-black/50 m-1 rounded-xl p-10 mx-auto">
            {/* <Image src="/testimonials/person1.png" width={256} height={256} className="h-[100px] w-[100px]" /> */}
            <div>
                <div className="font-semibold text-3xl">Title</div>
                <br />
                <div>
                    Description
                </div>
            </div>
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