import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const data = [
    {
        src: "/content_marketing.jpg",
        text: "Content Marketing"
    },
    {
        src: "/influencer_marketing.jpg",
        text: "Influencer Marketing"
    },
    {
        src: "/public_relation.jpg",
        text: "Public Relations"
    },
    {
        src: "/social_media_marketing.jpg",
        text: "Social Media Marketing"
    },
    {
        src: "/event.jpg",
        text: "Event Marketing"
    },
]

export default function Gallery() {
    return <div className="w-[90%] mx-auto rounded-xl">
        {/* <div className="font-bold text-5xl m-5 mt-10 text-center">
            Client Gallery
        </div> */}
        <Carousel emulateTouch infiniteLoop autoPlay className='my-10'>
            {
                data.map((item, index) => {
                    return <div id={index} className="mx-5">
                        <Image src={item.src} width={1600} height={800} className="rounded-xl" />
                        <p className="legend">{item.text}</p>
                    </div>
                })
            }
        </Carousel>
    </div>
}