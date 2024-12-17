import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FileSignature, FileCheck } from 'lucide-react';
import { AccordForm } from './editor/AccordForm';
import { DecisionForm } from './editor/DecisionForm';
import { LettreForm } from './editor/LettreForm';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/progress-store';

type DocumentType = 'accord' | 'decision' | 'lettre';

interface DocumentSection {
  id: DocumentType;
  title: string;
  icon: typeof FileText | typeof FileSignature | typeof FileCheck;
  description: string;
  component: React.ComponentType<{ onComplete: () => void }>;
}

const documents: DocumentSection[] = [
  {
    id: 'accord',
    title: "Accord d'intéressement",
    icon: FileText,
    description: "Rédigez l'accord d'intéressement pour votre entreprise",
    component: AccordForm,
  },
  {
    id: 'decision',
    title: 'Décision unilatérale',
    icon: FileCheck,
    description: 'Formalisez votre décision de versement de la PPV',
    component: DecisionForm,
  },
  {
    id: 'lettre',
    title: 'Lettre de versement',
    icon: FileSignature,
    description: 'Préparez les lettres individuelles pour vos salariés',
    component: LettreForm,
  },
];

export default function DocumentEditor() {
  const [activeDocument, setActiveDocument] = useState<DocumentType | null>(null);
  const { completeStep } = useProgressStore();
  const [completedDocuments, setCompletedDocuments] = useState<DocumentType[]>([]);

  const handleDocumentComplete = (type: DocumentType) => {
    setCompletedDocuments(prev => [...prev, type]);
    setActiveDocument(null);

    // If all documents are completed, mark the REDIGER step as complete
    if (completedDocuments.length === documents.length - 1) {
      completeStep('REDIGER');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rédaction des documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {documents.map((doc) => {
            const Icon = doc.icon;
            const isActive = activeDocument === doc.id;
            const isCompleted = completedDocuments.includes(doc.id);

            return (
              <div key={doc.id}>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start px-4 py-6",
                    isActive && "border-primary",
                    isCompleted && "border-success bg-success/10"
                  )}
                  onClick={() => setActiveDocument(isActive ? null : doc.id)}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={cn(
                      "h-5 w-5",
                      isCompleted ? "text-success" : "text-primary"
                    )} />
                    <div className="text-left">
                      <h3 className="font-semibold">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </Button>

                {isActive && (
                  <Card className="mt-4">
                    <CardContent className="pt-6">
                      {doc.component && (
                        <doc.component
                          onComplete={() => handleDocumentComplete(doc.id)}
                        />
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}