import { css } from "@calpoly/mustang";

const GridCardStyle = css`
  .view {
    margin-top: var(--margin-top-grid-item);
    flex: 1;
    justify-items: center;
    width: var(--width-grid-item);
    height: var(--height-grid-item);
    border-radius: var(--border-radius-grid-item);
    position: relative; /* Add this to position overlay */
    overflow: hidden;
    position: relative;
  }

  ::slotted(img[slot="image"]) {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .view:hover > ::slotted(img[slot="image"]) {
    opacity: var(--opacity-card-hover);
    transition: opacity 0.3s;
  }

  .view > div {
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
    transition: opacity 0.3s; /* Smooth opacity transition */
    background-color: white;
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
  }

  .view:hover > div {
    opacity: 1; /* Show overlay on hover */
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
  }

  [mode="edit"] mu-form.edit {
    display: block;
  }

  [mode="view"] mu-form.edit {
    display: none; !important;
  }
`;

export default GridCardStyle;
