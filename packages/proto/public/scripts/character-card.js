import {
  html,
  shadow,
  Observer,
  Form,
  InputArray,
  define,
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import GridCardStyle from "./styles/grid-card.css.js";

export class CharacterCardElement extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  get src() {
    return this.getAttribute("src");
  }

  static template = html`
    <template>
      <div class="card-container">
        <button id="edit">Edit</button>
        <div class="view">
          <slot name="imgSrc">
            <img src="/images/No_Image_Available.jpg" />
          </slot>
          <div class="overlay">
            <p><slot name="name">Name</slot></p>
            <p><slot name="fanRating">Fan Rating</slot></p>
          </div>
        </div>
        <mu-form class="edit">
          <label>
            <span>Character Portrait</span>
            <input name="imgSrc" type="file" />
          </label>
          <label>
            <span>Name</span>
            <input name="name" />
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

  constructor() {
    super();
    shadow(this)
      .template(CharacterCardElement.template)
      .styles(reset.styles, CharacterCardElement.styles);

    this.mode = "view";

    this.addEventListener("mu-form:submit", (event) =>
      this.submit(this.src, event.detail)
    );

    this.editButton.addEventListener("click", () => (this.mode = "edit"));

    this.characterPortraitInput.addEventListener("change", (event) =>
      this.handleCharacterPortraitSelected(event)
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

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(m) {
    this.setAttribute("mode", m);
  }

  get editButton() {
    return this.shadowRoot.getElementById("edit");
  }

  get characterPortraitInput() {
    return this.form.querySelector('input[name="imgSrc"]');
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user: ", user);
      this._user = user;
      if (this.src) this.hydrate(this.src);
    });
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
      })
      .catch((error) => console.log(`Failed to render data ${url}: `, error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (key) {
        case "imgSrc":
          return html`<img slot="${key}" src="${value}" />`;
        case "fanRating":
          return html`<span slot="${key}">Fan Rating: ${value}/10</span>`;
        default: {
          return html`<span slot="${key}">${value}</span>`;
        }
      }
    };

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }

  submit(url, json) {
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
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}: `, error);
      });
  }

  handleCharacterPortraitSelected(event) {
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
