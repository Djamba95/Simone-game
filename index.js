//Simon Game
var gamePattern=[];                                     // storing the already generated colors in order

var userClickedPattern=[]                               // storing the colors pressed by user

var buttonColours=["red","blue","green","yellow"]       ///Array that stores the playing colours

var level = 0                                           // storing the level of the player

var startButton = false                                 // soring is game is started or not

$("body").keydown(function(){                           // even listener to key press at start
start()                                                 // calling the function to start the game
});




$(".btn").click(function(){                              // event listener on click
    var userChosenColour= this.id                        // captures the id of the button pressed
    userClickedPattern.push(userChosenColour)            // pushing the pressed colour in the array
    playSound(userChosenColour)                          // play the sound of the button
    animatedPress(userChosenColour)                      //calls the function to animate buttons
    checkAnswer(userClickedPattern.length-1)             // calls the check function on the last answer

})


function startOver(){
level = 0
gamePattern = []
startButton = false
}


function checkAnswer(currentLevel){                                         // cheking answer

    if (userClickedPattern[currentLevel]  == gamePattern[currentLevel]){    // checking if user pattern is matching with game pattern on current position 
        console.log("Success")
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
           
        }
    }else{
        console.log("Wrong")
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over , Press Any Key To Restart")
        startOver()
    }
}


function start(){                                         // game starting function
    if(startButton == false){                             // if the game is not started yet
         nextSequence();                                  // call the next sequence
        
         startButton = true                               // change game status to on 
   
    }
   }

function animatedPress(currentColour){                             // function to animate buttons
    $("#"+ currentColour + ".btn").addClass("pressed")             // adding the pressed class to a button
    setTimeout(function(){                                         // setting the timer
        $("#" + currentColour + ".btn").removeClass("pressed")     // removing the pressed class
    },100)                                                         // the removing takes place after 100ms
 
}

 function playSound(trigger){                                      // function to match color with sounds
    switch (trigger) {
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3")
              blueSound.play()
            break;
        case "green":
             var greenSound = new Audio("sounds/green.mp3")
             greenSound.play()
             break;
         case "red":
            var redSound = new Audio("sounds/red.mp3")
            redSound.play()      
            break;
         case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3")
            yellowSound.play()   
             break;
             default:
                var wrongSound = new Audio("sounds/wrong.mp3")  
                wrongSound.play() 
                break; 
        
    }
}

function nextSequence(){                                     // function that generates a random number
    var randomNumber=Math.floor(Math.random()*4)             // random number 0-3
    var randomChosenColour = buttonColours[randomNumber]     // assigning a colour to the random number (0 - red ; 1 - blue ; etc)
    gamePattern.push(randomChosenColour)                     //pushing in the new generated colour
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)     //making the generated button flash
    playSound(randomChosenColour);                           // playing the sound of the button generated
    level++                                                  // increasing the level
    $("h1").html("Level " + level)                           // change h1 to the level number
    userClickedPattern=[]
}
