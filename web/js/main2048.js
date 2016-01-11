/**
 * Created by violet on 2016/1/8.
 */

var board = new Array();
var hasConflicted = new Array();
var score = 0;

$(document).ready(function(){
   newgame();
});

function newgame(){
    //��ʼ�����̸�
    init();

    //��������������в�����������
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
        hasConflicted[i] = new Array();
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    updateScore(score);
}

function updateBoardView(){

    $(".number-cell").remove();
    for( var i = 0; i < 4; i ++ )
        for( var j = 0; j < 4; j ++ ){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i,j) + 50 );
                theNumberCell.css('left', getPosLeft(i,j) + 50 );
            }
            else{
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i,j));
                theNumberCell.css('left', getPosLeft(i,j));
                theNumberCell.css('background-color', getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color', getNumberColor( board[i][j] ) );
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
}

function generateOneNumber(){
    if(nospace(board))
        return false;

    //���һ��λ��
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while(times < 50){
        if(0 == board[randx][randy])
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }

    if(times == 50){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    //���һ������
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    //�����λ����ʾ�������

    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37: //left
            if(moveLeft()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38: //up
            if(moveUp()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39: //right
            if(moveRight()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40: //down
            if(moveDown()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default: //default
            break;
    }
});

function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("gameover!");
    newgame();
}

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
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //addscore
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);

    return true;
}

function moveRight(){
    if(!canMoveRight(board))
        return false;

    //moveright
    for(var i = 0; i < 4; i++){
        for(var j = 2; j>=0; j--){
            if(board[i][j]!=0){
                for(var k = 3; k > j; k--){
                    if(board[i][k]==0 && noBlockHorizontal(i, j, k, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //addscore
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board))
        return false;

    //moveup
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j]!=0){
                for(var k = 0; k < i; k++){
                    if(board[k][j]==0 && noBlockVertical(j, k, i, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //addscore
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board))
        return false;

    //moveDown
    for(var j = 0; j < 4; j ++)
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){

                    if(board[k][j] == 0 && noBlockVertical(j , i , k , board)){
                        showMoveAnimation(i , j , k , j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , i , k , board) && !hasConflicted[k][j]){
                        showMoveAnimation(i , j , k , j);
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        //addscore
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}