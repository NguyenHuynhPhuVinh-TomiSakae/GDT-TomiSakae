var CompositeBitmapAnimation = function (a) {
    this._internalAnimations = []
};
(function () {
    CompositeBitmapAnimation.prototype = new createjs.DisplayObject;
    var a = CompositeBitmapAnimation.prototype;
    a.isVisible = function () {
        return 0 < this._internalAnimations[0].alpha
    };
    a.addAnimation = function (a) {
        if (0 < this._internalAnimations.length) {
            if (this._internalAnimations[0].speedFactor != a.speedFactor) throw "invalid speedFactor for CompositeBitmapAnimation";
        } else {
            var c = this;
            a.onAnimationEnded = function (a, b) {
                c.onAnimationEnd(a, b)
            }
        }
        this._internalAnimations.push(a)
    };
    a.setAlpha = function (a) {
        for (var c =
            0; c < this._internalAnimations.length; c++) this._internalAnimations[c].setAlpha(a)
    };
    a.isAllLoaded = function () {
        for (var a = 0, c = this._internalAnimations.length; a < c; a++)
            if (this._internalAnimations[a].baseImage && !this._internalAnimations[a].baseImage.complete || !this._internalAnimations[a].spriteSheet.complete) return !1;
        return this.overlay && (this.overlay.deskImage && !this.overlay.deskImage.complete || this.overlay.keyBoardImage && !this.overlay.keyBoardImage.complete || this.overlay.pcImage && !this.overlay.pcImage.complete) ?
            !1 : !0
    };
    a.setPaused = function (a) {
        this.paused = a;
        for (var c = 0; c < this._internalAnimations.length; c++) this._internalAnimations[c].setPaused(a)
    };
    a.saveState = function () {
        var a = {};
        a.currentFrame = this._internalAnimations[0].currentAnimationFrame;
        a.currentAnimation = this._internalAnimations[0].currentAnimation;
        a.storyBoard = this._internalAnimations[0].currentStoryBoard;
        a.paused = this._internalAnimations[0].paused;
        a.alpha = this._internalAnimations[0].alpha;
        return a
    };
    a.loadState = function (a) {
        if (a)
            for (var c = 0; c < this._internalAnimations.length; c++) {
                this._internalAnimations[c].currentStoryBoard =
                    a.storyBoard;
                this._internalAnimations[c].currentAnimationFrame = a.currentFrame;
                var f = this._internalAnimations[c].spriteSheet.getAnimation(a.currentAnimation);
                this._internalAnimations[c]._animation = f;
                this._internalAnimations[c].currentAnimation = a.currentAnimation;
                if (this._internalAnimations[c].currentStoryBoard)
                    for (var d = this._internalAnimations[c].currentStoryBoard, k = 0; k < d.length; k++)(f = this._internalAnimations[c].spriteSheet._animations.first(function (a) {
                        return a === d[k]
                    })) || (d[k] = "loop");
                if (this._internalAnimations[c].currentAnimation) {
                    var m =
                        this._internalAnimations[c].currentAnimation,
                        f = this._internalAnimations[c].spriteSheet._animations.first(function (a) {
                            return a === m
                        });
                    f || (this._internalAnimations[c].currentAnimation = "loop", this._internalAnimations[c]._animation = this._internalAnimations[c].spriteSheet.getAnimation(this._internalAnimations[c].currentAnimation), this._internalAnimations[c].currentAnimationFrame = 0)
                }
                this._internalAnimations[c]._normalizeFrame();
                this._internalAnimations[c].paused = a.paused;
                this._internalAnimations[c].alpha =
                    a.alpha
            }
    };
    a.stop = function () {
        for (var a = 0; a < this._internalAnimations.length; a++) this._internalAnimations[a].stop()
    };
    a.gotoAndPlay = function (a) {
        for (var c = 0; c < this._internalAnimations.length; c++) this._internalAnimations[c].gotoAndPlay(a)
    };
    a.gotoAndStop = function (a) {
        for (var c = 0; c < this._internalAnimations.length; c++) this._internalAnimations[c].gotoAndStop(a)
    };
    a.playStoryBoard = function (a) {
        for (var c = 0; c < this._internalAnimations.length; c++)
            if ((this._internalAnimations[c].currentStoryBoard = a) && a.length) {
                var f =
                    a[0];
                "#stop" == f ? this._internalAnimations[c]._stopAnimation() : this._internalAnimations[c].gotoAndPlay(f)
            } else this._internalAnimations[c].stop()
    };
    a._stopAnimation = function () {
        for (var a = 0; a < this._internalAnimations.length; a++) {
            var c = this._internalAnimations[a]._animation.frames.last();
            this._internalAnimations[a].gotoAndStop(c)
        }
    };
    a.onAnimationEnd = function (a, c) {
        if (this.onAnimationEnded && (0 == a.currentStoryBoard.length || 1 == a.currentStoryBoard.length && "#stop" === a.currentStoryBoard[0])) this.onAnimationEnded(a,
            c)
    };
    a._tick = function () {
        for (var a = 0; a < this._internalAnimations.length; a++) this._internalAnimations[a]._tick()
    };
    a.draw = function (a, c) {
        var f = this._internalAnimations[0].currentFrame;
        if (!this.isAllLoaded() || void 0 === this._internalAnimations[0].baseImage) return !0;
        this.cachedFrame || (this.cachedFrame = document.createElement("canvas"), this.cachedFrame.width = this._internalAnimations[0].baseImage.naturalWidth, this.cachedFrame.height = this._internalAnimations[0].baseImage.naturalHeight);
        if (this.cachedFrame.frameNr !==
            f) {
            var d = this.cachedFrame.getContext("2d");
            d.clearRect(0, 0, this.cachedFrame.width, this.cachedFrame.height);
            for (var k = 0, m = this._internalAnimations.length; k < m; k++) this._internalAnimations[k].currentFrame = this._internalAnimations[0].currentFrame, this._internalAnimations[k].currentAnimationFrame = this._internalAnimations[0].currentAnimationFrame, this._internalAnimations[k]._animation = this._internalAnimations[0]._animation, this._internalAnimations[k].draw(d, c, void 0), (1 === k && 2 < m || 1 === m || 0 === k && 2 === m) &&
                this.overlay && (this.overlay.deskImage && d.drawImage(this.overlay.deskImage, 0, 0), this.overlay.keyBoardImage && d.drawImage(this.overlay.keyBoardImage, 0, 0));
            this.overlay && this.overlay.pcImage && d.drawImage(this.overlay.pcImage, 0, 0);
            this.cachedFrame.frameNr = f
        }
        this.cachedFrame && 0 < this.cachedFrame.width && 0 < this.cachedFrame.height && a.drawImage(this.cachedFrame, this.x, this.y);
        return !0
    }
})();