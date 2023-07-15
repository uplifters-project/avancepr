import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import Body from "../components/body";
import PopupLayout from "./popupLayput";
import Gallery from "../components/clientGallery";
import InfiniteScroll from "../components/infiniteScroll";
import Testimonials from "@/components/testimonial";
import News from "@/components/news";
import { Main } from "next/document";
import ServiceItem from './ServiceItem';
import content_marketing from "public/content_marketing.jpg";
import influencer_marketing from "public/influencer_marketing.jpg";
import public_relation from "public/public_relation.jpg";
import social_media_marketing from "public/social_media_marketing.jpg";
import event from "public/event.jpg";


const Halign = ({ children }) => {
  return <div className="flex justify-around p-5 m-10">
    {children}
  </div>
}

const VAlign = ({ children }) => {
  return <div className="flex flex-col m-10 justify-center align-middle justify-items-center p-5 mx-auto">
    {children}
  </div>
}

export default function Home() {
  const Whatsapp = () => {
    return (
      <div className="fixed right-6 bottom-6">
        <Image
          src="/email_icon.jpg"
          width={80}
          height={80}
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100 mx-auto"
          onClick={() => { }}
        />
        <Image
          src="/whatsapp.webp"
          width={80}
          height={80}
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100"
          onClick={() => { }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <Body>
        <Halign>
          {/* <div className="my-5">
            <div className="text-4xl">About Us</div>
          </div>
          <div className="max-w-[40%] text-center">Avance PR is a highly regarded and comprehensive PR agency headquartered in Gurugram. Our core expertise lies in cultivating impactful connections with influencers and crafting effective corporate communications strategies. We take pride in offering a diverse range of campaigns tailored to suit the unique needs of our esteemed clientele. Through strategic media engagement, we diligently work towards enhancing brand personality and reputation, bolstering our clients' market presence.
          </div> */}
          <video className="w-full rounded-xl" autoPlay loop muted src="/creative.mp4" />
        </Halign>

        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-5xl text-center font-bold text-yellow-700">Our Services</div>
            <p class="text-lg text-center text-gray-600">See What we offer </p><br></br>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <ServiceItem
              title='Content Marketing'
              backgroundImg={content_marketing}
              projectUrl=''
              tech='Brand potential unleashed through strategic content marketing.'
            />
            <ServiceItem
              title='Influencer Marketing'
              backgroundImg={influencer_marketing}
              projectUrl=''
              tech='Authentic influencer marketing unlocks brand potential and captivates.'
            />
            <ServiceItem
              title='Public Relation'
              backgroundImg={public_relation}
              projectUrl=''
              tech='Unlocking connections, shaping narratives, building trust.'
            />
            <ServiceItem
              title='Social Media Marketing'
              backgroundImg={social_media_marketing}
              projectUrl=''
              tech='Elevate your brands online presence with strategic social media marketing.'
            />
            <ServiceItem
              title='Event Management'
              backgroundImg={event}
              projectUrl=''
              tech='Creating unforgettable experiences through flawless event management.'
            />
          </div>
        </VAlign>

        <VAlign>
          <div className="mx-auto my-5">
            <h2 class="text-5xl text-center font-bold text-yellow-700">Testimonials</h2>
            <p class="text-lg text-center text-gray-600">What others say about us</p>
          </div>

          <div className="">
            <Testimonials />
          </div>
        </VAlign>
        <InfiniteScroll />
        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-5xl text-center font-bold text-yellow-700">Latest News</div>
            <p class="text-lg text-center text-gray-600">See the Latest News </p><br></br>
          </div>
          <div className="">
            <News />
          </div>
        </VAlign>
      </Body>
      <Whatsapp />
      <Footer />
      <PopupLayout /> {/* Add the Layout component here */}
    </div>
  );
}
