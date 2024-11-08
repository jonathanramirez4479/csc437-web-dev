import { css, html, shadow, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
  static template = html`
    <template>
      <header>
        <div id="primary-header">
          <div class="title">
            <h1>Resident Evil Wiki</h1>
            <svg class="icon">
              <use href="/icons/umbrella-corp.svg#icon-umbrella-corp" />
            </svg>
          </div>
          <label class="dark-mode-switch">
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
          <img class="profile-pic" src="/images/profile-pic.jpg" />
        </div>
        <div id="sub-header">
          <h5><a href="../index.html">Home</a></h5>
          <h5><a href="/pages/games.html">Games</a></h5>
          <h5><a href="/pages/movies.html">Movies</a></h5>
          <h5><a href="/pages/characters.html">Characters</a></h5>
          <h5><a href="/pages/locations.html">Locations</a></h5>
        </div>
      </header>
    </template>
  `;

  static styles = css`
    header {
      display: flex;
      flex-direction: column;

      background-color: var(--color-background-header);
      color: var(--color-text);

      font-size: var(--font-style-header);
      font-family: var(--font-family-display);
      font-style: normal;

      text-align: center;
      border-color: currentColor;
      border: 1px solid var(--color-text);
    }

    #primary-header {
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: baseline;
    }

    #primary-header > .title {
      display: flex;
      flex: 1;
      justify-content: center;
      text-align: center;
      margin-left: 6em;
    }

    #primary-header > .profile-pic {
      height: var(--height-avatar-header);
      width: var(--width-avatar-header);
      border-radius: var(--border-radius-avatar-header);
      margin-right: 2em;
    }

    #sub-header {
      display: flex;
      justify-content: center;
    }

    #sub-header h5 {
      padding: var(--padding-sub-header);
      padding-bottom: var(--padding-bottom-sub-header);
    }

    svg.icon {
      display: inline;
      height: var(--height-svg);
      width: var(--width-svg);
      vertical-align: top;
      fill: currentColor;
    }

    a {
      color: var(--color-link);
    }

    a:visited {
      color: var(--color-link);
    }

    header a {
      color: inherit;
    }

    header a:visited {
      color: inherit;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(reset.styles, HeaderElement.styles);

    const dm = this.shadowRoot.querySelector(".dark-mode-switch");

    dm.addEventListener("click", (event) => {
      Events.relay(event, "dark-mode", {
        checked: event.target.checked,
      });
    });
  }

  static initializeOnce() {
    function toggleDarkMode(page, checked) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) => {
      toggleDarkMode(event.currentTarget, event.detail.checked);
    });
  }
}
