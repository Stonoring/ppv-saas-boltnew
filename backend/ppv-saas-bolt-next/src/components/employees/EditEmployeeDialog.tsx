"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEmployeeStore } from '@/stores/employee-store'

const classificationLabels = {
  1: 'Junior',
  2: 'Intermédiaire',
  3: 'Confirmé',
  4: 'Senior',
  5: 'Expert'
} as const

interface Employee {
  id: string
  firstName: string
  lastName: string
  address: string
  annualSalary: number
  contract: 'CDI' | 'CDD'
  workTime: 'full' | 'partial'
  workTimePercentage?: number
  classification: number
}

interface EditEmployeeDialogProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditEmployeeDialog({
  employee,
  open,
  onOpenChange,
}: EditEmployeeDialogProps) {
  const { updateEmployee } = useEmployeeStore()
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    address: employee.address,
    annualSalary: employee.annualSalary.toString(),
    contract: employee.contract,
    workTime: employee.workTime,
    workTimePercentage: employee.workTimePercentage?.toString() || '100',
    classification: employee.classification,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    updateEmployee(employee.id, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      annualSalary: parseFloat(formData.annualSalary),
      contract: formData.contract as 'CDI' | 'CDD',
      workTime: formData.workTime as 'full' | 'partial',
      workTimePercentage: parseInt(formData.workTimePercentage),
      classification: formData.classification,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le bénéficiaire</DialogTitle>
          <DialogDescription>
            Modifiez les informations du bénéficiaire
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualSalary">Salaire annuel</Label>
            <Input
              id="annualSalary"
              type="number"
              value={formData.annualSalary}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, annualSalary: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contract">Type de contrat</Label>
            <Select
              value={formData.contract}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, contract: value as 'CDI' | 'CDD' }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CDI">CDI</SelectItem>
                <SelectItem value="CDD">CDD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workTime">Temps de travail</Label>
            <Select
              value={formData.workTime}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, workTime: value as 'full' | 'partial' }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Temps plein</SelectItem>
                <SelectItem value="partial">Temps partiel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.workTime === 'partial' && (
            <div className="space-y-2">
              <Label>Pourcentage du temps de travail</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[parseInt(formData.workTimePercentage)]}
                  min={10}
                  max={90}
                  step={10}
                  onValueChange={([value]) =>
                    setFormData((prev) => ({
                      ...prev,
                      workTimePercentage: value.toString(),
                    }))
                  }
                />
                <span className="w-12 text-right">
                  {formData.workTimePercentage}%
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Classification</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.classification]}
                min={1}
                max={5}
                step={1}
                onValueChange={([value]) =>
                  setFormData((prev) => ({ ...prev, classification: value }))
                }
              />
              <span className="w-24 text-right">
                {classificationLabels[formData.classification as keyof typeof classificationLabels]}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
