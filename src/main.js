var PIXI = require("../thirdparty/pixi.dev");
var Scroller = require("./Scroller");
var GameContext = require("./GameContext");

function Main() {

    this.gameContext = new GameContext(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = new PIXI.autoDetectRenderer(
        this.gameContext.windowWidth,
        this.gameContext.windowHeight,
        document.getElementById("game-canvas")
    );

    this.loadAssets();
}

Main.prototype.update = function() {
    this.scroller.update();

    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadAssets = function() {
    var assetsToLoad = [
        "assets/background.gif",
        "assets/entity/player-small.png",
        "assets/entity/enemy/propellerrat.json"];
    loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.assetsLoaded.bind(this);
    loader.load();
};

Main.prototype.assetsLoaded = function() {
    this.scroller = new Scroller(this.stage, this.gameContext);

    requestAnimFrame(this.update.bind(this));

};

new Main();