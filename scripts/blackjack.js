// Game setup
import { TimeUtils } from "./utils/time-utils.js";
import { ButtonUtils } from "./utils/button-utils.js";
import { Deck } from "./models/deck.js";
import { Dealer } from "./models/dealer.js";
import { Player } from "./models/player.js";
// import { Chips } from "./models/chips.js";

let betChips = 0;
let bet = 0;
let chips = 200;
let result = "Place your bet!"
let noMoreBets = false;
let waitTime = 800;


Dealer.drawIdleFrame();
drawCards();
show();

//  Pick up buttons in HTML
const btnChips = document.querySelector("#btn_chips");
btnChips.addEventListener ("click", betChipsClick);

const btnBet = document.querySelector("#btn_bet");
btnBet.addEventListener ("click", betCheck);

const btnHit = document.querySelector("#btn_hit");
btnHit.addEventListener ("click", hit);
ButtonUtils.btnDisable(btnHit);

const btnStand = document.querySelector("#btn_stand");
btnStand.addEventListener ("click", stand);
ButtonUtils.btnDisable(btnStand);

const btnDouble = document.querySelector("#btn_double");
btnDouble.addEventListener ("click", double);
ButtonUtils.btnDisable(btnDouble);

// Shortcuts keyboard
document.onkeydown = function(e){
    switch(e.keyCode) {
        case 72:
            if (!btnHit.disabled) hit();
            break;
        case 83:
            if (!btnStand.disabled) stand();
            break;
        case 68:
            if (!btnDouble.disabled) double();
            break;
        case 13:
            e.preventDefault()
            if (!btnBet.disabled) betCheck();
            break;
    }
}

// Click bet
function betChipsClick(e){
    betChips = Number(e.target.value);
    
    if (isNaN(betChips)){    //Si on appuye à coté des boutons
        return;
    }

    

    else{
        if (noMoreBets){        //Jeu en cours, bet bloqué
            return;
        }
        
        if (betChips === 0){         //le bouton reset a une valeur 0
            bet = 0;
            for (let i = 0; i < 4; i++){
                document.querySelector("#stack"+i).innerHTML="";
            }
        }
    
        else{     //Si on appuye sur un bouton autre que reset
            if (bet === chips){    //Si le joueur à déja la mise maxi
                return
            }
            else if (bet+betChips > chips){     //Si le joueur veut trop miser
                bet = chips;
            } 
            else{
                bet += betChips;
            }
    
            let i = Math.floor(Math.random()*4)
            let image = document.createElement("img");
            image.src = "../Sprites/"+betChips+" Stack.png";
            image.className = "stack";
            document.querySelector("#stack"+i).appendChild(image);
        }
    }
    show();
}


// Blackjacktoo m
function betCheck() {

    if (bet === 0){
        window.alert("Please put a bet amount");
    }

    else if (bet > chips){
        window.alert("You don't have enough chips!")
    }

    else{
        startGame();
    }
}


// Start the game
async function startGame(){
    ButtonUtils.btnDisable(btnBet);
    noMoreBets = true;

    result = "No more bets";
    chips -= bet;

    show();

    drawCards();

    document.querySelector("#player_cards").innerHTML = "";
    await drawCardPlayer();
    document.querySelector("#dealer_cards").innerHTML = "";
    await drawCardDealer();
    show();
    await drawCardPlayer();

    ButtonUtils.btnEnable(btnStand);
    ButtonUtils.btnEnable(btnHit);
    ButtonUtils.btnEnable(btnDouble)

    document.querySelector("#result").style.display = "none";

    if (Player.hasBlackJack()){
        ButtonUtils.btnDisable(btnHit);
        ButtonUtils.btnDisable(btnDouble);
        result = "Blackjack!"
        document.querySelector("#result").style.display = "block";
        show();
    }   
}


async function drawCardPlayer() {
    Player.drawCard();
    show();
    await Dealer.playAnimation();
}

async function drawCardDealer() {
    await Dealer.drawCard();
    show();
    await Dealer.playAnimation();
}


async function hit() {
    Player.drawCard();
    show();
    ButtonUtils.btnDisable(btnDouble);
    if (Player.getTotal() > 21){
        result = "Too many";
        ButtonUtils.btnDisable(btnHit);
        ButtonUtils.btnDisable(btnDouble);
        ButtonUtils.btnDisable(btnStand);
        await Dealer.playAnimation();
        document.querySelector("#result").style.display = "block";
        show();
        await TimeUtils.sleep(waitTime);
        result = "You lost : " + bet + " chips.";
        show();
        await TimeUtils.sleep(waitTime);
        reset();
        show();
    } else {
        await Dealer.playAnimation();
    }

}


async function stand(){
    document.querySelector("#result").style.display = "none";
    ButtonUtils.btnDisable(btnHit);
    ButtonUtils.btnDisable(btnDouble);
    ButtonUtils.btnDisable(btnStand);

    while (Dealer.getTotal() < 17){
        await drawCardDealer();
    }

    const dealerTotal = Dealer.getTotal();
    const playerTotal = Player.getTotal();

    if (Player.hasBlackJack() && !Dealer.hasBlackJack()){
        chips += (bet*2.5);
        result = "You won! : " + bet * 1.5 + " chips.";

    } else if (dealerTotal > 21 || dealerTotal < playerTotal){
        chips += (bet*2);
        result = "You won! : " + bet + " chips.";

    } else if (dealerTotal > playerTotal){
        result = "You lost : " + bet + " chips.";

    } else {
        result = "Draw";
        chips += bet;
    }
    document.querySelector("#result").style.display = "block";
    show();
    await TimeUtils.sleep(waitTime*2);
    reset();
    show();
}


async function double() {
    if (chips < bet) {
        window.alert("You don't have enough chips!")
    } else {
        chips -= bet;
        bet = bet * 2;
        ButtonUtils.btnDisable(btnDouble);
        ButtonUtils.btnDisable(btnHit);
        await drawCardPlayer();
        show();

        if (Player.getTotal() > 21) {
            result = "Too many";
            reset();
        }
    }
}


function show() {
    const playerTotal = Player.getTotal();
    const dealerTotal = Dealer.getTotal();
    document.querySelector("#total_player").innerHTML = Player.getAce() > 0 ? playerTotal + " (Soft)" : playerTotal;
    document.querySelector("#chips").innerHTML = chips;
    document.querySelector("#bet_amount").innerHTML = bet;
    document.querySelector("#total_dealer").innerHTML = Dealer.getAce() > 0 ? dealerTotal + " (Soft)" : dealerTotal ;
    document.querySelector("#result").innerHTML = result;
}


function reset(){
    ButtonUtils.btnEnable(btnBet);
    ButtonUtils.btnDisable(btnStand);
    ButtonUtils.btnDisable(btnHit);
    ButtonUtils.btnDisable(btnDouble);
    noMoreBets = false;
    result = "Place your bet!";
    drawCards();
    Deck.reset();
    Dealer.reset();
    Player.reset();
}


// Draw cards
function drawCards(){

    document.querySelector("#dealer_cards").innerHTML = "";
    let image = document.createElement("img"); // Cards show
    image.className="cards";
    image.src = Deck.greyCardPath;
    image.value = 0;
    document.querySelector("#dealer_cards").appendChild(image);
    
    document.querySelector("#player_cards").innerHTML = "";
    image = document.createElement("img"); // Cards show
    image.className="cards";
    image.src = Deck.greyCardPath;
    image.value = 0;
    document.querySelector("#player_cards").appendChild(image);
}

//Always data
//Import
// Speed slider
