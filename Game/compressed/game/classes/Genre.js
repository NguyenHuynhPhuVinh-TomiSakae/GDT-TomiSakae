"use strict";
var Genre = function (a) {
    this.name = a
};
(function () {
    Genre.load = function (a) {
        return new Genre(a.name)
    };
    Genre.prototype.save = function () {
        var a = {};
        a.name = this.name;
        return a
    }
})();
