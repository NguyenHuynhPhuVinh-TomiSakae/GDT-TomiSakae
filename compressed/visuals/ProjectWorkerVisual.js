var ProjectWorkerVisual = function (a) {
    this.state = {
        progressF: 0
    };
    this.efficiency = 0;
    createjs.Container.apply(this, arguments);
    this.init();
    this.visualData = a
};
(function () {
    var a = ProjectWorkerVisual;
    a.prototype = new createjs.Container;
    a = a.prototype;
    a.init = function () {
        this.alpha = 0;
        this.efficiencyBar = new ProgressBarVisual;
        this.efficiencyBar.alpha = 1 > this.efficiency ? 1 : 0;
        this.efficiencyBar.progress = 0.3;
        this.efficiencyBar.width = 12;
        this.efficiencyBar.height = 70;
        this.efficiencyBar.isHorizontal = !1;
        this.efficiencyBar.x -= 30 / VisualsManager.Divisor;
        this.scaleY = this.scaleX = CanvasManager.globalScale;
        this.addChild(this.efficiencyBar)
    };
    a.save = function () {
        var a = {};
        a.id = this.id;
        a.alpha = this.alpha;
        a.progress = this.efficiencyBar.progress;
        a.efficiencyBarAlpha = this.efficiencyBar.alpha;
        a.state = this.state;
        a.efficiency = this.efficiency;
        a.zone = this.zone;
        a.visualData = this.animation.saveState();
        return a
    };
    a.load = function () {
        this.visualData && (this.zone = this.visualData.zone, this.setPosition(this.visualData.id), this.alpha = this.visualData.alpha, void 0 != this.visualData.efficiencyBarAlpha && (this.efficiencyBar.alpha = this.visualData.efficiencyBarAlpha), this.efficiencyBar.progress = this.visualData.progress,
            this.state = this.visualData.state, this.efficiency = this.visualData.efficiency, this.loadAnimations(), this.animation.loadState(this.visualData.visualData))
    };
    a.loadAnimations = function () {
        var a = 200,
            b = 150,
            d = 250;
        PlatformShim.ISLOWRES && (a = 107, b = 80, d = 133);
        var k = CanvasManager.globalScale;
        0 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontFemale1), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTypingBack1), 1) : 1 === this.id ? this.animation =
            0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackMale2), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleTypingBack1), 1) : 2 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale2), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndOperator1), 1) : 3 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackMale1), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndActor1),
                1) : 4 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontMale2), 1)), this.animation.overlay = {
                    deskImage: this.getSubImage(this.x - 552 / VisualsManager.Divisor * k, this.y - 746 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk2)
                }) : this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleBoardBack1), 1) : 5 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation,
                    this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontMale3), 1)), this.animation.overlay = {
                        deskImage: this.getSubImage(this.x - 998 / VisualsManager.Divisor * k, this.y - 486 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk1)
                    }) : this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTableBack1), 1) : 6 === this.id ? 0 === this.zone ? this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale3), 1) : (this.animation = new CompositeBitmapAnimation,
                        this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable1_pants), 1)), this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable1_body), 1)), this.animation.overlay = {
                            deskImage: this.getSubImage(this.x - 735 / VisualsManager.Divisor * k, this.y - 600 / VisualsManager.Divisor * k, a, a, ResourceKeys.rndDesk1)
                        }) : 7 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale4),
                            1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleTableBack1), 1) : 8 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontFemale2), 1)), this.animation.overlay = {
                                deskImage: this.getSubImage(this.x - 552 / VisualsManager.Divisor * k, this.y - 746 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk2)
                            }) : this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleTableBack2),
                                1) : 9 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontMale4), 1)), this.animation.overlay = {
                                    deskImage: this.getSubImage(this.x - 552 / VisualsManager.Divisor * k, this.y - 746 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk2)
                                }) : (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTableFront1_pants), 1)), this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTableFront1_body),
                                    1)), this.animation.overlay = {
                                        deskImage: this.getSubImage(this.x - 1043 / VisualsManager.Divisor * k, this.y - 765 / VisualsManager.Divisor * k, a, a, ResourceKeys.rndDesk2)
                                    }) : 10 === this.id ? 0 === this.zone ? this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontFemale4), 1) : (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable2_pants), 1)), this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable2_body),
                                        1)), this.animation.overlay = {
                                            deskImage: this.getSubImage(this.x - 1043 / VisualsManager.Divisor * k, this.y - 765 / VisualsManager.Divisor * k, a, a, ResourceKeys.rndDesk2)
                                        }) : this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale1), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleBoardFront1), 1);
        this.animation.gotoAndPlay("loop");
        this.animation.setAlpha(1);
        this.addChild(this.animation)
    };
    a.getSubImage = function (a, b, d, k, m) {
        var l = document.createElement("canvas");
        l.width = d;
        l.height = k;
        l.getContext("2d").drawImage(GameDev.ResourceManager.resources[m], -a / CanvasManager.globalScale, -b / CanvasManager.globalScale);
        a = new Image;
        a.src = l.toDataURL("image/png");
        return a
    };
    a.setPosition = function (a) {
        this.id = a;
        0 === this.zone ? this.setHwLabPosition() : this.setRndLabPosition()
    };
    a.setHwLabPosition = function () {
        var a = CanvasManager.globalScale;
        0 === this.id ? (this.x = 1860 * a, this.y = 920 * a) : 1 === this.id ? (this.x = 1720 * a, this.y = 940 * a) : 2 === this.id ? (this.x = 1400 * a, this.y = 820 * a) : 3 === this.id ? (this.x =
            770 * a, this.y = 850 * a) : 4 === this.id ? (this.x = 1300 * a, this.y = 980 * a) : 5 === this.id ? (this.x = 1240 * a, this.y = 530 * a) : 6 === this.id ? (this.x = 1100 * a, this.y = 640 * a) : 7 === this.id ? (this.x = 1100 * a, this.y = 1040 * a) : 8 === this.id ? (this.x = 800 * a, this.y = 670 * a) : 9 === this.id ? (this.x = 1100 * a, this.y = 850 * a) : 10 === this.id ? (this.x = 1788 * a, this.y = 850 * a) : (this.x = 2100 * a, this.y = 1102 * a);
        this.x /= VisualsManager.Divisor;
        this.y /= VisualsManager.Divisor
    };
    a.setRndLabPosition = function () {
        var a = CanvasManager.globalScale;
        0 === this.id ? (this.x = 820 * a, this.y = 420 *
            a) : 1 === this.id ? (this.x = 420 * a, this.y = 420 * a) : 2 === this.id ? (this.x = 1620 * a, this.y = 900 * a) : 3 === this.id ? (this.x = 1830 * a, this.y = 770 * a) : 4 === this.id ? (this.x = 1520 * a, this.y = 510 * a) : 5 === this.id ? (this.x = 1080 * a, this.y = 955 * a) : 11 === this.id ? (this.x = 1250 * a, this.y = 470 * a) : 6 === this.id ? (this.x = 960 * a, this.y = 560 * a) : 7 === this.id ? (this.x = 1370 * a, this.y = 790 * a) : 8 === this.id ? (this.x = 810 * a, this.y = 800 * a) : 9 === this.id ? (this.x = 1100 * a, this.y = 790 * a) : 10 === this.id && (this.x = 1258 * a, this.y = 700 * a);
        this.x /= VisualsManager.Divisor;
        this.y /= VisualsManager.Divisor
    };
    a.tick = function () {
        this.lastUpdate || (this.lastUpdate = GameManager.gameTime);
        var a = GameManager.gameTime - this.lastUpdate;
        if (!(0 >= a)) {
            var b = this.getAffordanceFactor();
            1 > b && (b *= 2);
            b *= a / 22E3;
            this.efficiency = (this.efficiency + b).clamp(0, 1);
            this.animation.speedFactor != this.efficiency && (this.animation.speedFactor = this.efficiency);
            0 < this.efficiency && 1 > this.alpha && (this.alpha += 0.02, 0.9 < this.alpha && (2 === this.zone ? 0 === this.id ? VisualsManager.levelOverlay.startRndPrinterRightScreen() : 1 === this.id ? VisualsManager.levelOverlay.startRndPrinterLeftScreen() :
                2 === this.id && VisualsManager.levelOverlay.startPrinter() : 0 === this.zone && (0 === this.id ? VisualsManager.levelOverlay.starthwLabTV() : 2 === this.id && VisualsManager.levelOverlay.startHwLabScreenWall())));
            0 === this.efficiency && 0 < this.alpha && (this.alpha -= 0.02, 0.9 > this.alpha && (2 === this.zone ? 0 === this.id ? VisualsManager.levelOverlay.stopRndPrinterRightScreen() : 1 === this.id ? VisualsManager.levelOverlay.stopRndPrinterLeftScreen() : 2 === this.id && VisualsManager.levelOverlay.stopPrinter() : 0 === this.zone && (0 === this.id ? VisualsManager.levelOverlay.stophwLabTV() :
                2 === this.id && VisualsManager.levelOverlay.stopHwLabScreenWall())));
            1 != this.efficiency ? (this.efficiencyBar.progress = this.efficiency, this.efficiencyBar.color = createjs.Graphics.getHSL(80 * this.efficiency, 100, 50), this.efficiencyBar.alpha = (this.efficiencyBar.alpha + 0.01).clamp(0, 0.8)) : 0 != this.efficiencyBar.alpha && (this.efficiencyBar.alpha = (this.efficiencyBar.alpha - 0.01).clamp(0, 1));
            this._doWork(a);
            this.lastUpdate = GameManager.gameTime
        }
    };
    a._doWork = function (a) {
        var b;
        b = a / 1E3 * 1 * this.efficiency;
        a = this.getCurrentProject();
        var d = GameManager.company.licencedPlatforms.filter(function (a) {
            return !0 === a.isCustom && 0 < a.maintenancePoints && 1E6 * a.unitsSold * Sales.consoleUnitPrice > a.currentSalesCash
        });
        a || 0 !== d.length && 2 !== this.zone || (b /= 7);
        this.state.progressF += b;
        b = Math.floor(this.state.progressF);
        0 < b && (this.state.progressF -= b);
        for (var k = 0; k < b; k++) {
            var m = a && 0 < a.remainingPoints;
            if (0 === this.zone && 0 < d.length)
                for (var l = d.length - 1; 0 <= l; l--)
                    if (0 < d[l].maintenancePoints) {
                        d[l].maintenancePoints--;
                        d[l].repairPoints++;
                        0 === d[l].maintenancePoints &&
                            d[l].unitsSold === Math.floor(d[l].currentSalesCash / Sales.consoleUnitPrice) ? UI.removeMaintenanceCard(d[l]) : (UI.updateRepairPoints(d[l]), UI.updateMaintenanceCard(d[l]));
                        this._spawnPoint("t");
                        return
                    } m && (a.remainingPoints--, m = a.startPoints - a.remainingPoints, a.progress = 0 == m ? 0 : m / a.startPoints, 0 >= a.remainingPoints && GameManager.finishProject(a));
            var g;
            2 == this.zone ? (g = a ? "d" : "r", "r" === g && (GameManager.company.researchPoints++, VisualsManager.pulsePointsDisplay(g), VisualsManager.updatePoints()), a && a.id === Research.AAAMarketingCampaign.id &&
                (GameManager.company.currentGame ? GameManager.company.currentGame.hypePoints += 100 / a.startPoints : GameManager.finishProject(a))) : 0 === this.zone && (g = "t", a && a.id === Research.AAACustomHardware.id && (GameManager.company.currentGame ? GameManager.company.currentGame.hypePoints += 50 / a.startPoints : GameManager.finishProject(a)));
            this._spawnPoint(g)
        }
    };
    var b = new MersenneTwister(0);
    a._spawnPoint = function (a) {
        var f = new createjs.Shape;
        f.alpha = 0;
        f.x = 20 * b.random() * b.randomSign();
        f.y = -20 * b.random();
        f.regX = 5;
        f.regY = 5;
        f.scaleX =
            0;
        f.scaleY = 0;
        var d = "t" === a || "e" === a ? TECHNOLOGY_POINTS_COLOR : "d" === a ? DESIGN_POINTS_COLOR : "b" === a ? BUGS_COLOR : RESEARCH_POINTS_COLOR;
        this.zone == GameManager.company.flags.currentZone && Sound.playSpawnSound(a);
        a = f.graphics;
        a.beginFill(d);
        a.beginStroke("black");
        a.setStrokeStyle(0.5);
        a.drawCircle(5, 5, 10);
        a.closePath();
        this.addChild(f);
        var k = this,
            d = [];
        d.push(createjs.Tween.get(f).to({
            y: -80 - 60 * b.random()
        }, 600, createjs.Ease.backIn));
        d.push(createjs.Tween.get(f).to({
            alpha: 1
        }, 150).wait(300).to({
            alpha: 0
        }, 150).call(function () {
            k.removeChild(f)
        }));
        d.push(createjs.Tween.get(f).to({
            scaleX: 1,
            scaleY: 1
        }, 300, createjs.Ease.backOut))
    }
})();