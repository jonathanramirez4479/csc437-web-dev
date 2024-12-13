import { html, css } from "@calpoly/mustang/server";
import { Movie } from "models/movie";
import renderPage from "./renderPage";

export class MoviesPage {
  data: Movie[];

  constructor(data: Movie[]) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [],
      styles: [],
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header-element.js";
        import { MovieCardElement } from "/scripts/movie-card.js";

        define({
          "mu-auth": Auth.Provider,
          "header-element": HeaderElement,
          "movie-card": MovieCardElement
        });
        `,
      ],
    });
  }

  renderMovie(movie: Movie) {
    const { movieCode } = movie;
    return html` <movie-card src="/api/movies/${movieCode}"></movie-card> `;
  }

  renderBody() {
    const movies = this.data;
    const movieList = movies ? html`${movies.map(this.renderMovie)}` : "";

    return html`
      <body>
        <mu-auth provides="resident-evil:auth">
          <header-element></header-element>
          <main class="category-page">${movieList}</main>
        </mu-auth>
      </body>
    `;
  }
}
