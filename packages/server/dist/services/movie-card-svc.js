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
var movie_card_svc_exports = {};
__export(movie_card_svc_exports, {
  default: () => movie_card_svc_default
});
module.exports = __toCommonJS(movie_card_svc_exports);
var import_mongoose = require("mongoose");
const MovieSchema = new import_mongoose.Schema(
  {
    movieCode: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: true },
    imdbRating: { type: Number, required: true }
  },
  { collection: "movies" }
);
const MovieModel = (0, import_mongoose.model)("Movie", MovieSchema);
function index() {
  return MovieModel.find();
}
function get(movieCode) {
  return MovieModel.find({ movieCode }).then((list) => list[0]).catch((error) => {
    throw `${movieCode} Not Found`;
  });
}
function create(json) {
  const newMovie = new MovieModel(json);
  return newMovie.save();
}
function update(movieCode, movie) {
  return MovieModel.findOneAndUpdate({ movieCode }, movie, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${movieCode} not updated`;
    else return updated;
  });
}
function remove(movieCode) {
  return MovieModel.findOneAndDelete({ movieCode }).then((deleted) => {
    if (!deleted) throw `${movieCode} not deleted`;
  });
}
var movie_card_svc_default = { index, get, create, update, remove };
