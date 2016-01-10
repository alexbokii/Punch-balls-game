// Random init

var balls = ['red', 'yellow', 'blue', 'green'];
var selectedBalls = [];

for(var i = 0; i < 3; i++) {
    var initBall = balls[Math.floor(Math.random()*balls.length)];
    selectedBalls.push(initBall);
}

var squares = $('.square');
var selectedSquares = [];
for(var i = 0; i < 3; i++) {
    var square = squares[Math.floor(Math.random()*squares.length)];
    selectedSquares.push(square);
}

$.each(selectedSquares, function(i, item){
    $(item).append("<div class='ball ball-" + selectedBalls[i] + "'></div>");
})

// Draggable

$('.square').attr('draggable', 'true');