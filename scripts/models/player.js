import {Deck} from "./deck.js";


let totalPlayer = 0;
let playerAce = 0;
let playerBj = false;

export const Player = {
    drawCard: () => {
        const drawnCard = Deck.drawCard();
        totalPlayer += drawnCard.value;
        if (drawnCard.name === "Ace"){
            playerAce++;
        }
        if (totalPlayer > 21 && playerAce > 0){
            totalPlayer -= 10;
            playerAce--;
        }

        let image = document.createElement("img"); // Cards show
        image.src = drawnCard.path
        image.className="cards";

        if (document.getElementById("playerCards").length === 0){
            document.getElementById("playerCards") = image;
        } else{
            document.getElementById("playerCards").appendChild(image);
        }
    },
    getTotal: () => { return totalPlayer; },
    getAce: () => { return playerAce; },
    hasBlackJack: () => { return playerBj; },
    reset: () => {
        totalPlayer = 0;
        playerAce = 0;
        playerBj = false;
    }
}