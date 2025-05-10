var CustomAlert = {};
(function (a) {
    a.init = function () {
        window.alert = function (b, c) {
            console.log("-- Alert Log --");
            console.log("Type: " + c);
            console.log("Message: " + b);
            console.log("-- --------- --");
            a.show(b, c)
        }
    };
    a.stack = [];
    a.info = function (b) {
        a.show(b, "INFO")
    };
    a.warn = function (b) {
        a.show(b, "WARN")
    };
    a.error = function (b) {
        a.show(b, "ERR")
    };
    a.response = function (b) {
        a.show(b, "RESP")
    };
    a.success = function (b) {
        a.show(b, "SUCC")
    };
    a.tutorial = function (b) {
        a.show(b, "TUT")
    };
    a.hint = function (b) {
        a.show(b, "HINT")
    };
    a.show = function (b, c, f, d) {
        b = ("" + b).replaceAll("\n",
            "<br/>");
        c = c ? c.toUpperCase() : "ERROR";
        var k = $(window),
            m = k.width();
        k.height();
        var l = 0.5 * m - 360,
            g = $(document.createElement("div")),
            k = $(document.createElement("div")),
            m = $(document.createElement("div")),
            n = "",
            r = d ? d : "http://forum.greenheartgames.com";
        g.addClass("errorMessage window");
        g.addClass("ul-vt-textbox");
        g.css({
            left: l,
            top: 20
        });
        k.addClass("icon-remove-sign");
        k.addClass("errorMessage button close");
        k.attr("title", "Close this update notification");
        m.addClass("icon-external-link");
        m.addClass("errorMessage button url");
        f ? m.attr("title", f) : m.attr("title", "Click here to head to the Greenheart Games Forums (http://forum.greenheartgames.com/)");
        switch (c) {
            case "ERR":
                headerText = "Error Alert";
                g.addClass("msg-error");
                n = "icon-warning-sign";
                break;
            case "SUCC":
                headerText = "Success Alert";
                g.addClass("msg-success");
                n = "icon-ok-circle";
                break;
            case "HINT":
                headerText = "Hint Alert";
                g.addClass("msg-hint");
                n = "icon-eye-open";
                break;
            case "WARN":
                headerText = "Warning Alert";
                g.addClass("msg-warning");
                n = "icon-exclamation-sign";
                break;
            case "INFO":
                headerText =
                    "Information Alert";
                g.addClass("msg-info");
                n = "icon-info-sign";
                break;
            case "RESP":
                headerText = "Information Alert";
                g.addClass("msg-response");
                n = "icon-envelope";
                break;
            case "TUT":
                headerText = "Tutorial Alert";
                g.addClass("msg-tutorial");
                n = "icon-comment";
                break;
            default:
                headerText = "Error Alert", g.addClass("msg-default"), n = "icon-exclamation-sign"
        }
        $("body").append(g);
        g.html('<h3><i class="' + n + ' icon-2x">&nbsp;&nbsp;<span class="errorMessage-header">' + headerText + '</span></i></h3><p class="errorMessage">' + b + "</p>");
        if ("ERROR" === c || "ERR" === c) try {
            var p = "";
            c = "";
            c = GameFlags.IS_STEAM ? c + "Steam" : PlatformShim.ISWIN8 ? c + "Metro" : c + "Standalone";
            f = "";
            switch (process.platform) {
                case "darwin":
                    f += "Mac";
                    break;
                case "freebsd":
                    f += "FreeBSD";
                    break;
                case "linux":
                    f += "Linux";
                    break;
                case "sunos":
                    f += "Sunos";
                    break;
                case "win32":
                    f += "Windows";
                    PlatformShim.ISWIN8 && (f += " 8");
                    break;
                default:
                    f += "unknown"
            }
            PlatformShim.ISWIN8 || ($.grep(ModSupport.currentMods, function (a, b) {
                ModSupport.availableMods.forEach(function (b) {
                    a == b.id && (p += "<li>" + b.name + " by " +
                        b.author + "</li>")
                })
            }), 1 > p.length && (p = "<li>No mods activated.</li>"), p = "<ul style='text-align:left;'>{0}</ul>".format(p), g.append("{0}Enabled Mods: {1}{2}".format("<p class='errorMessage left'><span>", "</span> </p>", p)));
            g.append("{0}Game Version: {1}{2}{3}".format("<p class='errorMessage left'><span>", "</span> ", PlatformShim.getVersion(), "</p>"));
            g.append("{0}Platform: {1}{2}{3}".format("<p class='errorMessage left'><span>", "</span> ", f, "</p>"));
            g.append("{0}Distribution: {1}{2}{3}".format("<p class='errorMessage left'><span>",
                "</span> ", c, "</p>"))
        } catch (s) {
            g.append("{0}Note: {1}{2}{3}".format("<p class='errorMessage left'><span>", "</span> ", "Error occurred before the game finished intialising.", "</p>"))
        }
        k.prependTo(g);
        m.prependTo(g);
        k.clickExcl(function () {
            var b = a.stack.indexOf(g); - 1 < b && a.stack.splice(b, 1);
            g.remove()
        });
        m.clickExcl(function () {
            PlatformShim.openUrlExternal(r);
            g.remove()
        });
        a.stack.push(g);
        a.stack && 0 < a.stack.length && g.css({
            left: "+=" + -(5 * a.stack.length),
            top: "+=" + 5 * a.stack.length
        })
    };
    return a
})(CustomAlert || {});