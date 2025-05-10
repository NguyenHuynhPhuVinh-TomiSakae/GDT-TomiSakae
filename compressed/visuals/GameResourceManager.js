var GameDev = {
    ResourceManager: {}
};
(function () {
    rm = GameDev.ResourceManager;
    rm.resources = {};
    rm.ensureResources = function (a, b) {
        if (0 == a.length) b();
        else {
            var c = new html5Preloader,
                f = !1;
            i = 0;
            for (length = a.length; i < length; i++) {
                var d = a[i];
                d && !rm.resources[d] && (c.addFiles(d), f = !0)
            }
            f ? (c.onerror = function (a) {
                alert(a)
            }, c.onfinish = function () {
                i = 0;
                for (length = a.length; i < length; i++) {
                    var d = a[i];
                    rm.resources[d] || (rm.resources[d] = c.getFile(d))
                }
                b()
            }) : b()
        }
    };
    rm.removeResources = function (a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            rm.resources.hasOwnProperty(c) &&
                (rm.resources[c] = void 0)
        }
    }
})();