import { Auth, define, History, Switch } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { ResidentEvilHeaderElement } from "./components/resident-evil-header";
import { HomeViewElement } from "./views/home-view";
import { GamesPageViewElement } from "./views/games-view";

class AppElement extends LitElement {
  protected render() {
    return html` <home-view></home-view> `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    ResidentEvilHeaderElement.initializeOnce();
  }
}

const routes = [
  {
    path: "/app/games",
    view: () => html` <games-view></games-view> `,
  },
  {
    path: "/app/movies",
    view: () => html` <movies-view></movies-view> `,
  },
  {
    path: "/app",
    view: () => html` <home-view></home-view> `,
  },
  {
    path: "/",
    redirect: "/app",
  },
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "resident-evil:history", "resident-evil:auth");
    }
  },
  "resident-evil-wiki-app": AppElement,
  "resident-evil-header": ResidentEvilHeaderElement,
  "home-view": HomeViewElement,
  "games-view": GamesPageViewElement,
});
