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