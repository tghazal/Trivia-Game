var myInterval;
var count = 30;
//define trivia object 
var trivia = {
    //arrays of questions and asnwers
    questions: [" The keyword or the property that you use to refer to an object through which they were invoked is?", "The property of JSON() method is:?", "When a class B can extend another class A, we say that?","The method that can be used to create new properties and also to modify the attributes of existing properties is","The meaning for Augmenting classes is that"],
    answers1: ["A) from", "A)  it can be invoked manually as object.JSON()", "A) A is the superclass and B is the subclass","A)Object.defineProperty()","A)objects inherit prototype properties even in dynamic state"],
    answers2: ["B) to", "B) it will be automatically invoked by the compiler", "B) B is the superclass and A is the subclass","B) Object.defineProperties()","B)objects inherit prototype properties only in dynamic state"],
    answers3: ["C) this", "C) it is invoked automatically by the JSON.stringify() method", "C) Both A and B are the superclass","C) Both Object.defineProperty() and Object.defineProperties()","C) objects inherit prototype properties in static state"],
    answers4: ["D) object", "D) it cannot be invoked in any form", "D) Both A and B are the subclass","D) None of the mentioned","D) None of the mentioned"],
    correctAnswers: [{"number":"C","value":"this"}, {"number":"C","value":" it is invoked automatically by the JSON.stringify() method"}, {"number":"A","value":"A is the superclass and B is the subclass"},{"number":"C","value":"Both Object.defineProperty() and Object.defineProperties()"},{"number":"A","value":"objects inherit prototype properties even in dynamic state"}],
    index: 0,
    correct: 0,
    incorrect: 0,
    unAnswered:0,
    isCorrect: false,

    //this method fill the questins and answers in html text and buttons according to the current index
    fillQuestionAndAnswer: function () {
        $(".timer").text("Time Remaining = " + count);
        $(".Question").text(this.questions[this.index]);
        $("#button-1").text(this.answers1[this.index]);
        $("#button-2").text(this.answers2[this.index]);
        $("#button-3").text(this.answers3[this.index]);
        $("#button-4").text(this.answers4[this.index]);

    },
   
    //check the answer  that the user click and update the correct and incorrect variables according to answer 
    checkAnswer: function (value) {
        if (value === this.correctAnswers[this.index].number) 
        {
            console.log("correct");
            this.correct++;
            this.isCorrect = true;
            this.fillResult("correct");
        }
        else
         {
            console.log("incorrect");
            this.incorrect++;
            this.isCorrect = false;
           this.fillResult("incorrect");
         } 

    },

    // fill the results and images in the html according to the value if correct or incorrect or out of time 
    fillResult:function(value)
    { 

        var correctAnswer=this.correctAnswers[this.index].value;
        $("#result").empty();
        $("#myDiv").empty();
        var myDiv=$("<img>");

        if(value==="correct")
        {
            myDiv.attr("src","assets/images/win.png");
            $("#result").append( $("<P class='mt-2'>").text("correct !!!"));
        }
        else if(value==="incorrect")
        {
            $("#result").append( [$("<P class='mt-2'>").text("incorrect !!!"),$("<P class='mt-2'>").text("Correct answer was : "+correctAnswer)]);
             myDiv.attr( "src","assets/images/youlose.png");
        }
       else
        {
        $("#result").append( [$("<P class='mt-2'>").text("out of time !!"),$("<P class='mt-2'>").text("Correct answer was:  "+correctAnswer)]);
        myDiv.attr("src","assets/images/outOfTime.png");
        }
        myDiv.css("hieght", "280");
        myDiv.css("width", "300");
        $("#myDiv").append(myDiv);
       
    },

// fill final results for the correct and incorrect and unanswered questions 
    fillFinalResult:function(numCorrect,numIncorrect,numUnanswered)
    {
        $("#result").empty();
        $("#myDiv").empty();
       // fill the results here 
        $("#result").append( [$("<P>").text("End Of The Game"),$("<P class='mt-2'>").text("Correct answers= "+numCorrect),$("<P class='mt-2'>").text("inCorrect answers= "+numIncorrect),$("<P class='mt-2'>").text("UnAnswered Questions= "+numUnanswered)]);
        var startAgainbtn=$("<button id='start'>").text("start Again");
       // add start again button  in the final screen to start again the game 
        startAgainbtn.addClass("mt-5 mb-5 p-3 btn-lg btn-block  text-white startAgain");
        startAgainbtn.text("start Again");
        
        $("#myDiv").append(startAgainbtn);

    }




}

$( document ).ready(function() {
    
   // at the bigging of the game empty divs
    $("#myDiv").empty();
     $("#result").empty();
     //add the title of game in the div 
    $("#result").append( $("<P class='font-weight-bold'>").text("Trivia Game"));
    //add start button to the first screen 
    var startButton=$("<button id='start' >").text("Start");
    startButton.addClass("mt-3 p-2 btn-lg btn-block  text-white start");
    startButton.text("Start The Game");
    //add image to the start screen 
    var startImage=$("<img >");
    startImage.css("hieght", "270");
    startImage.css("width", "330");
    startImage.attr("src","./assets/images/start.png");
    $("#myDiv").append([startButton,startImage]);
    $(".myRow2").addClass("tempwidth");

// when click start button 
var start=function () {
    console.log("hi");
    $("#myDiv").empty();
    // remove class invisible for row2 which contains the questions and answers to show them after click strat button 
    $(".myRow2").removeClass("invisible");
    $(".myRow2").removeClass("tempwidth");
    //call fill question and answer method to fill the html with question and answers
    trivia.fillQuestionAndAnswer();
    //call display timer every second 
    myInterval = setInterval(displayTimer, 1000);


}


var displayTimer = function () {
    //decrease the counter by 1 each time 
    count--;
   //display time in the html timer div 
   $(".timer").text("Time Remaining = " + count);
    //check if the timer is zero 
    if (count === 0) {
        //clear interval 
        clearInterval(myInterval);
        trivia.unAnswered++;
        // hide the questions and answers to show the screen that tell the user that he runs out of time 
        $(".myRow2").addClass("invisible");
        $(".myRow2").addClass("tempwidth");
       // call fill result method and pass "out" parameter to fill out of time result 
        trivia.fillResult("out");
        // after 3 seconf go back to qoestion and answer screen 
        setTimeout(goBackToQuestion,3000);
   
    }
    
}

//  go back to question method to display the questions and answers if there still questions not displayed 
var goBackToQuestion=function()
{ 
    count = 30
    ;
    //increase the index to shoe new question and answes 
    trivia.index++;
   // if the user saw all the question then go to the fina result screen 
    if (trivia.index === trivia.questions.length) 
    { 
      setTimeout(trivia.fillFinalResult(trivia.correct,trivia.incorrect,trivia.unAnswered),3000);
      console.log("end"+trivia.correct);

    }
  //  if there still questins show the question and answer divs
    else{
    $("#myDiv").empty();
    $("#result").empty();
    $("#result").append( $("<P>").text("Trivia Game"));
    $(".myRow2").removeClass("invisible");
    $(".myRow2").removeClass("tempwidth");
  
   
   // call fill question and answer method to fill with new quesion 
    trivia.fillQuestionAndAnswer();
    myInterval = setInterval(displayTimer, 1000);
}

}
// when click on the answers buttons 
$(".mybutton").on("click", function () {

    clearInterval(myInterval);
   
    $(".myRow2").addClass("invisible");
    $(".myRow2").addClass("tempwidth");
    
    var answerValue = $(this).attr("value");
    trivia.checkAnswer(answerValue);
    
   
    setTimeout(goBackToQuestion,3000);
   
})
// when click on the start again button 
var startAgain=function(){
    trivia.index = 0; 
    trivia.correct=0;
    trivia.incorrect=0;
    trivia.unAnswered=0;
    trivia.isCorrect=false;
    $("#result").empty();
    $("#myDiv").empty();
    $("#result").append( $("<P>").text("Trivia Game"));
    $(".myRow2").removeClass("invisible");
    $(".myRow2").removeClass("tempwidth");
    trivia.fillQuestionAndAnswer();
    myInterval = setInterval(displayTimer, 1000);
}
 // Adding click event listeners to the dynamically created button of class  "startAgain" and "start"
 $(document).on("click", ".startAgain", startAgain);
 $(document).on("click", ".start", start);
 

});