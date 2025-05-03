import { FastifyInstance } from "fastify";

import { CreateTableController } from "@/controllers/create-table-controller";
import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { CreateTableUseCase } from "@/use-cases/create-table";

export const tablesRoutes = async (app: FastifyInstance) => {
  const tableRepository = new InMemoryTableRepository();
  const createTableUseCase = new CreateTableUseCase(tableRepository);
  const createTableController = new CreateTableController(createTableUseCase);

  app.post("/tables", (request, reply) => {
    return createTableController.handle(request, reply);
  });
};
