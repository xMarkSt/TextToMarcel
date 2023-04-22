const talkBtn = document.querySelector("#praat");
const talkInput = document.querySelector("#talkInput");
let alertBox;
let alertClone;
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
    talkInput.classList.remove("is-invalid");

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
    audio.play().catch(() => {
        if(retry) {
            console.log("Retry...");
            // Make first letter uppercase and retry
            word = word.charAt(0).toUpperCase() + word.slice(1);
            // We stop after one retry
            playSound(word, false);
        } else {
            talkInput.classList.add("is-invalid");
            alertBox = document.querySelector("#alert");
            alertClone = alertBox.cloneNode(true);
            document.querySelector("#alert-container").appendChild(alertClone);

            // set text
            alertBox.children[0].textContent = word.toLowerCase();

            alertBox.classList.remove("d-none");
            alertBox.classList.add("show");
            playNext();
        }
    });
    // Play next audio
    audio.onended = playNext;
}

// Replace the alert with the clone
$('#alert').on('close.bs.alert', function () {
    alertBox = alertClone;
})