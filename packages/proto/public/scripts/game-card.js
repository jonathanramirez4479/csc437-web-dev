import { html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class GameCard extends HTMLElement {
  static template = html`
    <template>
      <div>
        <slot name="image">
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div>
          <p><slot name="title">Title</slot></p>
          <p><slot name="release-date">Release date</slot></p>
          <p><slot name="fan-rating">0/5</slot></p>
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
}
