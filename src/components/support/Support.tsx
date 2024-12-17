import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone } from 'lucide-react';

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
  {
    question: 'Quels sont les avantages fiscaux ?',
    answer: 'La PPV bénéficie d\'exonérations sociales et fiscales sous certaines conditions.',
  },
  {
    question: 'Comment mettre en place la PPV ?',
    answer: 'La mise en place nécessite un accord d\'entreprise ou une décision unilatérale de l\'employeur.',
  },
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Chat en direct',
    description: 'Assistance immédiate',
    action: 'Démarrer une conversation',
    onClick: () => console.log('Open chat'),
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'support@ppvmanager.fr',
    action: 'Envoyer un email',
    onClick: () => window.location.href = 'mailto:support@ppvmanager.fr',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    description: '01 23 45 67 89',
    action: 'Appeler le support',
    onClick: () => window.location.href = 'tel:0123456789',
  },
];

export default function Support() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>FAQ & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={method.onClick}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}