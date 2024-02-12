import Testimonials from "@/components/home/testimonial";
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
import { EXTERNAL_IMAGES, REVALIDATE_TIME } from "@/lib/constants";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

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
        "flex flex-col justify-center my-[1.5%]",
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

type HomeProps = {
  testimonials: Testimonial[];
  work: Work[];
  clients: Client[];
  news: News[];
};

export default function Home({
  testimonials = [],
  clients = [],
  work = [],
  news = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout>
      <div className="p-0 md:p-5 mx-4 my-5 md:my-0">
        <video
          className="w-full xl:max-h-[85vh] xl:w-auto mx-auto rounded-xl shadow-xl animate-pulse object-cover"
          autoPlay
          loop
          muted
          src={EXTERNAL_IMAGES.CREATIVE}
          // style={{ width: "150%" }}
        />
      </div>

      {/* Services */}
      <HomeSection
        id="services"
        heading="Our Services"
        label="What others say about us"
      >
        <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
          {servicesData.map((item, i) => (
            <ServiceCard key={i} {...item} />
          ))}
        </div>
      </HomeSection>

      {/* Clients */}
      <HomeSection id="clients" heading="Our Clients" label="" full={true}>
        <ClientCarousel clients={clients} rowCount={2} />
      </HomeSection>

      {/* Our Work */}
      <HomeSection id="work" heading="Our Work" label="">
        <OurWork workItems={work} />
      </HomeSection>

      {/* Testimonials */}
      <HomeSection
        id="testimonials"
        heading="Testimonials"
        label="What others say about us"
      >
        <Testimonials testimonials={testimonials} />
      </HomeSection>

      {/* Featured */}
      <HomeSection id="featured" heading="We got Featured" label="">
        <Featured newsItems={news} />
      </HomeSection>
    </MainLayout>
  );
}

export const getStaticProps = (async (context) => {
  const [testimonials, work, clients, news] = await Promise.all([
    getTestimonials(),
    getOurWork(),
    getOurClients(),
    getLatestNews(),
  ]);

  return {
    props: { testimonials, work, clients, news },
    revalidate: REVALIDATE_TIME.HOME_PAGE,
  };
}) satisfies GetStaticProps<HomeProps>;
