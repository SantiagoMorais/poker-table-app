import { FastifyReply, FastifyRequest } from "fastify";

import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { JoinTableUseCase } from "@/use-cases/join-table";

export async function joinTableController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { token, playerName } = request.body as {
    token: string;
    playerName: string;
  };

  const tablesRepository = InMemoryTableRepository.getInstance();
  const joinTableUseCase = new JoinTableUseCase(tablesRepository);

  try {
    const { tableId, playerId } = await joinTableUseCase.execute({
      token,
      playerName,
    });

    return reply.status(200).send({ tableId, playerId });
  } catch (err) {
    return reply.status(400).send({ error: err });
  }
}
