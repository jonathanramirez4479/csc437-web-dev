import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import DetailsPage from "./styles/details-page.css.js";

export class MovieDetailsElement extends HTMLElement {
  static template = html`
    <template>
      <main>
        <a href="../index.html">back to Home</a>
        <section class="primary-info">
          <slot name="imgSrc">
            <img src="/images/No_Image_Available.jpg" />
          </slot>
          <p><slot name="title">Resident Evil Movie Title</slot></p>
          <p><slot name="releaseDate">(Release Date)</slot></p>
          <p>Genres: <slot name="genres">(Genres)</slot></p>
          <p>IMDb: <slot name="imdbRating">0</slot>/10</p>
        </section>
        <section class="secondary-info">
          <div class="info-group">
            <dt>Summary:</dt>
            <dd>
              <slot name="summary">Movie Summary</slot>
            </dd>
          </div>
          <div class="info-group">
            <dt>Cast:</dt>
            <dd>
              <slot name="cast">(Actor Name)</slot>:
              <slot name="role">(Role)</slot>
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
      .template(MovieDetailsElement.template)
      .styles(reset.styles, MovieDetailsElement.styles);
  }
}
