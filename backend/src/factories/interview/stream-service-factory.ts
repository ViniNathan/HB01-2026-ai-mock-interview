import { ReviewItemsGeneratorAdapter } from "@/infrastructure/ai/langgraph/review-items-generator-adapter";
import { MessageRepository } from "@/modules/interview/repository/message-repository";
import { SessionRepository } from "@/modules/interview/repository/session-repository";
import { InterviewStreamService } from "@/modules/interview/service/stream-service";
import { ResumeRepository } from "@/modules/resumes/repository/resume-repository";

import { makeInterviewGraph } from "./interview-graph-factory";
import { makeReviewMergeService } from "./review-merge-service-factory";

export function makeInterviewStreamService(): InterviewStreamService {
  return new InterviewStreamService(
    new SessionRepository(),
    new MessageRepository(),
    new ResumeRepository(),
    makeInterviewGraph(),
    makeReviewMergeService(),
    new ReviewItemsGeneratorAdapter(),
  );
}
