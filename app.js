var question1 = new Question(
  "A cat has how many whiskers, on average?",
  "images/whiskers.jpg",
  "24",
  ["8","12","16", "24"]
);

var question2 = new Question(
  "A term for a group of cats is:",
  "images/cats.jpg",
  "clowder",
  ["caggle","covey","clutch", "clowder"]
);

var question3 = new Question(
  "A term for a group of kittens is:",
  "images/kittens.jpg",
  "kindle",
  ["kaggle","kindle","nook", "kaboodle"]
);

var question4 = new Question(
  "What’s it called when a cat rubs the side of its head on you or on furniture?",
  "images/cat-rubbing.jpg",
  "bunting",
  ["beaning","bunting","brocking", "tagging"]
);

function Question( title, image, answer, choiceArray){
  this.title = title;
  this.image = image;
  this.answer = answer;
  this.choices = choiceArray;
}


function QuestionView (collection){
  this.collection = collection;
  this.initalize();
}

QuestionView.prototype.initalize = function() {
 this.nextQuestion();
 this.showQuestion(); 
 this.handleQuestion();
}

QuestionView.prototype.nextQuestion = function() {
  this.currentQuestion = this.collection.shift();
  this.showQuestion();
  this.handleQuestion();
}

QuestionView.prototype.showQuestion = function(){
  $('#stage *').remove();
  $('#stage').prepend("<img src='" + this.currentQuestion.image + "'/>");
  $('#stage').append("<h2>" + this.currentQuestion.title + "</h2>");
  $('h2').text(this.currentQuestion.title);
  for (var x in this.currentQuestion.choices){
    $('#stage').append("<input type='radio' name='group' value='" + this.currentQuestion.choices[x] +"'><span>" + this.currentQuestion.choices[x] + "</span><br/>");
  }

  this.collection.push(this.currentQuestion);
}

QuestionView.prototype.handleQuestion = function(){
  var self = this;
  $('input').click(function() {
    if ($('input:checked').val() == self.currentQuestion.answer){
      rightAnswer();
      self.nextQuestion();
    } else {
      wrongAnswer();
    }
  });
}



function QuestionCollection(){
  var slice = Array.prototype.slice;
  var args = slice.apply(arguments)
  return args;
}

/*Question.prototype.nextQuestion = function(){
var i = this.number;
questionSeries[++i].loadQuestion();
}*/


$(document).ready(function(){

  var catCollection = new QuestionCollection(question1, question2, question4, question3);

  var catView = new QuestionView(catCollection);

});




function rightAnswer(){
  $('.status').append("You Got It");
}

function wrongAnswer(){
  $('.status').append("Wrong Answer");
}
