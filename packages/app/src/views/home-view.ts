import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Game } from "server/models";
import reset from "../styles/reset.css";
import home from "../styles/home.css";
import tokens from "../styles/tokens.css";
import page from "../styles/page.css";

export class HomeViewElement extends LitElement {
  src = "/api/games";

  @state()
  gameIndex = new Array<Game>();

  _authObserver = new Observer<Auth.Model>(this, "resident-evil:auth");

  _user = new Auth.User();

  connectedCallback() {
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
          console.log("gameIndex: ", this.gameIndex);
        }
      })
      .catch((err) => console.log("Failed to get game data:", err));
  }

  render() {
    console.log("current gameIndex: ", this.gameIndex);
    // const gamesList = this.gameIndex.map(this.renderItem);

    return html`
      <main>
        <h3>Popular games</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re0.jpg" />
                <div class="overlay">
                  <p>Resident Evil 0</p>
                  <p>IGN Rating: 6.5/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re2.webp" />
                <div class="overlay">
                  <p>Resident Evil 2</p>
                  <p>IGN Rating: 9/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re4.jpg" />
                <div class="overlay">
                  <p>Resident Evil 4</p>
                  <p>IGN Rating: 10/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re3.webp" />
                <div class="overlay">
                  <p>Resident Evil 3</p>
                  <p>Fan Rating: 9/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re5.jpg" />
                <div class="overlay">
                  <p>Resident Evil 5</p>
                  <p>Fan Rating: 9.3/5</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re-biohazard.jpg" />
                <div class="overlay">
                  <p>Resident Evil 7 Biohazard</p>
                  <p>Fan Rating: 7.7/10</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
        <script type="module" src="scripts/carousel.js"></script>
        <!-- Popular Movies -->
        <h3>Popular Movies</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re.jpg" />
                <div class="overlay">
                  <p>Resident Evil</p>
                  <p>2002</p>
                  <p>IMDb Rating: 6.6/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-retribution.jpg" />
                <div class="overlay">
                  <p>Resident Evil: Retribution</p>
                  <p>2012</p>
                  <p>IMDb Rating: 5.3/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-apocalypse.jpg" />
                <div class="overlay">
                  <p>Resident Evil: Apocalypse</p>
                  <p>2004</p>
                  <p>Fan Rating: 6.1/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-extinction.jpeg" />
                <div class="overlay">
                  <p>Resident Evil: Extinction</p>
                  <p>2007</p>
                  <p>IMDb Rating: 6.2/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-vendetta.webp" />
                <div class="overlay">
                  <p>Resident Evil: Vendetta</p>
                  <p>2017</p>
                  <p>IMDb Rating: 6.2/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-death-island.png" />
                <div class="overlay">
                  <p>Resident Evil: Death Island</p>
                  <p>2023</p>
                  <p>IMDb Rating: 5.7/10</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
        <!-- Iconic Characters -->
        <h3>Iconic Characters</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/claire-redfield.webp" />
                <div class="overlay">
                  <p>Claire Redfield</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/chris-redfield.jpg" />
                <div class="overlay">
                  <p>Chris Redfield</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/wesker.jpg" />
                <div class="overlay">
                  <p>Albert Wesker</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/nemesis.webp" />
                <div class="overlay">
                  <p>Nemesis</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/leon-kennedy.webp" />
                <div class="overlay">
                  <p>Leon Kennedy</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
        <!-- Memorable Locations -->
        <h3>Memorable Locations</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/locations/rcpd.webp" />
                <div class="overlay">
                  <p>Racoon City Police Department</p>
                  <p>(Resident Evil 2)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/re3-downtown-rc.webp" />
                <div class="overlay">
                  <p>Downtown Racoon City</p>
                  <p>(Resident Evil 3)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/re4-village.webp" />
                <div class="overlay">
                  <p>The Village</p>
                  <p>(Resident Evil 4)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/rockfort-prison.webp" />
                <div class="overlay">
                  <p>Rockfort Prison</p>
                  <p>(Resident Evil Code Veronica)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/the-morgue.webp" />
                <div class="overlay">
                  <p>The Morgue</p>
                  <p>(Resident Evil 2)</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
      </main>
    `;
  }

  renderItem(game: Game) {
    const { title, releaseDate, ignRating } = game;
    return html`
      <dt>${title}</dt>
      <dd>${releaseDate}</dd>
      <dd>${ignRating}</dd>
    `;
  }

  static styles = [reset.styles, page.styles, home.styles, tokens.styles];
}
