/**
 * Prize data will space out evenly on the deal wheel based on the amount of items available.
 * @param text [string] name of the prize
 * @param color [string] background color of the prize
 * @param reaction ['resting' | 'dancing' | 'laughing' | 'shocked'] Sets the reaper's animated reaction
 */

const prizes = [
  {
    text: "马",
    price: "20",
    color: "hsl(91 43% 54%)",
    // reaction: "laughing",
  },
  {
    text: "猪",
    price: "20",
    color: "hsl(173 58% 39%)",
    // reaction: "shocked",
  },
  {
    text: "鸡",
    price: "20",
    color: "hsl(43 74% 66%)",
    // reaction: "shocked",
  },
  {
    text: "虎",
    price: "20",
    color: "hsl(27 87% 67%)",
    // reaction: "shocked",
  },
  {
    text: "牛",
    price: "20",
    color: "hsl(12 76% 61%)",
    // reaction: "dancing",
  },
  {
    text: "鼠",
    price: "20",
    color: "hsl(350 60% 52%)",
    // reaction: "laughing",
  },
  {
    text: "蛇",
    price: "20",
    color: "hsl(187 30% 43%)",
    // reaction: "dancing",
  },
  {
    text: "龙",
    price: "20",
    color: "hsl(140 36% 74%)",
    // reaction: "dancing",
  },
];

const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const reaper = wheel.querySelector(".grim-reaper");
const prizeSlice = 360 / prizes.length;
const prizeOffset = Math.floor(180 / prizes.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

let zodiacTxt = document.querySelector(".prize-txt");

const createPrizeNodes = () => {
  spinner.insertAdjacentHTML(
    "beforeend",
    // `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
    //     <span class="text">${text}</span>
    //   </li>`
    `<div class="inner-wheel"><img src="./resources/images/inner-wheel.png" alt=""></div>`
  );
  // prizes.forEach(({ text, color, reaction }, i) => {
  //   const rotation = prizeSlice * i * -1 - prizeOffset;

  //   spinner.insertAdjacentHTML(
  //     "beforeend",
  //     `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
  //       <span class="text">${text}</span>
  //     </li>
  //     <div class="inner-wheel"><img src="./resources/images/inner-wheel.png" alt=""></div>`
  //   );
  // });
};

const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
        from -90deg,
        ${prizes
          .map(
            ({ color }, i) =>
              `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`
          )
          .reverse()}
      );`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  // prizeNodes = wheel.querySelectorAll(".prize");
};

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  let rad = Math.atan2(b, a);

  if (rad < 0) rad += 2 * Math.PI;

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  if (currentSlice !== slice) {
    ticker.style.animation = "none";
    setTimeout(() => (ticker.style.animation = null), 10);
    currentSlice = slice;
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

const selectPrize = () => {
  const adjustedRotation = (rotation - 90 + 360) % 360;
  const selected = Math.floor(adjustedRotation / prizeSlice);
  // prizeNodes[selected].classList.add(selectedClass);
  zodiacTxt.innerText = prizes[selected].text;
  setTimeout(() => {
    Swal.fire({
      title:
        "<p style='color:white'>恭喜你! 获得了</br>" +
        prizes[selected].text +
        "¥ " +
        prizes[selected].price +
        "</p>",
      background: "linear-gradient(to bottom, #00e4a0, #007e9e)",
      color: "#fff",
      width: "400px",
      confirmButtonColor: "#fff",
      confirmButtonText:
        "<a href='https://www.mgvip35.com/pc2/#/home/index'><p style='color:#007e9e; margin: 0;padding: 0'>马上领取</p></a>",
      // text: "You clicked the button!",
      // icon: "success",
      customClass: { popup: "swal2-border-radius" },
    });
  }, 1000);

  //   reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;
};

trigger.addEventListener("click", () => {
  //   if (reaper.dataset.reaction !== "resting") {
  //     reaper.dataset.reaction = "resting";
  //   }
  trigger.disabled = true;
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  ticker.style.animation = "none";
  runTickerAnimation();
  // Text running interval setup
  let currentIndex = 0;
  let initialSpeed = 10; // Initial fast speed in ms (lower is faster)
  let maxSpeed = 300; // Slowest speed in ms (higher is slower)
  let speed = initialSpeed;
  let speedIncrement = 5; // Amount to increase delay each time
  let runningTextInterval;

  // Define a function to run the interval logic
  function updateText() {
    // Update the text and loop through prizes
    zodiacTxt.innerText = prizes[currentIndex].text;
    currentIndex = (currentIndex + 1) % prizes.length;

    // Check if we should continue slowing down
    if (speed < maxSpeed) {
      speed += speedIncrement; // Gradually slow down by increasing delay
    } else {
      // Stop the interval once we reach the maximum delay
      clearInterval(runningTextInterval);
    }

    // Clear and restart interval with updated speed
    clearInterval(runningTextInterval);
    runningTextInterval = setInterval(updateText, speed);
  }

  // Start the interval initially
  runningTextInterval = setInterval(updateText, speed);

  // Detect when spinning ends and stop the interval
  spinner.addEventListener("transitionend", () => {
    clearInterval(runningTextInterval); // Ensure interval stops when spinning ends
    trigger.disabled = false; // Re-enable the trigger
  });
});

spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  trigger.focus();
  rotation %= 360;
  selectPrize();
  wheel.classList.remove(spinClass);
  spinner.style.setProperty("--rotate", rotation);
});

setupWheel();
