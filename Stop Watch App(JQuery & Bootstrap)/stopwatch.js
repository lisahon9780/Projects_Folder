$(function(){
    //Variables
        //app mode
        var mode = false;
        //time counter
        var timeCounter = 0;
        //lap counter
        var lapCounter = 0;
        //variable for setInterval
        var action;
        //Number of Laps
        var lapNumber = 0;
        //minutes, seconds, centiseconds for time and lap
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On App load show start and lap buttons
    hideshowButtons("#startButton", "#lapButton");
    
    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode = true;
        //show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });
    
    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        //stop counter
        clearInterval(action);
    });
    
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and reset buttons
        hideshowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });
        
    
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
        
    
    //click on the lapButton
    $("#lapButton").click(function(){
        //if mode is ON
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
        
    });
        

//functions
    
//hide elements
function hideshowButtons(x, y){
    $(".control").hide();
    $(x).show();
    $(y).show();
    
} 
    
//start counter
function startAction(){
    action = setInterval(function(){
        timeCounter++;
        if(timeCounter == 100*60*100){
            timeCounter = 0;
        }
        lapCounter++;
        if(lapCounter == 100*60*100){
            lapCounter = 0;
        }
        updateTime();
    },10);
}

//convert counters to min, sec, centisec
function updateTime(){
    //1min = 60 * 100 centiseconts = 6000 centiseconds
    timeMinutes = Math.floor(timeCounter/6000);
    //1sec = 100 centiseconts = remainder of first division by 100
    timeSeconds = Math.floor((timeCounter%6000)/100);
    //1centisec = remainder of the second division 
    timeCentiseconds = (timeCounter%6000)%100;
    
    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
    $("#timecentisecond").text(format(timeCentiseconds));
    
    //1min = 60 * 100 centiseconts = 6000 centiseconds
    lapMinutes = Math.floor(lapCounter/6000);
    //1sec = 100 centiseconts = remainder of first division by 100
    lapSeconds = Math.floor((lapCounter%6000)/100);
    //1centisec = remainder of the second division 
    lapCentiseconds = (lapCounter%6000)%100;
    
    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
    $("#lapcentisecond").text(format(lapCentiseconds));
}


//format numbers
function format(number){
    if (number<10){
        return '0' + number;
    }else{
        return number;
    }
}

//add lap print details in lap box
function addLap(){
    lapNumber ++;
    var myLapDetails = 
        '<div class="lap">'+
            '<div class="laptimetitle">' +
                'Lap ' + lapNumber +
            '</div>'+
            '<div class="laptime">' + 
                '<span>' + (format(lapMinutes)) + '</span>' +
                ':<span>' + (format(lapSeconds)) + '</span>' +
                ':<span>' + (format(lapCentiseconds)) + '</span>' +
            '</div>'+
       '</div>';
    $(myLapDetails).prependTo("#laps");
}
});