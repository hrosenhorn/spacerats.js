var PIXI = require("../../../thirdparty/pixi.dev");
var Obstacle = require("../../Obstacle");

function PropellerRat(gameContext) {
    this.gameContext = gameContext;

    var textures = [];
    for (var counter = 0; counter < 8; counter++) {
        textures.push(PIXI.Texture.fromFrame("propellerrat" + (counter + 1) + ".png"));
    }

    Obstacle.call(this, gameContext, textures);
    this.animationSpeed = 1;
}

PropellerRat.constructor = PropellerRat;
PropellerRat.prototype = Object.create(Obstacle.prototype);

module.exports = PropellerRat;
