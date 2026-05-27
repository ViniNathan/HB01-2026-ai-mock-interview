import { ReviewRepository } from "@/modules/interview/repository/review-repository";
import { ReviewMergeService } from "@/modules/interview/service/review-merge-service";

export function makeReviewMergeService(): ReviewMergeService {
  return new ReviewMergeService(new ReviewRepository());
}
