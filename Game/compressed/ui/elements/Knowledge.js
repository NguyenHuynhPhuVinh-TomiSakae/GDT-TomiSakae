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
