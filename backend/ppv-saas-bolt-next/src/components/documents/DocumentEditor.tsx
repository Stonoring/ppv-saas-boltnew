"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Editor } from "./editor/Editor"
import { TemplateSelector } from "./templates/TemplateSelector"

interface Document {
  id: string
  name: string
  type: string
  status: string
  lastModified: string
}

interface DocumentEditorProps {
  isOpen: boolean
  onClose: () => void
  document: Document | null
}

export function DocumentEditor({ isOpen, onClose, document }: DocumentEditorProps) {
  const [activeTab, setActiveTab] = useState("editor")
  const [documentContent, setDocumentContent] = useState("")

  const handleSave = () => {
    // TODO: Implement save functionality
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {document ? "Edit Document" : "Create New Document"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Input
              className="col-span-2"
              placeholder="Document Name"
              defaultValue={document?.name}
            />
            <Select defaultValue={document?.type || "policy"}>
              <SelectTrigger>
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={document?.status || "draft"}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="h-[calc(80vh-12rem)]">
              <Editor
                content={documentContent}
                onChange={setDocumentContent}
              />
            </TabsContent>
            <TabsContent value="template">
              <TemplateSelector onSelect={setDocumentContent} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
