"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-32">
              <Image
                src="https://app.helpdesk360.com.br/static/media/logo_color.cd67e9c711ddcaef62031842d33ac9d4.svg"
                alt="Help360 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold gradient-text"></span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex gap-6">
          {["recursos", "beneficios", "modulos", "integracao", "planos", "contato"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
            >
              <Link href={`#${item}`} className="text-sm font-medium transition-colors hover:text-primary">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <Button variant="outline" asChild className="rounded-full">
            <Link href="#login">Login</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="#demo">Solicitar Demo</Link>
          </Button>
        </motion.div>
        <button
          className="flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="container md:hidden glass-card rounded-xl my-2"
        >
          <nav className="flex flex-col space-y-4 py-4 px-4">
            {["recursos", "beneficios", "modulos", "integracao", "planos", "contato"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="w-full rounded-full">
                <Link href="#login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="#demo" onClick={() => setIsMenuOpen(false)}>
                  Solicitar Demo
                </Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
