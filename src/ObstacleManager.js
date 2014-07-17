var _ = require("underscore");
var PIXI = require("../thirdparty/pixi.dev");
var MapManager = require("./MapManager");

function ObstacleManager(gameContext, player) {
    PIXI.DisplayObjectContainer.call(this);
    this.gameContext = gameContext;
    this.player = player;
    this.obstacles = [];
    this.viewportX = 0;

    this.mapManager = new MapManager(this.gameContext);
    this.mapManager.loadLevel();
    this.obstacles = this.mapManager.getObstacles();

    this.SLICE_WIDTH = 128;
    this.VIEWPORT_NUM_SLICES = Math.ceil(gameContext.windowWidth / this.SLICE_WIDTH) + 1;
}

ObstacleManager.constructor = ObstacleManager;
ObstacleManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

ObstacleManager.prototype.addObstacle = function (obstacle) {
    this.obstacles.push(obstacle);
};

ObstacleManager.prototype.setViewportX = function (viewportX) {
    this.viewportX = viewportX;

    var prevViewportSliceX = this.viewportSliceX;
    this.viewportSliceX = Math.floor(this.viewportX / this.SLICE_WIDTH);

    this.removeOldSlices(prevViewportSliceX);
    this.addNewSlices();
    this.checkCollision();
};


ObstacleManager.prototype.collides = function (o1, o2) {
    var dx = Math.round(o1.position.x - o2.position.x);
    var dy = Math.round(o1.position.y - o2.position.y);

    var minDistance = o1.getBoundingRadius() + o2.getBoundingRadius();

    return dx * dx + dy * dy < minDistance * minDistance;
};

ObstacleManager.prototype.checkCollision = function () {
  // We only bother checking if player or

    for (var i = this.viewportSliceX, sliceIndex = 0;
         i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES;
         i++, sliceIndex++)
    {
        var enemies = this.obstacles[i];
        var self = this;
        _.each(enemies, function (obstacle) {
            if (self.collides(self.player, obstacle)) {
                obstacle.explode();
            }
        });
    }
};

ObstacleManager.prototype.addNewSlices = function () {
    var firstX = -(this.viewportX % this.SLICE_WIDTH);

    for (var i = this.viewportSliceX, sliceIndex = 0;
         i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES;
         i++, sliceIndex++)
    {

        var entries = this.obstacles[i];

        var self = this;
        _.each(entries, function (obstacle) {
           if (obstacle.isActive) {
               obstacle.position.x = firstX + (sliceIndex * self.SLICE_WIDTH);
           } else {
               obstacle.position.x = firstX + (sliceIndex * self.SLICE_WIDTH);
               obstacle.setActive();
               self.addChild(obstacle);
           }
        });
    }
};

ObstacleManager.prototype.removeOldSlices = function(prevViewportSliceX) {
    var numOldSlices = this.viewportSliceX - prevViewportSliceX;

    if (numOldSlices > this.VIEWPORT_NUM_SLICES)
    {
        numOldSlices = this.VIEWPORT_NUM_SLICES;
    }

    for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++)
    {
        var entries = this.obstacles[i];

        var self = this;
        _.each(entries, function (obstacle) {
            if (obstacle.isActive) {
                obstacle.setInActive();
                self.removeChild(obstacle);
            }
        });
    }
};

module.exports = ObstacleManager;
