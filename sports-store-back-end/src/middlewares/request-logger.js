import { env } from "../config/env.js";

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function colorStatus(status) {
  if (!env.isDev) return `${status}`; // no colors in prod logs
  if (status >= 500) return `${COLORS.red}${status}${COLORS.reset}`;
  if (status >= 400) return `${COLORS.yellow}${status}${COLORS.reset}`;
  if (status >= 300) return `${COLORS.cyan}${status}${COLORS.reset}`;
  return `${COLORS.green}${status}${COLORS.reset}`;
}

export function requestLogger({ skip = [] } = {}) {
  return (req, res, next) => {
    if (skip.includes(req.path)) return next();

    const start = process.hrtime.bigint();

    res.on("finish", () => {
      const ms = Number(process.hrtime.bigint() - start) / 1e6;
      const size = res.get("Content-Length") ?? 0;

      if (env.isDev) {
        console.log(
          `${req.method} ${req.originalUrl} ${colorStatus(res.statusCode)} ${ms.toFixed(1)} ms - ${size}`,
        );
      } else {
        // prod: machine-readable, one JSON line per request
        console.log(
          JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            ms: Number(ms.toFixed(1)),
            ip: req.ip,
            at: new Date().toISOString(),
          }),
        );
      }
    });

    next();
  };
}

export default requestLogger;
