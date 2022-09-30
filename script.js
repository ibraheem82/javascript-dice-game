'use strict';

// * Getting elements.
const player0El     = document.querySelector('.player--0');
const player1El     = document.querySelector('.player--1');
const score0El      = document.querySelector('#score--0');
const score1El      = document.getElementById('score--1');
const current0El    = document.getElementById('current--0');
const current1El    = document.getElementById('current--1');

const diceEl   = document.querySelector('.dice');
const btnNew   = document.querySelector('.btn--new');
const btnRoll   = document.querySelector('.btn--roll');
const btnHold   = document.querySelector('.btn--hold');


let scores, currentScore, activePlayer, playing;

const init = function() { 
 // Conditions started.
     scores        = [0, 0];
     currentScore    = 0;
     activePlayer    = 0;
     playing         = true
    
    score0El.textContent    = 0;
    score1El.textContent    = 0;
    current0El.textContent  = 0;
    current1El.textContent  = 0;


    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--winner');
};

init();




const switchPlayer = function() {
     // * reassigning the active player, check if the current player is equal to zero.
     document.getElementById(`current--${activePlayer}`).textContent = 0;
     currentScore = 0;
     activePlayer = activePlayer === 0 ? 1 : 0;
     player0El.classList.toggle('player--active');
     player1El.classList.toggle('player--active');
}





// *@Rolling dice functionality goes here.
btnRoll.addEventListener('click', function() {
        if(playing) {



    // ! (1) Random dice roll should be generated.
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // ! (2) Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


    // ! (3) check if the dice rolled [1], 
    if(dice !== 1) {
        // * the number rolled to the current score.
        // currentScore = currentScore + dice;
        currentScore += dice
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        // current0El.textContent = currentScore;
            // ! if true switch to the next player.
    } else {
        // ! switch to the next player
        switchPlayer();
       
    }
}

});

btnHold.addEventListener('click', function() {
    if(playing) {

    // ! (1) Will add score to the active player score.
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);

    // * for each players
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // ! (2) check if the score is >= 100
    if(scores[activePlayer] >= 100){

            playing  = false;
    diceEl.classList.add('hidden');

                    
    // if true finish the game.
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    } else {
        // switch to the next player
    switchPlayer();
    }

}

});


// * will call the init function as soon as the user clicks the button.
btnNew.addEventListener('click', init);