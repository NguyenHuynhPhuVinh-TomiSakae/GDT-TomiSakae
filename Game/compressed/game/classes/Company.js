"use strict";
var Company = function (a) {
    this.name = a;
    this.timePlayed = 0;
    this.currentGame = void 0;
    this.cash = 0;
    this.cashLog = [];
    this.fansChange = this.fans = 0;
    this.gameLog = [];
    this.trashedGames = [];
    this.notifications = [];
    this.activeNotifications = [];
    this.sidebarNotifications = [];
    this.booths = [];
    this.booths.push(new Booth(1, "Small Booth".localize("heading"), 0.3, "This is a small pop up stand where we can show our marketing material. It isn't very impressive but a common setup at the G3.".localize(), 8E4, "./images/superb/boothFloor.png",
        "./images/superb/boothSmallBg.png"));
    this.booths.push(new Booth(2, "Medium Booth".localize("heading"), 0.5, "This is a larger booth in a better location. We should expect more visitors with this booth and have space to give away demos of our games.".localize(), 5E5, "./images/superb/boothFloor.png", "./images/superb/boothMediumBg.png"));
    this.booths.push(new Booth(3, "Large Booth".localize("heading"), 1.3, "With this package we get our own section in the main hall of the G3. We can expect a large number of visitors.".localize(),
        15E5, "./images/superb/boothFloor.png", "./images/superb/boothLargeBg.png", "./images/superb/boothLargeFg.png"));
    this.booths.push(new Booth(4, "Custom".localize("heading, as in Custom Booth"), 2, "", 0, "./images/superb/boothCustomFloor.png", "./images/superb/boothCustom.png"));
    this.topics = [];
    this.licencedPlatforms = [];
    this.availablePlatforms = [];
    this.currentWeek = 0;
    this.currentLevel = 1;
    this.conferenceHype = 0;
    this.staff = [];
    this.maxStaff = 1;
    this.staff.push(new Character({
        id: 0,
        name: PlatformShim.getUserName(),
        dF: 0.6,
        tF: 0.6,
        speedF: 0.6,
        qualityF: 0.2,
        researchF: 0.6,
        salary: 0,
        slot: 0,
        working: !1,
        loopCount: -1
    }));
    this.researchPoints = 0;
    this.scheduledStoriesShown = [];
    this.triggerNotificationsShown = [];
    this.tutorialMessagesShown = [];
    this.conferenceStandFactor = null;
    this.trainingEnabled = this.researchEnabled = !1;
    this.availableResearch = [];
    this.researchCompleted = [];
    this.engines = [];
    this.engineParts = [];
    this.specialItems = [];
    this.features = [];
    this.lastTopScore = this.topScoreAchievements = 0;
    this.flags = {
        secrecy: 0,
        good: 0,
        evil: 0,
        nextGameHypeBonus: 0,
        sharesSold: 0
    };
    this.knowledge = {};
    this.eventTriggerCounts = {};
    this.mods = []
};
(function () {
    var a = Company.prototype;
    a.createNewGame = function () {
        var a = new Game(this);
        a.title = "Game #".localize("followed by number") + (this.gameLog.length + 1);
        this.flags.nextGameHypeBonus && (a.hypePoints += this.flags.nextGameHypeBonus, this.flags.nextGameHypeBonus = 0);
        this.currentGame = a;
        for (var c = 0; c < this.staff.length; c++) this.staff[c].flags.workload = 0;
        this.currentGame.flags.featureResponsibility = $.extend({}, this.flags.featureResponsibility);
        return a
    };
    a.getCurrentDate = function () {
        var a = Math.floor(this.currentWeek) %
            4 + 1,
            c = Math.floor(this.currentWeek) / 4,
            f = c / 12 + 1;
        return {
            year: Math.floor(f),
            month: Math.floor(c % 12 + 1),
            week: Math.floor(a)
        }
    };
    a.getDate = function (a) {
        var c = Math.floor(a) % 4 + 1;
        a = Math.floor(a) / 4;
        var f = a / 12 + 1;
        return {
            year: Math.floor(f),
            month: Math.floor(a % 12 + 1),
            week: Math.floor(c)
        }
    };
    Company.getDate = a.getDate;
    a.calculateCurrentNofitications = function () {
        var a = [];
        this.notifications.addRange(Media.getNewNotifications(this));
        this.notifications.addRange(DecisionNotifications.getNewNotifications(this));
        for (var c = 0; c < this.notifications.length; c++) {
            var f =
                this.notifications[c];
            0 >= f.weeksUntilFired && (UI.showNotificationViaSidebar(f) || this.activeNotifications.addRange(f.split()), a.push(f))
        }
        for (c = 0; c < a.length; c++) f = a[c], this.notifications.splice(this.notifications.indexOf(f), 1)
    };
    a.hasTopicWithId = function (a) {
        return this.topics.some(function (c) {
            return c.id === a
        })
    };
    a.canDevelopEngine = function () {
        return -1 != this.researchCompleted.indexOf(Research.CustomEngine)
    };
    a.getRandom = function () {
        this.randomCalled += 1;
        return this._mersenneTwister.random()
    };
    a.adjustFans = function (a) {
        var c =
            this.fansChange ? this.fansChange : 0;
        this.fansChange = 0 > this.fans + c + a ? -this.fans : c + a
    };
    a.adjustCash = function (a, c) {
        if (isNaN(a)) {
            if (GameFlags.ghg6) throw "value cannot be NaN";
        } else this.cash += a, c && this.cashLog.push({
            amount: a,
            label: c
        })
    };
    a.adjustHype = function (a) {
        this.currentGame && (this.currentGame.hypePoints += a)
    };
    a.canDevelopMediumGames = function () {
        return -1 != this.researchCompleted.indexOf(Research.MediumSizeGames)
    };
    a.canDevelopLargeGames = function () {
        return -1 != this.researchCompleted.indexOf(Research.LargeSizeGames)
    };
    a.canDevelopAAAGames = function () {
        return -1 != this.researchCompleted.indexOf(Research.AAA)
    };
    a.canUseMultiGenre = function () {
        return -1 != this.researchCompleted.indexOf(Research.MultiGenre)
    };
    a.canDevelopMultiPlatform = function () {
        return -1 != this.researchCompleted.indexOf(Research.MultiPlatform)
    };
    a.canDevelopMMOGames = function () {
        return -1 != this.researchCompleted.indexOf(Research.MMO)
    };
    a.isMMOInSale = function () {
        var a = this.currentWeek;
        return 0 < this.gameLog.filter(function (c) {
            return a > c.releaseWeek && 0 < c.currentSalesCash &&
                !c.soldOut && c.flags.mmo
        }).length
    };
    a.canSetTargetAudience = function () {
        return -1 != this.researchCompleted.indexOf(Research.TargetAudience)
    };
    a.getGameById = function (a) {
        return this.gameLog.first(function (c) {
            return c.id === a
        })
    };
    a.getPossibleGamesForSequel = function () {
        var a = this.gameLog.filter(function (a) {
            return null != a.sequelTo
        }).map(function (a) {
            return a.sequelTo
        });
        return this.gameLog.filter(function (c) {
            return -1 == a.indexOf(c.id)
        })
    };
    a.getPossibleGamesForPack = function () {
        return this.gameLog.filter(function (a) {
            return !0 ===
                a.flags.mmo && !a.soldOut
        })
    };
    a.isCurrentlyDevelopingGame = function () {
        return null != this.currentGame && 0 != this.currentGame.costs && !this.currentGame.releaseWeek
    };
    a.isGameProgressBetween = function (a, c) {
        return null != this.currentGame && (!c || GameManager.getCurrentGameProgress() < c) && (!a || GameManager.getCurrentGameProgress() > a)
    };
    a.isLaterOrEqualThan = function (a, c, f) {
        var d = this.getCurrentDate();
        return d.year > a || d.year === a && d.month > c || d.year === a && d.month === c && d.week >= f
    };
    a.isEarlierOrEqualThan = function (a, c, f) {
        var d =
            this.getCurrentDate();
        return d.year < a || d.year === a && d.month < c || d.year === a && d.month === c && d.week <= f
    };
    a.getBestSeller = function () {
        var a = this.gameLog.slice().sort(function (a, b) {
            return b.unitsSold - a.unitsSold
        }).first();
        return a ? a : null
    };
    a.getLatestCustomConsole = function () {
        return this.licencedPlatforms.last(function (a) {
            return a.isCustom && !a.saleCancelled
        })
    };
    Company.load = function (a) {
        var c = new Company;
        c.uid = a.uid;
        c.uid || (c.uid = GameManager.getGUID());
        c.name = a.name;
        c.timePlayed = a.timePlayed;
        c.slot = a.slot;
        c.cash =
            a.cash;
        c.cashLog = a.cashLog;
        c.fans = a.fans;
        c.fansChange = a.fansChange;
        c.flags = a.flags;
        c.flags || (c.flags = {});
        c.conferenceStandFactor = a.conferenceStandFactor;
        c.notifications = a.notifications.map(function (a) {
            return Notification.load(a)
        });
        c.activeNotifications = a.activeNotifications.map(function (a) {
            return Notification.load(a)
        });
        a.sidebarNotifications && (c.sidebarNotifications = a.sidebarNotifications.map(function (a) {
            return Notification.load(a)
        }));
        c.licencedPlatforms = a.licencedPlatforms.map(function (a) {
            return PlatformsSerializer.load(a)
        });
        c.availablePlatforms = a.availablePlatforms.map(function (a) {
            return PlatformsSerializer.load(a)
        });
        c.staff = a.staff.map(function (a) {
            return Character.load(a)
        });
        c.maxStaff = a.maxStaff;
        c.maxStaff || (c.maxStaff = 1);
        c.currentWeek = a.currentWeek;
        c.topics = a.topics.map(function (a) {
            return TopicsSerializer.load(a)
        });
        c.tutorialMessagesShown = a.tutorialMessagesShown;
        c.tutorialMessagesShown || (c.tutorialMessagesShown = []);
        c.triggerNotificationsShown = a.triggerNotificationsShown ? a.triggerNotificationsShown : [];
        c.researchPoints =
            a.researchPoints;
        c.researchEnabled = a.researchEnabled;
        c.trainingEnabled = a.trainingEnabled;
        var f = Research.getAllItems();
        c.availableResearch = a.availableResearch.map(function (a) {
            return f.first(function (b) {
                return b.id === a
            })
        }).filter(function (a) {
            return a
        });
        c.researchCompleted = a.researchCompleted.map(function (a) {
            return f.concat(Research.bigProjects).first(function (b) {
                return b.id === a
            })
        }).filter(function (a) {
            return a
        });
        c.engines = a.engines.map(function (a) {
            return EngineSerializer.load(a)
        });
        c.engineParts = a.engineParts.map(function (a) {
            return EnginePartsSerializer.load(a)
        }).filter(function (a) {
            return a
        });
        c.specialItems = [];
        a.specialItems && (c.specialItems = a.specialItems.map(function (a) {
            return FeatureSerializer.load(a)
        }).filter(function (a) {
            return a
        }));
        c.features = a.features.map(function (a) {
            return FeatureSerializer.load(a)
        }).filter(function (a) {
            return a
        });
        c.topScoreAchievements = a.topScoreAchievements;
        c.lastTopScore = a.lastTopScore;
        a.previousTopScore && (c.previousTopScore = a.previousTopScore);
        a.lastTopScoreWeek && (c.lastTopScoreWeek = a.lastTopScoreWeek);
        a.lastTopScoreGameSize && (c.lastTopScoreGameSize = a.lastTopScoreGameSize);
        c.lastTopScoreIncrease = a.lastTopScoreIncrease;
        c.scheduledStoriesShown = a.scheduledStoriesShown;
        c.currentLevel = a.currentLevel;
        c.currentLevel || (c.currentLevel = 1);
        c.currentGame = Game.load(a.currentGame, c);
        a.gameLog && (c.gameLog = a.gameLog.map(function (a) {
            return Game.load(a, c)
        }));
        a.trashedGames && (c.trashedGames = a.trashedGames.map(function (a) {
            return Game.load(a, c)
        }));
        a.rndCrew && (c.rndCrew = a.rndCrew.map(function (a) {
            return new ProjectWorkerVisual(a)
        }));
        a.hwCrew && (c.hwCrew = a.hwCrew.map(function (a) {
            return new ProjectWorkerVisual(a)
        }));
        a.levelOverlay && (c.levelOverlay = a.levelOverlay);
        c.conferenceHype = a.conferenceHype ? a.conferenceHype : 0;
        c.seed = a.seed;
        c.seed || (c.seed = Math.floor(65535 * Math.random()));
        c.randomCalled = a.randomCalled;
        c._mersenneTwister = new MersenneTwister(c.seed);
        for (var d = 0; d < c.randomCalled; d++) c._mersenneTwister.random();
        c.knowledge = a.knowledge;
        c.knowledge || (c.knowledge = {});
        c.eventTriggerCounts = a.eventTriggerCounts;
        c.eventTriggerCounts || (c.eventTriggerCounts = {});
        c.mods = a.mods;
        return c
    };
    a.save = function () {
        var a = {};
        a.uid =
            this.uid;
        a.name = this.name;
        a.timePlayed = this.timePlayed;
        a.slot = this.slot;
        a.cash = this.cash;
        a.cashLog = this.cashLog;
        a.fans = this.fans;
        a.fansChange = this.fansChange;
        a.flags = this.flags;
        a.conferenceStandFactor = this.conferenceStandFactor;
        a.notifications = this.notifications.map(function (a) {
            return a.save()
        });
        a.activeNotifications = this.activeNotifications.map(function (a) {
            return a.save()
        });
        a.sidebarNotifications = this.sidebarNotifications.map(function (a) {
            return a.save()
        });
        a.licencedPlatforms = this.licencedPlatforms.map(function (a) {
            return PlatformsSerializer.save(a)
        });
        a.availablePlatforms = this.availablePlatforms.map(function (a) {
            return PlatformsSerializer.save(a)
        });
        a.staff = this.staff.map(function (a) {
            return a.save()
        });
        a.maxStaff = this.maxStaff;
        this.currentGame && (a.currentGame = this.currentGame.save());
        a.currentWeek = this.currentWeek;
        a.gameLog = this.gameLog.map(function (a) {
            return a.save()
        });
        a.trashedGames = this.trashedGames.map(function (a) {
            return a.save()
        });
        a.topics = this.topics.map(function (a) {
            return TopicsSerializer.save(a)
        });
        a.tutorialMessagesShown = this.tutorialMessagesShown;
        a.scheduledStoriesShown = this.scheduledStoriesShown;
        a.triggerNotificationsShown = this.triggerNotificationsShown;
        a.researchPoints = this.researchPoints;
        a.researchEnabled = this.researchEnabled;
        a.trainingEnabled = this.trainingEnabled;
        a.availableResearch = this.availableResearch.map(function (a) {
            return a.id
        });
        a.researchCompleted = this.researchCompleted.map(function (a) {
            return a.id
        });
        a.engines = this.engines.map(function (a) {
            return EngineSerializer.save(a)
        });
        a.engineParts = this.engineParts.map(function (a) {
            return EnginePartsSerializer.save(a)
        });
        a.specialItems = this.specialItems.map(function (a) {
            return FeatureSerializer.save(a)
        });
        a.features = this.features.map(function (a) {
            return FeatureSerializer.save(a)
        });
        a.topScoreAchievements = this.topScoreAchievements;
        a.lastTopScore = this.lastTopScore;
        a.previousTopScore = this.previousTopScore;
        a.lastTopScoreWeek = this.lastTopScoreWeek;
        a.lastTopScoreGameSize = this.lastTopScoreGameSize;
        a.lastTopScoreIncrease = this.lastTopScoreIncrease;
        this.rndCrew && (a.rndCrew = this.rndCrew.map(function (a) {
            return a.save()
        }));
        this.hwCrew &&
            (a.hwCrew = this.hwCrew.map(function (a) {
                return a.save()
            }));
        a.currentLevel = this.currentLevel;
        a.conferenceHype = this.conferenceHype;
        a.seed = this.seed;
        a.randomCalled = this.randomCalled;
        VisualsManager.levelOverlay && (a.levelOverlay = VisualsManager.levelOverlay.saveState());
        a.knowledge = this.knowledge;
        a.eventTriggerCounts = this.eventTriggerCounts;
        a.mods = this.mods;
        return a
    }
})();