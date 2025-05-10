var SPAWN_POINTS_DURATION = 1200,
    ON_FIRE_DURATION = 5E3,
    BOOST_RECHARGE_DURATION = 45E3,
    EFFICIENCY_RECHARGE_DURATION = 9E4,
    CharacterState = {
        Idle: "Idle",
        Working: "Working",
        Researching: "Researching",
        CreateEngine: "CreateEngine",
        WorkOnContract: "WorkOnContract",
        Training: "Training",
        Vacation: "Vacation"
    },
    CharacterOrientation = {
        NW: "NW",
        NE: "NE",
        SW: "SW",
        SE: "SE"
    },
    Character = function (a) {
        this.state = a.state ? a.state : CharacterState.Idle;
        this.id = a.id;
        this.slot = a.slot;
        this.slot || (this.slot = 0);
        this.name = a.name;
        this.designFactor =
            a.dF;
        this.technologyFactor = a.tF;
        this.workAnimations = ["typing", "thinking", "drawNotepad"];
        this.idleAnimations = ["sitBack"];
        this.working = a.working;
        void 0 === this.working && (this.working = !1);
        this.speedFactor = a.speedF;
        this.qualityFactor = a.qualityF;
        this.researchFactor = a.researchF;
        this.salary = a.salary;
        this.engineProgress = a.engineProgress;
        this.contractProgress = a.contractProgress;
        this.bugFixingDelta = a.bugFixingDelta;
        this.relaxDelta = 0;
        a.relaxDelta && (this.relaxDelta = a.relaxDelta);
        this.currentFeature = this.currentResearch =
            null;
        this.experience = a.experience ? a.experience : LevelCalculator.getXpForLevel(5 * this.qualityFactor);
        this.onFire = !1;
        this.boostRechargeProgress = this.maxBoostLevel = 0;
        void 0 != a.onFire && (this.onFire = a.onFire);
        void 0 != a.maxBoostLevel && (this.maxBoostLevel = a.maxBoostLevel);
        a.boostRechargeProgress && (this.boostRechargeProgress = a.boostRechargeProgress);
        void 0 != a.boostLevel && (this.boostLevel = a.boostLevel);
        this.efficiency = 1;
        void 0 != a.efficiency && (this.efficiency = a.efficiency);
        this.flags = {};
        a.flags && (this.flags =
            a.flags);
        this.currentAnimation = a.currentAnimation ? a.currentAnimation : null;
        this.nextAnimation = a.nextAnimation ? a.nextAnimation : null;
        a.currentFeature && (this.currentFeature = a.currentFeature);
        this.spawnedPoints = [];
        a.spawnedPoints && (this.spawnedPoints = a.spawnedPoints.map(function (a) {
            return SpawnedPointsSerializer.load(a)
        }));
        this.visualData = a.visual;
        this.sex = a.sex;
        this.dLeft = a.dLeft ? a.dLeft : 0;
        this.tLeft = a.tLeft ? a.tLeft : 0;
        this.rLeft = a.rLeft ? a.rLeft : 0
    };
(function () {
    Character.BASE_SALARY_PER_LEVEL = 1E4;
    Character.load = function (a) {
        return new Character(a)
    };
    var a = Character.prototype;
    a.getLevelF = function () {
        return LevelCalculator.getLevelFractional(this.experience)
    };
    a.getLevel = function () {
        return LevelCalculator.getLevel(this.experience)
    };
    a.getResearchSkillPoints = function () {
        return Math.floor(500 * this.researchFactor)
    };
    a.getDesignSkillPoints = function () {
        return Math.floor(500 * this.designFactor)
    };
    a.getTechnologySkillPoints = function () {
        return Math.floor(500 * this.technologyFactor)
    };
    a.getSpeedSkillPoints = function () {
        return Math.floor(500 * this.speedFactor)
    };
    a.getOrientation = function () {
        var a = GameManager.company.currentLevel;
        if (1 === a) return CharacterOrientation.NW;
        if (2 === a || 3 === a || 4 == a) return 0 === this.slot || 1 === this.slot || 3 === this.slot || 5 === this.slot ? CharacterOrientation.NW : CharacterOrientation.SE
    };
    a.refreshPoints = function () {
        for (var a = VisualsManager.getCharacterOverlay(this), c = 0; c < this.spawnedPoints.length; c++) {
            var f = this.spawnedPoints[c],
                d = void 0;
            if (d = "br" === f.type ? a.spawnBugRemovePoint(f.id,
                f.type, f.duration) : a.spawnPoint(f.id, f.type, f.duration))
                for (var k = 0; k < d.length; k++) d[k].setPosition(GameManager.gameTime - f.gameTime)
        }
    };
    a.isIdle = function () {
        return this.state === CharacterState.Idle
    };
    a.canStartResearch = function () {
        return this.isIdle()
    };
    a.save = function () {
        var a = {};
        a.id = this.id;
        a.state = this.state;
        a.name = this.name;
        a.dF = this.designFactor;
        a.tF = this.technologyFactor;
        a.speedF = this.speedFactor;
        a.qualityF = this.qualityFactor;
        a.experience = this.experience;
        a.researchF = this.researchFactor;
        a.salary = this.salary;
        a.engineProgress = this.engineProgress;
        a.contractProgress = this.contractProgress;
        a.bugFixingDelta = this.bugFixingDelta;
        a.relaxDelta = this.relaxDelta;
        a.slot = this.slot;
        a.working = this.working;
        a.currentAnimation = this.currentAnimation;
        a.nextAnimation = this.nextAnimation;
        a.onFire = this.onFire;
        a.maxBoostLevel = this.maxBoostLevel;
        a.boostRechargeProgress = this.boostRechargeProgress;
        a.boostLevel = this.boostLevel;
        a.efficiency = this.efficiency;
        a.flags = this.flags;
        this.currentFeature && (a.currentFeature = this.currentFeature);
        this.spawnedPoints && (a.spawnedPoints = this.spawnedPoints.map(function (a) {
            return SpawnedPointsSerializer.save(a)
        }));
        a.visual = VisualsManager.getCharacterOverlay(this).saveState();
        a.sex = this.sex;
        a.dLeft = this.dLeft;
        a.tLeft = this.tLeft;
        a.rLeft = this.rLeft;
        return a
    };
    a.adjustBoostRechargeProgress = function (a) {
        this.boostRechargeProgress = (this.boostRechargeProgress + a).clamp(0, 1)
    };
    a.getMaxEfficiency = function () {
        return 1
    };
    a.adjustEfficiency = function (a) {
        this.efficiency = (this.efficiency + a).clamp(0.001, this.getMaxEfficiency())
    };
    a.tick = function () {
        this.lastUpdate || (this.lastUpdate = GameManager.gameTime);
        var a = GameManager.gameTime - this.lastUpdate,
            c = !0;
        0 != this.id && !this.onFire && this.flags.nextVacation < GameManager.gameTime && (this.flags.needsVacation = !0, this.adjustEfficiency(-a / EFFICIENCY_RECHARGE_DURATION), Tutorial.needsAHoliday(), c = !1);
        1 != this.efficiency && c && this.adjustEfficiency(a / EFFICIENCY_RECHARGE_DURATION);
        this.isIdle() && (GameManager.currentFeature && 1 > GameManager.currentFeature.progress && null === this.currentFeature ? (this._resetBugFixingWork(),
            this._calcFeature(), this.state = CharacterState.Working, this.working = !0) : GameManager.currentFeature && 1 > GameManager.currentFeature.progress ? (this.state = CharacterState.Working, this.working = !0) : GameManager.currentEngineDev ? (this._resetEngineWork(), this.state = CharacterState.CreateEngine, this.working = !0) : GameManager.currentContract && GameManager.currentContract.isGenericContract && (this._resetContractWork(), this.state = CharacterState.WorkOnContract, this.working = !0));
        this.state === CharacterState.Working ? this._doWork(a) :
            this.state === CharacterState.Researching ? this._doResearch(a) : this.state === CharacterState.CreateEngine ? this._doEngineWork(a) : this.state === CharacterState.WorkOnContract ? this._doContractWork(a) : this.state === CharacterState.Vacation && (this._doRelax(a), "sitBack" === this.currentAnimation && (c = VisualsManager.getCharacterOverlay(this), 0.5 < c.sitBackAnimation.alpha && (c.sitBackAnimation.alpha = Math.max(c.sitBackAnimation.alpha - a / 3E3, 0.5))));
        this.onFire && "thinking" != this.currentAnimation ? (c = this.boostRechargeProgress -
            a / ON_FIRE_DURATION, 0 >= c ? void 0 != this.boostLevel && 0 < this.boostLevel ? (this.boostLevel--, this.boostRechargeProgress = 1 - c) : (VisualsManager.getCharacterOverlay(this).setOnFire(!1), this.boostLevel = 0, this.onFire = !1) : this.boostRechargeProgress = c) : this.maxBoostLevel > this.boostLevel && 1 > this.boostRechargeProgress && (c = a / BOOST_RECHARGE_DURATION, this.state === CharacterState.Idle && (c *= 0.5), c = this.boostRechargeProgress + c, 1 != this.boostRechargeProgress && 1 <= c && (this.boostLevel ? this.boostLevel++ : this.boostLevel = 1, c = 0),
                this.boostRechargeProgress = c.clamp(0, 1));
        this.state != CharacterState.Vacation && "sitBack" === this.currentAnimation && (c = VisualsManager.getCharacterOverlay(this), 1 > c.sitBackAnimation.alpha && (c.sitBackAnimation.alpha = Math.min(c.sitBackAnimation.alpha + a / 3E3, 1)));
        this.lastUpdate = GameManager.gameTime
    };
    a.getBoostFactor = function () {
        if (!this.onFire) return 1;
        var a = this.boostLevel;
        a || (a = 1);
        return 1 + 0.25 * (a + 1)
    };
    a.startAnimations = function () {
        var a = VisualsManager.getCharacterOverlay(this, !0);
        a && (this.currentAnimation =
            "sitBack", this.loopCount = 1, a.startSitBackLoop())
    };
    a.startWorking = function () {
        this.working = !0
    };
    a.endWorking = function () {
        this.working = !1
    };
    a.playNextAnimation = function () {
        this.currentAnimation = this.nextAnimation;
        this.nextAnimation = void 0;
        var a = VisualsManager.getCharacterOverlay(this, !0);
        a && ("typing" === this.currentAnimation ? a.startTyping() : "thinking" === this.currentAnimation ? a.startThinking() : "drawNotepad" === this.currentAnimation && a.startDrawNotepad())
    };
    a.playRandomIdleAnimation = function () {
        var a = VisualsManager.getCharacterOverlay(this,
            !0);
        a && (this.currentAnimation = "sitBack", a.startSitBack())
    };
    a.activateBoost = function () {
        this.onFire = !0;
        VisualsManager.getCharacterOverlay(this).setOnFire(!0)
    };
    a.loopEnded = function () {
        if (0 < VisualsManager.characterOverlays.length) {
            var a = VisualsManager.getCharacterOverlay(this, !0);
            if (a)
                if ("typing" === this.currentAnimation)
                    if (!1 === this.working) GameManager.workEnded(this), a.endTyping();
                    else if (GameManager.IsAnimationSwitchAllowed(this)) {
                        for (; ;)
                            if (this.nextAnimation = this.workAnimations.pickRandom(), "thinking" ===
                                this.nextAnimation && !this.onFire) {
                                var c = 0.3 - (0.25 * this.speedFactor).clamp(0, 0.25);
                                if (GameManager.company.getRandom() < c) break
                            } else if ("drawNotepad" === this.nextAnimation && 0.5 < GameManager.company.getRandom()) break;
                            else if ("typing" === this.nextAnimation) {
                                this.nextAnimation = void 0;
                                a.continueTyping();
                                return
                            }
                        a.endTyping()
                    } else a.continueTyping();
                else "thinking" === this.currentAnimation ? (this.nextAnimation = "typing", a.endThinking()) : "sitBack" === this.currentAnimation ? !0 === this.working ? (this.nextAnimation = "typing",
                    a.endSitBack()) : (GameManager.workEnded(this), a.continueSitBack()) : "drawNotepad" === this.currentAnimation && (this.nextAnimation = "typing", a.endDrawNotepad())
        }
    };
    a.animationEnded = function (a) {
        this.currentAnimation === a && (this.working ? (this.nextAnimation || (this.nextAnimation = "typing"), this.playNextAnimation()) : (this.playRandomIdleAnimation(), GameManager.workEnded(this)))
    };
    a._doResearch = function (a) {
        if ("thinking" != this.currentAnimation && !(0 >= a || !1 === this.isWorking())) {
            a -= a / 2 * (1 - this.efficiency);
            var c = this.currentResearch,
                f = a / c.duration,
                f = f * this.getBoostFactor();
            c.isTraining && this._doTraining(c, a);
            GameManager.increaseResearchProgress(this, f)
        }
    };
    a.finishTraining = function (a) {
        this.flags.lastTrainingTimestamp = GameManager.gameTime;
        this.flags.secondLastTrainingId = this.flags.lastTrainingId;
        this.flags.lastTrainingId = a.id
    };
    a._doTraining = function (a, c) {
        var f = GameManager.company,
            d = Training.getAllTrainings().first(function (g) {
                return g.id === a.id
            });
        if (d)
            if (d.tick) d.tick(this, c);
            else {
                var k = [];
                if (void 0 === this.currentResearch.lastSpawnTick) this.currentResearch.lastSpawnTick =
                    0;
                else {
                    var m = a.duration * a.progress;
                    if (2E3 <= m - a.lastSpawnTick) {
                        a.lastSpawnTick = m;
                        m = this.efficiency * this.getBoostFactor();
                        if (!this.onFire) {
                            this.flags.lastTrainingTimestamp && this.flags.lastTrainingTimestamp > GameManager.gameTime - 1E4 * GameManager.SECONDS_PER_WEEK ? m -= 0.2 : (this.flags.lastTrainingId = null, this.flags.secondLastTrainingId = null);
                            this.flags.secondLastTrainingId === d.id && (m -= 0.1);
                            this.flags.lastTrainingId === d.id && (m -= 0.3);
                            var l = f.gameLog.last();
                            f.currentWeek > l.releaseWeek + 22 && (m -= 0.2)
                        }
                        var m = Math.max(0.3,
                            m),
                            g = d.basePoints * m,
                            m = Math.floor(d.tF * g * f.getRandom()),
                            l = Math.floor(d.dF * g * f.getRandom()),
                            n = Math.floor(d.rF * g * f.getRandom()),
                            g = Math.floor(d.sF * g * f.getRandom());
                        f.getRandom();
                        d = d.maxP / 500;
                        f = f.getRandom();
                        m && (this.technologyFactor + m / 500 <= d || 0.1 > f) && k.push({
                            p: m,
                            t: "t"
                        });
                        l && (this.designFactor + l / 500 <= d || 0.1 > f) && k.push({
                            p: l,
                            t: "d"
                        });
                        n && (this.researchFactor + n / 500 < d || 0.1 > f) && (k.push({
                            p: n,
                            t: "r"
                        }), "specialTraining" === a.type && this.spawnPoints(n, "r"));
                        g && (this.speedFactor + g / 500 < d || 0.1 > f) && k.push({
                            p: g,
                            t: "s"
                        });
                        VisualsManager.getCharacterOverlay(this,
                            !0).animateTrainingProgress(k)
                    }
                }
            }
    };
    a.applyTrainingUpdate = function (a) {
        var c = a.p / 500;
        switch (a.t) {
            case "t":
                this.technologyFactor += c;
                break;
            case "d":
                this.designFactor += c;
                break;
            case "s":
                this.speedFactor += c;
                break;
            case "r":
                this.researchFactor += c
        }
    };
    a._resetEngineWork = function () {
        this.engineProgress = {
            points: 0,
            research: 0
        }
    };
    a._resetContractWork = function () {
        this.contractProgress = {
            d: 0,
            t: 0,
            r: 0
        }
    };
    a._resetBugFixingWork = function () {
        this.bugFixingDelta = 0
    };
    a.getCurrentQualityFactor = function () {
        var a = 0.3;
        if (0 === this.id) {
            var c =
                LevelCalculator.getLevel(this.experience);
            1 == c ? a += 0.3 : 2 == c ? a += 0.2 : 3 == c && (a += 0.1)
        }
        a += this.qualityFactor;
        return 1 < a ? 1 + 0.5 * (a - 1) : a
    };
    a._doEngineWork = function (a) {
        if ("thinking" != this.currentAnimation && !(0 >= a || !1 === this.isWorking())) {
            a /= Missions.BASE_ENGINE_DURATION;
            var c = Missions.BASE_POINTS * this.getCurrentQualityFactor() * a * this.efficiency,
                c = c * this.getBoostFactor(),
                f = this.engineProgress.points;
            this.engineProgress.points += c;
            Math.floor(this.engineProgress.points) > Math.floor(f) && (c = Math.floor(this.engineProgress.points) -
                Math.floor(f), GameManager.currentEngineDev.remainingPoints < c && (c = GameManager.currentEngineDev.remainingPoints), 0 != c ? this.spawnPoints(c, "e") : 0 === GameManager.currentEngineDev.remainingPoints && 0 >= GameManager.currentEngineDev.remainingPointsDisplay && this.endWorking());
            c = this.engineProgress.research;
            this.engineProgress.research += Missions.BASE_RESEARCH_POINTS / 2 * this.researchFactor * a * this.efficiency;
            Math.floor(this.engineProgress.research) > Math.floor(c) && (c = Math.floor(this.engineProgress.research) - Math.floor(c),
                0 != c && this.spawnPoints(c, "r"))
        }
    };
    a._doContractWork = function (a) {
        if ("thinking" != this.currentAnimation && this.isWorking) {
            var c = GameManager.currentContract,
                f = GameManager.company;
            if (c && f) {
                a /= Missions.BASE_ENGINE_DURATION;
                a = Missions.BASE_POINTS * this.getCurrentQualityFactor() * a * this.efficiency;
                a /= 2;
                var d = 0 < c.requiredD - c.spawnedD,
                    k = 0 < c.requiredT - c.spawnedT;
                if (d || k) {
                    d && k || (a += 0.4 * a);
                    if (d) {
                        var m = a * this.designFactor,
                            m = m + 0.2 * m * f.getRandom(),
                            d = this.contractProgress.d;
                        this.contractProgress.d += m;
                        Math.floor(this.contractProgress.d) >
                            Math.floor(d) && (d = Math.floor(this.contractProgress.d) - Math.floor(d), c.remainingD < d && (d = c.remainingD), 0 != d && (this.spawnPoints(d, "d"), c.remainingD -= d, c.spawnedD += d))
                    }
                    k && (k = a * this.technologyFactor, k += 0.2 * k * f.getRandom(), d = this.contractProgress.t, this.contractProgress.t += k, Math.floor(this.contractProgress.t) > Math.floor(d) && (d = Math.floor(this.contractProgress.t) - Math.floor(d), c.remainingT < d && (d = c.remainingT), 0 != d && (this.spawnPoints(d, "t"), c.remainingT -= d, c.spawnedT += d)));
                    f = a * this.researchFactor / 6;
                    c.rF &&
                        (f *= c.rF);
                    d = this.contractProgress.r;
                    this.contractProgress.r += f;
                    Math.floor(this.contractProgress.r) > Math.floor(d) && (d = Math.floor(this.contractProgress.r) - Math.floor(d), 0 != d && this.spawnPoints(d, "r"))
                } else this.endWorking()
            } else this.endWorking()
        }
    };
    a.isWorking = function () {
        if ("typing" === this.currentAnimation || "drawNotepad" === this.currentAnimation) return !0;
        if (this.working && "sitBack" === this.currentAnimation) {
            var a = VisualsManager.getCharacterOverlay(this, !0);
            a && a.continueSitBack()
        }
        return !1
    };
    a._doRelax = function (a) {
        "sitBack" ===
            this.currentAnimation && (this.relaxDelta += a, 10 < this.relaxDelta * this.speedFactor && (this.relaxDelta = 0, this.flags.relaxGained += 0.001, this.adjustEfficiency(0.001), this.efficiency === this.getMaxEfficiency() && 0.3 <= this.flags.relaxGained && (this.state = CharacterState.Idle)))
    };
    a._doWork = function (a) {
        if (GameManager.currentFeature) {
            var c = this.currentFeature;
            void 0 === c.startTime && (c.startTime = GameManager.gameTime, c.progress = 0);
            var f = GameManager.company;
            if ("thinking" === this.currentAnimation && 1 === GameManager.staffCountWorkingOnFeature(this.currentFeature) ||
                "sitBack" === this.currentAnimation) c.startTime += a;
            else if ("BugFixing" === c.id) this._doFinishingWork(f, a);
            else {
                var d = this.getBoostFactor(),
                    d = this.onFire ? (d - 1) / 2 : 0,
                    k = 0.44 + 0.5 * this.getCurrentQualityFactor().clamp(0, 1),
                    m = GameManager.gameTime - c.startTime;
                if (!(0 >= m) && (m /= c.duration, 0 != m && 1 != this.currentFeature.progress && (1 < m && (a -= c.duration * (m - 1)), m = Math.min(m, 1), c.progress = m, 1 >= m))) {
                    var l = this.efficiency;
                    var g = GameManager.staffCountWorkingOnFeature(c),
                        n = General.getOptimalTeamSize(GameManager.company.currentGame),
                        g = (n / g).clamp(0, 1);
                    a = a * l * (1 === n ? g : 0.5 + 0.5 * g);
                    c.currentDf += c.d / c.duration * a;
                    c.currentTf += c.t / c.duration * a;
                    c.currentRf += c.r / c.duration * a;
                    a = Math.floor(c.currentDf);
                    l = Math.floor(c.currentTf);
                    n = Math.floor(c.currentRf);
                    if (a > c.currentD && ("thinking" != this.currentAnimation && 1 > m || 1 === m)) {
                        for (g = 0; g < a - c.currentD; g++) f.getRandom() > k ? this.spawnPoints(1, "b", 200 * g) : (this.spawnPoints(1, "d", 200 * g), this._chanceToSpawnRandombug(f, 200 * (g + 1))), f.getRandom() < d && this.spawnPoints(1, "d", 250 * g);
                        this.dLeft -= a - c.currentD;
                        c.currentD =
                            a
                    }
                    if (l > c.currentT && ("thinking" != this.currentAnimation && 1 > m || 1 === m)) {
                        for (g = 0; g < l - c.currentT; g++) f.getRandom() > k ? this.spawnPoints(1, "b", 180 * (g + 1)) : (this.spawnPoints(1, "t", 180 * (g + 1)), this._chanceToSpawnRandombug(f, 180 * (g + 1))), f.getRandom() < d && this.spawnPoints(1, "t", 220 * (g + 1));
                        this.tLeft -= l - c.currentT;
                        c.currentT = l
                    }
                    if (n > c.currentR && ("thinking" != this.currentAnimation && 1 > m || 1 === m)) {
                        for (g = 0; g < n - c.currentR; g++) this.spawnPoints(1, "r", 160 * g), f.getRandom() < d && this.spawnPoints(1, "r", 190 * g);
                        this.rLeft -= n - c.currentR;
                        c.currentR = n
                    }
                }
            }
        }
    };
    a._doFinishingWork = function (a, c) {
        var f = a.currentGame,
            d = 1 / (this.technologyFactor + this.designFactor) * this.designFactor;
        if (!(0 >= c || !1 === this.isWorking()))
            if (a.currentGame.flags.finished) 0 >= GameManager.spawnedPoints && GameManager.finishCurrentMission();
            else if (this.bugFixingDelta += c, !(500 > this.bugFixingDelta * this.speedFactor)) {
                this.bugFixingDelta = 0;
                var k = 1 * this.efficiency;
                0 !== f.bugs || f.flags.bugsFixedTimestamp || (f.flags.bugsFixedTimestamp = GameManager.gameTime);
                if (0 < f.bugs && 0.9 > a.getRandom()) {
                    if (a.currentGame.bugs -
                        GameManager.spawnedPoints <= k && (k = a.currentGame.bugs - GameManager.spawnedPoints), 0 < k)
                        for (var m = 0; m < k; m++) {
                            this.spawnPoints(1, "br");
                            var l = f.bugs - f.freeBugCount;
                            0 < f.freeBugCount && (0 >= l || 0.5 < a.getRandom()) ? f.freeBugCount-- : (0.3 > a.getRandom() || this.onFire) && a.getRandom() < this.getCurrentQualityFactor().clamp(0, 1) && (a.getRandom() < d ? this.spawnPoints(1, "d") : this.spawnPoints(1, "t"))
                        }
                } else if (k = 0.44 + 0.5 * this.getCurrentQualityFactor().clamp(0, 1), m = (0.5 * this.getCurrentQualityFactor() * this.getBoostFactor()).clamp(0,
                    1) / 2, a.getRandom() < m)
                    if (a.getRandom() > k) this.spawnPoints(1, "b"), f.freeBugCount++;
                    else if (f.flags.bugsFixedTimestamp ? (k = GameManager.gameTime - f.flags.bugsFixedTimestamp, m = 1E4 * General.getGameSizePointsFactor(f), m = k < m / 2 ? 1 : Math.max(0, m - k) / (m / 2)) : m /= 8, 0 === m) 0 < f.hypePoints && f.hypePoints--;
                    else if (1 === m || a.getRandom() < m) a.getRandom() < d ? this.spawnPoints(1, "d") : this.spawnPoints(1, "t")
            }
    };
    a._chanceToSpawnRandombug = function (a, c) {
        var f = 0.05 + 0.6 * Math.max(0, (General.getEffectiveWorkload(this, a.currentGame) - 100) /
            100);
        a.getRandom() < f && (this.spawnPoints(1, "b", c), a.currentGame.freeBugCount++)
    };
    a.spawnPoints = function (a, c, f) {
        for (var d = VisualsManager.getCharacterOverlay(this), k = 0; k < a; k++) {
            "e" === c && GameManager.increaseEnginePoints();
            var m = {
                gameTime: GameManager.gameTime,
                type: c,
                duration: SPAWN_POINTS_DURATION,
                delay: f
            };
            m.id = Math.floor(65535 * Math.random());
            for (var l = [], g = 0; g < this.spawnedPoints.length; g++) this.spawnedPoints[g].gameTime + this.spawnedPoints[g].duration <= GameManager.gameTime && l.push(this.spawnedPoints[g]);
            for (g = 0; g < l.length; g++) this.spawnedPoints.remove(l[g]);
            this.spawnedPoints.push(m);
            "br" === m.type ? d.spawnBugRemovePoint(m.id, m.type, m.duration, f) : d.spawnPoint(m.id, m.type, m.duration, f)
        }
    };
    a.removeSpawnedPoint = function (a) {
        var c = this.spawnedPoints.first(function (c) {
            return c.id === a
        });
        c && this.spawnedPoints.remove(c)
    };
    a.resetLeftOverPoints = function () {
        this.rLeft = this.tLeft = this.dLeft = 0
    };
    a._calcFeature = function () {
        var a = GameManager,
            c = a.currentFeature,
            f = General.getD(a.company.currentGame, c) * this.designFactor *
                this.getCurrentQualityFactor(),
            f = f + this.dLeft;
        0 !== this.id && 1 > f && 0.6 < f && (f = 1);
        var d = General.getT(a.company.currentGame, c) * this.technologyFactor * this.getCurrentQualityFactor(),
            d = d + this.tLeft;
        0 !== this.id && 1 > d && 0.6 < d && (d = 1);
        a = General.getR(a.company.currentGame, c) * this.researchFactor;
        a += this.rLeft;
        console.log("feature:{0}, d:{1} t:{2}".format(c.id, f, d));
        this.dLeft = f - Math.floor(f * c.progress);
        this.tLeft = d - Math.floor(d * c.progress);
        this.rLeft = a - Math.floor(a * c.progress);
        this.currentFeature = {
            id: c.id,
            type: c.type,
            d: f,
            t: d,
            r: a,
            currentD: Math.floor(f * c.progress),
            currentT: Math.floor(d * c.progress),
            currentR: Math.floor(a * c.progress),
            currentDf: 0,
            currentTf: 0,
            currentRf: 0,
            duration: c.duration,
            progress: c.progress
        }
    };
    a.goOnVacation = function () {
        this.relaxDelta = 0;
        this.state = CharacterState.Vacation;
        this.working = !1;
        this.currentFeature = this.currentResearch = null;
        this.resetLeftOverPoints();
        var a = 54;
        GameFlags.G782 && 15 <= GameManager.company.getCurrentDate().year && (a = 20);
        this.flags.nextVacation = GameManager.gameTime + a * GameManager.SECONDS_PER_WEEK *
            1E3;
        this.flags.relaxGained = 0;
        this.flags.needsVacation = !1
    };
    a.fire = function () {
        var a = GameManager.company;
        a.staff.remove(this);
        a.flags.usedNames || (a.flags.usedNames = []);
        a.flags.usedNames.push(this.name);
        VisualsManager.removeStaff(this)
    }
})();