import { type ConnectionOptions, Queue } from "bullmq";
import Redis from "ioredis";

import { env } from "@/config/env";
import { logger } from "@/shared";

export type ResumeJobData = {
  resumeId: string;
};

export const RESUME_QUEUE_NAME = "resume-processing";
const RESUME_JOB_NAME = "process";

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

redis.on("error", (error) => {
  logger.error("Redis connection error", { error: error.message });
});

export const redisConnection = redis as ConnectionOptions;

const connection = redisConnection;

const resumeQueue = new Queue<ResumeJobData, void, typeof RESUME_JOB_NAME>(
  RESUME_QUEUE_NAME,
  { connection },
);

export async function add({ resumeId }: { resumeId: string }): Promise<void> {
  await resumeQueue.add(RESUME_JOB_NAME, { resumeId });
}
