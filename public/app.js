const navSlide = () => {
  const burger = document.querySelector(".burger");
  const sideBar = document.querySelector(".bar-container");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");

  burger.addEventListener("click", () => {
    sideBar.classList.toggle("side-bar-active");

    line2.classList.toggle("none");
    line1.classList.toggle("rotate-line");
    line3.classList.toggle("rotate-line-2");
  });
};
navSlide();
