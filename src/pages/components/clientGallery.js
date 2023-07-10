import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const data = [
    {
        src: "/banner.webp",
        text: "item 1 text"
    },
    {
        src: "/banner.webp",
        text: "item 2 text"
    },
    {
        src: "/banner.webp",
        text: "item 3 text"
    }
]

export default function Gallery() {
    return <div className="w-[90%] mx-auto rounded-xl">
        <Carousel emulateTouch infiniteLoop>
            {
                data.map((item, index) => {
                    return <div id={index} className="mx-5">
                        <Image src={item.src} width={1600} height={800} className="rounded-xl" />
                        <p className="legend">{item.text}</p>
                    </div>
                })
            }
        </Carousel>
    </div>
}