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

// Setup game

var bet;
var wait = 500;

var chips = 100;
var totalPlayer = 0;
var playerAce = 0;
var playerBj = false;
var playerCards = ""

var totalDealer = 0;
var dealerAce = 0;
var dealerBj = false;
var dealerCards = ""

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

function startGame(){
    show()
    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("dealerCards").innerHTML = "";
    btnBet.disabled = true;
    betAmount.disabled = true;
    setTimeout(() =>drawCardPlayer(),wait);
    setTimeout(() =>drawCardDealer(),wait*2);
    setTimeout(() =>drawCardPlayer(),wait*3);
    console.log(totalPlayer);
    console.log(totalDealer);
    chips -= bet;
    btnStand.disabled = false;
    btnHit.disabled = false;
    btnDouble.disabled = false;

    if (totalPlayer == 21){
        playerBj = true;
        setTimeout(() => window.alert("Blackjack !"),wait);
        btnHit.disabled = true;
        btnDouble.disabled = true;
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
    drawCardPlayer();
    show();
    btnDouble.disabled = true;
    if (totalPlayer > 21){
        setTimeout(() => window.alert ("Too many"),wait);
        reset();
    } 
}

function stand(){
    while (totalDealer < 17){
        drawCardDealer();
    }

    if (playerBj == true && dealerBj === false){
        chips += (bet*2.5);
        setTimeout(() => window.alert("You won"),wait) 

    } else if (totalDealer > 21 || totalDealer < totalPlayer){
        chips += (bet*2);
        setTimeout(() => window.alert("You won"),wait);

    } else if (totalDealer > totalPlayer){
        setTimeout(() =>window.alert("You lost"),wait);

    } else {
        setTimeout(() =>window.alert("Draw"),wait);
        chips += bet;
    }
    show();
    reset();
}

function double(){
    chips -= bet;
    bet = bet*2;
    console.log(bet);
    hit();
    btnHit.disabled = true;
    btnDouble.disabled = true;
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
        deck = cards.concat(cards).concat(cards).concat(cards)
        setTimeout(() => window.alert("Reshuffling..."),wait);
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
}


