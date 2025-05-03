import { InMemoryTableRepository } from "./in-memory/in-memory-tables-repository";

export const singletonTableRepository = new InMemoryTableRepository();
