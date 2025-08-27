import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: StatusCodes.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later.",
  },
});
