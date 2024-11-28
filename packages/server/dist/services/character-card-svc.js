"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var character_card_svc_exports = {};
__export(character_card_svc_exports, {
  default: () => character_card_svc_default
});
module.exports = __toCommonJS(character_card_svc_exports);
var import_mongoose = require("mongoose");
const CharacterSchema = new import_mongoose.Schema(
  {
    characterId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    fanRating: { type: Number, required: true }
  },
  { collection: "characters" }
);
const CharacterModel = (0, import_mongoose.model)("Character", CharacterSchema);
function index() {
  return CharacterModel.find();
}
function get(characterId) {
  return CharacterModel.find({ characterId }).then((list) => list[0]).catch((err) => {
    throw `${characterId} Not Found`;
  });
}
function create(json) {
  const newCharacter = new CharacterModel(json);
  return newCharacter.save();
}
function update(characterId, character) {
  return CharacterModel.findOneAndUpdate({ characterId }, character, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${characterId} not updated`;
    else return updated;
  });
}
function remove(characterId) {
  return CharacterModel.findOneAndDelete({ characterId }).then((deleted) => {
    if (!deleted) throw `${characterId} not deleted`;
  });
}
var character_card_svc_default = { index, get, create, update, remove };
