import { Character } from "models/character";
import { Schema, model } from "mongoose";

const CharacterSchema = new Schema<Character>(
  {
    characterId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    imgSrc: { data: Buffer, contentType: String },
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

function create(json: Character): Promise<Character> {
  const newCharacter = new CharacterModel(json);
  return newCharacter.save();
}

function update(characterId: String, character: Character): Promise<Character> {
  return CharacterModel.findOneAndUpdate({ characterId }, character, {
    new: true,
  }).then((updated) => {
    if (!updated) throw `${characterId} not updated`;
    else return updated as Character;
  });
}

function remove(characterId: String): Promise<void> {
  return CharacterModel.findOneAndDelete({ characterId }).then((deleted) => {
    if (!deleted) throw `${characterId} not deleted`;
  });
}

export default { index, get, create, update, remove };
