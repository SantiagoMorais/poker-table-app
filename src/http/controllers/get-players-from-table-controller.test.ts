import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/server";

describe("List Table Players E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list players from a table and return 200", async () => {
    const tableCreationResponse = await request(app.server)
      .post("/tables")
      .send({
        tableName: "Poker table",
        ownerName: "John Doe",
      });

    const table = tableCreationResponse.body.table;

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post("/tables/join")
        .send({
          token: table.token,
          playerName: `Player ${i}`,
        });
    }

    const listTablePlayersResponse = await request(app.server).get(
      `/tables/${table.token}/players`
    );
    const tablePlayers = listTablePlayersResponse.body.players;

    expect(listTablePlayersResponse.statusCode).toEqual(200);
    expect(tablePlayers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "John Doe" }),
        expect.objectContaining({ name: "Player 0" }),
        expect.objectContaining({ name: "Player 1" }),
        expect.objectContaining({ name: "Player 2" }),
        expect.objectContaining({ name: "Player 3" }),
        expect.objectContaining({ name: "Player 4" }),
      ])
    );
  });

  it("should return 404 when the table doesn't exist", async () => {
    const listTablePlayersResponse = await request(app.server).get(
      `/tables/invalid-token/players`
    );

    expect(listTablePlayersResponse.statusCode).toEqual(404);
  });
});
