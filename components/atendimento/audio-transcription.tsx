"use client"

import { useState } from "react"
import { Mic, Play, Pause, StopCircle, Trash2, FileText, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type AudioTranscriptionProps = {
  onTranscriptionComplete: (text: string) => void
  onCancel: () => void
}

export function AudioTranscription({ onTranscriptionComplete, onCancel }: AudioTranscriptionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcriptionText, setTranscriptionText] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Simular gravação de áudio
  const startRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setRecordingTime(0)

    // Simular incremento de tempo
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 300) {
          // Máximo de 5 minutos (300 segundos)
          clearInterval(interval)
          stopRecording()
          return 300
        }
        return prev + 1
      })
    }, 1000)

    // Armazenar o intervalo para limpar depois
    window.recordingInterval = interval
  }

  const pauseRecording = () => {
    setIsPaused(true)
    clearInterval(window.recordingInterval)
  }

  const resumeRecording = () => {
    setIsPaused(false)

    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 300) {
          clearInterval(interval)
          stopRecording()
          return 300
        }
        return prev + 1
      })
    }, 1000)

    window.recordingInterval = interval
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    clearInterval(window.recordingInterval)

    // Simular URL de áudio
    setAudioUrl("data:audio/mp3;base64,fake-audio-data")
  }

  const deleteRecording = () => {
    setAudioUrl(null)
    setRecordingTime(0)
    setTranscriptionText("")
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)

    // Simular reprodução
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false)
      }, recordingTime * 1000)
    }
  }

  const startTranscription = () => {
    setIsTranscribing(true)

    // Simular transcrição
    setTimeout(() => {
      setIsTranscribing(false)
      setTranscriptionText(
        "Olá, estou com um problema no meu pedido número 12345. Já se passaram 15 dias e ainda não recebi. Preciso de uma solução urgente, pois preciso deste produto para um evento no próximo final de semana.",
      )
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSaveTranscription = () => {
    onTranscriptionComplete(transcriptionText)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transcrição de Áudio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!audioUrl ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{isRecording ? "Gravando..." : "Pronto para gravar"}</span>
              <span className="font-mono text-sm">{formatTime(recordingTime)}</span>
            </div>

            <Progress value={(recordingTime / 300) * 100} className="h-2" />

            <div className="flex justify-center gap-2">
              {!isRecording ? (
                <Button onClick={startRecording}>
                  <Mic className="mr-2 h-4 w-4" />
                  Iniciar Gravação
                </Button>
              ) : (
                <>
                  {isPaused ? (
                    <Button onClick={resumeRecording}>
                      <Play className="mr-2 h-4 w-4" />
                      Continuar
                    </Button>
                  ) : (
                    <Button onClick={pauseRecording}>
                      <Pause className="mr-2 h-4 w-4" />
                      Pausar
                    </Button>
                  )}

                  <Button variant="destructive" onClick={stopRecording}>
                    <StopCircle className="mr-2 h-4 w-4" />
                    Parar
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Áudio gravado</span>
                <span className="font-mono text-sm">{formatTime(recordingTime)}</span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={togglePlayback}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Progress
                  value={isPlaying ? (Date.now() % (recordingTime * 1000)) / (recordingTime * 10) : 0}
                  className="h-2 flex-1"
                />

                <Button variant="outline" size="icon" onClick={deleteRecording}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!transcriptionText ? (
              <div className="flex justify-center">
                <Button onClick={startTranscription} disabled={isTranscribing}>
                  {isTranscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Transcrevendo...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Transcrever Áudio
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="transcription">Transcrição</Label>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Concluir edição" : "Editar"}
                  </Button>
                </div>
                <Textarea
                  id="transcription"
                  value={transcriptionText}
                  onChange={(e) => setTranscriptionText(e.target.value)}
                  className="min-h-[100px]"
                  readOnly={!isEditing}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSaveTranscription} disabled={!transcriptionText}>
          <Check className="mr-2 h-4 w-4" />
          Usar Transcrição
        </Button>
      </CardFooter>
    </Card>
  )
}
