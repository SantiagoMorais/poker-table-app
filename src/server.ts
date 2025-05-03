import fastify from "fastify";

import { tablesRoutes } from "./http/routes/tables";

export const app = fastify();
const port = 3333;

app.register(tablesRoutes);

app.listen({ port }).then(() => {
  console.log(`"HTTP server is running at http://localhost:${port}`);
});
