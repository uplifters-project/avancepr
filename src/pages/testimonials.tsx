import { getTestimonials } from "@/lib/apis";
import TestimonialCard from "@/components/cards/testimonial-card";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";

const TestimonialsPage: NextPage<{
  testimonials: Testimonial[];
}> = ({ testimonials }) => {
  return (
    <PageLaypout heading="Testimonials" label="What others say about us">
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
