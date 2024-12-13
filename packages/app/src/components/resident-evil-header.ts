import { LitElement, css, html } from "lit";
import { Dropdown, define, Events } from "@calpoly/mustang";

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

export class ResidentEvilHeaderElement extends LitElement {
  static uses = define({
    "drop-down": Dropdown.Element,
  });

  render() {
    return html`
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
          <drop-down>
            <menu>
              <li>
                <label @change=${toggleDarkMode}>
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
          </drop-down>
          <img class="profile-pic" src="app/public/images/profile-pic.jpg" />
        </div>
        <div id="sub-header">
          <h5><a href="/app/games">Home</a></h5>
          <h5><a href="/games">Games</a></h5>
          <h5><a href="/movies">Movies</a></h5>
          <h5><a href="/characters">Characters</a></h5>
          <h5><a href="/locations">Locations</a></h5>
        </div>
      </header>
    `;
  }

  static styles = [
    css`
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
        height: 80px;
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
        height: 50px;
        display: flex;
        justify-content: center;
      }

      #sub-header h5 {
        padding: var(--padding-sub-header);
        padding-bottom: var(--padding-bottom-sub-header);
      }

      svg.icon {
        height: var(--height-svg);
        width: var(--width-svg);
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
    `,
  ];

  static initializeOnce() {
    function toggleDarkMode(page: HTMLElement, checked: boolean) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}
