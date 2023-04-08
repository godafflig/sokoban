import { levels } from "./levels.js";

const grid = document.getElementById("grid");
const winBtn = document.getElementById("winbtn");
const winTitle = document.getElementById("win");
const counterMove = document.getElementById("counter");


const EMPTY = 0;
const WALL = 1;
const BOX = 2;
const PLAYER = 3;
const GOAL = 4;
const BOXONGOAL = 5;
const PLAYERONGOAL = 6;

let playerDir = { row: 0, col: 0 };
let playerPos = { row: 0, col: 0 };
let rAF = null;
let terrain = null;
let levelNum = 0;
let counter = 0

document.addEventListener("keydown", function (e) {
  // effectue une zction lors es evenement keydown
  playerDir = { row: 0, col: 0 }; // le personnage ne bouge pas temps que une touche n'est ps presse

  switch (e.key) {
    case "ArrowLeft":
      playerDir.col = -1; //assignzation des valeur pour bouger le personnage
      break;
    case "ArrowRight":
      playerDir.col = 1; //assignzation des valeur pour bouger le personnage
      break;
    case "ArrowUp":
      playerDir.row = -1; //assignzation des valeur pour bouger le personnage
      break;
    case "ArrowDown":
      playerDir.row = 1; //assignzation des valeur pour bouger le personnage
      break;
    case "r":
    case "R":
      counter = 0
      if (initLevel()) {
        rAF = requestAnimationFrame(gameLoop);
      }
      break;
  }
});

function deepCopyArray(x) {
  return JSON.parse(JSON.stringify(x));
}

function initLevel() {
  // fonction appeler a chaque debut de level
  winTitle.textContent = ""; //affichage du message si la partie est gagne
  winBtn.disabled = true; // affichage du button win si true avec la classe css
  const levelTitle = document.getElementById("level"); // modifie le contenue de level
  levelTitle.textContent = `Level ${levelNum}`; //
  terrain = deepCopyArray(levels[levelNum]);
  let boxNum = 0
  for (let i = 0; i < terrain.length; i++) {
    // trouver la position de depart du joueur
    for (let j = 0; j < terrain[i].length; j++) {
      if (terrain[i][j] === PLAYER || terrain[i][j] === PLAYERONGOAL) {
        playerPos = { row: i, col: j }; // position du joueur

      }
      else if (terrain[i][j] == BOXONGOAL || terrain[i][j] == BOX) {
        boxNum++
      }
    }
  }
  draw();
  if (boxNum === 0) {
    return false
  }
  return true
}

function move(startPos, endPos) {

  const startCell = terrain[startPos.row][startPos.col]; //position de depart qui change vers la position d'arriver
  const endCell = terrain[endPos.row][endPos.col]; //position d'arriver
  const isPlayer = startCell === PLAYER || startCell === PLAYERONGOAL; // verifie si la case a deplacer est un joueur

  counter++
  switch (startCell) {
    case PLAYER:
    case BOX:
      terrain[startPos.row][startPos.col] = EMPTY; // verifie si le joueur est ongoal
      break;

    case PLAYERONGOAL:
    case BOXONGOAL:
      terrain[startPos.row][startPos.col] = GOAL; // update la case de deppart
      break;
  }

  switch (endCell) {
    case EMPTY:
      terrain[endPos.row][endPos.col] = isPlayer ? PLAYER : BOX; // si la case d arriver est empty on la remplacer par le joueur ou la boxe selon is players
      break;

    case GOAL:
      terrain[endPos.row][endPos.col] = isPlayer ? PLAYERONGOAL : BOXONGOAL; // si la case d arriver est empty on la remplacer par boxongoal ou playerongoal
      break;
  }
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var offset = 0;
var context = new AudioContext();

function playTrack(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  var audiobuffer;

  // Decode asynchronously
  request.onload = function() {

    if (request.status == 200) {

      context.decodeAudioData(request.response, function(buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        console.log('context.currentTime ' + context.currentTime);

        if (offset == 0) {
          source.start();
          offset = context.currentTime;
        } else {
          source.start(0,context.currentTime - offset);
        }

      }, function(e) {
        console.log('Error decoding audio data:' + e);
      });
    } else {
      console.log('Audio didn\'t load successfully; error code:' + request.statusText);
    }
  }
  request.send();
}

var tracks = document.getElementsByClassName('track');

for (var i = 0, len = tracks.length; i < len; i++) {
  tracks[i].addEventListener('click', function(e){

    playTrack(this.href);
    e.preventDefault();
  });
}

function checkWin() {
  // fonction qui verifie si j'ai gagne ou pas
  let tempWin = true; //
  for (let x = 0; x < terrain.length; x++) {
    // boucle sur tableau
    for (let y = 0; y < terrain[x].length; y++) {
      if (terrain[x][y] === BOX) {
        tempWin = false; //si tu ca ne rentre dans aucune condition alors on n'a gagné
      }
    }
  }
  if (tempWin) {
    cancelAnimationFrame(rAF); // on supprime l'animation
    winTitle.textContent = `You won level ${levelNum}`; // titre de victoire
    winBtn.disabled = false; // pour reafficher le bouton nextlevel
  }
}

function draw() {
  // Reset la grid
  grid.innerHTML = "";
  counterMove.textContent = `counter: ${counter}`
  for (let x = 0; x < terrain.length; x++) {
    for (let y = 0; y < terrain[x].length; y++) {
      const div = document.createElement("div");
      switch (terrain[x][y]) {
        case EMPTY:
          div.className = "empty";
          break;
        case WALL: // cet ligne est egale a case 1 car WALL  = &
          div.className = "wall";
          break;
        case BOX:
          div.className = "box";
          break;
        case PLAYER:
          div.className = "player";
          break;
        case GOAL:
          div.className = "goal";
          break;
        case BOXONGOAL:
          div.className = "boxongoal";
          break;
        case PLAYERONGOAL:
          div.className = "playerongoal";
          break;
      }
      grid.appendChild(div);
    }
  }
}

function gameLoop() {
  rAF = requestAnimationFrame(gameLoop);
  const row = playerPos.row + playerDir.row; //position du joueur  plus la case vers on veut aller c
  const col = playerPos.col + playerDir.col;
  const cell = terrain[row][col]; // la case ou on doit aller

  switch (cell) {
    // allow the player to move into empty or goal cells
    case EMPTY:
    case GOAL:
      move(playerPos, { row, col }); // prend en param la case du depart  et param 2 qui est la case d'arriver

      playerPos.row = row; // mise a jour de la nouvelle position apres son deplacement
      playerPos.col = col;
      break;

    // don't allow the player to move into a wall cell
    case WALL:
      break;

    // only allow the player to move into a block cell if the cell
    // after the block is empty or a goal
    case BOX:
    case BOXONGOAL:
      const nextRow = row + playerDir.row;
      const nextCol = col + playerDir.col;
      const nextCell = terrain[nextRow][nextCol];

      if (nextCell === EMPTY || nextCell === GOAL) {
        //
        // move the block first, then the player
        move({ row, col }, { row: nextRow, col: nextCol });
        move(playerPos, { row, col });

        playerPos.row = row;
        playerPos.col = col;
      }
      break;
  }
  playerDir = { row: 0, col: 0 };
  draw();
  checkWin();
}

winBtn.onclick = () => {
  levelNum += 1;

  if (initLevel()) {
    rAF = requestAnimationFrame(gameLoop);
  }
};

const nybtn = document.getElementById("nyan")
nybtn.onclick = () => {
  const csslink = document.getElementById('csslink')
  csslink.href = "nyan.css"
}



if (initLevel()) {

  rAF = requestAnimationFrame(gameLoop);
}
