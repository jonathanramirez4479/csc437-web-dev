import { css } from "@calpoly/mustang";

const GridCardStyle = css`
  .view {
    position: relative;
    margin-top: var(--margin-top-grid-item);
    flex: 1;
    justify-items: center;
    width: var(--width-grid-item);
    height: var(--height-grid-item);
    border-radius: var(--border-radius-grid-item);
    position: relative; /* Add this to position overlay */
    overflow: hidden;
    border: solid 0.5rem blue;
  }

  .view > ::slotted([slot="imgSrc"]) {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: inherit;
  }

  .view:hover > ::slotted([slot="imgSrc"]) {
    opacity: var(--opacity-card-hover);
    transition: opacity var(--grid-card-overlay-transition);
  }

  .view > .overlay {
    position: absolute; /* Position overlay over the image */
    bottom: 0; /* Align to the top */
    left: 0; /* Align to the left */
    right: 0; /* Stretch to the right */
    display: flex; /* Center text */
    flex-direction: column;
    height: var(--height-grid-item-overlay);
    align-items: center; /* Vertically center text */
    justify-content: center; /* Horizontally center text */
    opacity: 0; /* Hide overlay initially */
    transition: opacity var(--grid-card-overlay-transition); /* Smooth opacity transition */
    background-color: white;
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
  }

  .view:hover > .overlay {
    opacity: 1; /* Show overlay on hover */
    transition: var(--grid-card-overlay-transition);
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
  }
`;

export default GridCardStyle;
