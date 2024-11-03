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
var games_exports = {};
__export(games_exports, {
  default: () => games_default
});
module.exports = __toCommonJS(games_exports);
var import_express = __toESM(require("express"));
var import_game_card_svc = __toESM(require("../services/game-card-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_game_card_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  console.log("GET /:userid");
  import_game_card_svc.default.get(_id).then((game) => {
    res.json(game), console.log(game);
  }).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newGame = req.body;
  console.log("\n\nPOST req.body: ", req.body);
  import_game_card_svc.default.create(newGame).then((game) => res.status(201).json(game)).catch((err) => {
    res.status(500).send(err), console.log(err);
  });
});
router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const newGame = req.body;
  import_game_card_svc.default.update(_id, newGame).then((game) => res.json(game)).catch((err) => res.status(404).end());
});
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  import_game_card_svc.default.remove(_id).then(() => res.status(204).end()).catch((err) => res.status(404).end());
});
var games_default = router;
