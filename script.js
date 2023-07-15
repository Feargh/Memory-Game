const cardArray = [
    {
        name: 'powells',
        img: 'images/S+O.jpg',
    },
    {
        name: 'kavanaghs',
        img: 'images/B+A.jpg',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'powells',
        img: 'images/S+O.jpg',
    },
    {
        name: 'kavanaghs',
        img: 'images/B+A.jpg',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'Ben',
        img: 'images/Ben.jpg',
    },
    {
        name: 'Ben',
        img: 'images/Ben.jpg',
    },
    {
        name: 'Orla',
        img: 'images/Orla.jpg',
    },
    {
        name: 'Orla',
        img: 'images/Orla.jpg',
    }
]
const dinoArray = [
    {
        name: 'dino1',
        img: 'images/Dinos/Dino1.jpg',
    },
    {
        name: 'dino2',
        img: 'images/Dinos/Dino2.jpg',
    },
    {
        name: 'dino3',
        img: 'images/Dinos/Dino3.jpg',
    },
    {
        name: 'dino4',
        img: 'images/Dinos/Dino4.jpg',
    },
    {
        name: 'dino5',
        img: 'images/Dinos/Dino5.jpg',
    },
    {
        name: 'dino6',
        img: 'images/Dinos/Dino6.jpg',
    },
    {
        name: 'dino7',
        img: 'images/Dinos/Dino7.jpg',
    },
    {
        name: 'dino8',
        img: 'images/Dinos/Dino8.jpg',
    },
    {
        name: 'dino1',
        img: 'images/Dinos/Dino1.jpg',
    },
    {
        name: 'dino2',
        img: 'images/Dinos/Dino2.jpg',
    },
    {
        name: 'dino3',
        img: 'images/Dinos/Dino3.jpg',
    },
    {
        name: 'dino4',
        img: 'images/Dinos/Dino4.jpg',
    },
    {
        name: 'dino5',
        img: 'images/Dinos/Dino5.jpg',
    },
    {
        name: 'dino6',
        img: 'images/Dinos/Dino6.jpg',
    },
    {
        name: 'dino7',
        img: 'images/Dinos/Dino7.jpg',
    },
    {
        name: 'dino8',
        img: 'images/Dinos/Dino8.jpg',
    }
]
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const button = document.getElementById('button-family');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function startGame() {
 
    createBoard();
    toggleScreen("startScreen", false);
    toggleScreen("result", true)
}

function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = ( toggle ) ? "block" : "none";
    element.style.display = display;
}


function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}


function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    // console.log('check for a match!')

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
        resultDisplay.textContent = 'You found a match!'
        // alert('You found a match!')
        //Commented out the function that will make the card disappear after being matched
        // cards[optionOneId].setAttribute('src', 'images/navy.png')
        // cards[optionTwoId].setAttribute('src', 'images/navy.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        resultDisplay.textContent = 'Sorry try again!'
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        // alert('Sorry try again!')
    }

    cardsChosen = []
    cardsChosenIds = []

//Score display
    if (cardsWon.length === (cardArray.length / 2)) {
            resultDisplay.innerHTML = 'Congratulations you found them all!'
    } else {
        //Display score after a delay (so promts can be shown)
        setTimeout(() => {
        resultDisplay.textContent = 'Score: ' + cardsWon.length
        }, 750)
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.classList.add('flip', 'flipped');  //Add flip class for animation
    this.removeEventListener('click', flipCard);

    setTimeout(() => {
        this.setAttribute('src', cardArray[cardId].img);
                 //Add the image to the fliped card with delay 
    

    //Reset unmatched cards after timeout
    if (cardsChosen.length === 2) {
        const cards = document.querySelectorAll('#grid img');
        setTimeout(() => {
            checkMatch();
            cards.forEach((card) => card.classList.remove('flip'));
            cards.forEach((card) => card.addEventListener('click', flipCard));
            }, 1000);
    }
}, 500);
}