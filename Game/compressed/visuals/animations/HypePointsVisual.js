var HypePointsVisual = function () {
    this.initialize();
    this.width = 150;
    this.height = 30;
    this.border = new createjs.Shape;
    this.addChild(this.border);
    this.text = new createjs.Text("Hype 400", "14pt {0}".format(UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans"), "white");
    this.text.textAlign = "center";
    this.text.textBaseline = "middle";
    this.text.x = this.width / 2;
    this.text.y = this.height / 2 - 2;
    this.text.maxWidth = this.width - 10;
    this.addChild(this.text);
    this._redraw()
};
(function () {
    var a = HypePointsVisual;
    a.prototype = new createjs.Container;
    a = a.prototype;
    a.updateText = function (a) {
        this.text.text = a
    };
    a._redraw = function () {
        var a = this.width,
            c = this.height,
            f = this.border.graphics;
        f.clear();
        var d = createjs.Graphics.getRGB(204, 0, 51, 0.7);
        f.beginFill(d);
        f.setStrokeStyle(2);
        f.beginStroke("black");
        f.drawRoundRect(0, 0, a, c, 2);
        f.closePath()
    }
})();
