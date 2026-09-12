import { env } from "../config/env.js";

// Final error middleware. Converts any thrown error into:
// { success: false, error: { code, message, details? } }
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode ?? 500;
  const code = err.code ?? "INTERNAL_ERROR";
  const message = statusCode === 500 && env.isProd ? "Internal server error" : (err.message || "Internal server error");

  if (statusCode >= 500) {
    console.error(err);
  }

  const body = { success: false, error: { code, message } };
  if (err.details !== undefined) body.error.details = err.details;

  res.status(statusCode).json(body);
}

export default errorHandler;
