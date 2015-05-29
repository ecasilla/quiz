var question1 = new Question({
  title: "A cat has how many whiskers, on average?",
  image: "images/whiskers.jpg",
  answer: "24",
  choices: ["8","12","16", "24"]
});

var question2 = new Question(
  title: "A term for a group of cats is:",
  image: "images/cats.jpg",
  answer: "clowder",
  choices: ["caggle","covey","clutch", "clowder"]
);

var question3 = new Question(
  title:"A term for a group of kittens is:",
  image:"images/kittens.jpg",
  answer:"kindle",
  choices:["kaggle","kindle","nook", "kaboodle"]
);

var question4 = new Question(
  title:"What’s it called when a cat rubs the side of its head on you or on furniture?",
  image:"images/cat-rubbing.jpg",
  answer:"bunting",
  choices:["beaning","bunting","brocking", "tagging"]
);

//MODEL
function Question(options){
  this.title = options.title;
  this.image = options.image;
  this.answer = options.answer;
  this.choices = options.choiceArray;
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
  this.currentQuestion = this.collection.shift(); //array of questions
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
  if(arguments.length === 1 && instanceof Array){
    var arrayList = arguments[0];
  }else{
    var slice = Array.prototype.slice;
    arrayList = slice.apply(arguments)
  }
  arrayList.map(function(elem,index){
    return new Question(elem);
  });
}

function rightAnswer(){
  $('.status').append("You Got It");
}

function wrongAnswer(){
  $('.status').append("Wrong Answer");
}


$(document).ready(function(){
var list = [question1, question2, question4, question3];

  var catCollection = new QuestionCollection(list);

  var catView = new QuestionView(catCollection);

});
