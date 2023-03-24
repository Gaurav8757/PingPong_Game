// DEFINING VARIABLES
var bar1 = document.getElementById("bar-1");
var bar2 = document.getElementById("bar-2");
var ball = document.getElementById("ball");
// slider movement
var movement = 290;

const thisBar1 = "Bar-1";
const thisBar2 = "Bar-2";
const storeName = "abc";
const storeScore = 123;

let whichBar;
let moveX = 7;
let moveY = 7;
let ballMoving;
let border = 12;
let score;
let highScore;
let gameStart = false;
// Storage create to store Score of winner
window.localStorage.setItem(storeScore, "null");
window.localStorage.setItem(storeScore, "null");
(function () {
  highScore = localStorage.getItem(storeScore);
  whichBar = localStorage.getItem(storeName);
  if (whichBar === "null" || highScore === "null") {
    alert("This is your first game");
    highScore = 0;
    whichBar = thisBar1;
  } else {
    alert(whichBar + " has maximum score of " + highScore * 100);
  }
  gameReset(whichBar);
})();
// Reset Function created
function gameReset(barName) {
  bar1.style.left = (window.innerWidth - bar1.offsetWidth) / 2 + "px";
  bar2.style.left = (window.innerWidth - bar2.offsetWidth) / 2 + "px";
  ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";

  if (barName === thisBar1) {
    ball.style.top =
      bar2.getBoundingClientRect().y -
      bar2.getBoundingClientRect().height +
      "px";
    moveY = -2;
  } else if (barName === thisBar2) {
    ball.style.top = bar1.getBoundingClientRect().height + "px";
    moveY = 2;
  }

  score = 0;
  gameStart = false;
}
// Adding ENTER OR KEYBOARD EVENT-LISTENER
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 68 || event.keyCode === 39) {
    if (
      parseInt(bar1.style.left) <
      window.innerWidth - bar1.offsetWidth - border
    ) {
      bar1.style.left = parseInt(bar1.style.left) + movement + "px";
      bar2.style.left = bar1.style.left;
    }
  }

  if (event.keyCode === 65 || event.keyCode === 37) {
    if (parseInt(bar1.style.left) > border) {
      bar1.style.left = parseInt(bar1.style.left) - movement + "px";
      bar2.style.left = bar1.style.left;
    }
  }

  if (event.keyCode === 13) {
    if (!gameStart) {
      gameStart = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let bar1Height = bar1.offsetHeight;
      let bar2Height = bar2.offsetHeight;
      let bar1Width = bar2.offsetWidth;
      let bar2Width = bar2.offsetWidth;
      // Ball Moving Function
      ballMoving = setInterval(function () {
        let bar1X = bar1.getBoundingClientRect().x;
        let bar2X = bar2.getBoundingClientRect().x;

        let ballCentre = ballX + ballDia / 2;

        ballX += moveX;
        ballY += moveY;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        if (ballX + ballDia > window.innerWidth || ballX < 0) {
          moveX = -moveX;
        }

        if (ballY <= bar1Height) {
          moveY = -moveY;
          score++;

          if (ballCentre < bar1X || ballCentre > bar1X + bar1Width) {
            dataStoring(score, thisBar2);
          }
        }
        if (ballY + ballDia >= window.innerHeight - bar2Height) {
          moveY = -moveY;
          score++;

          if (ballCentre < bar2X || ballCentre > bar2X + bar2Width) {
            dataStoring(score, thisBar1);
          }
        }
      }, 10);
    }
  }
});
// Touch Screen Controls
let touchStartX = null;
let touchMoveX = null;

document.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchmove", function (event) {
  touchMoveX = event.touches[0].clientX;
});

document.addEventListener("touchend", function (event) {
  if (touchStartX && touchMoveX) {
    let diffX = touchStartX - touchMoveX;

    if (diffX > 0) {
      // swipe left
      if (parseInt(bar1.style.left) > border) {
        bar1.style.left = parseInt(bar1.style.left) - movement + "px";
        bar2.style.left = bar1.style.left;
      }
    } else if (diffX < 0) {
      // swipe right
      if (
        parseInt(bar1.style.left) <
        window.innerWidth - bar1.offsetWidth - border
      ) {
        bar1.style.left = parseInt(bar1.style.left) + movement + "px";
        bar2.style.left = bar1.style.left;
      }
    }
  }

  touchStartX = null;
  touchMoveX = null;

  if (event.target.id === "startBtn" && !gameStart) {
    gameStart = true;
    let ballRect = ball.getBoundingClientRect();
    let ballX = ballRect.x;
    let ballY = ballRect.y;
    let ballDia = ballRect.width;

    let bar1Height = bar1.offsetHeight;
    let bar2Height = bar2.offsetHeight;
    let bar1Width = bar2.offsetWidth;
    let bar2Width = bar2.offsetWidth;
    // Ball Moving Function
    ballMoving = setInterval(function () {
      let bar1X = bar1.getBoundingClientRect().x;
      let bar2X = bar2.getBoundingClientRect().x;

      let ballCentre = ballX + ballDia / 2;

      ballX += moveX;
      ballY += moveY;

      ball.style.left = ballX + "px";
      ball.style.top = ballY + "px";

      if (ballX + ballDia > window.innerWidth || ballX < 0) {
        moveX = -moveX;
      }

      if (ballY <= bar1Height) {
        moveY = -moveY;
        score++;

        if (ballCentre < bar1X || ballCentre > bar1X + bar1Width) {
          dataStoring(score, thisBar2);
        }
      }
      if (ballY + ballDia >= window.innerHeight - bar2Height) {
        moveY = -moveY;
        score++;

        if (ballCentre < bar2X || ballCentre > bar2X + bar2Width) {
          dataStoring(score, thisBar1);
        }
      }
    }, 10);
  }
});

document.addEventListener("touchmove", function (event) {
  event.preventDefault(); // Prevent scrolling on touch devices

  // Get the touch location
  var touchLocation = event.touches[0].pageX;

  // Move the bar based on the touch location
  if (touchLocation > lastTouchLocation) {
    if (
      parseInt(bar1.style.left) <
      window.innerWidth - bar1.offsetWidth - border
    ) {
      bar1.style.left = parseInt(bar1.style.left) + movement + "px";
      bar2.style.left = bar1.style.left;
    }
  } else {
    if (parseInt(bar1.style.left) > border) {
      bar1.style.left = parseInt(bar1.style.left) - movement + "px";
      bar2.style.left = bar1.style.left;
    }
  }

  // Store the last touch location for comparison with the next touch
  lastTouchLocation = touchLocation;
});

document.addEventListener("touchstart", function (event) {
  if (!gameStart) {
    gameStart = true;
    let ballRect = ball.getBoundingClientRect();
    let ballX = ballRect.x;
    let ballY = ballRect.y;
    let ballDia = ballRect.width;

    let bar1Height = bar1.offsetHeight;
    let bar2Height = bar2.offsetHeight;
    let bar1Width = bar2.offsetWidth;
    let bar2Width = bar2.offsetWidth;

    // Ball Moving Function
    ballMoving = setInterval(function () {
      let bar1X = bar1.getBoundingClientRect().x;
      let bar2X = bar2.getBoundingClientRect().x;

      let ballCentre = ballX + ballDia / 2;

      ballX += moveX;
      ballY += moveY;

      ball.style.left = ballX + "px";
      ball.style.top = ballY + "px";

      if (ballX + ballDia > window.innerWidth || ballX < 0) {
        moveX = -moveX;
      }

      if (ballY <= bar1Height) {
        moveY = -moveY;
        score++;

        if (ballCentre < bar1X || ballCentre > bar1X + bar1Width) {
          dataStoring(score, thisBar2);
        }
      }
      if (ballY + ballDia >= window.innerHeight - bar2Height) {
        moveY = -moveY;
        score++;

        if (ballCentre < bar2X || ballCentre > bar2X + bar2Width) {
          dataStoring(score, thisBar1);
        }
      }
    }, 10);
  }
});

function dataStoring(scoreObtained, winningBar) {
  // Check if the score obtained is greater than the high score
  if (score > highScore) {
    highScore = score;
    // Set the winning bar and high score in localStorage
    localStorage.setItem(storeName, winningBar);
    localStorage.setItem(storeScore, highScore);
  }
  // Clear the interval set by ballMoving
  clearInterval(ballMoving);
  // Reset the game with the winning bar
  gameReset(winningBar);
  // Show the winning player and score
  alert(
    winningBar +
      " wins with score of " +
      scoreObtained * 100 +
      ". Max Score is: " +
      highScore * 100
  );
}
