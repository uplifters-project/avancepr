import React from "react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs: React.FC<{
  faq: FAQ[];
  className?: string;
}> = ({ faq, className = "" }) => {
  return (
    <div className={cn("w-full", className)}>
      <Accordion type="single" collapsible>
        {faq.map((item, i) => (
          <AccordionItem value={i.toString()}>
            <AccordionTrigger className="">{item.title}</AccordionTrigger>
            <AccordionContent className="">{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;


