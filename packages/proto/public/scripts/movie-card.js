import { html, shadow, css, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class MovieCardElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  static template = html`
    <template>
      <div class="view" >
        <slot name="imgSrc" >
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div class="overlay">
          <p><slot name="title" >Resident Evil Movie</slot></p>
          <p><slot name="releaseYear" >0000</slot></p>
          <p><slot name="imdbRating" >IMDb Rating: 0.0/10</slot></p>
        </div>
    </template>
  `;

  static styles = GridCardStyle;

  constructor() {
    super();
    shadow(this)
      .template(MovieCardElement.template)
      .styles(reset.styles, MovieCardElement.styles);
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

  hydrate(url) {
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log(`Failed to render data ${url}: `, error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (key) {
        case "imgSrc":
          return html`<img slot="${key}" src="${value}" />`;
        case "releaseDate":
          function getValidDate(dateString) {
            const date = new Date(dateString);
            return date;
          }
          const date = getValidDate(value);
          if (date instanceof Date && !isNaN(date.getTime())) {
            return html`<span slot="releaseYear"
              >(${date.getFullYear()})</span
            >`;
          }
        case "imdbRating":
          return html`<span slot="${key}">Fan Rating: ${value}/10</span>`;
        default: {
          return html`<span slot="${key}">${value}</span>`;
        }
      }
    };

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }
}
