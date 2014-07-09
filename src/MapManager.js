var _ = require("underscore");
var Player = require("./entity/Player");

function MapManager(gameContext) {
    this.gameContext = gameContext;
    this.obstables = [];
    this.laneHeight = 0;
    this.laneWidth = 0;
    this.rows = 0;

}

var map = [
  "**********",
  "**********",
  "**********",
  "**********",
  "**********",
  "**********",
  "**********",
  "*******r**",
  "**********",
  "**********"
];

var ObstacleLookup = {
    "r": Player
};

MapManager.prototype.getObstacles = function () {
    return this.obstables;
};

MapManager.prototype.loadLevel = function() {
    var tileWidth = 128;

    var obstables = [];

    // Divide the window height by map lane height + one to be able to "center" the tiles
    this.laneHeight = this.gameContext.windowHeight / (map.length + 1);
    this.laneWidth = map[0].length;

    // For every row in the map
    this.rows = map.length;
    for (var lane = 0; lane < this.rows; lane++) {

        var currentX = lane * tileWidth;
        // For every lane
        for (var index = 0; index < this.laneWidth; index++) {
            var entry = map[lane][index];

            var obstable = ObstacleLookup[entry];
            if (!obstable) {
                continue;
            }

            var o = new obstable(this.gameContext);
            o.position.x = currentX;
            o.position.y = this.laneHeight * lane + this.laneHeight;

            this.obstables.push(o);
        }
    }
};

module.exports = MapManager;