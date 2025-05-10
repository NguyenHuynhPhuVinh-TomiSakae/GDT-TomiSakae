var CircularProgressVisual = function () {
    this.maxValue = this.angleArc = 360;
    this.minValue = 0;
    this.bgColor = "red";
    this.fgColor = "blue";
    this.radius = 20;
    this.lineWidth = 10;
    this.updateValue(0);
    this.startAngle = 1.5 * Math.PI;
    createjs.Shape.apply(this, arguments)
};
(function () {
    CircularProgressVisual.prototype = new createjs.Shape;
    var a = CircularProgressVisual.prototype;
    a.onTick = function () {
        this.invalid && (this._redraw(), this.invalid = !1)
    };
    a.invalidate = function () {
        this.invalid = !0
    };
    a.updateValue = function (a) {
        this.value = a;
        this.endAngle = 0 === a || 360 === a ? this.startAngle : (this.value - 90) / 180 * Math.PI
    };
    var b = 2 * Math.PI;
    a._redraw = function () {
        var a = this.graphics;
        a.clear();
        a.setStrokeStyle(this.lineWidth);
        this.bgColor && (a.beginStroke(this.bgColor), a.arc(this.radius, this.radius, this.radius,
            0, b));
        a.beginStroke(this.fgColor);
        a.arc(this.radius, this.radius, this.radius, this.startAngle, this.endAngle)
    }
})();