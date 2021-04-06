var quiz = [{
  "question": "下面哪一个是地球唯一的卫星",
  "choices": ["月球", "火星", "木星"],
  "correct": "月球"
}, {
  "question": "下面哪一个星球是第一个人类曾经登陆过的地外星球",
  "choices": ["火星", "月球", "金星"],
  "correct": "月球"
}, {
  "question": "目前宇宙中人类已知存在生命的唯一天体是什么",
  "choices": ["地球", "太阳", "月球"],
  "correct": "地球"
}, {
  "question": "地球现在的年龄可是有多少亿年",
  "choices": ["45.5", "40.5", "50.5"],
  "correct": "45.5"
}, {
  "question": "太阳系中直径、质量和密度最大的类地行星是什么",
  "choices": ["火星", "地球", "水星"],
  "correct": "地球"
}];


// define elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");

// init vars
var currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  // loop through choices, and create radio buttons
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
    scoreContainer.textContent = "分数是:在 " +
      quiz.length + " 题中答对了 0 道";
    submitBtn.textContent = "提交答案";
  }
}

function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
    submitBtn.textContent = "下一题";
    askingQuestion = false;

    // determine which radio button they clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }

      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "#A7DBBC";
    } else {
      labelStyle.color = "#E36F71";
    }

    scoreContainer.textContent = "分数是: 在 " +
      quiz.length + " 道题中答对了" + score +" 道 ";
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "提交答案";
    // if we're not on last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h3>你完成了小测试!</h3>" +
    "<h3>下面是你的成绩:</h3>" +
    "<h3>" + quiz.length + " 道题中答对了 " + score + " 道 ，" +
    Math.round(score / quiz.length * 100) + "%<h3>";

}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);