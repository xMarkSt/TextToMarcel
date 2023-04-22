const talkBtn = document.querySelector("#praat");
const talkInput = document.querySelector("#talkInput");

talkBtn.addEventListener('click', playAudios);
talkInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    // Enter key
    if(event.keyCode === 13) {
        playAudios();
    }
});

let queue = [];

function playAudios() {
    // Fill queue with words
    let words = talkInput.value.split(" ");
    for (let word of words) {
        queue.push(word.toLowerCase());
    }
    playNext();
}
function playNext() {
    if(queue.length === 0) return;

    playSound(queue[0]);

    // Remove sound that was just played from queue
    queue.shift();
}

function playSound(word, retry = true) {
    let audio = new Audio(`https://commons.wikimedia.org/wiki/Special:FilePath/nl-${word}.ogg`);
    audio.play().catch((error) => {
        if(retry) {
            console.log("Retry...");
            // Make first letter uppercase and retry
            word = word.charAt(0).toUpperCase() + word.slice(1);
            // We stop after one retry
            playSound(word, false);
        }
    });

    // Play next audio
    audio.onended = playNext;
}