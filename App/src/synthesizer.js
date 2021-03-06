$(document).ready(function () {

    $('.first-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });
});

let noteFreq = null;
let buttons=[];
let keyboard = document.getElementById('keyboard');
let pressedButtons = [];
let prevValues = [];

setup();

function sendCurrentKeys()
{
    let noteData = 0;
    console.log(pressedButtons);
    for(let i = 0; i < pressedButtons.length; i++)
    {
        let buttonValue = parseInt(pressedButtons[i].value, 16);
        noteData += buttonValue * Math.pow(256, i);
    }

    prevValues.push(noteData);
    if(prevValues.length > 3)
        prevValues.shift();

    let isSame = prevValues.every((val, i, arr) => val === arr[0]);
    if(!isSame)
    {
        sendValue(noteData);
    }
}

function onPress(id)
{
    let btn = document.getElementById(id);
    pressedButtons.push(btn);
    if(pressedButtons.length > 4)
        pressedButtons.shift();

    removeDuplicates(pressedButtons);
}

function onRelease(id)
{
    let index = pressedButtons.findIndex(function(btn) { return btn.id === id });
    pressedButtons.splice(index, 1);

    removeDuplicates(pressedButtons);
}

function removeDuplicates(array) {
    array.splice(0, array.length, ...(new Set(array)))
};

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyQ')
        onPress("C4");
    if (event.code == 'Digit2')
        onPress("Db4");
    if (event.code == 'KeyW')
        onPress("D4");
    if (event.code == 'Digit3')
        onPress("Eb4");
    if (event.code == 'KeyE')
        onPress("E4");
    if (event.code == 'KeyR')
        onPress("F4");
    if (event.code == 'Digit5')
        onPress("Gb4");
    if (event.code == 'KeyT')
        onPress("G4");
    if (event.code == 'Digit6')
        onPress("Ab4");
    if (event.code == 'KeyY')
        onPress("A4");
    if (event.code == 'Digit7')
        onPress("Bb4");
    if (event.code == 'KeyU')
        onPress("B4");
    if (event.code == 'KeyZ')
        onPress("C5");
    if (event.code == 'KeyS')
        onPress("Db5");
    if (event.code == 'KeyX')
        onPress("D5");
    if (event.code == 'KeyD')
        onPress("Eb5");
    if (event.code == 'KeyC')
        onPress("E5");
    if (event.code == 'KeyV')
        onPress("F5");
    if (event.code == 'KeyG')
        onPress("Gb5");
    if (event.code == 'KeyB')
        onPress("G5");
    if (event.code == 'KeyH')
        onPress("Ab5");
    if (event.code == 'KeyN')
        onPress("A5");
    if (event.code == 'KeyJ')
        onPress("Bb5");
    if (event.code == 'KeyM')
        onPress("B5");
    if (event.code == 'Comma')
        onPress("C6");
    if (event.code == 'KeyL')
        onPress("Db6");
    if (event.code == 'Period')
        onPress("D6");
});

document.addEventListener('keyup', function(event) {

    if (event.code == 'KeyQ')
        onRelease("C4");
    if (event.code == 'Digit2')
        onRelease("Db4");
    if (event.code == 'KeyW')
        onRelease("D4");
    if (event.code == 'Digit3')
        onRelease("Eb4");
    if (event.code == 'KeyE')
        onRelease("E4");
    if (event.code == 'KeyR')
        onRelease("F4");
    if (event.code == 'Digit5')
        onRelease("Gb4");
    if (event.code == 'KeyT')
        onRelease("G4");
    if (event.code == 'Digit6')
        onRelease("Ab4");
    if (event.code == 'KeyY')
        onRelease("A4");
    if (event.code == 'Digit7')
        onRelease("Bb4");
    if (event.code == 'KeyU')
        onRelease("B4");
    if (event.code == 'KeyZ')
        onRelease("C5");
    if (event.code == 'KeyS')
        onRelease("Db5");
    if (event.code == 'KeyX')
        onRelease("D5");
    if (event.code == 'KeyD')
        onRelease("Eb5");
    if (event.code == 'KeyC')
        onRelease("E5");
    if (event.code == 'KeyV')
        onRelease("F5");
    if (event.code == 'KeyG')
        onRelease("Gb5");
    if (event.code == 'KeyB')
        onRelease("G5");
    if (event.code == 'KeyH')
        onRelease("Ab5");
    if (event.code == 'KeyN')
        onRelease("A5");
    if (event.code == 'KeyJ')
        onRelease("Bb5");
    if (event.code == 'KeyM')
        onRelease("B5");
    if (event.code == 'Comma')
        onRelease("C6");
    if (event.code == 'KeyL')
        onRelease("Db6");
    if (event.code == 'Period')
        onRelease("D6");
});


function setup() {
    setInterval(sendCurrentKeys, 100);
}
