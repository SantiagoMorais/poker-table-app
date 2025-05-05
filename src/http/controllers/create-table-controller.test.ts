import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/server";

describe("Create Table E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a table and return 201 with table data", async () => {
    const table = await request(app.server).post("/tables").send({
      tableName: "Poker table",
      ownerName: "John Doe",
    });

    expect(table.statusCode).toEqual(201);
    expect(table.body.table).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        tableName: "Poker table",
        owner: "John Doe",
        token: expect.any(String),
        players: expect.arrayContaining([
          expect.objectContaining({
            name: "John Doe",
          }),
        ]),
      })
    );
  });

  it("should return 400 if body is invalid", async () => {
    const response = await request(app.server).post("/tables").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});
