import { TimeUtils } from "../utils/time-utils.js";
import { Deck } from "./deck.js";


let totalDealer = 0;
let dealerAce = 0;
let dealerBj = false;
let numberOfCards = 0;
let gameSpeed;

function drawFrame(a) {
    let dealer = document.getElementById("dealer_sprite");
    dealer.src = "../Sprites/" + a + ".png";
    document.getElementById("dealer_sprite").innerHTML = dealer;
}

async function playAnimation() {
    gameSpeed = Math.abs(document.querySelector("#game_speed").value)
    drawFrame("Draw");
    await TimeUtils.sleep(gameSpeed);
    drawFrame("Idle");
    await TimeUtils.sleep(gameSpeed);
}

export const Dealer = {
    drawIdleFrame: () => drawFrame("Idle"),
    drawCard: async () => {
        const drawnCard = Deck.drawCard();
        numberOfCards ++;
        totalDealer += drawnCard.value;
        if (drawnCard.name === "Ace") {
            dealerAce++;
        }

        if (totalDealer > 21 && dealerAce > 0) {
            totalDealer -= 10;
            dealerAce--;
        }

        if(numberOfCards == 2 && totalDealer == 21){
            dealerBj = true;
        }

        let image = document.createElement("img"); // Cards show
        image.src = drawnCard.path;
        image.className = "cards";
        if (document.getElementById("dealer_cards").length === 0) {
            document.getElementById("dealer_cards").innerHTML = image;
        } else {
            document.getElementById("dealer_cards").appendChild(image);
        }
    },
    playAnimation: () => playAnimation(),
    getTotal: () => { return totalDealer; },
    getAce: () => {return dealerAce},
    hasBlackJack: () => { return dealerBj; },
    reset: () => {
        totalDealer = 0;
        dealerAce = 0;
        dealerBj = false;
        numberOfCards = 0;
    }
}