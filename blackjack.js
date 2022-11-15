// Game setup
var betChips = 0;
var preBet = 0;
var bet = 0;
var result = "Place your bet!"

var chips = 1000;
var stack = ""
var totalPlayer = 0;
var playerAce = 0;
var playerBj = false;

var totalDealer = 0;
var dealerAce = 0;
var dealerBj = false;

dealer("Idle");
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


//  Pick up buttons in HTML
var btnChips = document.getElementById("btnChips");
btnChips.addEventListener ("click", betChipsClick);

var btnBet = document.getElementById("btnBet");
btnBet.addEventListener ("click", betCheck);

var btnHit = document.getElementById("btnHit");
btnHit.addEventListener ("click", hit);
btnDisable(btnHit);

var btnStand = document.getElementById("btnStand");
btnStand.addEventListener ("click", stand);
btnDisable(btnStand);

var btnDouble = document.getElementById("btnDouble");
btnDouble.addEventListener ("click", double);
btnDisable(btnDouble);

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
            e.preventDefault()
            if (btnBet.disabled == false){
                betCheck();
            } else {
                return;
            }
            break;
    }
}


// Sleep
function sleep(wait){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        },wait);
    });
}


// Click bet
function betChipsClick(e){
    betChips = Number(e.target.value);
    
    if (isNaN(betChips)){    //Si on appuye à coté des boutons
        return;
    }

    if (betChips == 0){         //le bouton reset a une valeur 0
        preBet = 0;
        for (let i = 0; i < 4; i++){
            document.getElementById("stack"+i).innerHTML="";
        }
    }
    else{     //Si on appuye sur un bouton autre que reset
        if (preBet == chips){    //Si le joueur à déja la mise maxi
            return
        }
        else if (preBet+betChips > chips){     //Si le joueur veut trop miser
            preBet = chips;
        } 
        else{
            preBet += betChips;
        }

        i = Math.floor(Math.random()*4)
        image = document.createElement("img");
        image.src = "./Sprites/"+betChips+" Stack.png";
        image.className = "stack";
        document.getElementById("stack"+i).appendChild(image);
    }

    show();
}


// Blackjacktoo m
function betCheck() {

    if (preBet === 0){
        window.alert("Please put a bet amount");
    }
    else if (preBet > chips){
        window.alert("You don't have enough chips!");
    }
    else{
        bet = preBet;
        startGame();
    }
}


// Start the game
async function startGame(){
    btnDisable(btnBet);

    result = "No more bets";
    action = "...";
    chips -= bet;

    show();

    drawCards();

    document.getElementById("playerCards").innerHTML = "";
    await drawCardPlayer();
    document.getElementById("dealerCards").innerHTML = "";
    await drawCardDealer();
    await drawCardPlayer();

    btnEnable(btnStand);
    btnEnable(btnHit);
    btnEnable(btnDouble)

    document.getElementById("result").style.display = "none";

    if (totalPlayer == 21){
        playerBj = true;
        btnDisable(btnHit);
        btnDisable(btnDouble),
        result = "Blackjack!"
        document.getElementById("result").style.display = "block";
        show();
    }   
}


// Draw player
async function drawCardPlayer() {
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
    image.src = "./Sprites/Cards/"+color[i]+" "+cardId[x]+".png";
    image.className="cards";

    if (document.getElementById("playerCards").length == 0){
        document.getElementById("playerCards") = image;
    } else{
        document.getElementById("playerCards").appendChild(image);
    }

    show();
    await dealerAnimation();
}


// Draw dealer
async function drawCardDealer() {

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
    image.src = "./Sprites/Cards/"+color[i]+" "+cardId[x]+".png";
    image.className="cards";
    if (document.getElementById("dealerCards").length == 0){
        document.getElementById("dealerCards") = image;
    } else{
        document.getElementById("dealerCards").appendChild(image);
    }

    show();
    await dealerAnimation();
}


async function hit() {
    action = "Hit"
    drawCardPlayer();
    // show();
    btnDisable(btnDouble);
    if (totalPlayer > 21){
        result = "Too many";
        btnDisable(btnHit);
        btnDisable(btnDouble);
        btnDisable(btnStand);
        document.getElementById("result").style.display = "block";
        show();
        await sleep(2000);
        reset();
        show();
    } 
}


async function stand(){
    document.getElementById("result").style.display = "none";
    action = "Stand"
    btnDisable(btnHit);
    btnDisable(btnDouble);
    btnDisable(btnStand);

    while (totalDealer < 17){
        await drawCardDealer();
    }

    if (playerBj == true && dealerBj === false){
        chips += (bet*2.5);
        result = "You won! : "+bet*1.5+" chips.";

    } else if (totalDealer > 21 || totalDealer < totalPlayer){
        chips += (bet*2);
        result = "You won! : "+bet+" chips.";

    } else if (totalDealer > totalPlayer){
        result = "You lost : "+bet+" chips.";

    } else {
        result = "Draw";
        chips += bet;
    }
    document.getElementById("result").style.display = "block";
    show();
    await sleep(2000);
    reset();
    show();
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
        btnDisable(btnDouble);

        if (totalPlayer > 21){
            result = "Too many"
            reset();
        }

        btnDisable(btnHit);
        btnDisable(btnDouble);
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
    document.getElementById("betAmount").innerHTML = preBet;
    document.getElementById("result").innerHTML = result;
    document.getElementById("action").innerHTML = action;
    
}


function reset(){

    btnEnable(btnBet);
    btnDisable(btnStand);
    btnDisable(btnHit);
    btnDisable(btnDouble);
    totalPlayer = 0;
    totalDealer = 0;
    playerAce = 0;
    dealerAce = 0;
    playerBj = false;
    dealerBj = false;
    result = "Place your bet!";
    drawCards();
    if (deck.length < cards.length*2){
        deck = cards.concat(cards).concat(cards).concat(cards);
        action = 'Reshuffling';
    }
}


// Draw cards
function drawCards(){

    document.getElementById("dealerCards").innerHTML = "";
    image = document.createElement("img"); // Cards show
    image.className="cards";
    image.src = "./Sprites/Cards/Back Grey 1.png";
    image.value = 0;
    document.getElementById("dealerCards").appendChild(image);
    
    document.getElementById("playerCards").innerHTML = "";
    image = document.createElement("img"); // Cards show
    image.className="cards";
    image.src = "./Sprites/Cards/Back Grey 1.png";
    image.value = 0;
    document.getElementById("playerCards").appendChild(image);
}


//Draw dealer
function dealer(a){
    var dealer = document.getElementById("dealerSprite");
    dealer.src = "./Sprites/"+a+".png";
    document.getElementById("dealerSprite").innerHTML = dealerSprite;
}

async function dealerAnimation(){
    dealer("Draw");
    await sleep(300);
    dealer("Idle");
    await sleep(300);
}

//Style
function btnDisable(btn){
    btn.disabled = true;
    btn.className = "buttonGray";
}

function btnEnable(btn){
    btn.disabled = false;
    btn.className = "button";
}

//Functions
//Import
//Sprite button disable
//stack
    //maximum stack,
