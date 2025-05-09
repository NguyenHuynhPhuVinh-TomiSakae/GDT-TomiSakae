"use strict";
var Booth = function (a, b, c, f, d, k, m, l) {
    this.id = a;
    this.name = b;
    this.standFactor = c;
    this.description = f;
    this.cost = d;
    this.floorImage = k;
    this.bgImage = m;
    this.fgImage = l
};
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
"use strict";
var Game = function (a) {
    this.id = GameManager.getGUID();
    this.topic = this.genre = this.title = void 0;
    this.platforms = [];
    this.engine = void 0;
    this.state = GameState.notStarted;
    this.gameSize = "small";
    this.targetAudience = "everyone";
    this.missionLog = [];
    this.salesCashLog = [];
    this.featureLog = null;
    this.score = 0;
    this.reviews = [];
    this.topSalesRank = this.currentSalesRank = this.initialSalesRank = this.fansChanged = this.fansChangeTarget = this.releaseWeek = this.amountSold = this.totalSalesCash = this.currentSalesCash = this.designPoints = this.freeBugCount =
        this.bugs = this.technologyPoints = this.hypePoints = this.costs = 0;
    this.researchFactor = 1;
    this.revenue = 0;
    this.flags = {};
    this.soldOut = !1;
    a.conferenceHype && (this.hypePoints = a.conferenceHype, a.conferenceHype = Math.floor(a.conferenceHype / 3))
};
(function () {
    var a = Game.prototype;
    a.isOnSale = function () {
        return 0 < this.nextSalesCash
    };
    a._saveMissionLog = function () {
        return this.missionLog.map(function (a) {
            return a.id
        })
    };
    a._loadMissionLog = function (a) {
        var c = Missions.getAllMissions();
        this.missionLog = a.map(function (a) {
            return c.first(function (b) {
                return b.id === a
            })
        })
    };
    a.getSalesAnomaly = function () {
        this.flags.salesAnomaly || (this.flags.salesAnomaly = 0);
        var a = SalesEvents.getSaleRecord(GameManager.company, this);
        if (a) return this.flags.salesAnomaly++, a;
        if (this.flags.interviewHyped &&
            2 <= this.salesCashLog.length && !this.flags.interviewHyped.done) return this.flags.interviewHyped.done = !0, SalesEvents.getHypedGameEvent(GameManager.company, this);
        GameManager.company.canSetTargetAudience() && !this.flags.audienceMismatchShown && 3 <= this.salesCashLog.length && 0.8 > Platforms.getAudienceWeighting(this.platforms, this.targetAudience) && (this.flags.audienceMismatchShown = !0, Media.generateAudienceMismatchStory(GameManager.company, this));
        if (!(3 >= this.salesCashLog.length)) {
            if (this.flags.topScore && (a = SalesEvents.getTopScoreSalesEvent(GameManager.company,
                this))) return a;
            if (!(7 >= this.salesCashLog.length || this.flags.salesAnomaly > (10 <= this.score ? 3 : 8 <= this.score ? 2 : 1) || 10 != this.score || this.flags.earlySalesEvent) && (a = SalesEvents.getEarlySalesEvents(GameManager.company, this))) return this.flags.salesAnomaly++, this.flags.earlySalesEvent = !0, a
        }
    };
    a.getGenreDisplayName = function () {
        return this.secondGenre ? this.genre.name + "-" + this.secondGenre.name : this.genre.name
    };
    a.save = function () {
        var a = {};
        a.title = this.title;
        a.id = this.id;
        this.genre && (a.genre = this.genre.id);
        this.secondGenre &&
            (a.secondGenre = this.secondGenre.id);
        this.topic && (a.topic = this.topic.id);
        this.platforms && (a.platforms = this.platforms.map(function (a) {
            return {
                id: a.id
            }
        }));
        a.gameSize = this.gameSize;
        a.targetAudience = this.targetAudience;
        a.sequelTo = this.sequelTo;
        a.hypePoints = this.hypePoints;
        a.technologyPoints = this.technologyPoints;
        a.bugs = this.bugs;
        a.freeBugCount = this.freeBugCount;
        a.designPoints = this.designPoints;
        a.costs = this.costs;
        a.score = this.score;
        a.reviews = this.reviews;
        a.currentSales = this.currentSalesCash;
        a.totalSales =
            this.totalSalesCash;
        a.amountSold = this.unitsSold;
        a.salesLog = this.salesCashLog;
        a.maintenanceLog = this.maintenanceLog;
        a.nextMaintenance = this.nextMaintenance;
        a.missionLog = this._saveMissionLog();
        a.currentSalesRank = this.currentSalesRank;
        a.fansChangeTarget = this.fansChangeTarget;
        a.fansChanged = this.fansChanged;
        a.initialSalesRank = this.initialSalesRank;
        a.releaseWeek = this.releaseWeek;
        a.state = this.state;
        a.topSalesRank = this.topSalesRank;
        a.packReleaseWeek = this.packReleaseWeek;
        a.researchFactor = this.researchFactor;
        this.featureLog && (a.featureLog = this.featureLog.map(function (a) {
            return CompanyFeatureSerializer.save(a)
        }));
        this.engine && (a.engine_id = this.engine.id);
        this.features && (a.features = this.features.map(function (a) {
            return {
                id: a.id
            }
        }));
        this.reviewMessageDisplayed && (a.reviewMessageDisplayed = this.reviewMessageDisplayed);
        a.flags = this.flags;
        a.nextSR = this.nextSalesRank;
        a.nFC = this.nextfansChange;
        a.nS = this.nextSalesCash;
        a.so = this.soldOut;
        a.revenue = this.revenue;
        this.confAmount && (a.confAmount = this.confAmount);
        return a
    };
    Game.load = function (a, c) {
        if (a) {
            var f = new Game(c);
            f.title = a.title;
            f.id = a.id;
            f.id || (f.id = GameManager.getGUID());
            void 0 != a.genre && (f.genre = GameGenre.getAll().first(function (d) {
                return d.id === a.genre
            }));
            void 0 != a.secondGenre && (f.secondGenre = GameGenre.getAll().first(function (d) {
                return d.id === a.secondGenre
            }));
            void 0 != a.topic && (f.topic = Topics.topics.first(function (d) {
                return d.id === a.topic
            }));
            void 0 != a.platforms && (f.platforms = a.platforms.map(function (a) {
                var b = Platforms.allPlatforms.first(function (b) {
                    return b.id ===
                        a.id
                });
                b || (b = c.licencedPlatforms.first(function (b) {
                    return b.id === a.id
                }));
                return b
            }));
            f.gameSize = a.gameSize;
            f.targetAudience = a.targetAudience;
            f.sequelTo = a.sequelTo;
            f.hypePoints = a.hypePoints;
            f.technologyPoints = a.technologyPoints;
            f.bugs = a.bugs;
            f.freeBugCount = a.freeBugCount;
            f.designPoints = a.designPoints;
            f.score = a.score;
            f.reviews = a.reviews;
            f.costs = a.costs;
            f.currentSalesCash = a.currentSales;
            f.totalSalesCash = a.totalSales;
            f.unitsSold = a.amountSold;
            void 0 != a.salesLog && (f.salesCashLog = a.salesLog);
            void 0 != a.maintenanceLog &&
                (f.maintenanceLog = a.maintenanceLog);
            a.nextMaintenance && (f.nextMaintenance = a.nextMaintenance);
            a.packReleaseWeek && (f.packReleaseWeek = a.packReleaseWeek);
            f._loadMissionLog(a.missionLog);
            f.currentSalesRank = a.currentSalesRank;
            f.fansChangeTarget = a.fansChangeTarget;
            f.fansChanged = a.fansChanged;
            f.initialSalesRank = a.initialSalesRank;
            f.releaseWeek = a.releaseWeek;
            f.state = a.state;
            f.topSalesRank = a.topSalesRank;
            f.unitPrice = a.unitPrice ? a.unitPrice : Sales.getUnitPrice(f);
            f.researchFactor = a.researchFactor;
            f.featureLog =
                null;
            a.featureLog && (f.featureLog = a.featureLog.map(function (a) {
                return CompanyFeatureSerializer.load(a)
            }).filter(function (a) {
                return a
            }));
            a.engine_id && (f.engine = c.engines.first(function (d) {
                return d.id === a.engine_id
            }));
            a.features && (f.features = a.features.map(function (a) {
                return FeatureSerializer.load(a)
            }).filter(function (a) {
                return a
            }));
            a.reviewMessageDisplayed && (f.reviewMessageDisplayed = a.reviewMessageDisplayed);
            f.flags = a.flags;
            f.flags || (f.flags = {});
            f.nextSalesRank = a.nextSR;
            f.nextfansChange = a.nFC;
            f.nextSalesCash =
                a.nS;
            a.so ? f.soldOut = a.so : f.currentSalesCash >= f.totalSalesCash && 0 != f.currentSalesCash && (f.soldOut = !0);
            f.revenue = a.revenue ? a.revenue : Math.floor(f.unitsSold * f.unitPrice);
            a.confAmount && (f.confAmount = a.confAmount);
            return f
        }
    };
    a.getRatioWorked = function (a) {
        a = a.id;
        return this.flags.devTime && this.flags.staffContribution.hasOwnProperty(a) ? this.flags.staffContribution[a] / this.flags.devTime : 0
    };
    a.isStaffResponsibilityEnabled = function () {
        return "small" != this.gameSize
    };
    a.canDoPostMortem = function () {
        var a = this.id;
        return !this.flags.postMortemCompleted &&
            this.releaseWeek < GameManager.company.currentWeek && GameManager.company.getDate(this.releaseWeek).year > GameManager.company.getCurrentDate().year - 2 && !GameManager.company.staff.some(function (c) {
                return c.flags.postMortemGameId == a
            })
    }
})();
"use strict";
var GameState = {
    notStarted: 0,
    concept: 1,
    development: 2,
    publishing: 3,
    released: 4
};
"use strict";
var GameGenre = {
    Action: {
        id: "Action",
        name: "Action".localize("genre")
    },
    Adventure: {
        id: "Adventure",
        name: "Adventure".localize("genre")
    },
    RPG: {
        id: "RPG",
        name: "RPG".localize("genre")
    },
    Simulation: {
        id: "Simulation",
        name: "Simulation".localize("genre")
    },
    Strategy: {
        id: "Strategy",
        name: "Strategy".localize("genre")
    },
    Casual: {
        id: "Casual",
        name: "Casual".localize("genre")
    },
    getAll: function () {
        return [this.Action, this.Adventure, this.RPG, this.Simulation, this.Strategy, this.Casual]
    },
    getGoldenRatio: function (a, b) {
        if (b) return (2 * GameGenre.getGoldenRatio(a) +
            GameGenre.getGoldenRatio(b)) / 3;
        if (a === GameGenre.Action) return 1.8;
        if (a === GameGenre.Adventure) return 0.4;
        if (a === GameGenre.RPG) return 0.6;
        if (a === GameGenre.Simulation) return 1.6;
        if (a === GameGenre.Strategy) return 1.4;
        if (a === GameGenre.Casual) return 0.5;
        throw "unknown genre: " + a;
    },
    getGenreWeighting: function (a, b, c) {
        if (void 0 === a) return 1;
        if (c) return (GameGenre.getGenreWeighting(a, c) + 2 * GameGenre.getGenreWeighting(a, b)) / 3;
        if (b === GameGenre.Action) return a[0];
        if (b === GameGenre.Adventure) return a[1];
        if (b === GameGenre.RPG) return a[2];
        if (b === GameGenre.Simulation) return a[3];
        if (b === GameGenre.Strategy) return a[4];
        if (b === GameGenre.Casual) return a[5];
        throw "unknown genre: " + b;
    },
    getIndexOf: function (a) {
        var b = GameGenre.getAll().first(function (b) {
            return b.id == a.id
        });
        return GameGenre.getAll().indexOf(b)
    }
};
"use strict";
var Genre = function (a) {
    this.name = a
};
(function () {
    Genre.load = function (a) {
        return new Genre(a.name)
    };
    Genre.prototype.save = function () {
        var a = {};
        a.name = this.name;
        return a
    }
})();
