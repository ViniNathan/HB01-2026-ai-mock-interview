const locales = ["pt", "en"] as const;

type Locale = (typeof locales)[number];

type Dictionary = {
  nav: {
    links: { href: string; label: string }[];
    cta: string;
  };
  hero: {
    kicker: string;
    title: string;
    highlight: string;
    ctaLabel: string;
    supportingText: string;
    preview: {
      sessionLabel: string;
      question: string;
      answer: string;
      prompt: string;
      contextTitle: string;
      contextBody: string;
    };
  };
  features: {
    heading: string;
    highlight: string;
    cards: {
      title: string;
      description: string;
      variant: "resume" | "senior" | "stream" | "review";
      badge?: string;
    }[];
    topicTracking: {
      title: string;
      titleLine2: string;
      description: string;
    };
    topics: { title: string; status: string; tone: "critical" | "good" | "neutral" }[];
  };
  practice: {
    title: string;
    description: string;
    prompt: string;
    levels: string[];
    activeLevel: string;
    activeSessionLabel: string;
  };
  carousel: {
    eyebrow: string;
    title: string;
    highlight: string;
    slides: { title: string; description: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    title: string;
    highlight: string;
    ctaLabel: string;
  };
  footer: {
    caption: string;
    links: string[];
    copyright: string;
    tagline: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    nav: {
      links: [
        { href: "#product", label: "Produto" },
        { href: "#features", label: "Recursos" },
        { href: "#practice", label: "Praticar" },
        { href: "#about", label: "Sobre" },
      ],
      cta: "Começar agora",
    },
    hero: {
      kicker: "Desenvolvido com GPT-5 / Feito para engenheiros",
      title: "A entrevista",
      highlight: "que te prepara",
      ctaLabel: "Comece sua primeira sessão",
      supportingText: "Grátis para engenheiros individuais. Sem cartão de crédito.",
      preview: {
        sessionLabel: "Sessão de Entrevista - Nível Sênior",
        question:
          "Na Nubank, lidamos com milhões de transações simultâneas. Como você projetaria um mecanismo de lock distribuído para o nosso ledger de cartão de crédito?",
        answer:
          "Eu começaria considerando o Redis com o algoritmo Redlock, mas dado os requisitos do ledger, talvez uma abordagem baseada em consenso como o Raft...",
        prompt: "Explique sua decisão de arquitetura...",
        contextTitle: "Contexto",
        contextBody:
          "Analisando a resposta do candidato quanto ao trade-off entre consistência e disponibilidade.",
      },
    },
    features: {
      heading: "Faça de tudo com",
      highlight: "Hone",
      cards: [
        {
          title: "Currículos com IA",
          description:
            "Análise instantânea da sua experiência em relação aos requisitos da vaga.",
          variant: "resume",
        },
        {
          title: "Modo Sênior",
          description:
            "Foco em design de sistemas de alto nível e sinais de liderança.",
          variant: "senior",
          badge: "Ativo",
        },
        {
          title: "Streaming",
          description:
            "Perguntas adaptativas em tempo real com base na sua última resposta.",
          variant: "stream",
        },
        {
          title: "Revisão Técnica",
          description: "Detalhamento completo dos seus pontos fortes técnicos.",
          variant: "review",
        },
      ],
      topicTracking: {
        title: "Rastreio de",
        titleLine2: "Tópicos",
        description:
          "O Hone monitora mais de 40 domínios de engenharia para garantir que você esteja coberto em toda a stack.",
      },
      topics: [
        { title: "Consenso Distribuído", status: "Crítico", tone: "critical" },
        { title: "Teorema CAP", status: "Dominado", tone: "good" },
        { title: "Internals do Kafka", status: "Revisar", tone: "neutral" },
        { title: "Query Plan Ops", status: "Dominado", tone: "good" },
        { title: "Cache LRU", status: "Dominado", tone: "good" },
        { title: "Busca Binária", status: "Dominado", tone: "good" },
      ],
    },
    practice: {
      title: "Seu Tech Lead pessoal",
      description:
        "O que o Hone pode fazer? Descubra tudo que pode ser delegado, da arquitetura de sistemas ao planejamento do seu roteiro de entrevistas.",
      prompt:
        "Projete um serviço de notificações de alta disponibilidade que suporte 100 mil requisições por segundo.",
      levels: ["Júnior", "Pleno", "Sênior+"],
      activeLevel: "Sênior+",
      activeSessionLabel: "Sessão Ativa",
    },
    carousel: {
      eyebrow: "Histórias reais",
      title: "Engenheiros que",
      highlight: "conquistaram a vaga",
      slides: [
        {
          title: "“Simulei 12 entrevistas de sistemas antes da entrevista real na empresa dos meus sonhos.”",
          description: "Engenheiro Backend Sênior · Modo Sênior",
        },
        {
          title: "“O feedback em tempo real me mostrou exatamente onde eu travava sob pressão.”",
          description: "Engenheira Full-stack · Streaming",
        },
        {
          title: "“O rastreio de tópicos revelou que eu estava fraco em consenso distribuído — foquei ali e passei.”",
          description: "Engenheiro de Plataforma · Rastreio de Tópicos",
        },
        {
          title: "“Revisar minha entrevista técnica ponto a ponto foi melhor que qualquer mentor que já tive.”",
          description: "Engenheira Mobile · Revisão Técnica",
        },
      ],
    },
    faq: {
      eyebrow: "Perguntas",
      title: "FAQ",
      items: [
        {
          question: "Quais níveis o Hone suporta?",
          answer:
            "Oferecemos trilhas de prática de Júnior a Staff e Principal, com prompts personalizados para entrevistas de backend, frontend, full-stack e mobile.",
        },
        {
          question: "Meus dados de entrevista são privados?",
          answer:
            "Sim. As sessões ficam vinculadas ao contexto da sua conta e são usadas apenas para conduzir o fluxo da entrevista, o feedback final e o backlog de revisão.",
        },
        {
          question: "Posso convidar meu time?",
          answer:
            "Sim. Os fluxos de prática em equipe podem compartilhar prompts de entrevista, padrões de revisão e ciclos de aprendizado entre engenheiros.",
        },
        {
          question: "Como funciona o preço?",
          answer:
            "A prática individual começa gratuita. Recursos de equipe e fluxos de revisão mais profundos podem ser adicionados depois como funcionalidades premium do workspace.",
        },
      ],
    },
    finalCta: {
      title: "Entreviste-se com",
      highlight: "confiança",
      ctaLabel: "Usar o Hone",
    },
    footer: {
      caption: "Entrevista simulada com IA",
      links: ["X", "LinkedIn", "Instagram", "Legal", "Privacidade"],
      copyright: "(c) 2026 Hone AI. Todos os direitos reservados.",
      tagline: "Curiosidade cósmica",
    },
  },
  en: {
    nav: {
      links: [
        { href: "#product", label: "Product" },
        { href: "#features", label: "Features" },
        { href: "#practice", label: "Practice" },
        { href: "#about", label: "About" },
      ],
      cta: "Get started",
    },
    hero: {
      kicker: "Powered by GPT-5 / Built for engineers",
      title: "The interview",
      highlight: "that prepares you",
      ctaLabel: "Start your first session",
      supportingText: "Free for individual engineers. No credit card required.",
      preview: {
        sessionLabel: "Interview Session - Senior Level",
        question:
          "At Nubank, we handle millions of concurrent transactions. How would you design a distributed lock mechanism for our credit card ledger?",
        answer:
          "I'd start by considering Redis with the Redlock algorithm, but given the ledger requirements, maybe a consensus-based approach like Raft...",
        prompt: "Explain your architectural decision...",
        contextTitle: "Context",
        contextBody:
          "Analyzing candidate response for consistency versus availability trade-offs.",
      },
    },
    features: {
      heading: "Do anything with",
      highlight: "Hone",
      cards: [
        {
          title: "AI Resumes",
          description:
            "Instant analysis of your experience against role requirements.",
          variant: "resume",
        },
        {
          title: "Senior Mode",
          description:
            "Focusing on high-level system design and leadership signals.",
          variant: "senior",
          badge: "Active",
        },
        {
          title: "Streaming",
          description: "Real-time adaptive questioning based on your last answer.",
          variant: "stream",
        },
        {
          title: "Tech Review",
          description: "Detailed breakdown of your technical strengths.",
          variant: "review",
        },
      ],
      topicTracking: {
        title: "Topic",
        titleLine2: "Tracking",
        description:
          "Hone monitors 40+ engineering domains to ensure you're covered across the entire full-stack spectrum.",
      },
      topics: [
        { title: "Distributed Consensus", status: "Critical", tone: "critical" },
        { title: "CAP Theorem", status: "Mastered", tone: "good" },
        { title: "Kafka Internals", status: "Review", tone: "neutral" },
        { title: "Query Plan Ops", status: "Mastered", tone: "good" },
        { title: "LRU Caching", status: "Mastered", tone: "good" },
        { title: "Binary Search", status: "Mastered", tone: "good" },
      ],
    },
    practice: {
      title: "Your personal Tech Lead",
      description:
        "What can Hone do? Discover everything that can be delegated, from wrangling system architecture to planning your interview roadmap.",
      prompt:
        "Design a highly available notification service that supports 100k requests per second.",
      levels: ["Junior", "Mid-Level", "Senior+"],
      activeLevel: "Senior+",
      activeSessionLabel: "Active Session",
    },
    carousel: {
      eyebrow: "Real stories",
      title: "Engineers who",
      highlight: "landed the offer",
      slides: [
        {
          title: "“I ran 12 system design mocks before the real interview at my dream company.”",
          description: "Senior Backend Engineer · Senior Mode",
        },
        {
          title: "“Real-time feedback showed me exactly where I froze under pressure.”",
          description: "Full-stack Engineer · Streaming",
        },
        {
          title: "“Topic tracking showed I was weak on distributed consensus — I drilled it and passed.”",
          description: "Platform Engineer · Topic Tracking",
        },
        {
          title: "“Reviewing my technical interview line by line beat any mentor I've had.”",
          description: "Mobile Engineer · Tech Review",
        },
      ],
    },
    faq: {
      eyebrow: "Questions",
      title: "FAQ",
      items: [
        {
          question: "What levels does Hone support?",
          answer:
            "We support practice tracks from Junior to Staff and Principal, with tailored prompts for backend, frontend, full-stack, and mobile interviews.",
        },
        {
          question: "Is my interview data private?",
          answer:
            "Yes. Sessions are scoped to your account context and are used only to drive the interview flow, final feedback, and review backlog.",
        },
        {
          question: "Can I invite my team?",
          answer:
            "Yes. Team practice flows can share curated interview prompts, review patterns, and learning loops across engineers.",
        },
        {
          question: "How does the pricing work?",
          answer:
            "Individual practice starts free. Team features and deeper review workflows can be layered in later as premium workspace features.",
        },
      ],
    },
    finalCta: {
      title: "Interview with",
      highlight: "confidence",
      ctaLabel: "Use Hone",
    },
    footer: {
      caption: "AI mock interview",
      links: ["X", "LinkedIn", "Instagram", "Legal", "Privacy"],
      copyright: "(c) 2026 Hone AI. All rights reserved.",
      tagline: "Cosmic curiosity",
    },
  },
};

export { dictionaries, locales };
export type { Dictionary, Locale };
