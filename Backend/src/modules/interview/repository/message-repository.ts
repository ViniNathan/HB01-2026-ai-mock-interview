import prisma from "@/infrastructure/database";
import {
  MessageRole,
  type InterviewMessage,
  type MessageRole as MessageRoleType,
} from "../../../../prisma/generated/client";

export type CreateMessageParams = {
  sessionId: string;
  userId: number;
  content: string;
};

export class MessageRepository {
  async createHuman(params: CreateMessageParams): Promise<InterviewMessage> {
    return this.create(MessageRole.human, params);
  }

  async createAi(params: CreateMessageParams): Promise<InterviewMessage> {
    return this.create(MessageRole.ai, params);
  }

  async listBySessionId(sessionId: string): Promise<InterviewMessage[]> {
    return prisma.interviewMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });
  }

  private async create(
    role: MessageRoleType,
    params: CreateMessageParams,
  ): Promise<InterviewMessage> {
    const { sessionId, userId, content } = params;
    return prisma.interviewMessage.create({
      data: { sessionId, userId, role, content },
    });
  }
}
