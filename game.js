var level = 0; // Initialize the level variable

var gamePattern = []; //array to hold the game sequence

var userClickedPattern = []; //array to hold the user sequence

var buttonColors = ["red", "blue", "green", "yellow", "orange", "purple"]; //array set to hold the sequence red, blue, green, yellow

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 6); // Generate a random number between 0 and 5
    var randomChosenColor = buttonColors[randomNumber];  // Select a random color from the buttonColors array
    gamePattern.push(randomChosenColor); // Add the randomChosenColor to the gamePattern
    console.log("gamePattern: " + gamePattern); // Log the gamePattern to the console for debugging

    animatePress(randomChosenColor); // Call the function to animate the button press
    playSound(randomChosenColor); // Play the sound associated with the chosen color

    if (gamePattern.length > 0) {
        level++; // Increment the level
        $("#level-title").text("Level " + level); // Update the level title on the page
    }
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3"); // Create a new Audio object with the sound file corresponding to the color
    audio.play();
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); // Get the id of the button that was clicked
    userClickedPattern.push(userChosenColor); // Add the userChosenColor to the userClickedPattern
    
    playSound(userChosenColor); // Play the sound associated with the chosen color
    animatePress(userChosenColor); // Call the function to animate the button press

    console.log("userClickedPattern: " + userClickedPattern); // Log the userClickedPattern to the console for debugging

    checkAnswer(userClickedPattern.length - 1);

});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // Add the pressed class to the button that was clicked
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); // Remove the pressed class after a short delay
    }, 100);
}

$(document).keydown(function() {
    if (gamePattern.length === 0) { // Check if the gamePattern is empty
        nextSequence(); // Start the game by calling nextSequence
    }
});

if (gamePattern.length > 0) {
    $("#level-title").text("Level " + level); // Update the level title on the page
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success"); // Log success if the user's answer matches the game pattern
        if (userClickedPattern.length === gamePattern.length) { // Check if the user has completed the sequence
            setTimeout(function() {
                userClickedPattern = []; // Reset the userClickedPattern for the next round
                console.log("userClickedPattern reset: " + userClickedPattern); // Log the reset
                nextSequence(); // Call nextSequence to continue the game
            }, 1000); // Wait for 1 second before proceeding to the next sequence
        }
    } else {
        console.log("wrong"); // Log wrong if the user's answer does not match the game pattern
        playSound("wrong"); // Play the wrong sound
        $("#level-title").text("Game Over, Press Any Key to Restart"); // Update the title to indicate game over
        $("body").addClass("game-over"); // Add the game-over class to the body
        setTimeout(function() {
            $("body").removeClass("game-over"); // Remove the game-over class after a short delay
        }, 200);
        startOver(); // Call startOver to reset the game
        console.log("gamePattern reset: " + gamePattern); // Log the reset of the gamePattern
        console.log("level reset: " + level); // Log the reset of the level
        console.log("userClickedPattern reset: " + userClickedPattern); // Log the reset of the userClickedPattern
    }
}

function startOver() {
    gamePattern = []; // Reset the gamePattern array
    userClickedPattern = []; // Reset the userClickedPattern array
    $("#level-title").text("Game Over. Press Any Key to Start." + " Score = " + level); // Update the title to indicate the game can be restarted
    level = 0; // Reset the level to 0
    
}