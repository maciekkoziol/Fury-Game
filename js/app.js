
document.addEventListener('DOMContentLoaded', function() {

    var Furry = function () {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    };

    var Coin = function () {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };

    var Game = function () {
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;

        this.index = function (x, y) {
            return x + (y * 10);
        };
        this.showFurry = function () {
            this.hideVisibleFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = function() {
            var self = this;
            this.idSetInterval = setInterval(function() {
                self.moveFurry();
            }, 250);
        }


            this.moveFurry = function() {
                  if (this.furry.direction === "right") {
                        this.furry.x = this.furry.x + 1;
                      } else if (this.furry.direction === "left") {
                        this.furry.x = this.furry.x - 1;
                      } else if (this.furry.direction === "down") {
                        this.furry.y = this.furry.y + 1;
                      } else if (this.furry.direction === "up") {
                        this.furry.y = this.furry.y - 1;
                      }
                  this.showFurry();
                  this.gameOver();
                  this.checkCoinCollision();

                };
                this.hideVisibleFurry = function() {
                  var findFurry = document.querySelector('.furry');
                  if (findFurry !== null) {
                        findFurry.classList.remove('furry');
                      }
                };

            this.turnFurry = function(event) {
                  switch (event.keyCode) {
                        case 37:
                              this.furry.direction = 'left';
                              break;
                            case 39:
                              this.furry.direction = 'right';
                              break;
                            case 38:
                              this.furry.direction = 'up';
                              break;
                            case 40:
                              this.furry.direction = 'down';
                              break;
                          }
                };
            this.checkCoinCollision = function() {
                  if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                        document.querySelector('.coin').classList.remove('coin');
                        this.score++;
                        var score = document.querySelector('#score strong');
                        score.innerText = this.score;
                        var newCoin = new Coin();
                        this.coin = newCoin;
                        this.showCoin();
                      }
                };
            this.gameOver = function() {
                  if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                        clearInterval(this.idSetInterval);
                        this.hideVisibleFurry();
                        var over = document.getElementById('over');
                        over.classList.remove('invisible');
                      }


                };
    };



        var game = new Game();
        game.showFurry();
        game.showCoin();
        game.startGame();

        document.addEventListener('keydown', function(event) {
            game.turnFurry(event);
          });


    });

