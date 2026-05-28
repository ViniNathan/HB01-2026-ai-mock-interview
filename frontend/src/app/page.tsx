import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileStack,
  MessageSquareText,
  Radar,
  Sparkles,
} from "lucide-react";

import { MarketingHeader } from "@/components/marketing-header";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const workflow = [
  {
    step: "01",
    title: "Upload do curriculo em PDF",
    description:
      "O backend salva no R2, extrai o texto e monta um resumo estruturado com LLM.",
  },
  {
    step: "02",
    title: "Sessao guiada por senioridade",
    description:
      "A IA conduz a entrevista como Tech Lead e adapta profundidade para entry, mid ou senior.",
  },
  {
    step: "03",
    title: "Feedback final acionavel",
    description:
      "No ultimo turno, a plataforma fecha a conversa com um resumo claro de pontos fortes e lacunas.",
  },
] as const;

const lenses = [
  "Dominio tecnico e profundidade de raciocinio",
  "Trade-offs, clareza de comunicacao e ownership",
  "Lideranca tecnica, estrutura e consistencia nas respostas",
] as const;

const signals = [
  {
    title: "Structured summary",
    body: "A IA usa apenas o resumo estruturado do curriculo para manter o contexto limpo e seguro.",
  },
  {
    title: "Turn control no backend",
    body: "Nada de extrapolar sessao ou duplicar stream. O servidor governa ownership, limite e encerramento.",
  },
  {
    title: "Review backlog automatico",
    body: "Os topicos recorrentes viram itens de revisao persistidos, deduplicados e prontos para estudo.",
  },
] as const;

export default function Home() {
  return (
    <main className="page-shell hero-grid min-h-screen pb-16">
      <MarketingHeader />

      <section className="content-width section-gap grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <span className="eyebrow">
            <Sparkles className="size-3.5 text-primary" />
            mock interviews com postura de Tech Lead
          </span>

          <div className="space-y-5">
            <h1 className="headline-balance max-w-4xl text-5xl font-bold tracking-[-0.045em] text-white md:text-7xl">
              Treine entrevistas tecnicas com uma IA que cobra profundidade, nao
              frases prontas.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              O usuario envia o curriculo, escolhe o nivel de senioridade e
              entra numa conversa que simula a pressao, o contexto e os
              trade-offs de uma entrevista real.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-[6px] px-6 text-sm font-semibold",
              )}
            >
              Explorar dashboard
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-[6px] border-white/10 bg-transparent px-6 text-sm text-white hover:bg-white/6",
              )}
            >
              Entrar para testar
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {signals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-[8px] border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <p className="text-sm font-semibold tracking-[-0.02em] text-white">
                  {signal.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card relative overflow-hidden rounded-[10px] p-6">
          <div className="absolute inset-x-6 top-6 h-px shimmer-line" />
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Interview engine
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Arquitetura pronta para entrevistar, fechar feedback e gerar
                  backlog.
                </p>
              </div>
              <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                SSE + LangGraph
              </div>
            </div>

            <div className="space-y-3 rounded-[8px] border border-white/8 bg-black/30 p-4">
              {workflow.map((item) => (
                <div
                  key={item.step}
                  className="grid gap-3 border-b border-white/6 pb-3 last:border-b-0 last:pb-0 md:grid-cols-[64px_1fr]"
                >
                  <span className="text-xs font-semibold tracking-[0.24em] text-primary">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  modelos
                </p>
                <p className="mt-2 text-sm text-white">
                  GPT-5 para entrevista
                </p>
                <p className="text-sm text-white">GPT-5 mini para extracao</p>
              </div>
              <div className="rounded-[8px] border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  persistencia
                </p>
                <p className="mt-2 text-sm text-white">
                  Postgres + PostgresSaver
                </p>
                <p className="text-sm text-white">Redis + Cloudflare R2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="content-width section-gap">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">
              <FileStack className="size-3.5 text-primary" />
              como funciona
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Da leitura do curriculo ao feedback final, sem perder o contexto
              tecnico no meio do caminho.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            O fluxo foi desenhado para separar processamento, entrevista e
            consolidacao de review items. Isso deixa o chat responsivo e a
            plataforma confiavel.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {workflow.map((item) => (
            <Card
              key={item.step}
              className="glass-card rounded-[8px] border-white/8 bg-white/[0.03] py-0"
            >
              <CardHeader className="px-5 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.24em] text-primary">
                    {item.step}
                  </span>
                </div>
                <CardTitle className="text-xl tracking-[-0.03em] text-white">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="rounded-[8px] border border-white/8 bg-black/25 px-4 py-3 text-sm text-muted-foreground">
                  Pipeline orientado por fila, ownership garantido no backend e
                  streaming do turno via SSE.
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="feedback" className="content-width section-gap grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card rounded-[10px] p-6">
          <span className="eyebrow">
            <BrainCircuit className="size-3.5 text-primary" />
            o que a IA avalia
          </span>
          <div className="mt-6 space-y-4">
            {lenses.map((lens, index) => (
              <div
                key={lens}
                className="rounded-[8px] border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <p className="text-xs font-semibold tracking-[0.24em] text-primary">
                  eixo {index + 1}
                </p>
                <p className="mt-2 text-base tracking-[-0.02em] text-white">
                  {lens}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[10px] p-6">
          <span className="eyebrow">
            <MessageSquareText className="size-3.5 text-primary" />
            feedback estruturado
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[8px] border border-white/8 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                ponto forte
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
                Boa articulacao de trade-offs
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                A resposta mostra maturidade ao discutir impacto operacional,
                custo de manutencao e efeitos colaterais de arquitetura.
              </p>
            </div>
            <div className="rounded-[8px] border border-white/8 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                ponto de revisao
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
                Clareza ao explicar consistencia vs disponibilidade
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                O fechamento da sessao nao para em julgamento. Ele gera um
                backlog acionavel para estudo continuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="revisao" className="content-width section-gap">
        <div className="glass-card rounded-[10px] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow">
                <Radar className="size-3.5 text-primary" />
                backlog automatico de revisao
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                Cada entrevista deixa um rastro util para a proxima.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                O backend consolida topicos recorrentes, evita duplicacao cega e
                transforma feedback em itens que realmente ajudam o usuario a se
                preparar melhor.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                [
                  "System design",
                  "Prioridade alta",
                  "Explique melhor escolhas de consistencia e cache.",
                ],
                [
                  "Feedback loops",
                  "Prioridade media",
                  "Torne mais concretos os exemplos de mentoring e alinhamento.",
                ],
                [
                  "Profiling",
                  "Prioridade baixa",
                  "Aprofunde diferenca entre medir e otimizar cedo demais.",
                ],
              ].map(([topic, priority, description]) => (
                <div
                  key={topic}
                  className="rounded-[8px] border border-white/8 bg-black/25 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold tracking-[-0.02em] text-white">
                      {topic}
                    </p>
                    <span className="rounded-full border border-white/8 bg-white/6 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
