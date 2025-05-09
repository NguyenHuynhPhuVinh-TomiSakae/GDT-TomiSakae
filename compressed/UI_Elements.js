var FlippingCounter = {};
(function () {
    var a = FlippingCounter;
    a.panel;
    a.img0 = new Image;
    a.img1 = new Image;
    a.img2 = new Image;
    a.img3 = new Image;
    a.img4 = new Image;
    a.img5 = new Image;
    a.img6 = new Image;
    a.img7 = new Image;
    a.img8 = new Image;
    a.img9 = new Image;
    a.img10 = new Image;
    a._activeUITweens;
    a.loaderImageAmount = 10;
    a.numberBitmapsArr = [];
    a.rectUp = new createjs.Rectangle(0, 0, 104, 91);
    a.rectDown = new createjs.Rectangle(0, 91, 104, 91);
    a.getAllImages = function () {
        return "./images/superb/counter/0.png ./images/superb/counter/1.png ./images/superb/counter/2.png ./images/superb/counter/3.png ./images/superb/counter/4.png ./images/superb/counter/5.png ./images/superb/counter/6.png ./images/superb/counter/7.png ./images/superb/counter/8.png ./images/superb/counter/9.png ./images/superb/counter/panel.png".split(" ")
    };
    var b;
    a.init = function () {
        b || (b = !0, this.img0.onload = this.handleImageLoad, this.img1.onload = this.handleImageLoad, this.img2.onload = this.handleImageLoad, this.img3.onload = this.handleImageLoad, this.img4.onload = this.handleImageLoad, this.img5.onload = this.handleImageLoad, this.img6.onload = this.handleImageLoad, this.img7.onload = this.handleImageLoad, this.img8.onload = this.handleImageLoad, this.img9.onload = this.handleImageLoad, this.img10.onload = this.handleImageLoad, this.img0.onerror = f, this.img1.onerror = f, this.img2.onerror =
            f, this.img3.onerror = f, this.img4.onerror = f, this.img5.onerror = f, this.img6.onerror = f, this.img7.onerror = f, this.img8.onerror = f, this.img9.onerror = f, this.img10.onerror = f, this.img0.src = "./images/superb/counter/0.png", this.img1.src = "./images/superb/counter/1.png", this.img2.src = "./images/superb/counter/2.png", this.img3.src = "./images/superb/counter/3.png", this.img4.src = "./images/superb/counter/4.png", this.img5.src = "./images/superb/counter/5.png", this.img6.src = "./images/superb/counter/6.png", this.img7.src = "./images/superb/counter/7.png",
            this.img8.src = "./images/superb/counter/8.png", this.img9.src = "./images/superb/counter/9.png", this.img10.src = "./images/superb/counter/panel.png")
    };
    var c = !1,
        f = function (a) {
            c || (Logger.LogError("A 'Flipping Counter' image has incorrectly loaded, please restart or reinstall the game."), c = !0)
        };
    a.handleImageLoad = function (b) {
        a.loaderImageAmount--;
        if (0 == a.loaderImageAmount) {
            for (b = 0; 10 > b; b++) a.numberBitmapsArr[b] = [], a.numberBitmapsArr[b].up = new createjs.Bitmap(a["img" + b]), a.numberBitmapsArr[b].down = new createjs.Bitmap(a["img" +
                b]);
            a.panel = new createjs.Bitmap(a.img10)
        }
    };
    a.FlippingBox = function (b, c) {
        this.container = new createjs.Container;
        var f = [];
        this.init = function () {
            for (var l = 0; l < b; l++) {
                var g = new a.FlippingNumber(0);
                g.init();
                g.container.x = l * (a.rectUp.width + c);
                this.container.addChild(g.container);
                f.push(g)
            }
        };
        this.fill = function (c) {
            c = String(c).split("").splice(0, b);
            var g = b - c.length;
            if (0 < g)
                for (var k = 0; k < g; k++) c.splice(0, 0, "0");
            for (k = 0; k < f.length; k++) f[k].setNumber(!1 == a.is_int(c[k]) ? 0 : c[k])
        }
    };
    a.is_int = function (a) {
        return parseFloat(a) !=
            parseInt(a) || isNaN(a) ? !1 : !0
    };
    a.FlippingNumber = function (b) {
        function c() {
            r = a.numberBitmapsArr[p].down.clone();
            r.sourceRect = a.rectDown;
            r.scaleY = 0;
            r.y = 91;
            this.container.addChild(r);
            Sound.playSoundOnce("flipflap", 0.5);
            0 == u.length && 0 == t.length ? a._activeUITweens.push(createjs.Tween.get(r).to({
                scaleX: 1,
                scaleY: 1
            }, this.speedUltimateDown, createjs.Ease.backOut).call(f, null, this)) : a._activeUITweens.push(createjs.Tween.get(r).to({
                scaleX: 1,
                scaleY: 1
            }, this.speedDown, createjs.Ease.lineer).call(f, null, this))
        }

        function f() {
            this.container.removeChild(l);
            this.container.removeChild(g);
            l = n;
            g = r;
            this.currentLetter = p;
            0 < u.length ? (this.shiftAt(u[0]), u.splice(0, 1)) : (s = !1, 0 < t.length && (console.log(t[t.length - 1], t), this.setNumber(t[t.length - 1]), t = []))
        }
        this.container = new createjs.Container;
        this.currentLetter = b;
        this.speedDown = this.speedUp = 100;
        this.speedUltimateUp = 250;
        this.speedUltimateDown = 500;
        var l = a.numberBitmapsArr[this.currentLetter].up.clone(),
            g = a.numberBitmapsArr[this.currentLetter].down.clone(),
            n, r, p, s = !1,
            u = [],
            t = [];
        this.init = function () {
            l.sourceRect = a.rectUp;
            l.regY = l.y = 91;
            g.sourceRect = a.rectDown;
            g.y = 91;
            this.container.addChild(l);
            this.container.addChild(g)
        };
        this.setNumber = function (a) {
            if (!1 == s) {
                if (a != this.currentLetter) {
                    s = !0;
                    if (a > this.currentLetter) var b = this.currentLetter + 1;
                    else {
                        for (b = this.currentLetter + 1; 9 >= b; b++) u.push(b);
                        b = 0
                    }
                    for (; b <= a; b++) u.push(b);
                    this.shiftAt(u[0]);
                    u.splice(0, 1)
                }
            } else t.push(a)
        };
        this.shiftAt = function (b) {
            p = b;
            n = a.numberBitmapsArr[p].up.clone();
            n.sourceRect = a.rectUp;
            n.regY = n.y = 91;
            this.container.addChild(n);
            this.container.swapChildren(n,
                l);
            speed = 0 == u.length ? this.speedUltimateUp : this.speedUp;
            a._activeUITweens.push(createjs.Tween.get(l).to({
                scaleX: 1,
                scaleY: 0
            }, speed, createjs.Ease.lineer).call(c, null, this))
        }
    }
})();
var Knowledge = {};
(function () {
    Knowledge.hasComboKnowledge = function (a, b, c) {
        c || (c = a.knowledge);
        return c.combos ? c.combos.first(function (a) {
            return a.topicId == b.topic.id && a.genreId == b.genre.id && (!b.secondGenre || b.secondGenre.id == a.secondGenreId)
        }) : !1
    };
    Knowledge.setComboKnowledge = function (b, c) {
        a(b, c, b.knowledge);
        a(b, c, k)
    };
    var a = function (a, b, c) {
        c.combos || (c.combos = []);
        Knowledge.hasComboKnowledge(a, b, c) || (a = {
            topicId: b.topic.id,
            genreId: b.genre.id
        }, b.secondGenre && (a.secondGenreId = b.secondGenre.id), c.combos.push(a))
    };
    Knowledge.getComboHintText =
        function (a) {
            a = GameGenre.getGenreWeighting(a.topic.genreWeightings, a.genre, a.secondGenre);
            return Knowledge.getFactorAdj(a, !0)
        };
    Knowledge.getFactorAdj = function (a, b) {
        a = Math.round(10 * a) / 10;
        return 1 <= a ? b ? "great".localize() : "+++" : 0.9 <= a ? b ? "good".localize() : "++" : 0.8 <= a ? b ? "okay".localize() : "+" : 0.7 <= a ? b ? "bad".localize() : "--" : b ? "terrible".localize() : "---"
    };
    Knowledge.getPlatformAudienceHintHtml = function (a, b) {
        if (!a.canSetTargetAudience()) return "";
        var c = Knowledge.getPlatformAudienceWeightingKnowledge(a, b);
        return Knowledge.getAudienceHintHtml(c,
            !0)
    };
    Knowledge.getAudienceHintHtml = function (a, b) {
        var c = "";
        b && (c = '<span style="font-weight:bold">{0}</span>'.format("Audience match:".localize()));
        if (!a || 0 === a.sum()) return c + ' <span style="font-style:italic">{0}</span>'.format("unknown".localize());
        var d = function (a, b) {
            if (!b || 0 == b) return '<span style="opacity=0.5;font-style:italic">{0}</span>'.format("{0}?").format(General.getShortAudienceLabel(a));
            var c = Knowledge.getFactorAdj(b),
                d = c.startsWith("+") ? "green" : "red";
            return '<span class="{0}" style="font-weight:bold">{1}</span>'.format(d,
                "{0}".format(General.getShortAudienceLabel(a) + c))
        },
            c = c + (" " + d("young", a[0])),
            c = c + (" " + d("everyone", a[1]));
        return c += " " + d("mature", a[2])
    };
    Knowledge.getPlatformGenreHintHtml = function (a, b) {
        var c = '<span style="font-weight:bold">{0}</span>'.format("Genre match:".localize()),
            d = General.getAvailableGenres(a),
            f = Knowledge.getPlatformGenreWeightingKnowledge(a, b);
        if (!f || 0 === f.sum()) return c + ' <span style="font-style:italic">{0}</span>'.format("unknown".localize());
        for (var k = 0, s = 0; s < d.length; s++) {
            k++;
            c += " ";
            2 == k && (c += "<br/>");
            var u;
            u = d[s];
            var t = f[s];
            if (t && 0 != t) {
                var t = Knowledge.getFactorAdj(t),
                    q = t.startsWith("+") ? "green" : "red";
                u = '<span class="{0}" style="font-weight:bold">{1}</span>'.format(q, "{0}".format(u.name + t))
            } else u = '<span style="opacity=0.5;font-style:italic">{0}</span>'.format("{0}?").format(u.name);
            c += u
        }
        return c
    };
    Knowledge.hasMissionWeightingKnowledge = function (a, b, c, d, f) {
        f || (f = a.knowledge);
        if (f.missionWeightings) return void 0 != f.missionWeightings.first(function (a) {
            return a.missionId == b.id &&
                (d || a.topicId == c.topic.id) && a.genreId == c.genre.id && (!c.secondGenre || c.secondGenre.id == a.secondGenreId)
        })
    };
    Knowledge.setMissionWeightingKnowledge = function (a, c, d) {
        b(a, c, d, a.knowledge);
        b(a, c, d, k)
    };
    var b = function (a, b, c, d) {
        d.missionWeightings || (d.missionWeightings = []);
        Knowledge.hasMissionWeightingKnowledge(a, b, c, !1, d) || (a = {
            missionId: b.id,
            genreId: c.genre.id,
            topicId: c.topic.id
        }, c.secondGenre && (a.secondGenreId = c.secondGenre.id), d.missionWeightings.push(a))
    };
    Knowledge.getMissionWeightingDisplayText = function (a,
        b) {
        a = Math.round(10 * a) / 10;
        var c;
        if (b) switch (a) {
            case 0.6:
                c = "not at all important".localize();
                break;
            case 0.7:
                c = "not important".localize();
                break;
            case 0.8:
                c = "not very important".localize();
                break;
            case 0.9:
                c = "quite important".localize();
                break;
            case 1:
                c = "very important".localize()
        } else switch (a) {
            case 0.6:
                c = "---";
                break;
            case 0.7:
                c = "--";
                break;
            case 0.8:
                c = "-";
                break;
            case 0.9:
                c = "++";
                break;
            case 1:
                c = "+++"
        }
        return c
    };
    Knowledge.getMissionWeightingHint = function (a, b) {
        var c, d = !1;
        Knowledge.hasMissionWeightingKnowledge(GameManager.company,
            a, b, !1) ? (d = !0, c = Missions.getGenreWeighting(a, b)) : Knowledge.hasMissionWeightingKnowledge(GameManager.company, a, b, !0) && (c = GameGenre.getGenreWeighting(a.genreWeightings, b.genre, b.secondGenre));
        if (c) return {
            hint: Knowledge.getMissionWeightingDisplayText(c),
            exactMatch: d
        }
    };
    Knowledge.hasPlatformGenreWeightingKnowledge = function (a, b, c) {
        return (a = Knowledge.getPlatformGenreWeightingKnowledge(a, b)) ? 0 != a[GameGenre.getIndexOf(c)] : !1
    };
    Knowledge.getPlatformGenreWeightingKnowledge = function (a, b) {
        var c = a.knowledge.platformKnowledge;
        c || (c = a.knowledge.platformKnowledge = []);
        if (c = c.first(function (a) {
            return a.id == b.id
        })) return c.genreWeightings
    };
    Knowledge.setPlatformGenreWeightingKnowledge = function (a, b, d) {
        c(a, b, d, a.knowledge);
        c(a, b, d, k)
    };
    var c = function (a, b, c, d) {
        a = d.platformKnowledge;
        a || (a = d.platformKnowledge = []);
        d = a.first(function (a) {
            return a.id == b.id
        });
        d || (d = {
            id: b.id
        }, a.push(d));
        d.genreWeightings || (d.genreWeightings = [0, 0, 0, 0, 0, 0]);
        a = GameGenre.getIndexOf(c);
        GameGenre.getGenreWeighting(b.genreWeightings, c);
        d.genreWeightings[a] = b.genreWeightings[a]
    };
    Knowledge.hasPlatformAudienceWeightingKnowledge = function (a, b, c) {
        return (a = Knowledge.getPlatformAudienceWeightingKnowledge(a, b)) ? 0 != a[General.getAudienceWeightinIndex(c)] : !1
    };
    Knowledge.getPlatformAudienceWeightingKnowledge = function (a, b) {
        var c = a.knowledge.platformKnowledge;
        c || (c = a.knowledge.platformKnowledge = []);
        if (c = c.first(function (a) {
            return a.id == b.id
        })) return c.audienceWeightings
    };
    Knowledge.setPlatformAudienceWeightingKnowledge = function (a, b, c) {
        f(a, b, c, a.knowledge);
        f(a, b, c, k)
    };
    var f = function (a, b,
        c, d) {
        a = d.platformKnowledge;
        a || (a = d.platformKnowledge = []);
        d = a.first(function (a) {
            return a.id == b.id
        });
        d || (d = {
            id: b.id
        }, a.push(d));
        d.audienceWeightings || (d.audienceWeightings = [0, 0, 0]);
        a = Platforms.getAudienceWeighting([b], c, !0);
        d.audienceWeightings[General.getAudienceWeightinIndex(c)] = a
    };
    Knowledge.hasTopicAudienceWeightingKnowledge = function (a, b, c) {
        return (a = Knowledge.getTopicAudienceWeightingKnowledge(a, b)) ? c ? 0 != a[General.getAudienceWeightinIndex(c)] : 0 != a.sum() : !1
    };
    Knowledge.getTopicAudienceHtml = function (a,
        b) {
        return Knowledge.getAudienceHintHtml(Knowledge.getTopicAudienceWeightingKnowledge(a, b), !1)
    };
    Knowledge.getTopicAudienceWeightingKnowledge = function (a, b) {
        var c = a.knowledge.topicKnowledge;
        c || (c = a.knowledge.topicKnowledge = []);
        if (c = c.first(function (a) {
            return a.id == b.id
        })) return c.audienceWeightings
    };
    Knowledge.setTopicAudienceWeightingKnowledge = function (a, b, c) {
        d(a, b, c, a.knowledge);
        d(a, b, c, k)
    };
    var d = function (a, b, c, d) {
        a = d.topicKnowledge;
        a || (a = d.topicKnowledge = []);
        d = a.first(function (a) {
            return a.id == b.id
        });
        d || (d = {
            id: b.id
        }, a.push(d));
        d.audienceWeightings || (d.audienceWeightings = [0, 0, 0]);
        a = General.getAudienceWeighting(b.audienceWeightings, c);
        d.audienceWeightings[General.getAudienceWeightinIndex(c)] = a
    };
    Knowledge.setTrainingKnowledge = function (a) {
        var b = GameManager.company,
            c = b.knowledge.trainingKnowledge;
        c || (c = b.knowledge.trainingKnowledge = []);
        b = c.first(function (b) {
            return b.id == a.id
        });
        b || (b = {
            id: a.id
        }, c.push(b))
    };
    Knowledge.hasTrainingKnowledge = function (a) {
        var b = GameManager.company,
            c = b.knowledge.trainingKnowledge;
        c || (c = b.knowledge.trainingKnowledge = []);
        return c.first(function (b) {
            return b.id == a.id
        })
    };
    Knowledge.getTrainingKnowledgeHtml = function (a) {
        if (!Knowledge.hasTrainingKnowledge(a)) return '<span style="font-style:italic;opacity:0.5">{0}</span>'.format("unknown".localize());
        var b = [{
            key: "tF",
            name: "Technology".localize()
        }, {
            key: "dF",
            name: "Design".localize()
        }, {
            key: "rF",
            name: "Research".localize()
        }, {
            key: "sF",
            name: "Speed".localize()
        }],
            c = "";
        b.sort(function (b, c) {
            return a[c.key] - a[b.key]
        });
        for (var d = 0; d < b.length; d++) {
            var f =
                b[d];
            0 != a[f.key] && (c += ' <span class="green">{0}{1}</span>'.format(f.name, 1 <= a[f.key] ? "+++" : 0.5 <= a[f.key] ? "++" : "+"))
        }
        return c
    };
    var k = {};
    Knowledge.loadPlayerKnowledge = function () {
        DataStore.loadSlotAsync("knowledge", function (a) {
            if (a) try {
                k = JSON.parse(a)
            } catch (b) {
                Logger.LogInfo("Could not load already gained knowledge", b)
            }
        }, function (a) { })
    };
    Knowledge.savePlayerKnowledge = function () {
        var a = JSON.stringify(k);
        DataStore.saveToSlotAsync("knowledge", a, function () {
            DataStore.commit && DataStore.commit()
        }, function (a) { })
    };
    Knowledge.usePlayerKnowledge = function (a) {
        a.knowledge = k
    };
    Knowledge.isPlayerKnowledgeAvailable = function () {
        return [k.combos, k.missionWeightings, k.platformKnowledge, k.topicKnowledge].some(function (a) {
            return a && 0 < a.length
        })
    };
    Knowledge.merge = function (a, b) {
        if (a == b) return a;
        var c = JSON.parse(a);
        if (null == c) return b;
        var d = JSON.parse(b);
        if (null == d) return a;
        c.combos ? d.combos && d.combos.forEach(function (a) {
            void 0 == c.combos.first(function (b) {
                return b.topicId == a.topicId && b.genreId == a.genreId && (!b.secondGenreId && !a.secondGenreId ||
                    b.secondGenreId == a.secondGenreId)
            }) && c.combos.push(a)
        }) : c.combos = d.combos;
        c.missionWeightings ? d.missionWeightings && d.missionWeightings.forEach(function (a) {
            void 0 == c.missionWeightings.first(function (b) {
                return b.missionId == a.missionId && (!b.topicId && !a.topicId || b.topicId == a.topicId) && b.genreId == a.genreId && (!b.secondGenreId && !a.secondGenreId || b.secondGenreId == a.secondGenreId)
            }) && c.missionWeightings.push(a)
        }) : c.missionWeightings = d.missionWeightings;
        c.platformKnowledge ? d.platformKnowledge && d.platformKnowledge.forEach(function (a) {
            var b =
                c.platformKnowledge.first(function (b) {
                    return a.id == b.id
                });
            if (void 0 == b) c.platformKnowledge.push(a);
            else {
                if (void 0 == b.genreWeightings) b.genreWeightings = a.genreWeightings;
                else if (void 0 != a.genreWeightings)
                    for (var d = 0; 6 > d; d++) 0 == b.genreWeightings[d] && (b.genreWeightings[d] = a.genreWeightings[d]);
                if (void 0 == b.audienceWeightings) b.audienceWeightings = a.audienceWeightings;
                else if (void 0 != a.audienceWeightings)
                    for (d = 0; 3 > d; d++) 0 == b.audienceWeightings[d] && (b.audienceWeightings[d] = a.audienceWeightings[d])
            }
        }) : c.platformKnowledge =
        d.platformKnowledge;
        c.topicKnowledge ? d.topicKnowledge && d.topicKnowledge.forEach(function (a) {
            var b = c.topicKnowledge.first(function (b) {
                return b.id == a.id
            });
            if (void 0 == b) c.topicKnowledge.push(a);
            else if (void 0 == b.audienceWeightings) b.audienceWeightings = a.audienceWeightings;
            else if (void 0 != a.audienceWeightings)
                for (var d = 0; 3 > d; d++) 0 == b.audienceWeightings[d] && (b.audienceWeightings[d] = a.audienceWeightings[d])
        }) : c.topicKnowledge = d.topicKnowledge;
        c.trainingKnowledge ? d.trainingKnowledge && d.trainingKnowledge.forEach(function (a) {
            void 0 ==
                c.trainingKnowledge.first(function (b) {
                    return b.id == a.id
                }) && c.trainingKnowledge.push(a)
        }) : c.trainingKnowledge = d.trainingKnowledge;
        return JSON.stringify(c)
    }
})();
var CompanyNames = "Original Anvil;Macroprose;Bulldog Entertainment;Red Isles Studios;Obscure Entertainment;Lionfeet Studios;Rockville Softworks;Bungy;Comclap;Epoch Games;Namoni;NGSoftware".split(";"),
    RealCompanyNames = "Origin;Origin Systems;Obsidian;Obsidian Ent.;Blizzard;Valve;Introversion;Cloud Imperium;Broderbund;Bethesda;JoWood;Infrogrames;Black Isle;Sierra;Sierra Entertainment;Sierra On-line;Westwood Studios;MicroProse;0verflow;1st Playable Productions;2K Czech;2XL Games;343 Studios;3DO;38 Studios;3G Studios;42 Entertainment;4A Games;5pb. Inc.;5th Cell;989 Studios;Acclaim Entertainment;Accolade;Access Games;ACE Team;Acheron Design;Acquire;Active Gaming Media;Activision;Activision Blizzard;Adventure Soft;Akella;Aki Corporation;Alfa System;Ancient;Anino Games;Appmania;AQ Interactive;Arc System Works;Arkane Studios;Arkedo Studio;ArenaNet;Arika;Artdink;ArtePiazza;Artificial Mind and Movement;A2M;Artificial Studios;Artoon;Asobo Studio;Ascaron;Aspect;Aspyr Media;Atari;Atlus;Atomic Planet Entertainment;Attic Entertainment Software;Avalanche Studios;Avalanche Software;Aventurine SA;Babaroga;Backbone Entertainment;BattleGoat Studios;Banpresto;Bauhaus Entertainment;Beenox;Behemoth, The;Bethesda Softworks;Big Blue Bubble;Big Huge Games;Binary Hammer;BioWare;Bioware;The Bitmap Brothers;Bizarre Creations;Black Rock Studio;Blitz Games Studios;Blizzard Entertainment;Blue Byte Software;Blue Fang Games;Bohemia Interactive;BreakAway Games;Br\u00f8derbund;Brownie Brown;BSure Interactive;Bullfrog Productions;Bullfrog;Buka Entertainment;Bugbear Entertainment;Bungie Studios;Capcom;Cave;Cavia;Cazap;CCP Games;CD Projekt RED;Centuri;Chunsoft;Cinemaware;Cing;Clap Hanz;Climax Entertainment;Climax Studios;Coded Illusions;Codemasters;Coktel Vision;ColdWood Interactive;Compile Heart;Core Design;Crafts & Meister;Creat Studios;Creative Assembly;Criterion Games;Cryptic Studios;Crystal Dynamics;Crytek;Cyberlore Studios;Cyanide;CyberConnect2;Day 1 Studios;Deadline Games;Deck13;Deep Silver;Demiurge Studios;Digital Illusions;Dimps;Disney Interactive Studios;Double Fine Productions;Double Helix Games;Dynamite Idea;Egosoft;Eidos Interactive;Electronic Arts;EA Games;Engine Software;Epic Games;Epicenter Studios;Epyx;Etranges Libellules;Eugen Systems;Eurocom;Evolution Studios;F4;FarSight Studios;Fatshark;feelplus;Firaxis Games;Firaxis;Firefly Studios;First Star Software;Flagship Games;Flying Lab Software;Foundation 9 Entertainment;Free Radical Design;Frictional Games;From Software;Frozenbyte;Frontier Developments;FUN Labs;Funcom;Futuremark;Game Arts;GameHouse;Gameloft;Games2win;Game Freak;Gearbox Software;Genki;Giants Software;Gogii Games;Good-Feel;Grasshopper Manufacture;Gravity;Griptonite Games;GSC Game World;Guerrilla Games;GungHo Online Entertainment;Gust Corporation;Haemimont Games;HAL Laboratory;Hanaho;Harmonix Music Systems;Hasbro Interactive;HB Studios;HeroCraft;High Moon Studios;High Voltage Software;Hoplon Infotainment;Hothead Games;Housemarque;Hudson Soft;Human Head Studios;Humongous Entertainment;Hyperion Entertainment;id Software;Idea Factory;Ignition Entertainment;IguanaBee;Imageepoch;Infinity Ward;Introversion Software;Incredible Technologies;indieszero;Infogrames;Insomniac Games;Intelligent Systems;Interplay Entertainment;Interplay;IO Interactive;Irem;Irrational Games;Transmission Games;Jadestone Group;Jagex;Jaleco;Javaground;Juice Games;Jupiter;JV Games;Klei Entertainment;Koei;Konami;Krome Studios;Kuju Entertainment;Kush Games;Kuma Reality Games;Ludia;Larian Studios;Legacy Interactive;Legendo Entertainment;Level-5;Lionhead Studios;Llamasoft;Looking Glass Studios;LucasArts;Lucas Arts;Luma Arcade;Luxoflux;Majesco Entertainment;Marvelous Entertainment;Massive Entertainment;Masthead Studios;Mattel;Maxis Software;Mean Hamster Software;Media Molecule;Media.Vision;Mercury Steam;Microsoft Game Studios;Milestone;Milestone S.r.l.;M-Inverse;Mistwalker;Mitchell Corporation;Mojang AB;Monolith Productions;Monolith Soft;Monumental Games;Mythic Entertainment;Namco Bandai;Natsume;Naughty Dog;NCsoft;Ndoors;Neowiz;Nerve Software;NetDevil;Neverland;Neversoft;Nexon;Next Level Games;NGD Studios;Nihon Bussan;Nihon Falcom;Ninjabee;Nintendo;Nippon Ichi Software;Nokia;NHN;Novalogic;Novarama;n-Space;Oddworld Inhabitants;Obsidian Entertainment;Oxygen Studios;Page 44 Studios;Paon;Papaya Studio;Paradox Interactive;Pandemic Studios;Pax Softnica;Pendulo Studios;Penguin Software;People Can Fly;Petroglyph;Phantagram;Piranha Bytes;Pi Studios;Pivotal Games;Playdead;Playdom;Playfish;Playlogic Entertainment;PlayFirst;Platinum Games;Polyphony Digital;PopCap Games;Punch Entertainment;Pyro Studios;Q Entertainment;Q-Games;Quantic Dream;Radical Entertainment;Rainbow Studios;Rare Limited;Raven Software;Reality Pump Studios;Realtime Associates;Realtime Worlds;RedLynx;Red Storm Entertainment;Redtribe;Reflexive Entertainment;Relic Entertainment;Remedy Entertainment;Retro Studios;Revolution Software;Rising Star Games;Rockstar North;Rockstar Games;Rocksteady Studios;Ruffian Games;Runic Games;Running with Scissors;Sarbakan;Sega;SCE Studio Liverpool;Sidhe;Silicon Knights;Silicon Sisters;Silicon Studio;SNK Playmore;Sobee Studios;Snowblind Studios;Software 2000;Sonic Team;Sony Computer Entertainment;Sony Computer Entertainment America;Sony Computer Entertainment Europe;Sora Ltd.;Spectrum HoloByte;Spellborn International;Splash Damage;Square Enix;Starbreeze Studios;Stardock;Star Vault;Strawdog Studios;Sting Entertainment;Straylight Studios;Streamline Studios;Sucker Punch Productions;Sumo Digital;Sunflowers;SuperVillain Studios;Swingin' Ape Studios;Taito Corporation;Tag Games;Take-Two Interactive;Tale of Tales;TaleWorlds;Tamsoft;Tantrumedia;Tantalus Media;Team17;Techland;Tecmo Koei;Telltale Games;Terminal Reality;THQ;Three Rings Design;TimeGate Studios;Torpex Games;Torus Games;Tose;Trapdoor;Traveller's Tales;Treyarch;Tri-Ace;Tripwire Interactive;Triumph Studios;Turn 10 Studios;Two Tribes;Tygron;Ubisoft;Ultimate Play The Game;United Front Games;Universomo;Vivendi Games;Valve Corporation;Vanillaware;Venan Entertainment;Vertigo Games;Vicarious Visions;Viwawa;Virtual Playground;Visceral Games;W!Games;Wahoo Studios;Wanako Games;Wangame Studios;WB Games;Webfoot Technologies;Wideload Games;Wildfire Studios;Wolfire Games;World Forge;Xseed Games;YoYo Games;Yuke's;ZapSpot;ZeniMax;Zipper Interactive;Zylom;Zynga;2.0 Studios;2D Boy;3G Studios;4D Rulers Software;ACE Team;Aldorlea Games;Alec Holowka;Almost Human;Amanita Design;Amaranth Games;Ambrosia Software;Artix Entertainment;Babaroga;Basilisk Games;The Behemoth;Benjamin Rivers;Big Finish Games;Bit Blot;Blitz Games Studios;Blossomsoft;Blue Fang Games;Bohemia Interactive Studio;Boomzap Entertainment;Bplus;Bubble Gum Interactive;Broken Rules;Capybara Games;Caravel Games;Castle Thorn;Chedburn Networks Limited;Christopher Howard Wolf;Chronic Logic;Cing;Cit\u00e9r\u00e9mis;ClockStone Software;cly5m;Coffee Stain Studios;ColdWood Interactive;Crytek Black Sea;Dark Water Studios;Daniel Benmergui;Dejobaan Games;Derek Yu;Digital Eel;Dovogame;Dreadlocks Ltd;Edmund McMillen;Elite Gudz;Elixir Studios;Erik Sved\u00e4ng;Ethereal Darkness Interactive;Eurocom;Evony;Exotypos;Facepunch Studios;Ferry Halim;Firefly Studios;Flashbang Studios;Flying Lab Software;Freebird Games;Frictional Games;Frogwares;Frontier Developments;GameLab;Gaijin Games;GarageGames;Gogii Games;Grasshopper Manufacture;Grey Alien Games;Guild Software;Haemimont Games;Hanako Games;Hemisphere Games;Himalaya Studios;IguanaBee;Insomniac Games;Introversion Software;InvisibleInkStudios;Iron Tower Studio;Irrgheist;Jagex;Jason Rohrer;Jonas Kyratzes;Jph Wacheski;KatGames;Klei Entertainment;Kloonigames;Krillbite;Laminar Research;Level-5;Lexaloffle;Little Green Men Games;Llamasoft;Longbow Digital Arts;M-Inverse;Mad Genius Software;Mangled Eye Studios;Metanet Software;mif2000;Mind Control Software;Mojang;Moonpod;Mousechief;New Star Games;Nicalis;Nifflas;Nival Interactive;Number None;The Odd Gentlemen;OmniSystems;OTS Software;Paladin Studios;Parallax Studio;Pieces Interactive;PixelJAM Games;Playdead;Playtechtonics;Pocketwatch Games;Positech Games;Private Moon Studios;Pronto Games;Prorattafactor;Provox games;PST Team;Psyonix Studios;Punch Entertainment;Q-Games;Queasy Games;Re-logic;realtech VR;Reflexive Entertainment;Relentless Software;Renegade Kid;Reverge Labs;Ronimo Games;Rovio Entertainment;S2 Games;Saber Interactive;Sandlot Games;Santa Cruz Games;Santa Cruz Games;Scientifically Proven;Secret Exit;Seed Studios;Silver Creek Entertainment;Ska Studios;Snowstep Development;Soldak Entertainment;Source Studio;Spiderweb Software;Stoic Studio;Star Vault;Storm Impact;Studio Pixel;Subatomic Studios;Supergiant Games;SuperVillain Studios;Swedish Game Development;Swing Swing Submarine;Tale of Tales;TaleWorlds;Team Shanghai Alice;TeamTNT;thatgamecompany;TheorySpark;Three Rings Design;Torpex Games;Trade Games International;Trendy Entertainment;Tribetoy;Tyler Glaiel;uCool;Unreal Software;Ville M\u00f6nkk\u00f6nen;Vlambeer;WayForward Technologies;Wolfire Games;XMG Studio;Zachary Barth;Zoetrope Interactive;Zoonami;ZootFly;Tale of Tales;TaleWorlds;Tamsoft;Tantrumedia;Tantalus Media;Team17;Techland;Tecmo Koei;Telltale Games;Terminal Reality;THQ;Three Rings Design;TimeGate Studios;Torpex Games;Torus Games;Tose;Trapdoor;Traveller's Tales;Treyarch;Tri-Ace;Tripwire Interactive;Triumph Studios;Turn 10 Studios;Two Tribes;Tygron;Ubisoft;Ultimate Play The Game;United Front Games;Universomo;Vivendi Games;Valve Corporation;Vanillaware;Venan Entertainment;Vertigo Games;Vicarious Visions;Viwawa;Virtual Heroes;Virtual Playground;Visceral Games;Volition;W!Games;Wahoo Studios;Wanako Games;Wangame Studios;WB Games;Webfoot Technologies;Wideload Games;Wildfire Studios;Wolfire Games;World Forge;Xseed Games;YoYo Games;Yuke's;ZapSpot;Zipper Interactive;Zylom".split(";"),
    SettingsGameplay = {};
(function () {
    var a = SettingsGameplay;
    a.tutorialMode = DataStore.settings.tutorialMode ? DataStore.settings.tutorialMode : "onlyNew";
    a.animationMode = DataStore.settings.animationMode ? DataStore.settings.animationMode : "quality";
    a.getTutorialMode = function () {
        return DataStore.settings.tutorialMode
    };
    a.alwaysShowTutorials = function () {
        return "always" == a.getTutorialMode()
    };
    a.isTutorialOff = function () {
        return "never" == a.getTutorialMode()
    };
    a.getAnimationMode = function () {
        return DataStore.settings.animationMode
    };
    a.updateValuesOnPanel = function (b) {
        var c =
            DataStore.settings.tutorialMode ? DataStore.settings.tutorialMode : "onlyNew",
            f = DataStore.settings.animationMode ? DataStore.settings.animationMode : "quality",
            d = $(b).find(".tutorialSelection");
        b = $(b).find(".animationSelection");
        0 < d.length && d.val(c).change(function (b, c) {
            var d = $(this).val();
            a.tutorialMode = d;
            DataStore.settings.tutorialMode = d;
            DataStore.saveSettings()
        });
        0 < b.length && b.val(f).change(function (b, c) {
            var d = $(this).val();
            a.animationMode = d;
            DataStore.settings.animationMode = d;
            DataStore.saveSettings()
        })
    };
    a.isTextCacheEnabled = function () {
        return GameFlags.TEXT_CACHING || "performance" == a.getAnimationMode()
    };
    a.isFrameSkipEnabled = function () {
        return GameFlags.SKIP_FRAME || "performance" == a.getAnimationMode()
    }
})();