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