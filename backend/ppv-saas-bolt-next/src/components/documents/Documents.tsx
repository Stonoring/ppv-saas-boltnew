"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DocumentEditor } from "./DocumentEditor"
import { Plus, FileText, Download, Trash2 } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  status: string
  lastModified: string
}

const documents: Document[] = [
  {
    id: "1",
    name: "Privacy Policy",
    type: "Policy",
    status: "Draft",
    lastModified: "2024-01-15",
  },
  {
    id: "2",
    name: "Terms of Service",
    type: "Legal",
    status: "Published",
    lastModified: "2024-01-14",
  },
  {
    id: "3",
    name: "Data Processing Agreement",
    type: "Contract",
    status: "Under Review",
    lastModified: "2024-01-13",
  },
]

export function Documents() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsEditorOpen(true)
  }

  const handleCreateDocument = () => {
    setSelectedDocument(null)
    setIsEditorOpen(true)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage and edit your company documents
          </p>
        </div>
        <Button onClick={handleCreateDocument}>
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              View and manage all your documents in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {document.name}
                      </div>
                    </TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>{document.status}</TableCell>
                    <TableCell>{document.lastModified}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditDocument(document)}
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <DocumentEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        document={selectedDocument}
      />
    </div>
  )
}
