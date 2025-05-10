var ProgressBarVisual = function () {
    this.initialize()
};
(function () {
    ProgressBarVisual.prototype = new createjs.Shape;
    var a = ProgressBarVisual.prototype;
    a.width = 100;
    a.height = 20;
    a.progress = 0;
    a.color = "darkblue";
    a.isHorizontal = !0;
    a.onTick = function () {
        if (0 != this.alpha) {
            var a = this.width,
                c = this.height,
                f = this.graphics;
            f.clear();
            f.beginFill("#A0A0A0");
            f.drawRoundRect(0, 0, a, c, 2);
            f.beginFill(this.color);
            var d = 1,
                a = a - 2,
                c = c - 2;
            if (this.isHorizontal) a *= this.progress.clamp(0, 1);
            else var k = c * this.progress.clamp(0, 1),
                d = c - k + 1,
                c = k;
            f.drawRoundRect(1, d, a, c, 2);
            f.closePath()
        }
    }
})();