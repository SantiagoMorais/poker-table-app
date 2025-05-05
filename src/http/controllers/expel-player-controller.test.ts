import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/server";

describe("Expel a player E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to expel a player and return status 200", async () => {
    const tableCreationResponse = await request(app.server)
      .post("/tables")
      .send({
        tableName: "Poker table",
        ownerName: "John Doe",
      });

    const table = tableCreationResponse.body.table;

    await request(app.server).post("/tables/join").send({
      token: table.token,
      playerName: `Jane-Doe`,
    });

    const response = await request(app.server)
      .delete(`/tables/Jane-Doe/expel`)
      .send({ token: table.token });

    expect(response.statusCode).toEqual(200);
    expect(response.body.players).toHaveLength(1);
    expect(response.body.players[0].name).toBe("John Doe");
  });

  it("should return 404 if player does not exist", async () => {
    const tableCreationResponse = await request(app.server)
      .post("/tables")
      .send({
        tableName: "Poker table",
        ownerName: "John Doe",
      });

    const table = tableCreationResponse.body.table;

    const response = await request(app.server)
      .delete(`/tables/NonExistentPlayer/expel`)
      .send({ token: table.token });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Player not found");
  });
});
