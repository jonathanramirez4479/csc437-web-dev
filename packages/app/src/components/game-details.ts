import { LitElement, html } from "lit";
import { Game } from "server/models";
import { ifDefined } from "lit/directives/if-defined.js";
import DetailsPage from "../styles/details-page.css";

export class GameDetailsElement extends LitElement {
  using?: Game;

  render() {
    const {
      img,
      title,
      releaseDate,
      ignRating,
      genres,
      publisher,
      summary,
      mainCharacters,
      supportingCharacters,
      platforms,
    } = this.using || {};

    html`
      <main>
        <a href="../index.html">back to Home</a>
        <section class="primary-info">
          <img src=${ifDefined(img)} />
          <p>${title}</p>
          <p>${releaseDate}</slot></p>
          <p>Genre: ${genres}</p>
          <p>IGN Rating: ${ignRating}/10</p>
          <p>Publisher: ${publisher}</p>
        </section>
        <section class="secondary-info">
          <div class="info-group">
            <dt>Platforms:</dt>
            <dd>
              ${platforms}
            </dd>
          </div>
          <div class="info-group">
            <dt>Summary:</dt>
            <dd>
             ${summary}
            </dd>
          </div>
          <div class="info-group">
            <dt>Main Characters:</dt>
            <dd>${mainCharacters}</dd>
          </div>
          <div class="info-group">
            <dt>Supporting Characters:</dt>
            <dd>
              ${supportingCharacters}
            </dd>
          </div>
        </section>
      </main>
    `;
  }

  static styles = DetailsPage.styles;
}
