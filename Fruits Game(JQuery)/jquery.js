var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'orange', 'peach', 'pear', 'pineapple', 'strawberry', 'watermelon'];
var step;
var action; //used for setInterval function

$(document).ready(function(){
//click on start reset button
$("#startreset").click(function(){
    //are we playing?             
    if(playing == true){//yes
        //reload page
        location.reload();
    }else{
        //we are not playing
        playing = true;//game initiated
       
        //set score to zero
        score = 0;
        $("#scorevalue").html(score);
        
        //show trials left box
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //Hide gameover box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();
    }               
});          

//slice a fruit
$("#fruit1").mouseover(function(){
    score++;//add point
    $("#scorevalue").html(score);
   
    $("#slicesound")[0].play();//play sound
    
    clearInterval(action);//stop fruit & hide it
    
    $("#fruit1").hide("explode", 500);//explode fruit
    
    setTimeout(startAction, 800);//create new fruit
});                  


function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i < trialsLeft; i++){
                $("#trialsLeft").append('<img src="images/heart.png" class="life">');
            }
}

//start sending fruits
function startAction(){
    //1.create a random fruit
    $("#fruit1").show();
    chooseFruit();//choose a random fruit
    
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});//random drop location
        
        step = 1 + Math.round(5*Math.random());//define a random step
        
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);//moved fruit down every 10ms
            
            //is too low?
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
               //check for trials left
               if(trialsLeft > 1){
                    //1.create a random fruit
                    $("#fruit1").show();
                    chooseFruit();//choose a random fruit

                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});//random drop location

                    step = 1 + Math.round(5*Math.random());//define a  random step
                   
                    trialsLeft--;//reduce trials by one
                   
                    addHearts();//populate trialsLeft box
                }else{//gameover
                    playing = false;
                    $("#startreset").html("Start Game");//button text
                    $("#gameOver").show(); //show gameover
                    $("#gameOver").html('<p>Game Over!<p>Your score is ' + score + '<p>');
                    $("#trialsLeft").hide();
                    stopAction();
                 }   
                }
        }, 10);
    
}


function chooseFruit(){
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(9*Math.random())] + '.png');
}

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});