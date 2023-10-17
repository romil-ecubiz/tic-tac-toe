// audio
let bgMusic = new Audio("assets/music.mp3");
// function playBackgroundMusic() {
//   bgMusic.play();
// }
// window.addEventListener('load', playBackgroundMusic);

let clickMusic = new Audio("assets/ting.mp3");
let goMusic = new Audio("assets/gameover.mp3");

let gameOver = false;

// function to change the turn
let turn = "X";
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// function to check for a win
const checkWin = () => {
  let boxText = document.getElementsByClassName("boxText");
  //console.log(boxText)

  let wins = [
    [0, 1, 2, 32, -25, 90], // here 3=x 4=y and 5=rotate deg
    [3, 4, 5, 32, 0, 90],
    [6, 7, 8, 32, 25, 90], // horizontal possibilities

    [0, 3, 6, 10, 0, 0],
    [1, 4, 7, 31, 0, 0],
    [2, 5, 8, 52, 0, 0], // vertical possibilities

    [2, 4, 6, 30, 0, 44],
    [0, 4, 8, 30, 0, -44], // cross possibilities
  ];

  wins.forEach( (e) => {
    if (
      boxText[e[0]].innerText === boxText[e[1]].innerText &&
      boxText[e[2]].innerText === boxText[e[1]].innerText &&
      boxText[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = boxText[e[0]].innerText + " : YoU WON !!";
      gameOver = true;

      document.querySelector(".line").classList.remove("hidden");
      document.querySelector(".line").style.transform = `translate(${e[3]}vh, ${e[4]}vh) rotate(${e[5]}deg)`;
    }
  });
};


// game logic
let Boxes = document.getElementsByClassName("box");

Array.from(Boxes).forEach((element) => {
  let boxText = element.querySelector(".boxText");

  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn();

      clickMusic.play();

      checkWin();

      if (!gameOver) {
        document.getElementsByClassName("info")[0].innerText = "Turn for : " + turn;
      } 
      else {
        document.getElementById("winImg").classList.remove("hidden");
        goMusic.play();
      }

    }
  });
});


// add on:click listener to reset
let reset = document.getElementById("reset");

reset.addEventListener('click', ()=>{
    let boxes = document.querySelectorAll(".boxText");
    
    Array.from(boxes).forEach(element => {
        element.innerText = '';
    })

    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for : " + turn;
    document.getElementById("winImg").classList.add("hidden");
    document.querySelector(".line").classList.add("hidden");
})
