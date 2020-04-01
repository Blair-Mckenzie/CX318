
let noteFreq = null;
let buttons=[];
let keyboard = document.getElementById('keyboard');
let pressedButtons = [];
let prevValues = [];

setup();

function sendCurrentKeys()
{
    let noteData = 0;
    //console.log(pressedButtons);
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
    if (event.code == 'KeyA')
        onPress("A0");
    if (event.code == 'KeyS')
        onPress("B0");
    if (event.code == 'KeyD')
        onPress("C1");
    if (event.code == 'KeyF')
        onPress("D1");
    if (event.code == 'KeyG')
        onPress("E1");
    if (event.code == 'KeyH')
        onPress("F1");
    if (event.code == 'KeyJ')
        onPress("G1");
    if (event.code == 'KeyK')
        onPress("A1");
    if (event.code == 'KeyL')
        onPress("B1");
});

document.addEventListener('keyup', function(event) {
    if (event.code == 'KeyA')
        onRelease("A0");
    if (event.code == 'KeyS')
        onRelease("B0");
    if (event.code == 'KeyD')
        onRelease("C1");
    if (event.code == 'KeyF')
        onRelease("D1");
    if (event.code == 'KeyG')
        onRelease("E1");
    if (event.code == 'KeyH')
        onRelease("F1");
    if (event.code == 'KeyJ')
        onRelease("G1");
    if (event.code == 'KeyK')
        onRelease("A1");
    if (event.code == 'KeyL')
        onRelease("B1");
});


function setup() {
    setInterval(sendCurrentKeys, 100);
}
