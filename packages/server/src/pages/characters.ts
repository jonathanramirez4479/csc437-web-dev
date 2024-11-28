import { html, css } from "@calpoly/mustang/server";
import { Character } from "models/character";
import renderPage from "./renderPage";

export class CharactersPage {
  data: Character[];

  constructor(data: Character[]) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [],
      styles: [],
      scripts: [
        `
            import { define } from "@calpoly/mustang";
            import { HeaderElement } from "/scripts/header-element.js";
            import { CharacterCardElement } from "/scripts/character-card.js";

            define({
                "header-element": HeaderElement,
                "character-card": CharacterCardElement,
            });
        `,
      ],
    });
  }

  renderCharacter(character: Character) {
    const { characterId, name, imgSrc, fanRating } = character;
    return html`
      <character-card src="/api/characters/${characterId}">
        <!-- <img slot="imgSrc" src=${imgSrc} />
        <span slot="name">${name}</span>
        <span slot="fan-rating">Fan Rating: ${fanRating}/10</span> -->
      </character-card>
    `;
  }

  renderBody() {
    const characters = this.data;
    const characterList = characters
      ? html`${characters.map(this.renderCharacter)}`
      : "";

    return html`
      <body>
        <header-element></header-element>
        <main class="category-page">${characterList}</main>
      </body>
    `;
  }
}
