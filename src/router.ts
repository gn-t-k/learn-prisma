import express, { NextFunction, Request, Response } from "express";
import { getAllUsers, IRegisterUser, registerUser } from "./queries";

const router = express.Router();

router.get("/user", (_req: Request, res: Response, next: NextFunction) => {
  getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/user", (req: Request, res: Response, next: NextFunction) => {
  const { name, email, bio, initialPostTitle } = req.body as IRegisterUser;
  registerUser({
    name,
    email,
    bio,
    initialPostTitle,
  })
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
