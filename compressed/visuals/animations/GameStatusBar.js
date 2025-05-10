var GameStatusBar = function () {
    this.initialize();
    this.width = 300;
    this.textContainerHeight = this.height = 80;
    this.mainShape = new createjs.Shape;
    this.addChild(this.mainShape);
    this.gameName = new createjs.Text;
    this.gameName.textBaseline = "middle";
    this.addChild(this.gameName);
    var a = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
    this.gameDetailText = new createjs.Text("", "12pt {0}".format(a), "black");
    this.gameDetailText.textAlign = "center";
    this.gameDetailText.textBaseline = "alphabetic";
    this.gameDetailText.text = "No Project".localize();
    this.gameDetailText.x = this.width / 2;
    this.gameDetailText.y = this.textContainerHeight / 2 + 10;
    this.gameDetailText.lineHeight = this.gameDetailText.getMeasuredLineHeight();
    this.addChild(this.gameDetailText);
    this.progressBar = new ProgressBarVisual;
    this.progressBar.height = 20;
    this.progressBar.width = this.width - 60;
    this.progressBar.x = 30;
    this.progressBar.y = this.textContainerHeight - 25;
    this.progressBar.alpha = 0;
    this.addChild(this.progressBar);
    this.stateText = new createjs.Text("", "10pt {0}".format(a), "DimGray");
    this.stateText.x =
        this.width / 2;
    this.stateText.y = this.textContainerHeight - 11;
    this.stateText.textAlign = "center";
    this.stateText.textBaseline = "alphabetic";
    this.addChild(this.stateText);
    a = this.textContainerHeight / 2 - 30;
    this.designPoints = new PointsDisplayVisual(DESIGN_POINTS_COLOR, "black", "Design".localize());
    this.designPoints.x = -30;
    this.designPoints.y = a;
    this.addChild(this.designPoints);
    this.technologyPoints = new PointsDisplayVisual(TECHNOLOGY_POINTS_COLOR, "black", "Technology".localize());
    this.technologyPoints.x = this.width -
        30;
    this.technologyPoints.y = a;
    this.addChild(this.technologyPoints);
    this.bugs = new PointsDisplayVisual(BUGS_COLOR, "black", "Bugs".localize());
    this.bugs.x = this.x - 120;
    this.bugs.y = 0;
    this.bugs.size = 100;
    this.addChild(this.bugs);
    this.enginePoints = new PointsDisplayVisual(TECHNOLOGY_POINTS_COLOR, "black", "Remaining".localize("label for visual which shows 'points remaining'"));
    this.enginePoints.x = this.width / 2 - this.enginePoints.size / 4;
    this.enginePoints.y = this.textContainerHeight + 5;
    this.enginePoints.alpha = 0;
    this.addChild(this.enginePoints);
    this.hypePoints = new HypePointsVisual;
    this.hypePoints.x = this.width / 2 - this.hypePoints.width / 2;
    this.hypePoints.y = this.textContainerHeight;
    this.hypePoints.alpha = 0;
    this.addChildAt(this.hypePoints, 0);
    this.isInvalid = !0
};
(function () {
    GameStatusBar.prototype = new createjs.Container;
    var a = GameStatusBar.prototype;
    a.reset = function () {
        this.finishEngine()
    };
    a.startDevelopment = function () {
        createjs.Tween.get(this.designPoints).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.technologyPoints).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.bugs).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.gameName).to({
            alpha: 1
        }, 400);
        this.stateText.shadow = null;
        this.stateText.color = "DimGray";
        createjs.Tween.get(this.stateText).to({
            alpha: 1
        }, 400)
    };
    a.startEngine =
        function () {
            createjs.Tween.get(this.designPoints).to({
                alpha: 0
            }, 400);
            createjs.Tween.get(this.technologyPoints).to({
                alpha: 0
            }, 400);
            createjs.Tween.get(this.bugs).to({
                alpha: 0
            }, 400);
            createjs.Tween.get(this.enginePoints).to({
                alpha: 1
            }, 400);
            this.updateGameNameText(GameManager.currentEngineDev.name);
            this.gameDetailText.text = "Custom Game Engine".localize();
            createjs.Tween.get(this.gameName).to({
                alpha: 1
            }, 400)
        };
    a.startContract = function () {
        var a = GameManager.currentContract;
        createjs.Tween.get(this.designPoints).to({
            alpha: 1
        },
            400);
        createjs.Tween.get(this.technologyPoints).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.bugs).to({
            alpha: 0
        }, 400);
        this.updateGameNameText(a.name);
        this.gameDetailText.text = "Contract".localize();
        this.stateText.text = "Time Left".localize("label for progressbar");
        this.stateText.shadow = null;
        this.stateText.color = "DimGray";
        createjs.Tween.get(this.stateText).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.gameName).to({
            alpha: 1
        }, 400)
    };
    a.finishContract = function () {
        this.endDevelopment()
    };
    a.finishEngine = function () {
        this.enginePoints.alpha =
            0;
        this.endDevelopment()
    };
    a.endDevelopment = function () {
        this.designPoints.alpha = 0.2;
        this.technologyPoints.alpha = 0.2;
        this.bugs.alpha = 0.2;
        this.gameName.alpha = 0;
        this.stateText.alpha = 0;
        this.progressBar.alpha = 0;
        this.hypePoints.alpha = 0;
        this.gameDetailText.text = "No Project".localize();
        this.designPoints.updatePoints(0);
        this.technologyPoints.updatePoints(0);
        this.bugs.updatePoints(0);
        this.updateProgress(!1);
        GameManager.spawnedPoints = 0
    };
    a.onTick = function () {
        this.isInvalid && (this.redraw(), this.isInvalid = !1)
    };
    a.updateProgress =
        function (a, c, f) {
            f || (f = 400);
            !a || isNaN(a) ? 1 === this.progressBar.alpha && (createjs.Tween.get(this.progressBar).to({
                alpha: 0
            }, f), this.stateText.shadow = null, this.stateText.color = "DimGray") : (c && 0 < a ? createjs.Tween.get(this.progressBar).to({
                progress: a
            }, f) : this.progressBar.progress = a, 0 === this.progressBar.alpha && (createjs.Tween.get(this.progressBar).to({
                alpha: 1
            }, f), this.stateText.color = "white", this.stateText.shadow = new createjs.Shadow("black", 0, 0, 2)))
        };
    a.updateStatusMessage = function (a) {
        this.stateText.text = a;
        this.stateText.lineHeight ||
            (this.stateText.lineHeight = this.stateText.getMeasuredLineHeight());
        0 === this.stateText.alpha && createjs.Tween.get(this.stateText).to({
            alpha: 1
        }, 400)
    };
    a.updateHypePoints = function (a) {
        this.hypePoints.points != a && (this.hypePoints.points = a, this.hypePoints.updateText("Hype {0}".localize("hype {0} points").format(a)));
        0 === this.hypePoints.alpha && createjs.Tween.get(this.hypePoints).to({
            alpha: 1
        }, 400)
    };
    a.getGlobalLocationOfPointsDisplay = function (a) {
        a = "t" === a ? this.technologyPoints : "e" === a ? this.enginePoints : "b" ===
            a ? this.bugs : this.designPoints;
        return this.localToGlobal(a.x + a.size / 4, a.y + a.size / 4)
    };
    a.pulsePointsDisplay = function (a, c) {
        ("t" === a ? this.technologyPoints : "e" === a ? this.enginePoints : "b" === a || "br" === a ? this.bugs : this.designPoints).pulse(c)
    };
    a.updateGameNameText = function (a) {
        var c = this.children.indexOf(this.gameName);
        this.removeChild(this.gameName);
        var f = 24,
            d = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
        do var k = "{0}pt {1}".format(f, d),
            k = new createjs.Text(a, k, "black"),
            f = f - 2; while (1.1 * k.getMeasuredWidth() >
            this.width && 10 < f);
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.lineHeight = k.getMeasuredLineHeight();
        k.y = this.textContainerHeight / 4;
        k.x = 30 + (this.width - 60) / 2;
        k.maxWidth = this.width - 60;
        this.gameName = k;
        this.addChildAt(this.gameName, c)
    };
    a.updateGameName = function () {
        var a = GameManager.company.currentGame;
        a && a.topic && a.genre && (this.updateGameNameText(a.title), this.gameDetailText.text = a.topic.name + " / " + a.genre.name, a.secondGenre && (this.gameDetailText.text += "-" + a.secondGenre.name))
    };
    a.updatePoints = function () {
        var a =
            GameManager.company.currentGame;
        a ? (this.designPoints.updatePoints(a.designPoints), this.technologyPoints.updatePoints(a.technologyPoints), this.bugs.updatePoints(a.bugs)) : GameManager.currentEngineDev ? this.enginePoints.updatePoints(GameManager.currentEngineDev.remainingPointsDisplay) : GameManager.currentContract && (a = GameManager.currentContract, this.designPoints.updatePoints(a.visualDRemaining), this.technologyPoints.updatePoints(a.visualTRemaining))
    };
    a.redraw = function () {
        var a = this.mainShape.graphics;
        a.beginFill(createjs.Graphics.getRGB(255,
            255, 255, 0.8));
        a.beginStroke("black");
        a.setStrokeStyle(1);
        a.drawRoundRect(0, 0, this.width, this.textContainerHeight, 14.3);
        a.closePath()
    }
})();