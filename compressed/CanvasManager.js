var CanvasManager = {};
(function () {
    var a = CanvasManager;
    a.init = function (c) {
        b(a, c)
    };
    var b = function (b, d) {
        b.backgroundCanvas = document.createElement("canvas");
        b.backgroundCanvas.id = "backgroundCanvas";
        b.backgroundCanvas.width = d.clientWidth;
        b.backgroundCanvas.height = d.clientHeight;
        b.backgroundCanvas.style.position = "absolute";
        b.backgroundContext = b.backgroundCanvas.getContext("2d");
        b.backgroundStage = new createjs.Stage(b.backgroundCanvas);
        b.backgroundOverlayCanvas = document.createElement("canvas");
        b.backgroundOverlayCanvas.id = "backgroundOverlayCanvas";
        b.backgroundOverlayCanvas.width = d.clientWidth;
        b.backgroundOverlayCanvas.height = d.clientHeight;
        b.backgroundOverlayCanvas.style.position = "absolute";
        b.backgroundOverlayContext = b.backgroundOverlayCanvas.getContext("2d");
        b.backgroundOverlayStage = new createjs.Stage(b.backgroundOverlayCanvas);
        b.characterCanvas = document.createElement("canvas");
        b.characterCanvas.id = "characterCanvas";
        b.characterCanvas.width = d.clientWidth;
        b.characterCanvas.height = d.clientHeight;
        b.characterCanvas.style.position = "absolute";
        b.characterContext =
            b.characterCanvas.getContext("2d");
        b.characterStage = new createjs.Stage(b.characterCanvas);
        a.leftScreen != b && a.rightScreen != b && (b.foregroundCanvas = document.createElement("canvas"), b.foregroundCanvas.id = "foregroundCanvas", b.foregroundCanvas.width = d.clientWidth, b.foregroundCanvas.height = d.clientHeight, b.foregroundCanvas.style.position = "absolute", b.foregroundContext = b.foregroundCanvas.getContext("2d"), b.foregroundStage = new createjs.Stage(b.foregroundCanvas));
        b.backgroundInvalid = !1;
        b.invalidateBackground =
            function () {
                b.backgroundInvalid = !0
            };
        b.updateCanvasSizes = function (c, m) {
            var l = c;
            maxW = 2560;
            maxH = 1440;
            PlatformShim.ISLOWRES && (maxW = 1366, maxH = 768);
            c = m / maxH * maxW;
            $(d).width(c + "px").height(m + "px");
            b.backgroundCanvas.width = c;
            b.backgroundCanvas.height = m;
            b.invalidateBackground();
            b.backgroundOverlayCanvas.width = c;
            b.backgroundOverlayCanvas.height = m;
            b.characterCanvas.width = c;
            b.characterCanvas.height = m;
            b.foregroundCanvas && (b.foregroundCanvas.width = c, b.foregroundCanvas.height = m);
            b.globalScale = m / maxH;
            b.globalScaleIgnoringLowResBackground =
                m / 1440;
            b === a ? (a.leftScreen && a.leftScreen.updateCanvasSizes(c, m), a.rightScreen && a.rightScreen.updateCanvasSizes(c, m), $(d).css("left", c + "px")) : b == a.rightScreen && $(d).css("left", 2 * c + "px");
            b.isSmallScreen = 1024 >= c;
            VisualsManager.handleUltraWideMonitors(l, m)
        };
        d.appendChild(b.backgroundCanvas);
        d.appendChild(b.backgroundOverlayCanvas);
        d.appendChild(b.characterCanvas);
        b.foregroundCanvas && d.appendChild(b.foregroundCanvas)
    };
    a.initLeftScreen = function (c) {
        a.leftScreen = {};
        b(a.leftScreen, c)
    };
    a.initRightScreen = function (c) {
        a.rightScreen = {};
        b(a.rightScreen, c)
    };
    var c = function (a) {
        a.backgroundStage && (a.backgroundInvalid && (a.backgroundStage.update(), a.backgroundInvalid = !1), a.backgroundOverlayStage.update(), a.characterStage.update(), a.foregroundStage && a.foregroundStage.update())
    };
    a.update = function (b, d) {
        a.backgroundStage && (a.backgroundInvalid && (a.backgroundStage.update(), a.backgroundInvalid = !1), !1 != CanvasManager.zone1Activ && (SettingsGameplay.isFrameSkipEnabled() && !b && 1 != GameManager._skipFrameCount || a.backgroundOverlayStage.update(), a.foregroundStage.update(),
            SettingsGameplay.isFrameSkipEnabled() && !b && 2 != GameManager._skipFrameCount || a.characterStage.update()), (!1 != CanvasManager.zone0Activ || d) && a.leftScreen && c(a.leftScreen), (!1 != CanvasManager.zone2Activ || d) && a.rightScreen && c(a.rightScreen))
    }
})();
(function () {
    var a = GameManager;
    a.MAX_RND_COST = 3E6;
    a.RND_DECREASE_PER_SPECIALIST = 1E5;
    a.MAX_HW_COST = 3E6;
    a.HW_DECREASE_PER_SPECIALIST = 1E5;
    a.startProject = function (b) {
        var f = b.targetZone,
            d = {};
        "custom console" === b.id && $.extend(d, b);
        $.extend(d, {
            id: b.id,
            name: b.name,
            progress: 0,
            startPoints: b.pointsCost,
            remainingPoints: b.pointsCost,
            iconUri: b.iconUri,
            targetZone: f,
            startTime: GameManager.gameTime
        });
        0 == f ? (a.currentHwProject = d, VisualsManager.putConsoleToPedestal()) : 2 == f && (a.currentRnDProject = d, Tutorial.rndProjectStarted())
    };
    a.finishProject = function (b) {
        a.currentHwProject == b ? a.currentHwProject = null : a.currentRnDProject == b && (a.currentRnDProject = null);
        "custom console" === b.id ? (a.finishCustomConsole(b), VisualsManager.putConsoleToPedestal()) : (Research.bigProjects.first(function (a) {
            return a.id == b.id
        }).complete(GameManager.company), ghg4.ghg5("project complete", {
            id: b.id
        }))
    };
    a.cancelProject = function (a) {
        GameManager.currentHwProject == a && (GameManager.currentHwProject = null, VisualsManager.putConsoleToPedestal());
        GameManager.currentRnDProject ==
            a && (GameManager.currentRnDProject = null);
        VisualsManager.updateProjectStatusCards();
        var b = Research.bigProjects.first(function (b) {
            return b.id == a.id
        });
        b && b.cancel && b.cancel(GameManager.company)
    };
    a.canDevelopConsole = function () {
        if (a.currentHwProject) return !1;
        var b = a.company;
        return b ? b.flags.hwLabUnlocked : !1
    };
    a.finishCustomConsole = function (b) {
        var f = GameManager.company;
        if (f) {
            f.flags["console" + b.variation + "Used"] = !0;
            var d = f.getDate(f.currentWeek / GameManager.flags.gameLengthModifier),
                k = 1.1,
                m = f.availablePlatforms.concat(f.licencedPlatforms).max(function (a) {
                    return a.techLevel
                }),
                l = b.techLevel >= m,
                g = b.techLevel - m,
                k = k + g / 5,
                m = b.qF,
                g = 10 * m - b.techLevel,
                k = k + (g / 20).clamp(-0.2, 0.2),
                g = b.features.map(function (a) {
                    return Research.getAllItems().first(function (b) {
                        return b.id === a
                    })
                }).filter(function (a) {
                    return a.category != "Graphic".localize()
                }).sum(function (a) {
                    return a.v
                }) / 22,
                k = 0.7 * k + 0.3 * g;
            1 < k && (k = 1 + 0.3 * (k - 1));
            for (var n = Platforms.allPlatforms.filter(function (a) {
                return a.techLevel <= b.techLevel
            }).max(function (a) {
                return a.startAmount
            }), n = n * k, r = Platforms.allPlatforms.filter(function (a) {
                return a.techLevel <=
                    b.techLevel
            }).max(function (a) {
                return Platforms.getMarketSizeForWeek(a, f.currentWeek + 144, f)
            }), r = r / 5E6 * k, d = {
                id: a.getGUID(),
                isCustom: !0,
                iconUri: b.iconUri,
                name: b.name,
                company: f.name,
                published: "{0}/{1}/{2}".format(d.year, d.month, d.week),
                developmentCosts: 0,
                genreWeightings: GameManager.getCalculatedPlatformGenreWeightings(),
                audienceWeightings: GameManager.getCalculatedPlatformAudienceWeightings(),
                techLevel: b.techLevel,
                isGoodTech: l,
                featureFactor: g,
                startAmount: n,
                unitsSold: r,
                qF: m,
                successFactor: k,
                version: b.version
            },
                k = f.licencedPlatforms.filter(function (a) {
                    return a.isCustom && !a.saleCancelled
                }), l = 0; l < k.length; l++) k[l].saleCancelled = !0;
            f.licencedPlatforms.push(d);
            Media.createConsoleStartStory(d);
            Tutorial.consoleReleased(1.4)
        }
    };
    var b = function (a, b, d) {
        b === GameGenre.Action && (a[0] += d);
        b === GameGenre.Adventure && (a[1] += d);
        b === GameGenre.RPG && (a[2] += d);
        b === GameGenre.Simulation && (a[3] += d);
        b === GameGenre.Strategy && (a[4] += d);
        b === GameGenre.Casual && (a[5] += d)
    };
    a.getCalculatedPlatformGenreWeightings = function () {
        for (var c = [0.8, 0.8,
            0.8, 0.8, 0.8, 0.8
        ], f = [0, 0, 0, 0, 0, 0], d = a.company.gameLog, k = 0; k < d.length; k++) b(f, d[k].genre, 1), d[k].secondGenre && b(f, d[k].secondGenre, 0.5);
        for (var d = f.slice().sort(function (a, b) {
            return b - a
        }), m = [1, 1, 0.9, 0.8, 0.8, 0.7], k = d.length - 1; 0 <= k; k--)
            for (var l = 0; l < f.length; l++) f[l] == d[k] && (c[l] = m[k]);
        return c
    };
    a.getCalculatedPlatformAudienceWeightings = function () {
        for (var b = [0.8, 0.8, 0.8], f = [0, 0, 0], d = a.company.gameLog, k = 0; k < d.length; k++) f["young" === d[k].targetAudience ? 0 : "mature" === d[k].targetAudience ? 2 : 1]++;
        for (var d =
            f.max(function (a) {
                return a
            }), m = f.min(function (a) {
                return a
            }), k = 0; k < b.length; k++) b[k] = f[k] === d ? 1 : f[k] === m ? 0.8 : 0.9;
        return b
    };
    a.getLabCostPerMonth = function (b) {
        if (!GameManager.company) return 0;
        var f = 0,
            d = 1;
        0 === b && GameManager.company.flags.hwLabUnlocked ? (f = GameManager.company.flags.hwBudget, d = a.getMaxHwBudget()) : 2 == b && GameManager.company.flags.rndLabUnlocked && (f = GameManager.company.flags.rndBudget, d = a.getMaxRndBudget());
        return b = 1E4 * Math.floor(d * f / 1E4)
    };
    a.calculateFractionalLabCosts = function (b) {
        if (GameManager.company &&
            0 !== b) {
            if (GameManager.company.flags.hwLabUnlocked) {
                var f = a.getLabCostPerMonth(0);
                0 != f && (f /= 4 * GameManager.SECONDS_PER_WEEK, GameManager.company.flags.fractionalHwLabCosts += f / 1E3 * b)
            }
            GameManager.company.flags.rndLabUnlocked && (f = a.getLabCostPerMonth(2), 0 != f && (f /= 4 * GameManager.SECONDS_PER_WEEK, GameManager.company.flags.fractionalRndLabCosts += f / 1E3 * b))
        }
    };
    a.addTickListener(function (b) {
        GameManager.company && 4 === GameManager.company.currentLevel && (GameManager.company.flags.hwLabUnlocked || GameManager.company.flags.rndLabUnlocked) &&
            (a.calculateFractionalLabCosts(b), VisualsManager.updateProjectStatusCards());
        a.currentHwProject && 0.75 <= a.currentHwProject.progress && !a.currentHwProject.announceQ && "custom console" === a.currentHwProject.id && (a.currentHwProject.announceQ = !0, (b = DecisionNotifications.announceConsole.getNotification(a.company)) && a.company.notifications.push(b))
    }, !0)
})();
(function () {
    var a = GameManager;
    a.enableContracts = function () {
        var a = GameManager.company,
            c = 2 + 2 * a.getRandom(),
            f = a.gameLog.last(),
            d = 8 <= f.score ? "I love your work".localize("contractDescrFragment") : 5 <= f.score ? "I am impressed by your talent".localize("contractDescrFragment") : "I think you have potential".localize("contractDescrFragment"),
            f = new Notification("Contract Work".localize("heading"), "Hi there,\nI've just finished {0} and {1}.\nI'm in the contracting business and we could use skills like yours. If you are ever short on cash just let me know and I will see if I have some work for you.\nJason".localize("{1} is contractDescrFragment").format(f.title,
                d));
        f.type = NotificationType.Others;
        f.previewImage = "./images/notificationIcons/icon_notification_contract_generic.png";
        f.weeksUntilFired = c;
        f.setFlag("contractsEnabled", !0);
        a.notifications.push(f);
        Tutorial.contractsUnlocked(c)
    };
    a.enableMediumContracts = function () {
        var a = GameManager.company;
        if (!a.flags.mediumContractsScheduled) {
            a.flags.mediumContractsScheduled = !0;
            var c = 4 + 3 * a.getRandom(),
                f = new Notification("Contract Work".localize("heading"), "Hi again,\nI heard that you've been very successful in the gaming business and are starting to grow your team.\nI've updated our client list, so if you are looking for some contract work let me know.\nJason{n}Medium sized contracts have been unlocked.".localize());
            f.type = NotificationType.Others;
            f.previewImage = "./images/notificationIcons/icon_notification_contract_generic.png";
            f.weeksUntilFired = c;
            f.setFlag("mediumContractsEnabled", !0);
            a.notifications.push(f)
        }
    };
    a.enableLargeContracts = function (a) {
        var c = GameManager.company;
        if (!c.flags.largeContractsScheduled) {
            c.flags.largeContractsScheduled = !0;
            var f = new Notification("Contract Work".localize("heading"), "Wow, I have seen some pictures of your new office! Cutting edge stuff!\nI'm sure you are doing very well but if you need to top up your budget I've a couple of big jobs that need to be taken care of.\nJason{n}Large contracts have been unlocked.".localize());
            f.type = NotificationType.Others;
            f.previewImage = "./images/notificationIcons/icon_notification_contract_generic.png";
            f.weeksUntilFired = a;
            f.setFlag("largeContractsEnabled", !0);
            c.notifications.push(f)
        }
    };
    a.contractFinished = function (a) {
        for (var c = GameManager.company, f = c.staff, d = 0; d < f.length; d++) f[d].state == CharacterState.WorkOnContract && (f[d].state = CharacterState.Idle);
        c.flags.contractFinishedShown || (c.flags.contractFinishedShown = !0, a = a ? "Jason here.\nI just got word from the client that the contract was completed successfully. Excellent work!".localize() +
            "\n" : "Jason here.\nI see that the contract was not completed in time. Be careful what contracts you accept otherwise those penalties quickly add up.{n}Don't worry too much though, I don't hold grudges. If you want to try again let me know.".localize() + "\n", c.notifications.push(new Notification("Contract Work".localize("heading"), a + "Usually I have new contracts every six months so check back some time.".localize(), "OK".localize(), 0.3, {
                type: NotificationType.Others,
                previewImage: "./images/notificationIcons/icon_notification_contract_generic.png"
            })))
    };
    a.startContract = function (b) {
        var c = ProjectContracts.getAllContracts().first(function (a) {
            return a.id === b.id
        });
        c.accept && c.accept(a.company);
        c = {};
        $.extend(c, b);
        if (b.requiredD || b.requiredT) c.isGenericContract = !0, c.remainingD = b.requiredD, c.remainingT = b.requiredT, c.visualDRemaining = b.requiredD, c.visualTRemaining = b.requiredT, c.startTime = a.gameTime;
        a.currentContract = c;
        "gameContract" === c.type ? (a.company.adjustCash(c.payment, "Up-front payment".localize("heading")), UI.updateStatusBar(a.company), a.transitionToState(State.CreateGame)) :
            VisualsManager.startContract();
        GDT.fire(a, GDT.eventKeys.gameplay.contractStarted, {
            company: a.company,
            contract: a.currentContract
        })
    };
    a.contractCancelled = function () {
        var b = a.currentContract;
        a.currentContract = null;
        "gameContract" === b.type && a.company.adjustCash(-b.payment, "Contract Refund".localize("heading"))
    };
    a._setContractRequirements = function (b) {
        var c = a.currentContract;
        b.flags.lockedSettings = {};
        c.topic && (b.topic = Topics.topics.first(function (a) {
            return a.id == c.topic
        }), b.flags.lockedSettings.topic = !0);
        c.genre &&
            (b.genre = GameGenre.getAll().first(function (a) {
                return a.id == c.genre
            }), b.flags.lockedSettings.genre = !0);
        c.secondGenre && (b.secondGenre = GameGenre.getAll().first(function (a) {
            return a.id == c.secondGenre
        }), b.flags.lockedSettings.secondGenre = !0);
        c.platform && (b.platforms = [], b.platforms.push(GameManager.company.licencedPlatforms.first(function (a) {
            return a.id == c.platform
        })), b.flags.lockedSettings.platform = !0);
        c.gameAudience && (b.targetAudience = c.gameAudience, b.flags.lockedSettings.targetAudience = !0);
        c.gameSize &&
            (b.gameSize = c.gameSize, b.flags.lockedSettings.gameSize = !0);
        b.flags.contractId = c.refNumber;
        b.flags.royaltyRate = c.royaltyRate
    };
    a.finishContract = function (b) {
        var c = a.currentContract;
        a.currentContract = null;
        c.isGenericContract && VisualsManager.gameStatusBar.finishContract();
        var f = ProjectContracts.getAllContracts().first(function (a) {
            return a.id === c.id
        });
        f && f.complete && f.complete(a.company, !b, c);
        GDT.fire(a, GDT.eventKeys.gameplay.contractFinished, {
            company: a.company,
            contract: c
        })
    };
    a.updateContractProgress = function () {
        var b =
            a.currentContract;
        b.weeksToFinish && !a.company.currentGame && (0 >= b.visualDRemaining && 0 >= b.visualTRemaining ? a.finishContract() : (b = (a.gameTime - b.startTime) / (b.weeksToFinish * a.SECONDS_PER_WEEK * 1E3), 1 <= b ? a.finishContract(!0) : VisualsManager.gameStatusBar.updateProgress(1 - b, !0, 100)))
    }
})();