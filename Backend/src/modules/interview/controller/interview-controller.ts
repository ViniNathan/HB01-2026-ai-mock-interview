import type { SessionService } from "@/modules/interview/service/session-service";
import type { InterviewStreamService } from "@/modules/interview/service/stream-service";
import type {
  CreateSessionInput,
  StreamMessageInput,
} from "@/modules/interview/validations/interview-schemas";
import type { NextFunction, Request, Response } from "express";

export class InterviewController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly streamService: InterviewStreamService,
  ) {}

  createSession = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.sessionService.createSession(
        req.userId!,
        req.body as CreateSessionInput,
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  listSessions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const sessions = await this.sessionService.listSessions(req.userId!);
      res.status(200).json({ sessions });
    } catch (error) {
      next(error);
    }
  };

  stream = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const sessionId = String(req.params.sessionId);
      const { content } = req.body as StreamMessageInput;

      await this.streamService.streamTurn(req.userId!, sessionId, content, res);
    } catch (error) {
      next(error);
    }
  };

  getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const sessionId = String(req.params.sessionId);
      const messages = await this.sessionService.getMessages(
        req.userId!,
        sessionId,
      );
      res.status(200).json({ messages });
    } catch (error) {
      next(error);
    }
  };
}
