var _ = require("underscore");

function KeyHandler(stage) {
    this.pressed = {};
    this.subscribers = {};
    this.repeater = null;
}

function Subscriber(cbMethod, repeat) {
    this.cbMethod = cbMethod;
    this.repeat = repeat;
}

KeyHandler.prototype.isDown = function (keyCode) {
    return this.pressed[keyCode];
};

KeyHandler.prototype.onKeydown = function (event) {
    var self = this;
    if (!this.pressed[event.keyCode]) {
        this.pressed[event.keyCode] = setInterval(function () {
            self.handleRepeat(event.keyCode)
        }, KeyHandler.REPEAT_RATE);
    }
};

KeyHandler.prototype.handleRepeat = function (keyCode) {
    var entries = this.subscribers[keyCode];
    if (!entries) {
        return;
    }

    _.each(entries, function (entry) {
        entry.cbMethod();
    });
};

KeyHandler.prototype.onKeyup = function (event) {
    clearInterval(this.pressed[event.keyCode]);
    delete this.pressed[event.keyCode];
};

KeyHandler.prototype.install = function () {
    window.addEventListener('keyup', this.onKeyup.bind(this), false);
    window.addEventListener('keydown', this.onKeydown.bind(this), false);
};

KeyHandler.prototype.subscribe = function (keyCode, cbMethod, repeat) {
    if (!this.subscribers[keyCode]) {
        this.subscribers[keyCode] = [];
    }

    this.subscribers[keyCode].push(new Subscriber(cbMethod, repeat));
};

KeyHandler.REPEAT_RATE = 16;


KeyHandler.LEFT = 37;
KeyHandler.UP = 38;
KeyHandler.RIGHT = 39;
KeyHandler.DOWN = 40;

KeyHandler.W = 87;
KeyHandler.A = 65;
KeyHandler.S = 83;
KeyHandler.D = 68;


module.exports = KeyHandler;