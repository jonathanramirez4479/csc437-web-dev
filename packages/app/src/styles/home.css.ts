import { css } from "lit";

const styles = css`
  .category-list,
  .list {
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 8px;
    padding: 16px;

    list-style: none;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;

    /* Hide scrollbar in IE and Edge */
    -ms-overflow-style: none;
  }

  .category-list {
    margin: 2rem;
  }

  /* Hide scrollbar in webkit */
  .list::-webkit-scrollbar {
    display: none;
  }

  .list-wrapper {
    position: relative;
    width: 90%;
    justify-self: center;
  }

  .button {
    position: absolute;
    top: 50%;

    width: 3rem;
    height: 3rem;

    transform: translateY(-50%);
  }

  .button--previous {
    left: 1.5rem;

    transform: rotate(180deg);
  }

  .button--next {
    right: 1.5rem;
  }

  .item {
    flex-shrink: 0;
    width: var(--width-grid-item);
    height: var(--height-grid-item);

    background-color: #fff;

    scroll-snap-align: center;

    border-radius: var(--border-radius-grid-item);
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: sans-serif;
    font-size: 64px;
    font-weight: bold;

    height: inherit;
    width: inherit;

    position: relative;
    border-radius: inherit;
  }

  .content > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .content > .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    height: var(--height-grid-item-overlay);
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: white;
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  .overlay > p {
    font-size: 12px;
    font-family: var(--font-family-body);
  }

  .content:hover > .overlay {
    opacity: 1;
    transition: opacity 0.3s;

    width: inherit;
    height: 50%;
  }

  .content:hover > img {
    opacity: var(--opacity-card-hover);
    transition: opacity 0.3s;
  }

  h3 {
    margin: 10px;
    font-family: var(--font-family-display);
    text-decoration: underline;
  }
`;

export default { styles };
