import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NewsItem from "../../pages/NewsItem";

const News: React.FC<{
  newsItems: News[];
}> = ({ newsItems }) => {
  const Testimonial = () => {
    return (
      <div className="">
        {
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <NewsItem title={item.content} backgroundImg={item.image} />
            ))}
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
};

export default News;
