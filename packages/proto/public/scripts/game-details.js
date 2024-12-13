import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import DetailsPage from "./styles/details-page.css.js";
import { Game } from "server/models";

export class GameDetailsElement extends HTMLElement {
  static template = html`
    <template>
      <main>
        <a href="../index.html">back to Home</a>
        <section class="primary-info">
          <slot name="imgSrc">
            <img src="/images/No_Image_Available.jpg" />
          </slot>
          <p><slot name="title">Resident Evil Title</slot></p>
          <p><slot name="releaseDate">(Release Date)</slot></p>
          <p>Genre: <slot name="genre">(Genre)</slot></p>
          <p>IGN Rating: <slot name="ignRating">0</slot>/10</p>
          <p>Publisher: <slot name="publisher">(Game Publisher)</slot></p>
        </section>
        <section class="secondary-info">
          <div class="info-group">
            <dt>Platforms:</dt>
            <dd>
              <slot name="platforms">Gaming Platforms</slot>
            </dd>
          </div>
          <div class="info-group">
            <dt>Summary:</dt>
            <dd>
              <slot name="summary">Game Summary</slot>
            </dd>
          </div>
          <div class="info-group">
            <dt>Main Characters:</dt>
            <dd><slot name="mainCharacters">Main Character Names</slot></dd>
          </div>
          <div class="info-group">
            <dt>Supporting Characters:</dt>
            <dd>
              <slot name="supportingCharacters"
                >Supporting Character Names</slot
              >
            </dd>
          </div>
        </section>
      </main>
    </template>
  `;

  static styles = DetailsPage.styles;

  constructor() {
    super();
    shadow(this)
      .template(GameDetailsElement.template)
      .styles(reset.styles, GameDetailsElement.styles);
  }
}
