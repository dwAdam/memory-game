const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    //console.log('click');
    if (lockBoard) retrun;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    hasFlippedCard = false;
    secondCard = this;
        
    checkForMath();
};

function checkForMath() {
    
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    //ternary
    isMatch ? disableCards() : unFlipCard();
    
    /*if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unFlipCard();
    }*/
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unFlipCard() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})(); //iife

cards.forEach(card => card.addEventListener('click', flipCard));