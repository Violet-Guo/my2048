/**
 * Created by violet on 2016/1/8.
 */

var board = new Array();
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
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
        }
    }

    updateBoardView();
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
        }
}

function generateOneNumber(){
    if(nospace(board))
        return false;

    //���һ��λ��
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    while(true){
        if(0 == board[randx][randy])
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
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

function isgameover(){

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
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i, j, k, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
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
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
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
    if(!canMoveDown())
        return false;

    //movedown
    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j]==0 && noBlockVertical(j, i, k, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}