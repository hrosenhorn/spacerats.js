var Background = require("./Background");
var Player = require("./entity/Player");
var KeyHandler = require("./KeyHandler");
var ObstacleManager = require("./ObstacleManager");

function Scroller(stage, gameContext) {
    this.gameContext = gameContext;
    this.viewportX = 0;
    this.scrollSpeed = Scroller.MIN_SCROLL_SPEED;

    this.keyHandler = new KeyHandler();
    this.keyHandler.install();
    this.player = new Player(this.gameContext);
    this.obstacleManager = new ObstacleManager(this.gameContext, this.player);

    this.background = new Background(this.gameContext);

    this.keyHandler.subscribe(KeyHandler.W, this.player.moveUp.bind(this.player), true);
    this.keyHandler.subscribe(KeyHandler.S, this.player.moveDown.bind(this.player), true);
    this.keyHandler.subscribe(KeyHandler.A, this.player.moveLeft.bind(this.player), true);
    this.keyHandler.subscribe(KeyHandler.D, this.player.moveRight.bind(this.player), true);

    stage.addChild(this.background);
    stage.addChild(this.player);
    stage.addChild(this.obstacleManager);
}

Scroller.MIN_SCROLL_SPEED = 2;

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;

    this.background.setViewportX(viewportX);
    this.obstacleManager.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};

Scroller.prototype.update = function() {
    this.moveViewportXBy(this.scrollSpeed);
};

module.exports = Scroller;