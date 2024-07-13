// SELETORES DO PRIMEIRO PIANO
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keysCheckbox = document.querySelector(".keys-checkbox input");
// SELETORES DO SEGUNDO PIANO
const keys = document.querySelectorAll('.key');
const checkbox = document.querySelector('.checkbox__keys');
const switcher = document.querySelector('.switcher');
const keysSection = document.querySelector('.piano__keys');
// VARIÁVEIS E CONSTANTES DO PRIMEIRO SCRIPT
let allKeys = [];
let audio = new Audio(`SRC/tunes/a.wav`);
// FUNÇÕES DO PRIMEIRO SCRIPT:
// TOCA A MELODIA CORRESPONDENTE À TECLA
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);}
// FUNÇÕES DO SEGUNDO SCRIPT
// TOCA A NOTA CORRESPONDENTE
const playNote = (note) => {
    const noteAudio = new Audio(`notes/notes_${note}.wav`);
    noteAudio.play();}
// MANIPULA O EVENTO DE PRESSIONAR O MOUSE SOBRE A TECLA
const handleMouseDown = (key) => {
    playNote(key.getAttribute('data-note'));

    if (key.className.includes('black')) {
        key.classList.add('black--pressed');
        return;}
    key.style.background = '#ddd';}
// MANIPULA O EVENTO DE SOLTAR O MOUSE SOBRE A TECLA
const handleMouseUp = (key) => {
    if (key.className.includes('black')) {
        key.classList.remove('black--pressed');
        return;
    }
   key.style.background = 'white';}
// ADICIONA TECLAS DO PRIMEIRO SCRIPT
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});
// AJUSTA O VOLUME DO ÁUDIO
const handleVolume = (e) => {
    audio.volume = e.target.value;}
// MOSTRA OU ESCONDE AS TECLAS
const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));}
// TOCA A MELODIA QUANDO UMA TECLA DO TECLADO É PRESSIONADA
const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);}
// MAPEADORES DE TECLAS DO SEGUNDO SCRIPT
const keyDownMapper = {
    "Tab": () => handleMouseDown(keys[0]),
    "1": () => handleMouseDown(keys[1]),
    "q": () => handleMouseDown(keys[2]),
    "2": () => handleMouseDown(keys[3]),
    "w": () => handleMouseDown(keys[4]),
    "e": () => handleMouseDown(keys[5]),
    "4": () => handleMouseDown(keys[6]),
    "r": () => handleMouseDown(keys[7]),
    "5": () => handleMouseDown(keys[8]),
    "t": () => handleMouseDown(keys[9]),
    "6": () => handleMouseDown(keys[10]),
    "y": () => handleMouseDown(keys[11]),
    "u": () => handleMouseDown(keys[12]),
    "8": () => handleMouseDown(keys[13]),
    "i": () => handleMouseDown(keys[14]),
    "9": () => handleMouseDown(keys[15]),
    "o": () => handleMouseDown(keys[16]),
    "p": () => handleMouseDown(keys[17]),
    "-": () => handleMouseDown(keys[18]),
    "[": () => handleMouseDown(keys[19]),
    "=": () => handleMouseDown(keys[20]),
    "]": () => handleMouseDown(keys[21]),
    "Backspace": () => handleMouseDown(keys[22]),
    "\\": () => handleMouseDown(keys[23]),}
const keyUpMapper = {
    "Tab": () => handleMouseUp(keys[0]),
    "1": () => handleMouseUp(keys[1]),
    "q": () => handleMouseUp(keys[2]),
    "2": () => handleMouseUp(keys[3]),
    "w": () => handleMouseUp(keys[4]),
    "e": () => handleMouseUp(keys[5]),
    "4": () => handleMouseUp(keys[6]),
    "r": () => handleMouseUp(keys[7]),
    "5": () => handleMouseUp(keys[8]),
    "t": () => handleMouseUp(keys[9]),
    "6": () => handleMouseUp(keys[10]),
    "y": () => handleMouseUp(keys[11]),
    "u": () => handleMouseUp(keys[12]),
    "8": () => handleMouseUp(keys[13]),
    "i": () => handleMouseUp(keys[14]),
    "9": () => handleMouseUp(keys[15]),
    "o": () => handleMouseUp(keys[16]),
    "p": () => handleMouseUp(keys[17]),
    "-": () => handleMouseUp(keys[18]),
    "[": () => handleMouseUp(keys[19]),
    "=": () => handleMouseUp(keys[20]),
    "]": () => handleMouseUp(keys[21]),
    "Backspace": () => handleMouseUp(keys[22]),
    "\\": () => handleMouseUp(keys[23]),}
// EVENT LISTENERS DO PRIMEIRO SCRIPT
if (keysCheckbox) {
    keysCheckbox.addEventListener("click", showHideKeys);}
if (volumeSlider) {
    volumeSlider.addEventListener("input", handleVolume);}
document.addEventListener("keydown", pressedKey);
// EVENT LISTENERS DO SEGUNDO SCRIPT
keys.forEach((key) => {
    key.addEventListener('mousedown', () => handleMouseDown(key));
    key.addEventListener('mouseup', () => handleMouseUp(key));
});
if (checkbox) {
    checkbox.addEventListener('change', ({ target }) => {
        if (target.checked) {
            switcher.classList.add('switcher--active');
            keysSection.classList.remove('disabled-keys');
            return;
        }
        switcher.classList.remove('switcher--active');
        keysSection.classList.add('disabled-keys');
    });}
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (keyDownMapper[event.key]) {
        keyDownMapper[event.key]();
    }
});
document.addEventListener('keyup', (event) => {
    if (keyUpMapper[event.key]) {
        keyUpMapper[event.key]();
    }
});