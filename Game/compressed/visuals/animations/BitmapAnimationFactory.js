"use strict";
var BitmapAnimationFactory = {
    createAnimation: function (a, b, c, f, d) {
        var k, m = CanvasManager.globalScale;
        switch (a) {
            case "thinking":
                k = BitmapAnimationFactory.createThinkingAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY = m;
                break;
            case "typing":
                k = BitmapAnimationFactory.createTypingAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY = m;
                break;
            case "sitBack":
                k = BitmapAnimationFactory.createIdleAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY = m;
                break;
            case "drawNotepad":
                k = BitmapAnimationFactory.createNotepadAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY =
                    m;
                break;
            case "screen":
                k = BitmapAnimationFactory.createScreenAnimation(b, c)
        }
        return k
    },
    createTeaCupAnimation: function (a) {
        return 2 === GameManager.company.currentLevel ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.teaCupImageLevel2), a) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.teaCupImage), a)
    },
    createScreenAnimation: function (a, b) {
        var c = CanvasManager.globalScale;
        if (b === CharacterOrientation.NW) {
            if (1 === GameManager.company.currentLevel) {
                var f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL1),
                    a);
                f.x = VisualsManager.toScreenCoordinates(12, c);
                f.scaleX = c;
                f.scaleY = c;
                return f
            }
            if (2 === GameManager.company.currentLevel) return f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL2), a), f.x = VisualsManager.toScreenCoordinates(-1, c), f.y = VisualsManager.toScreenCoordinates(-17, c), f.scaleX = c, f.scaleY = c, f;
            if (3 === GameManager.company.currentLevel) return f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL3), a), f.x = VisualsManager.toScreenCoordinates(-16, c), f.y = VisualsManager.toScreenCoordinates(-35,
                c), f.scaleX = c, f.scaleY = c, f;
            if (4 === GameManager.company.currentLevel) return f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL4), a), f.x = VisualsManager.toScreenCoordinates(-4, c), f.y = VisualsManager.toScreenCoordinates(-39, c), f.scaleX = c, f.scaleY = c, f
        }
    },
    createThinkingAnimation: function (a, b, c, f) {
        return this._createAnimation(a, b, c, f, "thinking")
    },
    createNotepadAnimation: function (a, b, c, f) {
        return this._createAnimation(a, b, c, f, "notepad")
    },
    createIdleAnimation: function (a, b, c, f) {
        return this._createAnimation(a,
            b, c, f, "idle")
    },
    createTypingAnimation: function (a, b, c, f) {
        return this._createAnimation(a, b, c, f, "typing")
    },
    _createAnimation: function (a, b, c, f, d) {
        b === CharacterOrientation.NW ? (b = new CompositeBitmapAnimation, b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC1_chair"]), a)), 8 < f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC9_pants"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC1_pants"]), a)), 4 ===
            f || 7 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC4_hand"]), a)) : 5 === f || 8 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC5_hand"]), a)) : 9 === f || 11 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC9_hand"]), a)) : 10 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC10_hand"]), a)) : 12 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d +
                "BackC12_hand"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC1_hand"]), a)), void 0 === c && (c = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC" + c + "_body"]), a)), void 0 === f && (f = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC" + f + "_head"]), a))) : (b = new CompositeBitmapAnimation, b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC1_chair"]), a)), 8 < f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d +
                    "FrontC9_pants"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC1_pants"]), a)), 4 === f || 7 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC4_hand"]), a)) : 5 === f || 8 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC5_hand"]), a)) : 9 === f || 11 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC9_hand"]), a)) : 10 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d +
                        "FrontC10_hand"]), a)) : 12 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC12_hand"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC1_hand"]), a)), void 0 === c && (c = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC" + c + "_body"]), a)), void 0 === f && (f = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC" + f + "_head"]), a)));
        return b
    }
},
    BitmapAnimationX = function (a,
        b) {
        this.speedFactor = 1;
        b && (this.speedFactor = b);
        createjs.BitmapAnimation.apply(this, arguments);
        this.targetFPS = a.targetFPS;
        a.baseImage && (!0 === GameFlags.SLOWDOWN_BASEIMAGE ? window.setTimeout(function (b) {
            b.baseImage = new Image;
            b.baseImage.src = a.baseImage
        }, 1, this) : (this.baseImage = new Image, this.baseImage.src = a.baseImage))
    };
(function () {
    BitmapAnimationX.prototype = new createjs.BitmapAnimation;
    var a = BitmapAnimationX.prototype;
    a.setAlpha = function (a) {
        this.alpha = a
    };
    a.setPaused = function (a) {
        this.paused = a
    };
    a.saveState = function () {
        var a = {};
        a.currentFrame = this.currentAnimationFrame;
        a.currentAnimation = this.currentAnimation;
        a.storyBoard = this.currentStoryBoard;
        a.paused = this.paused;
        a.alpha = this.alpha;
        return a
    };
    a.loadState = function (a) {
        a && (this.currentStoryBoard = a.storyBoard, this.currentAnimationFrame = a.currentFrame, this._animation = this.spriteSheet.getAnimation(a.currentAnimation),
            this.currentAnimation = a.currentAnimation, this._normalizeFrame(), this.paused = a.paused, this.alpha = a.alpha)
    };
    a.playStoryBoard = function (a) {
        (this.currentStoryBoard = a) && a.length ? (a = a[0], "#stop" == a ? this._stopAnimation() : this.gotoAndPlay(a)) : this.stop()
    };
    a._stopAnimation = function () {
        var a = this._animation.frames.last();
        this.gotoAndStop(a)
    };
    a.onAnimationEnd = function (a, c) {
        if (this.currentStoryBoard && 0 < this.currentStoryBoard.length && (this.currentStoryBoard.splice(0, 1), 0 < this.currentStoryBoard.length)) {
            var f = this.currentStoryBoard[0];
            "#stop" == f ? this._stopAnimation() : this.gotoAndPlay(f)
        }
        if (this.onAnimationEnded && this.currentStoryBoard && (0 == this.currentStoryBoard.length || 1 == this.currentStoryBoard.length && "#stop" === this.currentStoryBoard[0])) this.onAnimationEnded(a, c)
    };
    a._tick = function () {
        if (!this.paused && this._lastFrameTime && this._animation) {
            var a = GameManager.gameTime - this._lastFrameTime;
            this.onFire && (a *= 2);
            a = Math.floor(a * this.speedFactor / (1E3 / this.targetFPS[this._animation.name]));
            if (0 < a) {
                for (var c = 0; c < a; c++) this._advanceCount++,
                    this.advance();
                this._lastFrameTime = GameManager.gameTime
            }
        } else this._lastFrameTime = GameManager.gameTime
    };
    a.draw = function (a, c, f, d) {
        if (this.DisplayObject_draw(a, c)) return !0;
        this._normalizeFrame();
        var k = this.spriteSheet.getFrame(this.currentFrame);
        if (null == k) {
            if (10 < d) return;
            this.spriteSheet._calculateFrames();
            return this.draw(a, c, f, d ? ++d : 1)
        }
        c = k.rect;
        if (this.baseImage) return this.baseImage.complete && k.image.complete && (this.cachedFrame || (this.cachedFrame = document.createElement("canvas"), this.cachedFrame.width =
            this.baseImage.naturalWidth, this.cachedFrame.height = this.baseImage.naturalHeight), this.cachedFrame.frameNr !== this.currentFrame && (f = this.cachedFrame.getContext("2d"), f.clearRect(0, 0, this.cachedFrame.width, this.cachedFrame.height), f.drawImage(this.baseImage, 0, 0), f.drawImage(k.image, c.x, c.y, c.width, c.height, -k.regX, -k.regY, c.width, c.height), this.cachedFrame.frameNr = this.currentFrame), this.cachedFrame && 0 < this.cachedFrame.width && 0 < this.cachedFrame.height && a.drawImage(this.cachedFrame, 0, 0)), !0;
        k.image.complete &&
            a.drawImage(k.image, c.x, c.y, c.width, c.height, -k.regX, -k.regY, c.width, c.height);
        return !0
    }
})();