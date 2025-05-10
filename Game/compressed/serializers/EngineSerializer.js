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