import React, { useRef } from "react";
import AliceCarousel, { Responsive } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import NewsCard from "../cards/news-card";

const Featured: React.FC<{ newsItems: News[] }> = ({ newsItems }) => {
  const carouselRef = useRef<AliceCarousel>(null);

  if (newsItems.length === 0) {
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
    <div className="relative h-100">
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
        items={newsItems.map((news) => (
          <NewsCard news={news} />
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

export default Featured;
