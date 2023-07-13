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

const services = [
  "/content_marketing.jpg",
  "/influencer_marketing.jpg",
  "/public_relation.jpg",
  "/social_media_marketing.jpg",
  "/event.jpg",
  "/content_marketing.jpg",
  "/influencer_marketing.jpg",
  "/public_relation.jpg",
]

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
          src="/email.png"
          width={40}
          height={40}
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100 mx-auto"
          onClick={() => { }}
        />
        <Image
          src="/whatsapp.webp"
          width={52}
          height={52}
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
            <div className="text-4xl">Our Services</div>
          </div>
          {/* <div className="max-w-[40%] text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> */}
          <div className="grid grid-cols-4 mx-auto rounded-2xl overflow-clip">
            {
              services.map((item, index) => {
                return <div className="">
                  <Image src={item} width={300} height={300} className="" />
                </div>
              })
            }
          </div>
        </VAlign>
        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-4xl">Clients' Testimonials</div>
          </div>
          <div className="">
            <Testimonials />
          </div>
        </VAlign>
        <InfiniteScroll />
        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-4xl">Latest News</div>
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
