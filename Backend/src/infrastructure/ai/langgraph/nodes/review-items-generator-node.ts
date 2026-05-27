import { HumanMessage } from "@langchain/core/messages";
import type { ChatOpenAI } from "@langchain/openai";

import { createReviewModel } from "@/infrastructure/ai/openai-models";
import {
  buildReviewItemsGeneratorPrompt,
  type ExistingReviewItemForPrompt,
} from "@/modules/interview/prompts/review-items-generator-prompt";
import {
  reviewItemsGeneratorOutputSchema,
  type ReviewItemsGeneratorOutput,
} from "@/modules/interview/validations/interview-schemas";
import type { StructuredSummary } from "@/modules/resumes/validations/resume-schemas";

export type ReviewItemsGeneratorInput = {
  transcript: string;
  existingItems: ExistingReviewItemForPrompt[];
  structuredSummary: StructuredSummary;
};

export type StructuredReviewModel = {
  invoke: (input: unknown) => Promise<unknown>;
};

export type ReviewItemsGeneratorNodeDeps = {
  model?: ChatOpenAI;
  structuredModel?: StructuredReviewModel;
};

export function createReviewItemsGeneratorNode(
  deps: ReviewItemsGeneratorNodeDeps = {},
) {
  const structuredModel =
    deps.structuredModel ??
    (deps.model ?? createReviewModel()).withStructuredOutput(
      reviewItemsGeneratorOutputSchema,
    );

  return async function reviewItemsGeneratorNode(
    input: ReviewItemsGeneratorInput,
  ): Promise<ReviewItemsGeneratorOutput> {
    const prompt = buildReviewItemsGeneratorPrompt({
      transcript: input.transcript,
      existingItems: input.existingItems,
      structuredSummary: input.structuredSummary,
    });

    const raw = await structuredModel.invoke([new HumanMessage(prompt)]);
    return reviewItemsGeneratorOutputSchema.parse(raw);
  };
}
