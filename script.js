let names = [];
let winnerNames = [];

let prevRndIndex = -1;

const result = document.getElementById('result');
const drawButton = document.getElementById('drawButton');
const updateButton = document.getElementById('updateButton');
const nameInput = document.getElementById('nameInput');

const settingBtn = document.getElementById('settingbtn');
const fullscreenBtn = document.getElementById('fullscreenbtn');

const settingscreen = document.getElementById('settingscreen');
const closesettingbtn = document.getElementById('closesettingbtn');

function updateNames() {
    const inputText = nameInput.value.trim();
    names = inputText.split('\n').filter(name => name.trim() !== '');
    drawButton.disabled = names.length === 0;
    settingscreen.style.display = "none";
    closesettingbtn.style.display = "block";
}

function getRandomIndex(){
    let res;
    do {
        res = Math.floor(Math.random() * names.length);
    } while (prevRndIndex == res && names.length > 1);
    prevRndIndex = res; 
    return res;
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
    const totalDuration = 3000; // 3 seconds
    const startInterval = 50; // 0.05 seconds
    const endInterval = 500; // 0.5 seconds
    let elapsedTime = 0;
    let startTime = Date.now();

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function animationStep() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;

        if (elapsedTime < totalDuration) {
            result.innerHTML = `<span class="nameanimate">${getRandomName()}</span>`;

            const progress = elapsedTime / totalDuration;
            const easedProgress = easeOutQuad(progress);
            const currentInterval = startInterval + (endInterval - startInterval) * easedProgress;
            
            setTimeout(animationStep, currentInterval);
        } else {
            result.innerHTML = `<span class="name">${getFinalRandomName()}</span>`;
            drawButton.disabled = false;
        }
    }

    animationStep();
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

closesettingbtn.addEventListener('click', () => {
    settingscreen.style.display = "none";
});

function displayListInTextbox() {
    const text = names.join("\n");
    nameInput.value = text;
}

// Initialize
// updateNames();

// --- Aspect Ratio Functionality ---

const ar16x9Radio = document.getElementById('ar16x9');
const ar4x3Radio = document.getElementById('ar4x3');
const arResponsiveRadio = document.getElementById('arResponsive');

const aspectRatioRadios = [ar16x9Radio, ar4x3Radio, arResponsiveRadio];
const aspectRatioClasses = ['aspect-16x9', 'aspect-4x3', 'aspect-responsive'];

function updateAspectRatio(selectedValue) {
    // Remove all existing aspect ratio classes from body
    document.body.classList.remove(...aspectRatioClasses);

    // Add the new class based on selected value
    if (selectedValue === '16:9') {
        document.body.classList.add('aspect-16x9');
    } else if (selectedValue === '4:3') {
        document.body.classList.add('aspect-4x3');
    } else { // Default to responsive
        document.body.classList.add('aspect-responsive');
    }

    // Save preference to localStorage
    localStorage.setItem('screenAspectRatio', selectedValue);
}

function applySavedAspectRatio() {
    const savedAspectRatio = localStorage.getItem('screenAspectRatio');
    let currentRadio;

    if (savedAspectRatio) {
        updateAspectRatio(savedAspectRatio); // Apply the class to body
        // Check the correct radio button
        if (savedAspectRatio === '16:9') {
            currentRadio = ar16x9Radio;
        } else if (savedAspectRatio === '4:3') {
            currentRadio = ar4x3Radio;
        } else {
            currentRadio = arResponsiveRadio;
        }
    } else {
        updateAspectRatio('responsive'); // Default to responsive
        currentRadio = arResponsiveRadio;
    }
    
    if (currentRadio) {
        currentRadio.checked = true;
    }
}

// Add event listeners to radio buttons
aspectRatioRadios.forEach(radio => {
    if (radio) { // Ensure radio button exists before adding listener
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateAspectRatio(this.value);
            }
        });
    }
});

// Apply saved or default aspect ratio on page load
applySavedAspectRatio();