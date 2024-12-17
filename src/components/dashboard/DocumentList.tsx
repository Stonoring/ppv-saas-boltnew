import { FileText, FileType } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const documents = [
  {
    category: 'Légal',
    items: [
      { name: 'Guide juridique PPV', type: 'pdf', icon: FileType },
      { name: 'Modèle accord', type: 'doc', icon: FileText },
    ],
  },
  {
    category: 'Procédures',
    items: [
      { name: 'Process de validation', type: 'pdf', icon: FileType },
      { name: 'Checklist versement', type: 'doc', icon: FileText },
    ],
  },
];

export default function DocumentList() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-6">
        {documents.map((category, index) => (
          <div key={index}>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.items.map((doc, docIndex) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={docIndex}
                    className="flex items-center gap-3 rounded-lg border p-2 hover:bg-accent cursor-pointer"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}