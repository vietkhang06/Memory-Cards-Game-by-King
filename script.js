const cards = document.querySelectorAll(".card");
timeTag = document.querySelector(".time b");
flipsTag = document.querySelector(".flips b");
refreshBtn = document.querySelector(".details button");
var scoreElt = document.querySelector("#score");

let maxTime = 45;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let score = 0;


function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);   
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard(e) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function stopTimer() {
    clearInterval(currentTimer);
  }
function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 8 && timeLeft > 0) {
            if (flips <= 40) {
                score += 10;
            }
            if (flips <= 30) {
                score += 20;
            }
            if (flips <= 25) {
                score += 30;
            }
            scoreElt.innerHTML = score;
            alert("Bạn Thắng Với Thời Gian Còn Lại Là " + timeLeft + " Giây Và Số Điểm Hiện Tại Của Bạn Là " + score + " điểm!");
            return clearInterval(timer);
            
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    scoreElt.innerHTML = score;
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/pic-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
function resetScore() {
    return clearInterval(score);
}