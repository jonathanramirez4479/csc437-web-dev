import { css } from "lit";

const styles = css`
  :root {
    --color-background-body: rgb(235, 243, 250);
    --color-background-header: rgb(210, 231, 250);
    --color-text: darkred;
    --color-border: var(--color-text);
    --color-link: purple;

    --height-svg: 2em;
    --width-svg: 2em;

    --font-family-body: "Cardo", serif, system-ui;
    --font-family-display: "Philosopher", sans-serif, system-ui;

    --opacity-h2: 75%;

    --font-weight-normal: 400;
    --font-weight-light: 200;
    --font-weight-bold: 700;

    --font-line-height-body: 1.5;
    --font-line-height-display: 1.125;

    --font-size-header: 24px;

    --height-avatar-header: 2em;
    --width-avatar-header: 2em;

    --border-radius-avatar-header: 45%;

    --padding-sub-header: 10px;
    --padding-bottom-sub-header: 0px;

    --grid-gap-category-page: 10px;
    --margin-bottom-category-page: 50px;

    --margin-top-grid-item: 3em;
    --width-grid-item: 300px;
    --height-grid-item: 250px;
    --border-radius-grid-item: 10%;

    --height-grid-item-overlay: 50%;

    --opacity-card-hover: 0.5;
    --grid-card-overlay-transition: 0.3s;
  }

  body.dark-mode {
    --color-background-body: rgb(4, 41, 99);
    --color-background-header: rgb(4, 24, 56);
    --color-text: rgb(216, 0, 0);
  }
`;

export default { styles };
