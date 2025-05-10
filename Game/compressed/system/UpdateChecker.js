var UpdateChecker = {};
(function () {
    function a(a) {
        if ("string" != typeof a) return null;
        var b = a.split(".");
        a = parseInt(b[0]);
        var c = parseInt(b[1]),
            b = parseInt(b[2]);
        return isNaN(a) || isNaN(c) || isNaN(b) ? null : {
            major: a,
            minor: c,
            patch: b
        }
    }
    var b = UpdateChecker;
    b.VERSION = "1.7.6";
    b.checkForUpdate = function () {
        if (!GameFlags.IS_STEAM) {
            try {
                var b = a("1.7.6")
            } catch (d) {
                b = null
            }
            if (b) {
                try {
                    require("nw.gui").App.clearCache()
                } catch (k) { }
                var m = navigator.platform;
                if (m = m.startsWith("Win") ? "win" : m.startsWith("Mac") ? "mac" : m.startsWith("linux") ? "linux" : null) {
                    var l =
                        "http://www.greenheartgames.com/utils/releases/gdt/lite/" + m;
                    GameFlags.ghg7 || (l = "http://www.greenheartgames.com/utils/releases/gdt/" + m);
                    $.get(l, function (d) {
                        if (-1 != d.indexOf(";")) {
                            d = d.split(";");
                            try {
                                var k = a(d[0])
                            } catch (l) {
                                k = null
                            }
                            k && k && b && (k.major > b.major || k.major == b.major && (k.minor > b.minor || k.minor == b.minor && k.patch > b.patch)) && c(d[1])
                        }
                    })
                } else ghg4.ghg5("check-update-error", {
                    msg: "unknown platform"
                })
            } else PlatformShim.alert("version not valid: 1.7.6")
        }
    };
    var c = function (a) {
        var b = $("#upateNotificationWindow");
        b.find(".updateButton").clickExclOnce(function () {
            Sound.click();
            PlatformShim.openUrlExternal(a);
            b.dialog("close")
        });
        b.gdDialog({
            zIndex: 15E3,
            popout: !0,
            close: !0
        })
    };
    b.checkForUpdate()
})();