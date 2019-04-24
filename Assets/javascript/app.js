$(document).ready(function () {
    var options = [
        {
            question: "Who has hosted “The Bachelor” since the franchise’s onset?", 
            choice: ["Harrison Ford", "Chris Harrison", "Nick Viall", "Chris Stapleton"],
            answer: 1,
            photo: "assets/images/Harrison.gif"
         },
         {
             question: "How many shows have been spun off from “The Bachelor”?", 
            choice: ["Five", "Seven", "Eight", "Zero"],
            answer: 0,
            photo: "assets/images/paradise.gif"
         }, 
         {
             question: "Who has designed engagement rings for the bachelors?", 
            choice: ["Kyle Chan", "Tiffany's", "Neil Lane", "Cartier" ],
            answer: 2,
            photo: "assets/images/NeilLane.gif"
        }, 
        {
            question: "Where is the Bachelor Mansion located in California?", 
            choice: ["Glendale", "Los Angeles", "Augora Hills", "Laguna Beach" ],
            answer: 2,
            photo: "assets/images/mansion.gif"
        }, 
        {
            question: "How many times has Nial Viall met with Neil Lane?", 
            choice: ["0", "2", "1", "3" ],
            answer: 3,
            photo: "assets/images/NickViall.gif"
        }, 
        {
            question: "At the first cocktail party of the season, the bachelor presents what?", 
            choice: ["Cocktails", "The First Impression Rose", "An Engagement Ring", "His Parents" ],
            answer: 1,
            photo: "assets/images/Rachel.gif"
        }, 
        {
            question: "What does Chris Harrison promise to The Bachelor viewers every season?", 
            choice: ["Drama, Drama, Drama!", "The Most Romantic Season Yet!", "Cheesey Pasta", "The Most Dramatic Season Yet!" ],
            answer: 3,
            photo: "assets/images/nap.gif"
        }, 
        {
            question: "What does the bachelor/bachelorette ask when giving roses to the contestants?", 
            choice: ["Will you accept this rose?", "Want this rose?", "Can you take this rose?", "Do you like roses?" ],
            answer: 0,
            photo: "assets/images/acceptrose.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#timeleft").hide();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#timeleft").show();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })