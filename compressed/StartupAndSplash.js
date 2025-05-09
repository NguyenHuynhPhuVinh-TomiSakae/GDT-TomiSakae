var SplashScreen = {},
    Startup = {};
(function () {
    function a(a) {
        if (PlatformShim.ISWIN8) a();
        else try {
            var b = require("fs");
            if (b) {
                var g = b.readFileSync("./eula.txt", "utf8");
                if (g)
                    if (DataStore.getValue("eula-accepted")) a();
                    else {
                        var l = $("#eulaWindow");
                        l.find(".deleteButton").clickExclOnce(function () {
                            window.close()
                        });
                        l.find(".okButton").clickExclOnce(function () {
                            l.dialog("close");
                            DataStore.setValue("eula-accepted", !0);
                            a()
                        });
                        b = g;
                        b = b.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
                        l.find(".eulaContainer").html(PlatformShim.toStaticHtml(b));
                        l.gdDialog({
                            popout: !0,
                            close: !1,
                            zIndex: 2E4,
                            onClose: function () {
                                l.find(".eulaContainer").empty()
                            }
                        })
                    }
            }
        } catch (d) {
            a && a()
        }
    }

    function b(a) {
        labelText = "Tap to start game ...".localize();
        WindowsIntegration.isTouchCapable || (labelText = "Click to start game ...".localize());
        a.clickExcl(function (b) {
            if (UI.isPanelOpen()) return UI.closePanels(), !1;
            UI.hideAboutBadge();
            a.off("click");
            m("Starting game...".localize());
            GameManager.startNewGame()
        });
        m(labelText)
    }

    function c(a, g) {
        a.clickExcl(function () {
            if (UI.isPanelOpen()) return UI.closePanels(),
                !1;
            a.off("click");
            UI.hideAboutBadge();
            UI.fadeInTransitionOverlay(function () {
                SplashScreen.removeSplashScreen();
                GameManager.reload(g.slot, function () {
                    Sound.playBackgroundMusic();
                    GameManager.resume(!0)
                }, function () {
                    b(a)
                }, !0)
            })
        })
    }

    function f() {
        try {
            var a = require("nw.gui").Window.get(),
                g = DataStore.getValue("windowed");
            try {
                !0 != g && "true" != g || PlatformShim.toggleFullscreen()
            } catch (l) { }
            a.focus()
        } catch (d) { }
        $("#commandsAppBar")[0].disabled = !1;
        a = $("#splashScreen");
        $("#splashProgress").fadeOut(400);
        var g = $("#gameReadyLabel"),
            k = GameManager.getSaveGames();
        UI.showNewsletterWidget();
        if (0 !== k.length && k.some(function (a) {
            return null != a
        })) {
            k = "Tap to continue ...";
            WindowsIntegration.isTouchCapable || (k = "Click to continue ...".localize());
            var f = GameManager.getGameToContinue();
            f && f.companyName && $("#isAGameTycoonLabel").text("{0}".format(f.companyName)).fadeIn(600).arctext({
                radius: 350
            });
            GameManager.pause(!0);
            c(a, f);
            m(k, g)
        } else b(a);
        GameManager.startDrawLoop()
    }
    CustomAlert.init();
    var d, k = function () {
        var b = $("#splashProgress");
        b.hide();
        $("#gameReadyLabel").hide();
        b.fadeIn("fast");
        $("#splashScreen");
        d = function () {
            var a = (window.innerWidth - 2990) / 2 - 10,
                b = (window.innerHeight - 2990) / 2 - 70;
            $("#splashPositionStyle").html(".splashDynamicClass:before { top:{0}px; left:{1}px; }".format(b, a))
        };
        Localization.processHtml(document.body);
        CanvasManager.init(document.getElementById("canvasContainer"));
        CanvasManager.initLeftScreen(document.getElementById("canvasContainerLeft"));
        CanvasManager.initRightScreen(document.getElementById("canvasContainerRight"));
        d();
        GameManager.ghg0() ? ($("#gamePreviewLabel").text(">> Lite Version <<".localize()), GameManager.ghg1()) : $("#gamePreviewLabel").hide();
        $("#gameSavedOverlay").css({
            opacity: 0
        });
        $("#gamePausedOverlay").css({
            opacity: 0
        });
        $("#gameErrorOverlay").css({
            opacity: 0
        });
        r();
        Logger.load();
        Knowledge.loadPlayerKnowledge();
        Sound.init();
        GameManager.init();
        $("<img/>").attr("src", "./images/sunrays.png").load(function () {
            $("#splashStaticBackdrop").transition({
                opacity: 0
            }, 2E3);
            a(function () {
                DataStore.init ? DataStore.init(f) :
                    f()
            })
        });
        l = $(window).width();
        g = $(window).height();
        ghg4.init()
    },
        m = function (a, b) {
            b || (b = $("#gameReadyLabel"));
            b && (b.text(a), b.delay(400).effect("pulsate", {
                times: 50
            }, 2E3))
        };
    SplashScreen.reshow = function (a) {
        var b = GameManager;
        splashScreen = $("#splashScreen");
        splashScreen.fadeIn();
        a = GameManager.getGameToContinue();
        c(splashScreen, a);
        setTimeout(function () {
            UI.isTransitionVisible && UI.fadeOutTransitionOverlay(function () {
                b.systemPause ? b.pause(!0) : b.resume(!0);
                b.playerPause ? b.pause(!1) : b.resume(!1);
                b.loadInProgress = !1
            });
            UI.showAboutBadge();
            UI.showNewsletterWidget()
        }, 300)
    };
    SplashScreen.removeSplashScreen = function () {
        var a = $("#splashScreen");
        return a.is(":visible") ? (a.fadeOut("slow"), UI.hideAboutBadge(), !0) : !1
    };
    SplashScreen.isVisible = function () {
        return $("#splashScreen").is(":visible")
    };
    var l, g, n = function () {
        var a = $(window).width(),
            b = $(window).height();
        if (a != l || b != g) l = a, g = b, $("#splashScreen").is(":visible") ? d && d() : (GameManager.pause(!0), GameManager.autoSave(function () {
            GameManager.reload("auto", void 0, void 0, !0)
        }))
    },
        r = function () {
            var a = $(window).width(),
                b = $(window).height();
            $(document.body).width(a).height(b);
            CanvasManager.updateCanvasSizes(a, b);
            CanvasManager.update()
        },
        p;
    $(window).resize(function () {
        r();
        clearTimeout(p);
        p = setTimeout(n, 100)
    });
    PlatformShim.ISWIN8 || $(document).ready(function () {
        k();
        Greenworks ? Greenworks.synchronize() : ($("#greenworksLoading").remove(), ModSupport.init())
    });
    $.prototype.slider_old = $.prototype.slider;
    $.prototype.slider = function () {
        var a = $.prototype.slider_old.apply(this, arguments);
        ".projectBudgetSlider" !=
            this.selector && ".simplemodal-data .budgetSlider" != this.selector || this.find(".ui-slider-handle").unbind("keydown");
        return a
    };
    var s = require("nw.gui").Window.get();
    s.on("close", function () {
        GameManager.autoSave();
        s.close(!0)
    });
    document.addEventListener("DOMMouseScroll", function (a) {
        a.axis == a.HORIZONTAL_AXIS && (a.stopPropagation(), a.preventDefault(), a.cancelBubble = !1);
        return !1
    }, !1);
    document.onmousedown = function (a) {
        2 == a.which && a.preventDefault()
    }
})();