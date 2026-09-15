import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";

import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import requestLogger from "./middlewares/request-logger.js";
import { env } from "./config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.use(express.json());
  // CORS_ORIGIN supports a comma-separated list so local dev, production,
  // and Vercel preview URLs can all be allowed from one env value.
  const allowedOrigins = env.corsOrigin
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.use(cors({ origin: allowedOrigins }));
  app.use(requestLogger({ skip: ["/api/v1/health", "/images"] }));

  // Product images (seed dummies + owner-dropped files) are served from
  // public/images so the <img> URLs stored in MongoDB resolve directly.
  app.use(
    "/images",
    express.static(path.join(__dirname, "..", "public", "images")),
  );

  app.use("/api/v1", apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

const app = createApp();

export default app;
