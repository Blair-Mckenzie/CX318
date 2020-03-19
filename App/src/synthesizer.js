
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

//Assigns the frequency from note 1 to 88
function createNoteTable() {
let noteFreq =[];
for (let i=1;i<89;i++){
    noteFreq[i]=440*Math.pow(2,(i-49)/12);
    console.log(noteFreq[i]);
}
return noteFreq;
}

//Creates the white key buttons and appends them to the DOM
function createWhiteKeys(){
    for(let i=0;i<10;i++){
        whiteButtons[i]=document.createElement("button");
        keyboard.appendChild(whiteButtons[i]);
        whiteButtons[i].addEventListener("click",() => {
            alert("Something Happened");
        });
    }
}

function createKeys(){
    for(let i=0;i<88;i++){
        buttons[i]=document.createElement("button");
        keyboard.appendChild(buttons[i]);
        buttons[i].addEventListener("click",() => {
            alert("Something Happened");
        });
    }
    for(let i=0;i<buttons.length;i++){
        buttons[i].innerHTML = 'Key' + i;
        buttons[i].style.width = '125px';
        buttons[i].style.height = '300px';
        buttons[i].style.backgroundColor='white';
        //buttons[i+1].style.width = '62px';
        buttons[i+1].style.zIndex ='1';
        buttons[i+1].style.backgroundColor='black';
        buttons[i+1].style.height = '150px';

    }

}

function setBlackKeyProperties() {
    for(let i=0;i<blackButtons.length;i++){
        blackButtons[i].innerHTML='BKey'+i;
        blackButtons[i].style.color="white";
        blackButtons[i].style.width='62.5px';
        blackButtons[i].style.height='150px';
        blackButtons[i].style.backgroundColor='black';
        blackButtons[i].style.borderColor='black';
        blackButtons[i].style.position='relative';
        blackButtons[i].style.zIndex="1";
    }
}

function setup() {
    setInterval(sendCurrentKeys, 100)
    //createNoteTable();
    //createKeys();
}
