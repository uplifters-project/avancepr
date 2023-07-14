import Image from "next/image"

const data = [
    "/content_marketing.jpg",
    "/influencer_marketing.jpg",
    "/public_relation.jpg",
    "/social_media_marketing.jpg",
    "/event.jpg",
]

export default function InfiniteScroll() {
    return <div className=" overflow-clip">
        <div className="text-5xl text-center font-bold text-yellow-700">
            Our Clients
        </div>
        <p class="text-lg text-center text-gray-600">Meet our Clients </p><br></br>
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
                    <li><img src="/influencer_marketing.jpg" /></li>
                    <li><img src="/content_marketing.jpg" /></li>
                    <li><img src="/public_relation.jpg" /></li>
                    <li><img src="/event.jpg" /></li>
                </ul>
            </div>
        </article>
    </div>
}