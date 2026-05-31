import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import request from "supertest";
import type { Express } from "express";

import { createApp } from "@/config/app";
import prisma from "@/infrastructure/database";
import { ReviewPriority } from "../../../prisma/generated/client";
import {
  authHeader,
  createSignupPayload,
  loginUser,
  signUpUser,
} from "@/test/helpers/auth-helpers";
import { seedReadyResume } from "@/test/helpers/interview-seed-helpers";
import { truncateTables } from "@/test/containers/truncate-tables";

async function authenticate(app: Express): Promise<string> {
  await signUpUser(app);
  const loginResponse = await loginUser(app);
  return loginResponse.body.accessToken as string;
}

describe("Review Items API E2E", () => {
  let app: Express;

  beforeAll(async () => {
    app = await createApp();
  });

  beforeEach(async () => {
    await truncateTables();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/review-items/", () => {
    it("returns 401 without authentication", async () => {
      const response = await request(app).get("/api/review-items/");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Authentication required",
      });
    });

    it("returns 200 with empty reviewItems when user has none", async () => {
      const token = await authenticate(app);

      const response = await request(app)
        .get("/api/review-items/")
        .set(authHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ reviewItems: [] });
    });

    it("does not return review items belonging to another user", async () => {
      await authenticate(app);
      const loginResponse = await loginUser(app);
      const userId = loginResponse.body.user.id as number;
      const resume = await seedReadyResume(userId);

      const session = await prisma.interviewSession.create({
        data: {
          userId,
          resumeId: resume.id,
          level: "entry",
          maxTurns: 5,
        },
      });

      await prisma.reviewItem.create({
        data: {
          userId,
          sessionId: session.id,
          topic: "System Design",
          description: "Practice scalability trade-offs.",
          priority: ReviewPriority.high,
        },
      });

      await request(app)
        .post("/api/auth/signup")
        .send(
          createSignupPayload({
            email: "other@example.com",
            name: "Other User",
          }),
        );
      const otherLogin = await loginUser(app, { email: "other@example.com" });
      const otherToken = otherLogin.body.accessToken as string;

      const response = await request(app)
        .get("/api/review-items/")
        .set(authHeader(otherToken));

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ reviewItems: [] });
    });

    it("returns 200 with review items for the authenticated user", async () => {
      const token = await authenticate(app);
      const loginResponse = await loginUser(app);
      const userId = loginResponse.body.user.id as number;
      const resume = await seedReadyResume(userId);

      const session = await prisma.interviewSession.create({
        data: {
          userId,
          resumeId: resume.id,
          level: "entry",
          maxTurns: 5,
        },
      });

      await prisma.reviewItem.create({
        data: {
          userId,
          sessionId: session.id,
          topic: "System Design",
          description: "Practice scalability trade-offs.",
          priority: ReviewPriority.high,
        },
      });

      await prisma.reviewItem.create({
        data: {
          userId,
          sessionId: session.id,
          topic: "TypeScript",
          description: "Review generics and utility types.",
          priority: ReviewPriority.medium,
        },
      });

      const response = await request(app)
        .get("/api/review-items/")
        .set(authHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.reviewItems).toHaveLength(2);
      expect(response.body.reviewItems[0]).toMatchObject({
        sessionId: session.id,
        topic: "System Design",
        priority: "high",
      });
      expect(response.body.reviewItems[1]).toMatchObject({
        topic: "TypeScript",
        priority: "medium",
      });
    });
  });

  describe("DELETE /api/review-items/:id", () => {
    it("returns 401 without authentication", async () => {
      const response = await request(app).delete(
        `/api/review-items/${randomUUID()}`,
      );

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Authentication required",
      });
    });

    it("returns 204 and removes the item for the owner", async () => {
      const token = await authenticate(app);
      const loginResponse = await loginUser(app);
      const userId = loginResponse.body.user.id as number;
      const resume = await seedReadyResume(userId);

      const session = await prisma.interviewSession.create({
        data: {
          userId,
          resumeId: resume.id,
          level: "entry",
          maxTurns: 5,
        },
      });

      const item = await prisma.reviewItem.create({
        data: {
          userId,
          sessionId: session.id,
          topic: "System Design",
          description: "Practice scalability trade-offs.",
          priority: ReviewPriority.high,
        },
      });

      const deleteResponse = await request(app)
        .delete(`/api/review-items/${item.id}`)
        .set(authHeader(token));

      expect(deleteResponse.status).toBe(204);
      expect(deleteResponse.body).toEqual({});

      const listResponse = await request(app)
        .get("/api/review-items/")
        .set(authHeader(token));

      expect(listResponse.status).toBe(200);
      expect(listResponse.body).toEqual({ reviewItems: [] });

      const stored = await prisma.reviewItem.findUnique({
        where: { id: item.id },
      });
      expect(stored).toBeNull();
    });

    it("returns 404 when review item does not exist", async () => {
      const token = await authenticate(app);

      const response = await request(app)
        .delete(`/api/review-items/${randomUUID()}`)
        .set(authHeader(token));

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Review item not found" });
    });

    it("returns 404 when review item belongs to another user", async () => {
      await authenticate(app);
      const loginResponse = await loginUser(app);
      const userId = loginResponse.body.user.id as number;
      const resume = await seedReadyResume(userId);

      const session = await prisma.interviewSession.create({
        data: {
          userId,
          resumeId: resume.id,
          level: "entry",
          maxTurns: 5,
        },
      });

      const item = await prisma.reviewItem.create({
        data: {
          userId,
          sessionId: session.id,
          topic: "System Design",
          description: "Practice scalability trade-offs.",
          priority: ReviewPriority.high,
        },
      });

      await request(app)
        .post("/api/auth/signup")
        .send(
          createSignupPayload({
            email: "other@example.com",
            name: "Other User",
          }),
        );
      const otherLogin = await loginUser(app, { email: "other@example.com" });
      const otherToken = otherLogin.body.accessToken as string;

      const response = await request(app)
        .delete(`/api/review-items/${item.id}`)
        .set(authHeader(otherToken));

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Review item not found" });

      const stored = await prisma.reviewItem.findUnique({
        where: { id: item.id },
      });
      expect(stored).not.toBeNull();
    });
  });
});
