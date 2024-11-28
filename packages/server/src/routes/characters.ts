import express, { Request, Response } from "express";
import { Character } from "models";

import Characters from "../services/character-card-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Characters.index()
    .then((list: Character[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:characterId", (req: Request, res: Response) => {
  const { characterId } = req.params;

  Characters.get(characterId)
    .then((character: Character) => res.json(character))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newCharacter = req.body;

  Characters.create(newCharacter)
    .then((character: Character) => res.status(201).json(character))
    .catch((err) => res.status(500).send(err));
});

router.put("/:characterId", (req: Request, res: Response) => {
  const { characterId } = req.params;
  const updatedCharacter = req.body;

  Characters.update(characterId, updatedCharacter)
    .then((character: Character) => res.json(character))
    .catch((err) => res.status(404).end());
});

router.delete("/:characterId", (req: Request, res: Response) => {
  const { characterId } = req.params;

  Characters.remove(characterId)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
