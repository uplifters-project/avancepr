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
        >
          {rowImages.map((client) => (
            <div key={client.id} className="h-28 w-48 inline-block my-0 mx-8">
              <img
                src={client.image}
                alt="Client Image"
                // fill
                style={{
                  objectFit: "contain",
                }}
                className="h-full w-auto relative p-2"
              />
            </div>
          ))}
        </Marquee>
      ))}
    </div>
  );
};

export default ClientCarousel;
