Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function () {
		return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
	}
});

jQuery('body').on('click touchstart', function () {
	const videoElement = document.getElementById('myVideo');
	if (videoElement.playing) {
		// video is already playing so do nothing
	}
	else {
		// video is not playing
		// so play video now
		videoElement.play();
	}
});


$(window).on('load', function() {
	//setTimeout(function(){
		$('.preloader-rsp').fadeOut().end().delay(900).fadeOut('slow');
	//},500);
});


$(document).ready(function(){

	let playerChoice;
	let compRandomNum;
	let wins = 0;
	let loses = 0;
	let draws = 0;
	let winRate = 0;

	function randomInteger(min, max) {
	  // случайное число от min до (max+1)
	  let rand = min + Math.random() * (max + 1 - min);
	  return Math.floor(rand);
	}
	function win(){
		$('.count__result').text('Победа!');
		$('.count__result').css({'background-color':'green'});
		$('.count__result').css({'color':'#fff'});
		wins++;
		$('.wins').css({'color':'#00b300'});
		$('.wins').text(wins);
		setTimeout(function(){
			$('.wins').css({'color':'inherit'});
		},500);
	}
	function lose(){
		$('.count__result').text('Поражение!');
		$('.count__result').css({'background-color':'red'});
		$('.count__result').css({'color':'#fff'});
		loses++;
		$('.loses').css({'color':'red'});
		$('.loses').text(loses);
		setTimeout(function(){
			$('.loses').css({'color':'inherit'});
		},500);
	}
	function draw(){
		$('.count__result').text('Ничья!');
		$('.count__result').css({'background-color':'yellow'});
		$('.count__result').css({'color':'#000'});
		draws++;
		$('.draws').css({'color':'#ff7600'});
		$('.draws').text(draws);
		setTimeout(function(){
			$('.draws').css({'color':'inherit'});
		},500);
	}
	function handMoves(){		//animation left side (player)
		$('.choice,.player__result,.comp__result,.count__result,.choice__description').css({'display':'none'});
		$('.lds-ring').css({'display':'inline-block'});
		$('.choice__container').css({'height':'150px'});
		$('.left-img>#rock-img,.right-img>#rock-img').css({'display':'block'});
		$('.left-img>#scissors-img,.right-img>#scissors-img').css({'display':'none'});
		$('.left-img>#paper-img,.right-img>#paper-img').css({'display':'none'});
		$('.left-img,.right-img').css({'transform':'translate(0px,-50px)'}); 
		let imgMovesDown = setInterval(function(){$('.left-img,.right-img').css({'transform':'translate(0px,50px)'});},250);
		let imgMovesUp = setInterval(function(){$('.left-img,.right-img').css({'transform':'translate(0px,-50px)'});},500);
		setTimeout(function(){
			clearInterval(imgMovesUp);
			clearInterval(imgMovesDown);
			$('.left-img,.right-img').css({'transform':'translate(0px,0px)'});
			if (playerChoice == 2) {
				$('.left-img>#rock-img').css({'display':'none'});
				$('.left-img>#scissors-img').css({'display':'block'});
			}
			if (playerChoice == 3) {
				$('.left-img>#rock-img').css({'display':'none'});
				$('.left-img>#paper-img').css({'display':'block'});
			}
			if (compRandomNum == 3) {
				$('.right-img>#rock-img').css({'display':'none'});
				$('.right-img>#paper-img').css({'display':'block'});
			}
			if (compRandomNum == 2) {
				$('.right-img>#rock-img').css({'display':'none'});
				$('.right-img>#scissors-img').css({'display':'block'});
			}
			$('.choice,.player__result,.comp__result,.count__result,.choice__description').css({'display':'block'});
			$('.lds-ring').css({'display':'none'});
			$('.choice__container').css({'height':'auto'});
		},1500);
	}
	function obnovlenieStatov(){
		wins = 0;
		loses = 0;
		draws = 0;
		$('.wins').text('0');
		$('.loses').text('0');
		$('.draws').text('0');
		$('.winrate').text('0 %');
		$('.all-games').text(wins + loses + draws);
	}


	$('.choice').click(function(){

		handMoves();
		
		if ($(this).is('#kamen')) {			// ход игрока
			$('.player__result').text('Ваш ход: Камень');
			playerChoice = 1;
		} else if ($(this).is('#nozh')) {
			$('.player__result').text('Ваш ход: Ножницы');
			playerChoice = 2;
		} else if ($(this).is('#bumaga')){
			$('.player__result').text('Ваш ход: Бумага');
			playerChoice = 3;
		} else {
			playerChoice = randomInteger(1, 3);
			if (playerChoice == 1) {
				$('.player__result').text('Ваш ход: Камень');
			}
			if (playerChoice == 2) {
				$('.player__result').text('Ваш ход: Ножницы');
			}
			if (playerChoice == 3) {
				$('.player__result').text('Ваш ход: Бумага');
			}
		}
		
		compRandomNum = randomInteger(1, 3);	// ход компьютера

		if (compRandomNum == 1) {
			$('.comp__result').text('Ход компьютера: Камень');
		}
		if (compRandomNum == 2) {
			$('.comp__result').text('Ход компьютера: Ножницы');
		}
		if (compRandomNum == 3) {
			$('.comp__result').text('Ход компьютера: Бумага');
		}

		setTimeout(function(){
			if (playerChoice === compRandomNum) {		// calculation
				draw();
			}
			if (playerChoice == 1 && compRandomNum == 2) {
				win();
			}
			if (playerChoice == 1 && compRandomNum == 3) {
				lose();
			}
			if (playerChoice == 2 && compRandomNum == 1) {
				lose();
			}
			if (playerChoice == 2 && compRandomNum == 3) {
				win();
			}
			if (playerChoice == 3 && compRandomNum == 1) {
				win();
			}
			if (playerChoice == 3 && compRandomNum == 2) {
				lose();
			}

			winRate = wins * 100 / (wins + loses + draws);		// подсчет и вывод доли побед
			$('.winrate').text(Math.floor(winRate) + ' %');
			$('.all-games').text(wins + loses + draws);
		},1499);
	});

	$('.obnovlenie-statov').click(function() {   //обновление статистики
		obnovlenieStatov();
	});  

});