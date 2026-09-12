export class AppError extends Error {
  constructor(statusCode = 500, message = "Internal server error", code = "INTERNAL_ERROR", details) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    if (details !== undefined) this.details = details;
  }
}

export function notFoundError(message = "Route not found") {
  return new AppError(404, message, "NOT_FOUND");
}

export function validationError(message = "Request validation failed", details) {
  return new AppError(400, message, "VALIDATION_ERROR", details);
}

export default AppError;
