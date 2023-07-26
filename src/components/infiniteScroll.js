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

export default function InfiniteScroll() {
  return (
    <div className="overflow-clip">
      <div className="text-5xl text-center font-bold text-yellow-700">
        Our Clients
      </div>
      <p class="text-lg text-center text-gray-600">Meet our Clients </p>
      <br />
      <article>
        <div>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <Image src={item.src} width={item.width} height={item.height} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {moreData.map((item, index) => (
              <li key={index}>
                <Image src={item.src} width={item.width} height={item.height} />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
