
var question1 = {
  title: "A cat has how many whiskers, on average?",
  image: "images/whiskers.jpg",
  answer: "24",
  choices: ["8","12","16", "24"]
};

var question2 = {
  title: "A term for a group of cats is:",
  image: "images/cats.jpg",
  answer: "clowder",
  choices: ["caggle","covey","clutch", "clowder"]
};

var question3 = {
  title:"A term for a group of kittens is:",
  image:"images/kittens.jpg",
  answer:"kindle",
  choices:["kaggle","kindle","nook", "kaboodle"]
};

var question4 = {
  title:"What’s it called when a cat rubs the side of its head on you or on furniture?",
  image:"images/cat-rubbing.jpg",
  answer:"bunting",
  choices:["beaning","bunting","brocking", "tagging"]
};

//MODEL
function Question(options){
  this.ensureCorrect(options);
  console.log(options);
  this.title = options.title;
  this.image = options.image;
  this.answer = options.answer;
  this.choices = options.choices;
  return this;
}

Question.prototype.ensureCorrect = function ensureCorrect(options) {
  if (!options.title) {
    throw new Error("YOU NEED A TITLE");
  }
}

/**
 * [1,2,3,4]
 * [2,3,4]
 */
//VIEW
function QuestionView (collection){
  this.collection = collection;
  this.initalize();
}

QuestionView.prototype.initalize = function initalize() {
 this.nextQuestion();
}

QuestionView.prototype.nextQuestion = function nextQuestion() {
  this.currentQuestion = this.collection.shift(); //return first item array of questions
  this.showQuestion();
  this.handleQuestion();
}

QuestionView.prototype.showQuestion = function showQuestion(){
var $stage = $('#stage');
  $('#stage *').remove();
  $stage.prepend("<img src='" + this.currentQuestion.image + "'/>");
  $stage.append("<h2>" + this.currentQuestion.title + "</h2>");
  $('h2').text(this.currentQuestion.title);
  for (var x in this.currentQuestion.choices){
    $stage.append("<input type='radio' name='group' value='" + this.currentQuestion.choices[x] +"'><span>" + this.currentQuestion.choices[x] + "</span><br/>");
  }
  //This can be removed if you dont want an infinte loop.
  this.collection.push(this.currentQuestion);
}

QuestionView.prototype.handleQuestion = function handleQuestion(){
  // store a reference to QuestionView so we dont have to type alot
  $('input').on('click', function clickHandler() {
    if ($('input:checked').val() === this.currentQuestion.answer){
      rightAnswer();
      this.nextQuestion();
    } else {
      wrongAnswer();
    }
  }.bind(this));
}


//Model is a single question...
//Collection is an array of all questions
function QuestionCollection(){
  //Check if its an Array then dont do any operations
  var arrayList;
  if(arguments.length === 1 && arguments[0] instanceof Array){
      arrayList = arguments[0];
  }else{
    //slice is a way to copy an array
    var slice = Array.prototype.slice;
    arrayList = slice.apply(arguments)
  }

  // so map does each but returns an array after the operations
  return arrayList.map(function(elem){
    return new Question(elem);
  });
}

function rightAnswer(){
  var $status = $('.status');
  $status.empty();
  $status.append("You Got It");
}

function wrongAnswer(){
  var $status = $('.status');
  $status.empty();
  $status.append("Wrong Answer Try Again");
}


$(document).ready(function(){
//Create an instance of the QuestionCollection so that
  var catCollection = new QuestionCollection(question1,question2,question3,question4);
// Every View instance needs an array of questions in order
// render the current question
  var catView = new QuestionView(catCollection);

});
