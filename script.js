'use strict';

/////Important stuffs
let gamepattern = [];
const buttonColour = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;


///to play sound 
const playSound = function (name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

///to animate key pressed
const animatePress = function (color) {
    $(`.${color}`).addClass('pressed')
    setInterval(() => {
        $(`.${color}`).removeClass('pressed')
    }, 100);
}


///to restart the game
const startOver = function () {
    level = 0;
    gamepattern = [];
    gameStarted = false;
}


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//to start the game
$(document).ready(() => {
    $(document).keypress((e) => {
        if (!gameStarted && (e.key === 'A' || e.key === 'a')) {
            nextSequence();
            gameStarted = true;
        }
    })
})

//to give next pattern
const nextSequence = function () {

    ///clear user clicked array before starting next pattern
    userClickedPattern = [];

    //to display current level
    $('h1').text(`Level ${level}`);

    ///randomly selecting a colour and storing it in an array
    let randomNumber = Math.round(Math.random() * 3);
    const randomChoosenColor = buttonColour[randomNumber];
    gamepattern.push(randomChoosenColor);
    

    //using jquery to animate flash 
    $(document).ready(() => {
        const choosenBtn = $(`#${randomChoosenColor}`);
        choosenBtn.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    })

    //playing corresponding audio
    playSound(randomChoosenColor);

    //increase level by 1
    level++;
}

//when user clicks any color button
$('.btn').click((e) => {
    //get the color id of btn clicked by user and store in an array
    const userChoosenColor = e.target.id;
    userClickedPattern.push(userChoosenColor);

    //play sound
    playSound(userChoosenColor);

    //amimate on pressing color
    animatePress(userChoosenColor)

    //to check for correct format
    checkAnswer(userClickedPattern.length - 1)
})




//to check if the color clicked by user matches the gamepattern color
const checkAnswer = function (currLevel) {
    if (userClickedPattern[currLevel] === gamepattern[currLevel]) {
        if (userClickedPattern.length === gamepattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        
    } else {
        //if user press wrong button
        playSound('wrong');
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('h1').text('Game over. Press A to restart')
        startOver();
    } 
}

