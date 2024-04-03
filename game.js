var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


var level = 0;

var started = false;



$(document).keypress(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});




function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];


  // Changing name to Level order
  level++;

  $("#level-title").text("Level " + level);


 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColor = buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);


var chosenColor = $("#" + randomChosenColor);
 $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


playSound(randomChosenColor);


}


// Detect Clicked button and push into the userClickedPattern array

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  console.log(userClickedPattern);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});



// Function to play sound

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


// function to animate pressed button

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
     $("#" + currentColor).removeClass("pressed");
   }, 100);
}


// Check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel] ) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length){

      // Calling nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else {
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();

    $("body").addClass('game-over');

    setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     $("h1").text("Game Over, Press Any Key");

     startOver();
  }
}


// Start over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
