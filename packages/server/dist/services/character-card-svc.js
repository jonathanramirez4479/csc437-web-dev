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
  getCharacters: () => getCharacters
});
module.exports = __toCommonJS(character_card_svc_exports);
const characters = {
  chrisRedfield: {
    name: "Chris Redfield",
    imgSrc: "/images/character-portraits/chris-redfield.jpg",
    fanRating: 9.5
  },
  claireRedfield: {
    name: "Claire Redfield",
    imgSrc: "/images/character-portraits/claire-redfield.webp",
    fanRating: 10
  },
  leonKennedy: {
    name: "Leon Kennedy",
    imgSrc: "/images/character-portraits/leon-kennedy.webp",
    fanRating: 9.8
  },
  albertWesker: {
    name: "Albert Wesker",
    imgSrc: "/images/character-portraits/wesker.jpg",
    fanRating: 7.5
  }
};
function getCharacters() {
  const characterList = Object.entries(characters).map(([key, value]) => value);
  return characterList;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCharacters
});
