import { html, css } from "@calpoly/mustang/server";
import { Location } from "models/location";
import renderPage from "./renderPage";

export class LocationsPage {
  data: Location[];

  constructor(data: Location[]) {
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
        import { LocationCardElement } from "/scripts/location-card.js";

        define({
            "header-element": HeaderElement,
            "location-card": LocationCardElement,
        });
        `,
      ],
    });
  }

  renderLocation(location: Location) {
    const { locationId, name, imgSrc, appearsIn, fanRating } = location;
    const appearsInVal = appearsIn?.at(0) || "";

    return html`
      <location-card src="/api/locations/${locationId}">
        <!-- <img slot="imgSrc" src=${imgSrc} />
        <span slot="name">${name}</span>
        <span slot="source">(${appearsInVal})</span>
        <span slot="fanRating">${fanRating}</span> -->
      </location-card>
    `;
  }

  renderBody() {
    const characters = this.data;
    const characterList = characters
      ? html`${characters.map(this.renderLocation)}`
      : "";

    return html`
      <body>
        <header-element></header-element>
        <main class="category-page">${characterList}</main>
      </body>
    `;
  }
}
