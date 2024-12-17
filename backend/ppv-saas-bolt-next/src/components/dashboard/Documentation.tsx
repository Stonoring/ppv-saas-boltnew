"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

export default function Documentation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Guide Utilisateur</p>
            <p className="text-sm text-muted-foreground">
              Manuel complet de l'application
            </p>
          </div>
          <Button variant="secondary" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Documentation API</p>
            <p className="text-sm text-muted-foreground">
              Documentation technique
            </p>
          </div>
          <Button variant="secondary" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
