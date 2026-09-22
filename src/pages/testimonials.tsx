import { getTestimonials } from "@/lib/queries";
import TestimonialCard from "@/components/cards/testimonial-card";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Head from "next/head";

const TestimonialsPage: NextPage<{
  testimonials: Testimonial[];
}> = ({ testimonials }) => {
  return (
    <PageLaypout heading="Testimonials" label="What others say about us">
      <Head>
        <title>Client Testimonials – Avance PR</title>
        <meta name="description" content="See what clients say about working with Avance PR on their public relations, media & communication campaigns." />
        <link rel="canonical" href="https://www.avancepr.in/testimonials" />
        <meta property="og:title" content="Client Testimonials – Avance PR" />
        <meta property="og:description" content="See what clients say about working with Avance PR on their public relations, media & communication campaigns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/testimonials" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
      <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
        {testimonials.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} />
        ))}
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const testimonials = await getTestimonials();

  return {
    props: {
      testimonials,
    },
    revalidate: REVALIDATE_TIME.TESTIMONIALS_PAGE,
  };
};

export default TestimonialsPage;
