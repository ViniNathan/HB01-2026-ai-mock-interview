import type { Resume } from "../../../../prisma/generated/client";
import { ResumeStatus } from "../../../../prisma/generated/client";
import prisma from "@/infrastructure/database";
import { structuredSummarySchema } from "@/modules/resumes/validations/resume-schemas";

export class ResumeRepository {
  async createProcessing(
    userId: number,
    name: string,
    pdfUrl: string,
    storageKey: string,
    id?: string,
  ): Promise<Resume> {
    return prisma.resume.create({
      data: {
        ...(id !== undefined ? { id } : {}),
        userId,
        name,
        pdfUrl,
        storageKey,
        status: ResumeStatus.processing,
      },
    });
  }

  async updateReady(
    id: string,
    structuredSummary: unknown,
    rawText: string,
  ): Promise<Resume> {
    const parsed = structuredSummarySchema.parse(structuredSummary);

    return prisma.resume.update({
      where: { id },
      data: {
        structuredSummary: parsed,
        rawText,
        status: ResumeStatus.ready,
        errorMessage: null,
      },
    });
  }

  async updateFailed(id: string, errorMessage: string): Promise<Resume> {
    return prisma.resume.update({
      where: { id },
      data: {
        status: ResumeStatus.failed,
        errorMessage,
      },
    });
  }

  async findById(id: string): Promise<Resume | null> {
    return prisma.resume.findUnique({
      where: { id },
    });
  }

  async findByIdAndUserId(
    id: string,
    userId: number,
  ): Promise<Resume | null> {
    return prisma.resume.findFirst({
      where: { id, userId },
    });
  }
}
