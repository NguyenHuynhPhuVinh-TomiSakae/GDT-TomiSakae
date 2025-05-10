var ResourceKeys = {};
(function () {
    var a = ResourceKeys,
        b = {},
        c = "./images/";
    PlatformShim.ISLOWRES && (c = "./images1366/");
    b.Level1 = c + "level1.png";
    b.PreviewChair = "./images/player/chair.png";
    b.PreviewPants1 = "./images/player/pants.png";
    b.PreviewPants9 = "./images/player/pants9.png";
    b.PreviewHands1 = "./images/player/hands1.png";
    b.PreviewHands4 = "./images/player/hands4.png";
    b.PreviewHands5 = "./images/player/hands5.png";
    b.PreviewHands9 = "./images/player/hands9.png";
    b.PreviewHands10 = "./images/player/hands10.png";
    b.PreviewHands12 = "./images/player/hands12.png";
    b.PreviewBody1 = "./images/player/body1.png";
    b.PreviewBody2 = "./images/player/body2.png";
    b.PreviewBody3 = "./images/player/body3.png";
    b.PreviewBody4 = "./images/player/body4.png";
    b.PreviewBody5 = "./images/player/body5.png";
    b.PreviewBody6 = "./images/player/body6.png";
    b.PreviewBody7 = "./images/player/body7.png";
    b.PreviewBody8 = "./images/player/body8.png";
    b.PreviewBody9 = "./images/player/body9.png";
    b.PreviewBody10 = "./images/player/body10.png";
    b.PreviewBody11 = "./images/player/body11.png";
    b.PreviewBody12 = "./images/player/body12.png";
    b.PreviewHead1 = "./images/player/head1.png";
    b.PreviewHead2 = "./images/player/head2.png";
    b.PreviewHead3 = "./images/player/head3.png";
    b.PreviewHead4 = "./images/player/head4.png";
    b.PreviewHead5 = "./images/player/head5.png";
    b.PreviewHead6 = "./images/player/head6.png";
    b.PreviewHead7 = "./images/player/head7.png";
    b.PreviewHead8 = "./images/player/head8.png";
    b.PreviewHead9 = "./images/player/head9.png";
    b.PreviewHead10 = "./images/player/head10.png";
    b.PreviewHead11 = "./images/player/head11.png";
    b.PreviewHead12 = "./images/player/head12.png";
    b.PreviewDesk = "./images/player/desk.png";
    $.extend(a, b);
    a.getLevelResources = function () {
        for (var a = [b, d, k, m], g = [], c = 0; c < arguments.length; c++) {
            var r = arguments[c];
            if (a.length < r) throw new "invalid level: " + r;
            g.addRange(f(a[r - 1]))
        }
        return g
    };
    var f = function (a) {
        var b = [],
            d;
        for (d in a) a.hasOwnProperty(d) && b.push(a[d]);
        return b
    },
        d = {},
        k = {},
        m = {};
    d.Level2 = c + "superb/level2.png";
    d.Level2Desk = c + "superb/level2Desk.png";
    d.Level2C1 = c + "superb/level2C1.png";
    d.Level2C2 = c + "superb/level2C2.png";
    d.Level2C2Keyboard = c + "superb/level2C2Keyboard.png";
    d.Level2C3 = c + "superb/level2C3.png";
    d.Level2C4 = c + "superb/level2C4.png";
    $.extend(a, d);
    k.Level3 = c + "superb/level3.png";
    k.Level3Desk = c + "superb/level3Desk.png";
    k.Level3C1 = c + "superb/level3C1.png";
    k.Level3C2 = c + "superb/level3C2.png";
    k.Level3C2Keyboard = c + "superb/level3C2Keyboard.png";
    k.Level3C3 = c + "superb/level3C3.png";
    k.Level3C4 = c + "superb/level3C4.png";
    $.extend(a, k);
    m.Level4 = c + "superb/level4.png";
    m.Level4LockedLeft = c + "superb/level4LockedLeft.png";
    m.Level4LockedRight = c + "superb/level4LockedRight.png";
    m.Level4Desk =
        c + "superb/level4Desk.png";
    m.Level4C1 = c + "superb/level4C1.png";
    m.Level4C2 = c + "superb/level4C2.png";
    m.Level4C2Keyboard = c + "superb/level4C2Keyboard.png";
    m.hwDesk1 = c + "superb/hwDesk1.png";
    m.hwDesk2 = c + "superb/hwDesk2.png";
    m.rndDesk1 = c + "superb/rndDesk1.png";
    m.rndDesk2 = c + "superb/rndDesk2.png";
    $.extend(a, m)
})();