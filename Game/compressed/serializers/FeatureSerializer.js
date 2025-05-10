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