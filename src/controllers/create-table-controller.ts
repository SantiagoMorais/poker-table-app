import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { CreateTableUseCase } from "@/use-cases/create-table";

export class CreateTableController {
  constructor(private createTableUseCase: CreateTableUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createTableBodySchema = z.object({
      tableName: z.string().min(1),
      ownerName: z.string().min(1),
    });

    const parsed = createTableBodySchema.parse(request.body);

    const { table } = await this.createTableUseCase.execute(parsed);

    return reply.status(201).send({
      table: {
        id: table.id,
        name: table.name,
        token: table.token,
        ownerId: table.ownerId,
      },
    });
  }
}
