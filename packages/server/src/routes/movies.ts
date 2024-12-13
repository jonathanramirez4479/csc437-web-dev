import express, { Request, Response } from "express";
import { Movie } from "models";

import Movies from "../services/movie-card-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Movies.index()
    .then((list: Movie[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:movieCode", (req: Request, res: Response) => {
  const { movieCode } = req.params;

  Movies.get(movieCode)
    .then((movie: Movie) => res.json(movie))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newMovie = req.body;

  Movies.create(newMovie)
    .then((movie: Movie) => res.status(201).json(movie))
    .catch((err) => res.status(500).send(err));
});

router.put("/:movieCode", (req: Request, res: Response) => {
  const { movieCode } = req.params;
  const updatedCharacter = req.body;

  Movies.update(movieCode, updatedCharacter)
    .then((movie: Movie) => res.json(movie))
    .catch((err) => res.status(404).end());
});

router.delete("/:movieCode", (req: Request, res: Response) => {
  const { movieCode } = req.params;

  Movies.remove(movieCode)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
