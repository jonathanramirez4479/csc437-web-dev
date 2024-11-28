import { html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class CharacterCardElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  static template = html`
    <template>
      <div class="view">
        <slot name="imgSrc">
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div class="overlay">
          <p><slot name="name">Name</slot></p>
          <p><slot name="fanRating">Fan Rating</slot></p>
        </div>
      </div>
    </template>
  `;

  static styles = GridCardStyle;

  constructor() {
    super();
    shadow(this)
      .template(CharacterCardElement.template)
      .styles(reset.styles, CharacterCardElement.styles);
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  hydrate(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderslots(json))
      .catch((error) => console.log(`Failed to render data ${url}: `, error));
  }

  renderslots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (key) {
        case "imgSrc":
          return html`<img slot="${key}" src="${value}" />`;
        case "fanRating":
          return html`<span slot="${key}">Fan Rating: ${value}/10</span>`;
        default: {
          console.log("got an element");
          return html`<span slot="${key}">${value}</span>`;
        }
      }
    };

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }
}
