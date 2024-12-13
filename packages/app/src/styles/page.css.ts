import { css } from "lit";

const styles = css`
  body {
    display: flex;
    background-color: var(--color-background-body);
    color: var(--color-text);
    font-family: var(--font-family-body);
  }

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
    height: 50px;
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

  .category {
    color: var(--color-text);
  }

  .category-page {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: var(--grid-gap-category-page);
    margin-bottom: var(--margin-bottom-category-page);
  }

  header a {
    color: inherit;
  }

  header a:visited {
    color: inherit;
  }

  h2 {
    opacity: var(--opacity-h2);
  }

  a {
    color: var(--color-link);
  }

  a:visited {
    color: var(--color-link);
  }

  svg.icon {
    display: inline;
    height: var(--height-svg);
    width: var(--width-svg);
    vertical-align: top;
    fill: currentColor;
  }
`;

export default { styles };
