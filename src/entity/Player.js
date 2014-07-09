var PIXI = require("../../thirdparty/pixi.dev");
var Obstacle = require("../Obstacle");

function Player(gameContext) {
    this.gameContext = gameContext;

    Obstacle.call(this, gameContext, [
        PIXI.Texture.fromImage("assets/entity/player-small.png"),
        PIXI.Texture.fromImage("assets/entity/player-small2.png")
    ]);

    this.position.x = 50;
    this.position.y = this.gameContext.windowHeight / 2;
    this.setActive();
}

Player.constructor = Player;
Player.prototype = Object.create(Obstacle.prototype);

Player.DELTA_X = 0.024;
Player.SPEED = 5;

Player.prototype.setViewportX = function (newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;

    this.position.x -= (distanceTravelled * 1);
    if (this.position.x <= 1) {
        this.position.x = 1;
    }
    //console.log("Position x is", this.position.x);
};

Player.prototype.move = function (deltaX, deltaY) {
    this.position.x += deltaX;
    this.position.y += deltaY;

    if (this.position.x < 0) {
        this.position.x = 0
    }

    if (this.position.y < 0) {
        this.position.y = 0
    }

    if (this.position.x > this.gameContext.windowWidth) {
        this.position.x = this.gameContext.windowWidth
    }

    if (this.position.y > this.gameContext.windowHeight) {
        this.position.y = this.gameContext.windowHeight
    }

};

Player.prototype.moveUp = function () {
    this.move(0, -Player.SPEED);
};

Player.prototype.moveDown = function () {
    this.move(0, Player.SPEED);
};

Player.prototype.moveLeft = function () {
    this.move(-Player.SPEED, 0);
};

Player.prototype.moveRight = function () {
    this.move(Player.SPEED, 0);
};

module.exports = Player;