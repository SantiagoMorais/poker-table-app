import fastify from "fastify";

import { tablesRoutes } from "./http/routes/tables";

const app = fastify();

app.register(tablesRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 HTTP server running at http://localhost:3333");
});
