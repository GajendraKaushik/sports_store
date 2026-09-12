import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

function unauthorized(message = "Missing or invalid auth token") {
  return new AppError(401, message, "UNAUTHORIZED");
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");

  if (!token || scheme !== "Bearer") {
    return next(unauthorized("Missing auth token"));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = {
      id: decoded.sub ?? decoded.id,
      role: decoded.role,
      email: decoded.email,
    };
    if (!req.user.id) {
      return next(unauthorized("Invalid auth token"));
    }
    return next();
  } catch {
    return next(unauthorized("Invalid or expired token"));
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden", "FORBIDDEN"));
    }
    return next();
  };
}

export default { requireAuth, requireRole };
