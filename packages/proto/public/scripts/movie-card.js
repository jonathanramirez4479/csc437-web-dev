import { html, shadow, css } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class MovieCardElement extends HTMLElement {
  static template = html`
    <template>
      <div class="view" >
        <slot name="imgSrc" >
          <img src="/images/No_Image_Available.jpg" />
        </slot>
        <div class="overlay">
          <p><slot name="title" >Resident Evil Movie</slot></p>
          <p><slot name="releaseYear" >0000</slot></p>
          <p><slot name="rating" >IMDb Rating: 0.0/10</slot></p>
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
}
