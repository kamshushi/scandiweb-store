export const carousel = () => {
  let slidePosition = 0;
  const slides = document.getElementsByClassName("carousel-item");
  const totalSlides = slides.length;
  document
    .getElementById("carousel-button-next")
    .addEventListener("click", () => {
      moveToNextSlide();
    });
  document
    .getElementById("carousel-button-prev")
    .addEventListener("click", () => {
      moveToPrevSlide();
    });

  const updateSlidePosition = () => {
    for (let slide of slides) {
      slide.classList.remove("carousel-item-visible");
      slide.classList.add("carousel-item-hidden");

      slides[slidePosition].classList.add("carousel-item-visible");
    }
  };
  const moveToNextSlide = () => {
    if (slidePosition === totalSlides - 1) {
      slidePosition = 0;
    } else {
      slidePosition++;
    }
    updateSlidePosition();
  };
  const moveToPrevSlide = () => {
    if (slidePosition === 0) {
      slidePosition = totalSlides - 1;
    } else {
      slidePosition--;
    }
    updateSlidePosition();
  };
};
