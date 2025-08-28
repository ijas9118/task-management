import request from "supertest";

import app from "../src/app";

describe("app", () => {
  it("should respond with not-found message", async () => {
    await request(app)
      .get("/what-is-this")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

describe("GET /api/v1/health", () => {
  it("should return healthy message", async () => {
    await request(app)
      .get("/api/v1/health")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        message: "Task Service is healthy",
      });
  });
});
