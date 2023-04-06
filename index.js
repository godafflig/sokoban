/**
 * You wan modify thes constants as you want or get rid of it, your choice
 * */
import { Levels } from "./level.js";



const gameBoard = document.getElementById("grid");
const personnage = document.querySelector("cell_3")

for (let i = 0; i < Levels[0].length; i++) {
    const ligne = Levels[0][i];
    for (let j = 0; j < ligne.length; j++) {
        const valeur = ligne[j];
        const div = document.createElement("div");
        div.classList.add("cell");
        if (valeur !== 0) {
            div.classList.add(`cell_${valeur}`)
        }
        gameBoard.appendChild(div);
    }
}

personnage.addEventListener("onchange", () => {
console
})


const haut = 38;
const bas = 40;
const droite = 39;
const gauche = 37;




