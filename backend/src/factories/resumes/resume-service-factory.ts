import { add } from "@/infrastructure/queue/resume-queue";
import { createR2ObjectStorage } from "@/infrastructure/storage/r2-client";
import { ResumeService } from "@/modules/resumes/service/resume-service";
import { ResumeRepository } from "@/modules/resumes/repository/resume-repository";

export function makeResumeService(): ResumeService {
  return new ResumeService(
    new ResumeRepository(),
    createR2ObjectStorage(),
    { add },
  );
}
