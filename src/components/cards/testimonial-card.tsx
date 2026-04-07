import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="w-[320px] mx-auto border border-gray-200 h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <CardHeader className="items-center pb-2 pt-6">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            height={800}
            width={800}
            className="h-20 w-20 rounded-full object-cover border-2 border-yellow-700/20"
          />
          <p className="font-semibold text-base text-gray-900 mt-3">{testimonial.name}</p>
          <p className="text-sm text-yellow-700">{testimonial.designation}</p>
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-6 pt-0">
          <p
            dangerouslySetInnerHTML={{ __html: testimonial.content }}
            className="text-sm text-center text-gray-600 leading-relaxed line-clamp-6"
          ></p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto rounded-2xl">
          <DialogHeader className="items-center text-center">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              height={800}
              width={800}
              className="h-24 w-24 rounded-full object-cover border-2 border-yellow-700/20 mx-auto"
            />
            <DialogTitle className="text-lg font-semibold text-gray-900 mt-3">
              {testimonial.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-yellow-700">
              {testimonial.designation}
            </DialogDescription>
          </DialogHeader>
          <div
            dangerouslySetInnerHTML={{ __html: testimonial.content }}
            className="text-sm text-center text-gray-600 leading-relaxed mt-2"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestimonialCard;
