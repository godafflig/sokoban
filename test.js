let tableau = [
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 3, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 2, 2, 1, 0, 1, 1, 1, 0],
  [1, 0, 2, 0, 1, 0, 1, 4, 1, 0],
  [1, 1, 1, 0, 1, 1, 1, 4, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 4, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function decaleElementDroite(tableau, ligne, colonne) {
  if (colonne < tableau[ligne].length - 1) {
    let temp = tableau[ligne][colonne];
    tableau[ligne][colonne] = tableau[ligne][colonne + 1];
    tableau[ligne][colonne + 1] = temp;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "d") {
    decaleElementDroite(tableau, 1, 2);
    console.log(tableau);
  }
});