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
