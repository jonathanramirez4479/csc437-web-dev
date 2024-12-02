import {
  html,
  Observer,
  shadow,
  define,
  Form,
  InputArray,
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class GameCard extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  static template = html`
    <template>
      <div class="card-container">
        <button id="edit">Edit</button>
        <div class="view">
          <slot name="imgSrc">
            <img src="/images/No_Image_Available.jpg" />
          </slot>
          <div class="overlay">
            <p><slot name="title">Title</slot></p>
            <p><slot name="releaseYear">Release date</slot></p>
            <p><slot name="fanRating">0/5</slot></p>
          </div>
        </div>
        <mu-form class="edit">
          <label>
            <span>Game Cover</span>
            <input name="imgSrc" type="file" />
          </label>
          <label>
            <span>Title</span>
            <input name="title" />
          </label>
          <label>
            <span>Release Date</span>
            <input name="releaseYear" />
          </label>
          <label>
            <span>Fan Rating</span>
            <input name="fanRating" />
          </label>
        </mu-form>
      </div>
    </template>
  `;

  static styles = GridCardStyle;

  get src() {
    return this.getAttribute("src");
  }

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(m) {
    console.log(`Setting mode to: ${m}`);
    this.setAttribute("mode", m);
    const form = this.shadowRoot.querySelector("mu-form.edit");
    form.style.display = m === "view" ? "none" : "block";
  }

  get editButton() {
    return this.shadowRoot.getElementById("edit");
  }

  get gameCoverInput() {
    return this.form.querySelector('input[name="imgSrc"]');
  }

  hydrate(url) {
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        const formJson = { ...json };
        if (!this.imgSrc) delete formJson.imgSrc;
        this.form.init = formJson;
        const releaseYear = new Date(json.releaseDate).getFullYear();
        this.form.querySelector('input[name="releaseYear"]').value =
          releaseYear;
      })
      .catch((error) => console.log(`Failed to render data ${url}:`, error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (key) {
        case "imgSrc":
          return html`<img slot=${key} src=${value} />`;
        case "releaseDate":
          const releaseYear = new Date(value).getFullYear();
          return html`<span slot="releaseYear">(${releaseYear})</span>`;
        case "fanRating":
          return html`<span slot="fanRating">IGN Rating: ${value}/10</span>`;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }

  constructor() {
    super();
    shadow(this)
      .template(GameCard.template)
      .styles(reset.styles, GameCard.styles);

    this.mode = "view"; // Set the default mode to "view"

    this.addEventListener("mu-form:submit", (event) => {
      this.submit(this.src, event.detail);
    });

    this.editButton.addEventListener("click", () => (this.mode = "edit"));

    this.gameCoverInput.addEventListener("change", (event) => {
      this.handleGameCoverSelected(event);
    });
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
      console.log("Authenticated user: ", user);
      this._user = user;
      if (this.src) this.hydrate(this.src);
    });
  }

  submit(url, json) {
    if (json.releaseYear) {
      let jsonDate = json.releaseDate;
      let date = new Date(jsonDate);
      date.setFullYear(json.releaseYear);
      json.releaseDate = date.toISOString();
    }

    if (this.imgSrc) json.imgSrc = this.imgSrc;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.authorization,
      },
      body: JSON.stringify(json),
    })
      .then((res) => {
        if (res.status !== 201 && res.status !== 200)
          throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        const formJson = { ...json };
        delete formJson.imgSrc;
        this.form.init = formJson;
        const releaseYear = new Date(json.releaseDate).getFullYear();
        this.form.querySelector('input[name="releaseYear"]').value =
          releaseYear;
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}: `, error);
      });
  }

  handleGameCoverSelected(event) {
    const target = event.target;
    const selectedFile = target.files[0];

    const reader = new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = (error) => reject(error);
      fr.readAsDataURL(selectedFile);
    });

    reader.then((result) => (this.imgSrc = result));
  }
}
