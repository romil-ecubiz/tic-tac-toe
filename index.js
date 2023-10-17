// reset all the display
function fullReset(){
    let boxes = document.querySelectorAll(".boxText");
    boxes.forEach( e => {
        e.textContent = ""; //you can type any parameter name
    });

    document.getElementsByClassName("info")[0].innerText = "You Just RESET the Game !!";
    document.getElementById("winImg").classList.add("hidden");
}

// audio
let bgMusic = new Audio("assets/music.mp3");
let clickMusic = new Audio("assets/ting.mp3");
let goMusic = new Audio("assets/gameover.mp3");

let gameOver = false;

// function to change the turn
let turn = "X";
const changeTurn = ()=>{
    return turn === "X" ? "O" : "X" ;
}

// function to check for a win
const checkWin = ()=>{
    let boxText = document.getElementsByClassName("boxText");

    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],// horizontal possibilities

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],// vertical possibilities

        [0, 4, 8],// cross possibilities
        [2, 4, 6],
    ]

    wins.forEach((e)=>{
        if( (boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText !== '')){
            document.querySelector(".info").innerText = boxText[e[0]].innerText + " : YoU WON !!"
            gameOver = true;
        }
    })
}

// game logic

let Boxes = document.getElementsByClassName("box");
Array.from(Boxes).forEach(element => {
    let boxText = element.querySelector(".boxText");
    bgMusic.play();

    element.addEventListener('click', ()=>{
        if(boxText.innerText === ''){
            boxText.innerText = turn;
            turn = changeTurn();
            
            clickMusic.play();

            checkWin();

            if(!gameOver){
                document.getElementsByClassName("info")[0].innerText = "Turn for : " + turn;   
            }else{
                document.getElementById("winImg").classList.remove("hidden");
                goMusic.play();
            }
        }
    })

})

