// *---------- Page elements ----------*
const talkBtn = document.querySelector("#praat");
const talkInput = document.querySelector("#talkInput");
const toggleColorThemeBtn = document.querySelector('#veranderkleurtjes');

let alertBox;
let alertClone;

// *---------- Event listeners ----------*
talkBtn.addEventListener('click', playAudios);
talkInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    // Enter key
    if (event.keyCode === 13) {
        playAudios();
    }
});
toggleColorThemeBtn.addEventListener('click', toggleColorTheme);

// *---------- Other variables ----------*
let queue = [];

// *---------- Load preferences ----------*
if (localStorage.getItem("colorTheme") === "dark") {
    setDarkColorTheme();
} else {
    setLightColorTheme();
}

// *---------- Functions ----------*
function playAudios() {
    talkInput.classList.remove("is-invalid");

    // Fill queue with words, remove special characters and split at spaces
    let words = talkInput.value
        .replace(/[^a-z\d\s]+/gi, "")
        .split(" ");

    for (let word of words) {
        queue.push(word.toLowerCase());
    }
    playNext();
}

function playNext() {
    if (queue.length === 0) return;

    playSound(queue[0]);

    // Remove sound that was just played from queue
    queue.shift();
}

function playSound(word, retry = true) {
    let audio = new Audio(`https://commons.wikimedia.org/wiki/Special:FilePath/nl-${word}.ogg`);
    audio.play().catch(() => {
        if (retry) {
            console.log("Retry...");
            // Make first letter uppercase and retry
            word = word.charAt(0).toUpperCase() + word.slice(1);
            // We stop after one retry
            playSound(word, false);
        } else {
            console.log("Failed")
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

function toggleColorTheme() {
    // If dark mode is active
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
        // Set light color theme
        setLightColorTheme();

        // Store theme preference in local storage
        localStorage.setItem("colorTheme", "light");
    }
    // If light mode is active
    else {
        // Set dark color theme
        setDarkColorTheme();

        // Store theme preference in local storage
        localStorage.setItem("colorTheme", "dark");
    }
}

function setDarkColorTheme() {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    toggleColorThemeBtn.value = "Ik wil lichtere kleurtjes";
}

function setLightColorTheme() {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    toggleColorThemeBtn.value = "Ik wil donkere kleurtjes";
}