import { FastifyInstance } from "fastify";

import { createTableController } from "@/http/controllers/create-table-controller";
import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { CreateTableUseCase } from "@/use-cases/create-table";

export const tablesRoutes = async (app: FastifyInstance) => {
  app.post("/tables", createTableController);
};
