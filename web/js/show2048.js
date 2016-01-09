/**
 * Created by violet on 2016/1/8.
 */

function showNumberWithAnimation(i, j, number){
    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css('background-color', getNumberBackgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}