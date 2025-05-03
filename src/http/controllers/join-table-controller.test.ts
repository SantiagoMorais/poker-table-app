import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/server";

describe("Join a Table E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to join a table and return 200 status code", async () => {
    const response = await request(app.server).post("/tables").send({
      tableName: "Poker table",
      ownerName: "John Doe",
    });

    const table = response.body.table;

    const playerJoined = await request(app.server).post("/tables/join").send({
      token: table.token,
      playerName: "New Player",
    });

    expect(playerJoined.statusCode).toEqual(200);
    expect(playerJoined.body).toHaveProperty("tableId");
    expect(playerJoined.body).toHaveProperty("playerId");
  });

  it("should return 400 if table token is invalid", async () => {
    const response = await request(app.server).post("/tables/join").send({
      token: "invalid-token",
      playerName: "Player",
    });

    expect(response.statusCode).toBe(400);
  });
});
