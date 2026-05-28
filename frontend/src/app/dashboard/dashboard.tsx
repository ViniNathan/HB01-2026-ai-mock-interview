import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileUp,
  Layers3,
  Radar,
  Sparkles,
} from "lucide-react";

import { DashboardAppBar } from "@/components/dashboard-app-bar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sessions = [
  {
    title: "Backend architecture deep dive",
    level: "senior",
    turns: "7 / 8 turnos",
    status: "feedback pronto",
  },
  {
    title: "Node.js fundamentals",
    level: "entry",
    turns: "4 / 5 turnos",
    status: "pronto para retomar",
  },
  {
    title: "System design trade-offs",
    level: "mid",
    turns: "2 / 7 turnos",
    status: "em andamento",
  },
] as const;

const reviewItems = [
  {
    topic: "Consistency vs availability",
    description:
      "Boa intuicao geral, mas ainda falta explicar impacto operacional e degradacao controlada.",
    priority: "alta",
  },
  {
    topic: "Cache invalidation",
    description:
      "As respostas ficaram corretas, mas superficiais ao falar de ownership e risco de stale data.",
    priority: "media",
  },
  {
    topic: "Mentoria tecnica",
    description:
      "Trazer exemplos concretos de feedback dificil, alinhamento e formacao de criterio no time.",
    priority: "media",
  },
] as const;

const roadmap = [
  "Conectar upload real de curriculo ao endpoint POST /api/resumes.",
  "Trocar dados demonstrativos por consultas de sessoes e mensagens.",
  "Adicionar tela de streaming com SSE e estados de ultimo turno.",
  "Proteger a area autenticada quando a estrategia de sessao do frontend entrar.",
] as const;

function levelClass(level: string) {
  switch (level) {
    case "entry":
      return "text-emerald-300";
    case "mid":
      return "text-sky-300";
    default:
      return "text-violet-300";
  }
}

function priorityClass(priority: string) {
  switch (priority) {
    case "alta":
      return "text-rose-300";
    case "media":
      return "text-amber-300";
    default:
      return "text-emerald-300";
  }
}

export default function Dashboard() {
  return (
    <main className="page-shell min-h-screen pb-16">
      <DashboardAppBar />

      <div className="content-width mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="grid gap-6">
          <Card className="glass-card rounded-[10px] border-white/8 bg-[rgba(20,20,20,0.82)] py-0">
            <CardHeader className="px-6 pt-6">
              <div className="eyebrow w-fit">
                <Sparkles className="size-3.5 text-primary" />
                fase atual do frontend
              </div>
              <CardTitle className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                Shell do produto pronta para plugar upload, sessoes e feedback
                real.
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Esta tela usa estados demonstrativos intencionais. O objetivo
                aqui e deixar estrutura, copy, prioridade visual e blocos de
                produto prontos para receber a integracao completa.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-3">
              <div className="rounded-[8px] border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  resumes
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                  1
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Um curriculo pronto para uso e base para acionar a primeira
                  sessao.
                </p>
              </div>
              <div className="rounded-[8px] border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  sessoes
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                  3
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Historico recente para exibir evolucao, retomada e feedback
                  final.
                </p>
              </div>
              <div className="rounded-[8px] border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  review items
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                  3
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Topicos persistidos para orientar estudo entre uma entrevista e
                  outra.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card className="glass-card rounded-[10px] border-white/8 py-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl tracking-[-0.03em] text-white">
                  <FileUp className="size-4 text-primary" />
                  Curriculo e readiness
                </CardTitle>
                <CardDescription className="text-sm leading-7 text-muted-foreground">
                  Espaco preparado para o fluxo de upload assicrono e polling de
                  status do processamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="rounded-[8px] border border-dashed border-primary/30 bg-primary/6 px-5 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        senior-node-2026.pdf
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Status atual: resumo estruturado pronto, apto para criar
                        nova sessao.
                      </p>
                    </div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                      ready
                    </span>
                  </div>
                </div>
                <div className="mt-4 rounded-[8px] border border-white/8 bg-black/20 px-4 py-4 text-sm leading-7 text-muted-foreground">
                  O componente visual ja assume os estados `processing`, `ready`
                  e `failed`, mas ainda nao dispara o upload real no frontend.
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-[10px] border-white/8 py-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl tracking-[-0.03em] text-white">
                  <BriefcaseBusiness className="size-4 text-primary" />
                  Proxima sessao
                </CardTitle>
                <CardDescription className="text-sm leading-7 text-muted-foreground">
                  Bloco desenhado para virar o CTA principal da experiencia
                  autenticada.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["entry", "5 turnos", "Fundamentos e clareza"],
                    ["mid", "7 turnos", "Trade-offs e ownership"],
                    ["senior", "8 turnos", "Arquitetura e lideranca"],
                  ].map(([level, turns, body]) => (
                    <div
                      key={level}
                      className="rounded-[8px] border border-white/8 bg-black/20 p-4"
                    >
                      <p
                        className={cn(
                          "text-xs font-semibold uppercase tracking-[0.22em]",
                          levelClass(level),
                        )}
                      >
                        {level}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-white">
                        {turns}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-[6px] px-5 text-sm font-semibold",
                  )}
                >
                  Iniciar entrevista simulada
                  <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card rounded-[10px] border-white/8 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="flex items-center gap-2 text-xl tracking-[-0.03em] text-white">
                <CalendarClock className="size-4 text-primary" />
                Sessoes recentes
              </CardTitle>
              <CardDescription className="text-sm leading-7 text-muted-foreground">
                Estrutura pronta para alimentar a lista com
                `/api/interview/sessions` e aprofundar em cada historico.
              </CardDescription>
              <CardAction className="rounded-full border border-white/8 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                mock consciente
              </CardAction>
            </CardHeader>
            <CardContent className="grid gap-3 px-6 pb-6">
              {sessions.map((session) => (
                <div
                  key={session.title}
                  className="rounded-[8px] border border-white/8 bg-black/20 px-4 py-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-base font-semibold tracking-[-0.02em] text-white">
                        {session.title}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        <span className={levelClass(session.level)}>
                          {session.level}
                        </span>
                        <span>{session.turns}</span>
                      </div>
                    </div>
                    <span className="w-fit rounded-full border border-white/8 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white">
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="grid gap-6">
          <Card className="glass-card rounded-[10px] border-white/8 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="flex items-center gap-2 text-xl tracking-[-0.03em] text-white">
                <BookOpenText className="size-4 text-primary" />
                Itens de revisao
              </CardTitle>
              <CardDescription className="text-sm leading-7 text-muted-foreground">
                Os topicos abaixo simulam a saida do `review_generator` apos o
                fechamento da sessao.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 px-6 pb-6">
              {reviewItems.map((item) => (
                <div
                  key={item.topic}
                  className="rounded-[8px] border border-white/8 bg-black/20 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">
                      {item.topic}
                    </p>
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.18em]",
                        priorityClass(item.priority),
                      )}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card rounded-[10px] border-white/8 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="flex items-center gap-2 text-xl tracking-[-0.03em] text-white">
                <Layers3 className="size-4 text-primary" />
                Proximos conectores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6">
              {roadmap.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[8px] border border-white/8 bg-black/20 px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card rounded-[10px] border-white/8 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="flex items-center gap-2 text-xl tracking-[-0.03em] text-white">
                <Radar className="size-4 text-primary" />
                Estado da integracao
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6 text-sm leading-7 text-muted-foreground">
              <div className="rounded-[8px] border border-white/8 bg-black/20 px-4 py-4">
                Backend de resumes, sessoes, stream SSE e review items ja existe
                nesta base.
              </div>
              <div className="rounded-[8px] border border-white/8 bg-black/20 px-4 py-4">
                O frontend desta fase deliberadamente nao finge upload nem chat
                reais. Ele prepara o terreno visual e informacional correto.
              </div>
              <div className="rounded-[8px] border border-white/8 bg-black/20 px-4 py-4">
                Auth segue a linha atual do backend, mas a protecao da area do
                app continua adiada para uma proxima branch.
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-primary/20 bg-primary/8 px-4 py-4 text-primary">
                <Clock3 className="size-4" />
                Proxima entrega natural: upload real + polling + criacao de
                sessao.
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
