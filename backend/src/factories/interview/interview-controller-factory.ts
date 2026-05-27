import { InterviewController } from "@/modules/interview/controller/interview-controller";

import { makeInterviewStreamService } from "./stream-service-factory";
import { makeSessionService } from "./session-service-factory";

export function makeInterviewController(): InterviewController {
  return new InterviewController(
    makeSessionService(),
    makeInterviewStreamService(),
  );
}
