import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  console.log(testimonial);

  return (
    // <div className="p-4 text-gray-800 rounded-lg shadow-lg w-full">
    //   <div className="mb-4">
    //     <div className="flex flex-col items-center justify-center">
    //       <div className="w-24 h-24 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
    //         <img
    //           src={testimonial.image}
    //           alt="img"
    //           className="object-cover object-center w-full h-full"
    //         />
    //       </div>
    //       <h5 className="font-bold text-indigo-600">{testimonial.name}</h5>
    //       <p className="text-sm text-gray-600">{testimonial.designation}</p>
    //     </div>
    //     <p className="mb-2 text-center text-gray-600 ">
    //       "{testimonial.content}"
    //     </p>
    //   </div>
    // </div>

    <Card className="w-[300px] mx-auto">
      <CardHeader>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          height={500}
          width={500}
          onErrorCapture={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/Logo.jpg";
          }}
          className="h-24 w-24 rounded-full mx-auto border"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 text-center">
        <p>{testimonial.name}</p>

        <p>{testimonial.designation}</p>

        <p dangerouslySetInnerHTML={{ __html: testimonial.content }}></p>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default TestimonialCard;
