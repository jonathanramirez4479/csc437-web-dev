"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var characters_exports = {};
__export(characters_exports, {
  default: () => characters_default
});
module.exports = __toCommonJS(characters_exports);
var import_express = __toESM(require("express"));
var import_character_card_svc = __toESM(require("../services/character-card-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_character_card_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:characterId", (req, res) => {
  const { characterId } = req.params;
  import_character_card_svc.default.get(characterId).then((character) => res.json(character)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newCharacter = req.body;
  import_character_card_svc.default.create(newCharacter).then((character) => res.status(201).json(character)).catch((err) => res.status(500).send(err));
});
router.put("/:characterId", (req, res) => {
  const { characterId } = req.params;
  const updatedCharacter = req.body;
  import_character_card_svc.default.update(characterId, updatedCharacter).then((character) => res.json(character)).catch((err) => res.status(404).end());
});
router.delete("/:characterId", (req, res) => {
  const { characterId } = req.params;
  import_character_card_svc.default.remove(characterId).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var characters_default = router;
