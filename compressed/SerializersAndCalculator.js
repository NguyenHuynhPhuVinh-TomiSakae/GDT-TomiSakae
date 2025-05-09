var TopicsSerializer = {};
(function () {
    TopicsSerializer.load = function (a) {
        return Topics.topics.first(function (b) {
            return b.id === a.id
        })
    };
    TopicsSerializer.save = function (a) {
        var b = {};
        b.id = a.id;
        return b
    }
})();
var EnginePartsSerializer = {};
(function () {
    EnginePartsSerializer.load = function (a) {
        return Research.getAllItems().first(function (b) {
            return b.id === a.id
        })
    };
    EnginePartsSerializer.save = function (a) {
        var b = {};
        b.id = a.id;
        return b
    }
})();
var EngineSerializer = {};
(function () {
    EngineSerializer.load = function (a) {
        var b = {};
        $.extend(b, a);
        b.parts = a.parts.map(function (a) {
            return EnginePartsSerializer.load(a)
        }).filter(function (a) {
            return a
        });
        return b
    };
    EngineSerializer.save = function (a) {
        var b = {};
        $.extend(b, a);
        b.parts = a.parts.map(function (a) {
            return EnginePartsSerializer.save(a)
        });
        return b
    }
})();
var FeatureSerializer = {};
(function () {
    FeatureSerializer.load = function (a) {
        var b = Research.getAllItems().first(function (b) {
            return b.id === a.id
        });
        if (b) return void 0 != a.experience && (b.experience = a.experience), b
    };
    FeatureSerializer.save = function (a) {
        var b = {};
        b.id = a.id;
        void 0 != a.experience && (b.experience = a.experience);
        return b
    }
})();
var PlatformsSerializer = {};
(function () {
    PlatformsSerializer.load = function (a) {
        if (a.isCustom) return a;
        var b = Platforms.allPlatforms.first(function (b) {
            return b.id === a.id
        });
        b || Logger.LogError("Could not load platform with id {0} - perhaps a mod is missing?".format(a.id));
        return b
    };
    PlatformsSerializer.save = function (a) {
        if (a.isCustom) return a;
        var b = {};
        b.id = a.id;
        return b
    }
})();
var CompanyFeatureSerializer = {};
(function () {
    CompanyFeatureSerializer.load = function (a) {
        var b = {};
        b.id = a.id;
        b.lastUpdate = a.lastUpdate;
        b.progress = a.progress;
        b.type = a.type;
        a.missionType && (b.missionType = a.missionType);
        a.duration && (b.duration = a.duration);
        return b
    };
    CompanyFeatureSerializer.save = function (a) {
        var b = {};
        b.id = a.id;
        b.lastUpdate = a.lastUpdate;
        b.progress = a.progress;
        b.type = a.type;
        a.missionType && (b.missionType = a.missionType);
        a.duration && (b.duration = a.duration);
        return b
    }
})();
var SpawnedPointsSerializer = {};
(function () {
    SpawnedPointsSerializer.load = function (a) {
        var b = {};
        b.duration = a.duration;
        b.id = a.id;
        b.type = a.type;
        b.gameTime = a.gameTime;
        b.delay = a.delay;
        return b
    };
    SpawnedPointsSerializer.save = function (a) {
        var b = {};
        b.duration = a.duration;
        b.id = a.id;
        b.type = a.type;
        b.gameTime = a.gameTime;
        b.delay = a.delay;
        return b
    }
})();
var LevelCalculator = {};
(function () {
    var a = LevelCalculator,
        b = [350, 900, 1600, 2400, 3400, 4400, 5500, 7E3, 9500, 14E3, 2E4, 36E3, 6E4, 1E5];
    a.getEnginePartLevel = function (a, b) {
        return this.getLevel(this.getFeatureExperience(a, b))
    };
    a.getFeatureExperience = function (a, b) {
        return Research.getAllItems().first(function (a) {
            return a.id === b
        }).experience
    };
    a.getFeatureLevel = function (a, b) {
        var d;
        try {
            d = this.getLevel(this.getFeatureExperience(a, b))
        } catch (k) {
            d = 0
        }
        return d
    };
    a.getMissionLevel = function (a) {
        a = a.id ? a : Missions.getMissionWithId(a);
        return this.getLevel(a.experience)
    };
    a.getLevelBonusFactor = function (b) {
        b = a.getLevel(b);
        return 1 === b ? 1 : 1 + (b - 1) / 10 * 0.5
    };
    a.getXpForLevel = function (a) {
        var f = Math.floor(a),
            d = a - f,
            k = 1 == f ? 0 : b.length < a ? b.last() : b[a - 2];
        5 > a && 0 != d && (k += (1 == f + 1 ? 0 : b.length < a ? b.last() : b[a - 2]) * d);
        return k
    };
    a.getLevel = function (a) {
        if (GameFlags.ghg6 && void 0 === a) throw "no experience provided";
        var f = b.last(function (b) {
            return a >= b
        }),
            f = b.indexOf(f);
        return -1 == f ? 1 : f + 2
    };
    a.getLevelFractional = function (b) {
        var f = a.getLevel(b);
        b = a.getProgressToNextLevel(b);
        return f + b / 100
    };
    a.getProgressToNextLevel =
        function (b) {
            var f = a.getXpToNextLevel(b),
                d = a.getLevel(b),
                d = a.getXpForLevel(d);
            return 0 == f - d ? 0 : (b - d) / (f - d) * 100
        };
    a.getProgressToLevel = function (b, f) {
        var d = a.getXpForLevel(b),
            k = 0;
        1 < b && (k = a.getXpForLevel(b - 1));
        return ((f - k) / (d - k) * 100).clamp(0, 100)
    };
    a.getXpToNextLevel = function (c) {
        c = a.getLevel(c);
        return b.length <= c ? b.last() : b[c - 1]
    }
})();