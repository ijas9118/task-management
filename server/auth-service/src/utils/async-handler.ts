import { NextFunction, Request, Response } from "express";

export const asynHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void,
): (req: Request, res: Response, next: NextFunction) => void => 
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
