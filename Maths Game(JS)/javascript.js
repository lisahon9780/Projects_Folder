var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset button
document.getElementById("startreset").onclick = 
    function(){
        //if we are playing
        if(playing == true){
            location.reload();//reload page   
        }else{//if we are not playing
            playing = true;
            
            //set score to 0
            score = 0;
            document.getElementById("scorevalue").innerHTML = score;
            
            //show countown box
            show("timeremaining");
                timeremaining = 60;
                document.getElementById("timeremainingvalue").innerHTML = timeremaining;
            
            //hide gameover box
            hide("gameOver");
            
            //change button to reset
            document.getElementById("startreset").innerHTML = "Reset Game";
            
            //start countdown
            startCountdown();
            
            //generate a new Q & A
            generateQA();
            
            //if we click on answer box
            for(i=1; i<5; i++){
                document.getElementById("box"+i).onclick = function(){
                //if we are playing
                if(playing == true){
                    //yes
                    if(this.innerHTML == correctAnswer){
                        //increase score by 1
                        score++;
                        document.getElementById("scorevalue").innerHTML = score;
                        //show correct box for 1 second
                        hide("wrong");
                        show("correct");
                        setTimeout(function(){
                            hide("correct");
                        }, 1000); 
                        
                        //generate new Q & A
                        generateQA();
                    }else{
                        //wrong answer
                        hide("correct");
                        show("wrong");
                        setTimeout(function(){
                        hide("wrong");
                        }, 1000); 
                    }
                }
                }
            }
            
        }
    }
      
        

    
        //check if correct
            //yes-->
                //increase score by 1
                //show correct box for 1 second
                //generate new Q&A
            //no -->
                //show try again box for 1 second


//functions

//start counter
function startCountdown(){
    //start reducing time in loop by seconds
            var counter = document.getElementById("timeremainingvalue");
            var x = 60;
            action = setInterval(function(){
                timeremaining -= 1;
                document.getElementById("timeremainingvalue").innerHTML = timeremaining;
            //check if time left
                if(timeremaining == 0){// gameover
                stopCountdown();
                show("gameOver");
                document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>"
                hide("timeremaining");
                hide("correct");
                hide("wrong");
                playing = false;
                document.getElementById("startreset").innerHTML = "Start Game";
                }
            },1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide elements
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show elements
function show(Id){
    document.getElementById(Id).style.display = "block";
}

// generate question and multiple answers
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    
    // display question
    document.getElementById("question").innerHTML = x + " x " + y;
    
    //fill one box with correct answer
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    //fill other boxes with wrong answers
    var answers = [correctAnswer]
    
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)> -1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
        }
    }  
}