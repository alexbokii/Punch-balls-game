// init
var squares = $('.square');
addMoreBalls(5);

for(var i = 0; i < squares.length; i++) {
    $(squares[i]).attr('id', 'square' + (i + 1));
}


// base functions

// add balls
function addMoreBalls(num) {
    var balls = ['red', 'yellow', 'blue', 'green'];

    for(var i = 0; i < num; i++) {
        var newball = balls[Math.floor(Math.random()*balls.length)];
        do {
            var square = squares[Math.floor(Math.random()*squares.length)];
        }
        while (!targetIsEmpty(square));
        $(square).append("<div class='ball ball-" + newball + "'></div>");
    }
}

// move balls
var ball;
var target;

$('.square').on('click', function() {
    if(ball == undefined) {
        ball = $(this).find('.ball');
    }
    else {
        $(this).append(ball);
        addMoreBalls(2);
        clearCurrentTurn();
    }
});

function clearCurrentTurn() {
    ball = undefined;
    target = undefined;
}

// check if target is empty
function targetIsEmpty(target) {
    return $(target).is(':empty');
}
