// document.addEventListener("keydown", function (event) {
    //     const element = document.querySelector(".cell_3");
    //     let row = parseInt(element.parentElement.getAttribute("data-row"));
    //     let col = parseInt(element.getAttribute("data-col"));
    
    //     switch (event.key) {
    //         case "ArrowLeft":
    //             moveLeft(row, col);
    //             break;
    //         case "ArrowRight":
    //             moveRight(row, col);
    //             break;
    //         case "ArrowUp":
    //             moveUp(row, col);
    //             break;
    //         case "ArrowDown":
    //             moveDown(row, col);
    //             break;
    //         default:
    //             return;
    //     }
    
    //     const newElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    //     if (newElement) {
    //         element.classList.remove("cell_3");
    //         newElement.classList.add("cell_3");
    //     }
    // });

    // function coordonneePersonnage() {
//     for (let i = 0; i < tableau.length; i++) {
//         for (let j = 0; j < tableau[i].length; j++) {
//             if (tableau[i][j] === 3) {
//                 x = i; // coordonnée de l'abscisse
//                 y = j; // coordonnée de l'ordonnée
//                 break;
//             }
//         }
//         return x, y
//     }
//     console.log("Coordonnées de l'élément 3 : (" + x + ", " + y + ")");
// }



// let frameCount = 0;


// deepCopyArray(Levels[0]).coordonneePersonnage(Levels[0])


function animate() {

    frameCount++;

    // Vérifier si le compteur est un multiple de 10
    if (frameCount % 10 === 0) {
        // Code à exécuter tous les 10 frames
    }

    // Planifier la prochaine animation frame
    requestAnimationFrame(animate);
}

// Démarrer l'animation
requestAnimationFrame(animate);




// Fonction pour gérer l'événement keydown
// 
