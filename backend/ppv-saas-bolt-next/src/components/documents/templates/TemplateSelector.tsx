"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  content: string
}

const templates: Template[] = [
  {
    id: "1",
    name: "Privacy Policy Template",
    description: "Standard privacy policy template for websites and applications",
    content: "Privacy Policy content...",
  },
  {
    id: "2",
    name: "Terms of Service Template",
    description: "Standard terms of service template for online services",
    content: "Terms of Service content...",
  },
  {
    id: "3",
    name: "Data Processing Agreement",
    description: "GDPR-compliant data processing agreement template",
    content: "Data Processing Agreement content...",
  },
]

interface TemplateSelectorProps {
  onSelect: (content: string) => void
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <ScrollArea className="h-[calc(80vh-12rem)]">
      <div className="grid grid-cols-2 gap-4 p-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:bg-accent"
            onClick={() => onSelect(template.content)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <FileText className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
