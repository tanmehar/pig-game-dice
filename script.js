'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');


let activePlayer, current, score, playing;

const init = function () {
    current = 0;
    score = [0,0];
    activePlayer = 0
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
  init();

const currentDisplay = function(player){
    document.getElementById(`current--${player}`).textContent = current;
}

const switchPlayer = function(){
        current = 0;
        currentDisplay(activePlayer);
        activePlayer = activePlayer == 0? 1:0;
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function(){
    if(playing){
        dice.classList.remove('hidden');
        const random = Math.trunc(Math.random()*6)+1;
        dice.src = `dice-${random}.png`;
        if(random!==1){
            current = current + random;
            currentDisplay(activePlayer);
        }
        else{
            switchPlayer();
    
        }
    }

})

btnHold.addEventListener('click',function(){
    if(playing){
        score[activePlayer]= score[activePlayer] + current;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        if(score[activePlayer] >= 100){
            dice.classList.add('hidden');
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
            playing = false;
    
        }
        else{
        switchPlayer();

        }
    }
})

document.querySelector('.btn--new').addEventListener('click', init);

