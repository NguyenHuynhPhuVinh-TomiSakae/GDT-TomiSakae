var PlatformShim = {};
(function () {
    var a = {};
    (function () {
        a.execUnsafeLocalFunction = function (a) {
            a()
        };
        a.toStaticHtml = function (a) {
            return a
        };
        a.getUserName = function () {
            return "Player".localize()
        };
        a.goToReviewPage = function () { };
        a.xhr = function (a, b, c) {
            b()
        };
        a.alert = function (a, b) {
            alert(a)
        }
    })();
    var b = {};
    (function () {
        b.execUnsafeLocalFunction = function (a) {
            MSApp.execUnsafeLocalFunction(a)
        };
        b.toStaticHtml = function (a) {
            return toStaticHTML(a)
        };
        b.getUserName = function () {
            return WindowsIntegration.getUserName()
        };
        b.goToReviewPage = function () {
            WindowsIntegration.goToReviewPage()
        };
        b.xhr = function (a, b, c) {
            WinJS.xhr(a).done(b, c)
        };
        b.alert = function (a, b) {
            (new Windows.UI.Popups.MessageDialog(a, b)).showAsync()
        };
        b.ISWIN8 = !0;
        b.ISLOWRES = GameFlags.IS_LOW_RES;
        b.getVersion = function () {
            var a = Windows.ApplicationModel.Package.current.id.version;
            return [a.major, a.minor, a.build, a.revision].join(".")
        };
        b.openUrlExternal = function (a) {
            a = new Windows.Foundation.Uri(a);
            Windows.System.Launcher.launchUriAsync(a).done()
        }
    })();
    var c = !1;
    try {
        c = void 0 != MSApp
    } catch (f) {
        Logger.LogInfo("hasMSapp check failed", f)
    }
    c ?
        (PlatformShim = b, WinJS.Application.onerror = function (a) {
            if ("error" == a.type) {
                if (a.detail.stack) ErrorReporting.report(a.detail), PlatformShim.alert("Unexpected error. You might have to restart the game.".localize() + "\n{0}".format(a.detail.message), "Unexpected error".localize());
                else {
                    var b = a.detail.errorMessage,
                        c = a.detail.errorLine;
                    a = a.detail.errorUrl;
                    ErrorReporting.report("{0}-{1}-{2}".format(b, a, c));
                    PlatformShim.alert("Unexpected error. You might have to restart the game.".localize() + "\n{0}-{1}-{2}".format(b,
                        a, c), "Unexpected error".localize())
                }
                return !0
            }
        }) : (PlatformShim = a, window.ondragover = function (a) {
            a.preventDefault();
            return !1
        }, window.ondrop = function (a) {
            a.preventDefault();
            return !1
        }, window.onerror = function (a, b, c, l, g) {
            Logger.LogError("Unexpected error. You might have to restart the game.".localize() + "\n{0}".format(a), null, g)
        }, PlatformShim.openUrlExternal = function (a) {
            require("nw.gui").Shell.openExternal(a)
        }, PlatformShim.toggleFullscreen = function () {
            var a = require("nw.gui").Window.get();
            a.toggleFullscreen();
            return a.isFullscreen
        }, PlatformShim.getVersion = function () {
            return "undefined" != typeof UpdateChecker ? UpdateChecker.VERSION : "{VERSION}"
        }, PlatformShim.restartApp = function () {
            require("nw.gui").Window.get().reload(3)
        }, PlatformShim.terminateApp = function () {
            require("nw.gui").App.closeAllWindows()
        }, PlatformShim.getScriptFile = function (a) {
            var b = document.currentScript ? unescape(document.currentScript.src) : "";
            if ("" === b) return "";
            var c = require("path");
            (c ? c.dirname(process.execPath) : "").replaceAll("\\", "/");
            b = b.replaceAll("../",
                "").replaceAll("..\\", "");
            "file:///" == b.substring(0, 8) && (b = b.substring(8));
            return !0 === a ? c ? c.resolve(b) : "" : b
        }, PlatformShim.getScriptPath = function (a) {
            return (a = PlatformShim.getScriptFile(a)) && 0 <= a.lastIndexOf("/") ? a.substr(0, a.lastIndexOf("/")) : a
        });
    PlatformShim.getFullVersionString = function () {
        var a = PlatformShim.getVersion(),
            b = "";
        PlatformShim.ISWIN8 && (b += "-winstore");
        GameFlags.ARM_VERSION && (b += "-arm");
        b = GameFlags.IS_STEAM ? b + "-steam" : b + "-standalone";
        return "{0}{1}{2}".format(a, b, GameFlags.ghg6 ? "-debug" :
            "")
    }
})();