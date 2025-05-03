import { FastifyReply, FastifyRequest } from "fastify";

import { ActionNotPermittedError } from "@/core/errors/action-not-permitted-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { makeExpelPlayerUseCase } from "@/use-cases/factories/make-expel-player-use-case";

export const expelPlayerController = async (
  request: FastifyRequest<{
    Body: { token: string };
    Params: { playerName: string };
  }>,
  reply: FastifyReply
) => {
  const { token } = request.body;
  const { playerName } = request.params;

  const expelPlayerUseCase = makeExpelPlayerUseCase();

  try {
    const { players } = await expelPlayerUseCase.execute({
      token,
      playerName,
    });

    return reply.status(200).send({ players });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    if (error instanceof ActionNotPermittedError) {
      return reply.status(403).send({ error: error.message });
    }

    return reply.status(500).send({ error: "Unexpected error" });
  }
};
