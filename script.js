setTimeout(() => {
  const countToDate = new Date().setMinutes(new Date().getMinutes() + 5);
  let animation = document.querySelector(".animation");
  let clock = document.querySelector(".clock");
  let degree = 100;

  setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
    if (timeBetweenDates >= 0) {
      flipAllCards(timeBetweenDates);
    } else {
      animation.classList.add("hidden");
    }
    console.log(timeBetweenDates);
  }, 250);

  setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = (countToDate - currentDate) / 1000;
    const timeInSeconds = 5 * 60;
    degree = ((timeInSeconds - timeBetweenDates) / timeInSeconds) * 100;

    clock.setAttribute(
      "style",
      `--background-color: conic-gradient(transparent ${degree}%, hsl(var(--hue-color), 39%, 47%) 0%)`
    );
  }, 1);
}, 2000);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  top.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}
