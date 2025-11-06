import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import NewsCard from "../cards/news-card";

interface FeaturedProps {
  newsItems: News[];
}

const Featured: React.FC<FeaturedProps> = ({ newsItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  if (newsItems.length === 0) {
    return null;
  }

  // Calculate items per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1350) setItemsPerView(4);
      else if (width >= 1000) setItemsPerView(3);
      else if (width >= 750) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto play functionality
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 1500);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [currentIndex, itemsPerView]);

  const maxIndex = Math.max(0, newsItems.length - itemsPerView);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      // Infinite loop: go to last set when at beginning
      if (prev === 0) return maxIndex;
      return prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, maxIndex]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      // Infinite loop: go to first when at end
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, maxIndex]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartRef.current === 0) return;
    touchEndRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (touchStartRef.current === 0) return;
    const swipeDistance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  const translateValue = -(currentIndex * (100 / itemsPerView));

  return (
    <div className="relative min-h-[400px]">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${translateValue}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {newsItems.map((news, index) => (
            <div
              key={news.id || index}
              className="flex-shrink-0 px-2"
              style={{
                width: `${100 / itemsPerView}%`,
              }}
            >
              <NewsCard news={news} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-[calc(50%-1.5rem)] rounded-full z-10 bg-white hover:bg-gray-100"
        onClick={handlePrev}
        disabled={isTransitioning}
      >
        <Icons.arrowLeft />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-[calc(50%-1.5rem)] rounded-full z-10 bg-white hover:bg-gray-100"
        onClick={handleNext}
        disabled={isTransitioning}
      >
        <Icons.arrowRight />
      </Button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 300);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-yellow-700 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;