import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTestimonials = async () => {
            const res = await fetch("/api/testimonial/get");
            const data = await res.json();
            if (data.status === "success") {
                setTestimonials([])
                console.log(data.data)
                for (var i in data.data) {
                    setTestimonials((testimonials) => [...testimonials, data.data[i]])
                }
            }
            setLoading(false);
        };
        getTestimonials();
    }, []);

    const Testimonial = () => {
        return <div className="flex flex-col  m-1 rounded-xl p-10 mx-5">
            {
                <><div class="mb-8 text-center">
                </div><div class="lg:grid lg:grid-cols-3 lg:gap-x-2">
                        {
                            testimonials.map((testimonial) => {
                                return <div class="p-4 text-gray-800 rounded-lg shadow-md">
                                    <div class="mb-2">
                                        <p class="mb-2 text-center text-gray-600 ">
                                            " {testimonial.message} "
                                        </p>
                                        <div class="flex flex-col items-center justify-center">
                                            <div class="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                                                <img src={testimonial.image} alt="img"
                                                    class="object-cover object-center w-full h-full" />
                                            </div>
                                            <h5 class="font-bold text-indigo-600">{testimonial.name}</h5>
                                            <p class="text-sm text-gray-600">{testimonial.subtext}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }


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