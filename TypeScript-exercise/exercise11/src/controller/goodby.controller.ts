import { Request, Response } from "express";

interface GoodbyRequest extends Request {
  query: {
    name: string;
  };
}


export const goodbyController = (req: GoodbyRequest, res: Response) => {
  const name = req.params.name;

  res.status(200).json({ farewell: `Goodby, ${name}` });
};
