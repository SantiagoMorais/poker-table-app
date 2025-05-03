import fastify from "fastify";

import { tablesRoutes } from "./http/routes/tables";

const app = fastify();
const port = 3333;

app.register(tablesRoutes);

app.listen({ port }).then(() => {
  console.log(`"HTTP server is running at http://localhost:${port}`);
});
