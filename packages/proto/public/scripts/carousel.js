document.addEventListener("DOMContentLoaded", () => {
  const listWrappers = document.querySelectorAll(".list-wrapper");

  listWrappers.forEach((wrapper) => {
    const list = wrapper.querySelector(".list");

    const item = wrapper.querySelector(".item");
    const itemWidth = item.offsetWidth;

    function handleClick(direction) {
      if (direction == "previous") {
        list.scrollBy({ left: -itemWidth, behavior: "smooth" });
      } else {
        list.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }

    const previousButton = wrapper.querySelector(".button--previous");
    const nextButton = wrapper.querySelector(".button--next");

    previousButton.addEventListener("click", () => handleClick("previous"));
    nextButton.addEventListener("click", () => handleClick("next"));
  });
});
