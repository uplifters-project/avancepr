import { useEffect, useState } from "react";
import { getTestimonials } from "../lib/apis";
import TestimonialCard from "@/components/cards/testimonial-card";
import MainLayout from "@/components/layouts/main-layout";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const testimonials = await getTestimonials();
      setTestimonials([...testimonials]);
    };

    loadData();
  }, []);

  return (
    <MainLayout className="py-24">
      <div className="container">
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
