import Testimonials from "@/components/home/testimonial";

import { useEffect, useState } from "react";
import {
  getLatestNews,
  getOurClients,
  getOurWork,
  getTestimonials,
} from "../lib/apis";
import ClientCarousel from "@/components/home/client-carousel";
import OurWork from "@/components/home/work";
import Featured from "@/components/home/featured";
import MainLayout from "@/components/layouts/main-layout";
import ServiceCard from "@/components/cards/service-card";
import { servicesData } from "@/lib/data";
import { cn } from "@/lib/utils";

const HomeSection: React.FC<{
  id: string;
  heading: string;
  label: string;
  children: React.ReactNode;
  full?: boolean;
}> = ({ id, heading, label, children, full = false }) => {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col justify-center my-[5%]",
        full ? "" : "container"
      )}
    >
      <div className="mx-auto mt-12 mb-8">
        <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
          {heading}
        </h2>

        <p className="text-lg text-center text-gray-600 mt-2">{label}</p>
      </div>

      {children}
    </section>
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

  return (
    <MainLayout>
      <div className="p-5 m-10">
        <video
          className="w-full rounded-xl shadow-xl animate-pulse"
          autoPlay
          loop
          muted
          src="/creative.mp4"
        />
      </div>

      {/* Services */}
      <HomeSection
        id="services"
        heading="Our Services"
        label="What others say about us"
      >
        <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
          {servicesData.map((item) => (
            <ServiceCard {...item} />
          ))}
        </div>
      </HomeSection>

      {/* Testimonials */}
      <HomeSection
        id="testimonials"
        heading="Testimonials"
        label="What others say about us"
      >
        <Testimonials testimonials={testimonials} />
      </HomeSection>

      {/* Clients */}
      <HomeSection
        id="clients"
        heading="Our Clients"
        label="What Clients say about us"
        full={true}
      >
        <ClientCarousel clients={...clients} rowCount={2} />
      </HomeSection>

      {/* Our Work */}
      <HomeSection id="work" heading="Our Work" label="">
        <OurWork workItems={work} />
      </HomeSection>

      {/* Featured */}
      <HomeSection id="featured" heading="We got Featured" label="">
        <Featured newsItems={news} />
      </HomeSection>
    </MainLayout>
  );
}
