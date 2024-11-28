import express, { Request, Response } from "express";
import { Location } from "models";

import Locations from "../services/location-card-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Locations.index()
    .then((list: Location[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:locationId", (req: Request, res: Response) => {
  const { locationId } = req.params;

  Locations.get(locationId)
    .then((location: Location) => res.json(location))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newLocation = req.body;

  Locations.create(newLocation)
    .then((location: Location) => res.status(201).json(location))
    .catch((err) => res.status(500).send(err));
});

router.put("/:locationId", (req: Request, res: Response) => {
  const { locationId } = req.params;
  const updatedLocation = req.body;

  Locations.update(locationId, updatedLocation)
    .then((location: Location) => res.json(location))
    .catch((err) => res.status(404).end());
});

router.delete("/:locationId", (req: Request, res: Response) => {
  const { locationId } = req.params;

  Locations.remove(locationId)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
