"use strict";
var Reviews = {};
(function () {
    var a = function (a) {
        if (a.lastTopScore) {
            var b = 6 >= a.getCurrentDate().year ? 1.15 : 23 < a.getCurrentDate().year ? 1.1 : 1.2,
                c = a.previousTopScore ? a.previousTopScore : 20,
                b = Math.floor(a.lastTopScore + a.lastTopScoreIncrease * b),
                l = 6 + 9 * General.getGameSizeDurationFactor(a.lastTopScoreGameSize);
            return !a.lastTopScoreWeek || a.currentWeek >= a.lastTopScoreWeek + l ? b : Math.floor(c + (b - c) * (a.currentWeek - a.lastTopScoreWeek) / l)
        }
        return 20
    },
        b = function (b, c) {
            if (!b.lastTopScore || b.lastTopScore < c) {
                var f = a(b);
                b.lastTopScore ? (b.lastTopScoreIncrease =
                    Math.max(c - b.lastTopScore, 0.1 * f), 2 <= b.currentLevel && b.lastTopScoreIncrease > 0.2 * b.lastTopScore && (b.lastTopScoreIncrease = 0.2 * b.lastTopScore)) : b.lastTopScoreIncrease = Math.max(c - f, 0.1 * f);
                var l = 20 < b.lastTopScore ? b.lastTopScore : 20;
                b.previousTopScore = l > f ? f : l;
                b.previousTopScore += Math.abs((c - b.previousTopScore) / 3);
                b.previousTopScore > c && (b.previousTopScore = c);
                b.lastTopScore = c;
                b.lastTopScoreWeek = b.currentWeek;
                b.lastTopScoreGameSize = b.currentGame.gameSize
            }
        },
        c = function (a, c) {
            a.topScoreAchievements++;
            a.currentGame.flags.topScore = !0;
            b(a, c)
        };
    Reviews.reviewGame = function (a) {
        var b = a.currentGame,
            c = Reviews.rateGame(a),
            l = b.releaseWeek - a.currentWeek;
        a.currentGame.reviews = c;
        c = "The first reviews for our newly released game, {0}, came in!".localize().format(a.currentGame.title);
        a.notifications.push(new Notification("Game review".localize("heading"), c, "OK".localize(), l + 0.3, {
            type: NotificationType.AutoPopup
        }));
        a.notifications.push(new Notification("{Reviews}", null, null, l + 0.3));
        0 === a.gameLog.length && a.notifications.push(new Notification("News".localize("heading"),
            Media.createFirstGameStory(a), "OK".localize(), l + 0.7, {
            type: NotificationType.CompanyMilestones,
            previewImage: "./images/notificationIcons/icon_notification_reviews.png"
        }));
        b.flags.sameGenreTopic && (b = Media.createSameGenreTopicStory(a, b)) && (b.weeksUntilFired = l + 1, a.notifications.push(b))
    };
    var f = function (a, b) {
        var c = Missions.getAllMissions().filter(function (a) {
            return "dev" === a.missionType && 0.9 <= Missions.getGenreWeighting(a, b)
        }).count(function (g) {
            if (b.flags.featureResponsibility.hasOwnProperty(g.id)) {
                var l =
                    b.flags.featureResponsibility[g.id],
                    c = a.staff.first(function (a) {
                        return a.id === l
                    });
                if (c && c.flags.expert === g.id) return !0
            }
            return !1
        });
        2 <= c && (b.flags.psEnabled = !0);
        if ("small" === b.gameSize && 2 <= a.currentLevel || "medium" === b.gameSize && 1E5 >= a.fans) return 9;
        var l = b.flags.techLevel;
        return "large" === b.gameSize ? (l = (3 - l).clamp(0, 3), 10 - l) : "aaa" === b.gameSize ? (l = (5 - l).clamp(0, 3), c = (3 - c).clamp(0, 3), 10 - (l + 0.6 * c)) : 10
    };
    Reviews.rateGame = function (d) {
        var k = [],
            m = [],
            l = 1,
            g = d.currentGame;
        GDT.fire(GameManager, GDT.eventKeys.gameplay.beforeGameReview, {
            company: d,
            game: g
        });
        g.flags.mmo && (l = 2);
        var n = null;
        g.sequelTo && (n = d.getGameById(g.sequelTo), n.releaseWeek > d.currentWeek - 40 && (g.flags.sequelsTooClose = !0));
        var r = g.technologyPoints,
            p = g.designPoints,
            s = 0,
            u = 0,
            t = 0;
        if (30 <= p + r) {
            var q = GameGenre.getGoldenRatio(g.genre, g.secondGenre),
                q = p * q - r,
                v = 0,
                v = r > p ? Math.abs(q / r * 100) : Math.abs(q / p * 100);
            "goldenRatio percentDifference: {0}".format(v).log();
            25 >= Math.abs(v) ? (s += 0.1, u += 1, m.push("They achieved a great balance between technology and design.".localize())) : 50 < Math.abs(v) &&
                (s -= 0.1, 0 > q ? k.push("They should focus more on design.".localize()) : k.push("They should focus more on technology.".localize()))
        }
        q = g.featureLog.filter(function (a) {
            return "mission" === a.missionType
        });
        v = q.filter(function (a) {
            var b = a.duration / General.getGameSizeDurationFactor(g.gameSize) / General.getMultiPlatformDurationFactor(g) / (3 * Missions.BASE_DURATION);
            return 0.9 <= Missions.getGenreWeighting(a, g) && 0.4 <= b
        });
        2 <= v.length ? (s += 0.2, u += v.length, m.push("Their focus on {0} served this game very well.".localize().format(v.map(function (a) {
            return Missions.getMissionWithId(a.id)
        }).pickRandom().name))) :
            1 === v.length ? (s += 0.1, u += 1) : s -= 0.15 * l;
        var A = q.filter(function (a) {
            var b = a.duration / General.getGameSizeDurationFactor(g.gameSize) / General.getMultiPlatformDurationFactor(g) / (3 * Missions.BASE_DURATION);
            return 0.8 > Missions.getGenreWeighting(a, g) && 0.4 <= b
        });
        2 === A.length ? (v = Missions.getMissionWithId(A.pickRandom().id), s -= 0.2 * l, t += A.length, k.push("Their focus on {0} is a bit odd.".localize().format(v.name))) : 1 === A.length && (s -= 0.1 * l, t += 1);
        A = q.filter(function (a) {
            var b = a.duration / General.getGameSizeDurationFactor(g.gameSize) /
                General.getMultiPlatformDurationFactor(g) / (3 * Missions.BASE_DURATION);
            return 0.9 <= Missions.getGenreWeighting(a, g) && 0.2 >= b
        });
        for (q = 0; q < A.length; q++) v = Missions.getMissionWithId(A[q].id), s -= 0.15 * l, t += 1, k.push("They shouldn't forget about {0}.".localize().format(v.name));
        l = (p + r) / 2 / General.getGameSizePointsFactor(g);
        p = GameGenre.getGenreWeighting(g.topic.genreWeightings, g.genre, g.secondGenre);
        0.6 >= p ? k.push("{0} and {1} is a terrible combination.".localize().format(g.topic.name, g.getGenreDisplayName())) :
            1 === p && m.push("{0} and {1} is a great combination.".localize().format(g.topic.name, g.getGenreDisplayName()));
        v = g.genre.name;
        g.secondGenre && (v += "-" + g.secondGenre.name);
        (r = d.gameLog.last()) && !g.flags.isExtensionPack && r.genre === g.genre && r.secondGenre === g.secondGenre && r.topic === g.topic && (t += 1, r = "Another {0}/{1} game?".localize().format(v, g.topic.name), k.push(r), g.flags.sameGenreTopic = !0, "repeat genre/topic penalty: {0}:".format(-0.4).log(), s += -0.4);
        r = Platforms.getGenreWeighting(g.platforms, g.genre, g.secondGenre);
        if (0.6 >= r) {
            for (var z = Platforms.getNormGenreWeighting(g.platforms[0].genreWeightings, g.genre, g.secondGenre), B = 0, q = 1; q < g.platforms.length; q++) A = Platforms.getNormGenreWeighting(g.platforms[q].genreWeightings, g.genre, g.secondGenre), A < z && (B = q);
            k.push("{0} games don't work well on {1}.".localize().format(v, g.platforms[B].name))
        } else if (1 < r) {
            z = Platforms.getNormGenreWeighting(g.platforms[0].genreWeightings, g.genre, g.secondGenre);
            B = 0;
            for (q = 1; q < g.platforms.length; q++) A = Platforms.getNormGenreWeighting(g.platforms[q].genreWeightings,
                g.genre, g.secondGenre), A > z && (B = q);
            m.push("{0} games work well on {1}.".localize().format(v, g.platforms[B].name))
        }
        v = General.getAudienceWeighting(g.topic.audienceWeightings, g.targetAudience);
        0.6 >= v && k.push("{0} is a horrible topic for {1} audiences.".localize().format(g.topic.name, General.getAudienceLabel(g.targetAudience)));
        g.flags.sequelsTooClose && (s -= 0.4, t += 1, g.flags.isExtensionPack ? k.push("Already a expansion pack?".localize()) : k.push("Didn't we just play {0} recently?".localize().format(n.title)));
        g.flags.usesSameEngineAsSequel && !g.flags.isExtensionPack ? (s -= 0.1, t += 1) : g.flags.hasBetterEngineThanSequel && (s += 0.2, u += 1);
        g.flags.mmo && 1 > GameGenre.getGenreWeighting(g.topic.genreWeightings, g.genre, g.secondGenre) && (s -= 0.15);
        A = 1;
        0 < g.bugs && (A = 1 - 0.8 * ((100 / (g.technologyPoints + g.designPoints) * g.bugs).clamp(0, 100) / 100), 0.6 >= A ? k.push("Riddled with bugs.".localize()) : 0.9 > A && k.push("Too many bugs.".localize()));
        q = 1;
        if (1 < g.platforms.length) {
            B = g.platforms[0].techLevel;
            "PC" == g.platforms[0].id && (B = g.platforms[1].techLevel);
            for (var D = B, E = 1; E < g.platforms.length; E++) "PC" != g.platforms[E].id && (B = Math.max(B, g.platforms[E].techLevel), D = Math.min(D, g.platforms[E].techLevel));
            q -= (B - D) / 20
        }
        l = (l + l * s) * r;
        l *= v;
        l *= A;
        l *= q;
        q = GameTrends.getCurrentTrendFactor(g);
        g.flags.trendModifier = q;
        l *= q;
        B = a(d);
        z = l / B;
        0.6 <= z && (0.7 >= v || 0.7 >= p) && (z = 0.6 + (z - 0.6) / 2);
        if (0.7 < z)
            for (q = 0; q < g.platforms.length; q++)
                if (0.8 >= Platforms.getPlatformsAudienceWeighting(g.platforms[q].audienceWeightings, g.targetAudience)) {
                    l *= Platforms.getPlatformsAudienceWeighting(g.platforms[q].audienceWeightings,
                        g.targetAudience, !0);
                    z = l / B;
                    break
                }
        "achieved {0} / top game {1} = {2}".format(l, Reviews.topScore, z).log();
        p = !1;
        z = (10 * z).clamp(1, 10);
        g.flags.teamContribution = 0;
        d.staff.forEach(function (a) {
            g.flags.teamContribution = 1 > a.flags.gamesContributed ? g.flags.teamContribution + 1 : g.flags.teamContribution + g.getRatioWorked(a)
        });
        g.flags.teamContribution /= d.staff.length;
        if (0 < d.lastTopScore && z <= 5.2 - 0.2 * g.platforms.length && 0 < u && u > t && 0.8 <= g.flags.teamContribution) {
            var q = 6,
                B = 0,
                w;
            for (w in g.flags.staffContribution) g.flags.staffContribution.hasOwnProperty(w) &&
                B++;
            w = General.getOptimalTeamSize(g);
            w = Math.abs(w - B);
            1 < w && (q -= w - 1);
            (w = Reviews.getNewStaff(g)) && 0 < w.length && (q -= w.length / 2);
            q += u / 2 - t / 2;
            0.9 > A ? q -= 0.5 : 0.6 >= A && (q -= 1);
            0.8 >= r && (q -= 1 - r);
            0.8 >= v && (q -= 1 - v);
            if (1 < g.platforms.length) {
                B = g.platforms[0].techLevel;
                "PC" == g.platforms[0].id && (B = g.platforms[1].techLevel);
                D = B;
                for (E = 1; E < g.platforms.length; E++) "PC" != g.platforms[E].id && (B = Math.max(B, g.platforms[E].techLevel), D = Math.min(D, g.platforms[E].techLevel));
                q -= (B - D) / 0.5
            }
            q -= d.getRandom();
            q = Math.min(q, 7.7);
            z < q && (g.flags.scoreWithoutBrackets =
                z, z = q);
            if (3 < d.gameLog.length) {
                u = !0;
                for (q = 1; 3 >= q; q++)
                    if (t = d.gameLog[d.gameLog.length - q], t.score > 5.2 - 0.2 * t.platforms.length && !t.flags.scoreWithoutBrackets) {
                        u = !1;
                        break
                    } u && (d.lastTopScore = l, g.flags.topScoreDecreased = !0)
            }
        }
        u = f(d, g) / 10;
        "medium" != g.gameSize && "small" != g.gameSize && 1 > u && k.push("Technology is not state of the art.".localize());
        z *= u;
        9 <= z && (0.1 > s && 0.8 > d.getRandom() ? p = !0 : (w = Reviews.getNewStaff(g), 0 < w.length && (p = !0, g.flags.newStaffIds = w.map(function (a) {
            return a.id
        }))), p && (z = g.flags.newStaffIds &&
            0 < g.flags.newStaffIds.length ? 8.15 + 0.95 / g.flags.newStaffIds.length * d.getRandom() : 8.45 + 0.65 * d.getRandom(), 0.1 > d.getRandom() && (z = 9 + 0.25 * d.getRandom()), b(d, l)));
        n && (4 >= z ? g.flags.isExtensionPack ? k.push("What a horrible expansion pack!".localize()) : k.push("What a horrible sequel!".localize()) : 7 >= z ? g.flags.isExtensionPack ? k.push("Average expansion pack.".localize()) : k.push("Average sequel.".localize()) : g.flags.isExtensionPack ? k.push("Great expansion pack.".localize()) : m.push("Great sequel!".localize()));
        2 > d.topScoreAchievements && 4 > d.getCurrentDate().year && (10 == z ? (z -= 1.05 + 0.45 * d.getRandom(), c(d, l)) : 9 <= z ? (z -= 1.05 + 0.2 * d.getRandom(), c(d, l)) : 8.5 < z && (z -= 0.4 + 0.2 * d.getRandom()));
        9 <= z && c(d, l);
        10 != z && g.flags.topScore && 3 === d.topScoreAchievements && (z = 10);
        g.score = z;
        "final score: {0}".format(z).log();
        n && (0.5 >= d.getRandom() || !d.gameLog.some(function (a) {
            return null != a.sequelTo
        })) && (g.flags.isExtensionPack ? Media.createExtensionPackStory(d, g) : Media.createSequelStory(d, g));
        k = Reviews.getReviews(g, z, m, k);
        GDT.fire(GameManager,
            GDT.eventKeys.gameplay.afterGameReview, {
            company: d,
            game: g,
            reviews: k
        });
        return k
    };
    Reviews.getNewStaff = function (a) {
        for (var b = GameManager.company, c = [], l = 1; l < b.staff.length; l++) {
            var g = b.staff[l];
            if (a.flags.staffContribution && a.flags.staffContribution.hasOwnProperty(g.id)) {
                var f = g.flags.gamesContributed;
                0.2 <= f && 2 >= f && c.push(g)
            }
        }
        return c
    };
    Reviews.getReviews = function (a, b, c, l) {
        var g = Math.floor(b).clamp(1, 10);
        9.5 <= b && (g = 10);
        for (var f = ["Star Games", "Informed Gamer", "Game Hero", "All Games"], r = [], p = [], s = [], u = 1,
            t = 0; 4 > t; t++) {
            if (5 === g || 6 === g) u = 0.05 > GameManager.company.getRandom() ? 2 : 1;
            var q = 1 == Math.randomSign() ? 0 : u * Math.randomSign(),
                v = (g + q).clamp(1, 10);
            10 === v && 3 === s.length && 10 === s.average() && (a.flags.psEnabled ? 10 == Math.floor(b) && 0.4 > GameManager.company.getRandom() && v++ : (10 > Math.floor(b) || 0.8 > GameManager.company.getRandom()) && v--);
            var A = void 0;
            do 0.2 >= GameManager.company.getRandom() ? 0 <= q && 6 <= v && 0 != c.length ? A = c.pickRandom() : 0 > q && 6 > v && 0 != l && (A = l.pickRandom()) : A = void 0, A || (A = Reviews.getGenericReviewMessage(a, v));
            while (-1 != p.weakIndexOf(A));
            p.push(A);
            s.push(v);
            r.push({
                score: v,
                message: A,
                reviewerName: f[t]
            })
        }
        return r
    };
    Reviews.getGenericReviewMessage = function (a, b) {
        b = Math.floor(b);
        if (3 < b && 7 > b && !a.flags.hasCustomName && 0.1 >= GameManager.company.getRandom()) return ["As {0} as the name.".localize("{0} adjective").format(["boring".localize(), "generic".localize("used as adjective"), "blunt".localize(), "uninspired".localize(), "dull".localize()].pickRandom()), "The name says it all.".localize(), "They put as much thought into the game as into the game's name.".localize(),
        "Our review inspired by the game's name: bad review #{0}.".localize().format([1, 2, 3, 4, 5, 6].pickRandom())
        ].pickRandom();
        if (7 <= b && !a.flags.hasCustomName && 0.1 >= GameManager.company.getRandom()) return ["Good, despite the name.".localize(), "It's better than the name.".localize()].pickRandom();
        if (1 === b) return ["N/A not worth a statement.".localize(), "One of the worst!".localize(), "Makes you cry.".localize(), "Don't buy!".localize(), "Horrible.".localize(), "I still have nightmares!".localize(), "A disaster!".localize(),
        "Really bad.".localize()
        ].pickRandom();
        if (2 === b) return ["Utterly uninspiring.".localize(), "Not fun.".localize(), "Boring.".localize(), "Disappointing.".localize(), "Bin material.".localize(), "Bad.".localize(), "Abysmal.".localize()].pickRandom();
        if (3 === b) return ["Disappointing.".localize(), "Waste of money.".localize(), "Waste of time.".localize(), "Not much fun.".localize(), "Pretty bad.".localize()].pickRandom();
        if (4 === b) return ["Not bad. Not good.".localize(), "Meh!".localize(), "OK.".localize(), "Uninspiring.".localize()].pickRandom();
        if (5 === b) return ["Falls a bit short.".localize(), "Fun at stages.".localize(), "Has its moments.".localize(), "Have seen better.".localize()].pickRandom();
        if (6 === b) return ["Shows potential.".localize(), "Could have been better.".localize(), "Quirky but good.".localize(), "I like it.".localize()].pickRandom();
        if (7 === b) return ["Good game.".localize(), "Enjoyable.".localize(), "Nice experience.".localize(), "Beautiful.".localize()].pickRandom();
        if (8 === b) return ["Very good.".localize(), "Very enjoyable.".localize(),
        "Love it!".localize(), "Played it for days.".localize()
        ].pickRandom();
        if (9 === b) return ["Great!".localize(), "Almost perfect.".localize(), "One of the best.".localize(), "More please.".localize(), "Great game.".localize(), "Outstanding game.".localize(), "Can't wait for the sequel.".localize()].pickRandom();
        if (10 === b) return ["A masterpiece.".localize(), "Best of its kind.".localize(), "Truly great.".localize(), "Everyone loves it!".localize(), "Must have!".localize(), "Outstanding achievement.".localize(), "Awesome!".localize(),
        "My new favorite!".localize()
        ].pickRandom();
        if (11 === b) return ["11 out of 10. Game of the year, any year!".localize(), "11 out of 10. Nuff said.".localize(), "11 out of 10. A exceptional score for an exceptional game.".localize(), "11 out of 10. Rules don't apply to this outstanding game.".localize()].pickRandom();
        throw "score cannot be " + b;
    }
})();
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
var SalesEvents = {};
(function () {
    var a = SalesEvents;
    a.getAllNotificationsObjects = function () {
        var b = [],
            g;
        for (g in a)
            if (a.hasOwnProperty(g)) {
                var c = a[g];
                void 0 != c.id && b.push(c)
            } return b
    };
    General.registerAsNotificationSource(a);
    a.getSaleRecord = function (a, b) {
        if (!b.flags.royaltyRate && !b.flags.noSalesEvents) {
            var c = [1E4, 5E4, 1E5].reverse(),
                d = [0.1, 0.2, 0.3].reverse();
            if (!a.flags.game100Ksales)
                for (var f = 0; f < c.length; f++) {
                    var k = c[f];
                    if (b.unitsSold > k && !a.flags["game" + UI.getShortNumberString(k) + "sales"]) return c.slice(f).forEach(function (b) {
                        a.flags["game" +
                            UI.getShortNumberString(b) + "sales"] = !0
                    }), a.notifications.push(new Notification({
                        header: "Sales Record".localize("heading"),
                        text: "{0} has achieved a company sales record with over {1} units sold!\nThis is an important milestone in the history of {2}!".localize().format(b.title, UI.getShortNumberString(k), a.name),
                        type: NotificationType.CompanyMilestones
                    })), d[f]
                }
            for (var m = [5E5, 1E6, 5E6, 1E7, 5E7, 1E8].reverse(), d = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9].reverse(), t = "We just got word that {0} which was recently released by {1} has racked up over {2} in sales.".localize() +
                "\n", c = ["Gold".localize("music record status"), "Platinum".localize("music record status"), void 0, "Diamond".localize("music record status"), void 0, void 0].reverse(), f = 0; f < m.length; f++)
                if (k = m[f], !(b.unitsSold <= k)) {
                    if (b.flags["game" + UI.getShortNumberString(k) + "sales"]) break;
                    m = t.format(b.title, a.name, UI.getShortNumberString(k));
                    c.length > f && void 0 != c[f] && 0.5 < a.getRandom() && (m += "If the game were a music record it would have {0} status.{n}".localize("{0} gold, platinum etc.").format(c[f]));
                    m = 2 == f ? m + ["An incredible achievement".localize(),
                    "This is an unbelievably high number.".localize(), "This game truly deserves to be called AAA.".localize()
                    ].pickRandom() : 1 == f ? m + "Only a true master of the industry could achieve such a milestone. {0} will forever be remembered in gaming history for this.".localize().format(a.staff[0].name) : m + ["The excitement around the game seems to have no end.".localize(), "We wonder how many more it will sell.".localize(), "Competitors have been observed muttering jealous remarks.".localize(), "Go {0}! Well done!".localize().format(a.name)].pickRandom();
                    a.notifications.push(new Notification({
                        header: "Industry News".localize("heading"),
                        text: m,
                        type: NotificationType.CompanyMilestones
                    }));
                    d = d[f];
                    b.flags["game" + UI.getShortNumberString(k) + "sales"] = !0;
                    return d / (b.flags.salesAnomaly + 1)
                }
        }
    };
    a.getTopScoreSalesEvent = function (a, c) {
        if (!c.flags.topScoreAchievementShown) {
            var d = "",
                f;
            switch (a.topScoreAchievements) {
                case 1:
                    d = "According to our market research the recently published game '{0}' is a surprise hit with players.".localize().format(c.title);
                    d += "\n\n " + "The developer {0} is fairly new to the gaming industry but we cannot wait for what they will develop next!".localize().format(a.name);
                    f = 0.2;
                    break;
                case 2:
                    var k = c.reviews.max(function (a) {
                        return a.score
                    }),
                        d = c.reviews.first(function (a) {
                            return a.score == k
                        }),
                        d = "The latest game by {0} has received very positive reviews overall!\n{1} gave it a '{2}' saying '{3}'.".localize().format(a.name, d.reviewerName, d.score, d.message),
                        d = d + ("\n" + "If {0} continues to innovate like this they might become a new fan favorite!".localize().format(a.name));
                    f = 0.3;
                    break;
                case 3:
                    d = "{0}, the newest game by {1} has caused a storm of good reviews and excited customers.".localize().format(c.title,
                        a.name), d += "\n\n" + "Industry professionals say that {0} is one of these rare games that will set a new quality standard for future games.{n}".localize().format(c.title), d += "It seems that {0} really has made gaming history with {1}!\nWell done!".localize().format(a.name, c.title), f = 0.5
            }!d && 9 <= c.score && (d = b(a, c)) && (f = 0.4 * a.getRandom());
            d && (c.flags.topScoreAchievementShown = !0, a.notifications.push(new Notification("News".localize("heading"), d, "OK".localize(), {
                type: NotificationType.CompanyMilestones,
                previewImage: "./images/notificationIcons/icon_notification_reviews.png"
            })));
            return f
        }
    };
    var b = function (a, b) {
        var d = b.featureLog.filter(function (a) {
            return "mission" === a.missionType
        }).filter(function (a) {
            var c = a.duration / General.getGameSizeDurationFactor(b.gameSize) / General.getMultiPlatformDurationFactor(b) / (3 * Missions.BASE_DURATION);
            return 0.9 <= Missions.getGenreWeighting(a, b) && 0.4 <= c
        });
        if (0 != d.length) {
            var f = d.pickRandom(),
                d = ["If you are not a fan of {0} now then chances are you will be after playing their latest hit {1}.".localize(), "Ladies and gentlemen, the surprise hit of the year is {1} by {0}.".localize(),
                "When I started playing {1} I had no idea what I was in for.".localize(), "There are a lot of good surprises waiting for you in {1}.".localize(), "Another memorable game by {0} has been released.".localize(), "I have been playing {1} and have tremendously enjoyed the experience.".localize(), "{0} surprises us again with a very enjoyable game.".localize()
                ],
                f = c(f),
                k = ["Rarely will a game captivate you as much as {1}.".localize(), "{1} really deserves the top spots in the charts.".localize(), "Simply one of the best games I've played.".localize(),
                "Well, what can I say? Stop reading. Start playing.".localize(), "A stellar effort by {0}.".localize(), "To {0}: Keep the hits coming please :)".localize(), "Only a game with unicorns, rainbows, pirates and ninjas could possibly be better.".localize(), "Summary: best. game. ever.".localize()
                ],
                s = m(a).pickRandom();
            return (d.pickRandom() + " " + f + " " + k.pickRandom()).format(a.name, b.title) + "\n{0}, {1}".format(s.author, s.name)
        }
    },
        c = function (a) {
            var b = {
                Engine: ["There is a rare technical polish in this game which really comes through in the overall experience.".localize(),
                "The game shines of technical excellence. Clearly the developers know what they are doing.".localize(), "I was positively surprised to see the level of polish that went into the underlying game engine. The effort really paid off.".localize()
                ],
                Gameplay: ["In this type of game the core gameplay mechanics are really important and the developer has nailed it.".localize(), "I have rarely seen such responsive game controls. A true joy to play.".localize(), "The attention to detail to the core gameplay has really paid off.".localize()],
                "Story/Quests": ["This game doesn't just tell a story, no, it manages to draw you in so that you truly feel part of an adventure.".localize(), "A true achievement in interactive story telling, the characters and the captivating scenarios just stick in your mind.".localize(), "Whoever wrote the story of {1} will likely win a prize for it.".localize()],
                Dialogs: ["The character dialogues in this game are just oustanding. Rarely will you be so captivated in a conversation.".localize(), "The term dialogue tree really doesn't do {1} justice. This game has a dialogue forest... in a good way.".localize(),
                "A perfect example on how dialogues in a game can be so much more thrilling than in a movie or book. At every stage I felt like I really had choices and was driving the story.".localize()
                ],
                "Level Design": ["The progression in this story is just perfect. Just when you start to think things settle down something surprising will happen.".localize(), "The level design is both sophisticated and surprisingly intuitive. I never felt like I was guided through a level but I never ever got lost either. A true achievement.".localize(),
                "Simply iconic level designs, from start to finish.".localize()
                ],
                AI: ["The computer-controlled entities in this game are so incredibly convincing that I caught myself talking at them at times.".localize(), "Rarely manages a game to blend the A.I. so well into the game world that you just feel completely immersed.".localize(), "The game responds to the player in such a realistic fashion that it makes you sometimes forget that this is just a game.".localize()],
                "World Design": ["A wonderfully imaginative gameworld makes {1} a joy to discover. You will spend hours travelling through this world.".localize(),
                "This is world design at its best. Brave, imaginative and unapologetically following its incredible artistic vision.".localize(), "The attention to detail in the world design really sets this game apart from others in the genre.".localize()
                ],
                Graphic: ["Visually pleasing is an understatement. This game looks incredibly good.".localize(), "The art style in {1} blends so well with the general feeling of the game. A perfect match.".localize(), "Truly oustanding visual design is only one of the many reasons why {1} deserves your attention.".localize()],
                Sound: ["I rarely highlight the sound of a game instead of the many other noteworthy features but in {1} the sound design was truly awe-inspiring.".localize(), "The sound in this game gives you goose bumps. Very well designed.".localize(), "The game doesn't just look good it sounds incredibly good too. A true feast for players who appreciate high quality sound.".localize()]
            };
            return b.hasOwnProperty(a.id) ? b[a.id].pickRandom() : ""
        };
    a.getEarlySalesEvents = function (a, b) { };
    a.getPossibleEvents = function (b) {
        return a.getAllNotificationsObjects().filter(function (a) {
            return a &&
                a.trigger(GameManager.company, b)
        })
    };
    a.getHypedGameEvent = function (a, b) {
        var c = 0,
            d = b.flags.interviewHyped.decision,
            f = b.flags.interviewHyped.source,
            k = "In an exclusive interview a while ago, {0} from {1}".localize("followed by sentence fragment (hypgfr1 or hypgfr2)").format(a.staff[0].name, a.name),
            k = d ? k + " made very bold remarks about their then-in-development game {0} predicting that it will be \u00fcber successful.".localize("fragment: hypgfr1").format(b.title) : k + " was holding back when discussing their expections for {0}.".localize("fragment: hypgfr2").format(b.title),
            m;
        8 < b.score ? d ? (c = 0.5, m = "was spot on as the game has received very positive reviews.".localize("fragment")) : (c = 0.2, m = "was just humble as the game received critical acclaim.".localize("fragment")) : 6 < b.score ? d ? (c = -0.2, m = "should've been more careful as the final product doesn't match the hyped expectations.".localize("fragment")) : (c = 0.4, m = "was right to stay realistic as the game is good but nothing too our of the ordinary.".localize("fragment")) : d && (c = -0.5, m = "needs a lesson in how to be humble as the game received mediocre reviews.".localize("fragment"));
        k += "{n}" + "Now, that the game is out on the market the consensus is that {0} {1}".localize("{0} is player name, {1} is description").format(a.staff[0].name, m);
        k = 0 < c ? k + ("\n\n" + "Overall, this had a positive effect on sales.".localize()) : k + ("\n\n" + "Overall, this had a negative effect on sales.".localize());
        0 != c && a.notifications.push(new Notification({
            header: f.name,
            text: k,
            type: NotificationType.SalesReports,
            previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
        }));
        return c
    };
    var f = [{
        name: "Gaming World",
        author: "Jason Green"
    }, {
        name: "SMASH",
        author: "Roland Kean"
    }, {
        name: "Electric Games",
        author: "Arnie Kunkel"
    }, {
        name: "GamerPro",
        author: "Julian Rickstall"
    }, {
        name: "Game Informant",
        author: "Andrew McNara"
    }, {
        name: "GameNova",
        author: "J\u00f6rg Longer"
    }, {
        name: "Gamers",
        author: "Gary White"
    }, {
        name: "Gamers",
        author: "Kirton Gillen"
    }, {
        name: "Center",
        author: "Tom Mott"
    }, {
        name: "eGaming Check",
        author: "Christopher Rignall"
    }];
    f.forEach(function (a) {
        a.type = "magazine"
    });
    var d = [{
        name: "Planet GG",
        author: "Steve O'Connell"
    },
    {
        name: "Planet GG",
        author: "Jason Ray"
    }, {
        name: "Planet GG",
        author: "Steph Benhexen"
    }, {
        name: "Don't Cheat!",
        author: "Nicole Kolt"
    }, {
        name: "Y-Play",
        author: "Adam Hessler"
    }, {
        name: "Y-Play",
        author: "Morgan Net"
    }, {
        name: "Y-Play",
        author: "Jessie Nobot"
    }, {
        name: "Game Red",
        author: "Geoff Keyley"
    }
    ];
    d.forEach(function (a) {
        a.type = "TV show"
    });
    var k = [{
        name: "Rock, Paper, Shogun",
        author: "Alex Seer"
    }, {
        name: "Rock, Paper, Shogun",
        author: "James Rosenol"
    }, {
        name: "Gamedroid",
        author: "Vanier Gonza"
    }, {
        name: "Kottago",
        author: "Stephen Tort"
    },
    {
        name: "GameRye",
        author: "Patrick Toint"
    }
    ];
    k.forEach(function (a) {
        a.type = "blog"
    });
    var m = function (a) {
        a = a.getCurrentDate();
        10 <= a.year && f.concat(d);
        16 <= a.year && f.concat(k);
        return f
    };
    a.getPossibleSources = m
})();
var DecisionNotifications = {};
(function () {
    var a = DecisionNotifications;
    a.modNotifications = [];
    var b = function (a) {
        if (a.date && Math.floor(GameManager.company.currentWeek) < General.getWeekFromDateString(a.date, a.ignoreGameLengthModifier)) return !1;
        if (a.maxTriggers || a.date) {
            var b = GameManager.company.eventTriggerCounts[a.id],
                c = a.date ? 1 : a.maxTriggers;
            if (b && b >= c) return !1
        }
        return a.date || a.trigger && a.trigger(GameManager.company)
    },
        c = function (a) {
            var b = GameManager.company;
            b.eventTriggerCounts[a.id] ? b.eventTriggerCounts[a.id]++ : b.eventTriggerCounts[a.id] =
                1
        };
    a.getNewNotifications = function (l) {
        l = GameManager.company;
        var g = a.getAllNotificationsObjects().filter(function (a) {
            return !a.isRandomEvent && b(a)
        }).map(function (a) {
            c(a);
            return a.notification ? a.notification : a.getNotification(l)
        });
        0 == g.length && (g = a.getRandomEvents(l));
        return g
    };
    a.getRandomEvents = function (l) {
        var g = l.flags.nextRandomEvent && l.flags.nextRandomEvent <= GameManager.gameTime;
        l.flags.nextRandomEvent || (l.flags.nextRandomEvent = (48 + 24 * l.getRandom()) * GameManager.SECONDS_PER_WEEK * 1E3);
        if (g) {
            g = 36 + 48 *
                l.getRandom();
            l.flags.nextRandomEvent = GameManager.gameTime + g * GameManager.SECONDS_PER_WEEK * 1E3;
            g = a.getAllNotificationsObjects().filter(function (a) {
                return a.isRandomEvent && l.flags.lastRandomEventId != a.id && b(a)
            }).pickRandom();
            if (!g) return [];
            l.flags.lastRandomEventId = g.id;
            c(g);
            return [g.getNotification(l)]
        }
        return []
    };
    a.getAllNotificationsObjects = function () {
        var b = [],
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                void 0 != d.id && b.push(d)
            } b.addRange(a.modNotifications);
        return b
    };
    General.registerAsNotificationSource(a);
    a.hobbyComputerClub = {
        id: "hobbyComputerClub",
        isRandomEvent: !0,
        trigger: function (a) {
            return !a.flags.hobbyComputerClub && 1 === a.currentLevel && 1 < a.gameLog.length && a.isEarlierOrEqualThan(2)
        },
        getNotification: function (a) {
            a.flags.hobbyComputerClub = !0;
            return new Notification({
                header: "Invitation".localize("heading"),
                text: "Hi, I'm Gordon Hench the host of the local hobby computer club. I just discovered that your company is close-by. I'm a huge fan of {0} and would love for you to join our meetup this week!\nEagerly awaiting your reply.\nGordon".localize().format(a.gameLog.pickRandom().title),
                sourceId: "hobbyComputerClub",
                options: ["Sure".localize("decision action button"), "No time".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a ? (b.activeNotifications.addRangeAt(0, new Notification("Invitation".localize("heading"), "Thank you very much! I'm sure our members will love what you have to say.\nGordon".localize())), b.notifications.push(new Notification({
                header: "Computer Club".localize("heading"),
                text: "Hi I'm Frank More. We met at the Hobby Computer Club a week ago. Just wanted to say thanks for talking about your projects. I love your games and have told all my friends about them.".localize(),
                weeksUntilFired: 2
            })), a = 8 + 5 * b.getRandom(), b.currentGame ? b.currentGame.hypePoints += a : b.flags.nextGameHypeBonus += a) : (b.flags.secrecy++, b.activeNotifications.insertAt(0, new Notification("Invitation".localize("heading"), "Sorry to hear that you are busy.\nGordon".localize())))
        }
    };
    a.localNewsPaper = {
        id: "localNewsPaper",
        isRandomEvent: !0,
        trigger: function (a) {
            return !a.flags.localNewsPaper && 1 === a.currentLevel && 1 <= a.gameLog.length && a.isEarlierOrEqualThan(2, 7) && a.isGameProgressBetween(0.4, 0.9)
        },
        getNotification: function (a) {
            a.flags.localNewsPaper = !0;
            return new Notification({
                header: "Local News".localize("heading"),
                text: "Hi, I'm Caroline Richards from the local news. I've heard rumours that you are already working on your next game and would love to do an interview about this. Do you have some time?".localize(),
                options: ["Sure".localize("decision action button"), "No time".localize("decision action button")],
                sourceId: "localNewsPaper",
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png",
                type: NotificationType.IndustryNews
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) {
                b.activeNotifications.addRangeAt(0, (new Notification("Local News".localize("heading"), "Great!\n\n\n ... Thank you for your time.{n}The interview should be published soon.".localize())).split());
                b.flags.interviewHypePointsBonus = 5 + 8 * b.getRandom();
                a = b.name;
                var c = b.staff[0].name,
                    d = b.currentGame.flags.isNewCombination ? "not done".localize("localNewsPaperFragment") : "done".localize("localNewsPaperFragment");
                a = "{0}, a local start-up, is trying to make it big in the gaming industry. The company has already published {1} games and is working hard on their next.{n}In an interview founder {2} said that the next game is going to be a {3}/{4} game, something the company has {5} before. It's great to see small local companies enter exciting new industries. All the best of luck to {0}.".localize("{0} is company name, {1} nr. of games, {2} player name, {3} topic name, {4} genre name, {5} either not done/done (localNewsPaperFragment)").format(a,
                    b.gameLog.length, c, b.currentGame.topic.name, b.currentGame.genre.name, d);
                b.notifications.push(new Notification({
                    header: "Local News".localize("heading"),
                    text: a,
                    weeksUntilFired: 0.5,
                    sourceId: "localNewsActiveCallback",
                    previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png",
                    type: NotificationType.IndustryNews
                }))
            } else b.flags.secrecy++, b.activeNotifications.insertAt(0, new Notification("Local News".localize("heading"), "Sorry to bother you".localize()))
        }
    };
    a.localNewsActiveCallback = {
        id: "localNewsActiveCallback",
        trigger: function () {
            return !1
        },
        complete: function () {
            GameManager.company.currentGame && GameManager.company.flags.interviewHypePointsBonus && (GameManager.company.currentGame.hypePoints += GameManager.company.flags.interviewHypePointsBonus);
            GameManager.company.flags.interviewHypePointsBonus = 0
        }
    };
    a.firstMatureGame = {
        id: "firstAdultGame",
        trigger: function (a) {
            return a.isGameProgressBetween(0.35, 0.9) && "mature" === a.currentGame.targetAudience && !a.flags.firstMatureGame ? a.flags.firstMatureGame = !0 : !1
        },
        getNotification: function () {
            var a = "Media Enquiry".localize("heading"),
                b = "Hi, I'm Steve O'Connell, a reporter for Planet GG.\nWe've heard a rumour that your company is developing a game for mature audiences.\nWould you be willing to give an interview about this?".localize();
            return new Notification({
                sourceId: "firstAdultGame",
                header: a,
                text: b,
                options: ["Give interview".localize("decision action button"), "No comment".localize("decision action button")],
                weeksUntilFired: 2,
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png",
                type: NotificationType.IndustryNews
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = "Many industry experts say that sooner or later games with mature themes will become more common. We are curious to see how the market will react to these games.".localize();
            void 0 == b.flags.secrecy && (b.flags.secrecy = 0);
            0 === a ? (b.staff[0].adjustBoostRechargeProgress(0.3), b.staff[0].adjustEfficiency(0.3), b.flags.interviewHypePointsBonus = 5 + 12 * b.getRandom(), b.notifications.push(new Notification({
                header: "Industry News".localize("heading"),
                text: "Planet GG has recently published an interview with {0}. According to the interview the company is working on its first game targeted at mature players. {1}, owner and CEO of {0} said, 'We think that players are looking for more mature content in games and we are willing to take a risk to give it to them.'{n}".localize("{0} company name, {1} staff name").format(b.name, b.staff[0].name) + c,
                weeksUntilFired: 1,
                sourceId: "firstMatureGameInterviewActiveCallback",
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png",
                type: NotificationType.IndustryNews
            })), b.activeNotifications.addRangeAt(0, (new Notification("Media Enquiry".localize("heading"), "Great!\n\n\n ... Thank you for your time.{n}We will publish the interview next week.".localize())).split())) : (b.flags.secrecy++, b.flags.interviewHypePointsBonus = 2 + 4 * b.getRandom(), b.notifications.push(new Notification({
                header: "Industry News".localize("heading"),
                text: "There have been rumours circulating in the industry that {0} might be working on a game for mature audiences.".localize("{0} company name").format(b.name) +
                    c,
                weeksUntilFired: 3,
                sourceId: "firstMatureGameInterviewActiveCallback",
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png",
                type: NotificationType.IndustryNews
            })), b.activeNotifications.insertAt(0, new Notification("Media Enquiry".localize("heading"), "Okay. Thank you for your time.".localize())))
        }
    };
    a.firstMatureGameInterviewActiveCallback = {
        id: "firstMatureGameInterviewActiveCallback",
        trigger: function () {
            return !1
        },
        complete: function () {
            GameManager.company.currentGame && GameManager.company.flags.interviewHypePointsBonus &&
                (GameManager.company.currentGame.hypePoints += GameManager.company.flags.interviewHypePointsBonus);
            GameManager.company.flags.interviewHypePointsBonus = 0
        }
    };
    a.moveToLevel2 = {
        id: "moveToLevel2",
        trigger: function (a) {
            var b = GameManager.isIdle() && 1 === a.currentLevel && 0 < a.gameLog.length && 1E6 <= a.cash && (!a.flags.lastMoveUpLevelQ || a.flags.lastMoveUpLevelQ <= GameManager.gameTime - 2E4 * GameManager.SECONDS_PER_WEEK);
            return b && GameManager.ghg0() ? (a.flags.shownLvl2Move || (a.notifications.push(new Notification("Lite version",
                "You have amassed over {0} in cash!\nUsually I would suggest that you should grow your company by moving into a larger office but unfortunately there don't seem to be any larger offices available in the lite version.{n}You can still continue your game until year 4 to see how much cash you will end up with and how many fans you will gain.".localize("{0} cash amount").format(UI.getShortNumberString(a.cash)))), a.flags.shownLvl2Move = !0), !1) : b
        },
        getNotification: function (a) {
            a.flags.lastMoveUpLevelQ = GameManager.gameTime;
            a = "Congratulations! You have made quite a name for yourself and have saved up a lot of capital. If you want to grow the company further then moving into a new office is the next step. I've found the perfect office, situated in a technology park. Would you like to move your company to the next level?".localize();
            return new Notification({
                sourceId: "moveToLevel2",
                header: "New Office?".localize("heading"),
                text: a,
                options: ["Move (pay {0})".localize("decision action button; move as in move to new office").format(UI.getShortNumberString(15E4)),
                "Not yet".localize("decision action button")
                ]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a && (b.currentLevel = 2, b.adjustCash(-15E4, "New Office".localize()), VisualsManager.nextLevel(), Media.createLevel2Notifications(), Tutorial.level2(), GameManager.save(GameManager.company.slot + "L2"));
            ghg4.ghg5("move to level 2?", {
                decision: 0 === a
            })
        }
    };
    a.bailout = {
        id: "bailout",
        isRandomEvent: !1,
        trigger: function (a) {
            return !1
        },
        canUse: function (a) {
            return a.flags.bailoutAmount ? !1 : !a.flags.bailoutPaybackTime || a.flags.bailoutPaybackTime <
                GameManager.gameTime - 24E3 * GameManager.SECONDS_PER_WEEK
        },
        getNotification: function (a) {
            var b = Math.abs(a.cash),
                b = b * [1.5, 2, 3.2, 2.5][a.currentLevel - 1],
                b = 1E3 * Math.floor(b / 1E3);
            a.flags.bailoutAmount = b;
            a.flags.bailoutPaybackAmount = 1.8 * b;
            var c = UI.getLongNumberString(b),
                d = "It seems that you have some serious financial difficulties and your company is about to go bankrupt. After careful consideration we have decided to offer you a deal.".localize(),
                d = d + ("\n" + "We will give you {0} which should move you out of the danger zone but in return you have to commit to pay us {1} in a year's time.".localize());
            return new Notification({
                sourceId: "bailout",
                header: "Bank offer".localize("heading"),
                text: d.format(c, UI.getLongNumberString(a.flags.bailoutPaybackAmount)),
                options: ["Agree (receive {0})".localize("decision action button").format(UI.getShortNumberString(b)), "No (go bankrupt)".localize("decision action button")],
                image: "./images/notificationIcons/icon_notification_bancruptcy.png",
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) {
                var c = 1.8 * b.flags.bailoutAmount;
                b.adjustCash(b.flags.bailoutAmount, "Bailout".localize("heading"));
                b.flags.bailoutPaybackTime = GameManager.gameTime + 48E3 * GameManager.SECONDS_PER_WEEK;
                b.flags.bailouts = isNaN(b.flags.bailouts) ? 1 : b.flags.bailouts + 1;
                var d = new Notification("Bank".localize("heading"), "This is a reminder that we require you to pay back the agreed amount of {0} in three months' time.".localize().format(UI.getLongNumberString(c)), {
                    weeksUntilFired: 36,
                    previewImage: "./images/notificationIcons/icon_notification_bancruptcy.png"
                });
                d.weeksUntilFired = 36;
                b.notifications.push(d);
                d = new Notification("Bank".localize("heading"), "The amount of {0} has been deducted from your account.".localize().format(UI.getLongNumberString(c)), {
                    previewImage: "./images/notificationIcons/icon_notification_new_money_penalty.png"
                });
                d.adjustCash(-c, "Bailout payback".localize("heading"));
                d.setFlag("bailoutAmount", 0);
                d.setFlag("bailoutOffered", !1);
                d.weeksUntilFired = 48;
                d.type = NotificationType.AutoPopup;
                b.notifications.push(d)
            }
            b.flags.bailoutOffered = !0;
            ghg4.ghg5("bailout?", {
                decision: 0 === a,
                year: b.getCurrentDate().year
            });
            0 !== a && GameManager.checkGameOver()
        }
    };
    a.miniBailout = {
        id: "miniBailout",
        canUse: function (a) {
            return 0 < a.gameLog.length && !a.gameLog.last().flags.miniBailoutUsed
        },
        getNotification: function (a) {
            a.gameLog.last().flags.miniBailoutUsed = !0;
            var b = Math.abs(a.cash) + 2 * General.getMonthlyCosts(a);
            a.flags.miniBailoutAmount = b;
            a = "We see that you are in financial difficulties. Since you've just released your latest game {0}, we are willing to offer you a mini-credit to get you over this months' payments.\n\nWe will give you {1} to cover your costs and expect to be paid back the full amount, plus a small adminstration fee of {2} in two months time.".localize().format(a.gameLog.last().title,
                UI.getLongNumberString(b), UI.getShortNumberString(25E3));
            return new Notification({
                header: "Bank".localize("heading"),
                text: a,
                sourceId: "miniBailout",
                options: ["Agree (receive {0})".localize("decision action button").format(UI.getShortNumberString(b)), "No (go bankrupt)".localize("decision action button")],
                image: "./images/notificationIcons/icon_notification_bancruptcy.png",
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            if (0 === a) {
                a = GameManager.company;
                var b = a.flags.miniBailoutAmount;
                a.adjustCash(b,
                    "Bailout".localize("heading"));
                var c = new Notification("Bank".localize("heading"), "The amount of {0} has been deducted from your account.".localize().format(UI.getLongNumberString(-b - 25E3)), {
                    previewImage: "./images/notificationIcons/icon_notification_new_money_penalty.png"
                });
                c.weeksUntilFired = 8;
                c.adjustCash(-b - 25E3, "Bailout payback".localize("heading"));
                c.type = NotificationType.AutoPopup;
                a.notifications.push(c)
            } else GameManager.checkGameOver()
        }
    };
    a.inDevBailout = {
        id: "inDevBailout",
        canUse: function (a) {
            return !a.currentGame.flags.miniBailoutAmount
        },
        getNotification: function (a) {
            var b = Math.abs(a.cash) + General.getMonthlyCosts(a) * (General.getApproxWeeksToCompletion(a.currentGame) + 6);
            a.currentGame.flags.miniBailoutAmount = b;
            a = "We see that you are, again, in serious financial difficulties. We are willing to offer you a mini-credit to tie you over until your current game is on the market.\n\nWe will give you {1} to cover your costs and expect to be paid back the full amount, plus a fee of {2}, one month after the game is released.".localize().format(a.currentGame.title,
                UI.getLongNumberString(b), UI.getShortNumberString(0.05 * b));
            return new Notification({
                header: "Bank".localize("heading"),
                text: a,
                sourceId: "inDevBailout",
                options: ["Agree (receive {0})".localize("decision action button").format(UI.getShortNumberString(b)), "No (go bankrupt)".localize("decision action button")],
                image: "./images/notificationIcons/icon_notification_bancruptcy.png",
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            0 === a ? (a = GameManager.company, a.adjustCash(a.currentGame.flags.miniBailoutAmount,
                "Bailout".localize("heading"))) : GameManager.checkGameOver()
        },
        triggerPayBack: function (a, b) {
            var c = GameManager.company,
                d = a.flags.miniBailoutAmount,
                f = new Notification("Bank".localize("heading"), "The amount of {0} has been deducted from your account.".localize().format(UI.getLongNumberString(-d - 25E3)), {
                    previewImage: "./images/notificationIcons/icon_notification_new_money_penalty.png"
                });
            f.adjustCash(-d - 0.05 * d, "Bailout payback".localize("heading"));
            f.weeksUntilFired = b + 5;
            f.type = NotificationType.AutoPopup;
            c.notifications.push(f)
        }
    };
    a.gameOver = {
        id: "gameOver",
        trigger: function (a) {
            return !1
        },
        getNotification: function (a) {
            return new Notification({
                sourceId: "gameOver",
                header: "Game Over".localize("heading"),
                text: "This is the end of your journey.\n\nYou can either load a saved game, restart this level or start a new game.".localize(),
                options: ["Restart level".localize("decision action button"), "Start over".localize("decision action button")],
                image: "./images/notificationIcons/icon_notification_bancruptcy.png",
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a ? GameManager.reload(b.slot + "L" + b.currentLevel) : GameManager.startNewGame();
            ghg4.ghg5("Restart level?", {
                decision: 0 === a
            })
        }
    };
    a.moveToLevel3 = {
        id: "moveToLevel3",
        trigger: function (a) {
            return GameManager.isIdle() && 2 === a.currentLevel && 1 < a.staff.length && 5E5 <= a.cash && a.currentWeek >= General.getWeekFromDateString("11/6/2", !0) && (!a.flags.lastMoveUpLevelQ || a.flags.lastMoveUpLevelQ <= GameManager.gameTime - 2E4 * GameManager.SECONDS_PER_WEEK)
        },
        getNotification: function (a) {
            a.flags.lastMoveUpLevelQ =
                GameManager.gameTime;
            a = a.staff.skip(1).pickRandom();
            var b = "Boss, our office could really do with some renovation work and our computer systems are also out of date. Investing a little bit in a more modern office and upgraded computers would be a great.\nDo you want to renovate the office?".localize();
            return new Notification({
                sourceId: "moveToLevel3",
                header: a.name,
                text: b,
                options: ["Invest (pay {0})".localize("decision action button").format(UI.getShortNumberString(15E4)), "Not yet".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) {
                b.currentLevel = 3;
                b.adjustCash(-15E4, "New equipment".localize());
                VisualsManager.nextLevel();
                var c = new Notification("G3 Training".localize(), "Dear {0}!\nSince G3 has become the biggest meetup of game developers every year we have decided to use our name for the greater good. Starting today we offer different game development challenges throughout the year where game devs from around the world can compete with each other.{n}This will be a great way for game developers to learn something new. You are welcome to join in at any time. There are no prizes but it should be a great way to increase everyone's skills.\nThe G3 committee.".localize("{0} company name").format(b.name), {
                    previewImage: "./images/notificationIcons/icon_notification_convention.png",
                    weeksUntilFired: 2
                });
                c.setFlag("trainingV2Enabled", !0);
                b.notifications.push(c);
                GameManager.save(GameManager.company.slot + "L3")
            }
            ghg4.ghg5("move to level 3?", {
                decision: 0 === a
            })
        }
    };
    a.moveToLevel4 = {
        id: "moveToLevel4",
        trigger: function (a) {
            return GameManager.isIdle() && 3 === a.currentLevel && 3 < a.staff.length && 16E6 <= a.cash && a.currentWeek >= General.getWeekFromDateString("13/9/2", !0) && (!a.flags.lastMoveUpLevelQ || a.flags.lastMoveUpLevelQ <= GameManager.gameTime -
                2E4 * GameManager.SECONDS_PER_WEEK)
        },
        getNotification: function (a) {
            a.flags.lastMoveUpLevelQ = GameManager.gameTime;
            var b = a.staff[1];
            a = "Boss, {0} has grown well under your management. I think it is time to move the company out of this technology park and into a building worthy of our success.{n}I've seen the perfect building for our new headquarters.\nIt's not cheap but will allow us to grow even further. The new office also has space for additional expansions.\nDo you want to move?".localize("{0} company name").format(a.name);
            return new Notification({
                sourceId: "moveToLevel4",
                header: b.name,
                text: a,
                options: ["Move (pay {0})".localize("decision action button; move as in move to new office").format(UI.getShortNumberString(8E6)), "Not yet".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a && (b.currentLevel = 4, b.maxStaff = 7, b.adjustCash(-8E6, "New office".localize()), VisualsManager.nextLevel(), Media.createLevel4Notifications(), GameManager.save(GameManager.company.slot + "L4"));
            ghg4.ghg5("move to level 4?", {
                decision: 0 === a
            })
        }
    };
    a.unlockHwLab = {
        id: "unlockHwLab",
        trigger: function (a) {
            return 4 === a.currentLevel && a.flags.customHardwareResearched && !a.flags.hwLabUnlocked && a.staff.some(function (a) {
                return a.flags.technologySpecialist
            }) && (!a.flags.lastHwQuestion || a.flags.lastHwQuestion <= GameManager.gameTime - 2E4 * GameManager.SECONDS_PER_WEEK)
        },
        getNotification: function (a) {
            a.flags.lastHwQuestion = GameManager.gameTime;
            var b = "We can open our own hardware lab now.".localize(),
                c = a.staff.first(function (a) {
                    return a.flags.technologySpecialist
                });
            a.flags.selectedStaffName = c.name;
            return new Notification({
                header: c.name,
                text: b,
                sourceId: "unlockHwLab",
                options: ["Let's do it! (pay {0})".localize("decision action button").format(UI.getShortNumberString(5E6)), "Not yet".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a && (b.adjustCash(-5E6, "Hardware lab".localize()), b.flags.hwLabUnlocked = !0, GameManager.company.flags.hwBudget = 0, GameManager.company.flags.fractionalHwLabCosts = 0, b.notifications.push(new Notification("Hardware lab".localize(),
                "Our hardware lab is ready.".localize(), {
                type: NotificationType.AutoPopup
            })), Tutorial.hwLabReady(), GameManager.pause(!0), UI.fadeInTransitionOverlay(function () {
                VisualsManager.loadStage(!0);
                VisualsManager.refreshLabCrew();
                VisualsManager.updateProjectStatusCards();
                UI.fadeOutTransitionOverlay(function () {
                    GameManager.resume(!0)
                })
            }));
            ghg4.ghg5("unlocked hardware lab?", {
                decision: 0 === a
            })
        }
    };
    a.unlockrnDLab = {
        id: "unlockRnDLab",
        trigger: function (a) {
            return 4 === a.currentLevel && !a.flags.rndLabUnlocked && a.staff.some(function (a) {
                return a.flags.designSpecialist
            }) &&
                (!a.flags.lastRnDQuestion || a.flags.lastRnDQuestion <= GameManager.gameTime - 2E4 * GameManager.SECONDS_PER_WEEK)
        },
        getNotification: function (a) {
            a.flags.lastRnDQuestion = GameManager.gameTime;
            var b = "We can open our own research and development lab now.".localize(),
                c = a.staff.first(function (a) {
                    return a.flags.designSpecialist
                });
            a.flags.selectedStaffName = c.name;
            return new Notification({
                header: c.name,
                text: b,
                sourceId: "unlockRnDLab",
                options: ["Let's do it! (pay {0})".localize("decision action button").format(UI.getShortNumberString(25E5)),
                "Not yet".localize("decision action button")
                ]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a && (b.adjustCash(-25E5, "R&D lab".localize()), b.flags.rndLabUnlocked = !0, GameManager.company.flags.rndBudget = 0, GameManager.company.flags.fractionalRndLabCosts = 0, b.notifications.push(new Notification("R&D lab".localize(), "Our R&D  lab is ready.".localize(), {
                type: NotificationType.AutoPopup
            })), Tutorial.rndLabReady(), GameManager.pause(!0), UI.fadeInTransitionOverlay(function () {
                VisualsManager.loadStage(!0);
                VisualsManager.refreshLabCrew();
                VisualsManager.updateProjectStatusCards();
                UI.fadeOutTransitionOverlay(function () {
                    GameManager.resume(!0)
                })
            }));
            ghg4.ghg5("unlocked r&d lab?", {
                decision: 0 === a
            })
        }
    };
    a.fireEmployee = {
        id: "fireEmployee",
        trigger: function () {
            return !1
        },
        getNotification: function (a, b) {
            if (b) return a.flags.fireEmployeeId = b.id, new Notification({
                sourceId: "fireEmployee",
                header: "Fire employee?".localize("heading"),
                text: "Are you sure you want to fire {0}?".localize("{0} staff name").format(b.name),
                options: ["Yes".localize(),
                "No".localize()
                ],
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            0 === a && (a = GameManager.company.staff.first(function (a) {
                return a.id === GameManager.company.flags.fireEmployeeId
            })) && (a.currentResearch && GameManager.currentResearches.remove(a.currentResearch), a.fire(), GDT.fire(GameManager, GDT.eventKeys.gameplay.staffFired, {
                character: a
            }), ghg4.ghg5("fired staff"))
        }
    };
    a.securityUpgrade = {
        id: "securityUpgrade1",
        isRandomEvent: !0,
        trigger: function (a) {
            return 2 <= a.staff.length && !a.flags.securityUpgrades
        },
        getNotification: function (a) {
            var b =
                a.staff.skip(1).pickRandom();
            a.flags.securityUpgradeStaffRef = b.id;
            return new Notification({
                sourceId: "securityUpgrade1",
                header: b.name,
                text: "Hi Boss! I have a knack for security and I think we could really do with some security upgrades in our office.\nI have done some research and I think with an investment of {0} we would be a lot safer than we are now.\nWhat do you say?".localize("{0} amount").format(UI.getShortNumberString(5E4)),
                options: ["Yes (invest {0})".localize("decision action button").format(UI.getShortNumberString(5E4)),
                "No".localize()
                ]
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = "",
                d = b.staff.first(function (a) {
                    return a.id === b.flags.securityUpgradeStaffRef
                }),
                f = 0.3;
            1 == a && (f *= -1);
            d && (d.adjustEfficiency(f), c = d.name);
            0 === a ? (a = "Thanks Boss!\nI will get right to it.".localize(), b.flags.securityUpgrades = 1, b.cash -= 5E4, b.cashLog.push({
                amount: -5E4,
                label: "security upgrades"
            })) : a = "Okay, sorry that I bothered you.".localize();
            GameManager.company.activeNotifications.insertAt(0, new Notification({
                header: c,
                text: a
            }))
        }
    };
    var f =
        function () {
            var a = GameManager.company;
            return 0.3 < a.getRandom() ? a.name : d(a.name)
        },
        d = function (a) {
            if (3 < a.length) {
                var b = a[3];
                a = a.replaceAt(3, a[2]);
                a = a.replaceAt(2, b)
            }
            7 < a.length && (b = a[6], a = a.replaceAt(6, a[5]), a = a.replaceAt(5, b));
            return a
        };
    a.scam1 = {
        id: "scam1",
        isRandomEvent: !0,
        trigger: function (a) {
            return a.isLaterOrEqualThan(10) && !a.flags.scam1
        },
        getNotification: function (a) {
            a.flags.scam1 = !0;
            a = d(a.name);
            return new Notification({
                sourceId: "scam1",
                header: "Investment".localize("heading"),
                text: "Dear esteemed sir/madame.\nI'm financial advisor to CEO at WOMOBA OIL LIMITED in Nigeria. I'm writing because I know of your high repute and trustworthiness. Our CEO has authorzied me to invest {0} in {1}.{n}We have deposited the amount at a safe bank and will transfer this money to you but the bank requires confirmation from you. If you wish to receive the funds you must transfer a one-time verification payment of {2}. I trust in you.".localize("Note: this is a scam msg in game. immitate scammers language such as odd choice of words,  typos etc. {0} investAmount, {1} company name, {2} payment amount").format(UI.getShortNumberString(25E5),
                    a, UI.getShortNumberString(12E4)),
                options: ["Pay ({0})".localize("decision action button").format(UI.getShortNumberString(12E4)), "Decline".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a && (b.adjustCash(-12E4, "Gullibility Tax".localize("name of expense when player falls into the scam trap.")), b.staff.skip(1).forEach(function (a) {
                a.adjustEfficiency(-0.3)
            }));
            ghg4.ghg5("scam", {
                decision: 0 === a
            });
            b.notifications.push(new Notification("News".localize("heading"), "It appears that recently a few companies have fallen victim to Nigerian scammers.\nThe scammers often claimed to invest large sums of money into companies but required a sizable up-front payment to make the deal.{n}Those who were unwise enough to pay will not see their money again.\nPolice are investigating but seem helpless to stop these international scammers.".localize(),
                "OK".localize(), 5 + 4 * b.getRandom(), {
                type: NotificationType.Others,
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
            }))
        }
    };
    a.patchRequired = {
        id: "patchRequired",
        isRandomEvent: !0,
        trigger: function (a) {
            return 1 < a.currentLevel && 2 < a.gameLog.length && 100 < a.fans && a.gameLog.last().releaseWeek + 2 < a.currentWeek && a.isGameProgressBetween(0.1) && a.gameLog.last().releaseWeek + 30 > a.currentWeek && (!a.flags.patchData || a.flags.patchData.lastPatchEvent + 6E4 * GameManager.SECONDS_PER_WEEK < GameManager.gameTime)
        },
        getNotification: function (a) {
            a.flags.patchData || (a.flags.patchData = {});
            a.flags.patchData.lastPatchEvent = GameManager.gameTime;
            var b = a.gameLog.last(),
                c = Math.floor((0.05 * b.costs + 0.15 * b.costs * a.getRandom()) / 1E4);
            a.flags.patchData.gameName = b.title;
            a.flags.patchData.canEarnBonus = 5 > b.bugs;
            a.flags.patchData.patchCost = 1E4 * c + 1E4;
            a.flags.patchData.patchAvailableUntil = GameManager.gameTime + 3E3 * GameManager.SECONDS_PER_WEEK;
            c = Math.abs(Math.floor(0.1 * b.fansChanged + 0.2 * b.fansChanged * a.getRandom()));
            a.adjustFans(-c);
            a.flags.patchData.fansChange = c;
            c = new Notification({
                flags: {
                    isPatchNotification: !0
                },
                header: "News".localize("heading"),
                text: "The recent pleas for a patch for {0} seem to have been unanswered by {1}.\nMany fans have voiced their disappointment.".localize("{0} game title, {1} company name").format(b.title, a.name),
                weeksUntilFired: 7,
                type: NotificationType.Others,
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
            });
            a.notifications.push(c);
            return new Notification({
                header: "Bugs!".localize("heading"),
                text: "Oh no! It seems that {0} had quite a few undiscovered bugs when we released it.\nSome of our customers are having a bad time with this and they demand that we patch the game.{n}We could either spend the money and time to patch it or ignore their pleas. If you want to patch the game then {1} on a character and use the action menu to develop a patch but make sure that you don't wait for too long.".localize("{0} game title, {1} click/touch verb").format(b.title, Tutorial.getClickVerb()),
                type: NotificationType.Events,
                previewImage: "./images/notificationIcons/icon_notification_gamers_enquiry.png"
            })
        }
    };
    var k = "Administrative Expenses".localize("label of expense for illegal activity");
    a.industrialSpyTopic = {
        id: "industrialSpyTopic",
        isRandomEvent: !0,
        trigger: function (a) {
            return 0 < a.cash && a.isLaterOrEqualThan(4) && a.researchEnabled && 3 < Topics.topics.except(a.topics).length && (!a.flags.industrialSpyTopic || 2 > a.flags.industrialSpyTopic)
        },
        getNotification: function (a) {
            var b = Topics.topics.except(a.topics).pickRandom();
            a.flags.industrialSpyTopicRef =
                b.id;
            void 0 == a.flags.industrialSpyTopic ? a.flags.industrialSpyTopic = 1 : a.flags.industrialSpyTopic++;
            b = 5 + 60 * a.getRandom();
            b = 1E3 * Math.floor(b);
            a.flags.industrialSpyTopicAmount = b;
            a = "HgqNHQobJHLKypvBXJPe6+Eg1Z0Dccx Ra585nXkuRPR9AWS QZoIqQkcTm+qO7ahqZXq YL1P5qU39WUpJDrUgj 4jsQdncebVlj3oQhkAvC7z0ZH jz4yCn0h/dLlNzspebs6B7 C9QwqCY2KIizX3DRvA4 RIb1D99e6mC1mPLNlQ j9WenbAbWXGw8yK/AQeBO2G==" + "{n}This is a very special offer. Our agents have recently managed to 'borrow' some research information which might be of interest to you.\nIf you are interested then transfer {0} to the enclosed uplink location.\nWe'll contact you, Agent Blowfish".localize("use writing style of secret agent msg (in game it was decrypted). keep words 'blowfish' and 'uplink' in the message.").format(UI.getShortNumberString(b));
            return new Notification({
                sourceId: "industrialSpyTopic",
                header: "Proposition".localize("heading"),
                text: a,
                buttonText: "Decrypt Message".localize("decision action button"),
                options: ["Transfer ({0})".localize("decision action button; as in Transfer amount of money").format(UI.getShortNumberString(b)), "Decline".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) {
                var c = b.flags.industrialSpyTopicAmount,
                    d = Topics.topics.first(function (a) {
                        return a.id === b.flags.industrialSpyTopicRef
                    });
                b.adjustCash(-c, k);
                b.topics.push(d);
                c = "OLvsz3uLP6QeZEeL0XuUDw===={n}" + "Thank you for your business.".localize() + "\n\n" + "You have successfully researched {0}.".localize("{0} topic name").format(d.name);
                b.activeNotifications.addRangeAt(0, (new Notification({
                    header: "Transaction complete".localize("heading"),
                    text: c,
                    buttonText: ["Decrypt Message".localize("decision action button"), "OK".localize()]
                })).split());
                b.flags.evil++;
                ghg4.ghg5("evil")
            } else b.flags.secrecy && b.flags.secrecy++, b.flags.good++, ghg4.ghg5("good");
            ghg4.ghg5("accepted spy?", {
                decision: 0 === a
            })
        }
    };
    a.industrialSabotage = {
        id: "industrialSabotage",
        isRandomEvent: !0,
        trigger: function (a) {
            return 0 < a.cash && a.isLaterOrEqualThan(6) && (!a.flags.industrialSabotage || 2 > a.flags.industrialSabotage)
        },
        getNotification: function (a) {
            void 0 == a.flags.industrialSabotage ? a.flags.industrialSabotage = 1 : a.flags.industrialSabotage++;
            var b = 50 + 120 * a.getRandom(),
                b = 1E3 * Math.floor(b);
            a.flags.industrialSabotageAmount = b;
            a = "A9zbngUAfnu5aIo7ot2J LouBaOVUlVftN22gJaP2V3gS+N7 7vaRCtIb2TpaVPsh651s3sT6n gp21VgO2KCiFRtKhp/he OixN+XSB00RBXZhMrb1rYNWsZ+xRNBTZCljm/U QrUmzYrArkPNeusa65R+y TNXSWMZmWSSMv+mAokr0==={n}" +
                "This is a very special offer. Our agents have recently managed to gain access to some critical systems of one of your competitors.\nIf you want to play war games then transfer {0} to the enclosed location and we'll initiate sabotage.,\nAgent Blowfish".localize("use writing style of secret agent msg (in game it was decrypted). keep words 'war games' and 'blowfish' in the message.").format(UI.getShortNumberString(b));
            return new Notification({
                sourceId: "industrialSabotage",
                header: "Proposition".localize("heading"),
                text: a,
                buttonText: "Decrypt Message".localize("decision action button"),
                options: ["Sabotage ({0})".localize("decision action button").format(UI.getShortNumberString(b)), "Decline".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) {
                b.adjustCash(-b.flags.industrialSabotageAmount, k);
                var c = "0DeAZWaEfhmiEuRgn7WWdw===={n}" + "Thank you for your business.".localize();
                b.activeNotifications.addRangeAt(0, (new Notification({
                    header: "Transaction complete".localize("heading"),
                    text: c,
                    buttonText: ["Decrypt Message".localize("decision action button"), "OK".localize()]
                })).split());
                b.flags.evil++;
                ghg4.ghg5("evil");
                b.getRandom();
                b.notifications.push(new Notification({
                    header: "News".localize("heading"),
                    text: "In a statement the game development company {0} has said that they have been the victim of industrial sabotage. Unfortunately development on their current project has been severely affected.\nPolice are investigating.".localize("{0} is random company name").format(CompanyNames.pickRandom()),
                    weeksUntilFired: 3 + 4 * b.getRandom(),
                    type: NotificationType.Others,
                    previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
                }))
            } else b.flags.good++, ghg4.ghg5("good");
            ghg4.ghg5("sabotaged?", {
                decision: 0 === a
            })
        }
    };
    a.womenInTech = {
        id: "womenInTech",
        isRandomEvent: !0,
        trigger: function (a) {
            return !a.flags.womenInTech && 0 < a.cash && a.isLaterOrEqualThan(9) && 1 < a.staff.length
        },
        getNotification: function (a) {
            var b = a.staff.skip(1).pickRandom(),
                c = 4 + 7 * a.getRandom(),
                c = 1E4 * Math.floor(c);
            a.flags.womenInTechAmount =
                c;
            a.flags.womenInTech = !0;
            a = "Hi Boss! A friend of mine is greatly involved in an organization which aims to get more women into technology. They are looking for a sponsor and I thought that this would be a perfect opportunity for us.\nWould you like to help out?".localize();
            return new Notification({
                sourceId: "womenInTech",
                header: b.name,
                text: a,
                options: ["Sponsor (pay {0})".localize("decision action button").format(UI.getShortNumberString(c)), "Decline".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b =
                GameManager.company;
            if (0 === a) {
                b.adjustCash(-b.flags.womenInTechAmount, "Sponsorship".localize("heading"));
                b.staff.forEach(function (a) {
                    a.adjustBoostRechargeProgress(0.3);
                    a.adjustEfficiency(0.3)
                });
                var c = "We have got word that {0} has recently sponsored a highly praised move to get more women into technology roles.\n{1}, the CEO at {0} said, 'We would love to see more women in the game industry.'".localize("{0} company name, {1} staff name").format(b.name, b.staff[0].name),
                    c = new Notification({
                        header: "News".localize("heading"),
                        text: c,
                        weeksUntilFired: 2 + 6 * b.getRandom(),
                        type: NotificationType.Others,
                        previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
                    });
                b.flags.sponsoredWomenInTech = !0;
                b.notifications.push(c);
                b.flags.good++;
                ghg4.ghg5("good")
            } else b.staff.skip(1).forEach(function (a) {
                a.adjustEfficiency(-0.3)
            });
            ghg4.ghg5("womenInTech?", {
                decision: 0 === a
            })
        }
    };
    a.piracy1 = {
        id: "piracy1",
        isRandomEvent: !0,
        trigger: function (a) {
            return 1 < a.staff.length && a.isLaterOrEqualThan(5) && !a.flags.piracy1
        },
        getNotification: function (a) {
            var b =
                a.staff.skip(1).pickRandom(),
                c = a.gameLog.last();
            a.flags.piracy1 = c.title;
            a.flags.selectedStaffName = b.name;
            return new Notification({
                sourceId: "piracy1",
                header: b.name,
                text: "Boss, it seems that quite a few players use illegal copies of {0}.\nI've managed to identify some of them.\nWe could either sue them to defend our copyright or send them warnings to ask them to stop.\nWhat do you want to do?".localize("{0} game title").format(c.title),
                options: ["Sue them".localize("decision action button"), "Warn them".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            b.activeNotifications.insertAt(0, new Notification({
                header: b.flags.selectedStaffName,
                text: "Right away!".localize()
            }));
            var c = b.flags.piracy1,
                d = "{n}" + "Piracy is an increasingly big problem in the industry. Some companies invest a lot of money and effort to fight piracy while others argue that it's better to take a more relaxed approach and invest in better games instead.".localize(),
                f = 0 === a ? Math.floor(-(1E3 + 1300 * b.getRandom())) : Math.floor(100 + 300 * b.getRandom());
            if (0 === a) {
                b.flags.evil++;
                ghg4.ghg5("evil");
                var k = 1E4 * Math.floor(2 + 7 * b.getRandom()),
                    d = d + ("{n}" + "We have lost {0} fans but won {1} in legal claims.".localize("{0} nr of fans, {1} cash amount").format(UI.getLongNumberString(f), UI.getShortNumberString(k))),
                    c = new Notification({
                        header: "News".localize("heading"),
                        text: "In what some have called a drastic move, {0} has recently taken legal action against illegal players of their game {1}.".localize("{0} company name, {1} game name").format(b.name, c) + d,
                        weeksUntilFired: 2 +
                            3 * b.getRandom(),
                        type: NotificationType.Others,
                        previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
                    });
                c.adjustCash(k, "legal claims".localize("expense label"))
            } else b.flags.good++, ghg4.ghg5("good"), d += "{n}" + "We have gained {0} fans!".localize().format(UI.getLongNumberString(f)), c = new Notification({
                header: "News".localize("heading"),
                text: "{0} has recently sent warnings to several players using illegal copies of their game {1}.".localize("{0} company name, {1} game title").format(b.name,
                    c) + d,
                weeksUntilFired: 2 + 3 * b.getRandom(),
                type: NotificationType.Others,
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
            });
            c.adjustFans(f);
            b.notifications.push(c);
            ghg4.ghg5("piracy?", {
                decision: 0 === a
            })
        }
    };
    a.infringment = {
        id: "infringment",
        isRandomEvent: !0,
        trigger: function (a) {
            return void 0 === a.flags.infringment && a.gameLog.some(function (a) {
                return 6 < a.score
            }) && 1 < a.staff.length
        },
        getNotification: function (a) {
            a.flags.infringment = !0;
            var b = a.staff.skip(1).pickRandom(),
                c = a.gameLog.filter(function (a) {
                    return 6 <
                        a.score
                }).pickRandom();
            a.flags.selectedStaffName = b.name;
            a.flags.infringmentGameName = c.title;
            return new Notification({
                sourceId: "infringment",
                header: b.name,
                text: "Boss, I've discovered that some really dedicated fans of {0} have created a fan game using a lot of the material from our game.\nThey don't make any money with it and just seem to do it for fellow fans. Our legal advisors strongly suggest that we shouldn't allow this to go on. What do you want to do?".localize("{0} game title").format(c.title),
                options: ["Stop them".localize("decision action button"), "Let them be".localize("decision action button")]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a ? (b.flags.infringment = !0, b.activeNotifications.insertAt(0, new Notification({
                header: b.flags.selectedStaffName,
                text: "Right away!".localize()
            })), b.flags.evil++, ghg4.ghg5("evil"), b.notifications.push(new Notification({
                sourceId: "infringmentCallback",
                header: "Project disbanded".localize("heading"),
                text: "Hi, I'm Denise Ried the main developer of the {0} fan game. I just want to tell you that upon your recent 'request' from your legal department my project has shut down.{n}I poured a lot of effort into this and have always loved your company but I guarantee you that I shall not 'bother' nor support you ever again.".localize("{0} game name").format(b.flags.infringmentGameName),
                weeksUntilFired: 2 + 3 * b.getRandom()
            }))) : (b.flags.infringment = !1, b.flags.good++, ghg4.ghg5("good"), b.notifications.push(new Notification({
                sourceId: "infringmentCallback",
                header: "Thank you".localize("heading"),
                text: "Hi, I'm Denise Ried the main developer of the {0} fan game. I've recently been informed that your legal department has advised you to stop us and I just wanted to say that I'm very grateful that you didn't.{n}{1} is the best company in the world and I'm glad I can be part of the fan community.".localize("{0} game name, {1} company name").format(b.flags.infringmentGameName,
                    b.name),
                weeksUntilFired: 2 + 3 * b.getRandom()
            })));
            ghg4.ghg5("infringement?", {
                decision: 0 === a
            })
        }
    };
    a.infringmentCallback = {
        id: "infringmentCallback",
        complete: function () {
            var a = GameManager.company,
                b = a.flags.infringment,
                c = a.fans,
                c = Math.floor(0.05 * c + 0.05 * c * a.getRandom());
            b && (c *= -1);
            a.adjustFans(c);
            0 < c ? a.activeNotifications.insertAt(0, new Notification("Fans".localize("heading"), "We have gained {0} fans!".localize().format(UI.getLongNumberString(c)), ":-)")) : 0 > c && a.activeNotifications.insertAt(0, new Notification("Fans".localize("heading"),
                "We have lost {0} fans!".localize().format(UI.getLongNumberString(c)), ":-("))
        }
    };
    a.codingContest = {
        id: "codingContest",
        isRandomEvent: !0,
        trigger: function (a) {
            return 2 > a.currentLevel || a.flags.codingContest || 4 >= a.staff.length || 15E4 >= a.cash || null != a.currentGame || a.staff.some(function (a) {
                return a.state === CharacterState.Researching || a.state === CharacterState.Training || a.state === CharacterState.Vacation
            }) ? !1 : !0
        },
        getNotification: function (a) {
            var b = a.staff.skip(1).pickRandom();
            a.flags.selectedStaffName = b.name;
            return new Notification({
                sourceId: "codingContest",
                header: b.name,
                text: "Boss, we would like to stage an internal coding contest! I think we could all learn a lot by doing this. As an incentive we would need a prize for the winner ({0}). We agreed that the prize will go to charity. Should we do it?".localize().format(UI.getShortNumberString(9E4)),
                options: ["Yes".localize(), "No".localize()]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) b.flags.codingContest = !0, b.activeNotifications.insertAt(0, new Notification({
                header: b.flags.selectedStaffName,
                text: "Great! We will start right away!".localize()
            })), b.staff.forEach(function (a) {
                GameManager.uiSettings.selectedChar = a.id;
                GameManager.codingContest(Training.codingContest, "training", a)
            });
            else {
                for (a = 0; a < b.staff.length; a++) b.staff[a].name === b.flags.selectedStaffName && b.staff[a].adjustEfficiency(-0.4);
                b.activeNotifications.insertAt(0, new Notification({
                    header: b.flags.selectedStaffName,
                    text: "Okay, maybe another time...".localize(),
                    buttonText: "OK".localize()
                }))
            }
        }
    };
    a.codingContestParticipationFinished =
        function () {
            for (var a = 0; a < GameManager.company.staff.length; a++)
                if (GameManager.company.staff[a].currentResearch && "codingContest" === GameManager.company.staff[a].currentResearch.id) return !1;
            a = GameManager.company.staff.slice().sort(function (a, b) {
                return a.flags.codingContestDone - b.flags.codingContestDone
            }).first();
            GameManager.company.notifications.push(new Notification({
                header: "Coding Contest".localize("heading"),
                text: "Thanks for agreeing to the coding contest. It was a big success! {0} won the contest and is lucky to distribute the prize of {1} to charity. We have also learned a lot in the process.".localize().format(a.name,
                    UI.getShortNumberString(9E4)),
                weeksUntilFired: 0.6
            }))
        };
    a.creditCard = {
        id: "creditCard",
        isRandomEvent: !0,
        trigger: function (a) {
            return 5E4 < a.cash && !a.flags.creditCardStolen && 1 < a.staff.length && 2 <= a.flags.evil
        },
        getNotification: function (a) {
            a.flags.creditCardStolen = !0;
            a.flags.creditCardDamages = 0.007 * a.cash;
            var b = a.staff.skip(1).pickRandom();
            return new Notification({
                sourceId: "creditCard",
                header: b.name,
                text: "Boss, someone seems to have stolen our credit card information and used it to buy a lot of things in the past three months. Unfortunately we have lost {0}!".localize().format(UI.getLongNumberString(a.flags.creditCardDamages)),
                buttonText: ":-(",
                weeksUntilFired: 12,
                previewImage: "./images/notificationIcons/icon_notification_new_money_penalty.png",
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            GameManager.company.flags.creditCardSwitched = !0
        }
    };
    var m = "EPA".localize("heading for 'Environmental Protection Agency' story");
    a.solarPower = {
        id: "solarPower",
        isRandomEvent: !0,
        trigger: function (a) {
            return !a.flags.solarPowerInstalled && 2 < a.currentLevel && a.isLaterOrEqualThan(12) && 4E5 < a.cash
        },
        getNotification: function (a) {
            return new Notification({
                sourceId: "solarPower",
                header: m,
                text: "I am an employee of the Environmental Protection Agency and have an offer for you. Your company has a high electrical footprint right now. If you would install solar panels you could decrease your footprint and save money in the long run. We would sponsor 50% of the costs which brings your investment to {0}!\nWould you like to install it?".localize("headings for this story need to use acronym consistent with the Environmental Protection Agency translation. look for 'heading for 'Environmental Protection Agency' story'").format(UI.getShortNumberString(2E5)),
                options: ["Install (pay {0})".localize("decision action button").format(UI.getShortNumberString(2E5)), "Ignore offer".localize("decision action button")]
            })
        },
        complete: function (a) {
            0 === a ? (a = GameManager.company, a.flags.good++, ghg4.ghg5("good"), a.flags.solarPowerInstalled = !0, a.adjustCash(-2E5, "solar panels".localize("heading")), a.activeNotifications.insertAt(0, new Notification(m, "Great, it was a wise decision installing a solar collector!".localize(), ":-)")), a.notifications.push(new Notification("Industry News".localize("heading"),
                "{0} has recently installed solar panels in their offices. While the video game and software industries are one of the cleanest industries on earth they do eat up a lot of electricity so installing solar panels can really make an impact.".localize("{0} company name").format(a.name), "OK".localize(), 4, {
                type: NotificationType.IndustryNews,
                previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
            }))) : (a = GameManager.company, a.flags.evil++, ghg4.ghg5("evil"), a.activeNotifications.insertAt(0,
                new Notification(m, "Sorry to hear that you are declining our offer".localize(), "OK".localize())))
        }
    };
    a.airCon = {
        id: "airCon1",
        isRandomEvent: !0,
        trigger: function (a) {
            return (2 === a.currentLevel || 3 === a.currentLevel) && 3 < a.staff.length && !a.flags.airCon1 && 2E5 <= a.cash
        },
        getNotification: function (a) {
            a.flags.airCon1 = !0;
            a = a.staff.skip(1).pickRandom();
            return new Notification({
                sourceId: "airCon1",
                header: a.name,
                text: "Boss, it's way too hot in our office and the heat is starting to impact on our work. I've researched and found an air conditioner which would be perfect for us. It costs {0}.\nShould we order it?".localize().format(UI.getShortNumberString(9E4)),
                options: ["Yes (pay {0})".localize("decision action button").format(UI.getShortNumberString(9E4)), "No".localize()]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a ? (b.adjustCash(-9E4, "air conditioner".localize("heading")), b.flags.airConInstalled = !0, VisualsManager.installAirCon()) : (b.staff.forEach(function (a) {
                a.adjustEfficiency(-0.3)
            }), b.flags.airCon1Declined = 15 + 15 * b.getRandom() + b.currentWeek);
            ghg4.ghg5("aircon1?", {
                decision: 0 === a
            })
        }
    };
    a.airCon1Callback = {
        id: "airCon1Callback",
        isRandomEvent: !1,
        trigger: function (a) {
            return !a.flags.airConInstalled &&
                (2 === a.currentLevel || 3 === a.currentLevel) && 3 < a.staff.length && !a.flags.airCon2 && 2E5 <= a.cash && void 0 != a.flags.airCon1Declined && a.flags.airCon1Declined < a.currentWeek
        },
        getNotification: function (a) {
            a = a.staff.skip(1).pickRandom();
            return new Notification({
                sourceId: "airCon1Callback",
                header: a.name,
                text: "Boss, the heat is becoming a serious problem. Just yesterday my mouse melted and my keyboard is covered in sweat. Not a good environment to work in. We really need an air conditioner.{n}Unfortunately the previous offer has expired and we would need to pay {0}.\nShould we order it?".localize("try to make the reason lightweight and fun").format(UI.getShortNumberString(18E4)),
                options: ["Yes (pay {0})".localize("decision action button").format(UI.getShortNumberString(18E4)), "No".localize()],
                weeksUntilFired: 0
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a ? (b.adjustCash(-18E4, "air conditioner".localize("heading")), b.flags.airConInstalled = !0, VisualsManager.installAirCon()) : (b.staff.forEach(function (a) {
                a.adjustEfficiency(-0.4)
            }), b.flags.airCon2 = !0, b.flags.airCon2Declined = 15 + 15 * b.getRandom() + b.currentWeek);
            ghg4.ghg5("aircon2?", {
                decision: 0 === a
            })
        }
    };
    a.airCon2Callback = {
        id: "airCon2Callback",
        isRandomEvent: !1,
        trigger: function (a) {
            return !a.flags.airConInstalled && (2 === a.currentLevel || 3 === a.currentLevel) && 3 < a.staff.length && 2E5 <= a.cash && void 0 != a.flags.airCon2Declined && a.flags.airCon2Declined < a.currentWeek
        },
        getNotification: function (a) {
            a = a.staff.skip(1).pickRandom();
            return new Notification({
                sourceId: "airCon2Callback",
                header: a.name,
                text: "Boss, We've had enough and ordered the air conditioner ourselves. Thanks for nothing.".localize(),
                weeksUntilFired: 0
            })
        },
        complete: function (a) {
            a = GameManager.company;
            a.flags.evil -= 2;
            ghg4.ghg5("evil");
            a.flags.airConInstalled = !0;
            VisualsManager.installAirCon();
            ghg4.ghg5("aircon3")
        }
    };
    a.productPlacement = {
        id: "productPlacement1",
        isRandomEvent: !0,
        trigger: function (a) {
            return 3 < a.currentLevel && !a.flags.productPlacement1
        },
        getNotification: function (a) {
            a.flags.productPlacement1 = !0;
            a = "Dave Johnson here, CEO of Departure Science. Some of our test subjects were recently exposed to some of your games and, surprisingly, they didn't go totally insane. They seemed to quite enjoy the experience in fact. Anyway, I have some products that need advertising and could do with some product placement.{n}My marketing boys tell me that making you this offer is a bad idea but that's exactly why I want it. I'll pay you {0} to place some of our fine red painted exploding barrels in one of your games. What'd ya say?".localize("see Portal 2 reference hint").format(UI.getShortNumberString(2E5));
            return new Notification({
                sourceId: "productPlacement1",
                header: "Product Placement".localize("heading"),
                text: a,
                options: ["Sure!".localize("decision action button"), "No".localize()]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 === a && (b.adjustCash(2E5, "Departure Science".localize("see Portal 2 reference hint")), b.activeNotifications.push(new Notification("Message".localize("heading"), "Excellent! Good to hear you have some spirit in you. One more thing: Don't feel like you have to go and rush those barrels into your next game. I'd rather have you place them in a game where they fit well.\nJohnson out.".localize("see Portal 2 reference hint"))),
                b.flags.productPlacement1Active = !0, b.specialItems.push(Research.ProductPlacement1));
            ghg4.ghg5("productPlacement?", {
                decision: 0 === a
            })
        }
    };
    a.productPlacement1Finished = {
        trigger: function (a) {
            return a.flags.productPlacement1Active && !a.flags.productPlacement1Finished && 0 < a.gameLog.length && -1 != a.gameLog.last().features.indexOf(Research.ProductPlacement1)
        },
        id: "productPlacement1Finished",
        getNotification: function (a) {
            a.flags.productPlacement1Finished = !0;
            a.specialItems.remove(Research.ProductPlacement1);
            var b = a.gameLog.last().genre ===
                GameGenre.Action,
                c = "Dave Johnson here! Listen! You did well placing our beloved barrels in {0} - my marketing eggheads say profits are increasing which means more science for us. Well done. Here, have this cake.".localize("see Portal 2 reference hint");
            b ? a.flags.hadCake = !0 : c = "Dave Johnson here! Listen! Those red exploding barrels I'd asked you to place in your game. Well, seems that folks didn't really enjoy them as much in {0}. Oh well, was worth a try.".localize("see Portal 2 reference hint");
            c =
                c.format(a.gameLog.last().title);
            a = new Notification("Message".localize("heading"), c, "OK".localize(), 4);
            b && (a.image = "./images/misc/cake.png", a.activateAchievement(Achievements.cake));
            ghg4.ghg5("product placement finished", {
                success: b
            });
            return a
        }
    };
    a.announceConsole = {
        id: "announceConsole",
        trigger: function (a) {
            return !1
        },
        getNotification: function (a) {
            a = GameManager.currentHwProject;
            a = "Boss, I think it's time to announce the {0} to the world. Should we go ahead and make a press release?".localize("{0} custom console name").format(a.name);
            return new Notification({
                sourceId: "announceConsole",
                header: "Hardware lab".localize(),
                text: a,
                options: ["Announce".localize("decision action button"), "Don't announce".localize("decision action button")],
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) {
                var c = GameManager.currentHwProject,
                    d;
                if (1 === GameManager.currentHwProject.version) d = "In a surprise announcement {0}, a company known for games such as {1} has revealed that they have been working on their very own game console. The console which is called {2} is said to compete with the high end consoles from companies like Mirconoft and Vonny.{n}We are eager to see how much of an impact this new console will have.".localize().format(b.name,
                    b.getBestSeller().title, c.name);
                else {
                    d = b.licencedPlatforms.last(function (a) {
                        return a.isCustom
                    });
                    var f = 0.7 > d.successFactor ? " which had only limited commercial success.".localize("consoleAnnouncementPastSuccessFragment") : 1 >= d.successFactor ? "which had moderate commercial success.".localize("consoleAnnouncementPastSuccessFragment") : "which had a sizeable following and really made an impact in the market.".localize("consoleAnnouncementPastSuccessFragment");
                    d = "{0} has announced that they are working on a new game console. The console named {1} is planned as a successor to their earlier contender, the {2} ".localize("{2} is consoleAnnouncementPastSuccessFragment").format(b.name,
                        c.name, d.name) + f
                }
                b.activeNotifications.insertAt(0, new Notification("Hardware lab".localize(), "I will get right to it.".localize()));
                d = new Notification({
                    header: "Industry News".localize("heading"),
                    text: d,
                    image: GameManager.currentHwProject.iconUri,
                    weeksUntilFired: 0.7
                });
                c.announced = !0;
                b.notifications.push(d)
            } else b.activeNotifications.insertAt(0, new Notification("Hardware lab".localize(), "Okay, you are the boss.".localize()));
            ghg4.ghg5("announce console?", {
                decision: 0 === a
            })
        }
    };
    a.endOfGame1 = {
        id: "endOfGame1",
        trigger: function () {
            return !1
        },
        isRandom: !1,
        getNotification: function (a) {
            a = DataStore.remoteSettings.supporterPacksEnabled;
            var b = "Congratulations on finishing Game Dev Tycoon and thank you for playing! If you enjoyed our little game then please consider rating the game on the Store. You can also send us some feedback".localize("gameFinishMsg, either stops with a . or continues with fragment"),
                b = a ? b + " and, if you really loved the game, you can (if you wish) vote with your wallet to support us even further.".localize("fragment of gameFinishMsg") :
                    b + ".";
            return new Notification({
                sourceId: "endOfGame1",
                header: "Thank you".localize("heading"),
                text: b,
                image: "images/greenheart.png",
                options: ["See options...".localize("decision action button"), "No, thanks".localize("decision action button")],
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = new Notification("Continue game".localize("heading"), "If you wish you can continue playing but please note that there will be no more platform releases or other story elements.".localize(), {
                    type: NotificationType.AutoPopup
                });
            0 === a && b.notifications.push(new Notification("{SupportGreenheartGames}"));
            b.notifications.push(c);
            ghg4.ghg5("show support options?", {
                decision: 0 === a
            })
        }
    };
    a.endOfGameNative = {
        id: "endOfGameNative",
        trigger: function () {
            return !1
        },
        isRandom: !1,
        getNotification: function (a) {
            a = "Congratulations on finishing Game Dev Tycoon and thank you for playing! If you enjoyed our little game then please consider telling your friends about it.".localize() + "{n}" + "If you wish you can continue playing but please note that there will be no more platform releases or other story elements.".localize();
            return new Notification({
                header: "Thank you".localize("heading"),
                text: a,
                image: "images/greenheart.png",
                type: NotificationType.AutoPopup
            })
        }
    };
    a.gameinterview = {
        id: "gameinterview",
        trigger: function (a) {
            return a.isGameProgressBetween(0.2, 0.9) && 1E4 < a.fans && (!a.flags.lastInterviewEvent || a.flags.lastInterviewEvent < GameManager.gameTime - 8E4 * GameManager.SECONDS_PER_WEEK)
        },
        isRandom: !0,
        getNotification: function (a) {
            if (a.currentGame) {
                var b = SalesEvents.getPossibleSources(a).pickRandom();
                a.flags.lastInterviewEvent = GameManager.gameTime;
                a.flags.interviewSource = b;
                a = "Hi, this is {0} from {1}. I got word that {2} is working on a new game.\nWould you be willing to share some information on your current game project and do an interview about it?".localize().format(b.author, b.name, a.name);
                return new Notification({
                    sourceId: "gameinterview",
                    header: "Media Enquiry".localize("heading"),
                    text: a,
                    options: ["Agree".localize("decision action button"), "Decline".localize("decision action button")],
                    previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
                })
            }
        },
        complete: function (b) {
            var c = GameManager.company,
                d = c.flags.interviewSource,
                f = c.currentGame;
            if (0 === b) c.flags.secrecy--, c.activeNotifications.addRangeAt(0, a.gameInterviewQuestions.getNotification(c, f).split());
            else if (c.flags.secrecy++, 0.5 <= c.getRandom()) {
                var k = c.gameLog.slice(-1)[0],
                    m = "{0} has declined a request for an interview about their current project.\n".localize().format(c.name);
                b = 0;
                7 <= k.score ? (m += "Given that their most recent game {0} enjoyed universal success we simply cannot wait for them to unveil their new project!".localize().format(k.title),
                    b += 20 + 20 * c.getRandom()) : 5 < k.score ? (m += "With {0} only receiving a lukewarm reception, fans are sure to be expecting better from them and we are curious about their next title.".localize().format(k.title), b += 10 + 10 * c.getRandom()) : (m += "Hopefully the company can do better than last time. We don't need another {0}.".localize().format(k.title), b += 5 + 5 * c.getRandom());
                b *= General.getGameSizePointsFactor(f);
                2 < c.flags.secrecy && (b *= 2);
                b = Math.round(b);
                d = new Notification({
                    header: d.name,
                    text: m,
                    weeksUntilFired: 0.2 +
                        0.2 * c.getRandom(),
                    previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
                });
                d.adjustHype(b);
                c.notifications.push(d)
            }
        }
    };
    a.gameInterviewQuestions = {
        id: "gameInterviewQuestions",
        getNotification: function (b, c) {
            return [a.gameInterviewQ1, a.gameInterviewQ2].pickRandom().getNotification(b, c)
        }
    };
    a.gameInterviewQ1 = {
        id: "gameInterviewQ1",
        getNotification: function (a, b) {
            var c = a.flags.interviewSource;
            return new Notification({
                sourceId: "gameInterviewQ1",
                header: c.name,
                text: "{0}:\nWhat is your expectation regarding the success of {1}? Do you think that the game will be well received?".localize().format(c.author,
                    b.title),
                options: ["Hype game!".localize(), "Be modest.".localize()],
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = b.currentGame;
            0 === a ? (c.flags.interviewHyped = {
                decision: !0,
                source: $.extend({}, b.flags.interviewSource)
            }, c.hypePoints += Math.round(60 + 40 * b.getRandom())) : c.hypePoints += Math.round(20 + 20 * b.getRandom());
            b.notifications.push(new Notification(b.flags.interviewSource.name, "Thank you for your time.".localize(), {
                type: NotificationType.AutoPopup
            }))
        }
    };
    a.gameInterviewQ2 = {
        id: "gameInterviewQ2",
        getNotification: function (a, b) {
            var c = a.flags.interviewSource,
                d = Missions.DevMissions.filter(function (a) {
                    return 0.9 <= Missions.getGenreWeighting(a, b)
                }).pickRandom(),
                f = Missions.DevMissions.filter(function (a) {
                    return 0.9 > Missions.getGenreWeighting(a, b)
                }).pickRandom(),
                k = 0.5 < a.getRandom(),
                m;
            k ? (m = d.name, d = f.name) : (m = f.name, d = d.name);
            f = "{0}:\nMany of our readers are curious about what decisions go into making a video game and how companies prioritize development areas.\nYour new game is a {1}/{2} game, can you tell us whether such a game would usually receive more focus on {3} or on {4}?".localize().format(c.author,
                b.topic.name, b.getGenreDisplayName(), m, d);
            b.flags.gameInterviewQ2 = {
                option1: m,
                option2: d,
                correctOption: k ? 0 : 1,
                gameName: b.title,
                gameDescr: b.topic.name + "/" + b.getGenreDisplayName()
            };
            return new Notification({
                sourceId: "gameInterviewQ2",
                header: c.name,
                text: f,
                options: ["More on {0}".localize().format(m), "More on {0}".localize().format(d), "I don't know".localize()],
                type: NotificationType.AutoPopup
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = b.currentGame,
                d = b.flags.interviewSource,
                k = c.flags.gameInterviewQ2,
                m = "In a recent interview with {0} we discussed their upcoming {1} game and asked company founder {2} how different development areas are prioritized.\nIn the interview {2} said that {3} is of particular importance for such a game ".localize("continues with fragment").format(f(), k.gameDescr, b.staff[0].name, 2 == a ? "they are still experimenting what area".localize("sentence fragment") : 0 === a ? k.option1 : k.option2),
                m = (c = a === c.flags.gameInterviewQ2.correctOption) ? m + "and it seems that other industry professionals agree with this. Every game development project has limited resources so it's very important to use the time most effectively.".localize("sentence fragment") :
                    m + "but it seems that other industry professionals disagree with that point of view saying that {0} is usually more important for this type of game.".localize("sentence fragment").format(0 === k.correctOption ? k.option1 : k.option2),
                k = new Notification({
                    header: d.name,
                    text: m,
                    weeksUntilFired: 0.6 + 0.2 * b.getRandom(),
                    previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
                });
            2 != a && (c && k.adjustFans(Math.floor(200 + 1E3 * b.getRandom())), k.adjustHype(Math.round(5 + 20 * b.getRandom() * c ? 2 : 0)));
            b.notifications.push(new Notification(d.name, "Thank you for your time.".localize(), {
                type: NotificationType.AutoPopup
            }));
            b.notifications.push(k)
        }
    };
    a.OldEngine = {
        id: "oldEngine",
        isRandomEvent: !0,
        trigger: function (a) {
            return a.engines && a.engines.some(function (a) {
                return !a.isSold && a.releaseWeek + 240 < GameManager.company.currentWeek
            }) && a.isLaterOrEqualThan(10, 3, 4)
        },
        getNotification: function (a) {
            var b = a.engines.filter(function (a) {
                return !a.isSold && a.releaseWeek + 240 < GameManager.company.currentWeek
            }).pickRandom();
            a.flags.engineEventId =
                b.id;
            a = "Boss, a small number of dedicated fans have asked that we release the source code to one of our older game engines '{0}'. Doing so would surely satisfy these fans but given that we worked hard on the engine, we could also sell licenses for it and make some money. Alternatively, we could simply refuse their request completely.\nWhat would you like to do?".localize().format(b.name);
            return new Notification({
                sourceId: "oldEngine",
                header: "Old Engine".localize(),
                text: a,
                options: ["Give it away".localize(),
                "Sell it".localize(), "Refuse".localize()
                ]
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = b.engines.first(function (a) {
                    return a.id == b.flags.engineEventId
                });
            if (c) {
                c.isSold = 2 != a;
                var d = (0.02 * b.fans + 0.05 * b.fans * b.getRandom()).clamp(1E3, 2E4),
                    f = -2E3 + -3E3 * b.getRandom(),
                    k, m;
                switch (a) {
                    case 0:
                        k = "give away".localize();
                        m = "positive".localize();
                        0.5 < b.getRandom() && (d *= 2, m = "outstanding".localize());
                        break;
                    case 1:
                        k = "sell".localize();
                        f = 2 * d + 1.5 * d * b.getRandom();
                        d /= 5;
                        m = "mixed".localize();
                        0.5 < b.getRandom() && (m = "negative".localize(),
                            d *= -1);
                        0.5 < b.getRandom() && (f *= 3);
                        break;
                    case 2:
                        0.3 > b.getRandom() && (-1 * d, a = new Notification({
                            header: "Old Engine".localize(),
                            text: "Boss, it seems the fans who requested that we open source {0} were particularly upset with our decision and have caused quite a negative stirr. We've lost {1} fans.".localize().format(c.name, UI.getShortNumberString(d)),
                            weeksUntilFired: 0.2 + 0.3 * b.getRandom()
                        }), a.adjustFans(Math.round(d)), b.notifications.push(a));
                        return
                }
                d = Math.round(d);
                f = Math.round(f);
                msg = "Boss, our recent decision to {0} our engine {1} was met with {2} responses from fans. Overall we {3} fans and {4}.".localize().format(k,
                    c.name, m, (0 < d ? "gained".localize() : "lost".localize()) + " " + UI.getShortNumberString(d), (0 > f ? "it cost us {0}".localize() : "we made {0}".localize("{0} is amount of money")).format(UI.getShortNumberString(f)));
                a = new Notification({
                    header: "Old Engine".localize(),
                    text: msg,
                    weeksUntilFired: 0.3 + 0.9 * b.getRandom()
                });
                a.adjustCash(f);
                a.adjustFans(d);
                b.notifications.push(a)
            }
        }
    };
    a.patentTroll = {
        id: "patentTroll",
        isRandomEvent: !0,
        trigger: function (a) {
            return 2E6 <= a.cash && a.isLaterOrEqualThan(10) && a.engines && 3 <= a.engines.length &&
                a.engines.last().releaseWeek > a.currentWeek - 20 && a.engines.last().releaseWeek < a.currentWeek - 1 && (!a.flags.lastPatentTroll || !a.flags.lastPatentTroll.disabled && a.flags.lastPatentTroll.week + 192 < a.currentWeek)
        },
        getNotification: function (a) {
            a.flags.lastPatentTroll = {
                week: a.currentWeek,
                count: 0
            };
            var b = a.engines.last(),
                c = a.cash / 8,
                d = 1E5 + 2E5 * a.getRandom();
            c < d && (c = d);
            c = Math.floor(c);
            a.flags.lastPatentTroll.cost = c;
            d = 30 + 10 * Math.floor(6 * (a.fans / 15E4).clamp(0, 1));
            a.flags.lastPatentTroll.fanChance = d;
            a = "We've just received a letter from a company called 'All Your IP Belongs To US' and they say that our engine {0} is infringing on one of their patents.{n}They 'graciously' offer a license to their patent for {1} and are willing to give us a 50% discount if we just pay them without fighting them in court. We could pay this and hope that they won't bother us again or we could refuse and try to resolve this in front of the courts. Alternatively we might be able to rally our fans and publicly fight them.\nHow would you like to proceed?".localize().format(b.name,
                UI.getShortNumberString(c));
            return new Notification({
                sourceId: "patentTroll",
                header: "Legal Department".localize(),
                text: a,
                options: ["Pay for license ({0})".localize().format(UI.getShortNumberString(Math.floor(c / 2))), "Go to court. [~{0}% chance]".localize().format(50), "Rally fans! [~{0}% chance]".localize().format(d)]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            if (0 === a) b.adjustCash(-Math.floor(b.flags.lastPatentTroll.cost / 2));
            else {
                var c = 0,
                    d = 0,
                    f = !1,
                    k = Math.round(b.flags.lastPatentTroll.cost / 20);
                if (1 === a) {
                    var m = 0.5 < b.getRandom();
                    a = m ? "The court dismissed the patent infringement claims made against us stating that the claim was ridiculous. All costs were paid by the suing party.".localize() : "Unfortunately, it seems that the patent infringement case was decided against us. We have to pay the full amount of {0} as well as the court costs of {1}. This is ridiculous.".localize().format(UI.getShortNumberString(b.flags.lastPatentTroll.cost), UI.getShortNumberString(k));
                    m || (c -= b.flags.lastPatentTroll.cost +
                        k)
                } else m = b.flags.lastPatentTroll.fanChance, a = "We rallied our fans to publicly fight against All Your IP Belongs To US".localize("continues with fragment"), b.getRandom() < m / 100 ? (d = Math.floor(1E4 + 1E4 * b.getRandom()), a += " and fight we did! We not only caused them to retract their claims but we also won {0} fans and the public's admiration. I doubt we will hear from those patent trolls again.".localize("sentence fragment").format(UI.getLongNumberString(d)), f = !0) : (a += " but it seems that our efforts were fruitless. Seems we still have to pay {0} and the court costs of {1}. Maybe next time we'll have more luck.".localize("sentence fragment").format(UI.getShortNumberString(b.flags.lastPatentTroll.cost),
                    UI.getShortNumberString(k)), c = -b.flags.lastPatentTroll.cost - k);
                k = new Notification({
                    header: "Legal Department".localize(),
                    text: a,
                    weeksUntilFired: 2 + 2 * b.getRandom()
                });
                c && k.adjustCash(c, "All Your IP Belongs To US".localize());
                d && k.adjustFans(d);
                b.notifications.push(k)
            }
            b.flags.lastPatentTroll.count ? b.flags.lastPatentTroll.count++ : b.flags.lastPatentTroll.count = 1;
            if (3 == b.flags.lastPatentTroll || f) b.flags.lastPatentTroll.disabled = !0
        }
    };
    a.buySharesOffer = {
        id: "buySharesOffer",
        isRandomEvent: !1,
        trigger: function (a) {
            return a.flags.pirateMode &&
                (!a.flags.lastShareOffer || a.flags.lastShareOffer + 24E3 * GameManager.SECONDS_PER_WEEK <= GameManager.gameTime) && 1E5 > a.cash && 70 > a.flags.sharesSold && 2 < a.gameLog.length
        },
        getNotification: function (a, b) {
            a.flags.lastShareOffer = GameManager.gameTime;
            var c = a.gameLog.filter(function (a) {
                return 0 < a.costs
            }).average(function (a) {
                return a.costs
            });
            a.flags.shareOffer1 = 3.5 * c;
            a.flags.shareOffer2 = 5 * c;
            c = "WE believe in your business portfolio and would like to aquire shares in {0}.\nWILL you consider this opportunity?\nOWN {1} in cash immediately, if you sign over 20% of your business.\n\nYOU can also take {2} in cash for 30% of your business.".localize("capitalized words should result in somethign similar to WE OWN YOU").format(a.name,
                UI.getShortNumberString(a.flags.shareOffer1), UI.getShortNumberString(a.flags.shareOffer2));
            0 < a.flags.sharesSold && (c = "WE believe in your business portfolio and would like to aquire shares in {0} of which we already own {1}%.\nWILL you consider this opportunity?\nOWN {2} in cash immediately, if you sign over 20% of your business.\n\nYOU can also take {3} in cash for 30% of your business.".localize("capitalized words should result in somethign similar to WE OWN YOU").format(a.name, a.flags.sharesSold,
                UI.getShortNumberString(a.flags.shareOffer1), UI.getShortNumberString(a.flags.shareOffer2)));
            var d = 2 + 4 * a.getRandom();
            Tutorial.pirateShareOffers(d);
            return new Notification({
                sourceId: "buySharesOffer",
                header: "Share Offer".localize("heading"),
                text: c,
                options: ["Sell 20% for {0}".localize("keep short").format(UI.getShortNumberString(a.flags.shareOffer1)), "Sell 30% for {0}".localize("keep short").format(UI.getShortNumberString(a.flags.shareOffer2)), "Decline".localize()]
            })
        },
        complete: function (a) {
            var b = GameManager.company;
            0 == a ? (b.adjustCash(b.flags.shareOffer1, "Share Offer".localize("heading")), b.flags.sharesSold += 20) : 1 == a && (b.adjustCash(b.flags.shareOffer2, "Share Offer".localize("heading")), b.flags.sharesSold += 30)
        }
    };
    a.buyBackShares = {
        id: "buyBackShares",
        isRandomEvent: !1,
        trigger: function (a) {
            if (!a.flags.pirateMode || !a.flags.sharesSold || !a.isLaterOrEqualThan((void 0 === a.flags.lastBuyBackOfferYear ? 0 : a.flags.lastBuyBackOfferYear) + 2, 12, 2)) return !1;
            var b = a.gameLog.filter(function (a) {
                return 0 < a.costs
            }).average(function (a) {
                return a.costs
            });
            return a.cash > 5 * b
        },
        getNotification: function (a, b) {
            a.flags.lastBuyBackOfferYear = a.getCurrentDate().year;
            var c = a.gameLog.filter(function (a) {
                return 0 < a.costs
            }).average(function (a) {
                return a.costs
            });
            a.flags.shareOffer1 = 3.8 * -c;
            a.flags.shareOffer2 = 5.3 * -c;
            var c = "We are currently a {0}% share holder in {1}. We are willing to offer you a chance to buy back some shares.".localize().format(a.flags.sharesSold, a.name),
                c = c + "\n",
                d = 20;
            20 > a.flags.sharesSold && (d = a.flags.sharesSold, a.flags.shareOffer1 = a.flags.shareOffer1 /
                20 * d);
            var f = ["Buy {0}% back for {1}".localize("keep short").format(d, UI.getShortNumberString(-1 * a.flags.shareOffer1)), "Buy 30% back for {0}".localize("keep short").format(UI.getShortNumberString(-1 * a.flags.shareOffer2)), "Decline".localize()],
                c = c + ("\n" + "Buy back {0}% for {1}".localize("keep short").format(d, UI.getShortNumberString(-1 * a.flags.shareOffer1)));
            30 <= a.flags.sharesSold ? c += "\n" + "Buy back 30% for {0}".localize("keep short").format(UI.getShortNumberString(-1 * a.flags.shareOffer2)) : (f.splice(1,
                1), a.flags.shareOffer2 = 0);
            return new Notification({
                sourceId: "buyBackShares",
                header: "Share Offer".localize("heading"),
                text: c,
                options: f
            })
        },
        complete: function (a) {
            var b = GameManager.company,
                c = 0 == b.flags.shareOffer2;
            0 == a ? (b.adjustCash(b.flags.shareOffer1, "Share Offer".localize("heading")), b.flags.sharesSold = (b.flags.sharesSold - 20).clamp(0, 100)) : 1 != a || c || (b.adjustCash(b.flags.shareOffer2, "Share Offer".localize("heading")), b.flags.sharesSold -= 30)
        }
    }
})();
var ProjectContracts = {};
(function () {
    var a = ProjectContracts;
    a.getAvailable = function (b, c) {
        for (var d = [], g = a.getAllContracts().filter(function (a) {
            return (!a.type || a.type == c) && a.isAvailable && a.isAvailable(b)
        }), f = 0; f < g.length; f++) {
            var k = g[f].getContract(b);
            k instanceof Array ? d.addRange(k) : d.push(k)
        }
        return d
    };
    a.getAllContracts = function () {
        var b = [],
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                void 0 != d.id && b.push(d)
            } return b
    };
    var b = [{
        name: "Logo Animation".localize("heading"),
        description: "Create an animation for an existing logo.".localize(),
        tF: 1,
        dF: 2.5,
        rF: 1.5
    }, {
        name: "Character Design".localize("heading"),
        description: "Design some game characters.".localize(),
        tF: 1,
        dF: 4.5,
        rF: 1.5
    }, {
        name: "Playtest".localize("heading"),
        description: "Help to playtest a game.".localize(),
        tF: 1,
        dF: 1,
        rF: 1.5
    }, {
        name: "Game Backdrops".localize("heading"),
        description: "Design some simple background graphics for a game.".localize(),
        tF: 1,
        dF: 2,
        rF: 1.5
    }, {
        name: "Setup Computers".localize("heading"),
        description: "Install Mirconoft BOSS on computers".localize(),
        tF: 2,
        dF: 0.4
    }, {
        name: "Debug program".localize("heading"),
        description: "Help debugging a convoluted BASE program.".localize(),
        tF: 2,
        dF: 0.2
    }, {
        name: "Spritesheet Software".localize("heading"),
        description: "Our staff needs to be taught how to use these modern technologies.".localize(),
        tF: 3,
        dF: 2
    }, {
        name: "Library Software".localize("heading"),
        description: "Develop a simple library management system".localize(),
        tF: 5,
        dF: 1
    }],
        c = [{
            name: "Usability Study".localize("heading"),
            description: "Perform a detailed usability study.".localize(),
            tF: 5,
            dF: 6.5
        }, {
            name: "Review Game Concept".localize("heading"),
            description: "Review a game concept using your expertise.".localize(),
            tF: 3,
            dF: 8,
            rF: 1.5
        }, {
            name: "Game Art".localize("heading"),
            description: "Help out on a project with some game art".localize(),
            tF: 5,
            dF: 6,
            rF: 1.5
        }, {
            name: "Clean up database".localize("heading"),
            description: "Should one table really have 200 columns? Probably not.".localize(),
            tF: 5,
            dF: 1
        }, {
            name: "Accounting Software".localize("heading"),
            description: "Develop a simple accounting software. Are those ever simple?".localize(),
            tF: 5,
            dF: 1
        }, {
            name: "Time Tracking".localize("heading"),
            description: "Design and develop a time tracking system.".localize(),
            tF: 3,
            dF: 1
        }, {
            name: "Design a board game".localize("heading"),
            description: "Let's see how your skills translate to traditional games.".localize(),
            dF: 5,
            tF: 0.2,
            rF: 2
        }, {
            name: "Horoscope Generator".localize("heading"),
            description: "Making up horoscopes is hard work. We want it automated.".localize(),
            dF: 5,
            tF: 1
        }, {
            name: "Character Dialogues".localize("heading"),
            description: "Improve our character dialogues.".localize(),
            dF: 5,
            tF: 1,
            rF: 1.4
        }, {
            name: "Futuristic Application".localize("heading"),
            description: "We need an application that looks futuristic for a movie.".localize(),
            dF: 3,
            tF: 2,
            rF: 1.5
        }, {
            name: "Vacuum Robot".localize("heading"),
            description: "Create a revolutionary AI for a vacuum robot".localize(),
            tF: 2,
            dF: 1.4
        }, {
            name: "Website".localize("heading"),
            description: "We just heard of this thing called internet. We want to have one.".localize(),
            tF: 2,
            dF: 1.3
        }],
        f = [{
            name: "Game Port".localize("heading"),
            description: "Port a game to a different platform.".localize(),
            tF: 3.2,
            dF: 1.7,
            rF: 1.2
        }, {
            name: "Cut Scenes".localize("heading"),
            description: "Deliver professional cut scenes for a game.".localize(),
            tF: 1,
            dF: 1,
            rF: 1.5
        }, {
            name: "Space Shuttle".localize("heading"),
            description: "Deliver part of the space shuttle control software.".localize(),
            tF: 3,
            dF: 2
        }, {
            name: "Alien Search".localize("heading"),
            description: "Optimize our search for alien life forms using advanced AI techniques.".localize(),
            tF: 3,
            dF: 1.8,
            rF: 1.3
        }, {
            name: "Movies".localize("heading"),
            description: "We need your skills in our latest blockbuster production.".localize(),
            tF: 1,
            dF: 1,
            rF: 1.5
        }];
    a.genericContracts = {
        id: "genericContracts",
        type: "generic",
        isAvailable: function (a) {
            return !0
        },
        getContract: function (a) {
            var d = n(a, "small"),
                g = k(d),
                g = new MersenneTwister(g),
                d = m(d, b, "small", 4);
            a.flags.mediumContractsEnabled && d.addRange(m(n(a, "medium"), c, "medium", 3));
            a.flags.largeContractsEnabled && d.addRange(m(n(a, "large"), f, "large", 2));
            return d.shuffle(g).filter(function (a) {
                return !a.skip
            })
        },
        complete: function (a, b, c) {
            n(a, c.size).contractsDone.push(c.index);
            b ? a.notifications.push(l(c)) : a.notifications.push(g(c));
            GameManager.contractFinished(b)
        }
    };
    var d = function (a) {
        a.seed = Math.floor(65535 * Math.random());
        a.expireBy = GameManager.gameTime + 24E3 * GameManager.SECONDS_PER_WEEK;
        a.contractsDone = []
    },
        k = function (a) {
            a.seed ? a.expireBy <= GameManager.gameTime && (d(a), a.initialSettings = !1) : (d(a), a.initialSettings = !0);
            return a.seed
        },
        m = function (a, b, c, d) {
            var g = k(a),
                g = new MersenneTwister(g),
                f = [];
            b = b.slice();
            d = r(g, d);
            a.initialSettings && (d = Math.max(1, d));
            for (var l = 0; l < d && 0 < b.length; l++) {
                var m = b.pickRandom(g);
                b.remove(m);
                var n = c,
                    p = g,
                    s = p.random();
                0.8 < p.random() && (s += p.random());
                var C = 11;
                "medium" == n ? C = 30 : "large" == n && (C = 100);
                12 == C && 2 < GameManager.company.staff.length && (C += 6);
                var J = GameManager.company.getCurrentDate().year / 25,
                    C = C + C * J,
                    J = C + C * s,
                    C = J / (m.dF + m.tF),
                    s = C * m.dF,
                    C = C * m.tF,
                    s = s + 0.2 * s * p.random() * p.randomSign(),
                    C = C + 0.2 * C * p.random() * p.randomSign(),
                    s = Math.floor(s),
                    C = Math.floor(C),
                    J = 1E3 * J,
                    J = J / 1E3,
                    J = 1E3 * Math.floor(J),
                    K = Math.floor(3 + 7 * p.random());
                "small" === n && (K = Math.floor(3 + 3 * p.random()));
                p = 0.2 * J + 0.3 * J * p.random();
                p /= 1E3;
                p = 1E3 * Math.floor(p);
                m = contract = {
                    name: m.name,
                    description: m.description,
                    requiredD: s,
                    requiredT: C,
                    spawnedD: 0,
                    spawnedT: 0,
                    payment: J,
                    penalty: -p,
                    weeksToFinish: K,
                    rF: m.rF,
                    isGeneric: !0,
                    size: n
                };
                m.id = "genericContracts";
                m.index = l;
                a.contractsDone && -1 != a.contractsDone.indexOf(l) && (m.skip = !0);
                f.push(m)
            }
            return f
        },
        l = function (a) {
            var b = ["Thank you for taking care of this for us.".localize(), "Well done.".localize(), "Just what we wanted.".localize(), "Excellent work.".localize(), "Thank you for the quick work.".localize(), "Would hire again.".localize(),
            "Nice job.".localize(), "Success!".localize()
            ],
                b = new Notification({
                    header: "Contract Successful".localize("heading"),
                    text: b.pickRandom() + "\n" + "We will transfer {0} to your account.".localize().format(UI.getShortNumberString(a.payment)),
                    weeksUntilFired: 0.2,
                    previewImage: "./images/notificationIcons/icon_notification_new_money.png"
                });
            b.adjustCash(a.payment, "contract payment".localize("heading"));
            return b
        },
        g = function (a) {
            var b = ["This is very disappointing.".localize(), "You didn't complete the contract on time".localize(),
            "Hope you can make it next time.".localize(), "Seems like this was too big of a job for you.".localize(), "Unfortunately the deadline is here.".localize()
            ];
            a = a.penalty;
            b = new Notification({
                header: "Contract Failed".localize("heading"),
                text: b.pickRandom() + "\n" + "A penalty of {0} will be applied to your account.".localize().format(UI.getShortNumberString(a)),
                weeksUntilFired: 0.2,
                previewImage: "./images/notificationIcons/icon_notification_new_money_penalty.png",
                type: NotificationType.AutoPopup
            });
            b.adjustCash(a,
                "contract penalty".localize("heading"));
            return b
        },
        n = function (a, b) {
            var c = "contracts" + b,
                d = a.flags[c];
            d || (d = {
                id: c
            }, a.flags[c] = d);
            return d
        };
    a.publisherContracts = {
        id: "publisherContracts",
        type: "gameContract",
        isAvailable: function (a) {
            return !0
        },
        getContract: function (a) {
            var b = n(a, "publisher");
            return s(a, b, 5).filter(function (a) {
                return !a.skip
            })
        },
        complete: function (a, b, c) {
            var d;
            d = b ? ["The game meets the required ratings. We are looking forward to future business.".localize()].pickRandom() : ["The game doesn't live up to expectations.\nAs per contract a penalty will be applied to your account.".localize()].pickRandom();
            d = new Notification({
                header: "Publisher".localize("heading"),
                text: c.publisher + ": " + d,
                weeksUntilFired: 2 + 2 * a.getRandom(),
                previewImage: "./images/notificationIcons/icon_notification_new_money.png"
            });
            b || (d.adjustCash(-c.penalty, "contract penalty".localize("heading")), d.previewImage = "./images/notificationIcons/icon_notification_new_money_penalty.png", d.type = NotificationType.AutoPopup);
            a.notifications.push(d)
        }
    };
    var r = function (a, b) {
        var c = a.random();
        return Math.max(b - 1, Math.floor(c * b))
    },
        p = [{
            id: "ActiveVisionaries",
            name: "Active Visionaries"
        }, {
            id: "ea",
            name: "Electronic Mass Productions"
        }, {
            id: "RockvilleSoftworks",
            name: "Rockville Softworks"
        }, {
            id: "BlueBitGames",
            name: "Blue Bit Games"
        }, {
            id: "CapeCom",
            name: "CapeCom"
        }, {
            id: "Codemeisters",
            name: "Codemeisters"
        }, {
            id: "DeepPlatinum",
            name: "Deep Platinum"
        }, {
            id: "InfroGames",
            name: "InfroGames"
        }, {
            id: "LoWoodProductions",
            name: "LoWood Productions"
        }, {
            id: "TGQ",
            name: "TGQ"
        }, {
            id: "\u00dcberSoft",
            name: "\u00dcberSoft"
        }],
        s = function (a, b, c) {
            var d = [],
                g = b.seed,
                f = new MersenneTwister(k(b));
            b.seed !=
                g && (b.topics = void 0, b.researchedTopics = void 0, b.excludes = void 0, b.platforms = void 0);
            var l, m;
            if (b.topics && b.researchedTopics && b.platforms) {
                g = b.topics.map(function (a) {
                    return Topics.topics.first(function (b) {
                        return b.id === a
                    })
                });
                l = b.researchedTopics.map(function (a) {
                    return Topics.topics.first(function (b) {
                        return b.id === a
                    })
                });
                var n = Platforms.getPlatforms(a, !0);
                m = b.platforms.map(function (a) {
                    return n.first(function (b) {
                        return b.id === a
                    })
                })
            } else {
                g = a.topics.slice();
                g.addRange(General.getTopicsAvailableForResearch(a));
                b.topics = g.map(function (a) {
                    return a.id
                });
                l = a.topics.map(function (a) {
                    return a.id
                });
                b.researchedTopics = l;
                m = Platforms.getPlatformsOnMarket(a).filter(function (a) {
                    return !a.isCustom && Platforms.doesPlatformSupportGameSize(a, "medium")
                });
                b.platforms = m.map(function (a) {
                    return a.id
                });
                b.excludes = [];
                var s = a.gameLog.last();
                s && b.excludes.push({
                    genre: s.genre.id,
                    topic: s.topic.id
                })
            }
            s = b.excludes.slice();
            c = r(f, c);
            b.initialSettings && (c = Math.max(1, c));
            b = ["medium"];
            a.canDevelopLargeGames() && b.addRange(["large", "large", "large"]);
            for (var F = ["young", "everyone", "mature"], C = {
                medium: 15E4,
                large: 75E4
            }, J = 0; J < c; J++) {
                var K = 0,
                    L = void 0,
                    H = void 0;
                0.7 >= f.random() && (L = General.getAvailableGenres(a).pickRandom(f), K += 0.1);
                if (0.7 >= f.random()) {
                    do
                        if (H = 0.7 >= f.random() ? g.except(l).pickRandom(f) : g.pickRandom(f), void 0 === H) break; while (s.some(function (a) {
                            return (void 0 === L || a.genre === L.id) && a.topic === H.id
                        }));
                    void 0 != H && (K += 0.1)
                } (L || H) && s.push({
                    genre: L ? L.id : void 0,
                    topic: H ? H.id : void 0
                });
                var G = void 0;
                0.7 >= f.random() && (G = m.pickRandom(f));
                var I = void 0;
                a.canSetTargetAudience() && 0.2 >= f.random() && (I = F.pickRandom(f));
                var K = K + 0.8 * f.random(),
                    N = 4 + Math.floor(5 * K),
                    O;
                do O = b.pickRandom(f); while (void 0 != G && !Platforms.doesPlatformSupportGameSize(G, O));
                var M = N / 10 * C[O],
                    M = M / 5E3,
                    M = 5E3 * Math.max(1, Math.floor(M)),
                    R = 1.2 * M + 1.8 * M * f.random(),
                    R = R / 5E3,
                    R = 5E3 * Math.floor(R),
                    S;
                S = G && G.company && 0.2 >= f.random() ? G.company : p.pickRandom(f).name;
                var K = Math.floor(7 + 8 * K) / 100,
                    Q = H ? H.name : "Any Topic".localize(),
                    Q = Q + (" / " + (L ? L.name : "Any Genre".localize()));
                !G || Platforms.getPlatformsOnMarket(a).first(function (a) {
                    return a.id ===
                        G.id
                }) ? d.push({
                    id: "publisherContracts",
                    refNumber: Math.floor(65535 * Math.random()),
                    type: "gameContract",
                    name: Q,
                    description: "Publisher: {0}".localize().format(S),
                    publisher: S,
                    topic: H ? H.id : H,
                    genre: L ? L.id : L,
                    platform: G ? G.id : void 0,
                    gameSize: O,
                    gameAudience: I,
                    minScore: N,
                    payment: M,
                    penalty: R,
                    royaltyRate: K
                }) : c++
            }
            return d
        }
})();