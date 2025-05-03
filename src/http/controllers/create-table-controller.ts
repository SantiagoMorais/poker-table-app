import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { createTableSchema } from "@/core/schemas/create-table-schema";
import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { CreateTableUseCase } from "@/use-cases/create-table";

const tableRepository = new InMemoryTableRepository();
const createTableUseCase = new CreateTableUseCase(tableRepository);

export const createTableController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parseResult = createTableSchema.safeParse(request);

  if (!parseResult.success) {
    const formatted = parseResult.error.format();
    return reply
      .status(400)
      .send({ message: "Erro de validação", errors: formatted });
  }

  const { tableName, ownerName } = parseResult.data.body;

  try {
    const { table } = await createTableUseCase.execute({
      tableName,
      ownerName,
    });

    return reply.status(201).send({
      table: {
        id: table.id,
        name: table.name,
        owner: ownerName,
        token: table.token,
        players: table.players,
      },
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
};
