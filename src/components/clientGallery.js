import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const data = [
    {
        src: "https://dummyimage.com/1600x800/aaaaaa/ffffff.png",
        text: "item 1 text"
    },
    {
        src: "https://dummyimage.com/1600x800/aaaaaa/000000.png",
        text: "item 2 text"
    },
    {
        src: "https://dummyimage.com/1600x800/aaaaaa/ffffff.png",
        text: "item 3 text"
    },
    {
        src: "https://dummyimage.com/1600x800/aaaaaa/000000.png",
        text: "item 4 text"
    },
]

export default function Gallery() {
    return <div className="w-[90%] mx-auto rounded-xl">
        {/* <div className="font-bold text-5xl m-5 mt-10 text-center">
            Client Gallery
        </div> */}
        <Carousel emulateTouch infiniteLoop autoPlay className='my-10'>
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