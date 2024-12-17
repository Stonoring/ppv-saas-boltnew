"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSimulation } from '@/contexts/SimulationContext'
import { useToast } from '@/components/ui/use-toast'
import { Check, Download } from 'lucide-react'

interface SummaryProps {
  onPrev: () => void
}

export function Summary({ onPrev }: SummaryProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { data } = useSimulation()

  const handleSave = async () => {
    try {
      // Logique de sauvegarde à implémenter
      toast({
        title: "Simulation enregistrée",
        description: "Votre simulation a été enregistrée avec succès.",
      })
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      })
    }
  }

  const handleDownloadPDF = async () => {
    try {
      // Logique de génération PDF à implémenter
      toast({
        title: "PDF généré",
        description: "Le rapport PDF a été généré avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif de votre simulation</CardTitle>
        <CardDescription>
          Vérifiez les détails de votre simulation avant de la finaliser
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informations entreprise */}
        <div className="space-y-2">
          <h3 className="font-semibold">Informations entreprise</h3>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nombre d'employés</span>
              <span>{data.employees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accord d'intéressement</span>
              <span>{data.hasIncentive ? 'Oui' : 'Non'}</span>
            </div>
          </div>
        </div>

        {/* Objectifs */}
        <div className="space-y-2">
          <h3 className="font-semibold">Objectifs</h3>
          <ul className="space-y-1">
            {data.selectedNeeds?.map((need) => (
              <li key={need.id} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{need.label}</span>
              </li>
            ))}
            {data.otherNeed && (
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{data.otherNeed}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Montants */}
        <div className="space-y-2">
          <h3 className="font-semibold">Montants</h3>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Montant total</span>
              <span>{data.totalAmount?.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Montant moyen par employé</span>
              <span>
                {Math.round(
                  (data.totalAmount || 0) / (data.employees || 1)
                ).toLocaleString()}
                €
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrev}>
            Retour
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
            <Button onClick={handleSave}>
              Finaliser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
