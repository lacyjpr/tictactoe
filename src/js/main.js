document.addEventListener("DOMContentLoaded", function() {

	// Game values
	var game = {
		board: [0,0,0,0,0,0,0,0,0],
		running: false,
		human: false,
		computer: true,
		HUMVAL: -1,
		COMVAL:  1,
		humSymbol: "X",
		comSymbol: "O",
		difficulty: "easy",
		empties: [],
		winMatrix: [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],
		win: new Audio("/tictactoe/media/win.mp3"),
		lose: new Audio("/tictactoe/media/lose.mp3"),
		draw: new Audio("/tictactoe/media/draw.mp3"),			
	};

	// Dom elements
	var squares = document.getElementsByClassName("square");
	var playerX = document.getElementById("playerX");
	var playerO = document.getElementById("playerO");
	var $reset = document.getElementById("reset");
	var radios = document.forms["hardness"].elements["difficulty"];

	// Hide win lose draw messages
	document.getElementById("win").style.display = "none";
	document.getElementById("lose").style.display = "none";
	document.getElementById("draw").style.display = "none";

	// Choose X
	playerX.addEventListener("click", function() { 
		if (game.running === true) {
			return;
		} else {
			game.humSymbol = "X";
			game.comSymbol = "O";
			game.running = true;
		}
	});

	// Choose O
	playerO.addEventListener("click", function() {
		if (game.running === true) {
			return;
		} else {
			game.humSymbol = "O";
			game.comSymbol = "X";
			game.running = true;
			// X always goes first
			callAI();
		}
	});

	$reset.addEventListener("click", function() {
		reset();
	});

	// Set difficulty
	for (var x = 0; x < radios.length; x++) {
		radios[x].onclick = function() {
			game.difficulty = this.value;
		};
	} 

	// Squares event listener credit http://stackoverflow.com/questions/17981437/how-to-add-event-listeners-to-an-array-of-objects
	for (var i = 0; i < squares.length; i++) {
		(function(i) {
			squares[i].addEventListener("click", function() {
				take(i);
			});
		})(i);
	}

	// Reset game to original state
	function reset() {
		for (var x = 0; x < 9; x++) {
			squares[x].innerHTML = "";
			game.board[x] = 0;
		}
		game.running = false;
		game.humSymbol = "X";
		game.comSymbol = "O";
		document.getElementById("win").style.display = "none";
		document.getElementById("lose").style.display = "none";
		document.getElementById("draw").style.display = "none";
	}

	// Take squares credit KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw
	function take(clicked) {
		if (!game.running) {
			return;
		}

		//for (var j = 0; j < 9; j++) {
			if (game.board[clicked] === 0){
				set(clicked, game.human);
				callAI();
			}
		//}
	}

	// Set squares credit KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw
	function set(index, player) {
		if (!game.running) {
			return;
		}

		if (game.board[index] === 0) {

			if (player === game.human) {
				squares[index].style.color = "#2222ff";
				squares[index].innerHTML = game.humSymbol;
				game.board[index] = game.HUMVAL;
			} else {
				squares[index].style.color = "#ff2222";
				squares[index].innerHTML = game.comSymbol;
				game.board[index] = game.COMVAL;
			}

			// Display Win Lose or Draw credit Pankajashree R https://github.com/pankaja-shree/chingu-fcc-speedrun-challenge/blob/master/frontend/tictactoe-game/scripts.js
			if (!checkWin(game.board, player) && checkFull(game.board)) {
				document.getElementById("draw").style.display = "block";
				game.draw.play();
			}

			if (checkWin(game.board, player)){
				if (player === game.human){
					document.getElementById("win").style.display = "block";
					game.win.play();

				} else {
					document.getElementById("lose").style.display = "block";
					game.lose.play();
				}
				game.running = false;
			}
		}
	}

	// Check for win credit KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw
	function checkWin(board, player) {
		var value = player === game.human ? game.HUMVAL : game.COMVAL;

		for (var j = 0; j < 8; j++) {
			var win = true;

			for (var k = 0; k < 3; k++) {
				if(board[game.winMatrix[j][k]] != value) {
					win = false;
					break;
				}
			}
			if (win) {
				return true;
			}
		}

		return false;
	}

	// Check for full board credit KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw
	function checkFull(board) {
		for (var l = 0; l < 9; l++) {
			if (board[l] === 0) {
				return false;
			}
		}

		return true;
	}

	// Start AI
	function callAI(){
		if (game.difficulty === "easy") {
			randomMove();
			return;
		} 
		if (game.difficulty === "medium"){
			if (Math.random() * 100 <= 50){
				miniMax(game.board, 0, game.computer);
				return;
			} else {
				randomMove();
				return;
			}
		} else {
			miniMax(game.board, 0, game.computer);
		}
		
	}

	// Get empty squares
	function getEmpties() {
		game.empties = [];
		for (var n = 0; n < 9; n++){
			if (game.board[n] === 0) {
				game.empties.push(n);
			}
		}
	}

	// Make a random move
	function randomMove() {
		getEmpties();
		var randomCell = game.empties[Math.floor(Math.random() * game.empties.length)];
		set(randomCell, game.computer);
	}

	// Minimax AI credit to KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw
	function miniMax(board, depth, player) {

		// Terminal condition
		if (checkWin(board, !player)){
			return -10 + depth;
		} 
		// Terminal condition
		if (checkFull(board)){
			return 0;
		}

		var value = player === game.human ? game.HUMVAL : game.COMVAL;

		var max = -Infinity;
		var index = 0;

		// Recurse through possible moves until a terminal condition is reached
		for (var m = 0; m < 9; m++) {
			if (board[m] === 0) {
				var newBoard = board.slice();
				newBoard[m] = value;

				var moveVal = -miniMax(newBoard, depth + 1, !player);

				if (moveVal > max) {
					max = moveVal;
					index = m;
				}
			}

		}
		// Make the best possible move
		if(depth === 0){
			set(index, game.computer);
		}

		return max;
	}
});
