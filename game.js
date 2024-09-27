var colours = ['green', 'blue', 'red', 'yellow'];
let sequence = [];
let started = false;
let usersequence = [];
let level = 0;


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextLevel();
      started = true;
    }
});

function nextLevel() {
    level = level + 1;
    $("#level-title").text(`Level ${level}`);
    const randomIndex = Math.floor(Math.random() * colours.length);
    const randomColour = colours[randomIndex];
    sequence.push(randomColour);
    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    usersequence = [];

}
$(".btn").on("click", handleUserClick);

function handleUserClick() {
    const userInput = this.id;
    usersequence.push(userInput);
    playsound(userInput);
    animatepress(userInput);
    var pointer = usersequence.length - 1; //pointer at usersequence
    checkUserSequence(pointer);
}

function checkUserSequence(currentstep) {

    if (sequence[currentstep] === usersequence[currentstep]) {
        if (sequence.length === usersequence.length) {
            nextLevel();
        }
    }
    else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        startover();
    }
}

function startover() {
    sequence = [];
    usersequence = [];
    level = 0;
    started = false ;
}

function playsound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
    return ;
}

function animatepress(button){
    $('#'+button).addClass("pressed");
    setTimeout(function (){
        $('#'+button).removeClass("pressed");
    }, 100);
}