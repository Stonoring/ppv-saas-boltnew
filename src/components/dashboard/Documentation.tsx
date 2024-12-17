import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DocumentList from './DocumentList';

export default function Documentation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-8" />
        </div>
      </CardHeader>
      <CardContent>
        <DocumentList />
      </CardContent>
    </Card>
  );
}