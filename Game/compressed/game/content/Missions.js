"use strict";
var Missions = {
    BASE_POINTS: 5,
    BASE_RESEARCH_POINTS: 1.5,
    BASE_DURATION: 1800,
    BASE_ENGINE_DURATION: 1500,
    PREP_DURATION: 1E3,
    FINISH_DURATION: 1E3
};
(function () {
    Missions.getGeneralFactor = function (a, b) {
        var c = General.getMission(b.id);
        if ("preparation" === c.type || "BugFixing" === c.type) return 1;
        var f = LevelCalculator.getLevelBonusFactor(c.experience);
        return Missions.getGenreWeighting(c, a.currentGame, a.currentGame) * f
    };
    Missions.getRepeatMissionModifier = function (a, b) {
        var c = 1,
            f = 0,
            f = a.currentGame;
        f.featureLog && (f = f.featureLog.count(function (a) {
            return a.id === b.id
        }), 1 === f ? c = 0.7 : 2 <= f && (c = 0.3));
        return c
    };
    Missions.executePublishingMission = function (a, b) {
        var c = a.currentGame,
            f = General.getMission(b.id),
            d = 1,
            k = Missions.getRepeatMissionModifier(a, b),
            d = d * k,
            k = GameManager.getCurrentGameProgress(),
            k = Math.abs(k - 0.7),
            d = d - k / 2;
        c.featureLog.count(function (a) {
            return "marketing" === a.type
        });
        k = LevelCalculator.getMissionLevel(f);
        d *= f.marketingFactor / 5 * k;
        k = 100 * d * GameGenre.getGenreWeighting(c.topic.genreWeightings, c.genre, c.secondGenre);
        k = Math.floor(0.9 * k + 0.1 * k * a.getRandom());
        if (c.sequelTo) {
            var m = 0.2 * k;
            c.flags.sequelsTooClose && (m *= -1);
            c.flags.usesSameEngineAsSequel ? m = 0 > m ? 2 * m : m / 2 : c.flags.hasBetterEngineThanSequel &&
                (m = 0 > m ? -1 * m : 1.2 * m);
            k += m
        }
        c.hypePoints += k;
        c.costs += f.cost;
        a.adjustCash(-f.cost, f.name);
        "game hype: {0}. delta: {1}. factor contribution of mission: {2}".format(c.hypePoints, k, d).log();
        c.featureLog.push(f)
    };
    Missions.getTopicMissionOverrides = function (a, b) {
        if (b.missionOverrides) {
            var c = a;
            c.genreWeightings || (c = Missions.getAllMissions().first(function (a) {
                return a.id === c.id
            }));
            var f = [],
                d = Missions.DevMissions.indexOf(c);
            if (-1 != d)
                for (var k = game.topic.missionOverrides, m = 0; m < k.length; m++) f.push(k[m][d]);
            return f
        }
    };
    Missions.getGenreWeighting = function (a, b) {
        var c = b.genre,
            f = b.secondGenre,
            d = a;
        d.genreWeightings || (d = Missions.getAllMissions().first(function (a) {
            return a.id === d.id
        }));
        var k = d.genreWeightings.slice();
        if (b.topic.missionOverrides) {
            var m = Missions.DevMissions.indexOf(d);
            if (-1 != m)
                for (var l = b.topic.missionOverrides, g = 0; g < l.length; g++) {
                    var n = l[g][m];
                    n && (k[g] = n)
                }
        }
        return GameGenre.getGenreWeighting(k, c, f)
    };
    Missions.getMissionWithId = function (a) {
        return Missions.getAllMissions().first(function (b) {
            return b.id === a
        })
    };
    Missions.Stage1Missions = [{
        id: "Engine",
        name: "Engine".localize(),
        description: "Improves the game engine.",
        technologyFactor: 0.8,
        designFactor: 0.2,
        genreWeightings: [1, 0.7, 0.7, 0.9, 0.9, 0.6],
        percentage: 100 / 3
    }, {
        id: "Gameplay",
        name: "Gameplay".localize(),
        description: "Improves the gameplay.",
        technologyFactor: 0.2,
        designFactor: 0.8,
        genreWeightings: [0.9, 0.8, 0.9, 1, 1, 1],
        percentage: 100 / 3
    }, {
        id: "Story/Quests",
        name: "Story/Quests".localize(),
        description: "Work on the story and quests.",
        technologyFactor: 0.2,
        designFactor: 0.8,
        genreWeightings: [0.7, 1, 1, 0.8, 0.8, 0.7],
        percentage: 100 / 3
    }];
    Missions.Stage2Missions = [{
        id: "Dialogs",
        name: "Dialogues".localize(),
        description: "Work on the dialogues.",
        technologyFactor: 0.1,
        designFactor: 0.9,
        genreWeightings: [0.6, 1, 1, 0.7, 0.7, 0.7],
        percentage: 100 / 3
    }, {
        id: "Level Design",
        name: "Level Design".localize(),
        description: "Improves the level design.",
        technologyFactor: 0.6,
        designFactor: 0.4,
        genreWeightings: [0.9, 0.8, 0.9, 0.9, 1, 1],
        percentage: 100 / 3
    }, {
        id: "AI",
        name: "Artificial Intelligence".localize(),
        description: "Improves the AI.",
        technologyFactor: 0.8,
        designFactor: 0.2,
        genreWeightings: [1, 0.7, 0.8, 1, 0.9, 0.6],
        percentage: 100 / 3
    }];
    Missions.Stage3Missions = [{
        id: "World Design",
        name: "World Design".localize(),
        description: "Work on the world design.",
        technologyFactor: 0.4,
        designFactor: 0.6,
        genreWeightings: [0.8, 1, 1, 0.8, 1, 0.7],
        percentage: 100 / 3
    }, {
        id: "Graphic",
        name: "Graphic".localize(),
        description: "Improves the graphics.",
        technologyFactor: 0.5,
        designFactor: 0.5,
        genreWeightings: [1, 0.9, 0.9, 1, 0.8, 1],
        percentage: 100 / 3
    }, {
        id: "Sound",
        name: "Sound".localize(),
        description: "Improves the sound.",
        technologyFactor: 0.4,
        designFactor: 0.6,
        genreWeightings: [0.9, 0.8, 0.8, 0.9, 0.9, 0.9],
        percentage: 100 / 3
    }];
    Missions.DevMissions = Missions.Stage1Missions.concat(Missions.Stage2Missions.concat(Missions.Stage3Missions));
    Missions.MarketingMissions = [{
        id: "MagazineMarketing",
        name: "Advertise in magazines".localize(),
        shortName: "Magazines".localize("short name"),
        description: "Advertise in gaming magazines to get the game well known before it hits the shelves.".localize(),
        marketingFactor: 0.5,
        cost: 5E4
    }, {
        id: "DemosMarketing",
        name: "Magazines & Demos".localize(),
        shortName: "Magazines & Demos".localize("short name"),
        description: "Advertise in gaming magazines and distribute demos of the game to give players an opportunity to try the game.".localize(),
        marketingFactor: 1,
        cost: 15E4
    }, {
        id: "Marketing Campaign",
        name: "Small Marketing Campaign".localize(),
        shortName: "Small Campaign".localize("short name"),
        description: "Start a global marketing campaign including magazine ads, demos and interviews.".localize(),
        marketingFactor: 1.5,
        cost: 5E5
    }, {
        id: "Marketing CampaignXL",
        name: "Large Marketing Campaign".localize(),
        shortName: "Large Campaign".localize("short name"),
        description: "Start a global marketing campaign to promote the game far and wide. Organize exclusive reviews, behind the scenes reports, TV trailers and more.".localize(),
        marketingFactor: 2,
        cost: 2E6
    }];
    Missions.PreparationMission = {
        id: "preparation",
        missionType: "preparation"
    };
    Missions.BugFixingMission = {
        id: "BugFixing",
        missionType: "BugFixing"
    };
    Missions.Stage1Missions.forEach(function (a) {
        a.missionType =
            "dev";
        a.level = 1;
        a.experience = 0
    });
    Missions.Stage2Missions.forEach(function (a) {
        a.missionType = "dev";
        a.level = 1;
        a.experience = 0
    });
    Missions.Stage3Missions.forEach(function (a) {
        a.missionType = "dev";
        a.level = 1;
        a.experience = 0
    });
    Missions.MarketingMissions.forEach(function (a) {
        a.missionType = "marketing";
        a.level = 1;
        a.experience = 0
    });
    Missions.getAllMissions = function () {
        return Missions.Stage1Missions.concat(Missions.Stage2Missions.concat(Missions.Stage3Missions.concat(Missions.MarketingMissions).concat([Missions.PreparationMission,
        Missions.BugFixingMission
        ])))
    }
})();