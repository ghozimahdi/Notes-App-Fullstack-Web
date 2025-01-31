import {Request, Response, NextFunction} from "express";
import rateLimit from "express-rate-limit";
import {container} from "../../../config/injector";
import {SessionManager} from "../../../data/database/session.manager";

const fallbackLoginLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function limitedLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userAgent = req.headers["user-agent"] || "unknown-agent";
  const key = `rate:login:${req.ip}:${userAgent}`;
  const maxRequests = 5;
  const windowMs = 60 * 1000;

  try {
    const sessionManager = container.get(SessionManager);
    await sessionManager.connectRedis();
    const isAllowed = await sessionManager.rateLimit(key, maxRequests, windowMs);

    if (!isAllowed) {
      res.error(429, "Too many login attempts. Please try again later.");
    } else {
      next();
    }

  } catch (error) {
    console.error("Redis error detected. Falling back to in-memory login rate limiter:", error);
    fallbackLoginLimiter(req, res, next);
  }
}