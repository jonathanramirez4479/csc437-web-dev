import express, { Request, Response } from "express";
import { connect } from "./services/mongo";

import auth, { authenticateUser } from "./routes/auth";
import { LoginPage } from "./pages/auth";

import { GamesPage } from "./pages/games";
import Games from "./services/game-card-svc";
import games from "./routes/games";

import { MoviesPage } from "./pages/movies";
import Movies from "./services/movie-card-svc";
import movies from "./routes/movies";

import { CharactersPage } from "./pages/characters";
import Characters from "./services/character-card-svc";
import characters from "./routes/characters";

import { LocationsPage } from "./pages/locations";
import Locations from "./services/location-card-svc";
import locations from "./routes/locations";

connect("Resident-Evil-Wiki-DB");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);
app.use("/api/games", authenticateUser, games);
app.use("/api/movies", movies);
app.use("/api/characters", characters);
app.use("/api/locations", locations);

app.get("/hello", (req: Request, res: Response) => {
  res.send("<h5>Hello world</h5>");
});

app.get("/games", (req: Request, res: Response) => {
  Games.index().then((data) => {
    const page = new GamesPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});

app.get("/movies", (req: Request, res: Response) => {
  Movies.index().then((data) => {
    const page = new MoviesPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});

app.get("/characters", (req: Request, res: Response) => {
  Characters.index().then((data) => {
    const page = new CharactersPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});

app.get("/locations", (req: Request, res: Response) => {
  Locations.index().then((data) => {
    const page = new LocationsPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
