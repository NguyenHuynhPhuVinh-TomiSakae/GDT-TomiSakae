var UpdateNotifications = {};
(function () {
    var a = UpdateNotifications;
    a.showFullGameIsAvailable = function () {
        var a = $("#fullGameAvailable");
        a.find(".okButton").clickExcl(function () {
            var a = DataStore.getValue("full-game-uri");
            if (PlatformShim.ISWIN8) {
                var b = new Windows.Foundation.Uri(a);
                Windows.System.Launcher.launchUriAsync(b).then(function (b) {
                    b ? ghg4.ghg5("navigate-to-full-game", {
                        url: a,
                        success: !0
                    }) : (ghg4.ghg5("navigate-to-full-game", {
                        url: a,
                        success: !1
                    }), Windows.UI.Popups.MessageDialog("It seems that something went wrong when trying to go to the Store page for the full app.\nPlease try again and if the issue persists please contact support@greenheartgames.com or search for Game Dev Tycoon manually on the Windows Store.",
                        "Store Error").showAsync())
                })
            } else PlatformShim.openUrlExternal(a)
        });
        ghg4.ghg5("showing full game available message");
        a.gdDialog({
            zIndex: 7500,
            popout: !0,
            close: !0
        })
    };
    a.checkAndShowNotifications = function () {
        if (!Steam) {
            var a = GameManager.getSaveGames();
            if (!a || !a.length) DataStore.setValue("shown-udate-notification-v1", !0);
            else if (!DataStore.getValue("shown-udate-notification-v1")) {
                var c = $("#appUpdateNotificationV1");
                c.find(".okButton").clickExclOnce(function () {
                    DataStore.setValue("shown-udate-notification-v1",
                        !0);
                    c.dialog("close")
                });
                c.gdDialog({
                    zIndex: 7500
                })
            }
        }
    }
})();
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
var SupportPacks = {};
(function () {
    var a = SupportPacks,
        b;
    a.getPacks = function (a) {
        b ? a(b) : GameManager.ghg3().loadListingInformationAsync().done(function (f) {
            b = f;
            a(b)
        }, function (a) { })
    };
    a.hasBought = function (a) {
        return GameManager.ghg3().licenseInformation.productLicenses.lookup(a)
    };
    a.buy = function (b, f) {
        GameManager.ghg3().requestProductPurchaseAsync(b, !0).done(function (d) {
            d && (a.hasBought(b) ? (ghg4.ghg5("feature purchased", {
                id: b
            }), Achievements.activate(Achievements.supporter2), GameManager.checkAchievements(), f && f()) : (ghg4.ghg5("feature purchase unsuccessful"),
                Windows.UI.Popups.MessageDialog("It seems that something went wrong when purchasing this feature pack.\nPlease close the app and try again later.\n If the issue persists please contact\n\nsupport@greenheartgames.com", "purchase not validated").showAsync()))
        }, function (a) {
            Windows.UI.Popups.MessageDialog("It seems that something went wrong when trying to purchase this feature pack.\nPlease close the app and try again later.\n If the issue persists please contact\n\nsupport@greenheartgames.com", "Store Error").showAsync()
        })
    }
})();
var ghg4 = {};
ANALYTICS_ENABLED = !1;
(function () {
    var a = ghg4,
        b;
    a.init = function () {
        if (ANALYTICS_ENABLED) {
            PlatformShim.ISWIN8 && GameManager.ghg3().licenseInformation.addEventListener("licensechanged", function () { });
            try {
                b = LocalyticsSession(PlatformShim.ISWIN8 ? "a81d66cf7ac434d5db026f5-02cfbbe2-3c4e-11e2-685f-00ef75f32667" : GameFlags.ghg7 ? "41c2fa766702efda9d050cf-4cbeae62-ac6f-11e2-8796-005cf8cbabd8" : GameFlags.G782 ? "9c7a8f4b73c5b371e62dd52-6f5ec11e-ac6f-11e2-8798-005cf8cbabd8" : "81926045ae9a704f220ff42-cadd95fa-d7af-11e2-0f20-004a77f8b47f", {
                    polling: !1
                }),
                    b.open(), b.upload(), a.ghg5("system-info", {
                        platform: navigator.platform,
                        cpuClass: navigator.cpuClass,
                        userLanguage: navigator.userLanguage,
                        "is-steam": GameFlags.IS_STEAM
                    }), document.addEventListener("visibilitychange", function (a) {
                        try {
                            var c = document.visibilityState;
                            "visible" == c ? (b.open(), b.upload()) : "hidden" == c && (b.close(), b.upload())
                        } catch (k) { }
                    }, !1)
            } catch (c) { }
            $(document).on("click", "a", function (a) {
                try {
                    if (a && a.srcElement) {
                        var b = $(a.srcElement).attr("href");
                        "#" != b && (PlatformShim.ISWIN8 || (PlatformShim.openUrlExternal(b),
                            a.preventDefault()), ghg4.ghg5("clicked link", {
                                href: b
                            }))
                    }
                } catch (c) { }
            })
        }
    };
    a.ghg5 = function (a, f) {
        if (ANALYTICS_ENABLED) try {
            b.tagEvent(a, f)
        } catch (d) { }
    }
})();
var UpdateChecker = {};
(function () {
    function a(a) {
        if ("string" != typeof a) return null;
        var b = a.split(".");
        a = parseInt(b[0]);
        var c = parseInt(b[1]),
            b = parseInt(b[2]);
        return isNaN(a) || isNaN(c) || isNaN(b) ? null : {
            major: a,
            minor: c,
            patch: b
        }
    }
    var b = UpdateChecker;
    b.VERSION = "1.7.6";
    b.checkForUpdate = function () {
        if (!GameFlags.IS_STEAM) {
            try {
                var b = a("1.7.6")
            } catch (d) {
                b = null
            }
            if (b) {
                try {
                    require("nw.gui").App.clearCache()
                } catch (k) { }
                var m = navigator.platform;
                if (m = m.startsWith("Win") ? "win" : m.startsWith("Mac") ? "mac" : m.startsWith("linux") ? "linux" : null) {
                    var l =
                        "http://www.greenheartgames.com/utils/releases/gdt/lite/" + m;
                    GameFlags.ghg7 || (l = "http://www.greenheartgames.com/utils/releases/gdt/" + m);
                    $.get(l, function (d) {
                        if (-1 != d.indexOf(";")) {
                            d = d.split(";");
                            try {
                                var k = a(d[0])
                            } catch (l) {
                                k = null
                            }
                            k && k && b && (k.major > b.major || k.major == b.major && (k.minor > b.minor || k.minor == b.minor && k.patch > b.patch)) && c(d[1])
                        }
                    })
                } else ghg4.ghg5("check-update-error", {
                    msg: "unknown platform"
                })
            } else PlatformShim.alert("version not valid: 1.7.6")
        }
    };
    var c = function (a) {
        var b = $("#upateNotificationWindow");
        b.find(".updateButton").clickExclOnce(function () {
            Sound.click();
            PlatformShim.openUrlExternal(a);
            b.dialog("close")
        });
        b.gdDialog({
            zIndex: 15E3,
            popout: !0,
            close: !0
        })
    };
    b.checkForUpdate()
})();