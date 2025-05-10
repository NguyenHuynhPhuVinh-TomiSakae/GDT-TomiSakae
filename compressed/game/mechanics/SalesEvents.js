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