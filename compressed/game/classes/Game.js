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