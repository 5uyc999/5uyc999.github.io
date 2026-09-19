import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props {
  items: Array<{ q: string; a: string; key: string }>;
}

const FAQSection = ({ items }: Props) => (
  <section className="py-20 bg-muted">
    <div className="container">
      <SectionHeading title="الأسئلة الشائعة" subtitle="إجابات على أكثر الأسئلة شيوعاً حول خدمات نقل الأثاث" />
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item) => (
            <AccordionItem key={item.key} value={item.key} className="bg-card rounded-lg border border-border px-6">
              <AccordionTrigger className="text-right font-bold hover:text-secondary">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="font-bold">
            <Link to="/faq">عرض جميع الأسئلة <ChevronLeft className="mr-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
