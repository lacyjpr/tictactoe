function setDifficulty(e){game.difficulty=e.value}function reset(){for(var e=0;e<9;e++)squares[e].innerHTML="",game.board[e]=0;game.running=!0,game.humSymbol="X",game.comSymbol="O",document.getElementById("win").style.display="none",document.getElementById("lose").style.display="none",document.getElementById("draw").style.display="none"}function take(e){if(game.running)for(var a=0;a<9;a++)a==e&&0==game.board[a]&&(set(e,game.human),callAI())}function set(e,a){game.running&&0==game.board[e]&&(a==game.human?(squares[e].style.color="#22f",squares[e].innerHTML=game.humSymbol,game.board[e]=game.HUMVAL):(squares[e].style.color="#f22",squares[e].innerHTML=game.comSymbol,game.board[e]=game.COMVAL),!checkWin(game.board,a)&&checkFull(game.board)&&(document.getElementById("draw").style.display="block",game.draw.play()),checkWin(game.board,a)&&(a==game.human?(document.getElementById("win").style.display="block",game.win.play()):(document.getElementById("lose").style.display="block",game.lose.play()),game.running=!1))}function checkWin(e,a){for(var n=a==game.human?game.HUMVAL:game.COMVAL,m=0;m<8;m++){for(var t=!0,o=0;o<3;o++)if(e[game.winMatrix[m][o]]!=n){t=!1;break}if(t)return!0}return!1}function checkFull(e){for(var a=0;a<9;a++)if(0==e[a])return!1;return!0}function callAI(){return"easy"==game.difficulty?void randomMove():"medium"==game.difficulty?100*Math.random()<=50?void miniMax(game.board,0,game.computer):void randomMove():void miniMax(game.board,0,game.computer)}function getEmpties(){game.empties=[];for(var e=0;e<9;e++)0==game.board[e]&&game.empties.push(e)}function randomMove(){getEmpties(),set(game.empties[Math.floor(Math.random()*game.empties.length)],game.computer)}function miniMax(e,a,n){if(checkWin(e,!n))return-10+a;if(checkFull(e))return 0;for(var m=n==game.human?game.HUMVAL:game.COMVAL,t=-(1/0),o=0,i=0;i<9;i++)if(0==e[i]){var r=e.slice();r[i]=m;var l=-miniMax(r,a+1,!n);l>t&&(t=l,o=i)}return 0==a&&set(o,game.computer),t}var game={board:[0,0,0,0,0,0,0,0,0],running:!0,human:!1,computer:!0,HUMVAL:-1,COMVAL:1,humSymbol:"X",comSymbol:"O",difficulty:"easy",empties:[],winMatrix:[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],win:new Audio("/tictactoe/media/win.mp3"),lose:new Audio("/tictactoe/media/lose.mp3"),draw:new Audio("/tictactoe/media/draw.mp3")},squares=document.getElementsByClassName("square"),playerX=document.getElementById("playerX"),playerO=document.getElementById("playerO");document.getElementById("win").style.display="none",document.getElementById("lose").style.display="none",document.getElementById("draw").style.display="none";for(var i=0;i<squares.length;i++)!function(e){squares[e].addEventListener("click",function(){take(e)})}(i);