// AI & structure major credit to KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw

var tiles = document.getElementsByClassName("tile");

var state = [0,0,0,0,0,0,0,0,0];
var game = true;

var HUMAN = false;
var COMPUTER = true;

var HUMVAL = -1;
var COMVAL = 1;

var humSymbol = "X";
var comSymbol = "O";

var difficulty = "easy";
var empties = [];

var winMatrix = [[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6]];

var win = new Audio("/tictactoe/media/win.mp3");
var lose = new Audio("/tictactoe/media/lose.mp3");
var draw = new Audio("/tictactoe/media/draw.mp3");

document.getElementById("win").style.display = "none";
document.getElementById("lose").style.display = "none";
document.getElementById("draw").style.display = "none";

// Choose X or O credit: Pankajashree R https://github.com/pankaja-shree/chingu-fcc-speedrun-challenge/blob/master/frontend/tictactoe-game/scripts.js
function playerSymbol(textVal) {
	humSymbol = textVal.charAt(0);
	comSymbol = textVal.charAt(1);

	if (comSymbol == 'X'){
		callAI();
	}
}

function setDifficulty(val) {
	difficulty = val.value;
}


function reset() {
	for (var x = 0; x < 9; x++) {
		tiles[x].innerHTML = "";
		state[x] = 0;
	}
	game = true;
	humSymbol = "X";
	comSymbol = "O";
	document.getElementById("win").style.display = "none";
	document.getElementById("lose").style.display = "none";
	document.getElementById("draw").style.display = "none";
}

function claim(clicked) {
	if (!game) {
		return;
	}

	for (var i = 0; i < 9; i++) {

		if (tiles[i] == clicked && state[i] == 0){
			set(i, HUMAN);
			callAI();
		}
	}
}

function set(index, player) {
	if (!game) {
		return;
	}

	if (state[index] == 0) {

		if (player == HUMAN){
			tiles[index].style.color = "#22f";
			tiles[index].innerHTML = humSymbol;
			state[index] = HUMVAL;
		} else {
			tiles[index].style.color = "#f22";
			tiles[index].innerHTML = comSymbol;
			state[index] = COMVAL;
		}

		// Display Win Lose or Draw credit Pankajashree R https://github.com/pankaja-shree/chingu-fcc-speedrun-challenge/blob/master/frontend/tictactoe-game/scripts.js
		if (!checkWin && checkFull(state)) {
			document.getElementById("draw").style.display = "block";
			draw.play();
		}

		if (checkWin(state, player)){
			if (player == HUMAN){
				document.getElementById("win").style.display = "block";
				win.play();

			} else {
				document.getElementById("lose").style.display = "block";
				lose.play();
			}
			game = false;
		}
	}
}

function checkWin(board, player) {
	var value = player == HUMAN ? HUMVAL : COMVAL;

	for (var j = 0; j < 8; j++) {
		var win = true;

		for (var k = 0; k < 3; k++) {
			if(board[winMatrix[j][k]] != value) {
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

function checkFull(board) {
	for (var l = 0; l < 9; l++) {
		if (board[l] == 0) {
			return false;
		}
	}

	return true;
}

function callAI(){
	console.log("ai called")
	if (difficulty == "easy") {
		randomMove();
		return;
	} 
	if (difficulty == "medium"){
		if (Math.random() * 100 <= 50){
			miniMax(state, 0, COMPUTER);
			return;
		} else {
			randomMove();
			return;
		}
	} else {
		miniMax(state, 0, COMPUTER);
	}
	
}

function getEmpties() {
	empties = [];
	for (var n = 0; n < 9; n++){
		if (state[n] == 0) {
			empties.push(n);
		}
	}
}

function randomMove() {
	getEmpties();
	var randomCell = empties[Math.floor(Math.random() * empties.length)];
	set(randomCell, COMPUTER);
}


function miniMax(board, depth, player) {
	if (checkWin(board, !player)){
		return -10 + depth;
	} 
	
	if (checkFull(board)){
		return 0;
	}

	var value = player == HUMAN ? HUMVAL : COMVAL;

	var max = -Infinity;
	var index = 0;

	for (var m = 0; m < 9; m++) {
		if (board[m] == 0) {
			var newBoard = board.slice();
			newBoard[m] = value;

			var moveVal = -miniMax(newBoard, depth + 1, !player);

			if (moveVal > max) {
				max = moveVal;
				index = m;
			}
		}

	}

	if(depth == 0){
		set(index, COMPUTER);
	}

	return max;
}
