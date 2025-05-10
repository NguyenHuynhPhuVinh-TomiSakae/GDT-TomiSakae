var Logger = {};
(function () {
    var a = void 0;
    Logger.load = function () {
        DataStore.loadSlotAsync("errorLogs", function (b) {
            if (b) try {
                a = JSON.parse(b)
            } catch (c) {
                a = []
            } else a = []
        }, function (b) {
            a = []
        })
    };
    var b = !1,
        c = !1;
    Logger.save = function () {
        if (b) c = !0;
        else {
            var d = JSON.stringify(a);
            b = !0;
            DataStore.saveToSlotAsync("errorLogs", d, function () {
                b = !1;
                c && (c = !1, Logger.save())
            }, function (a) {
                b = !1
            })
        }
    };
    var f = function (b, c, f) {
        try {
            a && (f || (f = {}), a.push({
                date: (new Date).toISOString(),
                level: b,
                msg: c,
                stacktrace: f.stack,
                number: f.number
            }), 100 < a.length && a.splice(0,
                a.length - 100), Logger.save())
        } catch (l) { }
    };
    Logger.LogModError = function (a, b, c) {
        f("MODERROR", a, b);
        a = c ? c : a;
        b ? PlatformShim.alert(a + ": " + b, "Error".localize()) : PlatformShim.alert(a, "Error".localize())
    };
    Logger.LogError = function (a, b, c) {
        f("ERROR", a, b);
        a = c ? c : a;
        b && (a += "\n" + b + "\n");
        GameManager.areModsEnabled() || (a += "\n\n" + "If the issue persists please report this error to {0}".localize().format("support@greenheartgames.com"));
        PlatformShim.alert(a, "Error".localize())
    };
    Logger.LogWarning = function (a, b, c) {
        f("WARNING",
            a, b);
        a = c ? c : a;
        $("#gameErrorOverlay").css("top", CanvasManager.backgroundCanvas.height - 60);
        $("#gameErrorOverlay")[0].innerText = a;
        $("#gameErrorOverlay").css("opacity", 0).show().transit({
            opacity: 1
        }, 1E3, function () {
            $("#gameErrorOverlay").transit({
                opacity: 1
            }, 3E3, function () {
                $("#gameErrorOverlay").transit({
                    opacity: 0
                }, 1E3, function () {
                    $("#gameErrorOverlay").hide()
                })
            })
        })
    };
    Logger.LogInfo = function (a, b) {
        f("INFO", a, b)
    }
})();