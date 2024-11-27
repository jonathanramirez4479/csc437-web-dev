import { html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class LocationCardElement extends HTMLElement {
  static template = html`
    <template>
      <div class="view">
        <slot name="imgSrc">
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div class="overlay">
          <p><slot name="name">Location Name</slot></p>
          <p><slot name="source">Resident Evil Movie/Game</slot></p>
          <p><slot name="fan-rating">Fan Rating:</slot></p>
        </div>
      </div>
    </template>
  `;

  static styles = GridCardStyle;

  constructor() {
    super();
    shadow(this)
      .template(LocationCardElement.template)
      .styles(reset.styles, LocationCardElement.styles);
  }
}
