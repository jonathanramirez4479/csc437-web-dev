import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import DetailsPage from "./styles/details-page.css.js";

export class LocationDetailsElement extends HTMLElement {
  static template = html`
    <template>
      <main>
        <a href="../index.html">back to Home</a>
        <section class="primary-info">
          <slot name="imgSrc">
            <img src="/images/No_Image_Available.jpg" />
          </slot>
          <p><slot name="location">Location Name</slot></p>
          <p><slot name="fanRating">0</slot>/10</p>
        </section>
        <section class="secondary-info">
          <div class="info-group">
            <dt>Game appearances:</dt>
            <dd>
              <li><slot name="gameAppearances">(Resident Evil Game)</slot></li>
            </dd>
          </div>
          <div class="info-group">
            <dt>Movie appearances:</dt>
            <dd>
              <li>
                <slot name="movieAppearances">(Resident Evil Movie)</slot>
              </li>
            </dd>
          </div>
        </section>
      </main>
    </template>
  `;

  static styles = DetailsPage.styles;

  constructor() {
    super();
    shadow(this)
      .template(LocationDetailsElement.template)
      .styles(reset.styles, LocationDetailsElement.styles);
  }
}
