var FlippingCounter = {};
(function () {
    var a = FlippingCounter;
    a.panel;
    a.img0 = new Image;
    a.img1 = new Image;
    a.img2 = new Image;
    a.img3 = new Image;
    a.img4 = new Image;
    a.img5 = new Image;
    a.img6 = new Image;
    a.img7 = new Image;
    a.img8 = new Image;
    a.img9 = new Image;
    a.img10 = new Image;
    a._activeUITweens;
    a.loaderImageAmount = 10;
    a.numberBitmapsArr = [];
    a.rectUp = new createjs.Rectangle(0, 0, 104, 91);
    a.rectDown = new createjs.Rectangle(0, 91, 104, 91);
    a.getAllImages = function () {
        return "./images/superb/counter/0.png ./images/superb/counter/1.png ./images/superb/counter/2.png ./images/superb/counter/3.png ./images/superb/counter/4.png ./images/superb/counter/5.png ./images/superb/counter/6.png ./images/superb/counter/7.png ./images/superb/counter/8.png ./images/superb/counter/9.png ./images/superb/counter/panel.png".split(" ")
    };
    var b;
    a.init = function () {
        b || (b = !0, this.img0.onload = this.handleImageLoad, this.img1.onload = this.handleImageLoad, this.img2.onload = this.handleImageLoad, this.img3.onload = this.handleImageLoad, this.img4.onload = this.handleImageLoad, this.img5.onload = this.handleImageLoad, this.img6.onload = this.handleImageLoad, this.img7.onload = this.handleImageLoad, this.img8.onload = this.handleImageLoad, this.img9.onload = this.handleImageLoad, this.img10.onload = this.handleImageLoad, this.img0.onerror = f, this.img1.onerror = f, this.img2.onerror =
            f, this.img3.onerror = f, this.img4.onerror = f, this.img5.onerror = f, this.img6.onerror = f, this.img7.onerror = f, this.img8.onerror = f, this.img9.onerror = f, this.img10.onerror = f, this.img0.src = "./images/superb/counter/0.png", this.img1.src = "./images/superb/counter/1.png", this.img2.src = "./images/superb/counter/2.png", this.img3.src = "./images/superb/counter/3.png", this.img4.src = "./images/superb/counter/4.png", this.img5.src = "./images/superb/counter/5.png", this.img6.src = "./images/superb/counter/6.png", this.img7.src = "./images/superb/counter/7.png",
            this.img8.src = "./images/superb/counter/8.png", this.img9.src = "./images/superb/counter/9.png", this.img10.src = "./images/superb/counter/panel.png")
    };
    var c = !1,
        f = function (a) {
            c || (Logger.LogError("A 'Flipping Counter' image has incorrectly loaded, please restart or reinstall the game."), c = !0)
        };
    a.handleImageLoad = function (b) {
        a.loaderImageAmount--;
        if (0 == a.loaderImageAmount) {
            for (b = 0; 10 > b; b++) a.numberBitmapsArr[b] = [], a.numberBitmapsArr[b].up = new createjs.Bitmap(a["img" + b]), a.numberBitmapsArr[b].down = new createjs.Bitmap(a["img" +
                b]);
            a.panel = new createjs.Bitmap(a.img10)
        }
    };
    a.FlippingBox = function (b, c) {
        this.container = new createjs.Container;
        var f = [];
        this.init = function () {
            for (var l = 0; l < b; l++) {
                var g = new a.FlippingNumber(0);
                g.init();
                g.container.x = l * (a.rectUp.width + c);
                this.container.addChild(g.container);
                f.push(g)
            }
        };
        this.fill = function (c) {
            c = String(c).split("").splice(0, b);
            var g = b - c.length;
            if (0 < g)
                for (var k = 0; k < g; k++) c.splice(0, 0, "0");
            for (k = 0; k < f.length; k++) f[k].setNumber(!1 == a.is_int(c[k]) ? 0 : c[k])
        }
    };
    a.is_int = function (a) {
        return parseFloat(a) !=
            parseInt(a) || isNaN(a) ? !1 : !0
    };
    a.FlippingNumber = function (b) {
        function c() {
            r = a.numberBitmapsArr[p].down.clone();
            r.sourceRect = a.rectDown;
            r.scaleY = 0;
            r.y = 91;
            this.container.addChild(r);
            Sound.playSoundOnce("flipflap", 0.5);
            0 == u.length && 0 == t.length ? a._activeUITweens.push(createjs.Tween.get(r).to({
                scaleX: 1,
                scaleY: 1
            }, this.speedUltimateDown, createjs.Ease.backOut).call(f, null, this)) : a._activeUITweens.push(createjs.Tween.get(r).to({
                scaleX: 1,
                scaleY: 1
            }, this.speedDown, createjs.Ease.lineer).call(f, null, this))
        }

        function f() {
            this.container.removeChild(l);
            this.container.removeChild(g);
            l = n;
            g = r;
            this.currentLetter = p;
            0 < u.length ? (this.shiftAt(u[0]), u.splice(0, 1)) : (s = !1, 0 < t.length && (console.log(t[t.length - 1], t), this.setNumber(t[t.length - 1]), t = []))
        }
        this.container = new createjs.Container;
        this.currentLetter = b;
        this.speedDown = this.speedUp = 100;
        this.speedUltimateUp = 250;
        this.speedUltimateDown = 500;
        var l = a.numberBitmapsArr[this.currentLetter].up.clone(),
            g = a.numberBitmapsArr[this.currentLetter].down.clone(),
            n, r, p, s = !1,
            u = [],
            t = [];
        this.init = function () {
            l.sourceRect = a.rectUp;
            l.regY = l.y = 91;
            g.sourceRect = a.rectDown;
            g.y = 91;
            this.container.addChild(l);
            this.container.addChild(g)
        };
        this.setNumber = function (a) {
            if (!1 == s) {
                if (a != this.currentLetter) {
                    s = !0;
                    if (a > this.currentLetter) var b = this.currentLetter + 1;
                    else {
                        for (b = this.currentLetter + 1; 9 >= b; b++) u.push(b);
                        b = 0
                    }
                    for (; b <= a; b++) u.push(b);
                    this.shiftAt(u[0]);
                    u.splice(0, 1)
                }
            } else t.push(a)
        };
        this.shiftAt = function (b) {
            p = b;
            n = a.numberBitmapsArr[p].up.clone();
            n.sourceRect = a.rectUp;
            n.regY = n.y = 91;
            this.container.addChild(n);
            this.container.swapChildren(n,
                l);
            speed = 0 == u.length ? this.speedUltimateUp : this.speedUp;
            a._activeUITweens.push(createjs.Tween.get(l).to({
                scaleX: 1,
                scaleY: 0
            }, speed, createjs.Ease.lineer).call(c, null, this))
        }
    }
})();