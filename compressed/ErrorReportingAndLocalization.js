var ErrorReporting = {};
(function () {
    ErrorReporting.report = function (a) { }
})();
var Localization = {};
(function () {
    var a = Localization;
    a.dict = {};
    a.keys = [];
    String.prototype.localize = function (b) {
        return a.localize(this.toString(), b)
    };
    a.localize = function (c, f) {
        if (b) {
            var d = c + "\u00b0\u00b0";
            f && (d += f);
            var k = a.keys.weakIndexOf(d);
            if (-1 != k || f && (d = c + "\u00b0\u00b0", k = a.keys.weakIndexOf(d), -1 != k)) return a.dict[k];
            d = a.keys.first(function (a) {
                return a.startsWith(d)
            });
            if (void 0 != d && (k = a.keys.weakIndexOf(d), -1 != k)) return a.dict[k]
        }
        return c
    };
    a.processHtml = function (a) {
        var b = $(a),
            d = b.html();
        for (a = 0; - 1 != (a = d.indexOf("ll:{",
            a));) {
            var k = d.indexOf("}", a + 1),
                m = d.slice(a, k + 1),
                l = m.slice(4, m.length - 1),
                g = null,
                n = d.indexOf(",lc:{", k);
            n == k + 1 && (g = d.slice(n + 5, d.indexOf("}", n)), m += ",lc:{" + g + "}");
            d = d.replaceAll(m, PlatformShim.toStaticHtml(l.localize(g)));
            a++
        }
        PlatformShim.execUnsafeLocalFunction(function () {
            b.html(d)
        })
    };
    var b;
    a.invalidateLanguage = function (c) {
        try {
            if (c && "en" != c) {
                b = !0;
                var f = Languages[c];
                a.keys = [];
                a.dict = {};
                if (f.values)
                    for (c = 0; c < f.values.length; c++) {
                        var d = f.values[c],
                            k = d.value + "\u00b0\u00b0";
                        d.comment && (k += d.comment);
                        a.keys.push(k);
                        a.dict[a.keys.length - 1] = d.translation
                    }
            } else b = !1
        } catch (m) {
            f = m ? m.number : null, b = !1, ghg4 && ghg4.ghg5("invalidateLanguage failed", {
                "error-nr": f
            }), Logger.LogInfo("invalidateLanguage failed", m)
        }
    };
    a.isRTLLanguage = function (a) {
        a || (a = GameManager.getPreferredLanguage());
        return "arsa" == a
    };
    a.setLanguage = function (b) {
        a.invalidateLanguage(b);
        if (b) try {
            requireLoad(["./libs/locales/jquery.timeago." + b + ".js"], function () { }, function () { })
        } catch (f) { }
        a.isRTLLanguage(b) && (b = document.createElement("link"), b.setAttribute("rel",
            "stylesheet"), b.setAttribute("type", "text/css"), b.setAttribute("href", "./css/rtl.css"), document.getElementsByTagName("head")[0].appendChild(b))
    }
})();