
let noteFreq = null;
let whiteButtons=[];
let blackButtons=[];
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
function setWhiteKeyProperties() {
    for (let i = 0; whiteButtons.length; i++) {
        whiteButtons[i].innerHTML = 'WKey' + i;
        whiteButtons[i].style.width = '125px';
        whiteButtons[i].style.height = '300px';
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
    }
}

function setup() {
    createNoteTable();
    createWhiteKeys();
    createBlackKeys();
    setBlackKeyProperties();
    setWhiteKeyProperties();

}









// function createKey() {
//     var Chapter = [0,1,2,3,4,5,6,7,8,9,10];
//     for(i = 0; i < 11; i++) {
//         var button = document.createElement("button");
//         button.innerHTML = Chapter[i];
//         button.className = "btn btn-outline-success";
//         var buttonDiv = document.getElementById("buttons");
//         buttonDiv.appendChild(button);
//     }
//     let buttonNum=[];
//     for(i=0;i<88;i++){
//         let button = document.createElement("button");
//         button.innerHTML=buttonNum[i];
//         button.className="btn btn-outline-success";
//         let buttonDiv = document.getElementById("buttons");
//         buttonDiv.appendChild(button);
//     }
// }
//document.body.addEventListener("load",createKey(),false);