import React, { useRef } from "react";
import AliceCarousel, { Responsive } from "react-alice-carousel";
import TestimonialCard from "./cards/testimonial-card";
import "react-alice-carousel/lib/alice-carousel.css";

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
    <div>
      <AliceCarousel
        ref={carouselRef}
        responsive={responsive}
        autoHeight
        autoPlay
        autoPlayInterval={1500}
        infinite
        disableDotsControls
        disableButtonsControls
        controlsStrategy="alternate"
        items={testimonials.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} />
        ))}
      />

      {/* <IconButton
        onClick={(e) => carouselRef.current?.slidePrev(e)}
        style={{
          position: "absolute",
          left: 0,
          top: "calc(50% - 1.5rem)",
        }}
      >
        <Icons />
      </IconButton>

      <IconButton
        onClick={(e) => carouselRef.current?.slideNext(e)}
        style={{
          position: "absolute",
          right: 0,
          top: "calc(50% - 1.5rem)",
        }}
      >
        <KeyboardArrowRightIcon />
      </IconButton> */}
    </div>
  );
};

export default Testimonials;
