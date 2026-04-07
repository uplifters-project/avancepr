import React, { useRef } from "react";
import AliceCarousel, { Responsive } from "react-alice-carousel";
import TestimonialCard from "../cards/testimonial-card";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from "../ui/button";
import { Icons } from "../icons";

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => {
  const carouselRef = useRef<AliceCarousel>(null);

  if (testimonials.length === 0) {
    return <></>;
  }

  const responsive: Responsive = {
    0: { items: 1 },
    750: { items: 2 },
    1000: { items: 3 },
    1350: {
      items: 4,
    },
  };

  return (
    <div className="relative">
      <AliceCarousel
        ref={carouselRef}
        responsive={responsive}
        autoHeight
        autoPlay={process.env.NODE_ENV === "production"}
        autoPlayInterval={1500}
        infinite
        disableDotsControls
        disableButtonsControls
        controlsStrategy="alternate"
        items={testimonials.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} />
        ))}
      />

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-[calc(50%-1.5rem)] rounded-full"
        onClick={(e) => carouselRef.current?.slidePrev(e)}
      >
        <Icons.arrowLeft />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-[calc(50%-1.5rem)] rounded-full"
        onClick={(e) => carouselRef.current?.slideNext(e)}
      >
        <Icons.arrowRight />
      </Button>
    </div>
  );
};

export default Testimonials;
