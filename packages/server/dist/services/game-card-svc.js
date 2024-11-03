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
var game_card_svc_exports = {};
__export(game_card_svc_exports, {
  default: () => game_card_svc_default
});
module.exports = __toCommonJS(game_card_svc_exports);
var import_mongoose = require("mongoose");
const GameSchema = new import_mongoose.Schema(
  {
    imgSrc: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: true },
    fanRating: { type: Number, required: true }
  },
  { collection: "games" }
);
const GameModel = (0, import_mongoose.model)("Game", GameSchema);
function index() {
  return GameModel.find();
}
function get(userid) {
  return GameModel.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
var game_card_svc_default = { index, get };
