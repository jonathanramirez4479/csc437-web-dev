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
  getMovies: () => getMovies
});
module.exports = __toCommonJS(movie_card_svc_exports);
const movies = {
  residentEvil: {
    title: "Resident Evil",
    imgSrc: "/images/movie-covers/re.jpg",
    releaseDate: /* @__PURE__ */ new Date("2002-01-01"),
    imdbRating: 6.6
  },
  residentEvilApoc: {
    title: "Resident Evil: Apocalypse",
    imgSrc: "/images/movie-covers/re-apocalypse.jpg",
    releaseDate: /* @__PURE__ */ new Date("2004-01-02"),
    imdbRating: 6.1
  },
  residentEvilExt: {
    title: "Resident Evil: Extinction",
    imgSrc: "/images/movie-covers/re-extinction.jpeg",
    releaseDate: /* @__PURE__ */ new Date("2007-02-02"),
    imdbRating: 6.2
  },
  residentEvilRet: {
    title: "Resident Evil: Retribution",
    imgSrc: "/images/movie-covers/re-retribution.jpg",
    releaseDate: /* @__PURE__ */ new Date("2012-03-02"),
    imdbRating: 5.3
  }
};
function getMovies() {
  const movieList = Object.entries(movies).map(([key, value]) => value);
  return movieList;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMovies
});
