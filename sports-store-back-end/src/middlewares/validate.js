import { validationError } from "../utils/app-error.js";

export function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return next(validationError("Request validation failed", details));
    }
    req[source] = result.data;
    return next();
  };
}

export default validate;
