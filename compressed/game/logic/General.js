var LOGWEEKSALES = !1,
    General = {};
(function () {
    General.updateNotifications = function (a) {
        for (var b = 0; b < a.notifications.length; b++) a.notifications[b].weeksUntilFired -= 0.1
    };
    General.proceedOneWeek = function (a, b) {
        var c = a.currentWeek;
        b && (c = b);
        if (0 < c) {
            var l = a.getDate(c);
            4 < l.year && GameManager.ghg2() ? a.notifications.push(new Notification("{TrialEnd}")) : l.year > 30 * GameManager.flags.gameLengthModifier && !a.flags.endGameShown && (Media.createFinishGameStories(), a.flags.endGameShown = !0);
            var g = a.cash;
            Sales.processSales(a);
            1 === l.week && (General.payMonthlyCosts(a),
                Sales.sellSDKs(a), Sales.applyGridSales(a));
            a.flags.pirateMode && 0 < a.flags.sharesSold && (g = a.cash - g, 0 < g && (g = g / 100 * 20 * (a.flags.sharesSold / 100), g = Math.floor(g), a.adjustCash(-g, "Dividends".localize("heading"))));
            GameTrends.updateTrends(a);
            1 < a.currentLevel && 5 === l.month && 1 === l.week && 7 < l.year ? GameFlags.CONFERENCE_DISABLED || (a.flags.customConference ? (l = a.booths.first(function (a) {
                return 4 === a.id
            }), a.conferenceStandFactor = l.standFactor, a.flags.customConference = !1, a.notifications.push(new Notification("News".localize("heading"),
                "Our own game convention is taking place in 4 weeks!".localize(), {
                type: NotificationType.Others,
                previewImage: "./images/notificationIcons/icon_notification_new_office.png"
            })), a.flags.isCustomConference = !0, a.flags.customConference = !1) : a.notifications.push(new Notification("{BoothPicker}"))) : 6 === l.month && 2 === l.week && a.conferenceStandFactor && !GameFlags.CONFERENCE_DISABLED && General.runConference(a);
            GDT.fire(GameManager, GDT.eventKeys.gameplay.weekProceeded, {
                company: a
            })
        }
        for (l = 0; l < Platforms.allPlatforms.length; l++) g =
            Platforms.allPlatforms[l], Platforms.getPublishDate(g) === Math.floor(c) && (0 === g.licencePrize ? a.licencedPlatforms.push(g) : a.availablePlatforms.push(g), 0 < Math.floor(c) && (g = new Notification({
                header: "Platform News".localize("heading"),
                text: "Today the new game platform {0} by {1} has been released.".localize().format(g.name, g.company),
                image: Platforms.getPlatformImage(g, a.currentWeek),
                type: NotificationType.PlatformNews
            }), a.notifications.push(g), a.flags.contractspublisher && (a.flags.contractspublisher.expireBy =
                GameManager.gameTime - 1)));
        General.checkAndRemoveRetiredPlatforms(a, a.licencedPlatforms, c);
        General.checkAndRemoveRetiredPlatforms(a, a.availablePlatforms, c);
        LOGWEEKSALES && General.logMaxSalesForWeek(c)
    };
    General.getWeekFromDateString = function (a, b) {
        var c = a.split("/");
        if (3 != c.length) return 0;
        c = 48 * (c[0] - 1) + 4 * (c[1] - 1) + (c[2] - 1);
        if (!b) {
            var l = GameManager.flags.gameLengthModifier;
            l && 1 != l && (c = Math.round(c * l))
        }
        return c
    };
    General.logMaxSalesForWeek = function (a) {
        GameManager.pause(!0);
        var b = new Company("SalesLogCompany");
        b.currentWeek = a;
        var c = new Game(b);
        c.topic = Topics.topics[0];
        c.genre = GameGenre.Action;
        for (var l = GameManager.company.availablePlatforms.concat(GameManager.company.licencedPlatforms), g = 0; g < l.length; g++) 0 < Platforms.getMarketSizeForWeek(l[g], a, b) && (c.platforms = [], c.platforms.push(l[g]));
        "Sales week {0}".format(a).log();
        for (g = 1; 11 > g; g++) c.score = g, Sales.calculateSales(b, c), "score {0}, income {2}".format(c.score, c.unitsSold, c.totalSalesCash).log();
        GameManager.resume(!0)
    };
    General.checkAndRemoveRetiredPlatforms =
        function (a, b, c) {
            for (var l = 0; l < b.length; l++) {
                var g = b[l];
                Platforms.getRetireDate(g) === Math.floor(c) + 8 && a.notifications.push(new Notification("News".localize("heading"), "In two months the {0} will be taken off the market!".localize().format(g.name), {
                    type: NotificationType.PlatformNews
                }));
                if (Platforms.getRetireDate(g) === Math.floor(c)) {
                    for (var f = 0, r = 0, p = 0; p < a.gameLog.length; p++) {
                        var s = a.gameLog[p];
                        !s.flags.isExtensionPack && 0 < s.platforms.filter(function (a) {
                            return a.id === g.id
                        }).length && (f++, r += s.revenue)
                    }
                    0 <
                        f ? 1 == f ? a.notifications.push(new Notification("News".localize("heading"), "{0} is no longer supported.\nYou've released {1} game for the platform and earned a total of {2}!".localize().format(g.name, f, UI.getShortNumberString(r)), {
                            type: NotificationType.SalesReports
                        })) : a.notifications.push(new Notification("News".localize("heading"), "{0} is no longer supported.\nYou've released {1} games for the platform and earned a total of {2}!".localize().format(g.name, f, UI.getShortNumberString(r)), {
                            type: NotificationType.SalesReports
                        })) :
                        a.notifications.push(new Notification("News".localize("heading"), "{0} is no longer supported.".localize().format(g.name), {
                            type: NotificationType.PlatformNews
                        }))
                }
            }
        };
    General.runConference = function (a) {
        var b = a.fans,
            c = a.getCurrentDate().year,
            l = Math.floor(49876 + 47500 * c),
            g = Math.floor(0.005 * l),
            c = g,
            b = (b / 5E5).clamp(0, 1),
            f = Math.floor(l * b * 0.7),
            r = Math.floor(l * a.conferenceStandFactor * 0.3),
            c = c + f + r,
            c = Math.floor(c.clamp(0, l)),
            p = c / l,
            b = Math.floor(Math.abs(200 * p - 199));
        "conference. attendees: {0}, booth visitors: {1}({2}min+{3}fans+{4}stand), booth-rank: {5}".format(l,
            c, g, f, r, b).log();
        l = Math.floor(10 + 20 * a.getRandom() + 100 * p);
        a.currentGame && (a.currentGame.hypePoints += l, "hype points generated for current game: {0}".format(l).log());
        l = "We had {0} people visiting our booth this year.".localize().format(UI.getLongNumberString(c));
        l = 100 < b ? l + ("\n" + "We didn't make it in the top 100 booths this year. Once we gain more fans I'm sure we will!".localize()) : 1 === b || 0 === b ? l + ("\n" + "We were voted the number one booth this year! Congratulations!".localize()) : l + ("\n" + "We made it into the top 100 conference attractions this year at place {0}.".localize().format(b));
        a.notifications.push(new Notification("{GameConferenceAnimation}", "", c, 0));
        g = "./images/notificationIcons/icon_notification_convention.png";
        a.flags.isCustomConference && (l = "Our convention had {0} visitors this year!".localize().format(UI.getLongNumberString(c)), a.flags.isCustomConference = !1, g = void 0);
        a.notifications.push(new Notification("Game Conference".localize("heading"), l, "OK".localize(), {
            type: NotificationType.SalesReports,
            previewImage: g
        }))
    };
    General.getMonthlyCosts = function (a) {
        var b = 8E3;
        2 === a.currentLevel ||
            3 === a.currentLevel ? b *= 4 : 4 === a.currentLevel && (b *= 8);
        a.flags.solarPowerInstalled && (b *= 0.8);
        for (var c = 0; c < a.staff.length; c++) a.staff[c].salary && (b += a.staff[c].salary);
        return b
    };
    General.payMonthlyCosts = function (a) {
        var b = General.getMonthlyCosts(a);
        a.cash -= b;
        a.cashLog.push({
            amount: -b,
            label: "monthly costs".localize("heading")
        });
        a.currentGame && (a.currentGame.costs += b);
        a.flags.creditCardStolen && !a.flags.creditCardSwitched && a.adjustCash(-Math.floor(a.flags.creditCardDamages / 3), "MSCDPN_88");
        4 <= a.currentLevel &&
            (a.flags.fractionalHwLabCosts && (a.adjustCash(-a.flags.fractionalHwLabCosts, "Hardware lab".localize()), a.flags.fractionalHwLabCosts = 0), a.flags.fractionalRndLabCosts && (a.adjustCash(-a.flags.fractionalRndLabCosts, "R&D lab".localize()), a.flags.fractionalRndLabCosts = 0))
    };
    General.releaseGame = function (a) {
        var b = a.currentGame;
        GDT.fire(GameManager, GDT.eventKeys.gameplay.beforeReleaseGame, {
            company: a,
            game: b
        });
        b.state = GameState.released;
        b.releaseWeek = Math.floor(a.currentWeek) + 1;
        for (var c = 0; c < a.staff.length; c++) {
            var l =
                a.staff[c];
            b.flags.staffContribution.hasOwnProperty(l.id) && (l.flags.gamesContributed || (l.flags.gamesContributed = 0), l.flags.gamesContributed += b.getRatioWorked(l))
        }
        Tutorial.gameReleased();
        Reviews.reviewGame(a);
        Sales.calculateSales(a, b);
        0 === a.gameLog.length && (a.researchEnabled = !0, a.availableResearch.addRange(Research.BasicItems), Tutorial.firstGameFinished(b.releaseWeek - a.currentWeek + 0.4));
        a.gameLog.push(b);
        a.flags.contractsEnabled || 3 <= a.gameLog.length && GameManager.enableContracts();
        a.flags.featureResponsibility =
            $.extend({}, b.flags.featureResponsibility);
        a.currentGame = null;
        GameManager.currentContract && "gameContract" == GameManager.currentContract.type && GameManager.finishContract(!(b.score >= GameManager.currentContract.minScore));
        b.flags.miniBailoutAmount && DecisionNotifications.inDevBailout.triggerPayBack(b, b.releaseWeek - a.currentWeek);
        "ghg141kph" == b.title && (a.flags.ghg141 = !0);
        "ghgnogfc" == b.title && (a.flags.ghgnogfc = !0);
        GDT.fire(GameManager, GDT.eventKeys.gameplay.afterReleaseGame, {
            company: a,
            game: b
        })
    };
    General.trashGame =
        function (a) {
            var b = a.currentGame;
            a.trashedGames.push(a.currentGame);
            a.flags.featureResponsibility = $.extend({}, b.flags.featureResponsibility);
            a.currentGame = null;
            GameManager.currentContract && "gameContract" == GameManager.currentContract.type && GameManager.finishContract(!0);
            b.flags.miniBailoutAmount && DecisionNotifications.inDevBailout.triggerPayBack(b, 0)
        };
    General.getAvailableEngineParts = function (a) {
        return a.canDevelopEngine() ? [Research.TwoDGraphicsV2, Research.linearStory, Research.saveGame].concat(Research.getAllItems().except(Research.StartEngineParts.concat(Research.BasicItems)).filter(function (b) {
            return 0 !=
                Research.getEnginePoints(b) && 0 != Research.getEngineCost(b) && -1 != a.researchCompleted.indexOf(b)
        })) : []
    };
    General.hasEnginePart = function (a, b) {
        return a.parts.some(function (a) {
            return a.id === b.id
        })
    };
    General.getResponsibleStaffFactor = function (a, b, c) {
        var l = 1,
            g = a.currentGame;
        if (g.flags.featureResponsibility && g.flags.featureResponsibility.hasOwnProperty(b.id)) {
            var f = g.flags.featureResponsibility[b.id];
            a = a.staff.first(function (a) {
                return a.id === f
            });
            if (!a) return 0.7;
            g = General.getEffectiveWorkload(a, g);
            c = "d" === c ?
                a.designFactor : a.technologyFactor;
            l = 0.5 + 0.5 * c.clamp(0, 1) + 0.1 * c;
            a.flags.expert === b.id && (l += 0.15 * c);
            b = (g / 100 - 1).clamp(-1, 1);
            l = 0 < b ? l - 0.75 * l * b : l - 0.25 * l * -b
        }
        return l
    };
    General.getEffectiveWorkload = function (a, b) {
        var c = a.flags.workload;
        return 100 / (300 / General.getOptimalTeamSize(b)) * c
    };
    var a = function (a, c, f) {
        var l = GameGenre.getGenreWeighting(a.topic.genreWeightings, a.genre, a.secondGenre),
            g = General.getMission(c.id),
            n = 0;
        if ("focus" != c.type) {
            if (GameFlags.ghg6) throw "separate features in workLog not implemented";
            return 0
        }
        if ("preparation" === g.missionType || "BugFixing" === g.missionType) n = Missions.BASE_POINTS / 2;
        else {
            n = Missions.BASE_POINTS * Missions.getGeneralFactor(GameManager.company, g);
            n += General.getGameBasePoints(a) / 9;
            n *= "d" == f ? g.designFactor : g.technologyFactor;
            n *= g.percentage / (100 / 3);
            c = 0;
            for (var r = a.features.filter(function (a) {
                return a.category === g.id
            }), p = 0; p < r.length; p++) {
                var s = b(r[p], a, g);
                s && !isNaN(s) && (c += s)
            }
            if (isNaN(c)) throw "invalid featureBonus value";
            c *= General.getFeatureEfficiencyFromMissionFocus(a,
                r, g.percentage) / 100;
            n = (n + c) * General.getResponsibleStaffFactor(GameManager.company, g, f)
        }
        return n * l
    },
        b = function (a, b, c) {
            c = 1;
            a.getEfficiency && (c = a.getEfficiency(b));
            return a.v * LevelCalculator.getLevelBonusFactor(a.experience) * c * 0.8
        };
    General.getFeatureEfficiencyFromMissionFocus = function (a, b, c) {
        var l = 100;
        0 < b.length && (l = (100 / (5 * b.sum(function (a) {
            return a.v
        }) * ("aaa" == a.gameSize ? 0.4 : "large" == a.gameSize ? 0.7 : 1)) * c).clamp(0, 100));
        return l
    };
    General.getD = function (b, c) {
        return a(b, c, "d")
    };
    General.getT = function (b,
        c) {
        return a(b, c, "t")
    };
    General.getR = function (a, b) {
        if ("focus" === b.type) {
            var c = General.getMission(b.id),
                l = 0;
            if ("preparation" === c.missionType || "BugFixing" === c.missionType) return 0;
            l = Missions.BASE_RESEARCH_POINTS * GameManager.company.currentGame.researchFactor;
            l += l * GameManager.company.getRandom() * 0.1;
            c.percentage && (l *= c.percentage / (100 / 3));
            l *= this.getGameSizePointsFactor(a);
            for (c = 1; c < GameManager.company.staff.length; c++) l *= 0.95;
            for (c = 0; c < GameManager.company.researchPoints / 200; c++) l *= 0.95;
            return l
        }
        if ("feature" ===
            b.type) return General.getFeature(b.id), 0
    };
    General.getDuration = function (a, b) {
        var c = 0;
        "focus" === b.type ? (c = General.getMission(b.id), c = "preparation" === c.missionType ? Missions.PREP_DURATION : "BugFixing" === c.missionType ? Missions.FINISH_DURATION : void 0 != c.percentage ? 3 * Missions.BASE_DURATION / 100 * c.percentage : Missions.BASE_DURATION) : "feature" === b.type && (c = General.getFeature(b.id), c = Research.getDuration(c));
        return c * this.getGameSizeDurationFactor(a.gameSize) * General.getMultiPlatformDurationFactor(a)
    };
    General.getGameSizeDurationFactor =
        function (a) {
            return "small" === a ? GameFlags.SMALL_GAME_DURATION_FACTOR : "medium" === a ? GameFlags.MEDIUM_GAME_DURATION_FACTOR : "large" === a ? GameFlags.LARGE_GAME_DURATION_FACTOR : "aaa" === a ? GameFlags.AAA_GAME_DURATION_FACTOR : 1
        };
    General.getMultiPlatformDurationFactor = function (a, b) {
        var c = a.platforms,
            l = 1,
            g = 1;
        a.engine && void 0 == b && a.engine.parts.first(function (a) {
            return "MultiPlatformOptimized" == a.id
        }) && (g = 0.5);
        for (var f = 1; f < c.length; f++) l *= 1 + (GameFlags.MULTIPLATFORM_DURATION_FACTOR - 1) * g;
        return l
    };
    General.getMultiPlatformCostFactor =
        function (a) {
            if (1 >= a.platforms.length) return 1;
            var b = 1;
            a.engine && a.engine.parts.first(function (a) {
                return "MultiPlatformOptimized" == a.id
            }) && (b = 0.5);
            return General.getMultiPlatformDurationFactor(a, !0) * b
        };
    General.getGameSizePointsFactor = function (a) {
        return "small" === a.gameSize ? GameFlags.SMALL_GAME_POINTS_FACTOR : "medium" === a.gameSize ? GameFlags.MEDIUM_GAME_POINTS_FACTOR : "large" === a.gameSize ? GameFlags.LARGE_GAME_POINTS_FACTOR : "aaa" === a.gameSize ? GameFlags.AAA_GAME_POINTS_FACTOR : 1
    };
    General.getFeature = function (a) {
        return Research.getAllItems().first(function (b) {
            return b.id ===
                a
        })
    };
    General.getMission = function (a) {
        return Missions.getAllMissions().first(function (b) {
            return b.id === a
        })
    };
    General.notificationShown = function (a, b) {
        a.applyActions(GameManager.company);
        void 0 != b && General.broadCastNofificationComplete(a, b)
    };
    var c = [];
    General.registerAsNotificationSource = function (a) {
        c.push(a)
    };
    General.broadCastNofificationComplete = function (a, b) {
        if (a.sourceId)
            for (var f = 0; f < c.length; f++) {
                var l = c[f].getAllNotificationsObjects().first(function (b) {
                    return b.id === a.sourceId
                });
                if (l) {
                    l.complete &&
                        l.complete(b);
                    break
                }
            }
    };
    General.getAvailableFeaturesForConsole = function () {
        return General.getAvailableEngineParts(GameManager.company).filter(function (a) {
            return a.consolePart
        })
    };
    General.getAvailableProjects = function (a, b) {
        return Research.bigProjects.filter(function (c) {
            return c.targetZone == b && c.canResearch(a)
        })
    };
    General.getTopicOrder = function (a) {
        if (!GameFlags.RANDOMIZE_TOPICS) return Topics.topics;
        var b = Topics.topics,
            c = b.slice(0, 0),
            b = b.slice(0);
        for (a = new MersenneTwister(a.seed); 0 < b.length;) {
            var l = Math.floor(a.random() *
                b.length);
            c.push(b[l]);
            b.splice(l, 1)
        }
        return c
    };
    General.getTopicsAvailableForResearch = function (a) {
        for (var b = [], c = General.getTopicOrder(a), l = 0; l < c.length; l++) {
            var g = c[l],
                f = -1 != a.topics.indexOf(g),
                r = 0 < GameManager.currentResearches.filter(function (a) {
                    return a.topicId === g.id
                }).length;
            f || r || b.length < Research.TOPICS_VISIBLE && b.push(g)
        }
        return b
    };
    General.getAudienceWeightinIndex = function (a) {
        return "young" === a ? 0 : "everyone" === a ? 1 : "mature" === a ? 2 : -1
    };
    General.getAudienceWeighting = function (a, b) {
        if (void 0 === b || void 0 ===
            a) return 1;
        if ("young" === b) return a[0];
        if ("everyone" === b) return a[1];
        if ("mature" === b) return a[2];
        throw "unknown audience: " + genre;
    };
    General.getAvailableGenres = function (a) {
        var b = GameGenre.getAll(); - 1 == a.researchCompleted.indexOf(Research.CasualGames) && (b = b.filter(function (a) {
            return "Casual" != a.id
        }));
        return b
    };
    General.getGameSizeLabel = function (a) {
        switch (a) {
            case "aaa":
                return "AAA".localize();
            case "large":
                return "Large".localize().toLowerCase();
            case "medium":
                return "Medium".localize().toLowerCase();
            default:
                return "Small".localize().toLowerCase()
        }
    };
    General.getAudienceLabel = function (a) {
        switch (a) {
            case "young":
                return "Young".localize("audience category");
            case "mature":
                return "Mature".localize("audience category");
            default:
            case "everyone":
                return "Everyone".localize("audience category")
        }
    };
    General.getShortAudienceLabel = function (a) {
        switch (a) {
            case "young":
                return "Y".localize("target audience button content, Y as in young");
            case "mature":
                return "M".localize("target audience button content, M as in mature");
            default:
            case "everyone":
                return "E".localize("target audience button content, E as in everyone")
        }
    };
    General.getOptimalTeamSize = function (a) {
        switch (a.gameSize) {
            case "aaa":
                a = 6;
                break;
            case "large":
                a = 5;
                break;
            case "medium":
                a = 3;
                break;
            default:
                a = 1
        }
        return a
    };
    var f = [2, 5, 7, 10, 15, 20, 30, 40];
    General.getGameBasePoints = function (a) {
        var b = a.flags.techLevel;
        b || (b = 0);
        a = Math.floor(b);
        var b = b - Math.floor(b),
            c = f[a];
        0 != b && a + 1 < f.length && (c += (f[a + 1] - c) * b);
        return c
    };
    General.getApproxWeeksToCompletion = function (a) {
        var b = GameManager.getCurrentGameProgress();
        return Missions.BASE_DURATION * GameFlags.MAIN_MISSIONS_PER_GAME * General.getGameSizeDurationFactor(a.gameSize) *
            General.getMultiPlatformDurationFactor(a) * b / (1E3 * GameManager.SECONDS_PER_WEEK)
    }
})();