import { TimeUtils } from "../utils/time-utils.js";
import { Deck } from "./deck.js";


let totalDealer = 0;
let dealerAce = 0;
let dealerBj = false;

function drawFrame(a) {
    let dealer = document.getElementById("dealerSprite");
    dealer.src = "./Sprites/" + a + ".png";
    document.getElementById("dealerSprite").innerHTML = dealerSprite;
}

async function playAnimation() {
    drawFrame("Draw");
    await TimeUtils.sleep(300);
    drawFrame("Idle");
    await TimeUtils.sleep(300);
}

export const Dealer = {
    drawIdleFrame: () => drawFrame("Idle"),
    drawCard: async () => {
        const drawnCard = Deck.drawCard();
        totalDealer += drawnCard.value;
        if (drawnCard.name === "Ace") {
            dealerAce++;
        }

        if (totalDealer > 21 && dealerAce > 0) {
            totalDealer -= 10;
            dealerAce--;
        }

        let image = document.createElement("img"); // Cards show
        image.src = drawnCard.path;
        image.className = "cards";
        if (document.getElementById("dealerCards").length === 0) {
            document.getElementById("dealerCards") = image;
        } else {
            document.getElementById("dealerCards").appendChild(image);
        }
    },
    playAnimation: () => playAnimation(),
    getTotal: () => { return totalDealer; },
    hasBlackJack: () => { return dealerBj; },
    reset: () => {
        totalDealer = 0;
        dealerAce = 0;
        dealerBj = false;
    }
}