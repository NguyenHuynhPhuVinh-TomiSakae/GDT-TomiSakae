var CharacterOverlay = function (a) {
    this.initialize();
    this.character = a;
    this.speedFactor = 0.8 + 0.2 * this.character.speedFactor;
    this.initAnimations();
    this.progressBar = new ProgressBarVisual;
    this.progressBar.alpha = 0;
    this.progressBar.y = VisualsManager.toScreenCoordinates(-30);
    this.addChild(this.progressBar);
    this.efficiencyBar = new ProgressBarVisual;
    this.efficiencyBar.alpha = 1 > a.efficiency ? 1 : 0;
    this.efficiencyBar.progress = 0.3;
    this.efficiencyBar.width = 12;
    this.efficiencyBar.height = 70;
    this.efficiencyBar.isHorizontal = !1;
    this.efficiencyBar.x -= VisualsManager.toScreenCoordinates(30);
    this.addChild(this.efficiencyBar);
    this.boostVisual = new CircularProgressVisual;
    this.boostVisual.radius = 20;
    this.boostVisual.x = VisualsManager.toScreenCoordinates(166, CanvasManager.globalScale);
    this.boostVisual.y = VisualsManager.toScreenCoordinates(5, CanvasManager.globalScale);
    this.boostVisual.alpha = 0.8;
    this.addChild(this.boostVisual);
    a.visualData && this.loadState(a.visualData);
    a.onFire && this.setOnFire(!0)
};
(function () {
    var a = CharacterOverlay;
    a.prototype = new createjs.Container;
    a = a.prototype;
    a.saySomething = function (a, c, f, d) {
        void 0 === f && (f = 0);
        d || (d = "black");
        c || (c = 800);
        var k = new createjs.Container;
        k.x = 25;
        k.y = -25 + f;
        a = new createjs.Text(a, "18pt Arial", d);
        a.textBaseline = "top";
        d = a.getMeasuredWidth();
        var m = a.getMeasuredLineHeight(),
            l = new createjs.Shape,
            g = l.graphics;
        g.beginFill(createjs.Graphics.getRGB(255, 255, 255, 0.8));
        g.beginStroke("black");
        g.setStrokeStyle(1);
        g.drawRoundRect(-4, -4, d + 8, m + 8, 5);
        g.closePath();
        k.addChild(l);
        k.addChild(a);
        k.alpha = 0;
        this.addChild(k);
        var n = this;
        a = c / 6;
        createjs.Tween.get(k).to({
            y: -60 + f
        }, c);
        createjs.Tween.get(k).to({
            alpha: 1
        }, a).wait(c - 2 * a).to({
            alpha: 0,
            x: 35
        }, a).call(function () {
            n.removeChild(k)
        })
    };
    a._getSpawnPointOrigin = function () {
        return this.character.getOrientation() === CharacterOrientation.NW ? {
            x: 25,
            y: -10
        } : {
            x: 130,
            y: 90
        }
    };
    a.spawnBugRemovePoint = function (a, c, f, d) {
        d || (d = 0);
        c = new MersenneTwister(a);
        var k = new createjs.Shape;
        k.alpha = 0;
        var m = this._getSpawnPointOrigin();
        k.x = m.x + 10 * c.random() * c.randomSign();
        k.y = m.y - 40 + -20 * c.random();
        k.regX = 5;
        k.regY = 5;
        k.scaleX = 0;
        k.scaleY = 0;
        var l = k.graphics;
        l.beginFill(BUGS_COLOR);
        l.beginStroke("black");
        l.setStrokeStyle(0.5);
        l.drawCircle(5, 5, 10);
        l.closePath();
        this.addChild(k);
        var g = this,
            l = f / 8;
        f /= 2;
        var n = GameManager.gameId;
        GameManager.increaseSpawnedPoints();
        var r = [],
            p = this;
        r.push(createjs.Tween.get(k).wait(d).to({
            y: m.y - 80 - 60 * c.random()
        }, f, createjs.Ease.backIn).call(function () {
            n == GameManager.gameId && (GameManager.decreaseBugs(1), VisualsManager.updatePoints(), 1 == GameManager.company.flags.currentZone &&
                Sound.playSoundOnce("bugDecrease", 0.2), p.character.removeSpawnedPoint(a), GameManager.decreaseSpawnedPoints(), VisualsManager.pulsePointsDisplay("br"))
        }));
        r.push(createjs.Tween.get(k).wait(d).to({
            alpha: 1
        }, l).wait(f - 2 * l).to({
            alpha: 0
        }, l).call(function () {
            g.removeChild(k)
        }));
        r.push(createjs.Tween.get(k).wait(d).to({
            scaleX: 1,
            scaleY: 1
        }, 2 * l, createjs.Ease.backOut));
        return r
    };
    a.spawnPoint = function (a, c, f, d) {
        d || (d = 0);
        if (!this.spawnPointVisuals || this.spawnPointVisuals.gameId != GameManager.gameId) this.spawnPointVisuals = {
            gameId: GameManager.gameId
        };
        else if (GameFlags.GROUP_POINTS && c in this.spawnPointVisuals) {
            var k = this.spawnPointVisuals[c];
            if (k) {
                k.weight++;
                f = k.targetScaleX;
                d = k.targetScaleY;
                k.targetScaleX = Math.min(2, f + 0.2);
                k.targetScaleY = Math.min(2, d + 0.2);
                var m = createjs.Tween.get(k);
                m.isScaleTween = !0;
                m.set({
                    scaleX: f,
                    scaleY: d
                }).to({
                    scaleX: k.targetScaleX,
                    scaleY: k.targetScaleY
                }, 100);
                k.ids.push(a);
                k.textShape || (k.textShape = new createjs.Text(k.weight, "10pt {0}".format(UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans"), "black"),
                    k.textShape.textAlign = "center", k.textShape.textBaseline = "middle", k.textShape.x = 5, k.textShape.y = 4, k.addChild(k.textShape));
                k.textShape.text = k.weight;
                GameManager.increaseSpawnedPoints();
                return [m]
            }
        }
        m = new MersenneTwister(a);
        k = new createjs.Container;
        k.alpha = 0;
        var l = this._getSpawnPointOrigin();
        l.x += this.x;
        l.y += this.y;
        k.x = l.x + 10 * m.random() * m.randomSign();
        k.y = l.y + -20 * m.random();
        k.regX = 5;
        k.regY = 5;
        k.scaleX = 0;
        k.scaleY = 0;
        k.targetScaleX = 1;
        k.targetScaleY = 1;
        var g = "t" === c || "e" === c ? TECHNOLOGY_POINTS_COLOR : "d" === c ?
            DESIGN_POINTS_COLOR : "b" === c ? BUGS_COLOR : RESEARCH_POINTS_COLOR;
        1 == GameManager.company.flags.currentZone && Sound.playSpawnSound(c);
        var n = new createjs.Shape;
        k.addChild(n);
        n = n.graphics;
        n.beginFill(g);
        n.beginStroke("black");
        n.setStrokeStyle(0.5);
        n.drawCircle(5, 5, 10);
        n.closePath();
        CanvasManager.characterStage.addChild(k);
        k.weight = 1;
        k.ids = [a];
        this.spawnPointVisuals[c] = k;
        var r = CanvasManager.characterStage;
        a = VisualsManager.getGlobalLocationOfPointsDisplay(c);
        var g = f / 8,
            n = f / 2,
            p = GameManager.gameId;
        GameManager.increaseSpawnedPoints();
        var s = [],
            u = this;
        s.push(createjs.Tween.get(k).wait(d).to({
            y: l.y - 80 - 20 * m.random()
        }, n, createjs.Ease.backOut).call(function () {
            delete u.spawnPointVisuals[c]
        }).to({
            x: a.x,
            y: a.y
        }, f - n, createjs.Ease.quadIn).call(function () {
            if (p == GameManager.gameId) {
                var a = k.weight;
                VisualsManager.pulsePointsDisplay(c);
                "t" === c ? GameManager.company.currentGame ? GameManager.company.currentGame.technologyPoints += a : GameManager.currentContract && (GameManager.currentContract.visualTRemaining -= a) : "d" === c ? GameManager.company.currentGame ?
                    GameManager.company.currentGame.designPoints += a : GameManager.currentContract && (GameManager.currentContract.visualDRemaining -= a) : "r" === c ? GameManager.company.researchPoints += a : "e" === c ? GameManager.increaseDisplayEnginePoints(u.character, a) : "b" === c && GameManager.company.currentGame && (GameManager.company.currentGame.bugs += a);
                1 == GameManager.company.flags.currentZone && Sound.playSpawnSound(c, !0);
                VisualsManager.updatePoints();
                for (a = 0; a < k.ids.length; a++) u.character.removeSpawnedPoint(k.ids[a]), GameManager.decreaseSpawnedPoints();
                "r" != c && GameManager.currentFeature && "preparation" != GameManager.currentFeature.id && Tutorial.gamePoints()
            }
        }));
        s.push(createjs.Tween.get(k).wait(d).to({
            alpha: 1
        }, g).wait(f - 2 * g).to({
            alpha: 0
        }, g).call(function () {
            r.removeChild(k)
        }));
        s.push(createjs.Tween.get(k).wait(d).to({
            scaleX: 1,
            scaleY: 1
        }, 2 * g, createjs.Ease.backOut));
        return s
    };
    a.startResearching = function () {
        if (1 != this.progressBar.alpha && (createjs.Tween.get(this.progressBar).to({
            alpha: 1
        }, 400), this.character.currentResearch.isTraining)) {
            var a = this.character.currentResearch,
                c = Training.getAllTrainings().first(function (c) {
                    return c.id === a.id
                });
            a.isSkillTraining = c && c.isSkillTraining;
            a.isSkillTraining && (this.animateTrainingProgress(), this.trainingOverlay.fadeIn(1200))
        }
    };
    a.finishResearching = function () {
        createjs.Tween.get(this.progressBar).to({
            alpha: 0
        }, 400);
        this.trainingOverlay.fadeOut(1200)
    };
    a.onTick = function () {
        this.character.state === CharacterState.Researching && (this.progressBar.progress = this.character.currentResearch.progress, this.progressBar.color = this.character.currentResearch.progressColor ?
            this.character.currentResearch.progressColor : "research" == this.character.currentResearch.type ? "darkblue" : "lightgreen");
        var a = this.character.efficiency;
        1 != a ? (this.efficiencyBar.progress = a, this.efficiencyBar.color = createjs.Graphics.getHSL(80 * a, 100, 50), this.efficiencyBar.alpha = (this.efficiencyBar.alpha + 0.01).clamp(0, 0.8)) : 0 != this.efficiencyBar.alpha && (this.efficiencyBar.alpha = (this.efficiencyBar.alpha - 0.01).clamp(0, 1))
    };
    a.initAnimations = function () {
        var a = CanvasManager.globalScale;
        if (this.character.getOrientation() ===
            CharacterOrientation.NW) {
            var c = BitmapAnimationFactory.createAnimation("screen", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
            c && this.addChild(c);
            this.screenAnimation = c
        }
        c = BitmapAnimationFactory.createAnimation("typing", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.typingAnimation = c;
        c = BitmapAnimationFactory.createAnimation("thinking", this.speedFactor, this.character.getOrientation(),
            this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.thinkingAnimation = c;
        c = BitmapAnimationFactory.createAnimation("sitBack", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.sitBackAnimation = c;
        c = BitmapAnimationFactory.createAnimation("drawNotepad", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.drawNotepadAnimation = c;
        c = "";
        c = this.character.getOrientation() == CharacterOrientation.NW ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.notepadImage), this.speedFactor) : BitmapAnimationFactory.createTeaCupAnimation(this.speedFactor);
        c.overlay = this;
        c.scaleX = a;
        c.scaleY = a;
        this.addChild(c);
        this.notepadImage = c;
        var f = this;
        this.typingAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "typing")
        };
        this.thinkingAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f,
                a, b, "thinking")
        };
        this.sitBackAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "sitBack")
        };
        this.drawNotepadAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "drawNotepad")
        };
        1 === GameManager.company.currentLevel && (c = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.pong)), c.x = VisualsManager.toScreenCoordinates(1321, a) - VisualsManager.toScreenCoordinates(1039, a), c.y = VisualsManager.toScreenCoordinates(261, a) - VisualsManager.toScreenCoordinates(539, a), c.scaleX =
            a, c.scaleY = a, this.addChild(c), this.pongAnimation = c);
        this.notepadImage.gotoAndStop("all");
        this.sitBackAnimation.gotoAndStop("loop");
        this.screenAnimation && this.screenAnimation.gotoAndStop("loop");
        this.pongAnimation && this.pongAnimation.gotoAndStop("all");
        this.typingAnimation.setAlpha(0);
        this.thinkingAnimation.setAlpha(0);
        this.sitBackAnimation.setAlpha(1);
        this.drawNotepadAnimation.setAlpha(0);
        this.refreshName()
    };
    a.refreshName = function () {
        var a = new CharacterNameVisual(this.character);
        a.alpha = 0.7;
        this.characterNameVisual &&
            this.removeChild(this.characterNameVisual);
        this.characterNameVisual = a;
        this.addChildAt(this.characterNameVisual, 0)
    };
    a.endedAnimation = function (a, c, f) {
        "loop" === a.currentAnimation ? this.character.loopEnded() : null === a.currentAnimation && a.paused || "end" === a.currentAnimation ? this.character.animationEnded(f) : !0 === a.paused ? this.character.loopEnded() : "sitBack" === f && "start" === c && null != a.currentStoryBoard && 0 === a.currentStoryBoard.length && this.sitBackAnimation.playStoryBoard(["loop"])
    };
    a.removeAllAnimation = function () {
        this.typingAnimation.setAlpha(0);
        this.thinkingAnimation.setAlpha(0);
        this.sitBackAnimation.setAlpha(0);
        this.drawNotepadAnimation.setAlpha(0);
        this.notepadImage.setAlpha(1);
        this.screenAnimation && this.screenAnimation.setPaused(!0);
        this.typingAnimation.stop();
        this.thinkingAnimation.stop();
        this.sitBackAnimation.stop();
        this.drawNotepadAnimation.stop()
    };
    a.startThinking = function () {
        this.removeAllAnimation();
        this.thinkingAnimation.setAlpha(1);
        this.thinkingAnimation.playStoryBoard(["start", "loop"])
    };
    a.continueThinking = function () {
        this.thinkingAnimation.setPaused(!1)
    };
    a.endThinking = function () {
        this.thinkingAnimation.playStoryBoard(["end", "#stop"])
    };
    a.startDrawNotepad = function () {
        this.removeAllAnimation();
        this.notepadImage.setAlpha(0);
        this.drawNotepadAnimation.setAlpha(1);
        this.drawNotepadAnimation.playStoryBoard(["start", "loop"])
    };
    a.continueDrawNotepad = function () {
        this.drawNotepadAnimation.setPaused(!1)
    };
    a.endDrawNotepad = function () {
        this.drawNotepadAnimation.playStoryBoard(["end", "#stop"])
    };
    a.startSitBack = function () {
        this.removeAllAnimation();
        this.sitBackAnimation.setAlpha(1);
        this.sitBackAnimation.playStoryBoard(["start", "loop"])
    };
    a.startSitBackLoop = function () {
        this.removeAllAnimation();
        this.sitBackAnimation.setAlpha(1);
        this.sitBackAnimation.playStoryBoard(["loop"])
    };
    a.continueSitBack = function () {
        this.sitBackAnimation.setPaused(!1)
    };
    a.endSitBack = function () {
        this.sitBackAnimation.playStoryBoard(["end", "#stop"])
    };
    a.startTyping = function () {
        this.removeAllAnimation();
        this.screenAnimation && this.screenAnimation.setPaused(!1);
        this.typingAnimation.setAlpha(1);
        this.typingAnimation.playStoryBoard(["start",
            "loop"
        ])
    };
    a.continueTyping = function () {
        this.screenAnimation && this.screenAnimation.setPaused(!1);
        this.typingAnimation.setPaused(!1)
    };
    a.endTyping = function () {
        this.screenAnimation && this.screenAnimation.stop();
        this.typingAnimation.playStoryBoard(["end", "#stop"])
    };
    a.playPong = function () {
        if (this.pongAnimation && this.pongAnimation.paused) {
            this.pongAnimation.playStoryBoard(["all", "#stop"]);
            var a = GameManager.gameId,
                c = function () {
                    a == GameManager.gameId && 1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("ping",
                        0.5)
                },
                f = function () {
                    a == GameManager.gameId && 1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("pong", 0.5)
                };
            createjs.Tween.get(this).wait(500).call(c).wait(720).call(f).wait(650).call(c).wait(1100).call(f).wait(300).call(c).wait(850).call(c).wait(500).call(f).wait(650).call(c).wait(1100).call(f).wait(200).call(c).wait(2E3).call(function () {
                Achievements.activate(Achievements.lvl1EasterEgg);
                GameManager.checkAchievements()
            });
            ghg4.ghg5("pong played")
        }
    };
    a.saveState = function () {
        var a = {};
        a.typingAnimation =
            this.typingAnimation.saveState();
        this.screenAnimation && (a.screenAnimation = this.screenAnimation.saveState());
        a.thinkingAnimation = this.thinkingAnimation.saveState();
        a.sitBackAnimation = this.sitBackAnimation.saveState();
        a.drawNotepadAnimation = this.drawNotepadAnimation.saveState();
        a.notepadImage = this.notepadImage.saveState();
        this.pongAnimation && (a.pong = this.pongAnimation.saveState());
        this.character.state === CharacterState.Researching && (a.currentTraining = this.currentTrainingState);
        return a
    };
    a.loadState =
        function (a) {
            a && (this.typingAnimation.loadState(a.typingAnimation), this.screenAnimation && this.screenAnimation.loadState(a.screenAnimation), this.thinkingAnimation.loadState(a.thinkingAnimation), this.sitBackAnimation.loadState(a.sitBackAnimation), this.drawNotepadAnimation.loadState(a.drawNotepadAnimation), this.notepadImage.loadState(a.notepadImage), this.pongAnimation && this.pongAnimation.loadState(a.pongAnimation), a.currentTraining && (this.currentTrainingState = a.currentTraining))
        };
    a.resumeTraining = function () {
        if (void 0 ==
            this.currentTrainingState) this.character.currentResearch && this.character.currentResearch.isSkillTraining && this.trainingOverlay.show();
        else if (this.character.currentResearch && this.character.currentResearch.isSkillTraining) {
            var a = this.currentTrainingState;
            this.animateTrainingProgress(a.updates);
            var c = GameManager.gameTime - a.start;
            this.trainingTweens.forEach(function (a) {
                a.setPosition(c)
            });
            this.trainingOverlay.show()
        }
    };
    a.setOnFire = function (a) {
        a ? (this.typingAnimation.onFire = !0, this.screenAnimation && (this.screenAnimation.onFire = !0), this.thinkingAnimation.onFire = !0, this.sitBackAnimation.onFire = !0, this.drawNotepadAnimation.onFire = !0, this.notepadImage.onFire = !0, this.pongAnimation && (this.pongAnimation.onFire = !0)) : (this.typingAnimation.onFire = void 0, this.screenAnimation && (this.screenAnimation.onFire = void 0), this.thinkingAnimation.onFire = void 0, this.sitBackAnimation.onFire = void 0, this.drawNotepadAnimation.onFire = void 0, this.notepadImage.onFire = void 0, this.pongAnimation && (this.pongAnimation.onFire = void 0))
    };
    GameManager.addTickListener(function (a) {
        VisualsManager.characterOverlays.forEach(function (a) {
            a.character.state ==
                CharacterState.Researching && a.trainingOverlay && a.trainingTweens && a.trainingTweens.forEach(function (a) {
                    a = a._target;
                    void 0 != a.gamedev_text_int && a.text(Math.floor(a.gamedev_text_int));
                    void 0 != a.gamedev_yTilt && a.css("transform", "rotateY({0}deg)".format(a.gamedev_yTilt))
                })
        })
    }, !0);
    a.animateTrainingProgress = function (a) {
        if (this.trainingOverlay) {
            for (var c = this.trainingOverlay, f = [], d = [{
                p: this.character.designFactor,
                t: "d"
            }, {
                p: this.character.technologyFactor,
                t: "t"
            }, {
                p: this.character.speedFactor,
                t: "s"
            }, {
                p: this.character.researchFactor,
                t: "r"
            }], k = 0; k < d.length; k++) {
                var m = d[k],
                    l = c.find(".training{0}.trainingColumnRight".format(m.t.toUpperCase()));
                if (void 0 == l.gamedev_text_int) {
                    var g = Math.floor(500 * m.p);
                    l.text(g);
                    a && (l = a.first(function (a) {
                        return a.t === m.t
                    })) && (l.o = g)
                }
            }
            if (a) {
                if (0 < a.length) {
                    1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("trainingProgress", 0.1);
                    for (var n = this, k = 0; k < a.length; k++) {
                        var r = GameManager.gameId;
                        (function (a) {
                            var b = c.find(".trainingGain.training{0}".format(a.t.toUpperCase()));
                            b.text("+" + a.p);
                            void 0 ===
                                b.gamedev_yTilt && (b.gamedev_yTilt = 90);
                            f.push(createjs.Tween.get(b).to({
                                gamedev_yTilt: 0
                            }, 400, createjs.Ease.bounceOut).wait(800).to({
                                gamedev_yTilt: 90
                            }, 400));
                            b = c.find(".training{0}.trainingColumnRight".format(a.t.toUpperCase()));
                            void 0 === b.gamedev_text_int && (b.gamedev_text_int = a.o);
                            var d = createjs.Tween.get(b).wait(200).to({
                                gamedev_text_int: a.o + a.p
                            }, 500);
                            d.call(function () {
                                r == GameManager.gameId && (n.character.applyTrainingUpdate(a), -1 != n.trainingTweens.indexOf(d) && n.trainingTweens.remove(d))
                            });
                            f.push(d)
                        })(a[k])
                    }
                }
                this.currentTrainingState = {
                    updates: a,
                    start: GameManager.gameTime
                }
            }
            this.trainingTweens = f
        }
    }
})();