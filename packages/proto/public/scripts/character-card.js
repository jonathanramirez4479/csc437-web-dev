import { html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class CharacterCardElement extends HTMLElement {
  static template = html`
    <template>
      <div class="view">
        <slot name="imgSrc">
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div class="overlay">
          <p><slot name="name">Name</slot></p>
          <p><slot name="fan-rating">Fan Rating</slot></p>
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
}
