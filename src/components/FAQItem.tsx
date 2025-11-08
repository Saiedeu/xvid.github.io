import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FAQItemProps {
    question: string;
    answer: string;
    value: string;
  }
  
  export default function FAQItem({ question, answer, value }: FAQItemProps) {
    return (
      <AccordionItem value={value} data-testid={`faq-${value}`}>
        <AccordionTrigger className="text-left font-medium">
          {question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed">
          {answer}
        </AccordionContent>
      </AccordionItem>
    );
  }
  