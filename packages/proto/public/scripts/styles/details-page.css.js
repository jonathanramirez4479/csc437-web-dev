import { css } from "@calpoly/mustang";

const styles = css`
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .primary-info {
    border: 1px solid;
    margin: 2em;
    background-color: rgba(112, 243, 255, 0.65);
    font-family: var(--font-family-body);
  }

  img {
    margin: 2em;
    width: 200px;
    height: 200px;
  }

  dt {
    font-size: 20px;
    font-weight: 550;
    font-family: var(--font-family-display);
  }

  dd {
    padding-left: 10px;
    font-family: var(--font-family-body);
  }

  a {
    color: var(--color-link);
  }

  .secondary-info {
    margin: 20px;
    width: 80%;
    text-align: left;
  }

  .info-group {
    padding: 10px;
    border: 1px solid black;
  }
`;

export default { styles };
