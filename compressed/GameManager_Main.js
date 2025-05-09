var GameManager = {
    VERSION: 8
},
    State = {
        GameStarting: "GameStarting",
        Idle: "Idle",
        CreateGame: "CreateGame",
        GameDefinition: "GameDefinition",
        PickWorkItems: "PickWorkItems",
        ExecuteWorkItems: "ExecuteWorkItems",
        ReleaseGame: "ReleaseGame"
    };
(function () {
    function a(a, g, l) {
        try {
            $("#splashScreen").remove();
            UpdateNotifications.checkAndShowNotifications();
            GDT.fire(b, GDT.eventKeys.saves.loading, {
                data: a
            });
            Missions.getAllMissions().forEach(function (a) {
                a.experience = 0
            });
            Research.getAllItems().forEach(function (a) {
                a.experience = 0
            });
            a.version != b.VERSION && (a = SavegameMigrator.migrate(a));
            b.loadInProgress = !0;
            b.gameTime = a.gameTime;
            b.playerPause = a.playerPause;
            b.systemPause = !1;
            b._timeModifier = a.timeModifier;
            b._oldTimeModifier = a.oldTimeModifier;
            b.company =
                Company.load(a.company);
            b.company.slot ? $("#mainBackground").fadeIn() : $("#mainBackground").fadeOut();
            b.state = a.state;
            b.currentMission = a.currentMission;
            b.currentResearches = a.currentResearches;
            b.currentResearches || (b.currentResearches = []);
            for (var d = 0; d < b.currentResearches.length; d++) {
                var c = b.currentResearches[d];
                b.company.staff.filter(function (a) {
                    return a.id === c.staffId
                }).forEach(function (a) {
                    a.currentResearch = c
                })
            }
            b.currentEngineDev = a.currentEngineDev;
            b.currentHwProject = a.currentHwProject;
            b.currentRnDProject =
                a.currentRnDProject;
            b.currentContract = a.currentContract;
            b.uiSettings = a.uiSettings;
            b.flags = a.flags;
            b.flags || (b.flags = {});
            b.spawnedPoints = a.spawnedPoints;
            var k = a.missionXP;
            if (k)
                for (var f = Missions.getAllMissions(), d = 0; d < k.length; d++) {
                    var n = k[d],
                        m = f.first(function (a) {
                            return a.id === n.id
                        });
                    m && (m.experience = n.xp, m.percentage = n.percentage)
                }
            var r = a.featureXP;
            r && r.forEach(function (a) {
                FeatureSerializer.load(a)
            });
            b.currentFeature = a.currentFeature;
            b.plannedFeatures = null;
            a.plannedFeatures && (b.plannedFeatures = a.plannedFeatures.map(function (a) {
                return CompanyFeatureSerializer.load(a)
            }));
            b.gameId = Math.random();
            GameFlags.IS_STEAM && Achievements.checkForAchievmentsNotCompletedOnSteam();
            GDT.fire(b, GDT.eventKeys.saves.loaded);
            g && g()
        } catch (p) {
            Logger.LogError("Could not initialize loaded game! ", p, "Could not initialize loaded game".localize()), l && l(p)
        }
    }
    var b = GameManager;
    b.gameId = Math.random();
    b.company = void 0;
    b.init = function () {
        b._initKeyboardShortcuts()
    };
    b.ghg3 = function () {
        return GameFlags.ghg6 ? Windows.ApplicationModel.Store.CurrentAppSimulator : Windows.ApplicationModel.Store.CurrentApp
    };
    b.ghg0 = function () {
        return GameFlags.ghg7
    };
    b.ghg1 = function () {
        if (!b.ghg0()) return !1;
        PlatformShim.ISWIN8 ? WinJS.xhr({
            url: "http://www.greenheartgames.com/utils/gamedevtycoonappuri"
        }).done(function (a) {
            if (a && a.responseText) {
                a = a.responseText;
                try {
                    new Windows.Foundation.Uri(a)
                } catch (b) {
                    Logger.LogInfo("Could not check latest game version", b)
                }
                var g = !1;
                DataStore.getValue("full-game-uri") || (g = !0);
                DataStore.setValue("full-game-uri", a);
                g && UpdateNotifications.showFullGameIsAvailable()
            }
        }, function (a) { }) : $.get("http://www.greenheartgames.com/utils/gamedevtycoonwinnativeeappuri",
            function (a) {
                if (a && a.startsWith("http")) {
                    var b = !1;
                    DataStore.getValue("full-game-uri") || (b = !0);
                    DataStore.setValue("full-game-uri", a);
                    b && UpdateNotifications.showFullGameIsAvailable()
                }
            })
    };
    b.isSupporter = function () {
        return !b.ghg2()
    };
    b.ghg2 = function () {
        if (!PlatformShim.ISWIN8) return b.ghg0();
        if (!0 === GameFlags.ghg6) return !1;
        try {
            if (b.ghg0()) return !0;
            var a = b.ghg3();
            return a && a.licenseInformation.isActive ? a.licenseInformation.isTrial : !0
        } catch (g) {
            return ghg4.ghg5("isTrial error"), Logger.LogInfo("isTrial failed",
                g), !0
        }
    };
    b._initKeyboardShortcuts = function () {
        window.onkeyup = function (a) {
            if (!a.srcElement || "INPUT" !== a.srcElement.nodeName) {
                if (!UI.isModalContentOpen()) switch (a.which) {
                    case 37:
                        VisualsManager.scrollToNextZone(-1);
                        break;
                    case 39:
                        VisualsManager.scrollToNextZone(1)
                }
                var g = GameFlags.ghg6,
                    l = g || GameManager.company && GameManager.company.flags.ghg141;
                switch (a.which) {
                    case 192:
                        l && GameManager.togglePause(!0);
                        break;
                    case 49:
                        l && GameManager.setGameSpeed("slow");
                        break;
                    case 50:
                        l && GameManager.setGameSpeed("normal");
                        break;
                    case 51:
                        l && GameManager.setGameSpeed("fast");
                        break;
                    case 52:
                        g && GameManager.setGameSpeed("super-fast");
                        break;
                    case 53:
                        g && GameManager.setGameSpeed("extra-fast");
                        break;
                    case 82:
                        g && GameManager.testSaveLoad();
                        break;
                    case 83:
                        g && b.save("auto");
                        break;
                    case 76:
                        g && b.reload("auto")
                }
            }
        }
    };
    b.testSaveLoad = function () {
        b.save("auto");
        b.reload("auto")
    };
    b.reload = function (a, g, l, d) {
        d || UI.fadeInTransitionOverlay();
        UI.closeAllDialogs();
        UI.currentCloseCallback = null;
        b.pause(!0, !1);
        var c = function () {
            b.load(a, function () {
                var a = b.company.currentLevel,
                    l = ResourceKeys.getLevelResources.apply(ResourceKeys, [1, 2, 3, 4].except([a]));
                FlippingCounter.init();
                GameDev.ResourceManager.removeResources(l);
                GameDev.ResourceManager.ensureResources(ResourceKeys.getLevelResources(a), function () {
                    SplashScreen.removeSplashScreen() && Sound.playBackgroundMusic();
                    VisualsManager.reset();
                    if (b.state === State.ExecuteWorkItems || b.state === State.PickWorkItems || b.state === State.ReleaseGame || 0 < b.spawnedPoints) b.state != State.ReleaseGame && (VisualsManager.gameStatusBar.startDevelopment(),
                        b.updateCurrentHypePoints()), b.currentFeature && ("preparation" === b.currentFeature.missionType ? VisualsManager.gameStatusBar.updateStatusMessage("Starting ...".localize()) : "BugFixing" === b.currentFeature.missionType ? VisualsManager.gameStatusBar.updateStatusMessage("Finishing ...".localize()) : VisualsManager.gameStatusBar.updateStatusMessage(b.currentFeature.id));
                    if (0 < b.currentResearches.length)
                        for (var a = 0; a < b.company.staff.length; a++) b.company.staff[a].state === CharacterState.Researching && VisualsManager.getCharacterOverlay(b.company.staff[a]).startResearching();
                    b.currentEngineDev && VisualsManager.startCreateEngine();
                    b.currentContract && "gameContract" != b.currentContract.type && VisualsManager.startContract();
                    var l = function () {
                        b.systemPause ? b.pause(!0) : b.resume(!0);
                        b.playerPause ? b.pause(!1) : b.resume(!1);
                        b.state == State.ReleaseGame && b.company && 0 == b.company.notifications.count(function (a) {
                            return "{ReleaseGame}" === a.header
                        }) && b.notifyIdleState();
                        b.state == State.ReleaseGame || b.state == State.PickWorkItems && b.company && b.company.activeNotifications && b.company.activeNotifications.first(function (a) {
                            return "{FeatureList}" ===
                                a.header
                        }) ? b.showPendingNotifications() : b.transitionToState(b.state);
                        g && g();
                        b.loadInProgress = !1
                    };
                    UI.isTransitionVisible ? UI.fadeOutTransitionOverlay(function () {
                        l()
                    }) : l()
                })
            }, l)
        };
        d ? c() : setTimeout(c, 800)
    };
    b.getGameToContinue = function () {
        for (var a = GameManager.getSaveGames(), b = null, g = 0; g < a.length; g++) a[g] && (!b || b.saveTime < a[g].saveTime) && (b = a[g]);
        return b
    };
    b.continueGame = function () {
        var a = GameManager.getGameToContinue();
        a && UI.fadeInTransitionOverlay(function () {
            SplashScreen.removeSplashScreen();
            GameManager.reload(a.slot,
                function () {
                    Sound.playBackgroundMusic();
                    GameManager.resume(!0)
                },
                function () {
                    GameManager.startNewGame()
                }, !0)
        })
    };
    b.startNewGame = function () {
        GameDev.ResourceManager.removeResources(ResourceKeys.getLevelResources(2, 3, 4));
        GameDev.ResourceManager.ensureResources(ResourceKeys.getLevelResources(1), function () {
            SplashScreen.removeSplashScreen();
            Sound.playBackgroundMusic();
            c()
        })
    };
    var c = function () {
        UI.closeAllDialogs();
        UI.currentCloseCallback = null;
        b.useKnowledgeAnswered = void 0;
        $("#mainBackground").fadeOut();
        $("foregroundCanvas").hide();
        b._setupNewGame();
        Media.createWelcomeNotifications();
        b.showPendingNotifications(function () {
            Tutorial.AppbarAndHelp();
            b.showPendingNotifications(function () {
                Tutorial.createdCompany();
                b.showPendingNotifications(function () {
                    "Greenheart Games" == b.company.name ? Achievements.activate(Achievements.admirer) : Achievements.hasAchieved(Achievements.fanBoy) || -1 == RealCompanyNames.indexOf(b.company.name) || Achievements.activate(Achievements.fanBoy)
                })
            })
        })
    };
    b._setupNewGame = function () {
        var a = new Company(b.companyName);
        a.uid =
            b.getGUID();
        a.seed = Math.floor(65535 * Math.random());
        a._mersenneTwister = new MersenneTwister(a.seed);
        a.slot = b.slot;
        a.cash = 7E4;
        a.topics = General.getTopicOrder(a).slice(0, 4);
        for (var g = Research.getAllItems(), l = 0; l < g.length; l++) g[l].duration || a.features.push(g[l]);
        b.currentEngineDev = null;
        b.currentHwProject = null;
        b.currentRnDProject = null;
        b.currentContract = null;
        b.currentFeature = null;
        b.currentResearches = [];
        b.plannedFeatures = null;
        b.company = a;
        b.gameTime = 0;
        b.playerPause = !1;
        b.systemPause = !1;
        b._timeModifier = 1;
        b.uiSettings =
            UI.createDefaultUISettings();
        b.flags = {
            gameLengthModifier: 1.16667
        };
        Missions.getAllMissions().forEach(function (a) {
            a.experience = 0
        });
        Research.getAllItems().forEach(function (a) {
            a.experience = 0
        });
        b.spawnedPoints = 0;
        General.proceedOneWeek(b.company);
        b.gameId = b.company.getRandom();
        VisualsManager.reset();
        GameManager.state = State.GameStarting;
        GDT.fire(b, GDT.eventKeys.saves.newGame)
    };
    b.decreaseSpawnedPoints = function () {
        0 < b.spawnedPoints && b.spawnedPoints--
    };
    b.increaseSpawnedPoints = function () {
        b.spawnedPoints++
    };
    b.notifyIdleState =
        function () {
            switch (b.state) {
                case State.CreateGame:
                case State.GameDefinition:
                    b.transitionToState(State.PickWorkItems);
                    break;
                case State.PickWorkItems:
                    b.transitionToState(State.ExecuteWorkItems);
                    break;
                case State.ExecuteWorkItems:
                    b.transitionToState(State.PickWorkItems);
                    break;
                case State.ReleaseGame:
                    b.transitionToState(State.Idle);
                    break;
                case State.Idle:
                    break;
                default:
                    throw "unexpected state: " + b.state;
            }
        };
    b.state = void 0;
    b.isIdle = function () {
        return b.state === State.Idle
    };
    b.transitionToState = function (a) {
        if (GameManager.state !=
            State.ReleaseGame && (b.company.calculateCurrentNofitications(), 0 < b.company.activeNotifications.length)) {
            b.showPendingNotifications(function () {
                b.transitionToState(a)
            });
            return
        }
        a === State.CreateGame && (b.state = a, b.flags.sequel ? Tutorial.createSequel() : Tutorial.createGame(), -1 != b.company.researchCompleted.indexOf(Research.TargetAudience) && Tutorial.targetAudience(), b.company.createNewGame(), b.currentContract && b._setContractRequirements(b.company.currentGame), b.state = State.GameDefinition, b.transitionToState(State.GameDefinition));
        if (a === State.GameDefinition) b.company.activeNotifications.push(new Notification("{GameDefinition}", "", "", 0)), b.showPendingNotifications();
        else {
            if (a === State.PickWorkItems) {
                if (b.state === State.GameDefinition) {
                    var g = b.company.currentGame.costs;
                    b.company.cash -= g;
                    b.company.cashLog.push({
                        amount: -g,
                        label: b.company.currentGame.title
                    });
                    for (var g = b.company.staff.filter(function (a) {
                        return a.state === CharacterState.Idle
                    }), l = 0; l < g.length; l++) g[l].startWorking()
                }
                b.state = a;
                g = b.getDevFeatureLogCount();
                0 == g ? (VisualsManager.gameStatusBar.updateStatusMessage(""),
                    VisualsManager.gameStatusBar.startDevelopment(), VisualsManager.putConsoleToPedestal(), b.executeFeatures([], Missions.PreparationMission)) : 9 >= g ? b.showFeatureList() : 11 > g ? (b.executeFeatures([], Missions.BugFixingMission), b.company.currentGame.flags.releaseReady = !0, Tutorial.finishingPhase(0.2), VisualsManager.updateReleaseReadyButton()) : (b.company.currentGame.flags.devCompleted = !0, b.transitionToState(State.ReleaseGame))
            }
            a === State.ExecuteWorkItems && (b.state = a, b.executeWorkItems());
            if (a === State.ReleaseGame) {
                g =
                    b.company.staff.filter(function (a) {
                        return a.state === CharacterState.Idle || a.state === CharacterState.Working
                    });
                for (l = 0; l < g.length; l++) g[l].endWorking();
                b.state = State.ReleaseGame
            }
            a === State.Idle && (b.state = a)
        }
    };
    b.gameDefinitionCancelled = function () {
        GDT.fire(b, GDT.eventKeys.gameplay.gameDefinitionCanceled, {
            company: b.company
        });
        b.company.currentGame = null;
        b.currentContract && b.contractCancelled();
        b.transitionToState(State.Idle)
    };
    b.workEnded = function (a) {
        if (0 === b.company.staff.filter(function (a) {
            return !0 === a.working &&
                !a.currentResearch
        }).length)
            if (b.state === State.ReleaseGame) {
                if (b.company.currentGame && 0 === b.company.notifications.count(function (a) {
                    return "{ReleaseGame}" === a.header
                }) && (b.releaseGame(), b.company.calculateCurrentNofitications(), 0 < b.company.activeNotifications.length)) {
                    b.showPendingNotifications(function () {
                        b.transitionToState(State.ReleaseGame)
                    });
                    return
                }
            } else b.currentEngineDev && b.finishEngine();
        a.currentResearch && (a.currentResearch = null, b.finishResearch(a))
    };
    b.executeWorkItems = function () {
        if (b.plannedFeatures &&
            0 < b.plannedFeatures.length) {
            b.plannedFeatures.forEach(function (a) {
                a.progress = 0;
                a.duration = General.getDuration(b.company.currentGame, a)
            });
            var a = b.company.currentGame;
            a.featureLog || (a.featureLog = []);
            b.currentFeature && 1 > b.currentFeature.progress || (b.currentFeature = b.plannedFeatures.shift(), b.currentFeature.startTime = b.gameTime)
        } else b.currentFeature || b.notifyIdleState(State.PickWorkItems)
    };
    b.currentFeature = null;
    b.plannedFeatures = null;
    b.getCurrentDevStage = function () {
        var a = b.getDevFeatureLogCount();
        if (3 >
            a) return 1;
        if (6 > a) return 2;
        if (9 > a) return 3
    };
    b.executeFeatures = function (a, g) {
        for (var l = b.company.staff.filter(function (a) {
            return a.state === CharacterState.Working
        }), d = 0; d < l.length; d++) l[d].state = CharacterState.Idle, l[d].currentFeature = null;
        l = [];
        b.plannedFeatures = [];
        b.company.currentGame.featureLog && (d = b.getCurrentDevStage(), 1 == d ? l = Missions.Stage1Missions : 2 == d ? l = Missions.Stage2Missions : 3 == d && (l = Missions.Stage3Missions));
        if (0 != a.length)
            for (d = 0; d < l.length; d++) l[d].percentage = a[d].percentage, b.plannedFeatures.push({
                type: "focus",
                id: l[d].id,
                missionType: "mission"
            });
        g && b.plannedFeatures.push({
            type: "focus",
            id: g.id,
            missionType: g.missionType
        });
        b.transitionToState(State.ExecuteWorkItems)
    };
    b.codingContest = function (a, g, l) {
        a = {
            id: a.id,
            type: g,
            progress: 0,
            duration: a.duration,
            isTraining: a.isTraining
        };
        b.currentResearches.push(a);
        b.startResearch(a)
    };
    b.research = function (a, g) {
        k(a);
        var l = {
            id: a.id,
            type: g,
            progress: 0,
            duration: Research.getDuration(a),
            isTraining: a.isTraining,
            progressColor: a.progressColor
        };
        b.currentResearches.push(l);
        b.startResearch(l);
        GDT.fire(b, GDT.eventKeys.gameplay.researchStarted, {
            company: b.company,
            researchItem: l
        })
    };
    var f;
    b.getPreferredLanguage = function () {
        void 0 == f && (f = DataStore.getValue("language"), void 0 == f && b.setPreferredLanguage("en"));
        return f
    };
    b.setPreferredLanguage = function (a) {
        DataStore.setValue("language", a);
        try {
            UI && (UI.showLocalizationCredits(a, $("#localizationCredits"), $(".localizationDiscussion")), UI.showLocalizationCredits(a, $("#localizationCreditsAudioHtml"), $(".localizationDiscussionAudioHtml")))
        } catch (b) { }
        f =
            a
    };
    var d;
    b.areHintsEnabled = function () {
        void 0 == d && (d = DataStore.getValue("hintsEnabled"), void 0 == d ? (b.setHintsEnabled(!0), d = !0) : d = !0 == d || "true" == d);
        return d
    };
    b.setHintsEnabled = function (a) {
        DataStore.setValue("hintsEnabled", a);
        d = a
    };
    b.researchTopic = function (a) {
        var g = Research.ResearchTopicItem;
        k(g);
        a = {
            id: g.id,
            type: "research",
            topicId: a.id,
            progress: 0,
            duration: Research.ResearchTopicItem.duration
        };
        b.currentResearches.push(a);
        b.startResearch(a);
        GDT.fire(b, GDT.eventKeys.gameplay.researchStarted, {
            company: b.company,
            researchItem: a
        })
    };
    var k = function (a) {
        b.company.researchPoints -= Research.getPointsCost(a);
        VisualsManager.updatePoints();
        var g = Research.getResearchCost(a);
        g && b.company.adjustCash(-g, a.name)
    };
    b.startResearch = function (a) {
        var g = b.company.staff.first(function (a) {
            return a.id === GameManager.uiSettings.selectedChar
        });
        if (!g) throw "no worker selected for research";
        g.startWorking();
        g.state = CharacterState.Researching;
        a.staffId = g.id;
        g.currentResearch = a;
        g.currentFeature = null;
        g.resetLeftOverPoints();
        VisualsManager.getCharacterOverlay(g).startResearching()
    };
    b.decreaseBugs = function (a) {
        b.company.currentGame && (b.company.currentGame.bugs -= a, VisualsManager.gameStatusBar.updatePoints())
    };
    b.increaseResearchProgress = function (a, g) {
        var l = GameManager.currentResearches.first(function (b) {
            return b.staffId === a.id
        });
        l.progress = (l.progress + g).clamp(0, 1);
        1 === l.progress && (b.currentFeature || b.currentEngineDev ? b.finishResearch(a, l) : a.endWorking())
    };
    b.finishResearch = function (a) {
        VisualsManager.levelOverlay.startWaterCooler();
        var g = b.currentResearches.first(function (b) {
            return b.staffId ===
                a.id
        });
        VisualsManager.getCharacterOverlay(a).finishResearching();
        a.state = CharacterState.Idle;
        b.currentResearches.remove(g);
        a.currentResearch = null;
        if ("training" === g.type || "specialTraining" === g.type) m(a, g);
        else {
            if ("New Topic" === g.id) {
                var l = Topics.topics.first(function (a) {
                    return a.id === g.topicId
                });
                if (1 < b.company.currentLevel) VisualsManager.getCharacterOverlay(a).saySomething("Completed: ".localize("research is completed, research name is added") + l.name), 1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("research",
                    0.3);
                else {
                    var d = l.iconUrl ? l.iconUrl : "./images/topic icons/icon_topic_{0}.png".format(l.id.toLowerCase()),
                        c = new Notification("Research complete".localize("heading"), "You have successfully researched a new topic: '{0}'.".localize().format(l.name));
                    c.sound = "research";
                    c.volume = 0.3;
                    c.previewImage = d;
                    c.type = NotificationType.Others;
                    b.company.notifications.push(c)
                }
                b.company.topics.push(l)
            } else g = l = b.company.availableResearch.first(function (a) {
                return a.id === g.id
            }), b.company.availableResearch.remove(l), b.company.researchCompleted.push(l),
                1 == b.company.researchCompleted.length && ghg4.ghg5("first research", {
                    id: l.id
                }), 1 < b.company.currentLevel ? (VisualsManager.getCharacterOverlay(a).saySomething("Completed: ".localize("research is completed, research name is added") + l.name), 1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("research", 0.3)) : (c = new Notification("Research complete".localize("heading"), "You have successfully researched '{0}'.".localize().format(l.name)), c.sound = "research", c.volume = 0.3, c.type = NotificationType.Others,
                    c.previewImage = "./images/notificationIcons/icon_notification_research.png", b.company.notifications.push(c)), l === Research.CustomEngine ? Tutorial.researchedCustomEngine() : 0 != Research.getEnginePoints(l) && Tutorial.researchedEnginePart(), l.complete && l.complete();
            GDT.fire(b, GDT.eventKeys.gameplay.researchCompleted, {
                company: b.company,
                researchItem: g
            });
            Research.checkForNewResearch();
            b.autoSave()
        }
    };
    var m = function (a, g) {
        var l = Training.getAllTrainings().first(function (a) {
            return a.id === g.id
        });
        a.finishTraining(l);
        l && l.complete && l.complete(a);
        l.isSkillTraining && Knowledge.setTrainingKnowledge(l);
        GDT.fire(b, GDT.eventKeys.gameplay.trainingFinished, {
            staff: a,
            training: l
        });
        Research.checkForNewResearch();
        b.autoSave();
        b.showPendingNotifications()
    };
    b.currentEngineDev = null;
    b.createEngine = function (a, g) {
        if (!b.currentEngineDev) {
            var l = g.sum(function (a) {
                return Research.getEngineCost(a)
            }),
                d = g.sum(function (a) {
                    return Research.getEnginePoints(a)
                });
            Tutorial.creatingEngine();
            b.company.adjustCash(-l, a);
            b.currentEngineDev = {
                name: a,
                progress: 0,
                cost: l,
                technologyPoints: d,
                remainingPoints: d,
                remainingPointsDisplay: d,
                parts: g,
                currentPart: g[0]
            };
            VisualsManager.startCreateEngine();
            l = b.company.staff.filter(function (a) {
                return a.state === CharacterState.Idle
            });
            for (d = 0; d < l.length; d++) l[d].startWorking();
            GDT.fire(b, GDT.eventKeys.gameplay.engineStarted, {
                company: b.company
            })
        }
    };
    b.increaseEnginePoints = function () {
        b.currentEngineDev && b.currentEngineDev.remainingPoints--
    };
    b.increaseDisplayEnginePoints = function (a, g) {
        if (b.currentEngineDev) {
            b.currentEngineDev.remainingPointsDisplay -=
                g;
            0 > b.currentEngineDev.remainingPointsDisplay && (b.currentEngineDev.remainingPointsDisplay = 0);
            var l = b.currentEngineDev.technologyPoints,
                d = Math.abs(b.currentEngineDev.remainingPointsDisplay - b.currentEngineDev.technologyPoints);
            b.currentEngineDev.progress = d / l;
            for (var c = 0, l = null, k = 0; k < b.currentEngineDev.parts.length && !(l = b.currentEngineDev.parts[k], c += Research.getEnginePoints(l), d <= c); k++);
            l.techLevel && a && (l.efficiencyPoints || (l.efficiencyPoints = []), d = a.getLevelF() / l.techLevel, d *= (a.efficiency + 0.2).clamp(0.5,
                1), a.onFire && (d += 0.1 + 0.2 * b.company.getRandom()), l.efficiencyPoints.push(d));
            b.currentEngineDev.currentPart = l;
            VisualsManager.updateEngineStatus();
            if (0 >= b.currentEngineDev.remainingPointsDisplay)
                if (b.currentFeature) b.finishEngine();
                else
                    for (d = GameManager.company.staff.filter(function (a) {
                        return a.state === CharacterState.CreateEngine
                    }), k = 0; k < d.length; k++) d[k].endWorking()
        }
    };
    b.finishEngine = function () {
        var a = b.currentEngineDev;
        if (!(1 > a.progress)) {
            for (var g = 0; g < a.parts.length; g++) {
                var l = a.parts[g];
                l.efficiencyPoints &&
                    (l.efficiency = l.efficiencyPoints.average(), l.efficiencyPoints = void 0)
            }
            a = {
                id: b.company.engines.length + 1,
                name: a.name,
                parts: a.parts,
                techLevel: a.parts.filter(function (a) {
                    return void 0 != a.techLevel
                }).average(function (a) {
                    return a.techLevel
                }),
                costs: b.currentEngineDev.cost,
                releaseWeek: b.company.currentWeek
            };
            b.currentEngineDev = null;
            l = b.company.staff.filter(function (a) {
                return a.state === CharacterState.CreateEngine
            });
            for (g = 0; g < l.length; g++) l[g].state = CharacterState.Idle;
            b.company.engines.push(a);
            for (g = 0; g < a.parts.length; g++) {
                for (l =
                    0; l < b.company.engineParts.length && a.parts[g].id !== b.company.engineParts[l].id; l++);
                l === b.company.engineParts.length && (l = a.parts[g], l.experience || (l.experience = 0), b.company.engineParts.push(l))
            }
            b.company.notifications.push(new Notification("Engine complete!".localize("heading"), "Your new game engine '{0}' is now complete!".localize().format(a.name), {
                type: NotificationType.AutoPopup
            }));
            Tutorial.firstEngine();
            VisualsManager.finishEngine();
            GDT.fire(b, GDT.eventKeys.gameplay.engineFinished, {
                company: b.company,
                engine: a
            });
            b.autoSave()
        }
    };
    b.getAvailableGameFeatures = function (a) {
        var b = [];
        b.addRange(Research.StartEngineParts);
        a && b.addRange(a.parts.map(function (a) {
            return General.getFeature(a.id)
        }).except(b));
        a = Research.getAllItems().filter(function (a) {
            return 0 === a.enginePoints && -1 != GameManager.company.researchCompleted.indexOf(a)
        });
        b.addRange(a);
        b.addRange(GameManager.company.specialItems);
        return b
    };
    b.finishCurrentMission = function () {
        var a = b.company.currentGame,
            g = b.currentFeature;
        if ((1 === g.progress || b.company.currentGame.flags.finished) &&
            !g.finished && ("BugFixing" === g.missionType || 0 === b.spawnedPoints || 0 < b.plannedFeatures.length)) {
            for (var l = 0; l < b.company.staff.length; l++) b.company.staff[l].currentFeature && b.currentFeature.id === b.company.staff[l].currentFeature.id && (b.company.staff[l].currentFeature = null, b.company.staff[l].state = CharacterState.Idle);
            g.finished = !0;
            a.featureLog.push(b.currentFeature);
            "feature" !== g.type && (l = General.getMission(g.id), a.missionLog.push(l));
            0 < b.plannedFeatures.length ? b.currentFeature = b.plannedFeatures.shift() :
                (b.currentFeature = null, b.notifyIdleState())
        }
        GDT.fire(b, GDT.eventKeys.gameplay.featureFinished, {
            company: b.company,
            feature: g
        })
    };
    b.showPendingNotifications = function (a) {
        var g = b.company;
        if (g) {
            var l = b.gameId;
            if (a) {
                var d = a;
                a = function () {
                    l == b.gameId && d && d()
                }
            }
            g.calculateCurrentNofitications();
            0 === g.activeNotifications.length ? a && a() : UI.showNotifications(a)
        }
    };
    b.removeFromActiveNotifications = function (a) {
        b.company && 0 < b.company.activeNotifications.length && b.company.activeNotifications.remove(a)
    };
    b.showBoothList =
        function (a, b) {
            UI.showConferenceBoothList(a, b)
        };
    b.releaseGame = function () {
        if (0 === b.company.notifications.count(function (a) {
            return "{ReleaseGame}" === a.header
        })) {
            var a = (0.5 + 0.3 * GameManager.company.getRandom()) / GameManager.SECONDS_PER_WEEK;
            Tutorial.gameDevCompleted(a);
            b.company.notifications.push(new Notification("{ReleaseGame}", "", "", a))
        }
    };
    b.showFeatureList = function () {
        b.company.currentGame.state = GameState.development;
        if (0 === b.company.notifications.count(function (a) {
            return "{FeatureList}" === a.header
        })) {
            var a =
                (0.5 + 0.3 * GameManager.company.getRandom()) / GameManager.SECONDS_PER_WEEK;
            Tutorial.devPhases(a);
            b.company.currentGame.isStaffResponsibilityEnabled() && Tutorial.staffResponsibility(a);
            var g;
            3 > b.getDevFeatureLogCount() ? g = Missions.Stage1Missions : 6 > b.getDevFeatureLogCount() ? g = Missions.Stage2Missions : (g = Missions.Stage3Missions, Tutorial.additionalFeatures(a));
            !b.company.flags.missionHintsShown && g.some(function (a) {
                return Knowledge.getMissionWeightingHint(Missions.getMissionWithId(a.id), b.company.currentGame)
            }) &&
                (b.company.flags.missionHintsShown = !0, Tutorial.missionHints(a));
            a = new Notification("{FeatureList}", "", "", a);
            a.features = g;
            b.company.notifications.push(a);
            b.showPendingNotifications()
        }
    };
    b.getDevFeatureLogCount = function () {
        return b.company.currentGame.featureLog ? b.company.currentGame.featureLog.count(function (a) {
            return "mission" === a.missionType || "preparation" === a.missionType || "BugFixing" === a.missionType
        }) : 0
    };
    b.isPaused = function (a) {
        return a ? b.systemPause : b.playerPause
    };
    b.isGamePaused = function () {
        return 0 ===
            b._timeModifier
    };
    b.togglePause = function (a) {
        UI.isModalContentOpen() && a || (b.isPaused(a) ? b.resume(a) : b.pause(a))
    };
    b.setGameSpeed = function (a) {
        var g;
        if ("slow" === a) g = 0.5;
        else if ("normal" === a) g = 1;
        else if ("fast" === a) g = 2.5;
        else if ("super-fast" === a) {
            if (!GameFlags.ghg6) return;
            g = 10
        } else if ("extra-fast" === a) {
            if (!GameFlags.ghg6) return;
            g = 100
        }
        if (b.isPaused(!0)) {
            if (UI.isModalContentOpen()) {
                b._oldTimeModifier = g;
                return
            }
            b.resume(!0)
        }
        b._timeModifier = g
    };
    b.pause = function (a, g) {
        a && g && ($(document).find("#gamePausedOverlay").css("top",
            CanvasManager.backgroundCanvas.height / 2 - 150), $(document).find("#gamePausedOverlay").css("opacity", 0).show().transit({
                opacity: 1
            }));
        a ? b.systemPause = !0 : b.playerPause = !0;
        0 < b._timeModifier && (b._oldTimeModifier = b._timeModifier, b._timeModifier = 0);
        if (!a && PlatformShim.ISWIN8) WindowsIntegration.onPause()
    };
    b.resume = function (a, g) {
        var l = UI.isPanelOpen();
        !b.playerPause && a && g && !l && $(document).find("#gamePausedOverlay").transit({
            opacity: 0
        }, function () {
            $("#gamePausedOverlay").hide()
        });
        a && !l ? b.systemPause = !1 : b.playerPause = !1;
        UI.isModalContentOpen() || b.systemPause || b.playerPause || (b._timeModifier = b._oldTimeModifier);
        if (!b.playerPause && !a && PlatformShim.ISWIN8) WindowsIntegration.onResume()
    };
    b.saveActualGame = function () {
        b.company && ($("#gameSavedOverlay").css("top", CanvasManager.backgroundCanvas.height / 2 - 50), $("#gameSavedOverlay").css("opacity", 0).show().transit({
            opacity: 1
        }), b.save(b.company.slot, function () {
            $("#gameSavedOverlay").transit({
                opacity: 0
            }, 600, function () {
                $("#gameSavedOverlay").hide()
            })
        }))
    };
    b.save = function (a, g,
        l) {
        var d = GameManager.company;
        if (!d || $("#splashScreen").is(":visible")) g && g();
        else {
            var c = {};
            c.version = b.VERSION;
            c.slot = d.slot;
            c.gameTime = b.gameTime;
            c.playerPause = b.playerPause;
            c.systemPause = b.systemPause;
            c.timeModifier = b._timeModifier;
            c.oldTimeModifier = b._oldTimeModifier;
            c.state = b.state;
            c.currentMission = b.currentMission;
            c.currentResearches = b.currentResearches;
            c.currentEngineDev = b.currentEngineDev;
            c.currentHwProject = b.currentHwProject;
            c.currentRnDProject = b.currentRnDProject;
            c.currentContract = b.currentContract;
            c.uiSettings = b.uiSettings;
            c.flags = b.flags;
            c.spawnedPoints = b.spawnedPoints;
            c.company = d.save();
            for (var k = [], f = Missions.getAllMissions(), n = 0; n < f.length; n++) {
                var m = f[n];
                k.push({
                    id: m.id,
                    xp: m.experience,
                    percentage: m.percentage
                })
            }
            c.missionXP = k;
            k = Research.getAllItems().filter(function (a) {
                return 0 < a.experience
            }).map(function (a) {
                return FeatureSerializer.save(a)
            });
            c.featureXP = k;
            b.currentFeature && (c.currentFeature = b.currentFeature);
            b.plannedFeatures && (c.plannedFeatures = b.plannedFeatures.map(function (a) {
                return CompanyFeatureSerializer.save(a)
            }));
            Knowledge.savePlayerKnowledge();
            GDT.fire(b, GDT.eventKeys.saves.saving, {
                company: b.company,
                data: c
            });
            c = JSON.stringify(c);
            DataStore.saveToSlotAsync(a, c, function () {
                var b = {};
                b.name = d.name;
                b.cash = d.cash;
                b.fans = d.fans;
                b.currentWeek = d.currentWeek;
                b.mods = d.mods;
                b.date = new Date;
                b.pirateMode = d.flags.pirateMode;
                DataStore.setValue(a, JSON.stringify(b));
                DataStore.commit && DataStore.commit();
                if (PlatformShim.ISWIN8) try {
                    WindowsIntegration.updateImageTile()
                } catch (l) {
                    Logger.LogInfo("game tile update failed", l)
                }
                g && g()
            },
                function (a) {
                    l ? l() : (Logger.LogError("Could not save game", a, "Could not save game".localize()), g && g())
                })
        }
    };
    b.load = function (b, g, l) {
        DataStore.loadSlotAsync(b, function (b) {
            try {
                var d = JSON.parse(b)
            } catch (c) {
                Steam && Steam.isAvailable && Steam.isAvailable() ? Logger.LogError("This save slot is corrupt, this could be due to a failed cloud sync. Please resync your game with the Steam cloud and try again.", c, "This save slot is corrupt, this could be due to a failed cloud sync. Please resync your game with the Steam cloud and try again.".localize()) :
                    PlatformShim.ISWIN8 ? Logger.LogError("This save slot is corrupt, this could be due to a failed cloud sync. Please report this issue to Microsoft Support.", c, "This save slot is corrupt, this could be due to a failed cloud sync. Please report this issue to Microsoft Support this issue.".localize()) : Logger.LogError("This save slot is corrupt, please try restarting your game.", c, "This save slot is corrupt, please try restarting your game.".localize());
                SplashScreen.reshow();
                return
            }
            if (PlatformShim.ISWIN8) a(d,
                g, l);
            else {
                b = d.company.mods;
                var k = ModSupport.currentMods;
                b && k ? UI.showModMismatchDialog(function () {
                    a(d, g, l)
                }, ModSupport.checkMissingMods(b, k), ModSupport.checkAdditionalMods(b, k)) : a(d, g, l)
            }
        }, function (a) {
            Logger.LogError("Could not load game", a, "Could not load game".localize());
            l && l(a)
        })
    };
    b.staffCountWorkingOnFeature = function (a) {
        for (var g = 0, l = 0; l < b.company.staff.length; l++) b.company.staff[l].currentFeature && b.company.staff[l].currentFeature.id === a.id && (g += 1);
        return g
    };
    b.IsAnimationSwitchAllowed = function (a) {
        if (b.company) {
            var g = [];
            b.currentEngineDev && g.push(b.currentEngineDev.progress);
            a.currentResearch && g.push(a.currentResearch.progress);
            b.currentFeature && g.push(b.getCurrentGameProgress());
            a = g.length;
            if (0 === a) return !0;
            for (var l = 0, d = 0; d < a; d++) l += g[d];
            if (0.8 < l / a) return !1
        }
        return !0
    };
    b.autoSave = function (a) {
        GameFlags.G782 && 11 <= (void 0 == b.company ? 0 : b.company.getCurrentDate().year) ? a && a() : b.save("auto", a, function (a) {
            ghg4.ghg5("auto-save failed")
        })
    };
    b.getSaveGames = function () {
        var a = [],
            b = DataStore.getValue("auto");
        b && (g = SaveGameData.parseFromHeaderData("auto",
            b), a.push(g));
        for (b = 1; 5 >= b; b++) {
            var g = DataStore.getValue(b.toString());
            g ? (g = SaveGameData.parseFromHeaderData(b.toString(), g), a.push(g)) : a.push(null)
        }
        for (; 1 < a.count(function (a) {
            return null == a
        });) b = a.last(function (a) {
            return null == a
        }), a.remove(b);
        return a
    };
    b.openSaveView = function () {
        b.pause(!0);
        UI.showSaveView(b.getSaveGames())
    };
    b.openLoadView = function () {
        b.pause(!0);
        UI.showLoadView(b.getSaveGames())
    };
    b.checkGameOver = function () {
        if (!(-5E3 < b.company.cash)) {
            var a = "Your bank account is in the red.\nThankfully your bank has enabled you to overdraw your account up to {0} but be careful, if your account balance is below -{0} you will go bankrupt.".localize();
            1 === b.company.currentLevel && -5E3 >= b.company.cash ? void 0 === b.company.flags.lvl1BankruptWarning ? (b.company.notifications.push(new Notification("Warning".localize("heading"), a.format("{0}K".localize().format(50)), {
                type: NotificationType.AutoPopup
            })), b.company.flags.lvl1BankruptWarning = 1) : -5E4 > b.company.cash && l() : 3 >= b.company.currentLevel && 4E4 >= b.company.cash ? void 0 === b.company.flags.lvl2BankruptWarning ? (b.company.notifications.push(new Notification("Warning".localize("heading"), a.format("{0}K".localize().format(200)), {
                type: NotificationType.AutoPopup
            })), b.company.flags.lvl2BankruptWarning = 1) : -2E5 > b.company.cash && l() : 15E4 >= b.company.cash && (void 0 === b.company.flags.lvl3BankruptWarning ? (b.company.notifications.push(new Notification("Warning".localize("heading"), a.format("{0}M".localize().format(2)), {
                type: NotificationType.AutoPopup
            })), b.company.flags.lvl3BankruptWarning = 1) : -2E6 > b.company.cash && l())
        }
    };
    var l = function () {
        if (!GameFlags.GAME_OVER_DISABLED) {
            var a = b.company;
            if (!a.flags.ghgnogfc) {
                if (0 < a.gameLog.length && a.gameLog.last().releaseWeek >
                    a.currentWeek - 2 && DecisionNotifications.miniBailout.canUse(a)) {
                    var g = DecisionNotifications.miniBailout.getNotification(a);
                    a.notifications.push(g)
                } else if (DecisionNotifications.bailout.canUse(a)) g = DecisionNotifications.bailout.getNotification(a), a.notifications.push(g);
                else {
                    if (a.currentGame && 0.6 < b.getCurrentGameProgress() && DecisionNotifications.inDevBailout.canUse(a)) {
                        g = DecisionNotifications.inDevBailout.getNotification(a);
                        a.notifications.push(g);
                        b.showPendingNotifications();
                        return
                    }
                    a = b.company.getCurrentDate();
                    ghg4.ghg5("game over (bankrupt)", {
                        year: a.year
                    });
                    b.company.notifications.push(new Notification("Game Over".localize("heading"), "Unfortunately you are bankrupt.".localize(), ":-(", {
                        type: NotificationType.AutoPopup
                    }));
                    a = 15 > a.year ? "Electronic Mass Productions" : "Stynga";
                    g = "We have just got confirmation that {0}, which has been in financial trouble lately, has gone bankrupt.\nIt appears that {1}, a behemoth in the gaming industry, has purchased the remains of the company.".localize().format(b.company.name,
                        a);
                    0 < b.company.gameLog.length && (g += "{n}" + "A spokesperson of {0} said, 'We are very excited to have acquired the rights to all of {1} previously released titles.'\n\nHearing this news, many fans of {1} have expressed their disappointment.".localize().format(a, b.company.name));
                    b.company.notifications.push(new Notification("Breaking News".localize("heading"), g, {
                        type: NotificationType.AutoPopup
                    }));
                    b.company.notifications.push(DecisionNotifications.gameOver.getNotification(b.company))
                }
                b.showPendingNotifications()
            }
        }
    };
    window.requestAnimFrame || (window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
            window.setTimeout(a, 1E3 / 60)
        }
    }());
    createjs.Ticker.setPaused(!0);
    b._timeModifier = 1;
    b.gameTime = 0;
    b.SECONDS_PER_WEEK = 4;
    b.getCurrentWeekFractional = function () {
        return b.gameTime / (1E3 * b.SECONDS_PER_WEEK)
    };
    b.updateFeatures = function () {
        if (b.currentFeature) {
            b.currentFeature.lastUpdate ||
                (b.currentFeature.lastUpdate = b.gameTime);
            b.company.currentGame.flags.staffContribution || (b.company.currentGame.flags.staffContribution = {});
            var a = b.company.currentGame.flags.staffContribution;
            b.company.currentGame.flags.devTime || (b.company.currentGame.flags.devTime = 0);
            var g = b.gameTime - b.currentFeature.lastUpdate;
            b.currentFeature.lastUpdate = b.gameTime;
            if (!(0 >= g)) {
                for (var l = 0, d = 0, c = !1, k = 0; k < b.company.staff.length; k++) {
                    var f = b.company.staff[k];
                    f.isWorking() && (c = !0);
                    f.currentFeature && b.currentFeature.id ===
                        f.currentFeature.id && (d += 1, a[f.id] || (a[f.id] = 0), a[f.id] += g * f.efficiency, l += f.currentFeature.progress)
                }
                c && (b.company.currentGame.flags.devTime += g, 0 < d && (l /= d), 0 === b.currentFeature.progress && ("focus" === b.currentFeature.type ? (a = General.getMission(b.currentFeature.id), "preparation" === a.missionType ? VisualsManager.gameStatusBar.updateStatusMessage("Starting ...".localize()) : "BugFixing" === a.missionType ? 0 < b.company.currentGame.bugs && VisualsManager.gameStatusBar.updateStatusMessage("Finishing ...".localize()) :
                    VisualsManager.gameStatusBar.updateStatusMessage(a.name)) : VisualsManager.gameStatusBar.updateStatusMessage(b.currentFeature.name)), "Graphic" == b.currentFeature.id && 1 === b.company.currentLevel && b.company.currentGame.title.toLocaleLowerCase() == "pong".toLocaleLowerCase() && VisualsManager.getCharacterOverlay(b.company.staff.first()).playPong(), b.currentFeature.progress = l, 1 == b.currentFeature.progress && ("Bugfixing" == b.currentFeature.id ? 0 >= b.spawnedPoints && b.finishCurrentMission() : b.finishCurrentMission()),
                    b.currentFeature && b.updateGameProgress())
            }
        }
    };
    b.updateGameProgress = function () {
        var a = b.company.currentGame.missionLog.length;
        1 > a || a / 3 > GameFlags.MAIN_MISSIONS_PER_GAME ? VisualsManager.gameStatusBar.updateProgress(!1) : (VisualsManager.gameStatusBar.updateProgress(b.getCurrentGameProgress()), b.updateCurrentHypePoints())
    };
    b.getCurrentGameProgress = function () {
        var a = 0,
            g = b.company.currentGame;
        if (g.featureLog) {
            for (var a = Missions.BASE_DURATION * GameFlags.MAIN_MISSIONS_PER_GAME * General.getGameSizeDurationFactor(g.gameSize) *
                General.getMultiPlatformDurationFactor(g), l = 0, d = 1; d < g.featureLog.length; d++) g.featureLog[d].duration && (l += g.featureLog[d].duration * g.featureLog[d].progress);
            b.currentFeature && (l += b.currentFeature.duration * b.currentFeature.progress);
            a = l / a
        }
        return a
    };
    b.updateCurrentHypePoints = function () {
        if (!b.company.currentGame || !b.company.currentGame.hypePoints) return 0;
        var a = Math.floor(b.company.currentGame.hypePoints * b.getCurrentGameProgress());
        1 <= a && (Tutorial.hypePoints(), VisualsManager.gameStatusBar.updateHypePoints(a))
    };
    b.updateCharacters = function () {
        if (b.company && b.company.staff) {
            for (var a = 0; a < b.company.staff.length; a++) b.company.staff[a].tick();
            if (b.company.hwCrew)
                for (var a = 0, g = b.company.hwCrew.length; a < g; a++) b.company.hwCrew[a].tick();
            if (b.company.rndCrew)
                for (a = 0, g = b.company.rndCrew.length; a < g; a++) b.company.rndCrew[a].tick()
        }
    };
    b.buyPlatform = function (a) {
        b.company.adjustCash(-a.licencePrize, a.name + " " + "dev. license".localize(" used as {platformname} dev. license"));
        b.company.licencedPlatforms.push(a);
        b.company.availablePlatforms.remove(a);
        UI.updateStatusBar(b.company)
    };
    b.getNewBody = function (a, g) {
        var l = [1, 2, 3, 4, 5, 6, 7, 8].pickRandom();
        "female" === a && (l = [9, 10, 11, 12].pickRandom());
        for (var d = 0; d < b.company.staff.length; d++)
            if (b.company.staff[d].flags.body === l && b.company.staff[d].getOrientation() === g) return b.getNewBody(a, g);
        return l
    };
    b.getNewHead = function (a, g) {
        var l = [1, 2, 3, 4, 5, 6, 7, 8].pickRandom();
        "female" === a && (l = [9, 10, 11, 12].pickRandom());
        for (var d = 0; d < b.company.staff.length; d++)
            if (b.company.staff[d].flags.head === l && b.company.staff[d].getOrientation() ===
                g) return b.getNewHead(a, g);
        return l
    };
    b.setBodyAndHead = function (a) {
        a.flags.body = b.getNewBody(a.sex, a.getOrientation());
        a.flags.head = b.getNewHead(a.sex, a.getOrientation())
    };
    b.getUniqueSalesRank = function (a, g) {
        if (100 < a) return a;
        var l = b.company.gameLog.filter(function (a) {
            return a.currentSalesCash != a.totalSalesCash
        }),
            d = null;
        do (d = l.first(function (b) {
            return b.nextSalesRank == a && b.id != g.id
        })) && a++; while (d);
        return a
    };
    b.getMaxRndBudget = function () {
        var a = b.company.staff.filter(function (a) {
            return a.flags.designSpecialist
        }).count();
        return Math.max(5E5, b.MAX_RND_COST - (a - 1).clamp(0, 7) * b.RND_DECREASE_PER_SPECIALIST)
    };
    b.getMaxHwBudget = function () {
        var a = b.company.staff.filter(function (a) {
            return a.flags.technologySpecialist
        }).count();
        return Math.max(5E5, b.MAX_HW_COST - (a - 1).clamp(0, 7) * b.HW_DECREASE_PER_SPECIALIST)
    };
    b.checkAchievements = function () {
        var a = Achievements.checkForNew(b.company);
        0 < a.length && UI.showAchievements(a)
    };
    b.pauseAppBarShown = function (a) {
        ("string" == typeof a || a instanceof String) && ghg4.ghg5("fragment activated", {
            area: a
        });
        b.pause(!0, !0)
    };
    b.resumeAppBarShown = function () {
        GameManager.loadScreenOpened ? (GameManager.loadScreenOpened = !1, b.resume(!1, !0)) : b.resume(!0, !0)
    };
    var g = [];
    b.addTickListener = function (a, b) {
        g.push({
            f: a,
            isGameTime: b
        })
    };
    b.addTickListener(function (a) {
        if (b.company && !0 != b.loadInProgress) {
            b.gameTime += a;
            a = b.getCurrentWeekFractional();
            var g = b.company.currentWeek;
            b.company.currentWeek = a;
            if (Math.floor(a) > Math.floor(g)) {
                for (var l = Math.floor(a) - Math.floor(g), d = 1; d <= l; d++) General.proceedOneWeek(b.company, g + d);
                0 > b.company.cash &&
                    b.checkGameOver()
            }
            Math.floor(10 * a) > Math.floor(10 * g) && (UI.updateStatusBar(b.company), Research.checkForNewResearch(), b.checkAchievements(), 0 != b._timeModifier && (General.updateNotifications(b.company), b.showPendingNotifications()));
            b.updateFeatures();
            b.updateCharacters();
            b.currentContract && b.updateContractProgress()
        }
    }, !0);
    b._gsapAnimations = [];
    b.addGsapAnimationToGameTime = function (a) {
        b._gsapAnimations.push(a)
    };
    b._updateAllGsapAnimations = function (a) {
        a *= b._timeModifier;
        for (var g = b._gsapAnimations.filter(function (a) {
            return a._gc
        }),
            l = 0; l < g.length; l++) b._gsapAnimations.remove(g[l]);
        for (l = 0; l < b._gsapAnimations.length; l++) g = b._gsapAnimations[l], 0 == a ? g.pause() : (g.timeScale(b._timeModifier), g.paused() && g.resume())
    };
    b.addTickListener(b._updateAllGsapAnimations, !1);
    var n;
    b.update = function () {
        if (n) {
            var a = Date.now(),
                l = (a - n).clamp(0, 500);
            n = a;
            UI && 1 != UI._achievementsActiveTimeModifier && (l *= UI._achievementsActiveTimeModifier);
            if (!(UI && UI.isTransitionVisible || 0 === l)) {
                b.company && (b.company.timePlayed += l);
                for (var a = l * b._timeModifier, d = 0; d < g.length; d++) {
                    var c =
                        g[d];
                    c.isGameTime ? 0 != a && c.f(a) : c.f(l)
                }
            }
        } else n = Date.now()
    };
    var r = 0,
        p = 1 * new Date - 1;
    b._skipFrameCount = 0;
    var s, u = function () {
        if (s) {
            var a = Date.now(),
                g = (a - s).clamp(0, 500);
            s = a;
            0 >= g || (g *= b._timeModifier, createjs.Tween.tick(g, !1), b._skipFrameCount++, 0 != b._timeModifier && SettingsGameplay.isFrameSkipEnabled() && 1 != b._skipFrameCount || b.update(), 0 !== b._timeModifier && CanvasManager ? CanvasManager.update() : GameFlags.IS_STEAM && Steam && CanvasManager && CanvasManager.backgroundStage && Steam.isAvailable() && 2 == b._skipFrameCount &&
                CanvasManager.backgroundStage.update(), 2 == b._skipFrameCount && (b._skipFrameCount = 0), GameFlags.SHOW_FPS && (g = 1E3 / ((a = new Date) - p), isNaN(r) && (r = 0), r += (g - r) / 1, p = a), 2 == b._skipFrameCount && (b._skipFrameCount = 0))
        } else s = Date.now();
        requestAnimFrame(u)
    };
    if (GameFlags.SHOW_FPS) {
        var t = null;
        setInterval(function () {
            if (t) t.innerHTML = r.toFixed(1) + "fps";
            else if (t = document.getElementById("fps")) t.style.display = ""
        }, 1E3)
    }
    b.startDrawLoop = function () {
        u()
    };
    b.getGUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function (a) {
                var b = 16 * Math.random() | 0;
                return ("x" == a ? b : b & 3 | 8).toString(16)
            })
    };
    b.areModsEnabled = function () {
        return "undefined" != typeof ModSupport ? ModSupport.currentMods && 0 < ModSupport.currentMods.length : !1
    }
})();