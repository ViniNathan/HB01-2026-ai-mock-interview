import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  interviewMessage: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
}));

vi.mock("@/infrastructure/database", () => ({
  default: mockPrisma,
}));

import { MessageRepository } from "./message-repository";

const sampleMessage = {
  id: "message-id",
  sessionId: "session-id",
  userId: 1,
  role: "human" as const,
  content: "Hello",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

const createParams = {
  sessionId: sampleMessage.sessionId,
  userId: sampleMessage.userId,
  content: sampleMessage.content,
};

describe("MessageRepository", () => {
  const repository = new MessageRepository();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createHuman persists a human message with denormalized userId", async () => {
    mockPrisma.interviewMessage.create.mockResolvedValue(sampleMessage);

    const result = await repository.createHuman(createParams);

    expect(mockPrisma.interviewMessage.create).toHaveBeenCalledWith({
      data: {
        ...createParams,
        role: "human",
      },
    });
    expect(result).toEqual(sampleMessage);
  });

  it("createAi persists an ai message with denormalized userId", async () => {
    const aiMessage = { ...sampleMessage, role: "ai" as const };
    mockPrisma.interviewMessage.create.mockResolvedValue(aiMessage);

    const result = await repository.createAi(createParams);

    expect(mockPrisma.interviewMessage.create).toHaveBeenCalledWith({
      data: {
        ...createParams,
        role: "ai",
      },
    });
    expect(result).toEqual(aiMessage);
  });

  it("listBySessionId returns messages ordered by createdAt asc", async () => {
    const messages = [sampleMessage];
    mockPrisma.interviewMessage.findMany.mockResolvedValue(messages);

    const result = await repository.listBySessionId(sampleMessage.sessionId);

    expect(mockPrisma.interviewMessage.findMany).toHaveBeenCalledWith({
      where: { sessionId: sampleMessage.sessionId },
      orderBy: { createdAt: "asc" },
    });
    expect(result).toEqual(messages);
  });
});
