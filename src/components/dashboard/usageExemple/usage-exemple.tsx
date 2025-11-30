import PageTitle from "@/components/shared/typography/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCheck, AlertTriangle } from "lucide-react";

export default function UsageExemple() {
  return (
    <div className="p-6 space-y-10">
      {/* Cabeçalho da seção */}
      <section>
        <PageTitle
          title="Exemplo Uso do Tema"
          subtitle="Todos os componentes abaixo herdam automaticamente o tema ativo (cor +
          dark/light)."
        ></PageTitle>
      </section>

      {/* Área demonstrativa */}
      <section className="p-6 rounded-lg bg-background border border-border shadow-sm space-y-8">
        {/* ------------------ Botões ------------------ */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">
            Botões Temáticos
          </h3>

          <div className="flex gap-4 flex-wrap">
            <Button className="bg-primary text-primary-foreground">
              Botão Primário
            </Button>
            <Button className="bg-accent text-accent-foreground">
              Botão Acentuado
            </Button>
            <Button
              variant="outline"
              className="border-primary text-foreground"
            >
              Botão Outline Temático
            </Button>
          </div>
        </div>

        {/* ------------------ Cards ------------------ */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">Cards</h3>

          <div className="p-4 rounded-lg bg-card border border-border">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              Card Temático
            </h4>
            <p className="text-muted-foreground mt-2">
              Este card utiliza variáveis globais: <code>--card</code> e{" "}
              <code>--card-foreground</code>.{" "}
              <span>
                Mas você pode utilizar apenas primary ou secondary com bg ou
                text
              </span>
            </p>
          </div>
        </div>

        {/* ------------------ Inputs ------------------ */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">Inputs</h3>

          <Input
            placeholder="Digite aqui..."
            className="border-border bg-background focus-visible:ring-primary w-80"
          />
        </div>

        {/* ------------------ Badges ------------------ */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">Badges</h3>

          <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm">
            Badge Temática
          </span>
        </div>

        {/* ------------------ Links ------------------ */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">Links</h3>

          <a href="#" className="text-primary hover:underline">
            Link Temático
          </a>
        </div>

        {/* ------------------ Alerts ------------------ */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">Alert</h3>

          <div className="p-4 rounded-md bg-primary text-primary-foreground flex items-start gap-3">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <strong className="block">Alerta Temático</strong>
              <p>
                Este alerta utiliza <code>--primary</code> e{" "}
                <code>--primary-foreground</code>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
