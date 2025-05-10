var DESIGN_POINTS_COLOR = "orange",
    TECHNOLOGY_POINTS_COLOR = "#00BFFF",
    RESEARCH_POINTS_COLOR = "#006AFF",
    BUGS_COLOR = "#FF6A00",
    VisualsManager = {};
(function () {
    var a = VisualsManager,
        b = CanvasManager;
    a.Divisor = 1;
    a.globalOffsetX = 0;
    PlatformShim.ISLOWRES && (a.Divisor = 1.874084919472914);
    a.toScreenCoordinates = function (b, c) {
        var d = isNaN(c) ? 1 : c;
        return Math.round(b / a.Divisor * d)
    };
    var c = createjs.Tween.get;
    createjs.Tween.get = function () {
        var a = c.apply(this, arguments);
        a && (a.gameId = GameManager.gameId);
        return a
    };
    a.stopOldTweens = function () {
        for (var a = createjs.Tween._tweens.filter(function (a) {
            return a.gameId && a.gameId != GameManager.gameId
        }).slice(), b = 0; b < a.length; b++) a[b].setPaused(!0)
    };
    a.gameStatusBar = void 0;
    a.researchPoints = void 0;
    a.reset = function () {
        Sound.pauseAllLoopingFx();
        this.stopOldTweens();
        if (GameManager.company.hwCrew)
            for (var c = 0; c < GameManager.company.hwCrew.length; c++) GameManager.company.hwCrew[c].load();
        if (GameManager.company.rndCrew)
            for (c = 0; c < GameManager.company.rndCrew.length; c++) GameManager.company.rndCrew[c].load();
        a.computerImages = [void 0, void 0, void 0, void 0, void 0];
        a.loadStage(!0);
        a.gameStatusBar || (a.gameStatusBar = new GameStatusBar, b.foregroundStage.addChild(a.gameStatusBar));
        a.gameStatusBar.x = b.foregroundStage.canvas.width / 2 - a.gameStatusBar.width / 2;
        a.gameStatusBar.y = 15;
        a.gameStatusBar.reset();
        a.researchPoints || (a.researchPoints = new PointsDisplayVisual(RESEARCH_POINTS_COLOR, "white", "Research".localize()), b.foregroundStage.addChild(a.researchPoints));
        a.researchPoints.y = 15;
        a.researchPoints.size = 100;
        a.researchPoints.x = a.gameStatusBar.x + a.gameStatusBar.width + 70;
        a.resetAllCharacters();
        a.refreshLabCrew();
        a.updatePoints();
        a.gameStatusBar.updateGameName();
        UI.clearSalesCards();
        UI.clearMaintenanceCards();
        GameManager.company.licencedPlatforms.forEach(function (a) {
            !0 === a.isCustom && (0 < a.nextSalesCash || 0 === a.currentSalesCash) && (UI.addSalesCard(a.id, a.name, a.currentSalesCash, a.unitsSold, a.currentUnitsSold, -1, a.salesCashLog, a.nextSalesCash, Sales.consoleUnitPrice), 0 < a.currentSalesCash && UI.updateMaintenanceCard(a))
        });
        GameManager.company.gameLog.forEach(function (a) {
            a.currentSalesCash < a.totalSalesCash && UI.addSalesCard(a.id, a.title, a.currentSalesCash, a.totalSalesCash, a.unitsSold, a.currentSalesRank,
                a.salesCashLog, a.nextSalesCash, a.unitPrice, a.nextMaintenance, a.maintenanceLog)
        });
        CanvasManager.update(!0, !0);
        a.updateReleaseReadyButton();
        UI.reset()
    };
    a.resetAllCharacters = function () {
        for (var c = b.characterStage.children.slice(), d = 0; d < c.length; d++) b.characterStage.children.remove(c[d]);
        a.characterOverlays = [];
        a.reloadAllCharacters();
        a.refreshTrainingOverlays();
        a.refreshHiringButtons()
    };
    a.removeStaff = function (c) {
        var d = a.characterOverlays.first(function (a) {
            return a.character === c
        });
        a.characterOverlays.remove(d);
        b.characterStage.removeChild(d);
        a.removeComputer(c);
        a.refreshTrainingOverlays();
        a.refreshHiringButtons();
        UI._resetBoostUI()
    };
    a.backgroundImage = void 0;
    a.computerImages = [void 0, void 0, void 0, void 0, void 0];
    a.nextLevel = function () {
        var b = GameManager.company.currentLevel;
        GameManager.pause(!0);
        var c = ResourceKeys.getLevelResources.apply(ResourceKeys, [1, 2, 3, 4].except([b]));
        GameDev.ResourceManager.removeResources(c);
        UI.fadeInTransitionOverlay();
        var d = Date.now(),
            f = function () {
                a.loadStage(!0);
                for (var b = 0; b < a.characterOverlays.length; b++) {
                    var c =
                        a.characterOverlays[b];
                    c.character.visualData = c.saveState();
                    c.parent.removeChild(c)
                }
                a.characterOverlays = [];
                a.reloadAllCharacters();
                a.refreshTrainingOverlays();
                a.refreshHiringButtons();
                if (0 < GameManager.currentResearches.length)
                    for (b = 0; b < GameManager.company.staff.length; b++) GameManager.company.staff[b].state === CharacterState.Researching && VisualsManager.getCharacterOverlay(GameManager.company.staff[b]).startResearching();
                UI._resetBoostUI();
                CanvasManager.update();
                UI.fadeOutTransitionOverlay();
                GameManager.resume(!0)
            };
        FlippingCounter.init();
        GameDev.ResourceManager.ensureResources(ResourceKeys.getLevelResources(b), function () {
            var a = Date.now() - d;
            2E3 > a ? setTimeout(function () {
                f()
            }, 2E3 - a) : f()
        })
    };
    a.addComputer = function (b) {
        if (0 < b.slot) {
            b = b.slot;
            var c = void 0,
                d = 1,
                f = GameManager.company.currentLevel,
                k = 0,
                m = 0,
                u = CanvasManager.globalScale;
            2 === f ? 1 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level2C1], k = 1005, m = 707, d = 4) : 2 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level2C2], k = 880, m = 698) : 3 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level2C3],
                k = 1164, m = 576) : 4 === b && (c = GameDev.ResourceManager.resources[ResourceKeys.Level2C4], k = 1114, m = 511) : 3 === f ? 1 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level3C1], k = 1005, m = 723, d = 4) : 2 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level3C2], k = 878, m = 703) : 3 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level3C3], k = 1159, m = 593) : 4 === b && (c = GameDev.ResourceManager.resources[ResourceKeys.Level3C4], k = 1109, m = 511) : 4 === f && (1 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level4C1], k =
                    463, m = 978, d = 4) : 2 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level4C2], k = 428, m = 756) : 3 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level4C1], k = 745, m = 812) : 4 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level4C2], k = 711, m = 591) : 5 === b ? (c = GameDev.ResourceManager.resources[ResourceKeys.Level4C1], k = 1014, m = 649) : 6 === b && (c = GameDev.ResourceManager.resources[ResourceKeys.Level4C2], k = 981, m = 426));
            k = a.toScreenCoordinates(k, u);
            m = a.toScreenCoordinates(m, u);
            if (c) {
                var f = CanvasManager.backgroundStage,
                    t = f.canvas.width,
                    q = f.canvas.height,
                    v = 1366 / 768,
                    A = 0;
                0.1 < Math.abs(t / q - v) && (v *= q, A = -(v - t) / 2, t = v);
                a.currentXOffset = A;
                v = document.createElement("canvas");
                v.width = t;
                v.height = q;
                v.getContext("2d").drawImage(c, 0, 0, c.width, c.height, A + k, m, Math.floor(c.width * u), Math.floor(c.height * u));
                c = new createjs.Bitmap(v);
                c.width = t;
                c.height = q;
                a.computerImages[b] = c;
                f.children.length >= d - 1 ? f.addChildAt(c, d) : f.addChild(c);
                CanvasManager.invalidateBackground()
            }
        }
    };
    a.removeComputer = function (b) {
        var c = CanvasManager.backgroundStage;
        a.computerImages[b.slot] &&
            (c.removeChild(a.computerImages[b.slot]), a.computerImages[b.slot] = void 0, CanvasManager.invalidateBackground())
    };
    a.getLabSign = function (a, b, c, d, f) {
        var k = new createjs.Container;
        k.x = d;
        k.y = f;
        d = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
        f = 32;
        do {
            var m = "bold {0}pt {1}".format(f, d),
                m = new createjs.Text(a, m, "black");
            f -= 1
        } while ((m.getMeasuredWidth() > b || m.getMeasuredLineHeight() > c) && 1 < f);
        b = f / 32;
        c = createjs.Graphics.getHSL(0, 0, 24);
        m = new createjs.Text(a, "bold 32pt {0}".format(d), c);
        m.textAlign = "center";
        m.textBaseline =
            "middle";
        k.scaleX = b;
        k.scaleY = b;
        k.addChild(m);
        return k
    };
    a.loadStage = function (b) {
        var c = GameManager.company,
            f = CanvasManager.backgroundStage,
            m = CanvasManager.backgroundOverlayStage,
            p = CanvasManager.globalScale,
            s = f.canvas.width,
            u = f.canvas.height,
            t = 1366 / 768,
            q = 0;
        0.1 < Math.abs(s / u - t) && (t *= u, q = -(t - s) / 2, s = t);
        var v = c.currentLevel,
            A;
        a.toScreenCoordinates(2921);
        var z = a.toScreenCoordinates(39),
            B;
        a.toScreenCoordinates(4156);
        var t = a.toScreenCoordinates(47),
            D = GameDev.ResourceManager.resources[ResourceKeys.Level1],
            E =
                a.toScreenCoordinates(563),
            w = a.toScreenCoordinates(217);
        2 === v ? (D = GameDev.ResourceManager.resources[ResourceKeys.Level2], E = a.toScreenCoordinates(83), w = a.toScreenCoordinates(54)) : 3 === v ? (D = GameDev.ResourceManager.resources[ResourceKeys.Level3], E = a.toScreenCoordinates(83), w = a.toScreenCoordinates(54)) : 4 === v && (D = GameDev.ResourceManager.resources[ResourceKeys.Level4], E = a.toScreenCoordinates(367), w = a.toScreenCoordinates(39), GameManager.company.flags.rndLabUnlocked || (B = GameDev.ResourceManager.resources[ResourceKeys.Level4LockedRight]),
            GameManager.company.flags.hwLabUnlocked || (A = GameDev.ResourceManager.resources[ResourceKeys.Level4LockedLeft]), a.toScreenCoordinates(2560));
        if (!a.backgroundImage || a.backgroundImage.width != s || a.backgroundImage.height != u || a.currentXOffset != q || b) {
            f.removeAllChildren();
            m.removeAllChildren();
            k = void 0;
            a.currentXOffset = q;
            b = document.createElement("canvas");
            b.width = s;
            b.height = u;
            var F = b.getContext("2d");
            4 === v ? F.drawImage(D, a.toScreenCoordinates(2193), 0, a.toScreenCoordinates(2560), a.toScreenCoordinates(1384),
                0, Math.floor(w * p), Math.floor(a.toScreenCoordinates(2560) * p), Math.floor(a.toScreenCoordinates(1384) * p)) : F.drawImage(D, 0, 0, D.width, D.height, Math.floor(E * p), Math.floor(w * p), Math.floor(D.width * p), Math.floor(D.height * p));
            A && (F.clearRect(q, z * p, (A.width - 5) * p, A.height * p), F.drawImage(A, 0, 0, A.width, A.height, q, z * p, (A.width - 4) * p, A.height * p));
            B && (F.clearRect(Math.floor((a.toScreenCoordinates(2590) - B.width) * p), Math.floor((t - 1) * p), Math.floor(B.width * p), Math.floor(B.height * p)), F.drawImage(B, 0, 0, B.width, B.height,
                Math.floor((a.toScreenCoordinates(2588) - B.width) * p), Math.floor(t * p), Math.floor(B.width * p), Math.floor(B.height * p)));
            q = new createjs.Bitmap(b);
            q.width = s;
            q.height = u;
            a.backgroundImage = q;
            f.addChildAt(q, 0);
            a.updateComputers();
            CanvasManager.leftScreen.backgroundStage.removeAllChildren();
            CanvasManager.leftScreen.backgroundOverlayStage.removeAllChildren();
            CanvasManager.leftScreen.invalidateBackground();
            CanvasManager.rightScreen.backgroundStage.removeAllChildren();
            CanvasManager.rightScreen.backgroundOverlayStage.removeAllChildren();
            CanvasManager.rightScreen.invalidateBackground();
            a.levelOverlay = new LevelOverlay(c);
            if (4 === v) {
                c = document.createElement("canvas");
                c.width = s;
                c.height = u;
                var f = c.getContext("2d"),
                    C;
                A || (f.drawImage(D, 0, 0, 2560 / a.Divisor - E, 1384 / a.Divisor, E * p, w * p, (2560 / a.Divisor - E) * p, 1384 / a.Divisor * p), C = a.getLabSign("Hardware lab".localize(), a.toScreenCoordinates(264, p), a.toScreenCoordinates(54, p), a.toScreenCoordinates(1878, p), a.toScreenCoordinates(145, p)));
                A = new createjs.Bitmap(c);
                A.width = s;
                A.heigth = u;
                CanvasManager.leftScreen.backgroundStage.addChildAt(A,
                    0);
                CanvasManager.leftScreen.backgroundOverlayStage.addChild(a.levelOverlay.leftOverlay);
                C && CanvasManager.leftScreen.backgroundOverlayStage.addChild(C);
                C = document.createElement("canvas");
                C.width = s;
                C.height = u;
                A = C.getContext("2d");
                var J;
                B ? A.drawImage(B, a.toScreenCoordinates(596), 0, a.toScreenCoordinates(29), B.height, 0, t * p, a.toScreenCoordinates(29, p), B.height * p) : (A.drawImage(D, a.toScreenCoordinates(2560, 2) - E, 0, D.width - (a.toScreenCoordinates(2560, 2) - E), D.height, 0, w * p, (D.width - (2560 / a.Divisor * 2 - E)) * p, D.height *
                    p), J = a.getLabSign("R&D lab".localize(), a.toScreenCoordinates(264, p), a.toScreenCoordinates(54, p), a.toScreenCoordinates(690, p), a.toScreenCoordinates(138, p)));
                p = new createjs.Bitmap(C);
                p.width = s;
                p.heigth = u;
                CanvasManager.rightScreen.backgroundStage.addChildAt(p, 0);
                CanvasManager.rightScreen.backgroundOverlayStage.addChild(a.levelOverlay.rightOverlay);
                J && CanvasManager.rightScreen.backgroundOverlayStage.addChild(J)
            }
            m.addChild(a.levelOverlay.centerOverlay)
        }
        a.updateCompanyNameInOffice();
        CanvasManager.invalidateBackground();
        a.scrollToZone(GameManager.company.flags.currentZone);
        d()
    };
    a.installAirCon = function () {
        a.levelOverlay.startAirCon1();
        a.levelOverlay.startAirCon2()
    };
    var f = !1,
        d = function () {
            f || (f = !0, $("#gameContainerWrapper").wipetouch({
                tapToClick: !1,
                wipeLeft: function (a) {
                    VisualsManager.scrollToNextZone(1)
                },
                wipeRight: function (a) {
                    VisualsManager.scrollToNextZone(-1)
                },
                wipeMove: function (b) {
                    if ((!document.activeElement || !$(document.activeElement).hasClass("ui-slider-handle")) && b.dX) {
                        a.lastMove = Date.now();
                        var c = $("#canvasScrollContainer").width(),
                            d = CanvasManager.backgroundStage.canvas.width,
                            f = GameManager.company;
                        if (f && 4 == f.currentLevel || c < d) diff = c - d, c = $("#innerCanvasContainer").offset().left - a.globalOffsetX, c += b.dX, CanvasManager.zone0Activ = c > -d, CanvasManager.zone1Activ = c > -2 * d && c <= diff, CanvasManager.zone2Activ = c > -3 * d && c <= diff - d, $("#innerCanvasContainer").css("left", c + "px")
                    }
                }
            }), $("a").live("touchend", function (a) {
                location.href = $(this).attr("href")
            }))
        };
    a.scrollToNextZone = function (b) {
        if (GameManager.company) {
            var c = GameManager.company.flags.currentZone;
            void 0 === c && (c = 1);
            c = (c + b).clamp(0, 2);
            4 != GameManager.company.currentLevel ? c = 1 : (GameManager.company.flags.hwLabUnlocked || (c = c.clamp(1, 2)), GameManager.company.flags.rndLabUnlocked || (c = c.clamp(0, 1)));
            a.scrollToZone(c, !0)
        }
    };
    a.scrollToZone = function (b, c) {
        var d = CanvasManager.backgroundStage.canvas.width;
        void 0 === b && (b = 1);
        var f = 0 == b ? a.toScreenCoordinates(270) : 1 == b ? a.toScreenCoordinates(2560) : a.toScreenCoordinates(4760),
            f = f * CanvasManager.globalScale,
            k = $("#canvasScrollContainer").width(),
            d = Math.abs(k - d) / 2,
            d =
                f + d * b;
        $("#innerCanvasContainer").offset().left != d && (f = c ? a.toScreenCoordinates(600) : 0, a.isAnimatingScroll = !0, $("#innerCanvasContainer").transition({
            left: -d
        }, f), setTimeout(function () {
            a.isAnimatingScroll = !1
        }, f));
        a._zoneChanged(b, c);
        GameManager.company.flags.currentZone = b
    };
    a.updateComputers = function () {
        GameManager.company.staff.slice().sort(function (a, b) {
            return a.slot - b.slot
        }).forEach(function (b) {
            a.addComputer(b)
        })
    };
    var k;
    a.updateCompanyNameInOffice = function () {
        var b = GameManager.company.currentLevel;
        1 !=
            b && (k || (k = new IsometricCompanyNameVisual, CanvasManager.backgroundStage.addChild(k)), k.updateVisual(2 == b), 2 === b || 3 == b ? (k.x = a.toScreenCoordinates(690, CanvasManager.globalScale), k.y = a.toScreenCoordinates(1100, CanvasManager.globalScale)) : 4 == b && (k.x = a.toScreenCoordinates(1410, CanvasManager.globalScale), k.y = a.toScreenCoordinates(300, CanvasManager.globalScale), k.scaleX *= 0.8, k.scaleY *= 0.8), k.x += a.currentXOffset)
    };
    a.startCreateEngine = function () {
        a.gameStatusBar.startEngine();
        a.updatePoints()
    };
    a.startContract =
        function () {
            a.gameStatusBar.startContract();
            a.updatePoints()
        };
    a.updateEngineStatus = function () {
        var b = GameManager.currentEngineDev;
        a.gameStatusBar.updateProgress(b.progress, !0, 100);
        a.gameStatusBar.updateStatusMessage(b.currentPart.name)
    };
    a.finishEngine = function () {
        a.gameStatusBar.finishEngine();
        GameManager.spawnedPoints = 0
    };
    a.updatePoints = function () {
        a.gameStatusBar.updatePoints();
        a.researchPoints.updatePoints(GameManager.company.researchPoints)
    };
    a.pulsePointsDisplay = function (b, c) {
        "r" === b ? a.researchPoints.pulse(c) :
            a.gameStatusBar.pulsePointsDisplay(b, c)
    };
    a.getGlobalLocationOfPointsDisplay = function (b) {
        return "r" === b ? {
            x: a.researchPoints.x + a.researchPoints.size / 2,
            y: a.researchPoints.y + a.researchPoints.size / 2
        } : a.gameStatusBar.getGlobalLocationOfPointsDisplay(b)
    };
    a.reloadAllCharacters = function () {
        if (GameManager.company && GameManager.company.staff)
            for (var b = GameManager.company.staff, c = 0; c < b.length; c++) {
                var d = b[c];
                a.getCharacterOverlay(d);
                d.refreshPoints()
            }
    };
    a.characterOverlays = [];
    a.getCharacterOverlay = function (b, c) {
        var d =
            a.characterOverlays.first(function (a) {
                return a.character === b
            });
        return d || c ? d : a.createCharacterOverlay(b)
    };
    a.getCurrentPosition = function (b, c) {
        var d = {};
        1 === b && (d.x = 998 * CanvasManager.globalScale, d.y = 599 * CanvasManager.globalScale);
        2 === b || 3 === b ? 0 === c ? (d.x = 1515 * CanvasManager.globalScale, d.y = 995 * CanvasManager.globalScale) : 1 === c ? (d.x = 1055 * CanvasManager.globalScale, d.y = 790 * CanvasManager.globalScale) : 2 === c ? (d.x = 803 * CanvasManager.globalScale, d.y = 589 * CanvasManager.globalScale) : 3 === c ? (d.x = 1283 * CanvasManager.globalScale,
            d.y = 658 * CanvasManager.globalScale) : 4 === c && (d.x = 1036 * CanvasManager.globalScale, d.y = 451 * CanvasManager.globalScale) : 4 === b && (0 === c ? (d.x = 1565 * CanvasManager.globalScale, d.y = 915 * CanvasManager.globalScale) : 1 === c ? (d.x = 516 * CanvasManager.globalScale, d.y = 1023 * CanvasManager.globalScale) : 2 === c ? (d.x = 436 * CanvasManager.globalScale, d.y = 711 * CanvasManager.globalScale) : 3 === c ? (d.x = 798 * CanvasManager.globalScale, d.y = 857 * CanvasManager.globalScale) : 4 === c ? (d.x = 719 * CanvasManager.globalScale, d.y = 547 * CanvasManager.globalScale) :
                5 === c ? (d.x = 1067 * CanvasManager.globalScale, d.y = 694 * CanvasManager.globalScale) : 6 === c && (d.x = 989 * CanvasManager.globalScale, d.y = 382 * CanvasManager.globalScale));
        d.x = a.toScreenCoordinates(d.x);
        d.y = a.toScreenCoordinates(d.y);
        d.x += a.currentXOffset;
        return d
    };
    a.positionCharacterOverlay = function (b, c, d) {
        var f = a.getCurrentPosition(c, d);
        b.x = f.x;
        b.y = f.y;
        a.updateImages(b, c, d)
    };
    a.updateImages = function (b, c, d) {
        var f = 200;
        PlatformShim.ISLOWRES && (f = 107);
        var k = CanvasManager.globalScale;
        if (2 === d || 4 === d || 6 == d) 2 === c ? (b.deskImage =
            a.getSubImage(b.x - 807 / a.Divisor * k, b.y - 527 / a.Divisor * k, f, f, ResourceKeys.Level2Desk), 2 === d ? (b.keyBoardImage = a.getSubImage(b.x - 889 / a.Divisor * k, b.y - 716 / a.Divisor * k, f, f, ResourceKeys.Level2C2Keyboard), b.pcImage = a.getSubImage(b.x - 880 / a.Divisor * k, b.y - 698 / a.Divisor * k, f, f, ResourceKeys.Level2C2)) : (b.keyBoardImage = a.getSubImage(b.x - 1117 / a.Divisor * k, b.y - 582 / a.Divisor * k, f, f, ResourceKeys.Level2C2Keyboard), b.pcImage = a.getSubImage(b.x - 1114 / a.Divisor * k, b.y - 511 / a.Divisor * k, f, f, ResourceKeys.Level2C4))) : 3 === c ? (b.deskImage =
                a.getSubImage(b.x - 807 / a.Divisor * k, b.y - 527 / a.Divisor * k, f, f, ResourceKeys.Level3Desk), 2 === d ? (b.keyBoardImage = a.getSubImage(b.x - 893 / a.Divisor * k, b.y - 713 / a.Divisor * k, f, f, ResourceKeys.Level3C2Keyboard), b.pcImage = a.getSubImage(b.x - 878 / a.Divisor * k, b.y - 703 / a.Divisor * k, f, f, ResourceKeys.Level3C2)) : (b.keyBoardImage = a.getSubImage(b.x - 1130 / a.Divisor * k, b.y - 578 / a.Divisor * k, f, f, ResourceKeys.Level3C2Keyboard), b.pcImage = a.getSubImage(b.x - 1109 / a.Divisor * k, b.y - 511 / a.Divisor * k, f, f, ResourceKeys.Level3C4))) : 4 === c && (b.deskImage =
                    a.getSubImage(b.x - 427 / a.Divisor * k, b.y - 460 / a.Divisor * k, f, f, ResourceKeys.Level4Desk), 2 === d ? (b.keyBoardImage = a.getSubImage(b.x - 541 / a.Divisor * k, b.y - 840 / a.Divisor * k, f, f, ResourceKeys.Level4C2Keyboard), b.pcImage = a.getSubImage(b.x - 428 / a.Divisor * k, b.y - 756 / a.Divisor * k, f, f, ResourceKeys.Level4C2)) : 4 === d ? (b.keyBoardImage = a.getSubImage(b.x - 824 / a.Divisor * k, b.y - 676 / a.Divisor * k, f, f, ResourceKeys.Level4C2Keyboard), b.pcImage = a.getSubImage(b.x - 711 / a.Divisor * k, b.y - 591 / a.Divisor * k, f, f, ResourceKeys.Level4C2)) : 6 === d && (b.keyBoardImage =
                        a.getSubImage(b.x - 1094 / a.Divisor * k, b.y - 511 / a.Divisor * k, f, f, ResourceKeys.Level4C2Keyboard), b.pcImage = a.getSubImage(b.x - 981 / a.Divisor * k, b.y - 426 / a.Divisor * k, f, f, ResourceKeys.Level4C2)))
    };
    a.getSubImage = function (b, c, d, f, k) {
        var m = document.createElement("canvas");
        m.width = d;
        m.height = f;
        m.getContext("2d").drawImage(GameDev.ResourceManager.resources[k], -((b - a.currentXOffset) / CanvasManager.globalScale), -c / CanvasManager.globalScale);
        b = new Image;
        b.src = m.toDataURL("image/png");
        return b
    };
    a.refreshHiringButtons = function () {
        var b =
            $("#canvasContainer");
        b.find(".hireStaffButtonBase").remove();
        var c = GameManager.company.currentLevel,
            d = GameManager.company.staff;
        if (1 < c && (2 != c && 3 != c || 5 != d.length) && !(3 < c && 7 == d.length)) {
            var f = [1, 2, 3, 4, 5, 6].first(function (a) {
                return !d.some(function (b) {
                    return b.slot == a
                })
            }),
                c = a.createHireButton(c, f);
            b.append(c);
            UI.maxFont("bold", b.find(".hireButtonLabel"), 12)
        }
    };
    var m;
    a.updateReleaseReadyButton = function () {
        m || (m = $('<div id="releaseButton" class="selectorButton greenButton windowStyleHideState" style="position:absolute; opacity=0;">' +
            "Finish".localize("button") + "</div>"), m.gdIsActive = !1, $("#canvasContainer").append(m));
        var a = m.parent().width();
        m.css({
            left: a / 2 - m.width() / 2 + "px"
        });
        a = GameManager.company && GameManager.company.currentGame && !GameManager.company.currentGame.flags.devCompleted && GameManager.company.currentGame.flags.releaseReady;
        if (a != m.gdIsActive) {
            m.gdIsActive = a;
            var b = function () {
                m.transition({
                    opacity: 0
                }, 200);
                m.removeClass("windowStyleShowState").addClass("windowStyleHideState");
                m.gdIsActive = !1
            };
            a ? (m.transition({
                opacity: 1
            },
                200), m.removeClass("windowStyleHideState"), Sound.playSoundOnce("gameReady", 0.2), m.clickExclOnce(function (a) {
                    Sound.click();
                    b();
                    GameManager.currentFeature && (GameManager.currentFeature.progress = 1);
                    GameManager.company.currentGame && (GameManager.company.currentGame.flags.finished = !0);
                    return !1
                })) : b()
        }
    };
    a.createHireButton = function (b, c) {
        var d = $(PlatformShim.toStaticHtml('<div class="hireStaffButtonBase hireStaffButton"><div class="hireButtonLabel">' + "Fill Position".localize() + '</div><div class="hireStaffProgress"></div></div>')),
            f = 0,
            k = 0;
        if (2 === b || 3 === b) switch (c) {
            case 1:
                f = 1060;
                k = 840;
                break;
            case 2:
                f = 880;
                k = 720;
                break;
            case 3:
                f = 1290;
                k = 720;
                break;
            case 4:
                f = 1130, k = 580
        }
        if (4 === b) switch (c) {
            case 1:
                f = 480;
                k = 1040;
                break;
            case 2:
                f = 480;
                k = 850;
                break;
            case 3:
                f = 750;
                k = 920;
                break;
            case 4:
                f = 780;
                k = 680;
                break;
            case 5:
                f = 1050;
                k = 730;
                break;
            case 6:
                f = 1E3, k = 500
        }
        f = a.toScreenCoordinates(f, CanvasManager.globalScale);
        k = a.toScreenCoordinates(k, CanvasManager.globalScale);
        f += a.currentXOffset;
        d.css({
            position: "absolute",
            top: k + "px",
            left: f + "px"
        });
        d.clickExcl(function () {
            Sound.click();
            1 == GameManager.company.maxStaff ? (GameManager.company.activeNotifications.insertAt(0, new Notification("Hint".localize(), "You have to complete the Staff Management training before you can hire someone. Simply {0} on your player character to access the training menu.".localize().format(Tutorial.getClickVerb()))), GameManager.showPendingNotifications()) : UI.isStaffSearchInProgress() || (1 < GameManager.company.staff.length ? Tutorial.hireMoreStaff() : Tutorial.findStaff(), UI.showFindStaffWindow(c));
            window.event.cancelBubble = !0
        });
        return d
    };
    a.createCharacterOverlay = function (c) {
        var d = b.characterStage,
            f = new CharacterOverlay(c);
        a.positionCharacterOverlay(f, GameManager.company.currentLevel, c.slot);
        a.characterOverlays.push(f);
        a.addCharacterOverlayToStage(d, f);
        return f
    };
    a.addCharacterOverlayToStage = function (a, b) {
        var c = b.character.slot;
        if (0 === c) a.addChild(b);
        else
            for (var d = 0; d < a.children.length; d++)
                if (a.children[d].character)
                    if (4 === c || 6 === c || 3 === c || 5 === c) {
                        a.addChildAt(b, 0);
                        break
                    } else if (1 === c && 1 > a.children[d].character.slot ||
                        2 === c && 4 > a.children[d].character.slot || 3 === c && 2 > a.children[d].character.slot) {
                        a.addChildAt(b, d);
                        break
                    } else if (4 < c) {
                        a.addChild(b);
                        break
                    }
    };
    a.refreshTrainingOverlays = function () {
        var b = $("#canvasContainer");
        b.find(".trainingOverlayTemplate").remove();
        for (var c = 0; c < a.characterOverlays.length; c++) {
            var d = a.characterOverlays[c],
                f = $("#trainingOverlayTemplate").clone();
            f.removeAttr("id");
            var k = GameFlags.IS_LOW_RES ? -30 : 0;
            f.css({
                position: "absolute",
                top: d.y - VisualsManager.toScreenCoordinates(120, CanvasManager.globalScale) +
                    "px",
                left: d.x - VisualsManager.toScreenCoordinates(60, CanvasManager.globalScale) + k + "px",
                transform: "scale({0},{0})".format(CanvasManager.globalScaleIgnoringLowResBackground)
            });
            d.trainingOverlay = f;
            b.append(f);
            f.hide();
            d.resumeTraining()
        }
    };
    a.handleUltraWideMonitors = function (b, c) {
        if (b / c > 16 / 9) {
            var d = b / (b / c) * (b / c - 16 / 9);
            $("#gameContainerWrapper").css({
                left: d / 2 + "px",
                width: b - d + "px"
            });
            a.globalOffsetX = d / 2
        } else $("#gameContainerWrapper").css({
            left: "0px",
            width: "100%"
        }), a.globalOffsetX = 0
    }
})();
(function () {
    var a = VisualsManager,
        b = [];
    a.refreshLabCrew = function () {
        b && (b.forEach(function (a) {
            a.parent.removeChild(a)
        }), b = []);
        d();
        l();
        4 == GameManager.company.currentLevel && a._zoneChanged(GameManager.company.flags.currentZone, !1)
    };
    var c = function (a) {
        var b = $("#projectStatusCardTemplate").clone();
        b[0].id = void 0;
        b.find(".projectBudgetSlider").slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: a,
            animate: "fast",
            slide: function (a, c) {
                var d = $(c.handle).closest(".projectBudgetSlider");
                if (!d.hasClass("projectBudgetSlider")) throw "couldn't find target slider";
                b._gd_sliderValue = c.value;
                d.slider("value", c.value);
                d = c.value;
                b.hasClass("rndCard") ? GameManager.company.flags.rndBudget = d / 100 : GameManager.company.flags.hwBudget = d / 100;
                n(b)
            }
        });
        return b
    },
        f, d = function () {
            var d = GameManager.company;
            if (!f) {
                var g = d.flags.hwBudget;
                void 0 == g && (g = 0);
                f = c(100 * g);
                f.addClass("projectCardLeft").addClass("hwCard");
                f.find(".projectCardLabel").text("Hardware lab".localize());
                f.clickExcl(function () {
                    a.scrollToZone(0, !0)
                });
                f.insertBefore("#consoleMaintenanceContainer");
                f._gd_projectVisible = !0
            }
            if (4 > d.currentLevel || !d.flags.hwLabUnlocked) f.hide();
            else {
                f.show();
                n(f, GameManager.currentHwProject);
                d.hwCrew || (d.hwCrew = []);
                for (var l = d.hwCrew, m = GameManager.getMaxHwBudget(), g = CanvasManager.leftScreen.characterStage, t = [], q = 0; 12 >= q; q++) {
                    l.length < q + 1 && (l.push(new ProjectWorkerVisual), l[q].zone = 0, l[q].setPosition(q), l[q].loadAnimations());
                    var v = l[q];
                    v.getCurrentProject = function () {
                        return GameManager.currentHwProject
                    };
                    (function (a, b) {
                        a.getAffordanceFactor = function () {
                            return k(m * d.flags.hwBudget, b)
                        }
                    })(v,
                        m / 12 * (q + 1));
                    3 == q || 7 == q ? t.push(v) : (g.addChild(v), b.push(v))
                }
                q = 0;
                for (l = t.length; q < l; q++) g.addChild(t[q]), b.push(t[q]);
                a.putConsoleToPedestal()
            }
        };
    a.putConsoleToPedestal = function () {
        var b = GameManager.company;
        if (4 === b.currentLevel && b.flags.hwLabUnlocked) {
            a.consoleContainer && CanvasManager.leftScreen.backgroundOverlayStage.contains(a.consoleContainer) && CanvasManager.leftScreen.backgroundOverlayStage.removeChild(a.consoleContainer);
            var c = void 0,
                d = void 0;
            if (GameManager.currentHwProject && "custom console" ===
                GameManager.currentHwProject.id) c = {
                    iconUri: GameManager.currentHwProject.iconUri
                };
            else if (d = b.licencedPlatforms.filter(function (a) {
                return a.isCustom
            }), d.length) c = d.last();
            else if ((d = b.currentGame) && 0 < d.platforms.length && "PC" != d.platforms[0].id && "G64" != d.platforms[0].id && "Gameling" != d.platforms[0].id && "Vena Gear" != d.platforms[0].id && "PPS" != d.platforms[0].id && "GS" != d.platforms[0].id && "grPhone" != d.platforms[0].id) c = b.currentGame.platforms[0];
            else
                for (d = b.gameLog.length - 1; 0 < d; d--) {
                    var f = b.gameLog[d].platforms;
                    if ("PC" != f[0].id && "G64" != f[0].id && "Gameling" != f[0].id && "Vena Gear" != f[0].id && "PPS" != f[0].id && "GS" != f[0].id && "grPhone" != f[0].id) {
                        c = f[0];
                        break
                    }
                }
            c && (d = Platforms.getPlatformImage(c, b.currentWeek), b = new createjs.Bitmap(d), c = new createjs.Container, d = CanvasManager.globalScale, c.scaleX = 0.45 * d, c.scaleY = 0.45 * d, c.x = 2230 * d, c.y = 1104 * d, c.addChild(b), a.consoleContainer = c, CanvasManager.leftScreen.backgroundOverlayStage.addChild(a.consoleContainer))
        }
    };
    var k = function (a, b) {
        if (0 === a) return -4;
        var c = a / b;
        1 > c && (c = -1 + c);
        return c
    },
        m, l = function () {
            var d = GameManager.company;
            if (!m) {
                var f = d.flags.rndBudget;
                void 0 == f && (f = 0);
                m = c(100 * f);
                m.addClass("projectCardRight").addClass("rndCard");
                m.find(".projectCardLabel").text("R&D lab".localize());
                m.clickExcl(function () {
                    a.scrollToZone(2, !0)
                });
                $("#gameUIContainer").append(m);
                m._gd_projectVisible = !0
            }
            if (4 > GameManager.company.currentLevel || !d.flags.rndLabUnlocked) m.hide();
            else {
                m.show();
                n(m, GameManager.currentRnDProject);
                d.rndCrew || (d.rndCrew = []);
                for (var g = d.rndCrew, l = GameManager.getMaxRndBudget(),
                    f = CanvasManager.rightScreen.characterStage, t = [], q = 0; 12 >= q; q++) {
                    g.length < q + 1 && (g.push(new ProjectWorkerVisual), g[q].zone = 2, g[q].setPosition(q), g[q].loadAnimations());
                    var v = g[q];
                    v.getCurrentProject = function () {
                        return GameManager.currentRnDProject
                    };
                    (function (a, b) {
                        a.getAffordanceFactor = function () {
                            return k(l * d.flags.rndBudget, b)
                        }
                    })(v, l / 12 * (q + 1));
                    5 === q || 7 === q ? t.push(v) : (f.addChild(v), b.push(v))
                }
                q = 0;
                for (g = t.length; q < g; q++) f.addChild(t[q]), b.push(t[q])
            }
        };
    a._zoneChanged = function (a, b) {
        var c = b ? "normal" : 0;
        CanvasManager.zone0Activ =
            0 === a;
        CanvasManager.zone1Activ = 1 === a;
        CanvasManager.zone2Activ = 2 === a;
        2 != a && m && (m.find(".projectBudgetSlider").slideUp(c), m.find(".projectCardLabel").slideDown(c));
        2 == a && m && (m.find(".projectBudgetSlider").slideDown(c), m.find(".projectCardLabel").slideUp(c));
        0 != a && f && (f.find(".projectBudgetSlider").slideUp(c), f.find(".projectCardLabel").slideDown(c));
        0 == a && f && (f.find(".projectBudgetSlider").slideDown(c), f.find(".projectCardLabel").slideUp(c));
        g();
        2 == a ? Media.enterRndLab(GameManager.company) : 0 == a && Media.enterHwLab(GameManager.company)
    };
    var g = function () {
        var a = CanvasManager.isSmallScreen;
        if (m) {
            var b = a && GameManager.currentRnDProject;
            b && !m.hasClass("small") ? m.addClass("small") : !b && m.hasClass("small") && m.removeClass("small")
        }
        f && ((b = a && GameManager.currentHwProject) && !f.hasClass("small") ? f.addClass("small") : !b && f.hasClass("small") && f.removeClass("small"))
    },
        n = function (a) {
            if (a) {
                var b = GameManager.company;
                if (b) {
                    var c = 100 * b.flags.hwBudget,
                        d = GameManager.getLabCostPerMonth(0),
                        f = GameManager.currentHwProject;
                    a.hasClass("rndCard") && (f = GameManager.currentRnDProject,
                        d = GameManager.getLabCostPerMonth(2), c = 100 * b.flags.rndBudget);
                    !f && a._gd_projectVisible ? (a.find(".projectStatusContainer").slideUp(), a._gd_projectVisible = !1) : f && (a._gd_projectVisible || (a.find(".projectStatusContainer").slideDown(), a._gd_projectVisible = !0), a._gd_iconUrl != f.iconUri && (a.find(".projectIcon").attr("src", f.iconUri), a._gd_iconUrl = f.iconUri), a._gd_title != f.name && (b = a.find(".projectTitle"), UI.maxFont("bold", b, 20, f.name), a._gd_title = f.name), a._gd_progress != f.progress && (a.find(".projectProgress").stop().transit({
                        width: 100 *
                            f.progress + "%"
                    }), a._gd_progress = f.progress), a._gd_pointsRemaining != f.remainingPoints && (a.find(".projectPointsRemaining").text(f.startPoints - f.remainingPoints), a._gd_pointsRemaining = f.remainingPoints));
                    a._gd_budget !== d && (a.find(".projectBudgetValue").text("{0} per month".localize().format(UI.getShortNumberString(d))), a._gd_budget = d);
                    Math.round(a._gd_sliderValue) != Math.round(c) && (a.find(".projectBudgetSlider").slider({
                        value: c
                    }), a._gd_sliderValue = c);
                    g()
                }
            }
        };
    a.updateProjectStatusCards = function () {
        GameManager.company.flags.hwLabUnlocked &&
            n(f);
        GameManager.company.flags.rndLabUnlocked && n(m)
    }
})();