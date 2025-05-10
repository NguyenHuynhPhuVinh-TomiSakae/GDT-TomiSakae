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