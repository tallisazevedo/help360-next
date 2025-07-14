import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dados de exemplo para perfis
const profiles = [
  {
    id: 1,
    name: "Administrador",
    description: "Acesso completo ao sistema",
    type: "admin",
    status: "active",
    permissions: 42,
    createdAt: "2023-05-10",
  },
  {
    id: 2,
    name: "Gerente",
    description: "Acesso a gestão de equipes e relatórios",
    type: "manager",
    status: "active",
    permissions: 28,
    createdAt: "2023-06-15",
  },
  {
    id: 3,
    name: "Atendente",
    description: "Acesso ao módulo de atendimento",
    type: "user",
    status: "active",
    permissions: 15,
    createdAt: "2023-07-22",
  },
  {
    id: 4,
    name: "Auditor",
    description: "Acesso somente leitura para auditoria",
    type: "guest",
    status: "inactive",
    permissions: 8,
    createdAt: "2023-08-05",
  },
  {
    id: 5,
    name: "Qualidade",
    description: "Acesso ao módulo de qualidade",
    type: "user",
    status: "active",
    permissions: 12,
    createdAt: "2023-09-18",
  },
]

export function ProfileList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Perfis de Acesso</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Perfil
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissões</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{profile.name}</TableCell>
                <TableCell>{profile.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      profile.type === "admin"
                        ? "destructive"
                        : profile.type === "manager"
                          ? "default"
                          : profile.type === "user"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {profile.type === "admin"
                      ? "Administrador"
                      : profile.type === "manager"
                        ? "Gerente"
                        : profile.type === "user"
                          ? "Usuário"
                          : "Convidado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={profile.status === "active" ? "success" : "outline"}>
                    {profile.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>{profile.permissions}</TableCell>
                <TableCell>{profile.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
