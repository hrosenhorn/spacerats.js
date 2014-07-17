var PIXI = require("../thirdparty/pixi.dev");

function Obstacle(gameContext, textures) {
    this.gameContext = gameContext;
    this.isActive = false;

    PIXI.MovieClip.call(this, textures);
    this.animationSpeed = 0.05;
    this.viewportX = 0;

    /*
        Draws a circle around the sprite to visualize the bounding circle used for collision detection
    this.boundingCircle = new PIXI.Graphics();
    this.boundingCircle.lineStyle(0);
    this.boundingCircle.beginFill(0xFFFF0B, 0.5);
    this.boundingCircle.drawCircle(this.textures[0].width / 2, this.textures[0].height / 2, this.textures[0].width / 2);
    this.boundingCircle.endFill();
    this.addChild(this.boundingCircle);
    */
}

Obstacle.constructor = Obstacle;
Obstacle.prototype = Object.create(PIXI.MovieClip.prototype);

Obstacle.prototype.explode = function () {
    this.textures = [PIXI.Texture.fromImage("assets/smack.png")];
};

Obstacle.prototype.setActive = function () {
    this.play();
    this.isActive = true;
};

Obstacle.prototype.setInActive = function () {
    this.stop();
    this.isActive = false;
};

Obstacle.prototype.getBoundingRadius = function () {
    return this.textures[0].width;
};



module.exports = Obstacle;