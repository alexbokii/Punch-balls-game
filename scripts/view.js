// init
var squares = $('.square');
addMoreBalls(5);
var ballsArray = [];

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
        if(match > 4) {
            alert("Win");
        }
    }
}

function checkMatches(ar) {
    
    var match = 1;
    for(var i = 0; i < ar.length; i++) {
       
        if(typeof ar[i] !== 'boolean' &&
            typeof ar[i + 1] !== 'boolean' &&
            typeof ar[i] === 'object' &&
            typeof ar[i + 1] === 'object') {
            
            if(ar[i].color == ar[i + 1].color) {
                match ++;
                console.log("Adding: ", match);
            }
            if(match > 4) {
                return match;
            }
        }
        else {
            match = 1;
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

updateDom();
