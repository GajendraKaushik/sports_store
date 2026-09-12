import express from "express";
import cors from "cors";

import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import requestLogger from "./middlewares/request-logger.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(requestLogger({ skip: ["/api/v1/health"] }));

  app.use("/api/v1", apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

const app = createApp();

export default app;
