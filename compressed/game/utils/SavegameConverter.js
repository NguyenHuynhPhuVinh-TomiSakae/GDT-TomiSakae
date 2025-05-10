var SavegameConverter = {};
(function () {
    SavegameConverter.toMobileFormat = function (b) {
        b.version != GameManager.VERSION && (b = SavegameMigrator.migrate(b));
        return a(b)
    };
    var a = function (a) {
        if (a) {
            var b = a.company;
            if (b) {
                var f = b.engines;
                f && f.forEach(function (a, b, c) {
                    if (b = a.parts) a.partsIds = k(b), delete a.parts
                });
                m(b.currentGame);
                (f = b.gameLog) && f.forEach(function (a, b, c) {
                    m(a)
                });
                (f = b.trashedGames) && f.forEach(function (a, b, c) {
                    m(a)
                });
                b.engineParts && (b.engineParts = k(b.engineParts));
                b.knowledge && (l(b.knowledge.combos), l(b.knowledge.missionWeightings),
                    l(b.knowledge.platformKnowledge), l(b.knowledge.topicKnowledge), l(b.knowledge.trainingKnowledge));
                b.notifications && b.notifications.forEach(function (a, b, c) {
                    d(a)
                });
                b.activeNotifications && b.activeNotifications.forEach(function (a, b, c) {
                    d(a)
                });
                if (b.sidebarNotifications) {
                    var g = 1E3 * UI.sideBarNotificationLifeTimeInSeconds;
                    b.sideNotifications = {};
                    b.sideNotifications.delayedNotifications = [];
                    b.sideNotifications.spawnedNotifications = [];
                    b.sidebarNotifications.forEach(function (a, c, f) {
                        d(a);
                        c = {};
                        c.notification = a;
                        c.timeGameAtFadeInFinish =
                            a.dismissTime - g;
                        b.sideNotifications.spawnedNotifications.push(c)
                    });
                    delete b.sidebarNotifications
                }
                c(b.licencedPlatforms);
                c(b.availablePlatforms);
                a.currentHwProject && "custom console" == a.currentHwProject.Id && (a.currentHwProject.iconUri = "custom" + a.currentHwProject.iconUri[38] + "v" + a.currentHwProject.iconUri[40] + ".png");
                if (f = b.flags) f.projectContractSettings = {}, toMobileProjectContractSettings(f, "publisher"), toMobileProjectContractSettings(f, "small"), toMobileProjectContractSettings(f, "medium"), toMobileProjectContractSettings(f,
                    "large")
            }
            a.uiSettings && (f = a.uiSettings.findStaffData) && f.tests && (f.tests = f.tests.first())
        }
        return a
    };
    toMobileProjectContractSettings = function (a, b) {
        var c = "contracts" + b,
            d = a[c];
        d && (a.projectContractSettings[c] = d, delete a[c])
    };
    var b = function (a) {
        var b = {};
        a && a.split && (a = a.split("/")) && 3 == a.length && (b.year = a[0], b.month = a[1], b.week = a[2]);
        return b
    },
        c = function (a) {
            a && a.forEach(function (a, c, d) {
                a.published && (a.published = b(a.published));
                a.platformRetireDate && (a.platformRetireDate = b(a.platformRetireDate));
                a.marketKeyPoints &&
                    f(a.marketKeyPoints);
                a.isCustom && (a.iconUri = "custom" + a.iconUri[38] + "v" + a.iconUri[40] + ".png");
                a.genreWeightings && (a.genreWeightings = g(a.genreWeightings));
                a.audienceWeightings && (a.audienceWeightings = g(a.audienceWeightings))
            })
        },
        f = function (a) {
            a.forEach(function (a, c, d) {
                a && a.date && (a.date = b(a.date))
            })
        },
        d = function (a) {
            if (a && a.buttonText && "string" === typeof a.buttonText) {
                var b = a.buttonText;
                a.buttonText = [];
                a.buttonText.push(b)
            }
            return a
        },
        k = function (a) {
            var b = [];
            a.forEach(function (a, c, d) {
                b.push(a.id)
            });
            return b
        },
        m = function (a) {
            a && a.platforms && (a.platforms = k(a.platforms));
            return a
        },
        l = function (a) {
            a && a.forEach(function (a, b, c) {
                a.genreWeightings && (a.genreWeightings = g(a.genreWeightings));
                a.audienceWeightings && (a.audienceWeightings = g(a.audienceWeightings))
            });
            return a
        },
        g = function (a) {
            var b = {};
            a && (b.weights = [], b.isInit = [], a.forEach(function (a, c, d) {
                b.weights.push(a);
                b.isInit.push(!0)
            }));
            return b
        };
    SavegameConverter.fromMobileFormat = function (a) {
        if (a) {
            var b = a.company;
            if (b) {
                var c = b.engines;
                c && c.forEach(function (a, b, c) {
                    if (b =
                        a.partsIds) a.parts = A(b), delete a.partsIds
                });
                z(b.currentGame);
                (c = b.gameLog) && c.forEach(function (a, b, c) {
                    z(a)
                });
                (c = b.trashedGames) && c.forEach(function (a, b, c) {
                    z(a)
                });
                b.engineParts && (b.engineParts = A(b.engineParts));
                b.knowledge && (B(b.knowledge.combos), B(b.knowledge.missionWeightings), B(b.knowledge.platformKnowledge), B(b.knowledge.topicKnowledge), B(b.knowledge.trainingKnowledge));
                b.notifications && b.notifications.forEach(function (a, b, c) {
                    E(a)
                });
                b.activeNotifications && b.activeNotifications.forEach(function (a,
                    b, c) {
                    E(a)
                });
                var d = 1E3 * UI.sideBarNotificationLifeTimeInSeconds;
                b.sidebarNotifications = [];
                (c = b.sideNotifications) && c.spawnedNotifications && c.spawnedNotifications.forEach(function (a, c, f) {
                    c = E(a.notification);
                    c.isMandatory ? b.activeNotifications.push(c) : (b.sidebarNotifications.push(c), a.notification.dismissTime = a.timeGameAtFadeInFinish + d)
                });
                c && c.delayedNotifications && c.delayedNotifications.forEach(function (c, f, g) {
                    b.sidebarNotifications.push(E(c));
                    c.dismissTime = a.gameTime + d
                });
                delete b.sideNotifications;
                (c = b.staff) && c.forEach(function (a, b, c) {
                    u(a.sex) && (a.sex = q[a.sex]);
                    u(a.state) && (a.state = t[a.state])
                });
                b.hwCrew && b.hwCrew.forEach(function (a) {
                    a.visualData && (a.visualData.alpha = 1)
                });
                b.rndCrew && b.rndCrew.forEach(function (a) {
                    a.visualData && (a.visualData.alpha = 1)
                });
                n(b.licencedPlatforms);
                n(b.availablePlatforms);
                a.currentHwProject && "custom console" == a.currentHwProject.Id && (a.currentHwProject.iconUri = r(a.currentHwProject.iconUri));
                if (c = b.flags) fromMobileProjectContractSettings(c, "publisher"), fromMobileProjectContractSettings(c,
                    "small"), fromMobileProjectContractSettings(c, "medium"), fromMobileProjectContractSettings(c, "large"), c.projectContractSettings && delete c.projectContractSettings
            }
            u(a.state) && (a.state = v[a.state]);
            if (a.uiSettings && (c = a.uiSettings.findStaffData)) {
                var f = [];
                c.tests && f.push(c.tests);
                c.tests = f
            }
        }
        return a
    };
    fromMobileProjectContractSettings = function (a, b) {
        var c = "contracts" + b,
            d = a.projectContractSettings;
        d && (d = d[c]) && (a[c] = d)
    };
    var n = function (a) {
        a && a.forEach(function (a, b, c) {
            a && (a.published && (a.published = s(a.published)),
                a.platformRetireDate && (a.platformRetireDate = s(a.platformRetireDate)), a.marketKeyPoints && p(a.marketKeyPoints), a.isCustom && (a.iconUri = r(a.iconUri)), a.genreWeightings && (a.genreWeightings = D(a.genreWeightings)), a.audienceWeightings && (a.audienceWeightings = D(a.audienceWeightings)))
        })
    },
        r = function (a) {
            return "images/platforms/superb/CustomPlatform" + a[6] + "V" + a[8] + ".png"
        },
        p = function (a) {
            a.forEach(function (a, b, c) {
                a && a.date && (a.date = s(a.date))
            })
        },
        s = function (a) {
            return a.year + "/" + a.month + "/" + a.week
        },
        u = function (a) {
            return null !=
                a && void 0 != a && !1 == isNaN(a)
        },
        t = {
            0: "Idle",
            1: "Working",
            2: "Researching",
            3: "CreateEngine",
            4: "WorkOnContract",
            5: "Training",
            6: "Vacation"
        },
        q = {
            0: "male",
            1: "female"
        },
        v = {
            0: "GameStarting",
            1: "Idle",
            2: "CreateGame",
            3: "GameDefinition",
            4: "PickWorkItems",
            5: "ExecuteWorkItems",
            6: "ReleaseGame"
        },
        A = function (a) {
            var b = [];
            a.forEach(function (a, c, d) {
                c = {};
                c.id = a;
                b.push(c)
            });
            return b
        },
        z = function (a) {
            a && a.platforms && (a.platforms = A(a.platforms));
            return a
        },
        B = function (a) {
            a && a.forEach(function (a, b, c) {
                a.genreWeightings && (a.genreWeightings =
                    D(a.genreWeightings));
                a.audienceWeightings && (a.audienceWeightings = D(a.audienceWeightings))
            });
            return a
        },
        D = function (a) {
            var b = [];
            a && a.weights && a.isInit && a.weights.forEach(function (c, d, f) {
                a.isInit[d] && b.push(c)
            });
            return b
        },
        E = function (a) {
            a && (a.buttonText && 1 >= a.buttonText.length && (a.buttonText = a.buttonText[0]), a.id || (a.id = GameManager.getGUID()));
            return a
        }
})();