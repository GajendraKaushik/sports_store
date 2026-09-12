import { notFoundError } from "../utils/app-error.js";

export function notFound(req, res, next) {
  next(notFoundError(`Cannot ${req.method} ${req.originalUrl}`));
}

export default notFound;
