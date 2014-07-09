var PIXI = require("../thirdparty/pixi.dev");

function Obstacle(gameContext, textures) {
    this.gameContext = gameContext;
    this.isActive = false;

    PIXI.MovieClip.call(this, textures);
    this.animationSpeed = 0.05;
    this.viewportX = 0;
}

Obstacle.constructor = Obstacle;
Obstacle.prototype = Object.create(PIXI.MovieClip.prototype);

Obstacle.prototype.setActive = function () {
    this.play();
    this.isActive = true;
};

Obstacle.prototype.setInActive = function () {
    this.stop();
    this.isActive = false;
};




module.exports = Obstacle;