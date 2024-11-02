import { html } from "@calpoly/mustang";
import express, { Request, Response } from "express";
import { Games } from "./pages/games";
import { getGameCards } from "./services/game-card-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("<h5>Hello world</h5>");
});

// app.get("/components/:componentId", (req: Request, res: Response) => {
//   const { componentId } = req.params;
//   const data = getGameCard(componentId);
//   const page = new GameCardComponent(data);

//   res.set("Content-Type", "text/html").send(page.render());
// });

app.get("/games", (req: Request, res: Response) => {
  const games_data = getGameCards();
  const page = new Games(games_data);
  res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
