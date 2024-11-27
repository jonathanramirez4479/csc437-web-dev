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
        import { define } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header-element.js";
        import { MovieCardElement } from "/scripts/movie-card.js";

        define({
            "header-element": HeaderElement,
            "movie-card": MovieCardElement,
        });
        `,
      ],
    });
  }

  renderMovie(movie: Movie) {
    const { title, imgSrc, releaseDate, imdbRating } = movie;
    return html`
      <movie-card>
        <img slot="imgSrc" src=${imgSrc} />
        <span slot="title">${title}</span>
        <span slot="releaseYear">${releaseDate.getFullYear()}</span>
        <span slot="rating">IMDb Rating: ${imdbRating}/10</span>
      </movie-card>
    `;
  }

  renderBody() {
    const movies = this.data;
    const movieList = movies ? html`${movies.map(this.renderMovie)}` : "";

    return html`
      <body>
        <header-element></header-element>
        <main class="category-page">${movieList}</main>
      </body>
    `;
  }
}
