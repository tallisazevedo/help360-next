"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  type: "internal" | "whatsapp" | "email"
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Carlos Santos",
    lastMessage: "Como faço para anexar múltiplas evidências em um único registro?",
    time: "10:33",
    unread: 1,
    online: true,
    type: "internal",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    lastMessage: "Obrigado pela informação!",
    time: "09:45",
    unread: 0,
    online: true,
    type: "internal",
  },
  {
    id: "3",
    name: "João Silva",
    lastMessage: "Vou verificar e te retorno em breve.",
    time: "Ontem",
    unread: 0,
    online: false,
    type: "whatsapp",
  },
  {
    id: "4",
    name: "Ana Pereira",
    lastMessage: "Precisamos agendar uma reunião para discutir o plano de ação.",
    time: "Ontem",
    unread: 2,
    online: false,
    type: "email",
  },
  {
    id: "5",
    name: "Roberto Alves",
    lastMessage: "A não conformidade foi registrada com sucesso.",
    time: "Seg",
    unread: 0,
    online: false,
    type: "internal",
  },
]

export function ContactList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "internal" && contact.type === "internal") ||
      (activeTab === "whatsapp" && contact.type === "whatsapp") ||
      (activeTab === "email" && contact.type === "email")

    return matchesSearch && matchesTab
  })

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar contatos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="border-b px-4">
          <TabsList className="h-10">
            <TabsTrigger value="all" className="text-xs">
              Todos
            </TabsTrigger>
            <TabsTrigger value="internal" className="text-xs">
              Internos
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="text-xs">
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs">
              E-mail
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="p-0 m-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="divide-y">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar || `/placeholder.svg?height=40&width=40`} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name.charAt(0)}
                        {contact.name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="internal" className="p-0 m-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="divide-y">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar || `/placeholder.svg?height=40&width=40`} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name.charAt(0)}
                        {contact.name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="whatsapp" className="p-0 m-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="divide-y">
              {filteredContacts
                .filter((c) => c.type === "whatsapp")
                .map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar || `/placeholder.svg?height=40&width=40`} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                          {contact.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.time}</p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="email" className="p-0 m-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="divide-y">
              {filteredContacts
                .filter((c) => c.type === "email")
                .map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar || `/placeholder.svg?height=40&width=40`} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                          {contact.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.time}</p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
