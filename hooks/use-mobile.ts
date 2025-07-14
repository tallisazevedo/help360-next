"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Função para verificar se a tela é mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkIsMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIsMobile)

    // Limpar listener ao desmontar
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}
