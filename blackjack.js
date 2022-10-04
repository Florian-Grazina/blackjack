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
var chips = 100;
var totalDealer = 0;
var totalPlayer = 0;
var playerAce = 0;
var wait = 150;
var playerBj = false;
var dealerBj = false;
show();

// Setup deck of cards
const cardId = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
const cardName = ["Ace","Two", "Tree", "Four", "Five", "Six",
"Seven","Eight","Nine","Ten","Jack","Queen","King"];

var deck = cardId.concat(cardId).concat(cardId).concat(cardId);

// Blackjack
function betCheck() {
    console.log("");
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
    btnBet.disabled = true;
    betAmount.disabled = true;
    drawCardsDealer(1);
    drawCardsPlayer(1);
    chips -= bet;
    btnStand.disabled = false;
    btnHit.disabled = false;
    btnDouble.disabled = false;

    if (totalPlayer == 21){
        playerBj = true;
        setTimeout(() => window.alert("Blackjack !"),wait);
        stand();
    }   
    show();
}

function drawCardsDealer(a) {
    for (let x = 0; x < a; x++ ){
        let i = Math.floor(Math.random()*deck.length);
        let x = deck[i]-1;
        totalDealer += cardValue[x];
        deck.splice (i,1);
    }
}

function drawCardsPlayer(a) {
    for (let x = 0; x < a; x++ ){
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
    }
}

function hit() {
    drawCardsPlayer(1);
    show();
    btnDouble.disabled = true;
    if (totalPlayer > 21){
        setTimeout(() => window.alert ("Too many"),wait);
        reset();
    } 
}

function stand(){

    while (totalDealer < 17){
        drawCardsDealer(1);
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
    if (deck.length < 26){
        deck = cardId.concat(cardId).concat(cardId).concat(cardId);
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
    document.getElementById("betAmount").innetHTML = bet;
}



// var be