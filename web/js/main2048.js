/**
 * Created by violet on 2016/1/8.
 */

var board = new Array();
var score = 0;

$(document).ready(function(){
   newgame();
});

function newgame(){
    //初始化棋盘格
    init();

    //在随机两个格子中产生两个数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i = 0 ; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridcell = $("#grid-cell-"+i+"-"+j);
            gridcell.css('top', getPosTop(i, j));
            gridcell.css('left', getPosLeft(i, j));
        }
    }

    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'">');
            var theNumberCell = $('#number-cell'+i+'-'+j);

            if(0 == board[i][j]){
                theNumberCell.css('weight', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j)+50);
                theNumberCell.css('left', getPosLeft(i, j)+50);
            }
            else{
                theNumberCell.css('weight', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber(){
    if(nospace(board))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    while(true){
        if(0 == board[randx][randy])
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    //在随机位置显示随机数字

    return true;
}

$(document).keydown(function(event){
    switch (event.keyCode){
        case 37: //left
            if(moveLeft()){
                generateOneNumber();
                isgameover();
            }
            break;
        case 38: //up
            if(moveUp()){
                generateOneNumber();
                isgameover();
            }
            break;
        case 39: //right
            if(moveRight()){
                generateOneNumber();
                isgameover();
            }
            break;
        case 40: //down
            if(moveDown()){
                generateOneNumber();
                isgameover();
            }
            break;
        default: //default
            break;
    }
});

function moveLeft(){
    if(!canMoveLeft(board))
        return false;

    //moveleft
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] !=0 ){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    return true;
}

function moveUp(){
    if(!canMoveUp(board))
        return false;

    //moveup

    return true;
}