var SavegameMigrator = {};
(function () {
    function a(a, b, c, d) {
        d = (a /= d) * a;
        a *= d;
        return b + c * (-0.5 * a * d + 3 * d * d + -3.5 * a + 2 * d)
    }

    function b(a, b, c, d) {
        a = a(d, 0, 1, 1);
        return b + (c - b) * a
    }
    SavegameMigrator.migrate = function (a) {
        if (GameManager.VERSION == a.version) return a;
        if (1 == a.version) {
            var b = new Company(a.company.name);
            b.currentLevel = 1;
            a.company = $.extend(!0, b, a.company);
            for (b = 0; b < a.company.gameLog.length; b++)
                for (var r = a.company.gameLog[b], p = 0; p < r.missionLog.length; p++) "finishing" === r.missionLog[p] && (r.missionLog[p] = "BugFixing");
            b = a.company.staff[0];
            b.id = 0;
            b.name = PlatformShim.getUserName();
            a.company.currentGame && (a.company.currentGame.bugs = 0);
            $.extend(a.uiSettings, UI.createDefaultUISettings());
            a.currentHwProject || (a.currentHwProject = []);
            a.currentRnDProject || (a.currentRnDProject = []);
            a.currentResearches || (a.currentResearches = [], a.currentResearch && (a.currentResearch.staffId = a.company.staff[0].id, a.currentResearches.push(a.currentResearch), a.currentResearch = null));
            isNaN(a.company.cash) && (a.company.cash = 0);
            a.company.activeNotifications.insertAt(0, {
                header: "Warning",
                text: "This savegame has been imported from a preview version of Game Dev Tycoon. You can try to continue this game but we *strongly recommend* that you start a new game. We have made many changes to the game since the first preview and you might run into issues if you continue this save game."
            });
            c(a, 1, 2);
            a.version = 2
        }
        2 == a.version && (a = f(a));
        3 == a.version && (a.flags.gameLengthModifier = 1, c(a, 3, 4), a.version = 4);
        4 == a.version && (!PlatformShim.ISWIN8 && a.company && (b = a.company.activeNotifications) &&
            0 < b.length && "{SupportGreenheartGames}" === b[0].header && b.splice(0, 1), c(a, 4, 5), a.version = 5);
        if (5 == a.version) {
            d(a, "mBox Next", "mBox One");
            if (b = a.company.scheduledStoriesShown)
                for (r = 0; r < b.length; r++) "mboxNext" == b[r] && (b[r] = "mboxOne");
            r = a.company.gameLog;
            for (b = 0; b < r.length; b++) k(r[b]);
            r = a.company.trashedGames;
            for (b = 0; b < r.length; b++) k(r[b]);
            (b = a.company.currentGame) && k(b);
            m(a);
            l(a);
            a.company.activeNotifications.insertAt(0, {
                header: "Updated Version",
                text: "This save game has been imported from an older version of Game Dev Tycoon. We have re-balanced the game, added new consoles, increased the story-line (runs for 35 years) and added a couple of new features. You should be able to continue this save game without issues but if you want to get the full re-worked experience, please consider starting a new game."
            });
            c(a, 5, 6);
            a.version = 6
        }
        if (6 == a.version) {
            if (a.company && a.company.licencedPlatforms)
                for (b = 0; b < a.company.licencedPlatforms.length; b++) r = a.company.licencedPlatforms[b], r.isCustom && (r.genreWeightings = r.ghg7, delete r.ghg7, r.audienceWeightings = r.ghg8, delete r.ghg8);
            c(a, 6, 7);
            a.version = 7
        }
        7 == a.version && (c(a, 7, 8), a.version = 8);
        if (a.version != GameManager.VERSION) throw "unable to load game - could not upgrade to latest file version";
        return a
    };
    var c = function (a, b, c) {
        var d = PlatformShim.getVersion();
        GameFlags.ghg6 && (d +=
            ";GameFlags.DEBUG");
        a.upgradeHistory || (a.upgradeHistory = []);
        a.upgradeHistory.push({
            from: b,
            to: c,
            "is-win-8-version": PlatformShim.ISWIN8,
            "app-version": d,
            date: (new Date).toISOString()
        })
    },
        f = function (d) {
            if (d.currentHwProject && 0 === d.currentHwProject.pointsCost) {
                var f;
                f = 1E7 + d.currentHwProject.features.sum(function (a) {
                    return 100 * Research.getEngineCost(General.getFeature(a))
                });
                var k = b(a, 1, 20, d.currentHwProject.qF),
                    k = Math.floor(k);
                f += 1E6 * k;
                d.company.cash += f;
                d.company.cashLog.push({
                    amount: f,
                    label: d.currentHwProject.name +
                        " refund"
                });
                d.currentHwProject = void 0;
                d.company.activeNotifications.insertAt(0, {
                    header: "Warning",
                    text: "We have identified that a console project in this save game was not making any progress. This was caused by a bug in the previous version. We have fixed this bug in the version you are running now but you will need to start a new console project. The costs for the old project have been refunded."
                })
            }
            f = d.company.activeNotifications.filter(function (a) {
                return "{Training}" === a.header || "{Research}" === a.header
            });
            for (k = 0; k < f.length; k++) d.company.activeNotifications.remove(f[k]);
            if (f = d.company.activeNotifications.concat(d.company.notifications).first(function (a) {
                return "airCon1Callback" === a.sourceId
            })) d.company.activeNotifications.first(function (a) {
                return "airCon1Callback" === a.sourceId
            }) ? d.company.activeNotifications.remove(f) : d.company.notifications.remove(f), isNan(f.weeksUntilFired) && (f.weeksUntilFired = 0), d.company.flags.airCon1 = !0, d.company.flags.airCon1Declined = d.company.currentWeek + f.weeksUntilFired, f = void 0;
            else if (f = d.company.activeNotifications.concat(d.company.notifications).first(function (a) {
                return "airCon2Callback" === a.sourceId
            })) d.company.activeNotifications.first(function (a) {
                return "airCon2Callback" === a.sourceId
            }) ? d.company.activeNotifications.remove(f) : d.company.notifications.remove(f), isNan(f.weeksUntilFired) && (f.weeksUntilFired = 0), d.company.flags.airCon2 = !0, d.company.flags.airCon2Declined = d.company.currentWeek + f.weeksUntilFired, f = void 0;
            c(d, 2, 3);
            d.version = 3;
            return d
        },
        d = function (a, b, c) {
            a = a.company;
            var d = a.flags,
                f = function (a) {
                    if (a)
                        for (var d = 0; d < a.length; d++) a[d] && (a[d] == b ? a[d] = c : a[d].id == b ? a[d].id = c : a[d].platform == b && (a[d].platform = c))
                };
            d && d.contractspublisher && f(d.contractspublisher.platforms);
            f(a.licencedPlatforms);
            f(a.availablePlatforms);
            f(a.gameLog)
        },
        k = function (a) {
            a.platforms = [];
            a.platforms.push({
                id: a.platform
            });
            a.platform = void 0
        },
        m = function (a) {
            var b = ["Mouse", "Joystick", "Controller", "Steering Wheel"],
                c = a.company.researchCompleted.count(function (a) {
                    return b.first(function (b) {
                        return a == b
                    })
                });
            1 <= c && a.company.researchCompleted.push(Research.GameTutorials.id);
            2 <= c && a.company.researchCompleted.push(Research.BetterUI.id);
            a.company.researchCompleted.push(Research.mono.id)
        },
        l = function (a) {
            a.company.gameLog.concat(a.company.trashedGames).forEach(function (a) {
                "Startups" == a.topic && (a.topic = "Business")
            });
            a.company.currentGame && a.company.currentGame.topic && "Startups" == a.company.currentGame.topic && (a.company.currentGame.topic = "Business");
            var b = a.company.topics.first(function (a) {
                return "Startups" == a.id
            });
            b && (a.company.topics.splice(a.company.topics.indexOf(b), 1), a.company.topics.some(function (a) {
                return "Business" == a.id
            }) ? a.company.researchPoints += 10 : a.company.topics.push({
                id: "Business"
            }));
            a.company.flags.contractspublisher && (b = function (a) {
                if (a)
                    for (var b = 0; b < a.length; b++) "Startups" == a[b] && (a[b] = "Business")
            }, b(a.company.flags.contractspublisher.topics), b(a.company.flags.contractspublisher.researchedTopics))
        }
})();
