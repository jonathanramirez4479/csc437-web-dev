import { html, css } from "@calpoly/mustang/server";
import { Game } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class GamesPage {
  data: Game[];

  constructor(data: Game[]) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [],
      styles: [],
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { GameCard } from "/scripts/game-card.js";
        import { HeaderElement } from "/scripts/header-element.js";
        
        define ({
          "game-card": GameCard,
          "mu-auth": Auth.Provider,
          "header-element": HeaderElement
        });
        `,
      ],
    });
  }

  renderGame(game: Game) {
    return html`
      <game-card mode="view" src="/api/games/${game["_id"]}"> </game-card>
    `;
  }

  renderBody() {
    const games_list = this.data;
    const gamesHTML = games_list
      ? html` ${games_list.map(this.renderGame)} `
      : "";

    return html`
      <body>
        <mu-auth provides="resident-evil:auth">
          <header-element></header-element>
          <main class="category-page">${gamesHTML}</main>
        </mu-auth>
      </body>
    `;
  }
}
