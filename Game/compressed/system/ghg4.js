var ghg4 = {};
ANALYTICS_ENABLED = !1;
(function () {
    var a = ghg4,
        b;
    a.init = function () {
        if (ANALYTICS_ENABLED) {
            PlatformShim.ISWIN8 && GameManager.ghg3().licenseInformation.addEventListener("licensechanged", function () { });
            try {
                b = LocalyticsSession(PlatformShim.ISWIN8 ? "a81d66cf7ac434d5db026f5-02cfbbe2-3c4e-11e2-685f-00ef75f32667" : GameFlags.ghg7 ? "41c2fa766702efda9d050cf-4cbeae62-ac6f-11e2-8796-005cf8cbabd8" : GameFlags.G782 ? "9c7a8f4b73c5b371e62dd52-6f5ec11e-ac6f-11e2-8798-005cf8cbabd8" : "81926045ae9a704f220ff42-cadd95fa-d7af-11e2-0f20-004a77f8b47f", {
                    polling: !1
                }),
                    b.open(), b.upload(), a.ghg5("system-info", {
                        platform: navigator.platform,
                        cpuClass: navigator.cpuClass,
                        userLanguage: navigator.userLanguage,
                        "is-steam": GameFlags.IS_STEAM
                    }), document.addEventListener("visibilitychange", function (a) {
                        try {
                            var c = document.visibilityState;
                            "visible" == c ? (b.open(), b.upload()) : "hidden" == c && (b.close(), b.upload())
                        } catch (k) { }
                    }, !1)
            } catch (c) { }
            $(document).on("click", "a", function (a) {
                try {
                    if (a && a.srcElement) {
                        var b = $(a.srcElement).attr("href");
                        "#" != b && (PlatformShim.ISWIN8 || (PlatformShim.openUrlExternal(b),
                            a.preventDefault()), ghg4.ghg5("clicked link", {
                                href: b
                            }))
                    }
                } catch (c) { }
            })
        }
    };
    a.ghg5 = function (a, f) {
        if (ANALYTICS_ENABLED) try {
            b.tagEvent(a, f)
        } catch (d) { }
    }
})();