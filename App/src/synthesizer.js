
let noteFreq = null;
let buttons=[];
//let blackButtons=[];
let keyboard = document.getElementById('keyboard');

setup();

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
        buttons[i].innerHTML = 'WKey' + i;
        buttons[i].style.width = '125px';
        buttons[i].style.height = '300px';
    }

}

function setWhiteKeyProperties() {
    for (let i = 0; whiteButtons.length; i++) {
        whiteButtons[i].innerHTML = 'WKey' + i;
        whiteButtons[i].style.width = '125px';
        whiteButtons[i].style.height = '300px';
        whiteButtons[i].style.position='absolute';
    }
}

//Creates the black key buttons and appends them to the DOM
function createBlackKeys() {
    for(let i=0;i<2;i++){
        blackButtons[i]=document.createElement("button");
        keyboard.appendChild(blackButtons[i]);
        blackButtons[i].addEventListener("click",() => {
            alert("Something Happened");
        });
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
    createNoteTable();
    createKeys();
    // createWhiteKeys();
    // createBlackKeys();
    // setBlackKeyProperties();
    // setWhiteKeyProperties();

}
