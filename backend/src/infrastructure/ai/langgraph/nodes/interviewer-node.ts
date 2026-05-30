import { AIMessage, SystemMessage } from "@langchain/core/messages";
import type { ChatOpenAI } from "@langchain/openai";

import { createInterviewModel } from "@/infrastructure/ai/openai-models";
import { buildInterviewerSystemPrompt } from "@/modules/interview/prompts/interviewer-system-prompt";

import type { InterviewGraphState } from "../interview-state";

export type InterviewerNodeDeps = {
  model?: ChatOpenAI;
};

export function createInterviewerNode(deps: InterviewerNodeDeps = {}) {
  const model = deps.model ?? createInterviewModel();

  return async function interviewerNode(
    state: InterviewGraphState,
  ): Promise<Pick<InterviewGraphState, "messages">> {
    const systemPrompt = buildInterviewerSystemPrompt({
      level: state.level,
      resumeSummary: state.resumeSummary,
      turnCount: state.turnCount,
      maxTurns: state.maxTurns,
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
