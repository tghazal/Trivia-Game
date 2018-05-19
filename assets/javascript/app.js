var myInterval;
var count = 10;

var trivia = {
    questions: ["What type of animal is a seahorse?", "Which of the following dogs is the smallest?", "What existing bird has the largest wingspan?"],
    answers1: ["A) Crustacean", "A) Dachshund", "A) Stork"],
    answers2: ["B) Arachnid", "B) Poodle", "B) Swan"],
    answers3: ["C) Fish", "C) Pomeranian", "C) Condor"],
    answers4: ["D) Shell", "D) Chihuahua", "D) Albatross"],
    correctAnswers: [{"number":"A","value":"Crustacean"}, {"number":"D","value":" Chihuahua"}, {"number":"D","value":"Albatross"}],
    index: 0,
    correct: 0,
    incorrect: 0,
    unAnswered:0,
    isCorrect: false,

    fillQuestionAndAnswer: function () {
        $(".timer").text("Time Remaining = " + count);
        $(".Question").text(this.questions[this.index]);
        $("#button-1").text(this.answers1[this.index]);
        $("#button-2").text(this.answers2[this.index]);
        $("#button-3").text(this.answers3[this.index]);
        $("#button-4").text(this.answers4[this.index]);

    },

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

 

    fillResult:function(value)
    { 

        var correctAnswer=this.correctAnswers[this.index].value;
        $("#result").empty();
        $("#imgDiv").empty();
        var imgDiv=$("<img>");

        if(value==="correct")
        {
            imgDiv.attr("src","assets/images/win.png");
            $("#result").append( $("<P class='mt-2'>").text("correct !!!"));
        }
        else if(value==="incorrect")
        {
            $("#result").append( [$("<P class='mt-2'>").text("incorrect !!!"),$("<P class='mt-2'>").text("Correct answer was "+correctAnswer)]);
             imgDiv.attr( "src","assets/images/youlose.png");
        }
       else
        {
        $("#result").append( [$("<P class='mt-2'>").text("out of time !!"),$("<P class='mt-2'>").text("Correct answer was "+correctAnswer)]);
        imgDiv.attr("src","assets/images/outOfTime.png");
        }
        imgDiv.css("hieght", "320");
        imgDiv.css("width", "330");
        $("#imgDiv").append(imgDiv);
       
    },


    fillFinalResult:function(numCorrect,numIncorrect,numUnanswered)
    {
        $("#result").empty();
        $("#imgDiv").empty();
        $("#result").append( [$("<P>").text("End Of The Game"),$("<P class='mt-2'>").text("Correct answers= "+numCorrect),$("<P class='mt-2'>").text("inCorrect answers= "+numIncorrect),$("<P class='mt-2'>").text("UnAnswered Questions= "+numUnanswered)]);
      //  $("#result").text("correct answers = "+ this.correct + " AND incorrect answers ="+ this.incorrect +" AND un answered Questions ="+this.unAnswered);
        var startButton=$("<button >").text("start Again");
       
        startButton.addClass("mt-5 mb-5 p-3 btn-lg btn-block  text-white startAgain");
        startButton.text("start Again");
        
        $("#imgDiv").append(startButton);

    }




}


$(".start").on("click", function () {
    console.log("hi");
    $(".myRow1").addClass("invisible");
    $(".myRow1").addClass("tempwidth");
    $(".myRow2").removeClass("invisible");
    trivia.fillQuestionAndAnswer();
    myInterval = setInterval(displayTimer, 1000);


})


var displayTimer = function () {
    count--;
   $(".timer").text("Time Remaining = " + count);
    if (count === 0) {
        clearInterval(myInterval);
        trivia.unAnswered++;
        $(".myRow2").addClass("invisible");
        $(".myRow3").removeClass("invisible");
        trivia.fillResult("out");
        
        setTimeout(goBackToQuestion,3000);
   
    }
    
}

var goBackToQuestion=function()
{ 
    count = 10;
    trivia.index++;

    if (trivia.index === trivia.questions.length) 
    { 
      setTimeout(trivia.fillFinalResult(trivia.correct,trivia.incorrect,trivia.unAnswered),3000);
      console.log("end"+trivia.correct);

    }
    else{
    $(".myRow2").removeClass("invisible");
    $(".myRow3").addClass("invisible");
    $(".myRow3").addClass("tempwidth");
   
    trivia.fillQuestionAndAnswer();
    myInterval = setInterval(displayTimer, 1000);
}

}
$(".mybutton").on("click", function () {

    clearInterval(myInterval);
    $(".myRow2").addClass("invisible");
    $(".myRow3").removeClass("invisible");

    var answerValue = $(this).attr("value");
    trivia.checkAnswer(answerValue);
    
   
    setTimeout(goBackToQuestion,3000);
   
})

var startAgain=function(){
    trivia.index = 0; 
    trivia.correct=0;
    trivia.incorrect=0;
    trivia.unAnswered=0;
    trivia.isCorrect=false;
    $(".myRow3").addClass("invisible");
    $(".myRow3").addClass("tempwidth");
    $(".myRow2").removeClass("invisible");
    trivia.fillQuestionAndAnswer();
    myInterval = setInterval(displayTimer, 1000);
}
 // Adding click event listeners to the dynamically created button of class  "startAgain"
 $(document).on("click", ".startAgain", startAgain);