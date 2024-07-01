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
import Popup from "@/components/app/Popup";
import { FormEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { submitEnquiryForm } from "@/lib/apis";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [companyName, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="p-0 md:p-5 mx-4 my-5 md:my-0 flex flex-col lg:flex-row gap-2">
        <video
          className="lg:max-w-[70%] xl:max-h-[85vh] xl:w-auto mx-auto rounded-xl shadow-xl animate-pulse object-cover"
          autoPlay
          loop
          muted
          src={EXTERNAL_IMAGES.CREATIVE}
          // style={{ width: "150%" }}
        />
        <div className="w-full px-5 lg:px-0 lg:w-1/4 my-auto lg:mx-auto">
          <form onSubmit={handleSubmit}>
              <div className="text-yellow-700">
                SEND US YOUR INQUIRY
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
      <HomeSection id="services" heading="Our Services" label="">
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
      <HomeSection id="testimonials" heading="Testimonials" label="">
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
