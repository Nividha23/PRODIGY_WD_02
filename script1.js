let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapTimes = document.getElementById('lapTimes');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    difference = 0;
    displayTime(0, 0, 0);
    lapTimes.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        lapTimes.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = savedTime ? updatedTime - startTime + savedTime : updatedTime - startTime;
    const milliseconds = Math.floor(difference % 1000 / 10);
    const seconds = Math.floor(difference / 1000 % 60);
    const minutes = Math.floor(difference / (1000 * 60) % 60);
    displayTime(minutes, seconds, milliseconds);
}

function displayTime(minutes, seconds, milliseconds) {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
