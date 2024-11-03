import { Game } from "models/game";
import { Schema, model } from "mongoose";

const GameSchema = new Schema<Game>(
  {
    imgSrc: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: true },
    fanRating: { type: Number, required: true },
  },
  { collection: "games" }
);

const GameModel = model<Game>("Game", GameSchema);

function index(): Promise<Game[]> {
  return GameModel.find();
}

function get(userid: String): Promise<Game> {
  return GameModel.find({ userid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userid} Not Found`;
    });
}

export default { index, get };
