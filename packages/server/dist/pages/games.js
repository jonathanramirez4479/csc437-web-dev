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
  GamesPage: () => GamesPage
});
module.exports = __toCommonJS(games_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class GamesPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [],
      styles: [],
      scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { GameCard } from "/scripts/game-card.js";
        
        define ({
          "game-card": GameCard,
        });
        `
      ]
    });
  }
  renderGame(game) {
    return import_server.html` <game-card src="/api/games/${game["_id"]}"> </game-card> `;
  }
  renderBody() {
    const games_list = this.data;
    const gamesHTML = games_list ? import_server.html` ${games_list.map(this.renderGame)} ` : "";
    return import_server.html`
      <body>
        <header-element></header-element>
        <main class="category-page">${gamesHTML}</main>
      </body>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GamesPage
});
