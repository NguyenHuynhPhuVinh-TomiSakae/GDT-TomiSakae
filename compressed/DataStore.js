var DataStore = {};
SaveMismatchStrategy = {
    AskPlayer: "AskPlayer",
    UseLocal: "UseLocal",
    UseCloud: "UseCloud"
};
(function () {
    var a = {};
    (function () {
        a.setValue = function (a, b) { };
        a.getValue = function (a) {
            return null
        };
        a.saveToSlotAsync = function (a, b, g, d) {
            g()
        };
        a.loadSlotAsync = function (a, b, g) { };
        a.saveCanvasToFile = function (a, b, g, d) { }
    })();
    if (PlatformShim.ISWIN8) {
        var b = {};
        (function () {
            var a = Windows.Storage.ApplicationData.current.roamingSettings,
                l = Windows.Storage.ApplicationData.current.roamingFolder;
            b.setValue = function (b, g) {
                a.values[b] = g
            };
            b.getValue = function (b) {
                return a.values[b]
            };
            b.saveToSlotAsync = function (a, b, d, c) {
                l.createFileAsync(a,
                    Windows.Storage.CreationCollisionOption.replaceExisting).then(function (l) {
                        Windows.Storage.FileIO.writeTextAsync(l, b).then(function () {
                            try {
                                var l = g(b);
                                DataStore.setValue("hash" + a, l)
                            } catch (c) {
                                Logger.LogInfo("hash save failed", c)
                            }
                            DataStore.saveSettings();
                            d && d()
                        }, function (a) {
                            ghg4.ghg5("save-error", {
                                method: "writeTextAsync",
                                "error-nr": a ? a.number : null
                            });
                            c && c(a)
                        })
                    }, function (a) {
                        ghg4.ghg5("save-error", {
                            method: "createFileAsync",
                            "error-nr": a ? a.number : null
                        });
                        c && c(a)
                    })
            };
            var g = function (a) {
                var b = Windows.Security.Cryptography.Core.HashAlgorithmProvider.openAlgorithm("SHA256");
                a = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(a, Windows.Security.Cryptography.BinaryStringEncoding.utf8);
                b = b.hashData(a);
                return Windows.Security.Cryptography.CryptographicBuffer.encodeToHexString(b)
            };
            b.loadSlotAsync = function (a, b, d) {
                l.getFileAsync(a).then(function (l) {
                    l || d();
                    Windows.Storage.FileIO.readTextAsync(l).then(function (l) {
                        var c, k;
                        try {
                            (c = DataStore.getValue("hash" + a)) && (k = g(l))
                        } catch (f) {
                            Logger.LogInfo("hash load failed", f)
                        }
                        c == k || DataStore.remoteSettings.ignoreHashMismatch ?
                            b(l) : (ghg4.ghg5("load game error", {
                                reason: "hash mismatch"
                            }), d("save file corrupt"))
                    }, d)
                }, d)
            };
            b.saveCanvasToFile = function (a, b, g, l) {
                Windows.Storage.ApplicationData.current.localFolder.createFileAsync(b, Windows.Storage.CreationCollisionOption.replaceExisting).then(function (b) {
                    d(a, b, g, l)
                })
            };
            var d = function (a, b, g, l) {
                var d = a.msToBlob(),
                    c = d.msDetachStream().getInputStreamAt(0);
                b.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (a) {
                    return Windows.Storage.Streams.RandomAccessStream.copyAsync(c,
                        a).then(function () {
                            a.flushAsync().then(function () {
                                a.close();
                                c.close();
                                d.msClose();
                                g && g()
                            }, l)
                        }, l)
                }, l)
            }
        })();
        DataStore = b
    } else {
        var c;
        try {
            c = "localStorage" in window && null !== window.localStorage
        } catch (f) {
            Logger.LogInfo("local storage check failed", f), c = !1
        }
        if (c) {
            var d = {};
            (function () {
                d.setValue = function (a, b) {
                    window.localStorage.setItem(a, b)
                };
                d.getValue = function (a) {
                    return window.localStorage.getItem(a)
                };
                d.saveToSlotAsync = function (a, b, g, c) {
                    try {
                        d.setValue("slot_" + a, b)
                    } catch (k) {
                        Logger.LogWarning("Save failed",
                            k, "Save failed".localize());
                        c(k);
                        return
                    }
                    g && g()
                };
                d.loadSlotAsync = function (a, b, g) {
                    try {
                        b(d.getValue("slot_" + a))
                    } catch (c) {
                        Logger.LogWarning("Load failed", c, "Load failed".localize()), g(c)
                    }
                };
                d.saveCanvasToFile = function (a, b, g, d) {
                    d()
                }
            })();
            DataStore = d;
            if (Steam && Steam.isAvailable && Steam.isAvailable()) {
                var k = {};
                (function () {
                    function a(b, g, l, c) {
                        d.loadSlotAsync(b, function (a) {
                            Steam.readTextFromFile(g, function (b) {
                                l(Knowledge.merge(a, b))
                            }, function (b) {
                                l(a)
                            })
                        }, function (a) {
                            Steam.readTextFromFile(g, l, c)
                        })
                    }
                    var b = d.getValue("general");
                    b ? b = JSON.parse(b) : (b = {
                        version: 1
                    }, d.setValue("general", JSON.stringify(b)));
                    var g = !1,
                        c;
                    k.setValue = function (a, k) {
                        b[a] = k;
                        b.version++;
                        c && (c[a] = k, c.version++);
                        d && d.setValue(a, k);
                        g = !0
                    };
                    k.getValue = function (a, g) {
                        return c && c.version && c.version > b.version && c[a] ? c[a] : b[a] ? b[a] : d.getValue(a)
                    };
                    var f = function (a) {
                        !b[a] && c[a] && (b[a] = c[a]);
                        !b[a + "L1"] && c[a + "L1"] && (b[a + "L1"] = c[a + "L1"]);
                        !b[a + "L2"] && c[a + "L2"] && (b[a + "L2"] = c[a + "L2"]);
                        !b[a + "L3"] && c[a + "L3"] && (b[a + "L3"] = c[a + "L3"]);
                        !b[a + "L4"] && c[a + "L4"] && (b[a + "L4"] = c[a + "L4"]);
                        !b[a + "L5"] && c[a + "L5"] && (b[a + "L5"] = c[a + "L5"])
                    };
                    k.init = function (a) {
                        Steam.readTextFromFile("general", function (d) {
                            try {
                                (c = JSON.parse(d)) && c.version && c.version != b.version && (DataStore.initSettings(), DataStore.initRemoteSettings(), g = !1), c && (f("auto"), f("1"), f("2"), f("3"), f("4"), f("5"))
                            } catch (k) {
                                Logger.LogWarning("Could not load settings from steam cloud", k, "Could not load settings from steam cloud".localize())
                            }
                            a && a()
                        }, function (b) {
                            a && a();
                            Logger.LogWarning("Could not load settings from steam cloud", b, "Could not load settings from steam cloud".localize())
                        })
                    };
                    k.commit = function (a, c) {
                        if (g) try {
                            var k = JSON.stringify(b);
                            d.setValue("general", k);
                            Steam.saveTextToFile("general", k, function () {
                                g = !1;
                                a && a()
                            }, function (a) {
                                Logger.LogWarning("Could not save settings to steam cloud", a, "Could not save settings to steam cloud".localize())
                            })
                        } catch (f) {
                            Logger.LogWarning("Could not save settings to steam cloud", f, "Could not save settings to steam cloud".localize()), c && c(f)
                        } else a && a()
                    };
                    k.saveToSlotAsync = function (a, b, g, l) {
                        l = "slot_" + a;
                        d.saveToSlotAsync(a, b);
                        "" == b ? g && g() : Steam.saveTextToFile(l,
                            b, g,
                            function (a) {
                                Logger.LogWarning("Could not save to steam cloud", a, "Could not save to steam cloud".localize());
                                g && g()
                            })
                    };
                    var p = function (a, b, g, l, c, k, f) {
                        var n = $("#loadViewContent");
                        n.empty();
                        n.append($("<small></small>").text("Your local save game seems to be different from the one stored in the Steam Cloud. Which one would you like to load?".localize()));
                        var m = new Company("x");
                        c.date && (c.saveTime = c.date);
                        c.name && (c.companyName = c.name);
                        c.slot = a;
                        c = UI._getElementForSaveGame(c, m);
                        c.find(".saveGameLocation").text("Cloud".localize("savegame"));
                        c.find(".saveSlotOptions").remove();
                        n.append(c);
                        c.get(0).onclick = function () {
                            Sound.click();
                            f && (f.chosenMismatchStrategy = SaveMismatchStrategy.UseCloud);
                            Steam.readTextFromFile(l, b, function (l) {
                                Logger.LogWarning("Could not load from steam cloud", l, "Could not load from steam cloud".localize());
                                d.loadSlotAsync(a, b, g)
                            });
                            UI.closeAllLoadSaveViews()
                        };
                        k.date && (k.saveTime = k.date);
                        k.name && (k.companyName = k.name);
                        k.slot = a;
                        k = UI._getElementForSaveGame(k, m);
                        k.find(".saveGameLocation").text("Local".localize("savegame"));
                        k.find(".saveSlotOptions").remove();
                        n.append(k);
                        k.get(0).onclick = function () {
                            Sound.click();
                            f && (f.chosenMismatchStrategy = SaveMismatchStrategy.UseLocal);
                            d.loadSlotAsync(a, b, g);
                            UI.closeAllLoadSaveViews()
                        };
                        n.append($("<small></small>").text("Note: Once you save the game, the new save file will be stored both locally and on the Cloud unless you disable the Steam Cloud through Steam.".localize()));
                        UI.closeAllLoadSaveViews();
                        GameManager.pause(!0);
                        GameManager.loadScreenOpened = !0;
                        $("#loadView").dialog({
                            width: 630,
                            draggable: !1,
                            modal: !0,
                            resizable: !1,
                            show: "fade",
                            zIndex: 6800,
                            open: function () {
                                var a = $(UI.closeButtonTemplate);
                                a.zIndex = 6900;
                                a.clickExclOnce(function () {
                                    Sound.click();
                                    $("#loadView").dialog("close");
                                    GameManager.resume(!0)
                                });
                                $(this).siblings(".ui-dialog-titlebar").remove();
                                $(this).parents(".ui-dialog:first").addClass("tallWindow");
                                $(this).parents(".ui-dialog:first").addClass("windowBorder");
                                $(this).parents(".ui-dialog:first").removeClass("ui-widget-content")
                            },
                            close: function () {
                                $(this).dialog("destroy");
                                this.style.cssText =
                                    "display:none;";
                                GameManager.resume(!0)
                            }
                        })
                    };
                    k.loadSlotAsync = function (g, k, f, r) {
                        var v = "slot_" + g;
                        try {
                            if ("knowledge" == g) a(g, v, k, f);
                            else if (b[g] || c && c[g])
                                if (b && c && b[g] && c[g] && Date.parse(JSON.parse(b[g]).date) != Date.parse(JSON.parse(c[g]).date)) {
                                    var A = SaveMismatchStrategy.AskPlayer;
                                    r && r.mismatchStrategy && (A = r.mismatchStrategy);
                                    if (A == SaveMismatchStrategy.UseLocal) d.loadSlotAsync(g, k, f);
                                    else if (A == SaveMismatchStrategy.UseCloud) Steam.readTextFromFile(v, k, function (a) {
                                        Logger.LogWarning("Could not load from steam cloud",
                                            a, "Could not load from steam cloud".localize());
                                        d.loadSlotAsync(g, k, f)
                                    });
                                    else {
                                        var z = JSON.parse(c[g]),
                                            B = JSON.parse(b[g]);
                                        p(g, k, f, v, z, B, r)
                                    }
                                } else Steam.readTextFromFile(v, k, function (a) {
                                    Logger.LogWarning("Could not load from steam cloud", a, "Could not load from steam cloud".localize());
                                    d.loadSlotAsync(g, k, f)
                                });
                            else d.loadSlotAsync(g, k, f)
                        } catch (D) {
                            Steam.readTextFromFile(v, k, function (a) {
                                Logger.LogWarning("Could not load from steam cloud", a, "Could not load from steam cloud".localize());
                                d.loadSlotAsync(g,
                                    k, f)
                            })
                        }
                    };
                    k.saveCanvasToFile = function (a, b, g, l) {
                        l()
                    }
                })();
                DataStore = k
            }
        } else DataStore = a
    }
    DataStore.initSettings = function () {
        var a = DataStore.getValue("settings"),
            a = a ? JSON.parse(a) : {};
        DataStore.settings = a
    };
    DataStore.initSettings();
    DataStore.getAchievements = function () {
        DataStore.settings.achievements || (DataStore.settings.achievements = {});
        var a = DataStore.settings.achievements;
        a.achieved || (a.achieved = []);
        return a
    };
    DataStore.getTutorialSettings = function () {
        var a = DataStore.settings.tutorialSettings;
        a || (a = {
            "tutorials-shown": []
        },
            DataStore.settings.tutorialSettings = a);
        return a
    };
    DataStore.getMessageSettings = function () {
        var a = DataStore.settings.messageSettings;
        a || (a = {}, DataStore.settings.messageSettings = a);
        return a
    };
    DataStore.saveSettings = function () {
        try {
            DataStore.setValue("settings", JSON.stringify(DataStore.settings))
        } catch (a) {
            Logger.LogWarning("Could not save settings", a, "Could not save settings".localize())
        }
    };
    DataStore.initRemoteSettings = function () {
        var a = DataStore.getValue("remote-settings");
        if (a) try {
            a = JSON.parse(a)
        } catch (b) {
            a =
                null
        }
        a || (a = {
            id: 3,
            supporterPacksEnabled: !1,
            ignoreHashMismatch: !0,
            enableSteamKey: !0
        });
        void 0 === a.enableSteamKey && (a.enableSteamKey = !0);
        DataStore.remoteSettings = a
    };
    DataStore.initRemoteSettings();
    (function () {
        try {
            PlatformShim.xhr({
                url: "http://www.greenheartgames.com/utils/remoteSettingsId"
            }, function (a) {
                if (a && a.responseText) {
                    a = a.responseText;
                    try {
                        parseInt(a) > DataStore.remoteSettings.id && PlatformShim.xhr({
                            url: "http://www.greenheartgames.com/utils/remoteSettings"
                        }, function (a) {
                            if (a && a.responseText) {
                                a = a.responseText;
                                try {
                                    var b = JSON.parse(a);
                                    DataStore.setValue("remote-settings", a);
                                    DataStore.remoteSettings = b
                                } catch (g) {
                                    Logger.LogWarning("Could not load remote settings", g, "Could not load remote settings".localize())
                                }
                            }
                        })
                    } catch (b) {
                        Logger.LogWarning("Could not load remote settings", b, "Could not load remote settings".localize())
                    }
                }
            })
        } catch (a) {
            Logger.LogWarning("Could not load remote settings", a, "Could not load remote settings".localize())
        }
    })();
    DataStore.setScore = function (a, b, g) {
        var d = DataStore.settings;
        d.highScore || (d.highScore = {});
        if (!(d.highScore.hasOwnProperty(a) && d.highScore[a].score > g)) {
            d.highScore[a] = {
                name: b,
                score: g
            };
            DataStore.saveSettings();
            try {
                GameManager.save(a, null)
            } catch (c) {
                Logger.LogWarning("Could not save game", c, "Could not save game".localize())
            }
        }
    };
    DataStore.getHighScoreList = function () {
        var a = DataStore.settings,
            b = [],
            g;
        for (g in a.highScore) a.highScore.hasOwnProperty(g) && b.push(a.highScore[g]);
        return b
    }
})();