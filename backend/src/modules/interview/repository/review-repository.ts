import prisma from "@/infrastructure/database";
import type {
  ReviewItem,
  ReviewPriority,
} from "../../../../prisma/generated/client";

export type UpsertReviewItemParams = {
  userId: number;
  sessionId: string;
  topic: string;
  description: string;
  priority: ReviewPriority;
};

function normalizeTopic(topic: string): string {
  return topic.toLowerCase();
}

const TOPIC_SIMILARITY_THRESHOLD = 0.7;

export class ReviewRepository {
  async listByUserId(userId: number): Promise<ReviewItem[]> {
    return prisma.reviewItem.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  async findByUserIdAndTopicCaseInsensitive(
    userId: number,
    topic: string,
  ): Promise<ReviewItem | null> {
    return prisma.reviewItem.findFirst({
      where: {
        userId,
        topic: normalizeTopic(topic),
      },
    });
  }

  async findSimilarByUserIdAndTopic(
    userId: number,
    topic: string,
    threshold: number = TOPIC_SIMILARITY_THRESHOLD,
  ): Promise<ReviewItem | null> {
    const normalizedTopic = normalizeTopic(topic);
    const matches = await prisma.$queryRaw<ReviewItem[]>`
      SELECT *
      FROM "review_items"
      WHERE "user_id" = ${userId}
        AND similarity("topic", ${normalizedTopic}) >= ${threshold}
      ORDER BY similarity("topic", ${normalizedTopic}) DESC
      LIMIT 1
    `;

    return matches[0] ?? null;
  }

  async upsert(params: UpsertReviewItemParams): Promise<ReviewItem> {
    const { userId, sessionId, description, priority } = params;
    const topic = normalizeTopic(params.topic);

    return prisma.reviewItem.upsert({
      where: {
        userId_topic: { userId, topic },
      },
      create: {
        userId,
        sessionId,
        topic,
        description,
        priority,
      },
      update: {
        sessionId,
        description,
        priority,
      },
    });
  }
}
