const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const playBtn = document.getElementById("btn-play");
const pauseBtn = document.getElementById("btn-pause");
const stopBtn = document.getElementById("btn-stop");
var currentChar;
var speed = speedInput.value;

playBtn.addEventListener("click", () => {
    playText(textInput.value);
});

speedInput.addEventListener("input", () => {
    stopText();
    playText(utterance.text.substring(currentChar));
});

pauseBtn.addEventListener("click", () => {
    if (speechSynthesis.paused) {
        speechSynthesis.pause();
        pauseBtn.textContent = "Resume";
    } else {
        if (speechSynthesis.paused && speechSynthesis.speaking) {
            speechSynthesis.resume();
            pauseBtn.textContent = "Pause";
        }
    }
});

stopBtn.addEventListener("click", stopText);

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", () => {
    textInput.disable = false;
});
utterance.addEventListener("boundary", e => {
    currentChar = e.charIndex;
});

function playText(text) {
    if (speechSynthesis.speaking) return;

    utterance.text = text;
    utterance.rate = speedInput.value || 1;
    textInput.disable = true;
    speechSynthesis.speak(utterance);
}

function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
}
