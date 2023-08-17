import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <Card className="w-[250px] mx-auto border-black border-blur-100">
      <CardHeader>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          height={800}
          width={800}
          className="h-24 w-24 rounded-full mx-auto border"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 text-center">
        <p className="font-bold text-lg text-black">{testimonial.name}</p>

        <p className="text-md text-yellow-700">{testimonial.designation}</p>

        <p
          dangerouslySetInnerHTML={{ __html: testimonial.content }}
          className="text-center text-gray-600"
        ></p>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default TestimonialCard;
