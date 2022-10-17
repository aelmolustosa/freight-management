import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthentcated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const { secret_token } = auth;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayLoad;

    request.user = {
      id: user_id,
    };
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

  next();
}
