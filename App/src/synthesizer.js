
let noteFreq = null;
let buttons=[];
let keyboard = document.getElementById('keyboard');
let pressedButtons = [];
let prevValues = []
let sendTimer = new Date();

setup();

function sendCurrentKeys()
{
    let noteData = 0;
    //console.log(pressedButtons);
    for(let i = 0; i < Math.min(pressedButtons.length, 4); i++)
    {
        let buttonValue = parseInt(pressedButtons[i].value, 16);
        noteData += buttonValue * Math.pow(256, i);
    }

    prevValues.push(noteData);
    if(prevValues.length > 5)
        prevValues.shift();

    let deltaTime = new Date().getTime() - sendTimer.getTime();
    let isSame = prevValues.every((val, i, arr) => val === arr[0]);
    if(!isSame && deltaTime > 150)
    {
        sendValue(noteData);
        sendTimer = new Date();
    }
}

function onPress(id)
{
    let btn = document.getElementById(id);
    pressedButtons.push(btn);
    console.log(pressedButtons);
}

function onRelease(id)
{
    let index = pressedButtons.findIndex(function(btn) { return btn.id === id });
    pressedButtons.splice(index, 1);
}

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
    setInterval(sendCurrentKeys, 50)
    //createNoteTable();
    //createKeys();
}
