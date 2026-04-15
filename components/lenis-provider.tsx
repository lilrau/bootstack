"use client"

import { useEffect } from "react"
import Lenis from "lenis"

type LenisProviderProps = {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.1,
      anchors: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
