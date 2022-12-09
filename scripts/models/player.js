import {Deck} from "./deck.js";


let totalPlayer = 0;
let playerAce = 0;
let playerBj = false;
let numberOfCards = 0;

export const Player = {
    drawCard: () => {
        const drawnCard = Deck.drawCard();
        numberOfCards ++;
        totalPlayer += drawnCard.value;

        if (drawnCard.name === "Ace"){
            playerAce++;
        }

        if (totalPlayer > 21 && playerAce > 0){
            totalPlayer -= 10;
            playerAce--;
        }

        if(numberOfCards == 2 && totalPlayer == 21){
            playerBj = true;
        }

        let image = document.createElement("img"); // Cards show
        image.src = drawnCard.path
        image.className="cards";

        if (document.getElementById("player_cards").length === 0){
            document.getElementById("player_cards").innerHTML(image);
        } else{
            document.getElementById("player_cards").appendChild(image);
        }
    },
    getTotal: () => { return totalPlayer; },
    getAce: () => { return playerAce; },
    hasBlackJack: () => { return playerBj; },
    reset: () => {
        totalPlayer = 0;
        playerAce = 0;
        playerBj = false;
        numberOfCards = 0;
    }
}