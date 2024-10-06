let names = [];
let winnerNames = [];
const result = document.getElementById('result');
const drawButton = document.getElementById('drawButton');
const updateButton = document.getElementById('updateButton');
const nameInput = document.getElementById('nameInput');

const settingBtn = document.getElementById('settingbtn');
const fullscreenBtn = document.getElementById('fullscreenbtn');

const settingscreen = document.getElementById('settingscreen');

function updateNames() {
    const inputText = nameInput.value.trim();
    names = inputText.split('\n').filter(name => name.trim() !== '');
    drawButton.disabled = names.length === 0;
    settingscreen.style.display = "none";
}

function getRandomIndex(){
    return Math.floor(Math.random() * names.length);
}

function getRandomName() {
    return names[getRandomIndex()];
}

function getFinalRandomName() {
    const randomIndex = getRandomIndex();
    const winner = names.splice(randomIndex, 1)[0];
    winnerNames.push(winner);
    displayListInTextbox(); // Delete Winner name in textbox by rewrite all array that left 
    return winner;
}

function animateDraw() {
    let duration = 3000; // 3 seconds
    let interval = 100; // 0.1 second
    let steps = duration / interval;
    let step = 0;

    const animation = setInterval(() => {
        result.innerHTML = `<span class="nameanimate">${getRandomName()}</span>`;
        step++;

        if (step >= steps) {
        clearInterval(animation);
        result.innerHTML = `<span class="name">${getFinalRandomName()}</span>`;
        drawButton.disabled = false;
        }
    }, interval);
}

updateButton.addEventListener('click', updateNames);

settingBtn.addEventListener('click', () => {
    settingscreen.style.display = "flex";
});

fullscreenBtn.onclick = (event) => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log("Document Exited from Full screen mode"))
        .catch((err) => console.error(err));
    } else {
      document.documentElement.requestFullscreen();
    }
  };

drawButton.addEventListener('click', () => {
    if (names.length > 0) {
        drawButton.disabled = true;
        result.innerHTML = '';
        animateDraw();
    } else {
        result.textContent = 'รบกวนกรอกชื่อด้วยครับ';
    }
});

function displayListInTextbox() {
    const text = names.join("\n");
    nameInput.value = text;
}

// Initialize
// updateNames();