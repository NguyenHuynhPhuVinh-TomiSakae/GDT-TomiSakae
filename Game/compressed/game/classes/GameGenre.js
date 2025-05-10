"use strict";
var GameGenre = {
    Action: {
        id: "Action",
        name: "Action".localize("genre")
    },
    Adventure: {
        id: "Adventure",
        name: "Adventure".localize("genre")
    },
    RPG: {
        id: "RPG",
        name: "RPG".localize("genre")
    },
    Simulation: {
        id: "Simulation",
        name: "Simulation".localize("genre")
    },
    Strategy: {
        id: "Strategy",
        name: "Strategy".localize("genre")
    },
    Casual: {
        id: "Casual",
        name: "Casual".localize("genre")
    },
    getAll: function () {
        return [this.Action, this.Adventure, this.RPG, this.Simulation, this.Strategy, this.Casual]
    },
    getGoldenRatio: function (a, b) {
        if (b) return (2 * GameGenre.getGoldenRatio(a) +
            GameGenre.getGoldenRatio(b)) / 3;
        if (a === GameGenre.Action) return 1.8;
        if (a === GameGenre.Adventure) return 0.4;
        if (a === GameGenre.RPG) return 0.6;
        if (a === GameGenre.Simulation) return 1.6;
        if (a === GameGenre.Strategy) return 1.4;
        if (a === GameGenre.Casual) return 0.5;
        throw "unknown genre: " + a;
    },
    getGenreWeighting: function (a, b, c) {
        if (void 0 === a) return 1;
        if (c) return (GameGenre.getGenreWeighting(a, c) + 2 * GameGenre.getGenreWeighting(a, b)) / 3;
        if (b === GameGenre.Action) return a[0];
        if (b === GameGenre.Adventure) return a[1];
        if (b === GameGenre.RPG) return a[2];
        if (b === GameGenre.Simulation) return a[3];
        if (b === GameGenre.Strategy) return a[4];
        if (b === GameGenre.Casual) return a[5];
        throw "unknown genre: " + b;
    },
    getIndexOf: function (a) {
        var b = GameGenre.getAll().first(function (b) {
            return b.id == a.id
        });
        return GameGenre.getAll().indexOf(b)
    }
};