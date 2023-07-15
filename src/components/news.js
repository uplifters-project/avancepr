import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import NewsItem from '../pages/NewsItem';
import content_marketing from "public/content_marketing.jpg";
import influencer_marketing from "public/influencer_marketing.jpg";
import public_relation from "public/public_relation.jpg";
import social_media_marketing from "public/social_media_marketing.jpg";
import event from "public/event.jpg";

export default function News() {
    const Testimonial = () => {
        return <div className="">
            {
                <div className='grid md:grid-cols-3 gap-8'>
                <NewsItem
                  title='News 1'
                  backgroundImg={content_marketing}
                  
                />
                <NewsItem
                  title='News 2'
                  backgroundImg={influencer_marketing}
                  
                />
                <NewsItem
                  title='News 3'
                  backgroundImg={public_relation}
                  
                />
              </div>
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