import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface ClientCarouselProps {
  clients: Client[];
  rowCount?: number;
}

const ClientCarousel: React.FC<ClientCarouselProps> = ({
  clients,
  rowCount = 3,
}) => {
  const imagesPerRow = clients.length / rowCount;
  const rows: any = [];

  for (let i = 0; i < rowCount; i++) {
    const startIndex = i * imagesPerRow;
    const endIndex = startIndex + imagesPerRow;

    const rowImages = clients.slice(startIndex, endIndex);

    rows.push(rowImages);
  }

  return (
    <div className="flex flex-col items-start overflow-hidden">
      {rows.map((rowImages: Client[], rowIndex: number) => (
        <Marquee
          key={rowIndex}
          direction={rowIndex % 2 === 0 ? "right" : "left"}
          pauseOnHover
          autoFill
          speed={100}
          // play={process.env.NODE_ENV === "production"}
        >
          {rowImages.map((client) => (
            <div
              key={client.id}
              className="h-42 w-48 inline-flex items-center justify-center my-auto mx-8"
            >
              <Image
                src={client.image}
                alt="Client Image"
                width={192}
                height={168}
                className="h-full w-auto relative p-2 object-contain"
              />
            </div>
          ))}
        </Marquee>
      ))}
    </div>
  );
};

export default ClientCarousel;
