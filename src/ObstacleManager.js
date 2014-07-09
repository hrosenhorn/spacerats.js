var _ = require("underscore");
var MapManager = require("./MapManager");

function ObstacleManager(stage, gameContext) {
    this.stage = stage;
    this.gameContext = gameContext;
    this.obstacles = [];
    this.viewportX = 0;

    this.mapManager = new MapManager(this.gameContext);
    this.mapManager.loadLevel();
    this.obstacles = this.mapManager.getObstacles();
}

ObstacleManager.prototype.addObstacle = function(obstacle) {
    this.obstacles.push(obstacle);
};

ObstacleManager.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.updateObstacles();
};

// Future improvement would be to split obstacles in sections as a sliding window
// to avoid checking all entries for visibility
ObstacleManager.prototype.updateObstacles = function () {
    _.each(this.obstacles, function (obstacle) {
        // TODO
    });
};

module.exports = ObstacleManager;