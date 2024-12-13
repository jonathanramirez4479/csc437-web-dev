import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import DetailsPage from "./styles/details-page.css.js";

export class CharacterDetailsElement extends HTMLElement {
  static template = html`
    <template>
      <main>
        <a href="../index.html">back to Home</a>
        <section class="primary-info">
          <slot name="imgSrc">
            <img src="/images/No_Image_Available.jpg" />
          </slot>
          <p><slot name="name">Character Name</slot></p>
          <p>Date of birth: <slot name="birthDate">0000</slot></p>
          <p>Race/Nationality: <slot name="nationality">(Nationality)</slot></p>
          <p>Sex: <slot name="sex">(M/F)</slot></p>
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
      .template(CharacterDetailsElement.template)
      .styles(reset.styles, CharacterDetailsElement.styles);
  }
}
