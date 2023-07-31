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
    <Card className="w-[300px] mx-auto">
      <CardHeader>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          height={500}
          width={500}
          className="h-24 w-24 rounded-full mx-auto border"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 text-center">
        <p className="font-bold text-indigo-600">{testimonial.name}</p>

        <p className="text-sm text-gray-600">{testimonial.designation}</p>

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
