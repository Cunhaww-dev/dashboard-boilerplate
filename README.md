# Dashboard Boilerplate

Um boilerplate responsivo e moderno para dashboards, construído com **Next.js 16**, **React 19**, **Tailwind CSS 4** e **CSS Variables** para temas dinâmicos. Inclui suporte a modo claro/escuro, múltiplas paletas de cores e componentes reutilizáveis utilizando shadcn/ui.

---

## 🎯 Objetivo

Fornecer uma base sólida e completa para projetos de dashboard, eliminando trabalho repetitivo com:

- Layout responsivo pronto
- Sistema de temas dinâmicos (light/dark)
- Paletas de cores temáticas intercambiáveis
- Select de tema integrado
- Componentes UI reutilizáveis (shadcn/ui)
- Estrutura escalável para projetos reais

---

## 🚀 Tecnologias

- **Next.js 16** — Framework React com SSR/SSG
- **React 19** — Biblioteca UI
- **TypeScript** — Tipagem estática
- **Tailwind CSS 4** — Estilização utilitária
- **Radix UI** — Componentes headless
- **shadcn/ui** — Componentes estilizados e acessíveis
- **Lucide React** — Ícones SVG
- **ESLint** — Manter código consistente

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── globals.css              # Estilos globais e variáveis CSS
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Home
│   └── dashboard/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── dashboard/               # Componentes do dashboard
│   ├── layout/                  # Header, sidebar, nav, etc
│   ├── providers/               # Provedores (tema, etc)
│   ├── shared/                  # Componentes compartilhados
│   └── ui/                      # shadcn/ui
├── hooks/                       # Hooks personalizados
└── lib/                         # Funções utilitárias
```

---

# 🎨 Sistema de Temas

O sistema de temas é totalmente baseado em **CSS Variables** definidas em `globals.css`.

O projeto suporta dois níveis de personalização:

1. **Modo claro/escuro** — usando a classe `.dark` no `<body>`
2. **Tema de cor completo** — usando `class="theme-blue"`, `theme-green`, `theme-stone`, etc.

### Como o tema é aplicado

O provider adiciona automaticamente ao `<body>`:

```html
<body class="theme-blue dark"> <!-- exemplo -->
```

As variáveis são então buscadas pelos componentes do shadcn/ui e por classes utilitárias como:

- `bg-primary`
- `text-primary-foreground`
- `bg-background`
- `text-foreground`
- `border-border`

---

# Adicionar Novas Cores (Padrão do Projeto)

Este projeto usa **somente `globals.css`** para configurar temas.  
Você **não precisa** adicionar nada no `tailwind.config.js`.

Siga estes passos para adicionar um novo tema de cor:


## ✔ Resumo rápido

1. Adicione as variáveis `--color-<name>-50..900` no `:root`.
2. Adicione as mesmas variáveis invertidas/ajustadas em `.dark`.
3. Crie o bloco `.theme-<name>` que mapeia para tokens (`--primary`, `--sidebar-primary`, etc).
4. Adicione o tema ao `DEFAULT_THEMES` no seletor.
5. Teste no navegador.

---

## 1) Adicionar paleta no `:root`

No arquivo `globals.css`:

```css
/* === Paleta: --color-<name>-50..900 === */
:root {
  --color-<name>-50: oklch(0.98 0.03 200);
  --color-<name>-100: oklch(0.96 0.06 200);
  --color-<name>-200: oklch(0.92 0.11 200);
  --color-<name>-300: oklch(0.86 0.15 200);
  --color-<name>-400: oklch(0.78 0.18 200);
  --color-<name>-500: oklch(0.68 0.20 200);
  --color-<name>-600: oklch(0.57 0.22 200);
  --color-<name>-700: oklch(0.47 0.22 200);
  --color-<name>-800: oklch(0.36 0.21 200);
  --color-<name>-900: oklch(0.25 0.20 200);
}
```

---

## 2) Adicionar a paleta ao `.dark`

```css
/* === Paleta dark === */
.dark {
  --color-<name>-50: oklch(0.25 0.20 200);
  --color-<name>-100: oklch(0.35 0.21 200);
  --color-<name>-200: oklch(0.46 0.22 200);
  --color-<name>-300: oklch(0.56 0.22 200);
  --color-<name>-400: oklch(0.67 0.20 200);
  --color-<name>-500: oklch(0.76 0.18 200);
  --color-<name>-600: oklch(0.84 0.15 200);
  --color-<name>-700: oklch(0.90 0.10 200);
  --color-<name>-800: oklch(0.94 0.06 200);
  --color-<name>-900: oklch(0.98 0.03 200);
}
```

---

## 3) Criar o bloco `.theme-<name>`

```css
/* === Mapeamento do tema: .theme-<name> === */
.theme-<name> .theme-container,
.theme-<name> [data-radix-popper-content-wrapper] {
  --primary: var(--color-<name>-600);
  --primary-foreground: var(--color-<name>-50);

  --ring: var(--color-<name>-300);

  --chart-1: var(--color-<name>-300);
  --chart-2: var(--color-<name>-500);
  --chart-3: var(--color-<name>-600);
  --chart-4: var(--color-<name>-700);
  --chart-5: var(--color-<name>-800);

  --sidebar-primary: var(--color-<name>-600);
  --sidebar-primary-foreground: var(--color-<name>-50);
  --sidebar-ring: var(--color-<name>-400);

  @variant dark {
    --primary: var(--color-<name>-500);
    --primary-foreground: var(--color-<name>-900);
    --ring: var(--color-<name>-900);

    --sidebar-primary: var(--color-<name>-500);
    --sidebar-primary-foreground: var(--color-<name>-900);
    --sidebar-ring: var(--color-<name>-900);
  }
}
```

---

## 4) Adicionar ao seletor (`theme-selector.tsx`)

```ts
const DEFAULT_THEMES = [
  { name: "Default", value: "default" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Amber", value: "amber" },
  { name: "Violet", value: "violet" },
  { name: "Red", value: "red" },
  { name: "Stone", value: "stone" },
  { name: "MyColor", value: "<name>" } // <-- novo tema
];
```

---

## 5) Exemplos corretos de uso no JSX

```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded">
  Botão
</button>

<div className="bg-background p-4 border border-border text-foreground">
  Container temático
</div>
```

---

# 🎛️ Seletor de Cores

O seletor (`src/components/shared/theme-selector.tsx`) permite alternar entre temas sem recarregar a página.  
Ele trabalha junto com o `ActiveThemeProvider`, que atualiza automaticamente:

- `class="theme-<cor>"`
- `class="dark"` quando modo escuro está ativo

---

# 🔧 Como Começar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Entre no projeto
cd Boiler-plate

# Instale dependências
npm install

# Rode o ambiente
npm run dev
```

Acesse:  
➡️ **http://localhost:3000**

---

# 📝 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm start        # Servir produção
npm run lint     # Lint
```

---

# 🏗️ Arquitetura

### Providers

- **ThemeProvider** – controla dark/light
- **ActiveTheme** – controla o tema de cor (`theme-blue`, `theme-stone`, etc)

### Componentes Principais

- **AppHeader**
- **AppSidebar**
- **ModeToggle**
- **ThemeSelector**

### UI Components (shadcn/ui)

- Button  
- Input  
- Select  
- Dialog  
- DropdownMenu  
- Avatar  
- etc…

---

# 📦 Exemplo de Criação de Nova Seção

```tsx
export default function NewSection() {
  return (
    <section className="p-6 rounded-md bg-background border border-border">
      <h2 className="text-lg mb-4 text-foreground">Minha Seção</h2>

      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Botão Temático
      </button>
    </section>
  );
}
```

---

# 🎯 Próximos Passos

- Personalizar seu tema em `globals.css`
- Criar páginas novas em `src/app/`
- Evoluir componentes UI
- Integrar backend/API
- Deploy no Vercel

---

# 📚 Recursos

- https://nextjs.org/docs  
- https://tailwindcss.com  
- https://ui.shadcn.com  
- https://www.radix-ui.com  

---

**Feito para ser seu boilerplate definitivo de dashboards modernos.**
