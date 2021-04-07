function QuizQuestion(question, choices, correctAnswer){
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}
  
var allQuestions = [
  new QuizQuestion("下面哪一个是太阳系的中心天体",["太阳", "火星", "地球", "月球"],0),
  new QuizQuestion("下面哪一个行星是八大行星中最小的行星",["火星", "水星", "土星","木星"],1),
  new QuizQuestion("下面哪一个行星距离太阳最近",[ "金星", "水星", "地球", "火星"],1),
  new QuizQuestion("下面哪一个行星是地球的姊妹星",["火星", "金星", "水星", "木星"],1),
  new QuizQuestion("下面哪一个行星是太阳系中最热的行星",["水星", "火星","木星","金星" ],3),
  new QuizQuestion("下面哪一个行星被称为“红色星球",["金星", "火星", "土星","木星"],1),
  new QuizQuestion("下面哪一个行星是太阳系中最大的一颗行星",["木星", "火星", "水星", "地球"],0),
  new QuizQuestion("下面哪一个行星有七个美丽的光环",["土星", "火星", "木星", "金星"],0),
  new QuizQuestion("下面哪一个行星是第一颗使用望远镜发现的行星",["金星", "火星","木星","天王星" ],3),
  new QuizQuestion("下面哪一个行星是已知太阳系中离太阳最远的大行星",["火星", "海王星", "土星","木星"],1),
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
