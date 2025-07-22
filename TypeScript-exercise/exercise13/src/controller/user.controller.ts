import { NextFunction, Request, Response } from "express";
import { loginData, registerData } from "../types/user";
import { createUser, loginUser } from "../services/user.service";

export const handleCreateUser = async (
  req: Request<{}, {}, registerData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const handleLoginUser = async (
  req: Request<{}, {}, loginData>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(404)
        .json({ message: "email and password are required" });


    const user = await loginUser(req.body);
    res.json(user);

  } catch (error) {
    next(error);
  }
};
