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