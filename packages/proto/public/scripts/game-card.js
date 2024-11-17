import { html, Observer, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class GameCard extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  hydrate(url) {
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log(`Failed to render data ${url}:`, error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (key) {
        case "imgSrc":
          return html`<img slot=${key} src=${value} />`;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }

  static template = html`
    <template>
      <div>
        <slot name="imgSrc">
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div>
          <p><slot name="title">Title</slot></p>
          <p><slot name="releaseDate">Release date</slot></p>
          <p><slot name="fanRating">0/5</slot></p>
        </div>
      </div>
    </template>
  `;

  static styles = GridCardStyle;

  constructor() {
    super();
    shadow(this)
      .template(GameCard.template)
      .styles(reset.styles, GameCard.styles);
  }

  _authObserver = new Observer(this, "resident-evil:auth");

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`,
      }
    );
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user: ", user);
      this._user = user;
      if (this.src) this.hydrate(this.src);
    });
  }
}
