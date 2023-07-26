import Image from "next/image";

const data = [
  { src: "/images/Aarika_logo.png", width: 200, height: 200 },
  { src: "/images/alippo_logo.png", width: 200, height: 200 },
  { src: "/images/Amara_logo.jpeg", width: 200, height: 200 },
  { src: "/images/client_logo.png", width: 200, height: 200 },
];

const moreData = [
  { src: "/images/hostbook_Logo.jpg", width: 200, height: 200 },
  { src: "/images/ramp_vertical.png", width: 200, height: 200 },
  { src: "/images/SC_logo.png", width: 200, height: 200 },
  { src: "/images/uplifters_logo.png", width: 200, height: 200 },
];

const InfiniteScroll: React.FC<{
  clients: Client[];
}> = ({ clients }) => {
  return (
    <div className="overflow-clip">
      <div className="text-5xl text-center font-bold text-yellow-700">
        Our Clients
      </div>
      <p className="text-lg text-center text-gray-600">
        What Clients say about us{" "}
      </p>
      <br />
      <article>
        <div>
          <ul>
            {clients.map((item, index) => (
              <li key={index}>
                <img src={item.image} />
              </li>
            ))}
          </ul>
        </div>

        {/* <div>
          <ul>
            {moreData.map((item, index) => (
              <li key={index}>
                <img src={item.src} width={item.width} height={item.height} />
              </li>
            ))}
          </ul>
        </div> */}
      </article>
    </div>
  );
};

export default InfiniteScroll;
