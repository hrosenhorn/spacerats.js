var _ = require("underscore");
var Player = require("./entity/Player");
var PropellerRat = require("./entity/enemy/PropellerRat");


function MapManager(gameContext) {
    this.gameContext = gameContext;
    this.obstables = [];
    this.laneHeight = 0;
    this.laneWidth = 0;
    this.slices = 0;
}

var map = [
  "****************************************",
  "****************************************",
  "****************************************",
  "****************************************",
  "****************************************",
  "****************************************",
  "****************************************",
  "***r**********r***r******************r**",
  "****************************************",
  "****************************************"
];

var ObstacleLookup = {
    "r": PropellerRat
};

MapManager.prototype.getObstacles = function () {
    return this.obstables;
};

MapManager.prototype.loadLevel = function() {

    // Divide the window height by map lane height + one to be able to "center" the tiles
    this.laneHeight = Math.floor(this.gameContext.windowHeight / (map.length + 1));
    this.laneWidth = map[0].length;

    this.slices = map.length;

    for (var index = 0; index < this.laneWidth; index++) {
        this.obstables[index] = [];
    }

    for (var index = 0; index < this.laneWidth; index++) {
        for (var slice = 0; slice < this.slices; slice++) {
            var entry = map[slice][index];

            var obstacleClass = ObstacleLookup[entry];
            if (obstacleClass) {
                var obstacle = new obstacleClass(this.gameContext);
                obstacle.setInActive();
                obstacle.position.y = this.laneHeight * slice + this.laneHeight;
                this.obstables[index].push(obstacle)
            }
        }
    }
};

module.exports = MapManager;
