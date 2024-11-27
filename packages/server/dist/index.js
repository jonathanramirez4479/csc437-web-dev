"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_auth = __toESM(require("./routes/auth"));
var import_auth2 = require("./pages/auth");
var import_games = require("./pages/games");
var import_game_card_svc = __toESM(require("./services/game-card-svc"));
var import_games2 = __toESM(require("./routes/games"));
var import_movies = require("./pages/movies");
var import_movie_card_svc = __toESM(require("./services/movie-card-svc"));
var import_characters = require("./pages/characters");
var import_character_card_svc = __toESM(require("./services/character-card-svc"));
var import_locations = require("./pages/locations");
var import_location_card_svc = __toESM(require("./services/location-card-svc"));
(0, import_mongo.connect)("Resident-Evil-Wiki-DB");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/games", import_auth.authenticateUser, import_games2.default);
app.get("/hello", (req, res) => {
  res.send("<h5>Hello world</h5>");
});
app.get("/games", (req, res) => {
  import_game_card_svc.default.index().then((data) => {
    const page = new import_games.GamesPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/movies", (req, res) => {
  import_movie_card_svc.default.index().then((data) => {
    const page = new import_movies.MoviesPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/characters", (req, res) => {
  import_character_card_svc.default.index().then((data) => {
    const page = new import_characters.CharactersPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/locations", (req, res) => {
  import_location_card_svc.default.index().then((data) => {
    const page = new import_locations.LocationsPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/login", (req, res) => {
  const page = new import_auth2.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
