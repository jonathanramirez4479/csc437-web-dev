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
  getGameCard: () => getGameCard,
  getGameCards: () => getGameCards
});
module.exports = __toCommonJS(game_card_svc_exports);
const gameCards = {
  re2: {
    imgSrc: "/images/game-covers/re2.webp",
    title: "Resident Evil 2",
    releaseDate: /* @__PURE__ */ new Date("2022-04-01"),
    fanRating: 9.5
  },
  re4: {
    imgSrc: "/images/game-covers/re4.jpg",
    title: "Resident Evil 4",
    releaseDate: /* @__PURE__ */ new Date("2023-05-1"),
    fanRating: 10
  },
  re0: {
    imgSrc: "/images/game-covers/re0.jpg",
    title: "Resident Evil 0",
    releaseDate: /* @__PURE__ */ new Date("2000-09-10"),
    fanRating: 6.8
  }
};
function getGameCard(_) {
  return gameCards["re2"];
}
function getGameCards() {
  const games_list = Object.entries(gameCards).map(([key, value]) => value);
  return games_list;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGameCard,
  getGameCards
});
