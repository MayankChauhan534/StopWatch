let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];
let lapTime;

const display = document.getElementById("display");
const lapList = document.getElementById("laps");

function updateTimer() {
  const time = Date.now() - startTime + elapsedTime;
  const ms = parseInt((time % 1000) / 10);
  const sec = parseInt((time / 1000) % 60);
  const min = parseInt((time / (1000 * 60)) % 60);
  display.textContent = `${format(min)}:${format(sec)}:${format(ms)}`;
}

function format(number) {
  return number < 10 ? "0" + number : number;
}

document.getElementById("start/pause").addEventListener("click", () => {
  if (!isRunning) {
    document.getElementById("start/pause").textContent = "Pause";
    document.getElementById("lap/reset").textContent = "Lap";
    startTime = Date.now();
    timer = setInterval(updateTimer, 10);
    isRunning = true;
  } else if (isRunning) {
    document.getElementById("start/pause").textContent = "Start";
    document.getElementById("lap/reset").textContent = "Reset";
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
    isRunning = false;
  }
});

document.getElementById("lap/reset").addEventListener("click", () => {
  if (isRunning) {
    lapTime = Date.now() - startTime + elapsedTime;
    laps.push(lapTime);
    let li = document.createElement("li");
    li.textContent = display.textContent;
    lapList.appendChild(li);
  } else if (!isRunning) {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapList.innerHTML = "";
    laps = [];
  }
});
