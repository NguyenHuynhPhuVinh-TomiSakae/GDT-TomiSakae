var Steam = {};
(function () {
    var a = null,
        b = !1;
    if (!PlatformShim.ISWIN8 && require) {
        try {
            a = require("./steamIntegration/greenworks-win")
        } catch (c) {
            a = null
        }
        if (!a) try {
            a = require("./steamIntegration/greenworks-osx64")
        } catch (f) {
            a = null
        }
        if (!a) try {
            a = require("./steamIntegration/greenworks-osx")
        } catch (d) {
            a = null
        }
        if (!a) try {
            a = require("./steamIntegration/64/greenworks-linux64")
        } catch (k) {
            a = null
        }
        if (!a) try {
            a = require("./steamIntegration/32/greenworks-linux32")
        } catch (m) {
            a = null
        }
    }
    Steam.isAvailable = function (l) {
        if (!a) return l && l("no steam integration available"),
            !1;
        if (!b) {
            var g;
            a: {
                if (!b) {
                    b = !0;
                    try {
                        if (!a.initAPI()) {
                            a = null;
                            l && l("steam Init failed");
                            g = !1;
                            break a
                        }
                    } catch (d) {
                        a = null;
                        Logger.LogWarning("Steam initialization failed", d, "Steam initialization failed".localize());
                        d && d("steam Init failed");
                        g = !1;
                        break a
                    }
                }
                g = !0
            }
            if (!g) return !1
        }
        return !0
    };
    Steam.saveTextToFile = function (b, g, d, c) {
        Steam.isAvailable(c) && a.saveTextToFile(b, g, d, c)
    };
    Steam.readTextFromFile = function (b, g, d, c) {
        Steam.isAvailable(c) && a.readTextFromFile(b, g, d, c)
    };
    Steam.activateAchievement = function (b, g) {
        Steam.isAvailable() &&
            a.activateAchievement(b, g, function (a) {
                GameFlags.ghg6 && PlatformShim.alert(a, "Error".localize())
            })
    };
    Steam.getCurrentGameLanguage = function (b) {
        return Steam.isAvailable(b) ? a.getCurrentGameLanguage() : "en"
    };
    Steam.api = a
})();