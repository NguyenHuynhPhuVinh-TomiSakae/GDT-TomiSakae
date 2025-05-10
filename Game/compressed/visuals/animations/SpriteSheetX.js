var SpriteSheetX = function (a) {
    createjs.SpriteSheet.apply(this, arguments);
    this.targetFPS = a.targetFPS;
    this.baseImage = a.baseImage
};
(function () {
    SpriteSheetX.prototype = new createjs.SpriteSheet
})();