import { Character } from "models/character";
import { Schema, model } from "mongoose";

const CharacterSchema = new Schema<Character>(
  {
    characterId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    fanRating: { type: Number, required: true },
  },
  { collection: "characters" }
);

const CharacterModel = model<Character>("Character", CharacterSchema);

function index(): Promise<Character[]> {
  return CharacterModel.find();
}

function get(characterId: String): Promise<Character> {
  return CharacterModel.find({ characterId })
    .then((list) => list[0])
    .catch((err) => {
      throw `${characterId} Not Found`;
    });
}

export default { index, get };
