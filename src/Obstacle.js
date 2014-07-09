var PIXI = require("../thirdparty/pixi.dev");

function Obstacle(gameContext, textures) {
    this.gameContext = gameContext;
    this.inStage = false;

    PIXI.MovieClip.call(this, textures);
    this.animationSpeed = 0.05;
    this.gotoAndPlay(0);
    this.viewportX = 0;
}

Obstacle.constructor = Obstacle;
Obstacle.prototype = Object.create(PIXI.MovieClip.prototype);

module.exports = Obstacle;