// Game play or pause
var gamePause = true;

// Star position X and Y
var starPosX = [-2, 99, 200, 301, 402];
var enemyPosY = [63, 145, 227];


// random a integer
function randomInteger(minimum, maximum) {
  return Math.floor(Math.random()*(maximum - minimum + 1) + minimum);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // coordinate of enemy
    this.x = -100;
    this.getRandomEnemyPostY();

    // speed
    this.getRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed + this.getDifficulty(player)) * dt;

    // when enemy bug reaches end of canvas call reset()
    if (this.x > 505) {
      this.reset();
    }
};

// random posY of enemy
Enemy.prototype.getRandomEnemyPostY = function () {
  var pos = randomInteger(0, 2);
  this.y = enemyPosY[pos];
};

// get random speed of enemy
Enemy.prototype.getRandomSpeed = function () {
  this.speed = randomInteger(60, 180);
};

Enemy.prototype.getDifficulty = function (player) {
  var step = 15;
  return player.playerScore * 15;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy-bug when it reaches end of canvas, move it to back canvas
Enemy.prototype.reset = function () {
  this.x = -200;
  this.getRandomEnemyPostY();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
  // Set player coordinate when starting
  this.playerImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
  ];

  this.startX = 200;
  this.startY = 400;
  // initial playerScore
  this.playerScore = 0;
  this.x = this.startX;
  this.y = this.startY;
  this.sprite = this.playerImages[randomInteger(0, 4)];
};

// Player update coordinate
Player.prototype.update = function () {
  //set x axis boundaries
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > 400) {
    this.x = 400;
  }
  //set y axis boundaries
  else if (this.y > 400) {
    this.y = 400;
  }
  //reset if player reaches water
  else if (this.y < 0) {
    this.reset();
  }
};

//Player render on the screen
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset coordinate player when has collision
Player.prototype.reset = function () {
  this.x = this.startX;
  this.y = this.startY;
};

// Selector class
var Selector = function () {
  this.x = 201;
  this.y = 376;
  this.sprite = 'images/Selector.png';
};

// Render Selector
Selector.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Star class, when player collect a start, score increase by 1
var Star = function () {
  this.getRandomStarPosX();
  this.y = 68;
  this.sprite = 'images/Star.png';
};

Star.prototype.getRandomStarPosX = function () {
  var pos = randomInteger(0, 4);
  console.log(starPosX[pos]);
  this.x = starPosX[pos];
};

Star.prototype.reset = function () {
  this.getRandomStarPosX();
};

Star.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place selector, star
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var selector = new Selector();
var star = new Star();
var allEnemies = [];

// initially enemys and push them to array allEnemies
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
}

// initially new player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        32: 'play/pause',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// switch statement takes the key event listener and adjusts x or y accordingly
Player.prototype.handleInput = function (key) {
  if (key=='play/pause') {
    gamePause=!gamePause;
  }
  if (!gamePause) {
    switch (key) {
      case 'up':
        this.y -= 83;
        break;

      case 'down':
        this.y += 83;
        break;

      case 'left':
        this.x -= 100;
        break;

      case 'right':
        this.x += 100;
        break;

      default:
        break;
    }
  }
};
