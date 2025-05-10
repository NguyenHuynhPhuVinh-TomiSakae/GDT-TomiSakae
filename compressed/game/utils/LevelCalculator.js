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