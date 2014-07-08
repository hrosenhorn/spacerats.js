var PIXI = require("../thirdparty/pixi.dev");

function Background(gameContext) {
    var texture = PIXI.Texture.fromImage("assets/background.gif");
    PIXI.TilingSprite.call(this, texture, gameContext.windowWidth,  gameContext.windowHeight);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
    this.viewportX = 0;
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.TilingSprite.prototype);

Background.DELTA_X = 0.064;

Background.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Background.DELTA_X);
};


module.exports = Background;