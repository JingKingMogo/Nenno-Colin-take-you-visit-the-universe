function QuizQuestion(question, choices, correctAnswer){
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}
  
var allQuestions = [
  new QuizQuestion("下面哪一个是地球唯一的卫星",["月球", "火星", "木星", "天然卫星"],0),
  new QuizQuestion("下面哪一个星球是第一个人类曾经登陆过的地外星球",["火星", "月球", "土星","木星"],1),
  new QuizQuestion("目前宇宙中人类已知存在生命的唯一天体是什么",[ "月球", "地球", "太阳", "火星"],1),
  new QuizQuestion("地球现在的年龄可是有多少亿年",["40.5", "45.5", "50.5", "55.5"],1),
  new QuizQuestion("太阳系中直径、质量和密度最大的类地行星是什么",["月球", "火星","木星","地球" ],3),
  new QuizQuestion("下面哪一个星球是第一个人类曾经登陆过的地外星球",["火星", "月球", "土星","木星"],1),
  new QuizQuestion("下面哪一个是地球唯一的卫星",["月球", "火星", "木星", "天然卫星"],0),
  new QuizQuestion("下面哪一个是地球唯一的卫星",["月球", "火星", "木星", "天然卫星"],0),
  new QuizQuestion("太阳系中直径、质量和密度最大的类地行星是什么",["月球", "火星","木星","地球" ],3),
  new QuizQuestion("下面哪一个星球是第一个人类曾经登陆过的地外星球",["火星", "月球", "土星","木星"],1),
  /*
  new QuizQuestion("What has a tail but no body?",["A human", "A coin", "A cloud"],1),
  new QuizQuestion("What word in the English language is always spelled incorrectly?",["It's possible to spell anything right as long as you learn it", "Shakespeare", "Onomatopoeia", "Incorrectly"],2),
  new QuizQuestion("When do you stop at green and go at red?",["Watermelon!", "Traffic light!", "Garden"],0),
  new QuizQuestion("What rotates but still remains in the same place?",["Bottle (spin the bottle game)", "Clock", "Stairs"],1),
  new QuizQuestion("How can you lift an elephant with one hand?",["Truck","Use both hands!", "Use a lever", "There is no such thing"],2)
*/  
];

var currentquestion = 0;
var correctAnswers = 0;

function setupOptions() {
  $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
  var formHtml = '';
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" class="options"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
  }
  $('#form').html(formHtml);
  $(".options:eq(0)").prop('checked', true);
}

function checkAns() {
  if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
    correctAnswers++;
  }
}

$(document).ready(function(){
	
  var $jumbotron = $(".jumbotron");
  var $start = $("#start");
  var $progressbar = $("#progressbar");
  var $next = $("#next");
  var $result = $("#result");
  
	$jumbotron.hide();
	$start.click(function() {
	    $jumbotron.fadeIn();
	    $(this).hide();
  	});

	$(function() {
		$progressbar.progressbar({
			max: allQuestions.length-1,			
			value: 0
		});
	});

	setupOptions();

	$next.click(function(){
			event.preventDefault();
			checkAns();
			currentquestion++;
			$(function() {
    			$progressbar.progressbar({
      				value: currentquestion
    			});
  			});
			if(currentquestion<allQuestions.length){
				setupOptions();
				if(currentquestion==allQuestions.length-1){
					$next.html("提交");
					$next.click(function(){
						$jumbotron.hide();
						$result.html("你答对了" + currentquestion + "个问题中的" + correctAnswers + "个").hide();
						var myImage = new Image(180, 140);
						myImage.src='';
						myImage.style.cursor="pointer";
						myImage.style.position="absolute";
						myImage.style.right="42%";
						myImage.style.bottom="20%";
						$result.fadeIn(1500);
					});

				}
				
			};
	});	
});