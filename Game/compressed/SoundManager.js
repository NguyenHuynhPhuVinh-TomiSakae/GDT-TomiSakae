var Sound = {},
    SOUND_DISABLED = !1;
(function () {
    Sound.init = function () {
        if (!SOUND_DISABLED) {
            void 0 == DataStore.getValue("masterVolume") && DataStore.setValue("masterVolume", 50);
            void 0 == DataStore.getValue("muted") && DataStore.setValue("muted", !1);
            void 0 == DataStore.getValue("allowBackgroundMusic") && DataStore.setValue("allowBackgroundMusic", !0);
            void 0 == DataStore.getValue("fxAllowed") && DataStore.setValue("fxAllowed", !0);
            createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
            preload = new createjs.LoadQueue;
            preload.installPlugin(createjs.Sound);
            preload.onComplete = this.playJingle;
            var a = ".mp3",
                b = "./audio";
            GameFlags.ARM_VERSION && (b = "./audio/arm");
            PlatformShim.ISWIN8 || (b = "./audio/ogg", a = ".ogg");
            preload.loadManifest([{
                id: "doing-my-best",
                src: b + "/doing-my-best" + a,
                type: "sound"
            }, {
                id: "miss-management",
                src: b + "/miss-management" + a,
                type: "sound"
            }, {
                id: "new-adventure",
                src: b + "/new-adventure" + a,
                type: "sound"
            }, {
                id: "the-winning-strategy",
                src: b + "/the-winning-strategy" + a,
                type: "sound"
            }, {
                id: "getting-to-success",
                src: b + "/getting-to-success" + a,
                type: "sound"
            }, {
                id: "fly-like-a-butterfly",
                src: b + "/fly-like-a-butterfly" + a,
                type: "sound"
            }, {
                id: "startup",
                src: b + "/startup" + a,
                type: "sound"
            }, {
                id: "GameDevTycoonTitle",
                src: b + "/GameDevTycoonTitle" + a,
                type: "sound"
            }, {
                id: "clickSound",
                src: b + "/button-50" + a,
                type: "sound"
            }, {
                id: "designSpawn",
                src: b + "/designSpawn" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "researchSpawn",
                src: b + "/researchSpawn" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "techSpawn",
                src: b + "/techSpawn" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "bugSpawn",
                src: b + "/bugSpawn" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "designSpawnEnd",
                src: b + "/designSpawnEnd" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "researchSpawnEnd",
                src: b + "/researchSpawnEnd" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "techSpawnEnd",
                src: b + "/techSpawnEnd" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "bugSpawnEnd",
                src: b + "/bugSpawnEnd" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 4
            }, {
                id: "popupOpen",
                src: b + "/popupOpen" +
                    a,
                type: "sound"
            }, {
                id: "levelUp",
                src: b + "/levelUp" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 1 : 3
            }, {
                id: "newRecord",
                src: b + "/newRecord" + a,
                type: "sound"
            }, {
                id: "research",
                src: b + "/research" + a,
                type: "sound"
            }, {
                id: "notificationTyping",
                src: b + "/notificationTyping" + a,
                type: "sound"
            }, {
                id: "pointCount",
                src: b + "/pointCount" + a,
                type: "sound"
            }, {
                id: "tack",
                src: b + "/tack" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 3
            }, {
                id: "cash",
                src: b + "/cash" + a,
                type: "sound",
                data: 1
            }, {
                id: "ping",
                src: b + "/ping" + a,
                type: "sound",
                data: 1
            },
            {
                id: "pong",
                src: b + "/pong" + a,
                type: "sound",
                data: 1
            }, {
                id: "bugDecrease",
                src: b + "/bugDecrease" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 1 : 8
            }, {
                id: "trainingProgress",
                src: b + "/trainingProgress" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 1 : 6
            }, {
                id: "flipflap",
                src: b + "/flipflap" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 4 : 20
            }, {
                id: "gameReady",
                src: b + "/game-ready" + a,
                type: "sound"
            }, {
                id: "achievement1",
                src: b + "/achievement-1" + a,
                type: "sound"
            }, {
                id: "reviewTack",
                src: b + "/reviewTack" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ?
                    3 : 15
            }, {
                id: "boost",
                src: b + "/boost" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 1 : 7
            }, {
                id: "newNotification",
                src: b + "/newNotification" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 1 : 6
            }, {
                id: "star",
                src: b + "/star" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 5
            }, {
                id: "star-m2",
                src: b + "/star-m2" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 5
            }, {
                id: "star-m3",
                src: b + "/star-m3" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 5
            }, {
                id: "star-p2",
                src: b + "/star-p2" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ?
                    2 : 5
            }, {
                id: "star-p3",
                src: b + "/star-p3" + a,
                type: "sound",
                data: GameFlags.LIMIT_SOUND_INSTANCE ? 2 : 5
            }
            ]);
            Sound._backgroundMusic = ["doing-my-best", "miss-management", "new-adventure", "the-winning-strategy"];
            Sound._backgroundMusic2 = ["getting-to-success"];
            Sound._backgroundMusic3 = ["startup"];
            Sound._backgroundMusic4 = ["fly-like-a-butterfly"];
            Sound._fxTracks = "clickSound designSpawn researchSpawn techSpawn bugSpawn designSpawnEnd researchSpawnEnd techSpawnEnd bugSpawnEnd popupOpen levelUp newRecord research notificationTyping pointCount tack cash ping pong bugDecrease trainingProgress flipflap reviewTack boost".split(" ")
        }
    };
    Sound.playSoundLoop = function (a, b) {
        if (!SOUND_DISABLED) {
            var c = b;
            c || (c = 1);
            Sound.getFxAllowed() && (Sound[a] && Sound[a].stop(), Sound[a] = createjs.Sound.play(a, createjs.Sound.INTERRUPT_LATE, 0, 0, 100, c, 0))
        }
    };
    Sound.pauseAllLoopingFx = function () {
        SOUND_DISABLED || (Sound.notificationTyping && Sound.notificationTyping.pause(), Sound.pointCount && Sound.pointCount.pause())
    };
    Sound.resumeAllLoopingFx = function () {
        SOUND_DISABLED || (Sound.notificationTyping && Sound.notificationTyping.resume(), Sound.pointCount && Sound.pointCount.resume())
    };
    Sound.stopSound = function (a) {
        SOUND_DISABLED || Sound[a] && Sound[a].stop()
    };
    Sound.playSoundOnce = function (a, b, c) {
        SOUND_DISABLED || (b || (b = 1), Sound.getFxAllowed() && (Sound[a] = c ? createjs.Sound.play(a, createjs.Sound.INTERRUPT_LATE, c, 0, !1, b, 0) : createjs.Sound.play(a, createjs.Sound.INTERRUPT_LATE, 0, 0, !1, b, 0)))
    };
    var a;
    Sound.playSpawnSound = function (b, c) {
        if (!SOUND_DISABLED) {
            if (GameFlags.LIMIT_SPAWN_SOUNDS) {
                if (a && 30 > Date.now() - a) return;
                a = Date.now()
            }
            if (c || GameFlags.BUBBLE_SOUND_AT_SPAWN_TIME)
                if (!c || GameFlags.BUBBLE_SOUND_AT_END_OF_ANIMATION) "t" ===
                    b ? c ? Sound.playSoundOnce("techSpawnEnd", 0.5) : Sound.playSoundOnce("techSpawn", 0.2) : "d" === b ? c ? Sound.playSoundOnce("designSpawnEnd", 0.5) : Sound.playSoundOnce("designSpawn", 0.2) : "r" === b ? c ? Sound.playSoundOnce("researchSpawnEnd", 0.5) : Sound.playSoundOnce("researchSpawn", 0.2) : "e" === b ? c ? Sound.playSoundOnce("techSpawnEnd", 0.5) : Sound.playSoundOnce("techSpawn", 0.2) : "b" === b && (c ? Sound.playSoundOnce("bugSpawnEnd", 0.12) : Sound.playSoundOnce("bugSpawn", 0.6))
        }
    };
    Sound.click = function () {
        SOUND_DISABLED || Sound.getFxAllowed() &&
            (Sound.clickSound = createjs.Sound.play("clickSound", createjs.Sound.INTERRUPT_LATE, 0, 0, !1, 0.5, 0))
    };
    var b = !1;
    Sound.playJingle = function () {
        b = !0;
        SOUND_DISABLED || Sound._backgroundMusicIsPlaying || (Sound.setMasterVolume(Sound.getMasterVolume()), $("#splashScreen").is(":visible") ? (Sound.GameDevTycoonTitle = createjs.Sound.play("GameDevTycoonTitle", null, 0, 0, !1, 0.5, 0), Sound.getMusicAllowed() || Sound.GameDevTycoonTitle.setMute(!0)) : Sound.playBackgroundMusic())
    };
    Sound.playBackgroundMusic = function () {
        !SOUND_DISABLED &&
            b && (Sound._backgroundMusicIsPlaying = !0, Sound.setMasterVolume(Sound.getMasterVolume()), Sound.playBackgroundMusicIsCalled || (Sound.GameDevTycoonTitle && Sound.GameDevTycoonTitle.stop(), Sound.changeBackgroundMusic(!0)), Sound.playBackgroundMusicIsCalled = !0)
    };
    Sound.startBackgroundMusic = function (a, b) {
        SOUND_DISABLED || (Sound[Sound._currentBackgroundMusic] && Sound[Sound._currentBackgroundMusic].stop(), Sound._currentBackgroundMusic = a, Sound[Sound._currentBackgroundMusic] = createjs.Sound.play(a, null, b, 0, !1, 0.15, 0),
            Sound[Sound._currentBackgroundMusic].onComplete = function () {
                Sound.changeBackgroundMusic()
            }, Sound[Sound._currentBackgroundMusic].onPlayInterrupted = function () {
                Sound.changeBackgroundMusic()
            }, Sound.getMusicAllowed() || Sound[Sound._currentBackgroundMusic].setMute(!0))
    };
    Sound.changeBackgroundMusic = function (a) {
        if (!SOUND_DISABLED) {
            for (var b = null; !b;) {
                var c;
                GameManager.company ? (c = GameManager.company.currentLevel, c = 1 == c ? Sound._backgroundMusic.pickRandom() : 2 == c ? Sound._backgroundMusic.concat(Sound._backgroundMusic2).pickRandom() :
                    3 == c ? Sound._backgroundMusic.concat(Sound._backgroundMusic2.concat(Sound._backgroundMusic3)).pickRandom() : Sound._backgroundMusic.concat(Sound._backgroundMusic2.concat(Sound._backgroundMusic3.concat(Sound._backgroundMusic4))).pickRandom()) : c = Sound._backgroundMusic.pickRandom();
                c != Sound._currentBackgroundMusic && (b = c)
            }
            a ? Sound.startBackgroundMusic(b) : Sound.startBackgroundMusic(b, 9E3 * Math.random())
        }
    };
    Sound.setMasterVolume = function (a, b) {
        SOUND_DISABLED || (createjs.Sound.setVolume(a / 100), b || DataStore.setValue("masterVolume",
            a))
    };
    Sound.getMasterVolume = function () {
        return DataStore.getValue("masterVolume")
    };
    var c;
    Sound.getFxAllowed = function () {
        if (void 0 === c) {
            var a = DataStore.getValue("fxAllowed");
            return !0 == a || "true" == a
        }
        return c
    };
    var f;
    Sound.getMusicAllowed = function () {
        if (void 0 === f) {
            var a = DataStore.getValue("allowBackgroundMusic");
            return !0 == a || "true" == a
        }
        return f
    };
    Sound.allowFx = function (a) {
        if (!SOUND_DISABLED) {
            DataStore.setValue("fxAllowed", a);
            c = a;
            for (var b = 0; b < Sound._fxTracks.length; b++) Sound[Sound._fxTracks[b]] && Sound[Sound._fxTracks[b]].setMute(!a);
            ghg4.ghg5("change soundfx settings", {
                setting: a ? "on" : "off"
            })
        }
    };
    Sound.allowMusic = function (a) {
        SOUND_DISABLED || (DataStore.setValue("allowBackgroundMusic", a), f = a, Sound._currentBackgroundMusic ? Sound[Sound._currentBackgroundMusic] && Sound[Sound._currentBackgroundMusic].setMute(!a) : Sound.GameDevTycoonTitle.setMute(!a), ghg4.ghg5("change music settings", {
            setting: a ? "on" : "off"
        }))
    }
})();