import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

import { config } from "@/config/config";

export const apiLimiter = rateLimit({
  windowMs: config.rate_limit_window,
  max: config.rate_limit_max_requests,
  message: {
    status: StatusCodes.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later.",
  },
});
