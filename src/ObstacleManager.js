var _ = require("underscore");
var PIXI = require("../thirdparty/pixi.dev");
var MapManager = require("./MapManager");

function ObstacleManager(gameContext) {
    PIXI.DisplayObjectContainer.call(this);
    this.gameContext = gameContext;
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
