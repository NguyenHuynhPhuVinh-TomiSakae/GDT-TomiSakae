var PointsDisplayVisual = function (a, b, c) {
    this.initialize();
    this.innerContainer = new createjs.Container;
    this.mainShape = new createjs.Shape;
    this.innerContainer.addChild(this.mainShape);
    var f = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
    this.text = new createjs.Text("0", "14pt {0}".format(f), b);
    this.text.textAlign = "center";
    this.text.textBaseline = "middle";
    this.text.lineHeight = this.text.getMeasuredLineHeight();
    SettingsGameplay.isTextCacheEnabled() ? (this.text.cache(-50, -50, 100, 100), this.textIsCached = !0) : (this.text.uncache(),
        this.textIsCached = !1);
    this.innerContainer.addChild(this.text);
    this.points = 0;
    this.size = 120;
    this.addChild(this.innerContainer);
    this.color = a;
    this.captionBorder = new createjs.Shape;
    this.innerContainer.addChild(this.captionBorder);
    this.captionText = new createjs.Text(c, "10pt {0}".format(f), b);
    this.captionText.textBaseline = "alphabetic";
    this.captionText.direction = "rtl";
    this.captionText.lineHeight = this.captionText.getMeasuredLineHeight();
    this.captionText.lineWidth = this.captionText.getMeasuredWidth();
    this.innerContainer.addChild(this.captionText);
    this.isInvalid = !0
};
(function () {
    PointsDisplayVisual.prototype = new createjs.Container;
    var a = PointsDisplayVisual.prototype;
    a.updatePoints = function (a) {
        this.points = a
    };
    a.pulse = function (a) {
        var c = new createjs.Shape;
        c.alpha = 0;
        var f = c.graphics;
        f.clear();
        var d = this.size / 4;
        f.beginRadialGradientFill([this.color, this.color, this.color, "white", this.color, "transparent"], [0, 0.8, 0.85, 0.86, 0.9, 1], d, d, 0, d, d, d);
        f.drawEllipse(0, 0, this.size / 2, this.size / 2);
        f.closePath();
        this.addChildAt(c, 0);
        f = 0.4 * this.size / 4;
        c.scaleX = 1.4;
        c.scaleY = 1.4;
        c.x = -f;
        c.y = -f;
        createjs.Tween.get(c).to({
            alpha: 0.8
        }, 100).wait(200).to({
            alpha: 0
        }, 100);
        createjs.Tween.get(c).to({
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0
        }, 400).call(function () {
            c.parent.removeChild(c);
            a && a()
        })
    };
    a.onTick = function () {
        this.isInvalid && (this.drawMainShape(), this.text.y = this.size / 4, this.text.x = this.size / 4);
        this.text.text != Math.floor(this.points) && (this.text.text = Math.floor(this.points), SettingsGameplay.isTextCacheEnabled() ? (this.textIsCached || (this.text.cache(-50, -50, 100, 100), this.textIsCached = !0), this.text.updateCache()) :
            this.text.uncache());
        this.isInvalid = !1
    };
    a.drawMainShape = function () {
        var a = this.mainShape.graphics;
        a.clear();
        a.beginFill(this.color);
        a.setStrokeStyle(2);
        a.beginStroke("black");
        a.drawEllipse(0, 0, this.size / 2, this.size / 2);
        a.closePath();
        var c = this.captionText.lineWidth || this.captionText.getMeasuredWidth(),
            f = this.captionText.lineHeight || this.captionText.getMeasuredLineHeight(),
            a = this.captionBorder.graphics;
        a.clear();
        a.beginFill(this.color);
        a.setStrokeStyle(1);
        a.beginStroke("black");
        var d = this.size / 4 - c / 2,
            k = this.size / 2 + 5;
        a.drawRoundRect(d - 5, k, c + 10, f + 10, 2);
        a.closePath();
        0 === this.captionText.cacheID && (this.captionText.x = d, this.captionText.y = k + 10 + f / 2, SettingsGameplay.isTextCacheEnabled() ? this.captionText.cache(0, -15, 100, 25) : this.captionText.uncache())
    }
})();