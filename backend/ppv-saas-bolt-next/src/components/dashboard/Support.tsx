"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Phone, Mail } from 'lucide-react'

export default function Support() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Chat en direct</p>
            <p className="text-sm text-muted-foreground">
              Assistance immédiate
            </p>
          </div>
          <Button variant="secondary" size="sm">
            Démarrer
          </Button>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Téléphone</p>
            <p className="text-sm text-muted-foreground">
              Lun-Ven, 9h-18h
            </p>
          </div>
          <Button variant="secondary" size="sm">
            Appeler
          </Button>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Email</p>
            <p className="text-sm text-muted-foreground">
              Réponse sous 24h
            </p>
          </div>
          <Button variant="secondary" size="sm">
            Écrire
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
