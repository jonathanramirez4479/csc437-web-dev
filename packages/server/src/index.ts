import { html } from "@calpoly/mustang";
import express, { Request, Response } from "express";
import { GamesPage } from "./pages/games";
import Games from "./services/game-card-svc";
import { connect } from "./services/mongo";
import games from "./routes/games";
import auth, { authenticateUser } from "./routes/auth";
import { LoginPage } from "./pages/auth";
import { MoviesPage } from "./pages/movies";
import { getMovies } from "./services/movie-card-svc";
import { CharactersPage } from "./pages/characters";
import { getCharacters } from "./services/character-card-svc";
import { LocationsPage } from "./pages/locations";
import { getLocations } from "./services/location-card-svc";

connect("Resident-Evil-Wiki-DB");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);
app.use("/api/games", authenticateUser, games);

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
  const movies = getMovies();
  const page = new MoviesPage(movies);
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/characters", (req: Request, res: Response) => {
  const characters = getCharacters();
  const page = new CharactersPage(characters);
  res.set("Content-Type", "text/html").send(page.render());
  ``;
});

app.get("/locations", (req: Request, res: Response) => {
  const locations = getLocations();
  const page = new LocationsPage(locations);
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
