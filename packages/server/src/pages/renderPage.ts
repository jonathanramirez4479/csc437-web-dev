import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
  stylesheets: ["/styles/reset.css", "/styles/page.css", "/styles/tokens.css"],
  styles: [],
  scripts: [
    `
    import { define } from "@calpoly/mustang";
    import { HeaderElement } from "/scripts/header-element.js";

    define ({
        "header-element": HeaderElement
    });

    HeaderElement.initializeOnce();
    `,
  ],
  googleFontURL:
    "https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang",
  },
};

export default function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}
