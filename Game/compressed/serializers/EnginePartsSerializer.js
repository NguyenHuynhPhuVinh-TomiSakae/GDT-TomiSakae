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