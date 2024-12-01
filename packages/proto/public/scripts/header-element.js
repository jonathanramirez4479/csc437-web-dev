import {
  css,
  html,
  define,
  shadow,
  Events,
  Observer,
  Dropdown,
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  static template = html`
    <template>
      <header>
        <div id="primary-header">
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <div class="title">
            <h1>Resident Evil Wiki</h1>
            <svg class="icon">
              <use href="/icons/umbrella-corp.svg#icon-umbrella-corp" />
            </svg>
          </div>
          <mu-dropdown>
            <menu>
              <li>
                <label class="dark-mode-switch">
                  <input type="checkbox" autocomplete="off" />
                  Dark mode
                </label>
              </li>
              <li class="when-signed-in">
                <a id="signout">Sign Out</a>
              </li>
              <li class="when-signed-out">
                <a href="/login">Sign In</a>
              </li>
            </menu>
          </mu-dropdown>
          <img class="profile-pic" src="/images/profile-pic.jpg" />
        </div>
        <div id="sub-header">
          <h5><a href="/index.html">Home</a></h5>
          <h5><a href="/games">Games</a></h5>
          <h5><a href="/movies">Movies</a></h5>
          <h5><a href="/characters">Characters</a></h5>
          <h5><a href="/locations">Locations</a></h5>
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

    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
    }
    #userid:empty::before {
      content: "user";
    }
    menu a {
      color: var(--color-link);
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }
  `;

  get userid() {
    return this._userid.textContent;
  }

  set userid(id) {
    if (id === "anonymous") {
      this._userid.textContent = "";
      this._signout.disabled = true;
    } else {
      this._userid.textContent = id;
      this._signout.disabled = false;
    }
  }

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

    this._userid = this.shadowRoot.querySelector("#userid");
    this._signout = this.shadowRoot.querySelector("#signout");

    this._signout.addEventListener("click", (event) =>
      Events.relay(event, "auth:message", ["auth/signout"])
    );
  }

  _authObserver = new Observer(this, "resident-evil:auth");

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`,
      }
    );
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
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
