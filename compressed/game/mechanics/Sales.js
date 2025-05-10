"use strict";
var Sales = {};
(function () {
    Sales.smallUnitPrice = 7;
    Sales.mediumUnitPrice = 11;
    Sales.largeUnitPrice = 14;
    Sales.aaaUnitPrice = 18;
    Sales.consoleUnitPrice = 50;
    var a = function (a, b) {
        var c = 0;
        switch (b.gameSize) {
            case "medium":
                c = 1;
                break;
            case "large":
                c = 1.2;
                break;
            case "aaa":
                c = 1.5;
                break;
            default:
                return 1
        }
        return 1 + c
    };
    Sales.MediumTargetFans = 1E5;
    Sales.LargeTargetFans = 25E4;
    Sales.AAATargetFans = 1E6;
    Sales.getTargetFans = function (a, b) {
        switch (b.gameSize) {
            case "medium":
                return Sales.MediumTargetFans;
            case "large":
                return Sales.LargeTargetFans;
            case "aaa":
                return Sales.AAATargetFans;
            default:
                return 1
        }
    };
    var b = [0.95, 0.9, 0.85, 0.8, 0.75, 0.8, 0.85, 0.9, 0.9, 0.92],
        c = [0.05, 0.05, 0.05, 0.1, 0.1, 0.15, 0.2, 0.25, 0.25, 0.3],
        f = [2, 4, 6, 8, 10, 12];
    Sales.calculatePiracyPenalty = function (a, g, d) {
        if (!a.flags.pirateMode) return null;
        var k = g.features.first(function (a) {
            return "DRM" == a.category
        }),
            m = null != k && k.v;
        d = Math.round(d).clamp(1, 10) - 1;
        if (m) {
            var s = a.getCurrentDate().year,
                k = Math.floor(s / (5 / GameManager.flags.gameLengthModifier)).clamp(0, f.length - 1) - f.indexOf(k.v);
            0 == k ? (k = c[d], g.flags.drmStrength = 1) : 0 < k ? (k = b[d] -
                0.3, g.flags.drmStrength = -1) : (k = c[d] - 0.1, g.flags.drmStrength = 2)
        } else k = b[d], g.flags.drmStrength = 0;
        0 >= g.flags.drmStrength && (k -= 0.1 * a.getRandom());
        k += 0.05 * a.getRandom() * Math.randomSign();
        k = k.clamp(0, 0.98);
        return {
            piracyFactor: k,
            hasDrm: m
        }
    };
    Sales.calculateSales = function (b, g) {
        g.flags.fansAtLaunch = b.fans;
        var c = b.getCurrentDate().year,
            d = g.score.clamp(1, 10);
        GameFlags.G782 && 12 <= c && 0.75 >= b.getRandom() && (d = 1, b.notifications.push(new Notification("Sales Report", "Boss, it seems that while many players play our new game, they steal it by downloading a cracked version rather than buying it legally.\nIf players don't buy the games they like, we will sooner or later go bankrupt.",
            ":-(", 3.3 + 2.8 * b.getRandom(), {
            type: NotificationType.AutoPopup
        })), g.flags.noSalesEvents = !0);
        for (var f = d / 10, k = Math.min(15E5, b.fans) + Math.max(0, b.fans - 15E5) / 10, m = [0, 0, 0], t = 8, q = 0; q < g.platforms.length; q++) "PC" != g.platforms[q].id && (t = Math.min(t, g.platforms[q].techLevel));
        for (q = 0; q < g.platforms.length; q++) {
            var v = g.platforms[q].techLevel;
            "PC" == g.platforms[q].id && (v = t);
            var A = 1;
            0 == q && 1 < g.platforms.length ? A = 0.7 : 1 == q ? A = 2 == g.platforms.length ? 0.55 : 0.4 : 2 == q && (A = 0.3);
            m[q] += Platforms.getMarketSize(g.platforms[q], b) *
                A * (1 / v) * t * a(b, g)
        }
        t = [0, 0, 0];
        v = 0;
        q = 1;
        9 >= d ? (v = Math.pow(d, 3) / 100 * 0.2, 4 === b.currentLevel && (q = 1.25)) : (v = Math.pow(d, 3) / (100 - 35 * (d - 9)), q = 6 > c ? 0.65 : 4 === b.currentLevel ? 0.35 : 0.5);
        v = v * q / 15 * 0.2 + 0.008;
        v = [v, v, v];
        for (q = 0; q < g.platforms.length; q++) v[q] *= Platforms.getAudienceWeighting([g.platforms[q]], g.targetAudience), t[q] += Math.floor(m[q] * v[q]);
        if (g.hypePoints)
            if (c = Math.min(500, g.hypePoints) / 500, q = 5 <= d, g.flags.interviewHyped && g.flags.interviewHyped.decision && (q = 8 <= d), q)
                for (q = 0; q < g.platforms.length; q++) t[q] += Math.floor((d -
                    5) / 5 * m[q] * c * 0.05);
            else
                for (q = 0; q < g.platforms.length; q++) t[q] -= Math.floor(d / 5 * v[q] * 0.25 * c * m[q]);
        for (q = 0; q < g.platforms.length; q++) t[q] = Math.floor(Math.min(t[q], m[q]));
        if (g.flags.royaltyRate)
            for (t[0] += Math.max(0, Sales.getTargetFans(b, g) - k) * f, q = 0; q < g.platforms.length; q++) t[q] *= 10;
        else t[0] += k * f;
        LOGWEEKSALES || "market size {0}. total reach {1}. existing fans {2}".format(m.sum(function (a) {
            return a
        }), t.sum(function (a) {
            return a
        }), k).log();
        m = Math.floor(0.8 * t.sum(function (a) {
            return a
        }) * f + 0.2 * t.sum(function (a) {
            return a
        }) *
            b.getRandom());
        g.unitPrice = Sales.getUnitPrice(g);
        g.flags.mmo && "aaa" === g.gameSize && (m *= 1.45);
        b.flags.pirateMode && (q = m, c = Sales.calculatePiracyPenalty(b, g, d)) && (0 < c.piracyFactor && (g.flags.pirated = !0), 0.3 >= b.getRandom() && (c.hasDrm ? 0.2 > b.getRandom() && Sales.spawnDrmStory(b, g) : 0 < c.piracyFactor && Sales.spawnPirateStory(b, g)), m -= Math.round(m * c.piracyFactor), q = Math.roundToDecimals(100 - 100 / q * m, 2), g.flags.piracyRate = q, c.hasDrm && (f = (d - 1).clamp(1, 10) / 10));
        c = 0;
        7 <= d && !g.flags.sequelsTooClose && (c += 0.05 * k + 0.05 * k * b.getRandom());
        c = 5 <= d && !g.flags.sequelsTooClose ? g.flags.royaltyRate && 0 >= Sales.getTargetFans(b, g) - k ? c + Math.floor((0.005 * m * f + 0.005 * m * b.getRandom()) / 10) : c + Math.floor(0.005 * m * f + 0.005 * m * b.getRandom()) : -b.fans * (1 - f) * 0.25 * b.getRandom();
        d = m * g.unitPrice;
        LOGWEEKSALES || "units sold: {0}, sales: {1}$, fanMod{2}".format(m, d, c).log();
        g.totalSalesCash || (g.totalSalesCash = 0);
        g.totalSalesCash += d;
        g.fansChangeTarget = c;
        g.initialSalesRank = Sales.getInitialSalesRank(b, g);
        g.topSalesRank = g.initialSalesRank;
        GDT.fire(GameManager, GDT.eventKeys.gameplay.salesCalculated, {
            company: b,
            game: g
        })
    };
    var d = function (a, b) {
        return ["Hey {0},".localize("email greeting, where {0} is company name").format(a.name), "Hi there,".localize("email greeting"), "Greetings,".localize("email greeting"), "Dear developers,".localize("email greeting"), "Hello {0},".localize("email greeting, where {0} is CEO name").format(a.staff[0].name)].pickRandom()
    },
        k = function (a, b) {
            return ["I quite liked {0}".localize("{0} is game name, continues with piracy fragment 2"), "I really enjoyed your game {0}".localize("{0} is game name, continues with piracy fragment 2"),
            "{0} is really interesting".localize("{0} is game name, continues with piracy fragment 2"), "{0} is awesome".localize("{0} is game name, continues with piracy fragment 2")
            ].pickRandom().format(b.title)
        };
    Sales.spawnPirateStory = function (a, b) {
        var c = d(a, b),
            f = k(a, b),
            m = a.getCurrentDate().year,
            s = ["but I've played more interesting {0} games before".localize("piracy fragment 2 - continue with piracy fragment 3, {0} is genre name").format(b.genre.name), "but other {0} are more innovative".localize("piracy fragment 2 - continue with piracy fragment 3, {0} is genre name").format(b.genre.name),
            "but I've only played {0} hours of it".localize("piracy fragment 2 - continue with piracy fragment 3").format(Math.floor(12 + 300 * a.getRandom())), "but I hated the ending".localize("piracy fragment 2 - continue with piracy fragment 3"), "but it really needs more features".localize("piracy fragment 2 - continue with piracy fragment 3"), "but it needs more depth".localize("piracy fragment 2 - continue with piracy fragment 3"), "but it could use more polish".localize("piracy fragment 2 - continue with piracy fragment 3"),
            "but it's not as good as other games".localize("piracy fragment 2 - continue with piracy fragment 3"), "but other games are better".localize("piracy fragment 2 - continue with piracy fragment 3"), "but I think it's too expensive".localize("piracy fragment 2 - continue with piracy fragment 3"), "but I think it needs to be at least 30% cheaper".localize("piracy fragment 2 - continue with piracy fragment 3"), "but I don't like you".localize("piracy fragment 2 - continue with piracy fragment 3"), "but I think parts of it should work differently".localize("piracy fragment 2 - continue with piracy fragment 3")
            ];
        1 < a.staff.length && s.push("but I don't like that {0} works for you".localize("piracy fragment 2 - continue with piracy fragment 3").format(a.staff.skip(1).pickRandom().name));
        15 <= m && (s.push("but I'm saving up for this new graphics card".localize("piracy fragment 2 - continue with piracy fragment 3")), s.push("but I think it's not really AAA quality".localize("piracy fragment 2 - continue with piracy fragment 3")), s.push("but it isn't AAA quality".localize("piracy fragment 2 - continue with piracy fragment 3")));
        var s = s.pickRandom(),
            u = ["so I stole it.".localize("piracy fragment 3"), "so I pirated it.".localize("piracy fragment 3"), "so I think you don't deserve my money.".localize("piracy fragment 3")];
        14 <= m && (u.push("so I downloaded your game from a gamez website.".localize("piracy fragment 3")), 20 <= m && u.push("so I used a torrent.".localize("piracy fragment 3")));
        m = u.pickRandom();
        u = "";
        0.5 > a.getRandom() && (u = ["Anyway, just make better games, okay?".localize(), "Anyway, you really should release more updates for it.".localize(),
        "Looking forward to the sequel.".localize(), "You should give the game away for free.".localize(), "But hey, I've told my friends of the game so that's free publicity for you!".localize()
        ].pickRandom());
        var t = 0.9 > a.getRandom() ? UI.getRandomMaleFirstName() : UI.getRandomFemaleFirstName(),
            q = ["PS: I want to work in the games industry. Do you have a job for me?".localize()];
        a.isLaterOrEqualThan(18, 9, 1) && q.push("- Sent from my grPhone.".localize());
        var v = "";
        0.2 > a.getRandom() && (v = "\n\n" + q.pickRandom());
        c = "{0}\n{1} {2} {3}\n{4}\n{5}{6}".format(c,
            f, s, m, u, t, v);
        a.notifications.push(new Notification("Mail".localize("header"), c, null, 2.5 + 7 * a.getRandom()))
    };
    Sales.spawnDrmStory = function (a, b) {
        var c = b.features.first(function (a) {
            return "DRM" == a.category
        });
        if (c && 6 >= c.v) {
            var c = d(a, b),
                f = k(a, b),
                m = ["but your use of copy protection makes the game really slow.".localize("piracy fragment"), "but the included copy protection software is really inconvenient.".localize("piracy fragment"), "but the game stopped working saying that it wasn't a genuine copy! I swear I bought it and I'm very unhappy about this.".localize("piracy fragment"),
                "but the copy protection in that game constantly crashes my system.".localize("piracy fragment"), "but I hate how inconvenient the copy protection is.".localize("piracy fragment")
                ].pickRandom(),
                s = ["Can you please not use it in the future?".localize(), "A friend of mine pirated the game and he doesn't have any issues! This isn't fair!".localize(), "Thanks for your understanding.".localize(), "Please don't punish your fans for piracy!".localize(), "I will never buy anything from your company again!".localize(),
                "I will make sure to warn all of my friends about this.".localize()
                ].pickRandom(),
                u = 0.5 > a.getRandom() ? UI.getRandomMaleFirstName() : UI.getRandomFemaleFirstName(),
                c = "{0}\n{1} {2}\n{3}\n{4}".format(c, f, m, s, u);
            a.notifications.push(new Notification("Mail".localize("header"), c, null, 2.5 + 7 * a.getRandom()))
        }
    };
    Sales.getInitialSalesRank = function (a, b) {
        var c = Math.floor(b.score);
        GameGenre.getGenreWeighting(b.topic.genreWeightings, b.genre, b.secondGenre);
        var d = -1;
        if (10 === c) d = 1;
        else if (9 === c) d = 5;
        else if (8 === c) d = 10;
        else if (7 === c) d = 20;
        else if (6 === c) d = 40;
        else if (5 === c) d = 60;
        else return -1;
        var c = d * a.getRandom(),
            c = c + 0.5 * d * a.getRandom() * Math.randomSign(),
            f = Math.floor(d + c);
        if (100 < f) return -1;
        0 >= f && (f = 1);
        LOGWEEKSALES || "rank = {0} ({1}(initial)+{2}(variation))".format(f, d, Math.floor(c)).log();
        return f
    };
    Sales.getSalesLengthInWeek = function (a) {
        if ("small" === a.gameSize) return 10;
        if ("medium" === a.gameSize) return 15;
        if ("large" === a.gameSize) return 20;
        if ("aaa" === a.gameSize) return 25
    };
    Sales.getUnitPrice = function (a) {
        return "medium" ===
            a.gameSize ? Sales.mediumUnitPrice : "large" === a.gameSize ? Sales.largeUnitPrice : "aaa" === a.gameSize ? Sales.aaaUnitPrice : Sales.smallUnitPrice
    };
    Sales.getMMOIncome = function (a, b) {
        var c = b.totalSalesCash - b.currentSalesCash,
            c = 1;
        "medium" === b.gameSize ? c = 0.75 : "large" === b.gameSize ? c = 0.65 : "aaa" === b.gameSize && (c = 0.5);
        c = (b.totalSalesCash - b.currentSalesCash) * (0.05 * a.getRandom() * c + 0.05 * c);
        b.totalSalesCash += c / 2;
        1E4 > c && (c = 1E4, b.totalSalesCash += c);
        return c
    };
    Sales.getIncome = function (a, b) {
        var c = b.totalSalesCash - b.currentSalesCash,
            d = 1;
        "medium" === b.gameSize ? d = 0.75 : "large" === b.gameSize ? d = 0.65 : "aaa" === b.gameSize && (d = 0.5);
        (b.totalSalesCash - b.currentSalesCash) / b.totalSalesCash < 0.1 * d ? (b.totalSalesCash - b.currentSalesCash) / b.totalSalesCash > 0.01 * d && (c = (b.totalSalesCash - b.currentSalesCash) * (0.4 * a.getRandom() * d + 0.4 * d)) : c = (b.totalSalesCash - b.currentSalesCash) * (0.2 * a.getRandom() * d + 0.2 * d);
        return c
    };
    Sales.getGamesToSell = function (a) {
        var b = Math.floor(a.currentWeek);
        return a.gameLog.filter(function (a) {
            return b > a.releaseWeek && !a.soldOut && !a.flags.isExtensionPack
        })
    };
    Sales.getConsolesToSell = function (a) {
        var b = Math.floor(a.currentWeek);
        return a.licencedPlatforms.filter(function (a) {
            return !0 === a.isCustom && b > General.getWeekFromDateString(a.published) && !a.soldOut
        })
    };
    Sales.processSales = function (a) {
        for (var b = Math.floor(a.currentWeek), c = a.gameLog.filter(function (a) {
            return b > a.releaseWeek && !a.soldOut && !0 === a.flags.isExtensionPack
        }), d = 0, f = c.length; d < f; d++) {
            var k = c[d],
                m = a.getGameById(k.sequelTo);
            m ? (m.fansChangeTarget += k.fansChangeTarget, m.initialSalesRank = k.initialSalesRank,
                m.packReleaseWeek = k.releaseWeek, m.totalSalesCash += Math.floor(0.1 * m.totalSalesCash + k.totalSalesCash), m.confAmount = k.totalSalesCash, k.soldOut = !0) : k.flags.isExtensionPack = !1
        }
        c = Sales.getGamesToSell(a);
        d = 0;
        for (f = c.length; d < f; d++) Sales.sellGame(a, c[d], b);
        c = Sales.getConsolesToSell(a);
        d = 0;
        for (f = c.length; d < f; d++) Sales.sellConsole(a, c[d], b)
    };
    Sales.sellGame = function (a, b, c) {
        b.unitsSold || (b.unitsSold = 0);
        b.revenue || (b.revenue = 0);
        b.flags.saleCancelled && (b.totalSalesCash = b.currentSalesCash);
        var d = Sales.getSalesLengthInWeek(b);
        if (b.nextSalesCash) {
            b.currentSalesRank = b.nextSalesRank;
            b.fansChanged += b.nextfansChange;
            b.flags.royaltyRate ? (b.currentSalesCash += b.nextSalesCash / b.flags.royaltyRate, b.unitsSold += Math.floor(b.nextSalesCash / b.flags.royaltyRate / b.unitPrice)) : (b.currentSalesCash += b.nextSalesCash, b.unitsSold += Math.floor(b.nextSalesCash / b.unitPrice));
            0 != b.nextSalesCash && (a.adjustCash(b.nextSalesCash, "{0} sales".localize().format(b.title)), b.revenue += Math.floor(b.nextSalesCash));
            b.nextMaintenance && 0 != b.nextMaintenance && (a.adjustCash(-b.nextMaintenance,
                "{0} maintenance".localize().format(b.title)), b.costs += Math.floor(b.nextMaintenance));
            b.flags.mmo && (b.flags.isProfitable = b.nextSalesCash >= b.nextMaintenance);
            if (0 != b.nextfansChange) {
                var f = Math.floor(b.nextfansChange);
                if (0 === a.fans && 0 < f) {
                    var k = "{0} was so successful that we now have {1} fans!".localize().format(b.title, UI.getLongNumberString(f)),
                        k = new Notification({
                            header: "Fans".localize("heading"),
                            text: k,
                            type: NotificationType.CompanyMilestones,
                            weeksUntilFired: 0.2
                        });
                    a.notifications.push(k)
                }
                a.adjustFans(f)
            }
            if (b.firstSales) {
                if (2 >
                    a.gameLog.length || 10 <= b.rank) k = "{0} sold {1} units in its first week on the market.".localize().format(b.title, UI.getLongNumberString(b.unitsSold)), f = b.currentSalesRank, 0 < f && (k += "\n" + "We made it in the charts at #{0}!".localize().format(f)), k = new Notification({
                        header: "First week of sales!".localize(),
                        text: k,
                        type: NotificationType.CompanyMilestones
                    }), a.notifications.push(k), Tutorial.firstSales();
                b.flags.mmo && Tutorial.mmoOnSale()
            }
            b.nextfansChange = void 0;
            b.nextSalesCash = void 0
        }
        if (b.totalSalesCash > b.currentSalesCash ||
            b.flags.mmo && !b.flags.saleCancelled) {
            f = 0 === b.currentSalesCash;
            k = 0;
            if (!b.flags.mmo) {
                var m = b.getSalesAnomaly();
                0 < m ? k = Math.floor(b.totalSalesCash * m * 0.3) : 0 > m && (k = Math.floor(b.totalSalesCash * m * 0.3))
            }
            m = 0;
            m = b.flags.mmo ? Sales.getMMOIncome(a, b) : Sales.getIncome(a, b);
            b.nextfansChange = Math.floor(m / b.totalSalesCash * b.fansChangeTarget);
            b.nextSalesCash = Math.floor(m + k / 2);
            b.flags.royaltyRate && (b.nextSalesCash = Math.floor(b.nextSalesCash * b.flags.royaltyRate), k = Math.floor(k * b.flags.royaltyRate));
            b.flags.mmo && (b.maintenanceLog ||
                (b.maintenanceLog = []), b.nextMaintenance = Math.floor((b.currentSalesCash + b.nextSalesCash) / 100), b.nextMaintenance += Math.floor(b.nextSalesCash / (Math.pow(b.maintenanceLog.length, 3) + 3)));
            0 >= b.nextSalesCash ? (b.nextSalesCash = void 0, b.nextMaintenance = void 0, b.totalSalesCash = b.currentSalesCash) : (b.flags.mmo && b.maintenanceLog.push(b.nextMaintenance), b.salesCashLog.push(b.nextSalesCash), b.totalSalesCash += Math.floor(k)); - 1 != b.initialSalesRank && (a = (c - b.releaseWeek) / d, b.packReleaseWeek && (a = (c - b.packReleaseWeek) /
                d), c = Math.max(b.initialSalesRank, Math.floor(b.initialSalesRank + 2 * b.initialSalesRank * (a - 0.1))), c = GameManager.getUniqueSalesRank(c, b), b.nextSalesRank = 100 < c ? -1 : c);
            f ? (b.firstSales = !0, UI.addSalesCard(b.id, b.title, b.currentSalesCash, b.totalSalesCash, b.unitsSold, b.currentSalesRank, b.salesCashLog, b.nextSalesCash, b.unitPrice, b.nextMaintenance, b.maintenanceLog, b.flags.royaltyRate)) : (b.firstSales = !1, UI.updateSalesCard(b.id, b.unitsSold, b.nextSalesCash, b.salesCashLog, b.unitPrice, b.currentSalesRank, b.nextMaintenance,
                b.maintenanceLog, b.flags.royaltyRate))
        } else b.soldOut = !0, b.currentSalesRank = -1, UI.removeSalesCard(b.id, !0), k = "{0} is now off the market. It sold {1} units generating {2} in sales.".localize().format(b.title, UI.getLongNumberString(b.unitsSold), UI.getLongNumberString(b.revenue)), k = new Notification({
            header: "Game off the market.".localize("heading"),
            text: k,
            type: NotificationType.SalesReports
        }), a.notifications.push(k)
    };
    Sales.getConsoleIncome = function (a, b) {
        var c = 1E6 * b.unitsSold * Sales.consoleUnitPrice,
            d =
                c - b.currentSalesCash,
            d = 0.1;
        General.getWeekFromDateString(b.published) + 10 > a.currentWeek ? d = 0.2 : General.getWeekFromDateString(b.published) + 20 > a.currentWeek && (d = 0.13);
        d = (c - b.currentSalesCash) * (a.getRandom() * d * 0.15 + 0.15 * d);
        1E4 > d && (d = 5E3 + 5E3 * a.getRandom(), b.unitsSold = (c + d) / 1E6 / Sales.consoleUnitPrice);
        return d
    };
    Sales.getSalesAnomalyForConsole = function (a, b) {
        for (var c = Math.floor(a.currentWeek), d = 0, f = a.gameLog.filter(function (a) {
            return c > a.releaseWeek && !a.soldOut && 0 < a.platforms.filter(function (a) {
                return a.id ===
                    b.id
            }).length && 100 >= a.currentSalesRank && 0 < a.currentSalesRank
        }), k = 0, m = f.length; k < m; k++) d = Math.max(d, (101 - f[k].currentSalesRank) / 100);
        0 > b.satisFaction - 1 && (d += (b.satisFaction - 1).clamp(-0.5, 0));
        return d
    };
    Sales.sellConsole = function (a, b, c) {
        b.saleCancelled && (b.unitsSold = b.currentSalesCash / Sales.consoleUnitPrice / 1E6, b.soldOut = !0);
        var d = 1E6 * b.unitsSold * Sales.consoleUnitPrice;
        b.currentSalesCash || (b.currentSalesCash = 0);
        b.currentUnitsSold || (b.currentUnitsSold = 0);
        b.salesCashLog || (b.salesCashLog = []);
        b.nextSalesCash &&
            (b.currentSalesCash += b.nextSalesCash, b.currentUnitsSold += Math.floor(b.nextSalesCash / Sales.consoleUnitPrice), 0 != b.nextSalesCash && a.adjustCash(b.nextSalesCash, "{0} sales".localize().format(b.name)), b.nextSalesCash = void 0);
        if (Math.floor(d) > b.currentSalesCash) {
            c > General.getWeekFromDateString(b.published) + 1 && Sales.generateMaintenancePoints(a, b, c);
            c = 0 === b.currentSalesCash;
            General.getWeekFromDateString(b.published);
            var f = Sales.getConsoleIncome(a, b);
            a = Sales.getSalesAnomalyForConsole(a, b);
            var k = 0;
            0 != a && (k =
                Math.floor(f * a), b.unitsSold += k / Sales.consoleUnitPrice / 1E6);
            b.nextSalesCash = Math.floor(f + k);
            0 >= b.nextSalesCash ? (b.nextSalesCash = void 0, b.currentUnitsSold = b.currentSalesCash / Sales.consoleUnitPrice) : b.salesCashLog.push(b.nextSalesCash);
            c ? (b.firstSales = !0, UI.addSalesCard(b.id, b.name, b.currentSalesCash, d, b.currentUnitsSold, -1, b.salesCashLog, b.nextSalesCash, Sales.consoleUnitPrice)) : (b.firstSales = !1, UI.updateSalesCard(b.id, b.currentUnitsSold, b.nextSalesCash, b.salesCashLog, Sales.consoleUnitPrice, -1))
        } else UI.removeSalesCard(b.id,
            !0), UI.removeMaintenanceCard(b, !1), "{0} is now off the market. It sold {1} units generating {2} in sales.".localize().format(b.name, UI.getLongNumberString(b.currentUnitsSold), UI.getLongNumberString(b.currentSalesCash))
    };
    var m = function (a) {
        for (var b = a.salesCashLog.length, c = 0, d = b - 1; d > Math.max(b - 5, 0); d--) c += a.salesCashLog[d];
        return Math.floor(c / Sales.consoleUnitPrice)
    };
    Sales.generateMaintenancePoints = function (a, b, c) {
        void 0 === b.maintenancePoints && (b.repairPoints = 0, b.maintenancePoints = 0, b.maintenanceLog = []);
        c = 1E6 * b.unitsSold;
        c = Math.min(32.5 * m(b) / c * 10, 45);
        a = Math.max(5, Math.floor(c - c * (0.4 * a.getRandom() + 0.6 * b.qF)));
        b.maintenancePoints += a;
        b.maintenanceLog.push(b.maintenancePoints);
        UI.updateMaintenanceCard(b)
    };
    Sales.sellSDKs = function (a) {
        var b = a.engines.filter(function (a) {
            return -1 != a.parts.indexOf(Research.sdk)
        });
        if (0 < b.length)
            for (var b = b.sort(function (a, b) {
                return a.techLevel - b.techLevel
            }), c = 0; c < b.length; c++)
                if (b[c].releaseWeek + 96 > a.currentWeek) {
                    var d = b[c].costs / 12,
                        f = Platforms.getPlatformsOnMarket(a).filter(function (a) {
                            return !a.isCustom
                        }).max(function (a) {
                            return a.techLevel
                        });
                    f && (d *= b[c].techLevel / f);
                    a.adjustCash(d, b[c].name + " SDK".localize("short for Software Development Kit"));
                    break
                }
    };
    Sales.applyGridSales = function (a) {
        if (a.flags.grid) {
            for (var b = Platforms.getPlatformsOnMarket(a), c = Platforms.getMarketSizeForWeek(b.first(function (a) {
                return "PC" === a.id
            }), a.currentWeek, a, !0), d = "PC", f = b.filter(function (a) {
                return a.isCustom
            }), k = 0; k < f.length; k++) {
                var m = Platforms.getMarketSizeForWeek(f[k], a.currentWeek, a, !0);
                m > c && (c = m, d = f[k].id)
            }
            b = b.first(function (a) {
                return a.id === d
            });
            a.adjustCash(Platforms.getTotalMarketSizePercent(b,
                GameManager.company) / 100 * 2E6, "Grid income".localize("heading"))
        }
    }
})();