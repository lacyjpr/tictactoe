// AI credit KPkiller1671 https://www.youtube.com/watch?v=aWhb9dr1jNw

var tiles = document.getElementsByClassName("tile");
var buttons = document.getElementsByClassName("button");

var state = [0,0,0,0,0,0,0,0,0];
var game = true;

var HUMAN = false;
var COMPUTER = true;

var HUMVAL = -1;
var COMVAL = 1;

var winMatrix = [[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6]];

function reset() {
	for (var x = 0; x < 9; x++) {
		tiles[x].style.background = "#fff";
		state[x] = 0;
	}

	for (var y = 0; y < 2; y++) {
		buttons[y].style.width = "15.5vh";
		
		buttons[y].style.margin = "0.5vh";
		buttons[y].style.opacity = "1";
	}

	game = true;
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
		buttons[0].style.width = "0";
		buttons[0].style.margin = "0";
		buttons[0].style.opacity = "0";

		buttons[1].style.width = "32vh";

		if (player == HUMAN){
			tiles[index].style.background = "#22f";
			state[index] = HUMVAL;
		} else {
			tiles[index].style.background = "#f22";
			state[index] = COMVAL;
		}

		if (checkWin(state, player)){
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
	aiturn(state, 0, COMPUTER);
}

function aiturn(board, depth, player) {
	if (checkWin(board, !player)){
		return -10 - depth;
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

			var moveVal = -aiturn(newBoard, depth + 1, !player);

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