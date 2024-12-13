import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Game } from "server/models";
import { ifDefined } from "lit/directives/if-defined.js";

export class GameDetailsPageElement extends LitElement {
  game = {} as Game;
  src = `/api/games/${this.game._id}`;
  @state()
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

  hydrate(url: string): void {
    fetch(url, {
      headers: Auth.headers(this._user),
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw `Server responded with status ${res.status}`;
      })
      .then((json: unknown) => {
        console.log("json received: ", json);
        if (json) {
          const { data } = json as { data: Game };
          this.game = data;
        }
      })
      .catch((err) => console.log("Failed to get game data: ", err));
  }

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
    } = this.game || {};

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
}
