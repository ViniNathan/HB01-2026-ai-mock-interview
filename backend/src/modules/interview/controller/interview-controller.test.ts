import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";

import type { SessionService } from "@/modules/interview/service/session-service";
import type { InterviewStreamService } from "@/modules/interview/service/stream-service";
import { ConflictError, NotFoundError } from "@/shared";

import { InterviewController } from "./interview-controller";

function createMockResponse() {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  };

  res.status.mockReturnValue(res);

  return res as unknown as Response & {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  };
}

function createMockRequest(
  overrides: Partial<Request> = {},
): Request {
  return {
    userId: 1,
    body: {},
    params: {},
    ...overrides,
  } as Request;
}

describe("InterviewController", () => {
  let sessionService: SessionService;
  let streamService: InterviewStreamService;
  let controller: InterviewController;
  let res: ReturnType<typeof createMockResponse>;
  let next: NextFunction;

  beforeEach(() => {
    sessionService = {
      createSession: vi.fn(),
      listSessions: vi.fn(),
      getMessages: vi.fn(),
    } as unknown as SessionService;

    streamService = {
      streamTurn: vi.fn(),
    } as unknown as InterviewStreamService;

    controller = new InterviewController(sessionService, streamService);
    res = createMockResponse();
    next = vi.fn();
  });

  describe("createSession", () => {
    it("returns 201 with session id", async () => {
      vi.mocked(sessionService.createSession).mockResolvedValue({
        id: "session-1",
      });

      await controller.createSession(
        createMockRequest({
          body: { resumeId: "resume-1", level: "entry" },
        }),
        res,
        next,
      );

      expect(sessionService.createSession).toHaveBeenCalledWith(1, {
        resumeId: "resume-1",
        level: "entry",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: "session-1" });
      expect(next).not.toHaveBeenCalled();
    });

    it("delegates NotFoundError to next for cross-user resume", async () => {
      const error = new NotFoundError();
      vi.mocked(sessionService.createSession).mockRejectedValue(error);

      await controller.createSession(
        createMockRequest({
          body: { resumeId: "resume-1", level: "entry" },
        }),
        res,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("stream", () => {
    it("delegates ConflictError to next for finished session", async () => {
      const error = new ConflictError("Interview session is finished");
      vi.mocked(streamService.streamTurn).mockRejectedValue(error);

      await controller.stream(
        createMockRequest({
          params: { sessionId: "session-1" },
          body: { content: "Hello" },
        }),
        res,
        next,
      );

      expect(streamService.streamTurn).toHaveBeenCalledWith(
        1,
        "session-1",
        "Hello",
        res,
      );
      expect(next).toHaveBeenCalledWith(error);
    });

    it("delegates NotFoundError to next for cross-user session", async () => {
      const error = new NotFoundError();
      vi.mocked(streamService.streamTurn).mockRejectedValue(error);

      await controller.stream(
        createMockRequest({
          params: { sessionId: "session-1" },
          body: { content: "Hello" },
        }),
        res,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getMessages", () => {
    it("delegates NotFoundError to next for cross-user session", async () => {
      const error = new NotFoundError();
      vi.mocked(sessionService.getMessages).mockRejectedValue(error);

      await controller.getMessages(
        createMockRequest({
          params: { sessionId: "session-1" },
        }),
        res,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
