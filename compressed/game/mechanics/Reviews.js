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