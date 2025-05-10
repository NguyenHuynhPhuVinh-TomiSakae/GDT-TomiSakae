"use strict";
var SaveGameData = function (a, b, c, f, d, k, m, l) {
    this.slot = a;
    this.companyName = b;
    this.cash = c;
    this.fans = f;
    this.currentWeek = d;
    this.saveTime = k;
    this.mods = m;
    this.pirateMode = l
};
SaveGameData.parseFromHeaderData = function (a, b) {
    if ("string" == typeof b || b instanceof String) b = JSON.parse(b);
    if (!b) return null;
    b.mods || (b.mods = !1);
    return new SaveGameData(a, b.name, b.cash, b.fans, b.currentWeek, b.date, b.mods, b.pirateMode)
};