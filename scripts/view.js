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
    var balls = ['red', 'yellow', 'blue', 'green', 'purple', 'black'];

    _.times(num, function() {
        var newball = balls[Math.floor(Math.random()*balls.length)];
        do {
            var square = squares[Math.floor(Math.random()*squares.length)];
        }
        while (!targetIsEmpty(square));
        $(square).append("<div class='ball ball-" + newball + "'></div>");
    });

    if(checkIfTheGameIsOver()) {
        console.log("Game is over");
    }
}

var ball;

$('.square').on('click', function() {
    if(ball == undefined) {
        ball = $(this).find('.ball');
        ball.addClass('picked');
    }
    else {
        if($(this).children().length != 0) {
            console.log("There is already a ball");
        }
        else {
            $(ball).removeClass('picked');
            $(this).append(ball);
            

            clearCurrentTurn();
            updateDom();

            var previousScore = score;
            checkBlocks(ballsArray);
            checkVerticalBlocks(ballsArray);
            if(previousScore === score) {
                addMoreBalls(4);
            }
        }
    }
});

function clearCurrentTurn() {
    ball = undefined;
}

// check if target is empty
function targetIsEmpty(target) {
    return $(target).is(':empty');
}

// check if block of 5 balls is ready
function checkBlocks(ar) {
    var rows = _.chunk(ar, 10);
    for(var i = 0; i < rows.length; i++) {
        var match = checkMatches(rows[i]);
        if(match.length > 4) {
            removeBallsFromGame(match);
            updateScore(match.length);
        }
    }
}

function checkMatches(ar) {
    var match = [];
    for(var i = 0; i < ar.length; i++) {
       
        if(typeof ar[i] !== 'boolean'  &&
            typeof ar[i] === 'object') {
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

function checkVerticalBlocks(ar) {
    var vertcalBallsArray = [];
    for(var i = 0; i < 100; i++) {
        for(var j = 0; j < ar.length; j++) {
            var regex = new RegExp("d*" + i + "$");
            if(regex.test(j) === true) {
                vertcalBallsArray.push(ar[j]);
            }
        }
    }
    checkBlocks(vertcalBallsArray);
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

function checkIfTheGameIsOver() {
    var ballsInTheField = _.compact(ballsArray).length;
    if(ballsInTheField > 90) {
        return true;
    }
}
