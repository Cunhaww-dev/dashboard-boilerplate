"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  MoreHorizontal,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";

const recentSales = [
  { name: "Ana Souza", email: "ana.souza@example.com", value: "R$ 1.250,00" },
  { name: "Carlos Lima", email: "carlos.lima@example.com", value: "R$ 980,00" },
  {
    name: "Mariana Silva",
    email: "mariana.silva@example.com",
    value: "R$ 2.430,00",
  },
  { name: "João Pedro", email: "joao.pedro@example.com", value: "R$ 750,00" },
];

const quickStats = [
  {
    label: "Receita hoje",
    value: "R$ 12.450,00",
    diff: "+18%",
    positive: true,
    icon: CreditCard,
  },
  {
    label: "Novos usuários",
    value: "248",
    diff: "+5%",
    positive: true,
    icon: Users,
  },
  {
    label: "Taxa de conversão",
    value: "3,2%",
    diff: "-0,4%",
    positive: false,
    icon: BarChart3,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Visão geral dos principais indicadores do seu produto.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Pesquisar</span>
              <span className="sm:hidden">Buscar</span>
            </Button>
            <Button className="bg-primary text-primary-foreground">
              Novo relatório
            </Button>
          </div>
        </header>

        {/* Cards de estatísticas */}
        <section className="grid gap-4 md:grid-cols-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      {stat.label}
                    </CardTitle>
                  </div>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        stat.positive ? "text-emerald-500" : "text-red-500"
                      }
                    >
                      {stat.diff}
                    </span>
                    <span className="text-muted-foreground">
                      vs. último período
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Conteúdo em duas colunas */}
        <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
          {/* Tabela de vendas recentes */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Vendas recentes</CardTitle>
                <CardDescription>
                  Últimas movimentações registradas no sistema.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.email} className="border-border">
                      <TableCell className="font-medium">{sale.name}</TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                        {sale.email}
                      </TableCell>
                      <TableCell className="text-right">{sale.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Coluna lateral: filtro + resumo */}
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Filtro rápido</CardTitle>
                <CardDescription>
                  Busque dados específicos do dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Buscar por cliente, ID, etc..."
                  className="bg-background border-border"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-border text-foreground"
                  >
                    Resetar
                  </Button>
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    Aplicar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Status geral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Saúde do sistema
                  </span>
                  <Badge className="bg-emerald-500 text-white">Estável</Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Erros nas últimas 24h
                  </span>
                  <Badge variant="outline" className="border-border">
                    3 ocorrências
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Próximas manutenções
                  </span>
                  <span className="text-foreground text-xs">
                    Nenhuma agendada
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
