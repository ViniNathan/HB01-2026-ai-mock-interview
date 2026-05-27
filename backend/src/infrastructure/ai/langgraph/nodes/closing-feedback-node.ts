import { AIMessage, SystemMessage } from "@langchain/core/messages";
import type { ChatOpenAI } from "@langchain/openai";

import { createInterviewModel } from "@/infrastructure/ai/openai-models";
import { buildClosingFeedbackPrompt } from "@/modules/interview/prompts/closing-feedback-prompt";

import type { InterviewGraphState } from "../interview-state";

export type ClosingFeedbackNodeDeps = {
  model?: ChatOpenAI;
};

export function createClosingFeedbackNode(deps: ClosingFeedbackNodeDeps = {}) {
  const model = deps.model ?? createInterviewModel();

  return async function closingFeedbackNode(
    state: InterviewGraphState,
  ): Promise<Pick<InterviewGraphState, "messages">> {
    const systemPrompt = buildClosingFeedbackPrompt({
      level: state.level,
      resumeSummary: state.resumeSummary,
    });

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      ...state.messages,
    ]);

    const aiMessage =
      response instanceof AIMessage
        ? response
        : new AIMessage({
            content:
              typeof response.content === "string"
                ? response.content
                : JSON.stringify(response.content),
          });

    return { messages: [aiMessage] };
  };
}
