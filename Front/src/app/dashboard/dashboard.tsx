"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  PlayCircle,
  BookOpen,
  TrendingUp,
  Clock,
  ChevronRight,
  Briefcase,
  Users,
  CheckCircle2,
  Sparkles,
  BarChart3,
  RotateCcw,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Level = "junior" | "pleno" | "senior";
type SceneType = "entrevista" | "onboarding";

interface ReviewTopic {
  id: string;
  topic: string;
  context: string;
  studied: boolean;
  sessionDate: string;
}

interface Session {
  id: string;
  title: string;
  level: Level;
  type: SceneType;
  date: string;
  score: number;
}

const LEVELS: {
  value: Level;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    value: "junior",
    label: "Júnior",
    description: "Fundamentos, sintaxe e boas práticas",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    value: "pleno",
    label: "Pleno",
    description: "Design Patterns, performance e trade-offs",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    value: "senior",
    label: "Sênior",
    description: "Sistemas distribuídos, arquitetura e liderança",
    color: "text-purple-600 dark:text-purple-400",
  },
];

const SCENE_TYPES: {
  value: SceneType;
  label: string;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    value: "entrevista",
    label: "Entrevista Técnica",
    icon: Briefcase,
    description: "Foco em avaliação de conhecimento técnico sob pressão",
  },
  {
    value: "onboarding",
    label: "Onboarding / Primeiro Dia",
    icon: Users,
    description: "Foco em comunicação e integração com o time",
  },
];

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Autenticação com JWT",
    level: "pleno",
    type: "entrevista",
    date: "2026-05-26",
    score: 72,
  },
  {
    id: "2",
    title: "Primeiro dia como Dev Sênior",
    level: "senior",
    type: "onboarding",
    date: "2026-05-24",
    score: 88,
  },
  {
    id: "3",
    title: "Design Patterns em Node.js",
    level: "pleno",
    type: "entrevista",
    date: "2026-05-22",
    score: 65,
  },
];

const initialReviewTopics: ReviewTopic[] = [
  {
    id: "1",
    topic: "Autenticação com JWT",
    context: "Confundiu access token com refresh token",
    studied: false,
    sessionDate: "2026-05-26",
  },
  {
    id: "2",
    topic: "SOLID — Responsabilidade Única",
    context: "Explicação incompleta sem exemplo prático",
    studied: false,
    sessionDate: "2026-05-22",
  },
  {
    id: "3",
    topic: "CAP Theorem",
    context: "Dúvida ao diferenciar Consistency vs Availability",
    studied: true,
    sessionDate: "2026-05-20",
  },
  {
    id: "4",
    topic: "Indexação em banco de dados",
    context: "Não soube explicar quando não usar índices",
    studied: false,
    sessionDate: "2026-05-18",
  },
];

function levelBadgeClass(level: Level) {
  switch (level) {
    case "junior":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "pleno":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "senior":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
  }
}

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function StatCard({
  icon: Icon,
  label,
  value,
  iconClass,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  iconClass?: string;
}) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3 py-1">
        <div className="rounded-lg bg-muted p-2">
          <Icon className={cn("h-5 w-5", iconClass)} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [selectedLevel, setSelectedLevel] = useState<Level>("pleno");
  const [selectedType, setSelectedType] = useState<SceneType>("entrevista");
  const [reviewTopics, setReviewTopics] = useState(initialReviewTopics);

  const toggleStudied = (id: string) => {
    setReviewTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, studied: !t.studied } : t)),
    );
  };

  const pendingCount = reviewTopics.filter((t) => !t.studied).length;
  const avgScore = Math.round(
    mockSessions.reduce((sum, s) => sum + s.score, 0) / mockSessions.length,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Olá! Pronto para treinar?
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Simule entrevistas e onboardings reais com IA e evolua sua
            performance técnica.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={PlayCircle}
            label="Cenas realizadas"
            value="12"
            iconClass="text-blue-500"
          />
          <StatCard
            icon={BarChart3}
            label="Score médio"
            value={`${avgScore}%`}
            iconClass="text-amber-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Dias em sequência"
            value="3"
            iconClass="text-emerald-500"
          />
          <StatCard
            icon={ListChecks}
            label="Para revisar"
            value={String(pendingCount)}
            iconClass="text-purple-500"
          />
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left col: Nova Cena + Sessões Recentes */}
          <div className="space-y-6 lg:col-span-2">
            {/* Nova Cena */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Iniciar Nova Cena
                </CardTitle>
                <CardDescription>
                  Escolha seu nível e o tipo de cena para começar o treino
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Level */}
                <div>
                  <p className="mb-3 text-xs font-medium text-foreground">
                    Nível
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {LEVELS.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setSelectedLevel(level.value)}
                        className={cn(
                          "flex flex-col items-start rounded-lg border-2 p-3 text-left transition-all",
                          selectedLevel === level.value
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            level.color,
                          )}
                        >
                          {level.label}
                        </span>
                        <span className="mt-1 text-xs leading-tight text-muted-foreground">
                          {level.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scene type */}
                <div>
                  <p className="mb-3 text-xs font-medium text-foreground">
                    Tipo de cena
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {SCENE_TYPES.map((scene) => {
                      const Icon = scene.icon;
                      return (
                        <button
                          key={scene.value}
                          onClick={() => setSelectedType(scene.value)}
                          className={cn(
                            "flex flex-col items-start rounded-lg border-2 p-4 text-left transition-all",
                            selectedType === scene.value
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
                          )}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <div
                              className={cn(
                                "rounded-md p-1.5",
                                selectedType === scene.value
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-semibold text-foreground">
                              {scene.label}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {scene.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg">
                  <PlayCircle className="h-5 w-5" />
                  Iniciar cena
                </Button>
              </CardContent>
            </Card>

            {/* Sessões Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Sessões Recentes
                </CardTitle>
                <CardAction>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground"
                  >
                    Ver todas
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockSessions.map((session) => (
                    <div
                      key={session.id}
                      className="group flex cursor-pointer items-center justify-between rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted/70"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-md border border-border bg-background p-2">
                          {session.type === "entrevista" ? (
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Users className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="mb-1 text-sm font-medium leading-none text-foreground">
                            {session.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "rounded-md px-1.5 py-0.5 text-xs font-medium",
                                levelBadgeClass(session.level),
                              )}
                            >
                              {
                                LEVELS.find((l) => l.value === session.level)
                                  ?.label
                              }
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(session.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-sm font-bold",
                            scoreColor(session.score),
                          )}
                        >
                          {session.score}%
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right col: Assuntos para Revisar */}
          <div>
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Assuntos para Revisar
                </CardTitle>
                <CardAction>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      pendingCount > 0
                        ? "bg-destructive/10 text-destructive"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                    )}
                  >
                    {pendingCount} pendente{pendingCount !== 1 ? "s" : ""}
                  </span>
                </CardAction>
                <CardDescription>
                  Tópicos identificados pela IA nas suas sessões
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingCount === 0 ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <CheckCircle2 className="mb-2 h-8 w-8 text-emerald-500" />
                    <p className="text-sm font-medium text-foreground">
                      Tudo em dia!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Você revisou todos os tópicos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviewTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className={cn(
                          "rounded-lg border p-3 transition-all",
                          topic.studied
                            ? "border-border/50 bg-muted/20 opacity-60"
                            : "border-border bg-card",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={topic.studied}
                            onCheckedChange={() => toggleStudied(topic.id)}
                            className="mt-0.5"
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "text-xs font-medium leading-tight",
                                topic.studied
                                  ? "text-muted-foreground line-through"
                                  : "text-foreground",
                              )}
                            >
                              {topic.topic}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {topic.context}
                            </p>
                            <p className="mt-1.5 text-xs text-muted-foreground/70">
                              {formatDate(topic.sessionDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 w-full gap-2 text-muted-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                  Refazer cena sobre este tema
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
