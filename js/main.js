function reset(){for(var t=0;t<9;t++)tiles[t].style.background="#fff",state[t]=0;for(var e=0;e<2;e++)buttons[e].style.width="15.5vh",buttons[e].style.margin="0.5vh",buttons[e].style.opacity="1";game=!0}function claim(t){if(game)for(var e=0;e<9;e++)tiles[e]==t&&0==state[e]&&(set(e,HUMAN),callAI())}function set(t,e){game&&0==state[t]&&(buttons[0].style.width="0",buttons[0].style.margin="0",buttons[0].style.opacity="0",buttons[1].style.width="32vh",e==HUMAN?(tiles[t].style.background="#22f",state[t]=HUMVAL):(tiles[t].style.background="#f22",state[t]=COMVAL),checkWin(state,e)&&(game=!1))}function checkWin(t,e){for(var n=e==HUMAN?HUMVAL:COMVAL,a=0;a<8;a++){for(var r=!0,s=0;s<3;s++)if(t[winMatrix[a][s]]!=n){r=!1;break}if(r)return!0}return!1}function checkFull(t){for(var e=0;e<9;e++)if(0==t[e])return!1;return!0}function callAI(){aiturn(state,0,COMPUTER)}function aiturn(t,e,n){if(checkWin(t,!n))return-10-e;if(checkFull(t))return 0;for(var a=n==HUMAN?HUMVAL:COMVAL,r=-(1/0),s=0,i=0;i<9;i++)if(0==t[i]){var u=t.slice();u[i]=a;var l=-aiturn(u,e+1,!n);l>r&&(r=l,s=i)}return 0==e&&set(s,COMPUTER),r}var tiles=document.getElementsByClassName("tile"),buttons=document.getElementsByClassName("button"),state=[0,0,0,0,0,0,0,0,0],game=!0,HUMAN=!1,COMPUTER=!0,HUMVAL=-1,COMVAL=1,winMatrix=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];