// init
var squares = $('.square');
addMoreBalls(5);

var ballsArray = [];
var score = 0;

for(var i = 0; i < squares.length; i++) {
    $(squares[i]).attr('id', 'square' + (i + 1));
}

// base functions

// add balls
function addMoreBalls(num) {
    var balls = ['red', 'yellow', 'blue', 'green'];

    _.times(num, function() {
        var newball = balls[Math.floor(Math.random()*balls.length)];
        do {
            var square = squares[Math.floor(Math.random()*squares.length)];
        }
        while (!targetIsEmpty(square));
        $(square).append("<div class='ball ball-" + newball + "'></div>");
    });
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
        updateDom();
        checkHorizontalBlocks();
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

// check if block of 5 balls is ready
function checkHorizontalBlocks() {
    var rows = _.chunk(ballsArray, 10);
    for(var i = 0; i < rows.length; i++) {
        var match = checkMatches(rows[i]);
        if(match.length > 4) {
            removeBallsFromGame(match);
            updateScore(match.length);
        }
    }
}

function checkMatches(ar) {
    console.log("ROW:", ar);
    var match = [];
    for(var i = 0; i < ar.length; i++) {
       
        if(typeof ar[i] !== 'boolean'  &&
            typeof ar[i] === 'object') {
            console.log(ar[i]);
            if(typeof ar[i + 1] === 'object' && ar[i].color == ar[i + 1].color ||
                typeof ar[i - 1] === 'object' && ar[i].color == ar[i - 1].color) {
                match.push(ar[i].domEl);
            }
        }
        else {
            if(match.length > 4) {
                return match;
            }
            else {
                match = [];
            }
        }
    }
    return match;
}

function checkVerticalBlocks() {
    var rows = _.chunk(ballsArray, 10);
}

function updateDom() {
    ballsArray = [];
   _.times(100, function(i) {
        var child = $(squares)[i].children;
        if($(squares)[i].children.length == 0) {
            ballsArray.push(false);
        }
        else {
            ballsArray.push({
                'domEl': $(squares)[i].children[0],
                'color': $(squares)[i].children[0].className
            });
        }
   });
};

function removeBallsFromGame(arr) {
    _.times(arr.length, function(i) {
        $(arr[i]).remove();
    });
}

function updateScore(newscore) {
    score += newscore * 2;
    $('.score h3').html(score);
}
