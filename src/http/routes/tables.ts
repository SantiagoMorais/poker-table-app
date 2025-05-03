import { FastifyInstance } from "fastify";

import { createTableController } from "@/http/controllers/create-table-controller";

import { expelPlayerController } from "../controllers/expel-player-controller";
import { getPlayersFromTableController } from "../controllers/get-players-from-table-controller";
import { joinTableController } from "../controllers/join-table-controller";

export const tablesRoutes = async (app: FastifyInstance) => {
  app.post("/tables", createTableController);
  app.post("/tables/join", joinTableController);
  app.get("/tables/:token/players", getPlayersFromTableController);
  app.delete("/tables/:playerName/expel", expelPlayerController);
};
