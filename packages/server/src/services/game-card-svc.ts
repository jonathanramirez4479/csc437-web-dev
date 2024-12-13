import { Game } from "models/game";
import { Schema, model } from "mongoose";

const GameSchema = new Schema<Game>(
  {
    img: { data: Buffer, contentType: String },
    title: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: true },
    ignRating: { type: Number, required: false },
    genres: { type: [String], required: false },
    publisher: { type: String, required: false },
    summary: { type: String, required: false },
    mainCharacters: { type: [String], required: false },
    supportingCharacters: { type: [String], required: false },
  },
  { collection: "games" }
);

const GameModel = model<Game>("Game", GameSchema);

function index(): Promise<Game[]> {
  return GameModel.find();
}

function get(_id: String): Promise<Game> {
  return GameModel.find({ _id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${_id} Not Found`;
    });
}

function create(json: Game): Promise<Game> {
  const newGame = new GameModel(json);
  return newGame.save();
}

function update(_id: String, game: Game): Promise<Game> {
  return GameModel.findOneAndUpdate({ _id }, game, {
    new: true,
  }).then((updated) => {
    if (!updated) throw `${_id} not updated`;
    else return updated as Game;
  });
}

function remove(_id: String): Promise<void> {
  return GameModel.findOneAndDelete({ _id }).then((deleted) => {
    if (!deleted) throw `${_id} not deleted`;
  });
}

export default { index, get, create, update, remove };
