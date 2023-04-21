import Crunker from './crunker.esm.js';

const talkBtn = document.querySelector("#praat");
const talkInput = document.querySelector("#talkInput");
let crunker = new Crunker();

talkBtn.addEventListener('click', playAudio);
talkInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.keyCode === 13) {
        playAudio();
    }
});

function playAudio() {
    let url = `https://commons.wikimedia.org/wiki/Special:FilePath/nl-${talkInput.value}.ogg`;
    let soep = "https://commons.wikimedia.org/wiki/Special:FilePath/nl-soep.ogg";
    let kip = "https://commons.wikimedia.org/wiki/Special:FilePath/nl-kip.ogg";
    crunker.fetchAudio(soep, kip)
        .then((buffers) => crunker.mergeAudio(buffers))
        .then((merged) => crunker.export(merged, 'audio/mp3'))
        .then((output) => crunker.play(output.blob))
        .catch((error) => {
            throw new Error(error);
        });
}