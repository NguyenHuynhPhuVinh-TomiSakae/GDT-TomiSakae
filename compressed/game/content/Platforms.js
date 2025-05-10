"use strict";
var Platforms = {};
(function () {
    Platforms.getNormalizedAudienceWeighting = function (a) {
        return 0.8 <= a ? a + 0.2 : 0.7 <= a ? a + 0.1 : a + 0.05
    };
    Platforms.getNormalizedGenreWeighting = function (a) {
        return 1 == a ? 1.1 : 0.9 == a ? 1.05 : 0.8 == a ? 1 : 0.7 == a ? 0.95 : 0.6 == a ? 0.9 : 1
    };
    Platforms.getNormGenreWeighting = function (a, c, f) {
        if (void 0 === a) return 1;
        if (f) return (Platforms.getNormGenreWeighting(a, f) + 2 * Platforms.getNormGenreWeighting(a, c)) / 3;
        if (c === GameGenre.Action) return Platforms.getNormalizedGenreWeighting(a[0]);
        if (c === GameGenre.Adventure) return Platforms.getNormalizedGenreWeighting(a[1]);
        if (c === GameGenre.RPG) return Platforms.getNormalizedGenreWeighting(a[2]);
        if (c === GameGenre.Simulation) return Platforms.getNormalizedGenreWeighting(a[3]);
        if (c === GameGenre.Strategy) return Platforms.getNormalizedGenreWeighting(a[4]);
        if (c === GameGenre.Casual) return Platforms.getNormalizedGenreWeighting(a[5]);
        throw "unknown genre: " + c;
    };
    var a = [{
        id: "PC",
        name: "PC",
        imageDates: ["1/1/1", "4/9/1", "16/3/1", "23/4/5"],
        startAmount: 0.22,
        marketKeyPoints: [{
            date: "2/1/1",
            amount: 0.24
        }, {
            date: "4/1/1",
            amount: 0.41
        }, {
            date: "4/10/2",
            amount: 0.48
        }, {
            date: "11/5/2",
            amount: 1.1
        }, {
            date: "16/12/1",
            amount: 2.1
        }, {
            date: "20/7/1",
            amount: 2.4
        }, {
            date: "22/9/2",
            amount: 2.6
        }, {
            date: "23/4/1",
            amount: 4
        }, {
            date: "26/12/4",
            amount: 5.7
        }],
        unitsSold: 5.7,
        licencePrize: 0,
        published: "1/1/1",
        platformRetireDate: "260/12/4",
        developmentCosts: 5E3,
        genreWeightings: [0.9, 1, 0.9, 1, 1, 0.6],
        audienceWeightings: [0.8, 0.9, 1]
    }, {
        id: "G64",
        name: "G64",
        company: "Govodore",
        startAmount: 0.28,
        marketKeyPoints: [{
            date: "2/5/1",
            amount: 0.36
        }, {
            date: "3/1/1",
            amount: 0.38
        }, {
            date: "4/1/1",
            amount: 0.386
        }],
        unitsSold: 0.388,
        licencePrize: 0,
        published: "1/1/1",
        platformRetireDate: "4/6/2",
        developmentCosts: 2E4,
        genreWeightings: [0.9, 1, 0.9, 0.9, 1, 0.7],
        audienceWeightings: [0.8, 0.9, 1],
        techLevel: 1
    }, {
        id: "TES",
        name: "TES",
        company: "Ninvento",
        startAmount: 0.356,
        marketKeyPoints: [{
            date: "2/5/1",
            amount: 0.41
        }, {
            date: "3/1/1",
            amount: 0.444
        }, {
            date: "4/1/1",
            amount: 0.46
        }],
        unitsSold: 0.42,
        licencePrize: 8E4,
        published: "2/1/2",
        platformRetireDate: "6/6/2",
        developmentCosts: 3E4,
        genreWeightings: [0.8, 0.7, 0.8, 0.8, 0.7, 1],
        audienceWeightings: [1, 0.9, 0.6],
        techLevel: 2
    },
    {
        id: "Master V",
        name: "Master V",
        company: "Vena",
        startAmount: 0.43,
        marketKeyPoints: [{
            date: "4/1/1",
            amount: 0.456
        }, {
            date: "6/6/2",
            amount: 0.466
        }],
        unitsSold: 0.7,
        licencePrize: 8E4,
        published: "3/2/3",
        platformRetireDate: "11/3/4",
        developmentCosts: 3E4,
        genreWeightings: [0.9, 0.7, 0.8, 0.8, 0.7, 1],
        audienceWeightings: [0.9, 1, 0.7],
        techLevel: 2
    }, {
        id: "Gameling",
        name: "Gameling",
        company: "Ninvento",
        startAmount: 0.8,
        unitsSold: 1,
        licencePrize: 5E4,
        published: "3/9/2",
        platformRetireDate: "14/4/2",
        developmentCosts: 3E4,
        genreWeightings: [0.8,
            0.7, 0.9, 0.9, 0.6, 1
        ],
        audienceWeightings: [1, 0.9, 0.6],
        techLevel: 2
    }
    ];
    Platforms.allPlatforms = [];
    Platforms.allPlatforms.addRange(a);
    Platforms.allPlatforms.addRange([{
        id: "Vena Gear",
        name: "Vena Gear",
        company: "Vena",
        startAmount: 0.6,
        unitsSold: 0.84,
        licencePrize: 5E4,
        published: "4/2/4",
        platformRetireDate: "8/4/1",
        developmentCosts: 3E4,
        genreWeightings: [0.9, 0.8, 0.8, 0.9, 0.6, 1],
        audienceWeightings: [0.9, 1, 0.8],
        techLevel: 3
    }, {
        id: "Vena Oasis",
        name: "Vena Oasis",
        company: "Vena",
        startAmount: 0.62,
        unitsSold: 0.65,
        licencePrize: 1E5,
        published: "5/2/4",
        platformRetireDate: "10/11/1",
        developmentCosts: 5E4,
        genreWeightings: [1, 0.8, 0.8, 0.9, 0.6, 0.7],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 3
    }, {
        id: "Super TES",
        name: "Super TES",
        company: "Ninvento",
        startAmount: 0.65,
        marketKeyPoints: [{
            date: "6/6/1",
            amount: 0.7
        }, {
            date: "8/10/1",
            amount: 0.73
        }],
        unitsSold: 0.8,
        licencePrize: 5E4,
        published: "5/12/4",
        platformRetireDate: "9/8/1",
        developmentCosts: 6E4,
        genreWeightings: [0.9, 0.9, 0.9, 1, 0.7, 0.9],
        audienceWeightings: [1, 0.9, 0.7],
        techLevel: 3
    }, {
        id: "Playsystem",
        name: "Playsystem",
        company: "Vonny",
        startAmount: 0.85,
        unitsSold: 1.22,
        licencePrize: 2E5,
        published: "7/7/1",
        platformRetireDate: "12/11/3",
        developmentCosts: 6E4,
        genreWeightings: [1, 0.8, 1, 0.9, 0.7, 0.6],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 3
    }, {
        id: "TES 64",
        name: "TES 64",
        company: "Ninvento",
        startAmount: 0.7,
        marketKeyPoints: [{
            date: "9/7/1",
            amount: 0.85
        }],
        unitsSold: 1.25,
        licencePrize: 2E5,
        published: "9/2/1",
        platformRetireDate: "13/5/4",
        developmentCosts: 6E4,
        genreWeightings: [0.9, 0.8, 0.7, 0.8, 0.7, 0.9],
        audienceWeightings: [1, 0.9, 0.9],
        techLevel: 3
    },
    {
        id: "DreamVast",
        name: "DreamVast",
        company: "Vena",
        startAmount: 1.1,
        marketKeyPoints: [{
            date: "11/4/2",
            amount: 1.2
        }],
        unitsSold: 0.9,
        licencePrize: 25E4,
        published: "10/8/3",
        platformRetireDate: "14/1/4",
        developmentCosts: 6E4,
        genreWeightings: [1, 0.7, 0.8, 1, 0.7, 0.7],
        audienceWeightings: [0.7, 1, 1],
        techLevel: 4
    }, {
        id: "Playsystem 2",
        name: "Playsystem 2",
        company: "Vonny",
        startAmount: 1.3,
        unitsSold: 2.4,
        licencePrize: 35E4,
        published: "11/5/2",
        platformRetireDate: "18/6/3",
        developmentCosts: 7E4,
        genreWeightings: [1, 0.8, 1, 0.9, 0.7, 0.9],
        audienceWeightings: [0.9,
            1, 0.8
        ],
        techLevel: 4
    }, {
        id: "mBox",
        name: "mBox",
        company: "Mirconoft",
        startAmount: 1.35,
        marketKeyPoints: [{
            date: "12/10/1",
            amount: 1.6
        }, {
            date: "14/4/1",
            amount: 1.7
        }],
        unitsSold: 2.1,
        licencePrize: 35E4,
        published: "11/12/4",
        platformRetireDate: "17/2/3",
        developmentCosts: 7E4,
        genreWeightings: [1, 0.8, 0.9, 0.9, 0.7, 0.7],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 4
    }, {
        id: "gameSphere",
        name: "Game Sphere",
        iconUri: "./images/platforms/superb/GameSphere.png",
        company: "Ninvento",
        startAmount: 1,
        unitsSold: 1.7,
        licencePrize: 45E4,
        published: "12/12/1",
        platformRetireDate: "17/2/3",
        developmentCosts: 9E4,
        genreWeightings: [0.8, 0.8, 0.7, 0.8, 0.7, 1],
        audienceWeightings: [0.9, 0.9, 0.8],
        techLevel: 3
    }, {
        id: "GS",
        name: "GS",
        company: "Ninvento",
        startAmount: 1.5,
        unitsSold: 3.8,
        licencePrize: 35E4,
        published: "13/8/4",
        marketKeyPoints: [{
            date: "26/12/4",
            amount: 3.8
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 5E4,
        genreWeightings: [0.9, 0.9, 1, 0.9, 0.9, 1],
        audienceWeightings: [1, 0.9, 0.8],
        techLevel: 3
    }, {
        id: "PPS",
        name: "PPS",
        company: "Vonny",
        startAmount: 1.44,
        unitsSold: 3.1,
        licencePrize: 35E4,
        published: "14/3/4",
        marketKeyPoints: [{
            date: "26/12/4",
            amount: 3.1
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 5E4,
        genreWeightings: [1, 0.7, 1, 0.8, 0.8, 0.8],
        audienceWeightings: [0.8, 0.9, 1],
        techLevel: 4
    }, {
        id: "mBox 360",
        name: "mBox 360",
        company: "Mirconoft",
        startAmount: 2.4,
        unitsSold: 3.7,
        licencePrize: 5E5,
        published: "16/8/4",
        platformRetireDate: "24/2/3",
        developmentCosts: 8E4,
        genreWeightings: [1, 0.9, 1, 0.9, 0.7, 0.9],
        audienceWeightings: [0.8, 0.9, 1],
        techLevel: 5
    }, {
        id: "Nuu",
        name: "Nuu",
        company: "Ninvento",
        startAmount: 2,
        unitsSold: 2.8,
        licencePrize: 5E5,
        published: "17/4/4",
        platformRetireDate: "21/6/3",
        developmentCosts: 8E4,
        genreWeightings: [0.8, 0.6, 0.7, 1, 0.7, 1],
        audienceWeightings: [1, 1, 0.7],
        techLevel: 4
    }, {
        id: "Playsystem 3",
        name: "Playsystem 3",
        company: "Vonny",
        startAmount: 2.5,
        unitsSold: 3.7,
        licencePrize: 5E5,
        published: "17/12/4",
        platformRetireDate: "24/9/3",
        developmentCosts: 8E4,
        genreWeightings: [1, 0.9, 0.9, 1, 0.7, 0.8],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 5
    }, {
        id: "grPhone",
        name: "grPhone",
        company: "Grapple",
        startAmount: 2.3,
        unitsSold: 3.7,
        licencePrize: 5E5,
        published: "18/9/1",
        marketKeyPoints: [{
            date: "26/12/4",
            amount: 3.7
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 8E4,
        genreWeightings: [0.8, 0.8, 0.7, 0.9, 0.7, 1],
        audienceWeightings: [0.9, 1, 0.6],
        techLevel: 4
    }, {
        id: "grPad",
        name: "grPad",
        company: "Grapple",
        startAmount: 2.3,
        unitsSold: 3.8,
        licencePrize: 5E5,
        published: "19/7/4",
        marketKeyPoints: [{
            date: "26/12/4",
            amount: 3.8
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 8E4,
        genreWeightings: [0.8, 0.9, 0.7, 0.9, 0.9, 1],
        audienceWeightings: [0.9, 1, 0.6],
        techLevel: 4
    }, {
        id: "mPad",
        name: "mPad",
        company: "Mirconoft",
        startAmount: 2.2,
        unitsSold: 3.4,
        licencePrize: 5E5,
        published: "20/10/4",
        marketKeyPoints: [{
            date: "26/12/4",
            amount: 3.4
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 8E4,
        genreWeightings: [0.7, 0.9, 0.8, 0.9, 0.7, 0.9],
        audienceWeightings: [0.7, 0.9, 0.8],
        techLevel: 4
    }, {
        id: "Wuu",
        name: "Wuu",
        company: "Ninvento",
        startAmount: 3,
        unitsSold: 5,
        licencePrize: 1E6,
        published: "20/12/4",
        marketKeyPoints: [{
            date: "29/12/4",
            amount: 5
        }],
        platformRetireDate: "26/5/2",
        developmentCosts: 8E4,
        genreWeightings: [0.9,
            0.7, 0.8, 1, 0.7, 1
        ],
        audienceWeightings: [0.9, 1, 0.7],
        techLevel: 5
    }, {
        id: "OYA",
        name: "OYA",
        company: "KickIT",
        startAmount: 2.5,
        unitsSold: 4,
        licencePrize: 1E4,
        published: "22/10/4",
        marketKeyPoints: [{
            date: "29/12/4",
            amount: 4
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 4E4,
        genreWeightings: [0.9, 0.7, 0.8, 0.9, 0.8, 1],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 4
    }, {
        id: "mBox One",
        name: "mBox One",
        company: "Mirconoft",
        startAmount: 3.6,
        marketKeyPoints: [{
            date: "23/9/1",
            amount: 4.1
        }, {
            date: "28/12/4",
            amount: 5.5
        }],
        unitsSold: 5.5,
        licencePrize: 1E6,
        published: "23/8/4",
        platformRetireDate: "29/12/4",
        developmentCosts: 1E5,
        genreWeightings: [1, 0.8, 0.9, 0.9, 0.7, 0.9],
        audienceWeightings: [0.7, 1, 0.8],
        techLevel: 6
    }, {
        id: "Playsystem 4",
        name: "Playsystem 4",
        company: "Vonny",
        startAmount: 3.7,
        unitsSold: 6,
        licencePrize: 1E6,
        published: "23/10/4",
        marketKeyPoints: [{
            date: "28/4/4",
            amount: 6
        }],
        platformRetireDate: "29/4/4",
        developmentCosts: 1E5,
        genreWeightings: [1, 0.8, 1, 0.9, 0.7, 0.9],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 6
    }, {
        id: "Swap",
        name: "Swap",
        company: "Ninvento",
        startAmount: 4.5,
        unitsSold: 6,
        licencePrize: 125E4,
        published: "25/3/1",
        marketKeyPoints: [{
            date: "29/12/4",
            amount: 6
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 8E4,
        genreWeightings: [0.9, 0.8, 1, 0.8, 0.7, 1],
        audienceWeightings: [0.9, 1, 0.8],
        techLevel: 6
    }, {
        id: "mBox Next",
        name: "mBox Next",
        company: "Mirconoft",
        startAmount: 5.6,
        marketKeyPoints: [{
            date: "28/9/1",
            amount: 5.8
        }, {
            date: "29/12/4",
            amount: 6.6
        }],
        unitsSold: 6.6,
        licencePrize: 15E5,
        published: "27/8/4",
        platformRetireDate: "260/12/4",
        developmentCosts: 2E5,
        genreWeightings: [0.9, 0.9, 0.9, 0.8,
            0.7, 1
        ],
        audienceWeightings: [0.9, 1, 0.8],
        techLevel: 7
    }, {
        id: "Playsystem 5",
        name: "Playsystem 5",
        company: "Vonny",
        startAmount: 5.2,
        unitsSold: 6.4,
        licencePrize: 15E5,
        published: "27/10/4",
        marketKeyPoints: [{
            date: "29/12/4",
            amount: 6.4
        }],
        platformRetireDate: "260/12/4",
        developmentCosts: 2E5,
        genreWeightings: [1, 0.7, 0.9, 1, 0.7, 0.9],
        audienceWeightings: [0.8, 1, 0.9],
        techLevel: 7
    }
    ]);
    Platforms.getPlatformImage = function (b, c) {
        if (b.iconUri) return b.iconUri;
        var f = -1 != a.indexOf(b) ? "./images/platforms" : "./images/platforms/superb",
            d = null;
        if (c && b.imageDates)
            for (var k = 0; k < b.imageDates.length; k++) General.getWeekFromDateString(b.imageDates[k]) <= c && (0 === k ? d = "{0}/{1}.png".format(f, b.id) : ("PC" === b.id && (f = "./images/platforms/superb"), d = "{0}/{1}{2}.png".format(f, b.id, "-" + (k + 1))));
        return null === d ? "{0}/{1}.png".format(f, b.id) : d
    };
    Platforms._getMarketShareDataForExelGraph = function () {
        for (var a = "", c = 0; c < Platforms.allPlatforms.length; c++) {
            for (var f = Platforms.allPlatforms[c], a = a + (f.id + ","), d = 0; 2E3 > d; d += 4) Platforms.getRetireDate(f) > d && (a = Platforms.getPublishDate(f) <=
                d ? a + (Math.floor(Platforms.getMarketSizeForWeek(f, d) / 5) + ",") : a + ",");
            a += "\n"
        }
    };
    Platforms._getSalesGraph = function () {
        for (var a = 1; 11 > a; a++)
            for (var c = 0; 144 > c; c += 1) {
                var f = new Company("SalesLogCompany");
                f.currentWeek = c;
                var d = new Game(f);
                d.topic = Topics.topics[0];
                d.genre = GameGenre.Action;
                for (var k = 0; k < Platforms.allPlatforms.length; k++) Platforms.getRetireDate(Platforms.allPlatforms[k]) > c && Platforms.getPublishDate(Platforms.allPlatforms[k]) <= c && 0 < Platforms.getMarketSizeForWeek(Platforms.allPlatforms[k], c, f) &&
                    (d.platform = Platforms.allPlatforms[k]);
                d.score = a;
                Sales.calculateSales(f, d)
            }
    };
    Platforms.getRetireDate = function (a) {
        return a.isCustom ? GameManager.company.currentWeek + GameFlags.CONSOLE_SALES_LENGTH : "260/12/4" === a.platformRetireDate ? GameManager.company.currentWeek + 1E3 : General.getWeekFromDateString(a.platformRetireDate)
    };
    Platforms.getPublishDate = function (a) {
        return General.getWeekFromDateString(a.published)
    };
    Platforms.getMarketSize = function (a, c) {
        return Platforms.getMarketSizeForWeek(a, c.currentWeek, c)
    };
    Platforms.isStrongestPlatform = function (a, c, f) {
        for (var d = Platforms.getPlatformsOnMarket(f), k = Platforms.getMarketSizeForWeek(d.first(function (a) {
            return "PC" === a.id
        }), c, f, !0), d = d.filter(function (a) {
            return a.isCustom
        }), m = 0; m < d.length; m++) k = Math.max(k, Platforms.getMarketSizeForWeek(d[m], c, f, !0));
        return Platforms.getMarketSizeForWeek(a, c, f, !0) === k ? !0 : !1
    };
    Platforms.getMarketSizeForWeek = function (a, c, f, d) {
        if (a.isCustom) {
            if (a.currentSalesCash) {
                var k = 1;
                f.flags.grid && !d && Platforms.isStrongestPlatform(a, c, f) &&
                    (k = 1.05);
                return Math.max(5 * Math.floor(a.currentSalesCash / Sales.consoleUnitPrice * k), 5E6 * a.startAmount)
            }
            return 5E6 * a.startAmount
        }
        var m = c - Platforms.getPublishDate(a);
        if (0 > m) return 0;
        var l = a.startAmount,
            g = a.unitsSold,
            n = Platforms.getRetireDate(a) - Platforms.getPublishDate(a);
        if (a.marketKeyPoints) {
            for (var k = Platforms.getPublishDate(a), n = Platforms.getRetireDate(a), r = 0; r < a.marketKeyPoints.length; r++) {
                var p = General.getWeekFromDateString(a.marketKeyPoints[r].date);
                c >= p && (m = c - p, l = a.marketKeyPoints[r].amount,
                    k = p)
            }
            for (r = a.marketKeyPoints.length - 1; 0 <= r; r--) p = General.getWeekFromDateString(a.marketKeyPoints[r].date), c <= p && (n = p, g = a.marketKeyPoints[r].amount);
            n -= k
        }
        k = 1;
        f.flags.grid && !d && "PC" === a.id && Platforms.isStrongestPlatform(a, c, f) && (k = 1.05);
        if (0 === n) return 5E6 * l;
        m > n && (m = n);
        return 5E6 * (m / n * (g - l) + l) * k
    };
    Platforms.getTotalMarketSizePercent = function (a, c) {
        for (var f = 0, d = Platforms.getPlatformsOnMarket(GameManager.company), k = 0; k < d.length; k++) f += Platforms.getMarketSize(d[k], c);
        return 100 / f * Platforms.getMarketSize(a,
            c)
    };
    Platforms.getGenreWeighting = function (a, c, f) {
        for (var d = 1, k = 1, m = 0, l = 0; l < a.length; l++) {
            var g = Platforms.getNormGenreWeighting(a[l].genreWeightings, c, f);
            l < a.length - 1 ? (d *= GameFlags.MULTIPLATFORM_WEIGHTING, m += g * d, k -= d) : m += g * k
        }
        return m
    };
    Platforms.getAudienceWeighting = function (a, c, f) {
        if (void 0 === c) return 1;
        for (var d = 1, k = 1, m = 0, l = 0; l < a.length; l++) {
            var g = Platforms.getPlatformsAudienceWeighting(a[l].audienceWeightings, c, f);
            l < a.length - 1 ? (d *= GameFlags.MULTIPLATFORM_WEIGHTING, m += g * d, k -= d) : m += g * k
        }
        return m
    };
    Platforms.getPlatformsAudienceWeighting =
        function (a, c, f) {
            if (void 0 === c || void 0 === a) return f ? 0.8 : 1;
            if ("young" === c) return f ? a[0] : Platforms.getNormalizedAudienceWeighting(a[0]);
            if ("everyone" === c) return f ? a[1] : Platforms.getNormalizedAudienceWeighting(a[1]);
            if ("mature" === c) return f ? a[2] : Platforms.getNormalizedAudienceWeighting(a[2]);
            throw "unknown audience: " + genre;
        };
    Platforms.doesPlatformSupportGameSize = function (a, c) {
        return "small" != c && "medium" != c ? "Gameling" != a.id && "Vena Gear" != a.id && "grPhone" != a.id && "PPS" != a.id && "GS" != a.id : !0
    };
    Platforms.getPlatformsOnMarket =
        function (a) {
            return Platforms.getPlatforms(a).filter(function (a) {
                return Platforms.getRetireDate(a) > Math.floor(GameManager.company.currentWeek) && !a.isCustom || !0 === a.isCustom && GameManager.company.currentWeek > General.getWeekFromDateString(a.published) && !a.soldOut
            })
        };
    Platforms.getPlatforms = function (a, c) {
        return c ? Platforms.allPlatforms.concat(a.licencedPlatforms) : a.availablePlatforms.concat(a.licencedPlatforms)
    }
})();