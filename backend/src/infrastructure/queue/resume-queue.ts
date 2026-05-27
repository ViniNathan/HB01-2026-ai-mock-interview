import { type ConnectionOptions, Queue } from "bullmq";
import Redis from "ioredis";

import { env } from "@/config/env";

export type ResumeJobData = {
  resumeId: string;
};

export const RESUME_QUEUE_NAME = "resume-processing";
const RESUME_JOB_NAME = "process";

export const redisConnection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
}) as ConnectionOptions;

const connection = redisConnection;

const resumeQueue = new Queue<ResumeJobData, void, typeof RESUME_JOB_NAME>(
  RESUME_QUEUE_NAME,
  { connection },
);

export async function add({ resumeId }: { resumeId: string }): Promise<void> {
  await resumeQueue.add(RESUME_JOB_NAME, { resumeId });
}
