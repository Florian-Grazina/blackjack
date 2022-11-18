const cardColor = ["Hearts","Spades","Diamond","Clubs"]
const cardId = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
const cardName = ["Ace","Two", "Tree", "Four", "Five", "Six",
    "Seven","Eight","Nine","Ten","Jack","Queen","King"];

const cards = cardId.concat(cardId).concat(cardId).concat(cardId);
let deck = cards.concat(cards).concat(cards).concat(cards);

export const Deck = {
    drawCard: () => {
        let cardIndex = Math.floor(Math.random()*deck.length);
        deck.splice(cardIndex,1);
        let x = deck[cardIndex] - 1;
        let colorIndex = Math.floor(Math.random()*4);

        return {
            color: cardColor[colorIndex],
            value: cardValue[x],
            id: cardId[x],
            name: cardName[x],
            path: "./Sprites/Cards/" + cardColor[colorIndex] + " " + cardId[x] + ".png"
        }
    },
    reset: () => {
        if (deck.length < cards.length*2) {
            deck = cards.concat(cards).concat(cards).concat(cards);
        }
    },
    greyCardPath: "./Sprites/Cards/Back Grey 1.png"
}