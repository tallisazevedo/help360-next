"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface CancelSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CancelSubscriptionDialog({ open, onOpenChange }: CancelSubscriptionDialogProps) {
  const [reason, setReason] = useState("")
  const [comments, setComments] = useState("")

  const handleSubmit = () => {
    // Aqui você implementaria a lógica de cancelamento
    console.log({ reason, comments })
    onOpenChange(false)
  }

  const cancelReasons = [
    { id: "price", label: "Preço muito alto" },
    { id: "features", label: "Faltam recursos necessários" },
    { id: "competitor", label: "Mudando para um concorrente" },
    { id: "usability", label: "Dificuldade de uso" },
    { id: "support", label: "Problemas com suporte" },
    { id: "temporary", label: "Pausa temporária" },
    { id: "other", label: "Outro motivo" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Cancelar assinatura</DialogTitle>
          </div>
          <DialogDescription>
            Ao cancelar sua assinatura, você perderá acesso a todos os recursos premium ao final do período atual.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Por que você está cancelando?</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {cancelReasons.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={item.id} id={item.id} />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comentários adicionais</Label>
            <Textarea
              id="comments"
              placeholder="Conte-nos mais sobre sua experiência..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="sm:w-auto w-full">
            Voltar
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={!reason} className="sm:w-auto w-full">
            Confirmar cancelamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
