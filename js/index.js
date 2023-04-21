const talkBtn = document.querySelector("#praat");
const talkInput = document.querySelector("#talkInput");

talkBtn.addEventListener('click', playAudios);
talkInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.keyCode === 13) {
        playAudios();
    }
});

let queue = [];

function playAudios() {
    let values = talkInput.value.split(" ");
    for (let value of values) {
        queue.push(`https://commons.wikimedia.org/wiki/Special:FilePath/nl-${value}.ogg`);
    }
    console.log(queue);
    playAudio();
}
function playAudio() {
    if(queue.length === 0) return;
    let audio = new Audio(queue.shift());
    audio.play().catch((error) => {
        console.log("Mislukt...");
    });
    audio.onended = playAudio;
}