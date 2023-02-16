// let betChips = 0;
// let bet = 0;
// let chips = 200;

// // Click bet
// function betChipsClick(e){
//     betChips = Number(e.target.value);
    
//     if (isNaN(betChips)){    //Si on appuye à coté des boutons
//         return;
//     }

//     if (betChips === 0){         //le bouton reset a une valeur 0
//         bet = 0;
//         for (let i = 0; i < 4; i++){
//             document.querySelector("#stack"+i).innerHTML="";
//         }
//     }

//     else{
//         if (noMoreBets){        //Jeu en cours, bet bloqué
//             return;
//         }
    
//         else{     //Si on appuye sur un bouton autre que reset
//             if (bet === chips){    //Si le joueur à déja la mise maxi
//                 return
//             }
//             else if (bet+betChips > chips){     //Si le joueur veut trop miser
//                 bet = chips;
//             } 
//             else{
//                 bet += betChips;
//             }
    
//             let i = Math.floor(Math.random()*4)
//             let image = document.createElement("img");
//             image.src = "../Sprites/"+betChips+" Stack.png";
//             image.className = "stack";
//             document.querySelector("#stack"+i).appendChild(image);
//         }
//     }
//     document.querySelector("#chips").innerHTML = chips;
//     document.querySelector("#bet_amount").innerHTML = bet;
// }

// export const Chips = {
//     getChips: () => {return chips},
//     betChipsClick: () => {return betChipsClick}
// }