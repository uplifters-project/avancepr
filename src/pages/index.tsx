import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import Body from "../components/body";
import PopupLayout from "./popupLayput";
import Gallery from "../components/clientGallery";
import Testimonials from "@/components/home/testimonial";
import News from "@/components/home/featured";
import ServiceItem from "../components/ServiceItem";
import Link from "next/link";
import { WHATSAPP_NO, EMAIL } from "../lib/constants";

/* importing the Images */
import content_marketing from "public/images/content_marketing2.jpg";
import influencer_marketing from "public/images/influencer_marketing.jpg";
import public_relation from "public/images/public_relation.jpg";
import social_media_marketing from "public/images/social_media_marketing.jpg";
import event from "public/event.jpg";
import { useEffect, useState } from "react";
import {
  getLatestNews,
  getOurClients,
  getOurWork,
  getTestimonials,
} from "../lib/apis";
import ClientCarousel from "@/components/home/client-carousel";
import WorkCard from "@/components/cards/work-card";
import OurWork from "@/components/home/work";
import Featured from "@/components/home/featured";

const Halign: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex justify-around p-5 m-10">{children}</div>;
};

const VAlign: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col m-10 justify-center align-middle justify-items-center p-5 mx-auto">
      {children}
    </div>
  );
};

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [work, setWork] = useState<Work[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const testimonials = await getTestimonials();
      const work = await getOurWork();
      const clients = await getOurClients();
      const news = await getLatestNews();

      setTestimonials(testimonials);
      setWork(work);
      setClients(clients);
      setNews(news);
    };

    loadData();
  }, []);

  const Whatsapp = () => {
    return (
      <div className="fixed right-6 bottom-6">
        <Link href={`mailto:${EMAIL}`} target="_blank">
          <Image
            src="/email_icon.jpg"
            width={80}
            height={80}
            alt="Email"
            className="cursor-pointer hover:drop-shadow-md transition-all duration-100 mx-auto"
            onClick={() => {}}
          />
        </Link>

        <Link href={`https://wa.me/${WHATSAPP_NO}`} target="_blank">
          <Image
            src="/whatsapp.webp"
            width={80}
            height={80}
            alt="Whatsapp"
            className="cursor-pointer hover:drop-shadow-md transition-all duration-100"
            onClick={() => {}}
          />
        </Link>
      </div>
    );
  };

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
          <video
            className="w-full rounded-xl shadow-xl animate-pulse"
            autoPlay
            loop
            muted
            src="/creative.mp4"
          />
        </Halign>

        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-5xl text-center font-bold text-yellow-700">
              Our Services
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 ">
            <ServiceItem
              title="Content Marketing"
              backgroundImg={content_marketing}
              projectUrl=""
            />
            <ServiceItem
              title="Influencer Marketing"
              backgroundImg={influencer_marketing}
              projectUrl=""
            />
            <ServiceItem
              title="Public Relation"
              backgroundImg={public_relation}
              projectUrl=""
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8 w-[66%] mx-auto my-8 ">
            <ServiceItem
              title="Social Media Marketing"
              backgroundImg={social_media_marketing}
              projectUrl=""
            />
            <ServiceItem
              title="Event Management"
              backgroundImg={event}
              projectUrl=""
            />
          </div>
        </VAlign>

        {/* Testimonials */}
        <VAlign>
          <div className="mx-auto my-5">
            <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
              Testimonials
            </h2>
            <p className="text-lg text-center text-gray-600">
              What others say about us
            </p>
          </div>

          <Testimonials testimonials={testimonials} />
        </VAlign>

        {/* Clients */}
        <VAlign>
          <div className="mx-auto my-5">
            <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
              Out Clients
            </h2>
            <p className="text-lg text-center text-gray-600">
              What Clients say about us
            </p>
          </div>

          <ClientCarousel clients={...clients} rowCount={2} />
        </VAlign>

        <br></br>

        {/* Our Work */}
        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-5xl text-center font-bold text-yellow-700">
              Our Work
            </div>
            <br></br>
          </div>

          <OurWork workItems={work} />
        </VAlign>

        <br></br>

        {/* Featured */}
        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-5xl text-center font-bold text-yellow-700">
              We got Featured
            </div>
            <br></br>
          </div>
          <div className="">
            <Featured newsItems={news} />
          </div>
        </VAlign>
      </Body>
      <Whatsapp />
      <Footer />
      <PopupLayout /> {/* Add the Layout component here */}
    </div>
  );
}
