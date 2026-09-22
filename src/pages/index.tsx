import Testimonials from "@/components/home/testimonial";
import {
  getLatestNews,
  getOurClients,
  getOurWork,
  getTestimonials,
  getAwards
} from "@/lib/queries";
import ClientCarousel from "@/components/home/client-carousel";
import OurWork from "@/components/home/work";
import Featured from "@/components/home/featured";
import MainLayout from "@/components/layouts/main-layout";
import ServiceCard from "@/components/cards/service-card";
import { servicesData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EXTERNAL_IMAGES, REVALIDATE_TIME } from "@/lib/constants";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { FormEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { submitEnquiryForm } from "@/lib/apis";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Head from "next/head";
import { useAtom } from "jotai";
import { showPopupAtom } from "@/atom/index.atom";

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
      <div className="mx-auto mt-12 mb-10">
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
  awards = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [companyName, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [,setShowPopup] = useAtom(showPopupAtom);


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await submitEnquiryForm({
        full_name: fullName,
        email: email,
        enquiry: inquiry,
        phone: phone,
        company_name: companyName,
      });

      if (res) {
        toast({
          title: "Form submitted successfully",
          type: "foreground",
        });

        setFullName("");
        setEmail("");
        setInquiry("");
        setCompany("");
        setPhone("");

        //redirect to thank you page
        window.location.href = "/thank-you";
      } else {
        throw new Error("Failed to submit form, please enter all the data");
      }
    } catch (e: any) {
      toast({
        title: "Failed to submit form",
        type: "foreground",
        description:
          e?.message ?? "Failed to submit form, please enter all the data",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <Head>
        <title>Avance PR: Best PR Agency in India | Top PR Firms for Startups</title>
        <meta name="description" content="Avance PR is a leading public relations agency in India. We offer PR for startups, crisis management, influencer & corporate communication. Free consultation." />
        <link rel="canonical" href="https://www.avancepr.in/" />
        <meta property="og:title" content="Avance PR: Best PR Agency in India | Top PR Firms for Startups" />
        <meta property="og:description" content="Avance PR is a leading public relations agency in India. We offer PR for startups, crisis management, influencer & corporate communication. Free consultation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>


      <p className="text-center mt-10 text-xl md:text-2xl font-semibold text-yellow-900 bg-yellow-50 py-4 px-6 rounded-xl shadow-sm max-w-5xl mx-auto mb-6 border-l-4 border-yellow-700">
        Power Your Brand Growth with Avance PR — India's Leading Strategic Communications Agency Driving Visibility, Credibility, and Influence through Media, Influencer, and Digital Platforms.
      </p>

      <div className="p-0 md:p-5 mx-4 my-5 md:my-0 flex flex-col lg:flex-row gap-2">
        <video
          className="lg:max-w-[70%] xl:max-h-[85vh] xl:w-auto mx-auto rounded-xl shadow-xl object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video-poster.jpg"
          src={EXTERNAL_IMAGES.CREATIVE}
        />
        <div className="w-full px-5 lg:px-0 lg:w-1/4 my-auto lg:mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="text-yellow-700">
              Get Free PR Strategy Consultation
            </div>

            <div className="mb-4 ">
              <Input
                type="text"
                value={fullName}
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
                className="border-yellow-700"
                placeholder="Enter your Full Name"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-yellow-700"
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-yellow-700"
                placeholder="Enter your Phone Number"
              />
            </div>

            <div className="mb-4">
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompany(e.target.value)}
                className="border-yellow-700"
                placeholder="Company Name"
                required
              />
            </div>

            <div className="mb-4">
              <Textarea
                rows={5}
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                className="border-yellow-700"
                placeholder="Write your Inquiry"
              />
            </div>

            <div className="flex flex-col justify-center">
              <Button
                type="submit"
                className=" bg-yellow-700  hover:bg-yellow-600 text-sm"
              >
                Send Request
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Services */}
      <HomeSection id="services" heading="Our Services" label="From Startup PR to Crisis Management and Corporate Communications — Avance PR creates visibility that strengthens credibility, fosters trust, and enhances brand equity across India">
        <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
          {servicesData.map((item, i) => (
            <ServiceCard key={i} {...item} />
          ))}
        </div>
      </HomeSection>

      {/* Clients */}
      <HomeSection id="clients" heading="Our Clients" label="Trusted by over 100+ brands across India, Avance PR partners with some of the nation&rsquo;s most innovative, fast-growing, and purpose-driven companies to shape their narrative and amplify visibility" full={true}>
        <ClientCarousel clients={clients} rowCount={2} />
      </HomeSection>

      {/* Case Studies */}
      <HomeSection id="case_studies" heading="Case Studies" label="Each success story we share represents a partnership built on trust, creativity, and results, where strategic PR meets authentic communication to build brands that truly stand out">
        <OurWork workItems={work} />
      </HomeSection>

      {/* Testimonials */}
      <HomeSection id="testimonials" heading="Testimonials" label="The strongest validation of our work comes from those who&rsquo;ve experienced it,  here&rsquo;s what our clients have to say.">
        <Testimonials testimonials={testimonials} />
      </HomeSection>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-10 px-4 my-16">
        {/* Image on the left */}
        <div className="order-1 md:order-1 flex flex-col justify-center items-center gap-y-4">
          <Image
            src="/images/ritika.jpeg"
            height={500}
            width={500}
            alt="Ritika Garg"
            className="w-60 md:w-72 aspect-square rounded-full object-cover"
          />

          <h2 className="text-2xl font-bold text-muted-foreground text-center">
            Ritika Garg
          </h2>
        </div>

        {/* Text on the right */}
        <div className="order-2 md:order-2 col-span-2">
          <h2 className="text-5xl text-center md:text-left font-bold text-yellow-700 animate-showLetterByLetter">
            Meet the Founder
          </h2>

          <div className="flex flex-col gap-y-4 mt-8 text-justify text-gray-700">
            <p>
              An award-winning entrepreneur recognized by ET 40 Under 40 and ET Women Leaders Awards, Ritika Garg founded Avance PR to redefine how brands communicate and connect.
            </p>

            <p>
              A communications strategist who began her career at Ogilvy, Ritika brings deep expertise in media relations, corporate communications, and influencer strategy. Under her leadership, Avance PR has grown into one of India’s fastest-emerging strategic communications agencies, trusted by over 100+ brands across technology, education, sustainability, hospitality, finance and other sectors.
            </p>

            <p>
              Guided by her belief that PR is not just about visibility but credibility, influence, and growth, Ritika continues to lead with innovation, empathy, and a people-first vision.
            </p>
          </div>
        </div>
      </div>



      {/* Featured */}
      <HomeSection id="featured" heading="We got Featured" label="">
        <Featured newsItems={news} />
      </HomeSection>

      {/* Awarded */}
      <HomeSection id="awarded" heading="Awards & Recognitions" label="Each award stands as a testament to our team&rsquo;s relentless pursuit of excellence, innovation, and influence reaffirming our place among India’s leading PR and communications agencies.">
        <Featured newsItems={awards} />
      </HomeSection>

      <div className="bg-yellow-50 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-6 leading-tight">
            Ready to amplify your brand's narrative?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Let's craft stories that make headlines. Connect with Avance PR today for a free strategy consultation and discover how we can drive visibility, credibility, and growth tailored to your goals.
          </p>
          <Button
            className="bg-yellow-700 mb-10 hover:bg-yellow-600 text-white text-lg px-8 py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            Get Free PR Strategy Consultation
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps = (async (context) => {
  const [testimonials, work, clients, news, awards] = await Promise.all([
    getTestimonials(),
    getOurWork(),
    getOurClients(),
    getLatestNews(),
    getAwards(),
  ]);

  return {
    props: { testimonials, work, clients, news, awards },
    revalidate: REVALIDATE_TIME.HOME_PAGE,
  };
}) satisfies GetStaticProps<HomeProps>;
