import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calculator, FileCheck, Search } from 'lucide-react';
import { generatePDF } from '@/lib/pdf';
import { useCompanyStore } from '@/stores/company-store';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

type DocumentType = 'accord' | 'decision' | 'lettre' | 'simulation';

export default function Documents() {
  const { companyData } = useCompanyStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const documents = JSON.parse(localStorage.getItem('documents') || '[]');

  const handleDownload = async (document: any) => {
    try {
      if (!companyData) {
        throw new Error('Données entreprise non disponibles');
      }

      if (document.type === 'simulation') {
        await generatePDF('simulation', { ...document.data, companyData });
      } else {
        await generatePDF(document.type, document.data);
      }
      
      toast({
        title: "Succès",
        description: "Le document a été généré avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de générer le document",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
    } catch (error) {
      return 'Date non disponible';
    }
  };

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'accord':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'decision':
        return <FileCheck className="h-8 w-8 text-green-500" />;
      case 'simulation':
        return <Calculator className="h-8 w-8 text-purple-500" />;
      case 'lettre':
        return <FileText className="h-8 w-8 text-orange-500" />;
      default:
        return <FileText className="h-8 w-8 text-primary" />;
    }
  };

  const getDocumentTitle = (type: DocumentType) => {
    switch (type) {
      case 'accord':
        return "Accord d'intéressement";
      case 'decision':
        return "Décision unilatérale";
      case 'simulation':
        return "Résultat simulation";
      case 'lettre':
        return "Lettre de versement";
      default:
        return "Document";
    }
  };

  const filteredDocuments = documents.filter((doc: any) => {
    const searchString = searchTerm.toLowerCase();
    const title = getDocumentTitle(doc.type).toLowerCase();
    const date = formatDate(doc.timestamp).toLowerCase();
    return title.includes(searchString) || date.includes(searchString);
  });

  const documentsByType = filteredDocuments.reduce((acc: Record<DocumentType, any[]>, doc: any) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<DocumentType, any[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documents disponibles</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="accord">Accords</TabsTrigger>
              <TabsTrigger value="decision">Décisions</TabsTrigger>
              <TabsTrigger value="lettre">Lettres</TabsTrigger>
              <TabsTrigger value="simulation">Simulations</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc: any, index: number) => (
                    <DocumentCard
                      key={index}
                      document={doc}
                      icon={getDocumentIcon(doc.type)}
                      title={getDocumentTitle(doc.type)}
                      date={formatDate(doc.timestamp)}
                      onDownload={() => handleDownload(doc)}
                    />
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </TabsContent>

            {(['accord', 'decision', 'lettre', 'simulation'] as DocumentType[]).map((type) => (
              <TabsContent key={type} value={type}>
                <div className="space-y-4">
                  {documentsByType[type]?.length > 0 ? (
                    documentsByType[type].map((doc: any, index: number) => (
                      <DocumentCard
                        key={index}
                        document={doc}
                        icon={getDocumentIcon(doc.type)}
                        title={getDocumentTitle(doc.type)}
                        date={formatDate(doc.timestamp)}
                        onDownload={() => handleDownload(doc)}
                      />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentCard({ document, icon, title, date, onDownload }: any) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">Créé le {date}</p>
        </div>
      </div>
      <Button onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Télécharger
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium">Aucun document</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Utilisez la section "Rédaction" pour créer vos documents.
      </p>
    </div>
  );
}