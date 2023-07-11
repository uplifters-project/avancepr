import Image from "next/image"

const data = [
    "http://dummyimage.com/600x400/000000/ffffff.png",
    "http://dummyimage.com/600x400/eeeeee/cccccc.png",
    "http://dummyimage.com/600x400/000000/ffffff.png",
    "http://dummyimage.com/600x400/eeeeee/cccccc.png",
]

export default function InfiniteScroll() {
    return <div className=" overflow-clip">
        <div className="text-center text-4xl m-10">
            Our Clients
        </div>
        <article>
            <div>
                <ul>
                    {
                        data.map((item, index) => {
                            return <li key={index}>
                                <Image src={item} width={600} height={400} />
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <ul>
                    <li><img src="http://dummyimage.com/600x400/000000/ffffff.png" /></li>
                    <li><img src="http://dummyimage.com/600x400/eeeeee/cccccc.png" /></li>
                    <li><img src="http://dummyimage.com/600x400/000000/ffffff.png" /></li>
                    <li><img src="http://dummyimage.com/600x400/eeeeee/cccccc.png" /></li>
                </ul>
            </div>
        </article>
    </div>
}