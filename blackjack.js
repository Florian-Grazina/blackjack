//  Pick up buttons in HTML

var btnBet = document.getElementById("bet");
btnBet.addEventListener ("click", betCheck);

var btnHit = document.getElementById("btnHit");
btnHit.addEventListener ("click", hit);
btnHit.disabled = true;

var btnStand = document.getElementById("btnStand");
btnStand.addEventListener ("click", stand);
btnStand.disabled = true;

var btnDouble = document.getElementById("btnDouble");
btnDouble.addEventListener ("click", double);
btnDouble.disabled = true;

// Shortcuts keyboard
document.onkeydown = function(e){
    switch(e.keyCode) {
        case 72:
            if (btnHit.disabled == false){
                hit();
            } else {
                return;
            }
            break;
        case 83:
            if (btnStand.disabled == false){
                stand();
            } else {
                return;
            }
            break;
        case 68:
            if (btnDouble.disabled == false){
                double();
            } else {
                return;
            }
            break;
        case 13:
            if (btnBet.disabled == false){
                betCheck();
            } else {
                return;
            }
            break;
    }
}

// Draw cards

function drawCards(){
image = document.createElement("img"); // Cards show
image.src = "./Small/Back Grey 1.png";
document.getElementById("dealerCards").appendChild(image);

image = document.createElement("img"); // Cards show
image.src = "./Small/Back Grey 1.png";
document.getElementById("playerCards").appendChild(image);
}

// Setup game

function sleep(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        },wait);
    });
}

var bet;
var wait = 500;
var result = "..."
var action = "Place your bet!"

var chips = 100;
var totalPlayer = 0;
var playerAce = 0;
var playerBj = false;
// var playerCards = ""

var totalDealer = 0;
var dealerAce = 0;
var dealerBj = false;
// var dealerCards = ""

drawCards();
show();

// Setup deck of cards
const color = ["Hearts","Spades","Diamond","Clubs"]
const cardId = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
const cardName = ["Ace","Two", "Tree", "Four", "Five", "Six",
"Seven","Eight","Nine","Ten","Jack","Queen","King"];

var cards = cardId.concat(cardId).concat(cardId).concat(cardId);
var deck = cards.concat(cards).concat(cards).concat(cards)

// Blackjack
function betCheck() {
    bet = document.getElementById("betAmount").valueAsNumber;

    if (bet === 0){
        window.alert("Please put a bet amount");
    }
    else if (bet > chips){
        window.alert("You don't have enough chips!");
    }
    else if (bet < 0){
        window.alert("Please put a correct amount");
    }
    else{
        startGame();
    }
}

// Start the game
async function startGame(){
    btnBet.disabled = true;
    betAmount.disabled = true;
    action = "No more bets";
    result = "...";
    show();
    document.getElementById("dealerCards").innerHTML = "";
    document.getElementById("playerCards").innerHTML = "";
    drawCards();
    await sleep();
    document.getElementById("playerCards").innerHTML = "";
    drawCardPlayer();
    await sleep();
    document.getElementById("dealerCards").innerHTML = "";
    drawCardDealer();
    await sleep();
    drawCardPlayer();
    await sleep();
    chips -= bet;
    btnStand.disabled = false;
    btnHit.disabled = false;
    btnDouble.disabled = false;

    if (totalPlayer == 21){
        playerBj = true;
        btnHit.disabled = true;
        btnDouble.disabled = true;
        result = "Blackjack!"
        show();
    }   
}

// Draw player
function drawCardPlayer() {
    let i = Math.floor(Math.random()*deck.length);
    let x = deck[i]-1;
    totalPlayer += cardValue[x];
    deck.splice (i,1);
    if (cardId[x] == 1){
        playerAce++;
    }

    if (totalPlayer > 21 && playerAce > 0){
    totalPlayer -= 10;
    playerAce--;
    }

    i = Math.floor(Math.random()*4); // Color random

    image = document.createElement("img"); // Cards show
    image.src = "./Small/"+color[i]+" "+cardId[x]+".png";
    document.getElementById("playerCards").appendChild(image);

    show();
}

// Draw dealer
function drawCardDealer() {
    let i = Math.floor(Math.random()*deck.length);
    let x = deck[i]-1;
    totalDealer += cardValue[x];
    deck.splice (i,1);
    if (cardId[x] == 1){
        dealerAce++;
    }

    if (totalDealer > 21 && dealerAce > 0){
    totalDealer -= 10;
    dealerAce--;
    }

    i = Math.floor(Math.random()*4); // Color random

    image = document.createElement("img"); // Cards show
    image.src = "./Small/"+color[i]+" "+cardId[x]+".png";
    document.getElementById("dealerCards").appendChild(image);

    show();
}

function hit() {
    action = "Hit"
    drawCardPlayer();
    show();
    btnDouble.disabled = true;
    if (totalPlayer > 21){
        result = "Too many";
        show();
        reset();
    } 
}

async function stand(){
    action = "Stand"
    while (totalDealer < 17){
        drawCardDealer();
        await sleep();
    }

    if (playerBj == true && dealerBj === false){
        chips += (bet*2.5);
        result = "You won!";

    } else if (totalDealer > 21 || totalDealer < totalPlayer){
        chips += (bet*2);
        result = "You won!";

    } else if (totalDealer > totalPlayer){
        result = "You lost";

    } else {
        result = "Draw";
        chips += bet;
    }
    show();
    reset();
}

function double(){
    if (chips < bet){
        window.alert("You don't have enough chips!")
    }
    else{
        action = "Double";
        chips -= bet;
        bet = bet*2;
        drawCardPlayer();
        show();
        btnDouble.disabled = true;

        if (totalPlayer > 21){
            result = "Too many"
            reset();
        }

        btnHit.disabled = true;
        btnDouble.disabled = true;
    }
}

function show() {
    if (playerAce > 0){
        document.getElementById("totalPlayer").innerHTML = totalPlayer + " (Soft)";
    } else {
        document.getElementById("totalPlayer").innerHTML = totalPlayer;
    }
    document.getElementById("chips").innerHTML = chips;
    document.getElementById("totalDealer").innerHTML = totalDealer;
    document.getElementById("betAmount").innerHTML = bet;
    document.getElementById("result").innerHTML = result;
    document.getElementById("action").innerHTML = action;
}

function reset(){
    btnBet.disabled = false;
    betAmount.disabled = false;
    btnStand.disabled = true;
    btnHit.disabled = true;
    btnDouble.disabled = true;
    totalPlayer = 0;
    totalDealer = 0;
    playerAce =0;
    playerBj = false;
    dealerBj = false;
    if (deck.length < cards.length*2){
        deck = cards.concat(cards).concat(cards).concat(cards);
        action = 'Reshuffling';
    }
}
