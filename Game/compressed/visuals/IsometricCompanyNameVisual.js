IsometricCompanyNameVisual = function () {
    createjs.Container.apply(this, arguments)
};
(function () {
    IsometricCompanyNameVisual.prototype = new createjs.Container;
    IsometricCompanyNameVisual.prototype.updateVisual = function (a) {
        this.removeAllChildren();
        var b = GameManager.company.name,
            c = VisualsManager.toScreenCoordinates(600, CanvasManager.globalScaleIgnoringLowResBackground),
            f = 54;
        do var d = "{0}pt {1}".format(f, "Calibri"),
            d = new createjs.Text(b, d, "black"),
            f = f - 2; while (d.getMeasuredWidth() > c && 10 < f);
        for (var c = f / 32, f = a ? 1 : 5, k = 0; k < f; k++) d = createjs.Graphics.getHSL(0, 0, 0 == k ? 70 : 60 / k), a && (d = createjs.Graphics.getHSL(0,
            0, 41)), d = new createjs.Text(b, "32pt {0}".format("Calibri"), d), d.textAlign = "center", d.textBaseline = "alphabetical", d.x += 1 * k, d.y -= 1 * k, this.addChildAt(d, 0);
        this.skewY = 30;
        this.scaleX = c * CanvasManager.globalScale;
        this.scaleY = c * CanvasManager.globalScale;
        this.alpha = a ? 0.8 : 1
    }
})();