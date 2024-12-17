import { MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqItems = [
  {
    question: 'Qui peut bénéficier de la PPV ?',
    answer: 'Tous les salariés de l\'entreprise sous certaines conditions de rémunération et d\'ancienneté.',
  },
  {
    question: 'Quel est le montant maximum ?',
    answer: 'Le plafond est fixé à 3000€ par bénéficiaire et par année civile.',
  },
  {
    question: 'La PPV est-elle obligatoire ?',
    answer: 'Non, elle reste facultative pour l\'employeur mais nécessite un accord d\'entreprise.',
  },
];

export default function Support() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>FAQ & Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-center">
            <Button className="w-full sm:w-auto">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contacter le Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}