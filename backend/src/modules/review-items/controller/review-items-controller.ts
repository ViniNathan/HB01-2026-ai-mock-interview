import type { ReviewItemsService } from "@/modules/review-items/service/review-items-service";
import type { Request, Response } from "express";

export class ReviewItemsController {
  constructor(private readonly reviewItemsService: ReviewItemsService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const reviewItems = await this.reviewItemsService.listForUser(req.userId!);
    res.status(200).json({ reviewItems });
  };

  remove = async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);
    await this.reviewItemsService.deleteForUser(req.userId!, id);
    res.status(204).send();
  };
}
