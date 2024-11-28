import express, { Request, Response } from "express";
import { Game } from "../models/game";
import Games from "../services/game-card-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Games.index()
    .then((list: Game[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:_id", (req: Request, res: Response) => {
  const { _id } = req.params;
  console.log("GET /:_id=", _id);

  Games.get(_id)
    .then((game: Game) => {
      res.json(game);
    })
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newGame = req.body;

  Games.create(newGame)
    .then((game: Game) => res.status(201).json(game))
    .catch((err) => {
      res.status(500).send(err), console.log(err);
    });
});

router.put("/:_id", (req: Request, res: Response) => {
  const { _id } = req.params;
  const newGame = req.body;

  Games.update(_id, newGame)
    .then((game: Game) => res.json(game))
    .catch((err) => res.status(404).end());
});

router.delete("/:_id", (req: Request, res: Response) => {
  const { _id } = req.params;

  Games.remove(_id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
