/**
 * Created by violet on 2016/1/8.
 */

function showNumberWithAnimation(i, j, number){
    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css('background-color', getNumberBackgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox, toy),
        left:getPosLeft(tox, toy)
    }, 200);    //200代表这个动作将在200毫秒内完成
}

function updateScore(score){
    $('#score').text(score);
}