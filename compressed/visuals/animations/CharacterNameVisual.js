CharacterNameVisual = function (a) {
    createjs.Container.apply(this, arguments);
    this.character = a;
    this.init()
};
(function () {
    CharacterNameVisual.prototype = new createjs.Container;
    CharacterNameVisual.prototype.init = function () {
        this.removeAllChildren();
        var a = 0 === this.character.id ? "" : this.character.name,
            b = VisualsManager.toScreenCoordinates(280, CanvasManager.globalScaleIgnoringLowResBackground),
            c = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans",
            f = 24;
        do var d = "bold {0}pt {1}".format(f, c),
            d = new createjs.Text(a, d, "black"),
            f = f - 2; while (d.getMeasuredWidth() > b && 10 < f);
        b = f / 32;
        f = createjs.Graphics.getHSL(0, 0, 34);
        d = this.character.flags.expert ?
            "{0}({1})".format("" != a ? "\n" : "", Missions.getMissionWithId(this.character.flags.expert).name) : "";
        d = new createjs.Text(a + d, "bold 32pt {0}".format(c), f);
        d.textAlign = "center";
        d.textBaseline = "alphabetical";
        this.addChildAt(d, 0);
        this.scaleX = b * CanvasManager.globalScale;
        this.scaleY = b * CanvasManager.globalScale;
        switch (this.character.getOrientation()) {
            case CharacterOrientation.NW:
                this.skewY = -30;
                this.skewX = -60;
                this.x = VisualsManager.toScreenCoordinates(170, CanvasManager.globalScale);
                this.y = VisualsManager.toScreenCoordinates(230,
                    CanvasManager.globalScale);
                break;
            case CharacterOrientation.SE:
                this.skewY = -30, this.skewX = -60, this.x = VisualsManager.toScreenCoordinates(-50, CanvasManager.globalScale), this.y = VisualsManager.toScreenCoordinates(90, CanvasManager.globalScale)
        }
    }
})();