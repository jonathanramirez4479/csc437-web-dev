import { html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class LocationCard extends HTMLElement {
  static template = html`
    <template>
      <div>
        <slot name="image">
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div>
          <p><slot name="name">null</slot></p>
          <p><slot name="first-shown-in">null</slot></p>
          <p><slot name="fan-rating">0/5</slot></p>
        </div>
      </div>
    </template>
  `;

  static styles = GridCardStyle;

  constructor() {
    super();
    shadow(this)
      .template(LocationCard.template)
      .styles(reset.styles, LocationCard.styles);
  }
}