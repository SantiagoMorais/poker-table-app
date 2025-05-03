import { FastifyReply, FastifyRequest } from "fastify";

import { createTableSchema } from "@/core/schemas/create-table-schema";
import { makeCreateTableUseCase } from "@/use-cases/factories/make-create-table-use-case";

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

  const createTableUseCase = makeCreateTableUseCase();

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
