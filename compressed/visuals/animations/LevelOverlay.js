var LevelOverlay = function (a) {
    this.centerOverlay = new createjs.Container;
    this.leftOverlay = new createjs.Container;
    this.rightOverlay = new createjs.Container;
    this.company = a;
    this.initAnimations();
    a.levelOverlay && this.loadState(a.levelOverlay)
};
(function () {
    var a = LevelOverlay.prototype;
    a.initAnimations = function () {
        var a = GameManager.company.currentLevel,
            c = CanvasManager.globalScale;
        if (2 === a || 3 === a) this.airConAnimation1 = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.airCon)), this.airConAnimation1.scaleX = c, this.airConAnimation1.scaleY = c, this.airConAnimation1.x = VisualsManager.toScreenCoordinates(84, c), this.airConAnimation1.y = VisualsManager.toScreenCoordinates(-2, c), this.airConAnimation2 = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.airCon)),
            this.airConAnimation2.scaleX = c, this.airConAnimation2.scaleY = c, this.airConAnimation2.x = VisualsManager.toScreenCoordinates(406, c), this.airConAnimation2.y = VisualsManager.toScreenCoordinates(-188, c);
        1 < a && (this.waterCoolerAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.waterCooler)), this.waterCoolerAnimation.scaleX = c, this.waterCoolerAnimation.scaleY = c);
        4 === a && (GameManager.company.flags.hwLabUnlocked && (this.hwLabScreenWallAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwLabScreenWall)),
            this.hwLabScreenWallAnimation.scaleX = c, this.hwLabScreenWallAnimation.scaleY = c, this.hwLabScreenWallAnimation.x = VisualsManager.toScreenCoordinates(503, c), this.hwLabScreenWallAnimation.y = VisualsManager.toScreenCoordinates(182, c), this.hwLabTVAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwTV)), this.hwLabTVAnimation.scaleX = c, this.hwLabTVAnimation.scaleY = c, this.hwLabTVAnimation.x = VisualsManager.toScreenCoordinates(2298, c), this.hwLabTVAnimation.y = VisualsManager.toScreenCoordinates(788,
                c), this.hwLabTVAnimationCenter = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwTV)), this.hwLabTVAnimationCenter.scaleX = c, this.hwLabTVAnimationCenter.scaleY = c, this.hwLabTVAnimationCenter.x = VisualsManager.toScreenCoordinates(-262, c), this.hwLabTVAnimationCenter.y = VisualsManager.toScreenCoordinates(788, c)), GameManager.company.flags.rndLabUnlocked && (this.printerAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.printer)), this.printerAnimation.scaleX = c, this.printerAnimation.scaleY =
                    c, this.printerAnimation.x = VisualsManager.toScreenCoordinates(608, c), this.printerAnimation.y = VisualsManager.toScreenCoordinates(435, c), this.rndPrinterLeftScreen = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndPrinterLeftScreen)), this.rndPrinterLeftScreen.scaleX = c, this.rndPrinterLeftScreen.scaleY = c, this.rndPrinterLeftScreen.x = VisualsManager.toScreenCoordinates(395, c), this.rndPrinterLeftScreen.y = VisualsManager.toScreenCoordinates(311, c), this.rndPrinterRightScreen = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndPrinterRightScreen)),
                    this.rndPrinterRightScreen.scaleX = c, this.rndPrinterRightScreen.scaleY = c, this.rndPrinterRightScreen.x = VisualsManager.toScreenCoordinates(747, c), this.rndPrinterRightScreen.y = VisualsManager.toScreenCoordinates(311, c)));
        var f = this,
            a = GameManager.company.currentLevel;
        4 === a && (GameManager.company.flags.hwLabUnlocked && (this.leftOverlay.addChild(this.hwLabScreenWallAnimation), this.leftOverlay.addChild(this.hwLabTVAnimation), this.centerOverlay.addChild(this.hwLabTVAnimationCenter)), GameManager.company.flags.rndLabUnlocked &&
            (this.rightOverlay.addChild(this.rndPrinterLeftScreen), this.rightOverlay.addChild(this.rndPrinterRightScreen), this.rightOverlay.addChild(this.printerAnimation)));
        if (2 === a || 3 === a) this.centerOverlay.addChild(this.airConAnimation1), this.centerOverlay.addChild(this.airConAnimation2), this.airConAnimation1.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "airConAnimation1")
        }, this.airConAnimation2.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "airConAnimation2")
        };
        1 < a && (4 === a ? (this.waterCoolerAnimation.x =
            1541 / VisualsManager.Divisor * c, this.waterCoolerAnimation.y = 440 / VisualsManager.Divisor * c) : (this.waterCoolerAnimation.x = 1501 / VisualsManager.Divisor * c, this.waterCoolerAnimation.y = 211 / VisualsManager.Divisor * c), this.centerOverlay.addChild(this.waterCoolerAnimation), this.waterCoolerAnimation.onAnimationEnded = function (a, b) {
                f.endedAnimation.call(f, a, b, "waterCoolerAnimation")
            });
        this.airConAnimation1 && (this.airConAnimation1.gotoAndStop("loop"), this.airConAnimation2.gotoAndStop("loop"), this.airConAnimation1.setAlpha(0),
            this.airConAnimation2.setAlpha(0));
        this.waterCoolerAnimation && (this.waterCoolerAnimation.gotoAndStop("loop"), this.waterCoolerAnimation.setAlpha(1));
        this.hwLabScreenWallAnimation && (this.hwLabScreenWallAnimation.gotoAndStop("loop"), this.hwLabScreenWallAnimation.setAlpha(0), this.hwLabTVAnimation.gotoAndStop("loop"), this.hwLabTVAnimation.setAlpha(0), this.hwLabTVAnimationCenter.gotoAndStop("loop"), this.hwLabTVAnimationCenter.setAlpha(0));
        this.printerAnimation && (this.printerAnimation.gotoAndStop("loop"),
            this.printerAnimation.setAlpha(0), this.rndPrinterLeftScreen.gotoAndStop("loop"), this.rndPrinterLeftScreen.setAlpha(0), this.rndPrinterRightScreen.gotoAndStop("loop"), this.rndPrinterRightScreen.setAlpha(0))
    };
    a.startAirCon1 = function () {
        this.airConAnimation1 && (this.airConAnimation1.setAlpha(1), this.airConAnimation1.playStoryBoard(["loop"]))
    };
    a.startHwLabScreenWall = function () {
        this.hwLabScreenWallAnimation.paused && (this.hwLabScreenWallAnimation.setAlpha(1), this.hwLabScreenWallAnimation.playStoryBoard(["loop"]))
    };
    a.stopHwLabScreenWall = function () {
        this.hwLabScreenWallAnimation.paused || (this.hwLabScreenWallAnimation.setAlpha(0), this.hwLabScreenWallAnimation.paused = !0)
    };
    a.starthwLabTV = function () {
        this.hwLabTVAnimation.paused && (this.hwLabTVAnimation.setAlpha(1), this.hwLabTVAnimation.playStoryBoard(["loop"]), this.hwLabTVAnimationCenter.setAlpha(1), this.hwLabTVAnimationCenter.playStoryBoard(["loop"]))
    };
    a.stophwLabTV = function () {
        this.hwLabTVAnimation.paused || (this.hwLabTVAnimation.setAlpha(0), this.hwLabTVAnimation.paused = !0, this.hwLabTVAnimationCenter.setAlpha(0), this.hwLabTVAnimationCenter.paused = !0)
    };
    a.startPrinter = function () {
        this.printerAnimation.paused && (this.printerAnimation.setAlpha(1), this.printerAnimation.playStoryBoard(["loop"]))
    };
    a.stopPrinter = function () {
        this.printerAnimation.paused || (this.printerAnimation.setAlpha(0), this.printerAnimation.paused = !0)
    };
    a.startRndPrinterLeftScreen = function () {
        this.rndPrinterLeftScreen.paused && (this.rndPrinterLeftScreen.setAlpha(1), this.rndPrinterLeftScreen.playStoryBoard(["loop"]))
    };
    a.stopRndPrinterLeftScreen = function () {
        this.rndPrinterLeftScreen.paused || (this.rndPrinterLeftScreen.setAlpha(0), this.rndPrinterLeftScreen.paused = !0)
    };
    a.startRndPrinterRightScreen = function () {
        this.rndPrinterRightScreen.paused && (this.rndPrinterRightScreen.setAlpha(1), this.rndPrinterRightScreen.playStoryBoard(["loop"]))
    };
    a.stopRndPrinterRightScreen = function () {
        this.rndPrinterRightScreen.paused || (this.rndPrinterRightScreen.setAlpha(0), this.rndPrinterRightScreen.paused = !0)
    };
    a.startAirCon2 = function () {
        this.airConAnimation2 &&
            (this.airConAnimation2.setAlpha(1), this.airConAnimation2.playStoryBoard(["loop"]))
    };
    a.startWaterCooler = function () {
        this.waterCoolerAnimation && !0 === this.waterCoolerAnimation.paused && this.waterCoolerAnimation.playStoryBoard(["loop"])
    };
    a.endedAnimation = function (a, c, f) {
        "loop" === a.currentAnimation && "airConAnimation1" !== f && "airConAnimation2" !== f && "waterCoolerAnimation" === f && this.waterCoolerAnimation.gotoAndStop("loop")
    };
    a.saveState = function () {
        var a = {};
        this.airConAnimation1 && (a.airConAnimation1 = this.airConAnimation1.saveState());
        this.airConAnimation2 && (a.airConAnimation2 = this.airConAnimation2.saveState());
        this.waterCoolerAnimation && (a.waterCoolerAnimation = this.waterCoolerAnimation.saveState());
        this.hwLabScreenWallAnimation && (a.hwLabScreenWallAnimation = this.hwLabScreenWallAnimation.saveState());
        this.hwLabTVAnimation && (a.hwLabTVnimation = this.hwLabTVAnimation.saveState());
        this.printerAnimation && (a.printerAnimation = this.printerAnimation.saveState());
        this.rndPrinterLeftScreen && (a.rndPrinterLeftScreen = this.rndPrinterLeftScreen.saveState());
        this.rndPrinterRightScreen && (a.rndPrinterRightScreen = this.rndPrinterRightScreen.saveState());
        return a
    };
    a.loadState = function (a) {
        if (a) {
            if (2 === GameManager.company.currentLevel || 3 === GameManager.company.currentLevel) this.airConAnimation1.loadState(a.airConAnimation1), this.airConAnimation2.loadState(a.airConAnimation2);
            1 < GameManager.company.currentLevel && this.waterCoolerAnimation.loadState(a.waterCoolerAnimation);
            4 === GameManager.company.currentLevel && GameManager.company.flags.hwLabUnlocked && (this.hwLabScreenWallAnimation.loadState(a.hwLabScreenWallAnimation),
                this.hwLabTVAnimation.loadState(a.hwLabTVnimation), this.hwLabTVAnimationCenter.loadState(a.hwLabTVnimation));
            4 === GameManager.company.currentLevel && GameManager.company.flags.rndLabUnlocked && (this.printerAnimation.loadState(a.printerAnimation), this.rndPrinterLeftScreen.loadState(a.rndPrinterLeftScreen), this.rndPrinterRightScreen.loadState(a.rndPrinterRightScreen))
        }
    }
})();