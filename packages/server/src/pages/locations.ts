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
        import { define, Auth } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header-element.js";
        import { LocationCardElement } from "/scripts/location-card.js";

        define({
          "header-element": HeaderElement,
          "location-card": LocationCardElement,
          "mu-auth": Auth.Provider
        });
        `,
      ],
    });
  }

  renderLocation(location: Location) {
    const { locationId, name, imgSrc, appearsIn, fanRating } = location;
    const appearsInVal = appearsIn?.at(0) || "";

    return html`
      <location-card src="/api/locations/${locationId}"> </location-card>
    `;
  }

  renderBody() {
    const characters = this.data;
    const characterList = characters
      ? html`${characters.map(this.renderLocation)}`
      : "";

    return html`
      <body>
        <mu-auth provides="resident-evil:auth">
          <header-element></header-element>
          <main class="category-page">${characterList}</main>
        </mu-auth>
      </body>
    `;
  }
}
