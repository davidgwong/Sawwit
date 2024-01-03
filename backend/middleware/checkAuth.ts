import { NextFunction, Request, Response } from "express";
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({message: "Something went wrong. Please log in and try again."});
}

function forwardAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.json("isAuthenticated");
}

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  return next();
}

export { ensureAuthenticated, forwardAuthenticated, checkAuthenticated };
