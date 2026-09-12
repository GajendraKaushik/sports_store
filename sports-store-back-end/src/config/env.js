import dotenv from "dotenv";

dotenv.config();

const REQUIRED_VARS = [
  "NODE_ENV",
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "CORS_ORIGIN",
];

const missing = REQUIRED_VARS.filter(
  (key) => !process.env[key] || process.env[key].trim() === "",
);

if (missing.length > 0) {
  throw new Error(
    `Missing required env vars: ${missing.join(", ")}. Copy .env.example to .env and fill them in.`,
  );
}

const port = Number(process.env.PORT);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a number.");
}

export const env = {
  nodeEnv: process.env.NODE_ENV,
  port,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  corsOrigin: process.env.CORS_ORIGIN,
  logLevel: process.env.LOG_LEVEL ?? "info",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};

export default env;
