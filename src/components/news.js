import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NewsItem from "../pages/NewsItem";
import content_marketing from "public/content_marketing.jpg";
import influencer_marketing from "public/influencer_marketing.jpg";
import public_relation from "public/public_relation.jpg";

export default function News() {
  const Testimonial = () => {
    return (
      <div className="">
        {
          <div className="grid md:grid-cols-3 gap-8">
            <NewsItem title="News 1" backgroundImg={content_marketing} />
            <NewsItem title="News 2" backgroundImg={influencer_marketing} />
            <NewsItem title="News 3" backgroundImg={public_relation} />
          </div>
        }
      </div>
    );
  };

  return (
    <Carousel
      emulateTouch
      infiniteLoop
      autoPlay // Enable autoplay for the moving carousel
      interval={3000} // Set the interval for each slide in milliseconds (e.g., 3000 ms = 3 seconds)
      className="w-2/3 mx-auto"
    >
      <Testimonial />
      <Testimonial />
      <Testimonial />
    </Carousel>
  );
}
