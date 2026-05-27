import { describe, expect, it } from "vitest";

import type { StructuredSummary } from "@/modules/resumes/validations/resume-schemas";

import {
  buildInterviewerSystemPrompt,
  CONTEXT_SECTION_HEADER,
  GUARDRAILS_SECTION_HEADER,
  LEVEL_SECTION_HEADER,
  RESUME_SECTION_HEADER,
} from "./interviewer-system-prompt";

const sampleSummary: StructuredSummary = {
  personal_info: { name: "Alex", title: "Backend Engineer" },
  skills: ["TypeScript", "PostgreSQL"],
  experiences: [
    {
      company: "Acme",
      role: "Engineer",
      highlights: ["Built APIs"],
    },
  ],
  projects: [{ name: "Interview prep app" }],
};

describe("buildInterviewerSystemPrompt", () => {
  it("places guardrails before level, résumé, and context sections", () => {
    const prompt = buildInterviewerSystemPrompt({
      level: "mid",
      resumeSummary: sampleSummary,
      turnCount: 2,
      maxTurns: 7,
    });

    const guardrailsIndex = prompt.indexOf(GUARDRAILS_SECTION_HEADER);
    const levelIndex = prompt.indexOf(LEVEL_SECTION_HEADER);
    const resumeIndex = prompt.indexOf(RESUME_SECTION_HEADER);
    const contextIndex = prompt.indexOf(CONTEXT_SECTION_HEADER);

    expect(guardrailsIndex).toBeGreaterThanOrEqual(0);
    expect(levelIndex).toBeGreaterThan(guardrailsIndex);
    expect(resumeIndex).toBeGreaterThan(levelIndex);
    expect(contextIndex).toBeGreaterThan(resumeIndex);
  });

  it("uses structured summary JSON only, not raw PDF text", () => {
    const prompt = buildInterviewerSystemPrompt({
      level: "entry",
      resumeSummary: sampleSummary,
      turnCount: 0,
      maxTurns: 5,
    });

    expect(prompt).toContain(JSON.stringify(sampleSummary, null, 2));
    expect(prompt).toContain("structured résumé summary");
    expect(prompt).not.toContain("%PDF-");
  });

  it("does not instruct the model to call review-item tools", () => {
    const prompt = buildInterviewerSystemPrompt({
      level: "senior",
      resumeSummary: sampleSummary,
      turnCount: 1,
      maxTurns: 8,
    });

    expect(prompt).not.toContain("list_review_items");
  });
});
