import {Request, Response, NextFunction} from "express";
import {container} from "../../config/injector";
import {SessionManager} from "../../data/database/session.manager";
import rateLimit from "express-rate-limit";

const fallbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const key = `rate:${req.ip}`;
  const maxRequests = 100;
  const windowMs = 15 * 60 * 1000;

  try {
    const sessionManager = container.get(SessionManager);
    await sessionManager.connectRedis();
    const isAllowed = await sessionManager.rateLimit(key, maxRequests, windowMs);

    if (!isAllowed) {
      res.error(429, "Too many requests. Please try again later.");
    } else {
      next();
    }
  } catch (error) {
    console.error("Redis error detected. Falling back to in-memory rate limiter:", error);
    fallbackLimiter(req, res, next);
  }
}
