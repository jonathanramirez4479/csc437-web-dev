import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Game } from "server/models";
import reset from "../styles/reset.css";
import tokens from "../styles/tokens.css";
import page from "../styles/page.css";
import gridCard from "../styles/grid-card.css";
import { ifDefined } from "lit/directives/if-defined.js";

export class GamesPageViewElement extends LitElement {
  src = "/api/games";

  @state()
  gameIndex = new Array<Game>();

  _authObserver = new Observer<Auth.Model>(this, "resident-evil:auth");

  _user = new Auth.User();

  connectedCallback(): void {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user),
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw `Server responded with status ${res.status}`;
      })
      .then((json: unknown) => {
        if (json) {
          console.log("Games: ", json);
          this.gameIndex = json as Array<Game>;
        }
      })
      .catch((err) => console.log("Failed to get game data: ", err));
  }

  render() {
    const gamesList = this.gameIndex.map(this.renderItem);
    return html` <main class="category-page">${gamesList}</main> `;
  }

  renderItem(game: Game) {
    const { title, releaseDate, ignRating, img } = game;
    return html`
      <div class="card-container">
        <button id="edit">Edit</button>
        <a class="view" href="/games/resident-evil4.html">
          <slot name="imgSrc">
            <img src=${ifDefined(img)} />
          </slot>
          <div class="overlay">
            <p><${title}</p>
            <p>${releaseDate}</p>
            <p>${ignRating}</p>
          </div>
        </a>
        <mu-form class="edit">
          <label>
            <span>Game Cover</span>
            <input name="imgSrc" type="file" />
          </label>
          <label>
            <span>Title</span>
            <input name="title" />
          </label>
          <label>
            <span>Release Date</span>
            <input name="releaseDate" />
          </label>
          <label>
            <span>Fan Rating</span>
            <input name="ignRating" />
          </label>
        </mu-form>
      </div>
    `;
  }

  static styles = [reset.styles, page.styles, gridCard.styles, tokens.styles];
}
