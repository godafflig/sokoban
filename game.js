
import { levels } from "./level.js";

const gameBoard = document.getElementById("grid");
const PLAYER = 3
const BOX = 2
const WALL = 1
const EMPTY = 0
const BOXTARGET = 4

class Game {
    constructor() {
        this.level = new Level(0)
    }
    nextLevel() {
        this.level = new Level(this.level.levelnum + 1);
    }
}


class Level {

    constructor(levelnum) {
        this.levelnum = levelnum
        this.terrain = levels[levelnum]
        this.playerPosition = this.findPlayerStartPosition();


        addEventListener("keydown", (e) => {
            

            switch (e.key) {
                case "ArrowLeft":
                    // Left pressed
                    if (this.terrain[this.playerPosition.x][this.playerPosition.y - 1] == EMPTY) {
                        this.terrain[this.playerPosition.x][this.playerPosition.y] = EMPTY
                        this.terrain[this.playerPosition.x][this.playerPosition.y - 1] = PLAYER
                    }
                    break;
                case "ArrowRight":
                    // Right pressed
                    if (this.terrain[this.playerPosition.x][this.playerPosition.y + 1] == EMPTY) {
                        this.terrain[this.playerPosition.x][this.playerPosition.y] = EMPTY
                        this.terrain[this.playerPosition.x][this.playerPosition.y + 1] = PLAYER
                    }
                    break;
                case "ArrowUp":
                    // Up pressed
                    break;
                case "ArrowDown":
                    // Down pressed
                    break;
            }
        })
        requestAnimationFrame(this.draw)


    }
    findPlayerStartPosition() {
        for (let x = 0; x < this.terrain.length; x++) {
            for (let y = 0; y < this.terrain[x].length; y++) {
                if (this.terrain[x][y] === 3) {
                    return { x, y };
                }
            }
        }
    }

    draw() {
        gameBoard.innerHTML = " ";
        for (let x = 0; x < this.terrain.length; x++) {
            for (let y = 0; y < this.terrain[x].length; y++) {
                const valeur = this.terrain[x][y];
                const div = document.createElement("div");
                div.classList.add("cell");
                if (valeur !== 0) {
                    div.classList.add(`cell_${valeur}`)
                }
                gameBoard.appendChild(div);

            }
        }
    }
}

const game = new Game()

