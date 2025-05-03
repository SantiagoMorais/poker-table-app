import { FastifyInstance } from "fastify";

import { createTableController } from "@/http/controllers/create-table-controller";

import { joinTableController } from "../controllers/join-table-controller";

export const tablesRoutes = async (app: FastifyInstance) => {
  app.post("/tables", createTableController);
  app.post("/tables/join", joinTableController);
};
