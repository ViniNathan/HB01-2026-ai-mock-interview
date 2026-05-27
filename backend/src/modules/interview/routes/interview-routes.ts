import {
  createSessionSchema,
  streamMessageSchema,
} from "@/modules/interview/validations/interview-schemas";
import { validate } from "@/shared";
import type { Router } from "express";

import { makeInterviewController } from "@/factories/interview/interview-controller-factory";

export default function interviewRoutes(router: Router): void {
  const controller = makeInterviewController();

  router.post(
    "/sessions",
    validate(createSessionSchema),
    controller.createSession,
  );
  router.get("/sessions", controller.listSessions);
  router.post(
    "/sessions/:sessionId/stream",
    validate(streamMessageSchema),
    controller.stream,
  );
  router.get(
    "/sessions/:sessionId/messages",
    controller.getMessages,
  );
}
