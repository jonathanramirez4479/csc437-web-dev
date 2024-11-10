import { html } from "@calpoly/mustang";
import express, { Request, Response } from "express";
import { GamesPage } from "./pages/games";
import Games from "./services/game-card-svc";
import { connect } from "./services/mongo";
import games from "./routes/games";
import auth, { authenticateUser } from "./routes/auth";
import { LoginPage } from "./pages/auth";

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

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
