"use strict";
var Media = {};
(function () {
    var a = Media;
    Media.getNewNotifications = function (a) {
        for (var b = [], g = Media.TriggerNotifications.filter(function (b) {
            return -1 === a.triggerNotificationsShown.indexOf(b.id) && b.trigger(a)
        }), l = 0; l < g.length; l++) {
            var c = g[l];
            a.triggerNotificationsShown.push(c.id);
            c.getNotification ? b.push(c.getNotification(a)) : b.push(c.notification)
        }
        a.triggerNotificationsShown.addRange(b.map(function (a) {
            return a.id
        }));
        b.addRange(Media.getScheduledNotifications(a));
        return b
    };
    Media.getScheduledNotifications = function (a) {
        for (var b = [], g = Math.floor(a.currentWeek), l = Media.allScheduledStories.filter(function (b) {
            return -1 === a.scheduledStoriesShown.indexOf(b.id)
        }), c = 0; c < l.length; c++) {
            var d = l[c];
            g == General.getWeekFromDateString(d.date, d.ignoreGameLengthModifier) && b.push(d)
        }
        a.scheduledStoriesShown.addRange(b.map(function (a) {
            return a.id
        }));
        return b.map(function (b) {
            return b.notification ? b.notification : b.getNotification(a)
        })
    };
    var b = function (a, b) {
        var g = GameManager.company.getDate(General.getWeekFromDateString(a)),
            l = GameManager.company.getDate(General.getWeekFromDateString(b));
        if (g.year != l.year) return 1 < Math.abs(l.year - g.year) ? "in the coming years".localize("date referral sentence fragment") : 3 >= l.month ? "early next year".localize("date referral sentence fragment") : 8 <= l.month ? "late next year".localize("date referral sentence fragment") : "later next year".localize("date referral sentence fragment");
        g = l.month - g.month;
        return 0 === g ? "later this month".localize("date referral sentence fragment") : 1 === g ? "next month".localize("date referral sentence fragment") : 2 === g ? "in two months".localize("date referral sentence fragment") :
            4 >= g ? "in the coming months".localize("date referral sentence fragment") : 12 == l.month ? "at the end of this year".localize("date referral sentence fragment") : "later this year".localize("date referral sentence fragment")
    };
    General.getETADescription = b;
    Media.industryNewsHeadline = "Industry News".localize("heading");
    Media.platformNewsHeadline = "Platform News".localize("heading");
    var c = {
        id: "riseOf64",
        date: "1/6/3",
        notification: new Notification({
            header: Media.platformNewsHeadline,
            text: "Recent market studies suggest that the Govodore G64 is steadily outselling competitors in the PC sector. Consumers prefer the lower price, greater availability and the flexible hardware configuration over other home computers.{n}Experts say that this might spell the end of competing hardware manufacturers.".localize(),
            image: "./images/platforms/G64.png"
        })
    },
        f = {
            id: "PCTakesOver",
            date: "3/6/2",
            notification: new Notification({
                header: Media.platformNewsHeadline,
                text: "Recent market data shows that the Govodore G64 seems to be slowly losing market share against other PC manufacturers.{n}In an unofficial statement a G64 employee said that the company has been unsuccessful in introducing higher priced computers to compete against newer and more advanced PCs.".localize(),
                image: "./images/platforms/G64.png"
            })
        },
        d = {
            id: "TESRumour",
            date: "1/8/2",
            notification: new Notification({
                header: Media.platformNewsHeadline,
                text: "According to rumours the Japanese company Ninvento is planning to launch its very own home gaming console. Ninvento is known for the widely successful arcade game 'Dinkey King'.{n}Many industry experts doubt that home gaming consoles will take off but we are eager to see what Ninvento will deliver.".localize()
            })
        },
        k = {
            id: "TargetAudiences",
            date: "2/9/3",
            notification: new Notification({
                header: "Industry Report".localize(),
                text: "Recent studies suggest that the increasing variety of gaming devices also creates a market for more specialized games.\nSome platforms become more popular with younger gamers while others cater for the more mature age groups.{n}As more and more developers enter the market we expect developers to focus their games on specific age groups to really make an impact.".localize(),
                type: NotificationType.IndustryNews
            })
        },
        m = {
            id: "TESSuccess",
            date: "2/6/4",
            notification: new Notification({
                header: Media.platformNewsHeadline,
                text: "The recently released TES home console by Ninvento has proven to be a massive success. Sales numbers have exceeded expectations by far.{n}As one customer says: 'I love the games that come with the TES and playing with a controller is so much more fun than on a keyboard.'".localize(),
                image: "./images/platforms/TES.png"
            })
        },
        l = {
            id: "MasterVRumour",
            date: "2/10/3",
            notification: new Notification({
                header: Media.platformNewsHeadline,
                text: "Following the massive success of the TES console there are now rumours circulating that Vena, another Japanese company, is planning to release a home gaming console on their own.".localize()
            })
        },
        g = {
            id: "MasterVSuccess",
            date: "3/3/2",
            notification: new Notification({
                header: Media.platformNewsHeadline,
                text: "The recently released gaming console, Master V by Vena, has stirred up the market worldwide.\nIndustry experts say that the console is not very well marketed in North America but that it will flourish in other parts of the world.".localize(),
                image: "./images/platforms/Master V.png"
            })
        },
        n = {
            id: "MarketingStory",
            date: "4/5/2",
            ignoreGameLengthModifier: !0,
            notification: new Notification("Industry Report".localize(),
                "With the growing interest in video games there is also a growing audience for video game magazines. These magazines offer a great new way for game developers to market their upcoming games.".localize(), {
                type: NotificationType.IndustryNews
            })
        },
        r = {
            id: "SuperTES",
            date: "5/10/4",
            notification: new Notification(Media.platformNewsHeadline, "Today, Ninvento announced the much anticipated successor to the popular TES console. 'This is the greatest console we have ever built. It comes with state of the art 16-bit graphics and sound. It is simply super and that's why we decided to call it the Super TES!'.{n}Fans around the world have been waiting for this moment and it seems that they will not be disappointed.".localize())
        };
    r.notification.image = "./images/platforms/superb/Super TES.png";
    var p = {
        id: "VonnyNinventoAnnouncement1",
        date: "6/3/4",
        notification: new Notification(Media.platformNewsHeadline, "The media is abuzz with the latest news from this year's Entertainment Conference. In a surprise announcement Vonny, a company known for general electronics has presented a prototype console called the Play System.{n}Apparently Vonny has collaborated with Ninvento, creators of the beloved and successful TES and Super TES consoles to develop what is basically a Super TES with a CD drive.{n}This would be the world's first console using a CD drive.".localize())
    };
    p.notification.image = "./images/platforms/superb/PlaysystemA.png";
    var s = {
        id: "VonnyNinventoAnnouncement2",
        date: "6/3/4",
        notification: new Notification(Media.platformNewsHeadline, "Journalists around the world are baffled as only one day after Vonny and Ninvento jointly announced the Play System at the Entertainment Conference things have turned sour.{n}Ninvento announced today that they will cancel the project and instead seek to develop a new console with a different partner.{n}Rumour has it that the distribution deal the companies had worked out was unfavorable to Ninvento handing over much of the control to Vonny.{n}This seems to be the end of the Play System.".localize(),
            "OK".localize(), 0.1)
    };
    s.notification.image = "./images/platforms/superb/PlaysystemA.png";
    var u = {
        id: "PlaySystem2Announcement",
        date: "11/3/2",
        notification: new Notification(Media.platformNewsHeadline, "Today, Vonny has announced the much anticipated successor to their popular Playsystem console. The Playsystem 2 will have upgraded hardware to compete with newer generation consoles such as the DreamVast.{n}Unlike the DreamVast the Playsystem 2 does not focus much on online play but instead seems to focus on the strengths of the previous Playsystem. A solid upgraded controller including vibration function, upgraded graphics, support for DVD titles and even backwards compatibility with Playsystem 1 games.".localize())
    };
    u.notification.image = "./images/platforms/superb/Playsystem 2.png";
    var t = {
        id: "DreamVastSlowing",
        date: "11/4/2",
        notification: new Notification(Media.platformNewsHeadline, "Since release, the DreamVast from Vena has been one of the fastest selling consoles in history but lately it seems that the anticipation of the upcoming Playsystem 2 release is slowing down sales.{n}If the Playsystem 2 can hold up to the hype when it is released then Vena could be in deep trouble.".localize())
    };
    t.notification.image =
        "./images/platforms/superb/DreamVast.png";
    var q = {
        id: "Playsystem2Launch",
        date: "11/6/1",
        notification: new Notification(Media.platformNewsHeadline, "The launch of the Playsystem 2 has been a phenomenal success. Stores everywhere are out of stock as manufacturing can barely keep up. Fans have resorted to buying the console on internet auction sites for as much as five times the normal price.{n}While Vonny has managed to have the most successful launch in history, sales of Vena's DreamVast have plummeted.".localize())
    };
    q.notification.image = "./images/platforms/superb/Playsystem 2.png";
    var v = {
        id: "DreamVastDiscontinued",
        date: "12/7/3",
        notification: new Notification(Media.platformNewsHeadline, "In a sobering announcement, Vena has today confirmed the discontinuation of the DreamVast. Vena's president said that while many companies will still deliver games for the platform, the company will no longer produce new units in the future.{n}Vena fans worldwide are disappointed, as a beloved part of gaming console history is coming to an end.".localize())
    };
    v.notification.image = "./images/platforms/superb/DreamVast.png";
    var A = {
        id: "GSRumour",
        date: "13/2/1",
        notification: new Notification(Media.platformNewsHeadline, "Rumours are spreading that Ninvento is working on a new game console. Most of the rumours state that it is not a successor to the somewhat disappointing Game Sphere but instead a new console in the mobile market.{n}Ninvento's Gameling has been leading the mobile market thanks to numerous updates and a large list of very popular games available on the platform, but the hardware is aging quickly and many players wonder what will be next.".localize())
    },
        z = {
            id: "Gen7Rumours",
            date: "15/10/3",
            notification: new Notification(Media.industryNewsHeadline, "Industry experts predict that we will see the next generation of video game consoles as early as next year. 'The hardware advancements in the PC industry have not been reflected in gaming consoles yet and we can expect the next generation to be a truly exciting leap forward.'{n}According to rumours, both Mirconoft and Vonny are in a race to introduce the next-generation console, with Mirconoft apparently already collaborating with partners to prepare titles for what is called the 'mBox 360.'".localize())
        },
        B = {
            id: "mBox360",
            date: "16/5/3",
            notification: new Notification(Media.platformNewsHeadline, "Today, Mirconoft presented their new console called the mBox 360. It is the first in the next generation of expected consoles, and features hardware rivaling mid-end PC counterparts. With a relatively cheap purchase price, Mirconoft will be selling the device at a loss as part of a long-term strategy to gain market share.{n}Gamers around the world are excited by the new console and it is predicted that the mBox 360 will have a massive impact on the console market.".localize())
        };
    B.notification.image = "./images/platforms/superb/mBox 360.png";
    var D = {
        id: "Nuu",
        date: "16/12/4",
        notification: new Notification(Media.platformNewsHeadline, "Today, Ninvento has announced their bid in the next-generation console market by announcing the Nuu. Instead of trying to compete with Mirconoft and Vonny on hardware strength and graphical power, Ninvento has decided to deliver a truly unique gaming experience.{n}The Nuu features a controller with a built-in motion sensor, which allows players to stand front of their TV and use the controller as a counterpart to virtual objects such as a tennis racquet.{n}First playtesters were seen with huge grins on their faces. It seems to be a lot of fun.".localize())
    };
    D.notification.image = "./images/platforms/superb/Nuu.png";
    var E = {
        id: "grPad",
        date: "19/6/2",
        notification: new Notification(Media.platformNewsHeadline, "Today, Grapple, the company responsible for the massively successful grPhone has announced their plans to release a tablet device called the grPad. Tablet devices are not a new idea in the computing industry but earlier attempts never seemed to take off. Many expect the grPad to do very well.".localize())
    };
    E.notification.image = "./images/platforms/superb/grPad.png";
    var w = {
        id: "mPadReport",
        date: "20/11/2",
        notification: new Notification(Media.platformNewsHeadline, "The mPad has received mixed reviews at launch, with many of them highlighting the fact that the mPad is indeed not the same as the grPad from Grapple. We will see what the future holds for this platform.".localize())
    };
    w.notification.image = "./images/platforms/superb/mPad.png";
    Media.allScheduledStories = [c, f, {
        id: "EndOFG64",
        date: "4/5/4",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Hardware manufacturers around the world were surprised today as Govodore, the creator of the popular G64, has filed for bankruptcy.{n}Govodore failed to introduce a higher priced alternative and was forced to shut down production of the G64. The platform will retire from the market {0}.".localize("{0} is date referral sentence fragment").format(b("4/5/4", "4/6/2")),
                image: "./images/platforms/G64.png"
            })
        }
    }, d, {
            id: "TESRumour2",
            date: "1/10/2",
            getNotification: function () {
                return new Notification({
                    header: Media.platformNewsHeadline,
                    text: "Today, Ninvento has confirmed recent rumours and announced their plans to release a new home gaming console called 'TES' {0}.\nThe console features cartridge based games and a uniquely designed controller.".localize("{0} is date referral sentence fragment").format(b("1/10/2", "2/1/2")),
                    image: "./images/platforms/TES.png"
                })
            }
        }, m, l, {
            id: "MasterVPreAnnouncement",
            date: "2/12/1",
            getNotification: function () {
                return new Notification({
                    header: Media.platformNewsHeadline,
                    text: "Today, Vena has confirmed recent rumours about a new gaming console and announced the Master V.\nThe company claims that the Master V is technically superior to the massively successful TES by Ninvento and plans to release it {0}.".localize("{0} is date referral sentence fragment").format(b("2/12/1",
                        "3/2/3")),
                    image: "./images/platforms/Master V.png"
                })
            }
        }, g, k, n, {
            id: "Gameling",
            date: "3/7/4",
            getNotification: function () {
                return new Notification({
                    header: Media.platformNewsHeadline,
                    text: "Today, Ninvento has announced that they will introduce a portable gaming device called Gameling. The device comes with changeable game cartridges, a monochrome screen on a green background, built-in speakers and even multiplayer support via a connection cable.{n}Compared to PCs and other gaming consoles the Gameling is underpowered but given the lower cost and excellent portability it might find a huge following.{n}The Gameling is said to hit shelves {0}.".localize("{0} is date referral sentence fragment").format(b("3/7/4",
                        "3/9/2")),
                    image: "./images/platforms/Gameling.png"
                })
            }
        }];
    Media.allScheduledStories.addRange([{
        id: "VenaGear",
        date: "4/1/2",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Vena, creator of the Master V console, has announced the Vena Gear, a portable console to directly compete against the Gameling from Ninvento.{n}A spokesperson for the company said, 'Unlike similar devices on the market which don't come close to gaming consoles the Vena Gear has basically the full power of the Master V, except that you can take it with you. The Vena Gear also has a full color screen'.{n}Will this device topple the Gameling? We will see. The Vena Gear will debut {0}.".localize("{0} is date referral sentence fragment").format(b("4/1/2",
                    "4/2/4")),
                image: "./images/platforms/superb/Vena Gear.png"
            })
        }
    }, {
        id: "Oasis",
        date: "5/1/1",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Vena has announced that they will release a new gaming console {0}. The Vena Oasis comes with 16-bit graphics and sound which promises a new kind of gaming experience.{n}Vena said at the announcement, 'The Oasis is a new start, it will be the genesis of a new generation of gaming consoles and we believe it will do very well in the market'. Some of the games already announced for the console suggest that it will appeal to more mature audiences.".localize("{0} is date referral sentence fragment").format(b("5/1/1",
                    "5/2/4")),
                image: "./images/platforms/superb/Vena Oasis.png"
            })
        }
    }, r, p, s, {
        id: "PlaySystemAnnouncement",
        date: "7/6/1",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Vonny has announced their very own console called the Playsystem. Apparently the company has completely reworked their earlier Play System prototype after Ninvento cancelled the project.{n}The new Playsystem comes with a CD-ROM drive and 32-bit processors and is wholly owned by Vonny. Industry professionals say that this might be the beginning of a new generation of consoles. Ninvento declined to comment. The Playsystem will enter the market {0}.".localize("{0} is date referral sentence fragment").format(b("7/6/1",
                    "7/7/1")),
                image: "./images/platforms/superb/Playsystem.png"
            })
        }
    }, {
        id: "TES64Announcement",
        date: "8/12/1",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Ninvento announced their next generation console called TES 64 today. Expected {0} it is the world's first gaming console to sport 64-bit processors for graphics and audio. Ninvento said this will allow never-before-seen 3D realism.{n}In recent years the Super TES has lost a lot of market share to more modern consoles. Market experts said that the hardware of the TES 64 is surely impressive, but expressed their surprise that it still uses ROM cartridges instead of the much cheaper and higher capacity CD-ROM format.{n}Nevertheless, the TES 64 seems like an impressive console and Ninvento has said that it plans to aggressively price it against Vonny's Playsystem.".localize("{0} is date referral sentence fragment").format(b("8/12/1",
                    "9/2/1")),
                image: "./images/platforms/superb/TES 64.png"
            })
        }
    }, {
        id: "DreamVast",
        date: "10/1/2",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "The day Vena fans have waited a long time for has arrived, as Vena has announced their next generation console, the DreamVast. A company spokesperson said, 'The DreamVast is a dream come true. This console is the most advanced gaming console in history!'.{n}The new console sports powerful graphics hardware promising graphic quality rivaling those on high-end PCs. The DreamVast is also the first console to ship with a modem out-of-the-box, making it ready for online play. The console will be available {0}.".localize("{0} is date referral sentence fragment").format(b("10/1/2",
                    "10/8/3")),
                image: "./images/platforms/superb/DreamVast.png"
            })
        }
    }, u, t, {
        id: "mBoxAnnouncement",
        date: "11/5/1",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "PC software juggernaut Mirconoft has announced today that they will enter the game console market with their very own gaming console called the mBox.{n}First demonstrations have been impressive, but we will have to wait and see how it fares against the popular DreamVast, as well as against the recently announced and much anticipated Playsystem 2. The new console is said to debut {0}.".localize("{0} is date referral sentence fragment").format(b("11/5/1",
                    "11/7/1")),
                image: "./images/platforms/superb/mBox.png"
            })
        }
    }, {
        id: "mBoxDelayed",
        date: "11/6/2",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Mirconoft has announced the delay of their new gaming console, mBox. The new release date is '{0}'. Rumour has it that the incredible success of the Playsystem 2 launch has prompted Mirconoft to delay their own debut.".localize("{0} is date referral sentence fragment").format(b("11/6/2", "11/12/4")),
                image: "./images/platforms/superb/mBox.png"
            })
        }
    },
        q, v, {
        id: "gameSphere",
        date: "12/10/4",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Ninvento announced the new Ninvento Game Sphere, with which it will try to compete with Vonny's market leading Playsystem 2 and Mirconoft's strong alternative, the mBox. The curiously shaped console has similar hardware specifications as other consoles.{n}The Game Sphere is Ninvento's first console to have an optical disc drive instead of cartridges. However, instead of using full sized CD and DVDs, like its competitors, the console features a mini-DVD drive. Game Spheres will start rolling into stores {0}.".localize("{0} is date referral sentence fragment").format(b("12/10/4",
                    "12/12/1")),
                image: "./images/platforms/superb/GameSphere.png"
            })
        }
    },
        A, {
        id: "NinventoGS",
        date: "13/8/1",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Ninvento has announced a new mobile console called the Ninvento GS. It features two screens, one of them touch sensitive, and promises unique gameplay. While Ninvento has been struggling to regain their market lead ever since the TES 64 they still have a very strong position on the mobile market.{n}The Ninvento GS promises to strengthen this position and aims to breath life into a stagnating mobile market. The console will be in stores {0}.".localize("{0} is date referral sentence fragment").format(b("13/8/1",
                    "13/8/4")),
                image: "./images/platforms/superb/GS.png"
            })
        }
    }, {
        id: "PPSAnnouncement",
        date: "13/8/2",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Vonny announced that they are launching a new mobile gaming console called Portable Playsystem, or PPS for short, {0}. Media analysts speculate that this announcement is meant to distract users from Ninvento's launch of the Ninvento GS.{n}While the Ninvento GS utilizes an innovative dual screen, the PPS instead makes use of a single screen and will focus on giving developers access to much more powerful hardware.".localize("{0} is date referral sentence fragment").format(b("13/8/2",
                    "14/3/4")),
                image: "./images/platforms/superb/PPS.png"
            })
        }
    },
        z, B, {
        id: "mPad",
        date: "20/6/4",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Mirconoft has announced their very own tablet device to combat the massive marketshare of Grapple's grPad device. The mPad features a sophisticated cover that comes with a integrated, ultra-thin keyboard. The tablet itself has a widescreen display and a integrated stand.{n}The mPad seems to be a combination of a traditional notebook and a tablet, and promises to shake up the market. The new product will be on the market {0}.".localize("{0} is date referral sentence fragment").format(b("20/6/4",
                    "20/10/4")),
                image: "./images/platforms/superb/mPad.png"
            })
        }
    },
        w, D, {
        id: "PS3",
        date: "17/8/4",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Vonny has announced the successor to the massively successful Playsystem 2. The new console is predictably called 'Playsystem 3' and comes with an impressive hardware configuration, making it the most powerful console in gaming history.{n}The console also doubles as a player for BlueRay, which Vonny hopes will be the successor to the DVD format. All this power comes with a hefty price tag, also making the Playsystem 3 the most expensive console ever.{n}We will see how consumers will react to this given the lower-cost alternatives; however, considering the massive success of the Playsystem 2, Vonny can be hopeful.\nThe console is expected to ship {0}.".localize("{0} is date referral sentence fragment").format(b("17/8/4",
                    "17/12/4")),
                image: "./images/platforms/superb/Playsystem 3.png"
            })
        }
    }, {
        id: "grPhone",
        date: "18/6/1",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "Today, Grapple, a company well known for their role in the early PC industry and, more recently, for their portable music player, grPod, have announced that they will soon release a powerful new mobile phone. The phone has a touch screen and sports a surprisingly powerful CPU.{n}The integrated graphics chipset should also allow the phone to run games and, since the phone comes with its own application delivery platform, it could become a great device for mobile games. The grPhone will be available {0}.".localize("{0} is date referral sentence fragment").format(b("18/6/1",
                    "18/9/1")),
                image: "./images/platforms/superb/grPhone.png"
            })
        }
    },
        E, {
        id: "PS3Hype",
        date: "17/12/2",
        getNotification: function () {
            return new Notification({
                header: Media.platformNewsHeadline,
                text: "In what some call a bizarre show of arrogance Vonny representatives have been trash-talking Mirconoft's successful mBox 360 while praising their own upcoming Playsystem 3 in the lead-up to their launch {0}.{n}Asked about the unusually high price of the Playsystem 3, a high-ranking company official replied, 'People will work more hours to buy one. We want people to feel that they want it more than anything else.'.{n}We are not sure that players will really want it so badly, as, so far, no major game titles have been announced for the Playsystem 3. It might be a while before developers are able to take full advantage of the powerful new console.".localize("{0} is date referral sentence fragment").format(b("17/12/2",
                    "17/12/4")),
                image: "./images/platforms/superb/Playsystem 3.png"
            })
        }
    }, {
        id: "wuu",
        date: "20/8/4",
        getNotification: function (a) {
            a = "Ninvento has revealed that their bid in the next generation of consoles will be called the Wuu. The new console features a controller with a integrated display.{n}This is said to make local multiplayer games much more interesting by giving each player a unique screen. Ninvento has always been at the forefront of innovation and this console seems, once again, to be a brave move.\nThe Wuu is said to be available {0}.".localize("{0} is date referral sentence fragment").format(b("20/8/4",
                "20/12/4"));
            return new Notification({
                header: Media.platformNewsHeadline,
                text: a,
                image: "./images/platforms/superb/Wuu.png"
            })
        }
    }, {
        id: "mboxOne",
        date: "23/4/4",
        getNotification: function (a) {
            var g = a.getLatestCustomConsole(),
                l = "For fans of the mBox, the long wait for an update to the console will soon be over as Mirconoft has announced that the mBox One will be available {0}.".localize("{0} is date referral sentence fragment").format(b("23/4/4", "23/8/4"));
            g && (l += " Mirconoft has lost a substantial share of the market since {0} released their {1} console.{n}".localize().format(a.name,
                g.name));
            l += " " + "The new console is marketed as a unified entertainment platform and comes with voice control and a camera which is always watching to enable gesture control. A camera which is always on is not the only controversial feature as the new console also seems to require internet access at least once a day to function properly, does not support previous mBox games and seems to place restrictions on how games can be shared or resold.{n}Clearly, Mirconoft wants to push the current status quo and deliver a console for a new future of gaming but we are not sure if players will share Micronoft's vision.".localize();
            return new Notification({
                header: Media.platformNewsHeadline,
                text: l,
                image: "./images/platforms/superb/mBox One.png"
            })
        }
    }, {
        id: "ps4",
        date: "23/5/1",
        getNotification: function (a) {
            a = a.getLatestCustomConsole();
            var g = "Just after Mirconoft have announced their new bet in the upcoming console generation, Vonny has announced that they will release their new, long-awaited console, the Playsystem 4, {0}. The console seems to do everything that the Playsystem 3 did, only better.{n}Unlike the mBox One, the Playsystem 4 doesn't have an always-online requirement and seems much more player friendly. We think that there is hardly a risk of Vonny fans being disappointed".localize("{0} is date referral sentence fragment, sentence itself is a fragment and continues with 'but ...'").format(b("23/5/1",
                "23/10/4")),
                g = a ? g + " but we will see how well the new console competes with the popular {0} console.".localize().format(a.name) : g + " but we will see how the new console will fare against its competitors.".localize();
            return new Notification({
                header: Media.platformNewsHeadline,
                text: g,
                image: "./images/platforms/superb/Playsystem 4.png"
            })
        }
    }, {
        id: "mboxOnePs4",
        date: "23/6/2",
        getNotification: function (a) {
            a = a.getLatestCustomConsole() ? "Vonny and {0}".localize().format(a.name) : "Vonny";
            a = "After a massive public backlash to the controversial features announced for the upcoming mBox One, Mirconoft has today published a letter outlining their change of plans. The mBox One will no longer require a constant internet connection and will not place restrictions on how games are sold or shared.{n}Clearly the different and much more popular strategies of companies like {0}, as well as vocal players themselves, have forced this change of direction.".localize().format(a);
            return new Notification({
                header: Media.platformNewsHeadline,
                text: a,
                image: "./images/platforms/superb/mBox One.png"
            })
        }
    }, {
        id: "gameEndNotification",
        date: "30/5/4",
        getNotification: function (a) {
            a = "Dear {0}, we, the worldwide game developers guild, would like to invite you to a special award ceremony at our main meeting at the end of the year. Please come.\n\n(Hint: The game will end at the end of this year.)".localize().format(a.staff[0].name);
            return new Notification("Invitation".localize("heading"), a)
        }
    },
    {
        id: "swap",
        date: "24/10/4",
        getNotification: function (a) {
            a = "Ninvento has today revealed their upcoming game console: The Ninvento Swap. The device seems to function both as a portable console and as a home console. When the Swap is removed from its docking station, unique controller pads called 'Fun-Pads' are attached to the side of the screen and turn the console into a handheld device.{n}The reaction to the announcement was mixed as many voiced concerns that the device might not have a clear audience and might fail to appeal to both casual and core gamers. Others praised the unique nature of the device and pointed out that Ninvento has frequently managed to land successes with odd devices in the past. The Swap is said to hit markets {0}.".localize("{0} is date referral sentence fragment").format(b("24/10/4",
                "25/3/1"));
            return new Notification({
                header: Media.platformNewsHeadline,
                text: a,
                image: "./images/platforms/superb/Swap.png"
            })
        }
    }, {
        id: "swapBitter",
        date: "25/4/1",
        getNotification: function (a) {
            a = "The recently released Ninvento Swap console has caused an unusual social media storm. It all started when a consumer licked one of the game cartridges and reported that it tasted extremely bad. Thousands of consumers then repeated the experiment, tasting their cartridges and reporting the result on social media, further encouraging others to do the same.{n}Ninvento has now published an official statement to confirm that game cartridges for the Swap are coated with denatonium benzoate, a non-toxic bittering agent. This was apparently done to discourage children from biting on and swallowing the fairly small cartridges.{n}Initial reactions to the console itself have been more positive than to the taste of its cartridges as the Swap is turning out to be quite popular with gamers around the globe.".localize();
            return new Notification({
                header: Media.industryNewsHeadline,
                text: a,
                image: "./images/platforms/superb/Swap.png"
            })
        }
    }, {
        id: "visorius",
        date: "25/9/2",
        getNotification: function (a) {
            a = "A company by the name of RiseVR has developed a virtual reality headset which promises to finally start the path towards true 3D immersion. The new headset called Visorius looks like a pair of giant ski-goggles and provides a large field of vision as well as near-perfect motion tracking.".localize();
            a += "{n}" + "A first test left some players feeling a little motion-sick but with the right game this technology can surely deliver a new level of immersion.".localize();
            a = new Notification({
                header: Media.platformNewsHeadline,
                text: a,
                image: ["./images/platforms/superb/visorius.png"]
            });
            a.setFlag("visoriusAnnounced", !0);
            return a
        }
    }, {
        id: "growingPC",
        date: "22/10/2",
        getNotification: function (a) {
            a = "Just as the industry seems to have silently accepted the slow demise of PC gaming as more and more games are primarily developed for consoles, there seems to be a resurgence of the PC market.{n}New powerful and affordable hardware, a growing indie-developer scene and the rise of crowd-funded financing has meant a slew of new exciting projects hitting the PC market.\nIt seems that the PC market will only grow stronger in the coming years.{n}For console lovers, this isn't bad news either as many PC games are also ported to the most successful consoles.".localize();
            return new Notification({
                header: Media.industryNewsHeadline,
                text: a,
                image: ["./images/platforms/superb/PC-3.png"]
            })
        }
    }, {
        id: "oya",
        date: "22/1/4",
        getNotification: function (a) {
            a = "Out of nowhere, a new company called KickIT has kicked up a media storm by successfully crowd-funding the development of a new gaming console in just under eight hours.{n}The console, dubbed 'OYA', uses similar technology as modern phones and tablets and delivers games exclusively via its own online store.\nThe OYA is a cubed-shape console and much smaller than most gamepads but the shape isn't the only thing that is small as the developer states that the price tag of the OYA will be under 100cr.{n} KickIT also stated that every game on the OYA will offer a free DEMO. The OYA will be available {0}.".localize().format(b("22/1/4",
                "22/10/4"));
            return new Notification({
                header: Media.platformNewsHeadline,
                text: a,
                image: "./images/platforms/superb/OYA.png"
            })
        }
    }, {
        id: "mboxNext",
        date: "27/3/4",
        getNotification: function (a) {
            a = a.getLatestCustomConsole();
            var g = "Mirconoft has announced their plans to release a completely revamped version of the mBox {0} called mBox Next. The new console seems to cleverly integrate Mirconoft's own motion sensor add-on for the mBox One into one small package.{n}Visually, the mBox Next is reminiscent of the earlier mBox 360 with a much lighter tone marking a departure from the bulky and dark style of the mBox One. The technology of the mBox Next seems promising  ".localize("{0} is date referral sentence fragment, sentence itself is a fragment and continues with 'but ...'").format(b("27/3/4",
                "27/8/4")),
                g = a ? g + " but we will see how well the new console competes with the popular {0} console.".localize().format(a.name) : g + " but we will see how the new console will fare against its competitors.".localize();
            return new Notification({
                header: Media.platformNewsHeadline,
                text: g,
                image: "./images/platforms/superb/mBox Next.png"
            })
        }
    }, {
        id: "ps5",
        date: "27/6/4",
        getNotification: function (a) {
            a = a.getLatestCustomConsole();
            var g = "Many have expected that Vonny will announce a new platform before Mirconoft's mBox Next will hit the market and, today, Vonny did just that. Keeping with company tradition, and in contrast to competitor Mirconoft's naming practices, the newly announced console is aptly named Playsystem 5.{n}The Playsystem 5 seems an incremental update, coming out {0} with a form-factor that reminds of the early Playsystem 3. The new system promises to be a solid update".localize("{0} is date referral sentence fragment, sentence itself is a fragment and continues with 'but ...'").format(b("27/6/4",
                "27/10/4")),
                g = a ? g + " but we will see how well the new console competes with the popular {0} console.".localize().format(a.name) : g + " but we will see how the new console will fare against its competitors.".localize();
            return new Notification({
                header: Media.platformNewsHeadline,
                text: g,
                image: "./images/platforms/superb/Playsystem 5.png"
            })
        }
    }
    ]);
    Media.createFirstGameStory = function (a) {
        var b = a.currentGame,
            g = "{0}, a newcomer in the game industry, has just released their first game '{1}'.\nThe game ".localize("fragment, continue with firstGameStoryRatingFragments").format(a.name,
                b.title);
        return g = 3 >= b.score ? g + "got generally low scores from reviewers but with a bit of experience we are sure that we will see better games from {0} in the future.".localize("firstGameStoryRatingFragments").format(a.name) : 5.6 >= b.score ? g + "had a moderate response from reviewers. We are curious what {0} will deliver in the future.".localize("firstGameStoryRatingFragments").format(a.name) : g + "received favorable reviews. \nWith such a good start {0} are sure to gain fans quickly.".localize("firstGameStoryRatingFragments").format(a.name)
    };
    Media.createSequelStory = function (a, b) {
        var g = a.getGameById(b.sequelTo),
            l = 9 < b.score ? "outstanding".localize() : 7 < b.score ? "great".localize() : 5 < b.score ? "moderate".localize() : 3 < b.score ? "below average".localize() : "pretty bad".localize(),
            l = "{0} has recently released a sequel to their game {1}. The newest game in the series titled {2} was met with {3} responses.".localize().format(a.name, g.title, b.title, l);
        6 < b.score && b.flags.hasBetterEngineThanSequel && (l += " " + "Critics praised that {0} had a newer engine than the original, really driving technical innovation.".localize().format(b.title));
        b.flags.sequelsTooClose && (g = Math.floor(b.releaseWeek - g.releaseWeek), l += "{n}" + "A major negative reaction came from fans who felt that with the original coming out just {0} weeks before, the company is trying to milk the franchise for more money without delivering much new for players to enjoy.".localize().format(g));
        a.notifications.push(new Notification("Sequel".localize(), l, "OK".localize(), 2 + 2 * a.getRandom(), {
            type: NotificationType.SalesReports
        }))
    };
    Media.createExtensionPackStory = function (a, b) {
        var g =
            a.getGameById(b.sequelTo),
            l = 9 < b.score ? "outstanding".localize() : 7 < b.score ? "great".localize() : 5 < b.score ? "moderate".localize() : 3 < b.score ? "below average".localize() : "pretty bad".localize(),
            l = "{0} has recently released an expansion pack to their game {1}. The expansion pack titled {2} was met with {3} responses.".localize().format(a.name, g.title, b.title, l);
        b.flags.sequelsTooClose && (g = Math.floor(b.releaseWeek - g.releaseWeek), l += "{n}A major negative reaction came from fans who felt that with the main game coming out just {0} weeks before, the company is trying to milk the franchise for more money without delivering much new for players to enjoy.".localize().format(g));
        a.notifications.push(new Notification("Expansion Pack".localize(), l, "OK".localize(), 2 + 2 * a.getRandom(), {
            type: NotificationType.SalesReports
        }))
    };
    a.createWelcomeNotifications = function () {
        var a = GameManager.company;
        if (GameManager.ghg2()) {
            var b = GameManager.ghg0() ? "lite".localize("as in lite edition of the game") : "trial".localize();
            a.notifications.push(new Notification({
                header: "{0} version".localize("could either be lite version or trial version").format(b),
                text: "This is the {0} version of Game Dev Tycoon in which you can play until year five.".localize("{0} is either lite or trial").format(b),
                type: NotificationType.AutoPopup
            }))
        }
        b = "Welcome to Game Dev Tycoon!\nIn this business simulation you have been transported back in time to start your very own game development company right at the beginning of the PC revolution. In the next {0} years you can build your dream company, create best selling games, gain fans and become the leader of the market.{n}Before you can start your adventure you have to give your upcoming company a name.".localize().format(35);
        a.notifications.push(new Notification("Welcome".localize("heading to greet the player"),
            b, {
            type: NotificationType.AutoPopup
        }));
        a.notifications.push(new Notification("{enterCompanyName}"))
    };
    a.generateAudienceMismatchStory = function (a, b) {
        var g = 8 < b.score ? "outstanding".localize() : 6 < b.score ? "good".localize() : "moderate".localize(),
            l = "It seems that the initial sales for {0} have fallen way below expected numbers. The game received {1} reviews but it seems that the chosen platform isn't very popular with the target audience.".localize("{1} is adjective like good, moderate, outstanding");
        a.notifications.push(new Notification("Sales Report".localize(),
            l.format(b.title, g), {
            type: NotificationType.SalesReports
        }))
    };
    a.createSameGenreTopicStory = function (a, b) {
        if (7 > b.score) {
            var g = "The latest game by {0} has had reviewers scratching their heads. Rather than bringing a new and innovative game to market the company delivered another {1}/{2} game which is more or less the same setting as their previous game.{n}One reviewer commented:'I think {3} was simply developed too soon after the previous game with not enough innovations in technology and design.'".localize();
            return new Notification("Media Report".localize(), g.format(a.name, b.topic.name, b.genre.name, b.title), {
                type: NotificationType.SalesReports
            })
        }
    };
    a.createLevel2Notifications = function () {
        var a = GameManager.company,
            b = "Welcome to your new office!\nNow that you have a bigger office you can also hire staff and forge a world-class development team to make even better games.".localize();
        a.notifications.push(new Notification("New Office".localize(), b, "OK".localize(), 0.3, {
            type: NotificationType.CompanyMilestones,
            previewImage: "./images/notificationIcons/icon_notification_new_office.png"
        }))
    };
    a.createLevel2OfficeStory = function () {
        var a = 0.5 + 1.5 * Math.random(),
            b = GameManager.company,
            g = "It seems that {0} has recently moved into an office in a well known technology park and is now searching for employees.{n}The company, which is known for games such as {1}, has reportedly operated out of a garage until now.{n}One of the many fans of {2} commented: 'I can't believe that they didn't even have a proper office until now and that those games were created by only one person!\nI am really looking forward to their future games!".localize(),
            l = b.gameLog.slice().sort(function (a, b) {
                return b.fansChanged - a.fansChanged
            }),
            c = l[0].title,
            d = c;
        2 <= l.length && (d = d + " " + "and".localize() + " " + l[1].title);
        g = g.format(b.name, d, c);
        b.notifications.push(new Notification("News".localize("heading"), g, "OK".localize(), a, {
            type: NotificationType.IndustryNews,
            previewImage: "./images/notificationIcons/icon_notification_local_news_and_media.png"
        }))
    };
    a.createLevel4Notifications = function () {
        var a = GameManager.company,
            b = "Welcome to the new headquarters of {0}!\nWe now have more space so you can increase the team further. The new office is also close to some renowned universities which gives us great access to new talent.".localize().format(a.name);
        a.notifications.push(new Notification("New Office".localize(), b, {
            type: NotificationType.CompanyMilestones,
            previewImage: "./images/notificationIcons/icon_notification_new_office.png"
        }));
        var g = 2,
            l = a.staff.slice(1).sort(function (a, b) {
                return b.designFactor - a.designFactor
            })[0],
            b = "Wow, this new office is amazing and the location is perfect too. I took a walk around the building earlier and had this radical idea.\nWhy don't we open up our own research and development department?{n}This could really speed up our research and would allow us to attack bigger projects and innovations.\nIt wouldn't be cheap but I think it would allow us to be the leading innovator in the gaming industry.{n}Anyway, I have done some research and I think we should open a lab and hire a whole team of researchers. Before we can do this however, we should have at least one design specialist in our team.".localize(),
            b = new Notification(l.name, b, "OK".localize(), g, {
                type: NotificationType.CompanyMilestones,
                previewImage: "./images/notificationIcons/icon_notification_new_office.png"
            });
        b.setFlag("dTSpecialistTrainingEnabled", !0);
        a.notifications.push(b);
        Tutorial.designSpecialist(g);
        g = "Greenheart" == a.name ? "Lone Tree" : "Greenheart";
        b = new Notification("Training".localize("heading"), "Hello {0},\nWe have just learned that you have opened your new headquarters not too far away from our university! We are just about to start a special course about game development and could really use your help.{n}Unfortunately we cannot offer any pay but I think you will find that teaching students about game development will be a great exercise to refine your own skills.\n{1} University{n}New training options available.".localize().format(a.name,
            g));
        b.weeksUntilFired = 0.5;
        b.setFlag("trainingV3Enabled", !0);
        a.notifications.push(b);
        g = 4 + 3 * a.getRandom();
        GameManager.enableLargeContracts(g)
    };
    a.enterRndLab = function (a) {
        if (!a.flags.enterRndLab) {
            a.flags.enterRndLab = !0;
            var b = "Welcome to our very own research and development lab! At the moment it is empty but we have a number of skilled people eager to start working.{n}You don't have to hire them individually, instead you can simply decide on the budget for the R&D lab. The higher the budget, the more researchers will work and the higher the research progress will be.{n}Running your own R&D lab can be very expensive so be careful that you don't overspend. I suggest you start with smaller projects and don't be afraid to cut down the budget if necessary.{n}If there is no active project researchers will generate research points slowly, which you can use to train your main staff and unlock more game options.".localize();
            a.notifications.push(new Notification("R&D lab".localize(), b, "OK".localize(), 0.35, {
                type: NotificationType.AutoPopup
            }));
            Tutorial.rndLab(0.35)
        }
    };
    a.enterHwLab = function (a) {
        if (!a.flags.enterHwLab) {
            a.flags.enterHwLab = !0;
            var b = "Welcome to our very own hardware lab! This is the place where we will create our own game console. Before you start, make sure you have a lot of cash saved up. Building a console isn't cheap. When you are ready to start simply {0} on the screen to access the action menu.".localize().format(Tutorial.getClickVerb());
            a.notifications.push(new Notification("Hardware lab".localize(), b, "OK".localize(), 0.35, {
                type: NotificationType.AutoPopup
            }))
        }
    };
    a.createMMOEndStory = function (a) {
        var b = Math.roundToDecimals((GameManager.company.currentWeek - a.releaseWeek) / 4, 1),
            g = GameManager.company,
            l = "We just got word that {0} is retiring its MMO game {1} from the market. The game has been on the market for {2} months and racked up over {3} in sales.".localize(),
            l = a.flags.isProfitable ? l + (" " + "We are not quite sure why {0} has decided to take {1} off the market as the game likely still generated income for the company.".localize()) :
                l + (" " + "{1} was likely not profitable anymore as the maintenance costs were likely larger than the income.".localize()),
            c = 0,
            d = GameManager.company.gameLog.first(function (b) {
                return b.id != a.id && b.flags.mmo && b.isOnSale()
            });
        d ? l += "{n}" + "While fans of {0} weren't happy about the news many of them also play {1} which is still on the market.".localize().format(g.name, d.title) : (l += "{n}" + "Fans of {1} have voiced complaints with one fan saying: 'I love {0} and played {1} a lot but now that they took it off the market I don't know what MMO I should play. If only {0} had released a new MMO I wouldn't be so upset.'".localize(),
            c = Math.floor(0.1 * a.fansChanged * g.getRandom()));
        b = new Notification("Industry News".localize("heading"), l.format(g.name, a.title, b, UI.getLongNumberString(a.unitsSold)), {
            type: NotificationType.SalesReports
        });
        b.weeksUntilFired = 0.7;
        c && b.adjustFans(-c);
        g.notifications.push(b)
    };
    a.createConsoleStartStory = function (a) {
        var b = GameManager.company,
            g = a.isGoodTech,
            l = a.featureFactor,
            c = a.successFactor,
            d = a.qF,
            f = "{0} has released their game console {1} today.".localize().format(b.name, a.name),
            f = g ? f + (" " + "The console seems to really push the limits of technology and is the most modern console ever to hit shelves.".localize()) :
                f + (" " + "The console does not seem quite on par with the high tech competitors but we will see what players think.".localize()),
            f = f + " Looking at the features of {0}, it seems that the ".localize().format(a.name),
            f = 0.8 <= l ? f + "list is extensive which is a good sign and could lead to a wide variety of games becoming available.".localize() : f + (" " + "list is a bit slim. Don't expect too many gadgets and controllers to be available for this console.".localize()),
            f = f + ("{n}" + "First tests indicate that {0}".localize().format(a.name)),
            f = 0.8 <= d ? f + "'s build quality is excellent and will likely run for decades without issues.".localize() : 0.5 <= d ? f + (" " + "is of average build quality. Don't expect it to last forever but in general you should not see many issues.".localize()) : f + (" " + "is a bit fragile. We wouldn't be surprised if you need to make use of the warranty sooner or later.".localize()),
            f = f + ("\n" + "All in all ".localize("fragment continues with 'we think that the console...'")),
            f = 1 <= c ? f + (" " + "we think that the console will stir up the market and prove to be very successful.".localize("fragment, started with 'All in all'").format(a.name)) :
                0.8 <= c ? f + (" " + "we think that the console will do reasonably well in the market and it is a welcome addition.".localize("fragment, started with 'All in all'").format(a.name)) : f + (" " + "it's hard to say whether the console will do well as there are so many other good products on the market.".localize("fragment, started with 'All in all'").format(a.name));
        b.notifications.push(new Notification({
            header: Media.industryNewsHeadline,
            text: f,
            weeksUntilFired: 0.4,
            image: a.iconUri
        }))
    };
    a.createConsoleEndStory = function (a) {
        var b =
            GameManager.company,
            g = 1 === a.version ? "first".localize() : 2 === a.version ? "second".localize() : 3 === a.version ? "third".localize() : a.version,
            g = "{0} has taken their game console {1} off the market.\n{1} was the {2} console created by the company.".localize().format(b.name, a.name, g);
        b.notifications.push(new Notification({
            header: Media.industryNewsHeadline,
            text: g,
            weeksUntilFired: 0.4,
            image: a.iconUri
        }))
    };
    a.createFinishGameStories = function () {
        var a = GameManager.company,
            b = a.getBestSeller() ? a.getBestSeller() : {
                title: "nothing"
            },
            b = "The worldwide game developers guild has awarded {0}, CEO of {1} the lifetime achievement award for contributions to the game industry. {0} has, during a stunning {3} year career at {1} delivered many ground breaking games.{n}The company is most recently known for {2}.".localize().format(a.staff[0].name, a.name, b.title, Math.floor(30 * GameManager.flags.gameLengthModifier)),
            g = a.getLatestCustomConsole();
        g && (b += " They are also known for their console {0} which has done very well on the market.".localize().format(g.name));
        a.notifications.push(new Notification(Media.industryNewsHeadline, b, {
            type: NotificationType.AutoPopup
        }));
        a.notifications.push(new Notification("Game finished".localize(), "Congratulations. You have finished Game Dev Tycoon. We will now calculate your final score and show you some statistics. You may continue playing after that.".localize(), {
            type: NotificationType.AutoPopup
        }));
        a.notifications.push(new Notification("{GameEnd}"))
    };
    a.createEndOfGameStories = function () {
        PlatformShim.ISWIN8 ? GameManager.company.notifications.push(DecisionNotifications.endOfGame1.getNotification(GameManager.company)) :
            GameManager.company.notifications.push(DecisionNotifications.endOfGameNative.getNotification(GameManager.company))
    }
})();
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
"use strict";
var Topics = {};
Topics.topics = [{
    id: "Sports",
    name: "Sports".localize("game topic"),
    genreWeightings: [1, 0.6, 0.6, 1, 0.7, 1],
    audienceWeightings: [1, 1, 0.8],
    missionOverrides: [
        [0.9, 1, 0, 0.7, 0.8, 1, 0.6, 0, 0],
        [0, 0.9, 0, 0, 0.9, 0, 0, 0, 0],
        [0, 1, 0.9, 0, 0, 0, 0.7, 1, 0.9],
        [0, 0, 0, 0.8, 0, 0, 0.7, 0, 0],
        [0.8, 1, 0.9, 0, 0, 0, 0.8, 1, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Military",
    name: "Military".localize("game topic"),
    genreWeightings: [1, 0.6, 0.8, 1, 1, 0.6],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Medieval",
    name: "Medieval".localize("game topic"),
    genreWeightings: [1, 1, 1, 0.8,
        1, 0.7
    ],
    audienceWeightings: [1, 1, 0.9]
}, {
    id: "Space",
    name: "Space".localize("game topic"),
    genreWeightings: [1, 0.8, 0.6, 1, 1, 0.7],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Racing",
    name: "Racing".localize("game topic"),
    genreWeightings: [0.9, 0.6, 0.8, 1, 0.7, 1],
    audienceWeightings: [1, 1, 0.9],
    missionOverrides: [
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1],
        [0, 0.9, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Fantasy",
    name: "Fantasy".localize("game topic"),
    genreWeightings: [1, 1, 1, 0.8, 1, 0.6],
    audienceWeightings: [1, 1, 1]
}, {
    id: "Pirate",
    name: "Pirate".localize("game topic"),
    genreWeightings: [0.8, 1, 0.9, 0.9, 0.7, 0.8],
    audienceWeightings: [1, 1, 0.8]
}, {
    id: "Sci-Fi",
    name: "Sci-Fi".localize("game topic"),
    genreWeightings: [1, 1, 1, 1, 1, 0.8],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Airplane",
    name: "Airplane".localize("game topic"),
    genreWeightings: [1, 0.6, 0.8, 1, 1, 1],
    audienceWeightings: [1, 1, 0.9]
}, {
    id: "Dungeon",
    name: "Dungeon".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 1, 1, 0.6],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Mystery",
    name: "Mystery".localize("game topic"),
    genreWeightings: [0.6, 1, 1, 0.8, 0.6, 0.8],
    audienceWeightings: [0.8, 0.9, 1],
    missionOverrides: [
        [0.9, 0.8, 1, 0.9, 1, 0.8, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Martial Arts",
    name: "Martial Arts".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 1, 0.7, 1],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "History",
    name: "History".localize("game topic"),
    genreWeightings: [0.8, 0.8, 0.8, 1, 1, 0.9],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Horror",
    name: "Horror".localize("game topic"),
    genreWeightings: [1, 1, 0.8, 0.6, 0.7, 0.8],
    audienceWeightings: [0.6, 0.9, 1],
    missionOverrides: [
        [0, 0, 0, 0.7, 1, 0.9, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Business",
    name: "Business".localize("game topic"),
    genreWeightings: [0.6, 0.8, 0.8, 1, 1, 0.6],
    audienceWeightings: [0.9, 1, 0.7]
}, {
    id: "Transport",
    name: "Transport".localize("game topic"),
    genreWeightings: [0.6,
        0.6, 0.6, 1, 1, 0.6
    ],
    audienceWeightings: [0.9, 1, 0.7]
}, {
    id: "Comedy",
    name: "Comedy".localize("game topic"),
    genreWeightings: [0.6, 1, 0.8, 0.6, 0.6, 1],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Ninja",
    name: "Ninja".localize("game topic"),
    genreWeightings: [1, 0.8, 0.8, 0.6, 0.8, 0.9],
    audienceWeightings: [1, 0.9, 0.9]
}, {
    id: "Romance",
    name: "Romance".localize("game topic"),
    genreWeightings: [0.6, 1, 0.8, 0.9, 0.6, 0.9],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Movies",
    name: "Movies".localize("game topic"),
    genreWeightings: [0.8, 0.8, 0.6, 1, 0.6, 1],
    audienceWeightings: [0.9,
        1, 0.9
    ]
}, {
    id: "Spy",
    name: "Spy".localize("game topic"),
    genreWeightings: [1, 1, 1, 0.8, 0.7, 0.8],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Detective",
    name: "Detective".localize("game topic"),
    genreWeightings: [0.6, 1, 1, 0.8, 0.6, 0.9],
    audienceWeightings: [0.9, 1, 0.8],
    missionOverrides: [
        [0.9, 0.8, 1, 0.9, 1, 0.8, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Cyberpunk",
    name: "Cyberpunk".localize("game topic"),
    genreWeightings: [1, 0.8, 1,
        0.8, 0.7, 0.6
    ],
    audienceWeightings: [0.7, 0.9, 1],
    missionOverrides: [
        [1, 0.8, 0.9, 0.8, 1, 0.9, 1, 0.9, 0.8],
        [0, 0, 0, 0, 0, 0, 1, 0.9, 0.8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0]
    ]
}, {
    id: "UFO",
    name: "UFO".localize("game topic"),
    genreWeightings: [1, 0.8, 0.6, 0.8, 1, 0.8],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Hospital",
    name: "Hospital".localize("game topic"),
    genreWeightings: [0.6, 0.6, 0.8, 1, 0.8, 0.7],
    audienceWeightings: [0.7, 1, 0.8]
}, {
    id: "Evolution",
    name: "Evolution".localize("game topic"),
    genreWeightings: [0.7,
        0.6, 0.6, 1, 1, 0.6
    ],
    audienceWeightings: [0.8, 1, 0.7]
}, {
    id: "Time Travel",
    name: "Time Travel".localize("game topic"),
    genreWeightings: [0.9, 1, 1, 0.7, 0.6, 0.7],
    audienceWeightings: [0.9, 1, 0.8]
}, {
    id: "Life",
    name: "Life".localize("game topic"),
    genreWeightings: [0.6, 1, 0.9, 1, 0.6, 0.8],
    audienceWeightings: [1, 1, 0.8]
}, {
    id: "Virtual Pet",
    name: "Virtual Pet".localize("game topic"),
    genreWeightings: [0.6, 0.8, 0.9, 1, 0.9, 1],
    audienceWeightings: [1, 0.8, 0.7]
}, {
    id: "Vocabulary",
    name: "Vocabulary".localize("game topic"),
    genreWeightings: [0.6,
        0.6, 0.6, 1, 1, 1
    ],
    audienceWeightings: [0.9, 1, 0.6]
}, {
    id: "Hunting",
    name: "Hunting".localize("game topic"),
    genreWeightings: [1, 0.9, 0.9, 1, 0.7, 0.9],
    audienceWeightings: [0.9, 1, 0.9]
}, {
    id: "Law",
    name: "Law".localize("game topic"),
    genreWeightings: [0.6, 1, 0.9, 0.9, 0.9, 0.6],
    audienceWeightings: [0.8, 1, 0.7],
    missionOverrides: [
        [0, 0, 0, 1, 0.8, 0.9, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0.8, 0.9, 1, 1, 0.8, 0.9, 1, 0.9, 0.8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0.9, 0, 0, 0, 0]
    ]
}, {
    id: "Game Dev",
    name: "Game Dev".localize("game topic"),
    genreWeightings: [0.6,
        0.7, 0.6, 1, 0.6, 0.8
    ],
    audienceWeightings: [0.9, 1, 0.7]
}, {
    id: "City",
    name: "City".localize("game topic"),
    genreWeightings: [0.7, 0.6, 0.7, 1, 1, 0.7],
    audienceWeightings: [0.9, 1, 0.8]
}, {
    id: "School",
    name: "School".localize("game topic"),
    genreWeightings: [0.8, 1, 1, 1, 1, 0.8],
    audienceWeightings: [1, 0.9, 0.7]
}, {
    id: "Fashion",
    name: "Fashion".localize("game topic"),
    genreWeightings: [0.6, 0.8, 1, 1, 0.6, 1],
    audienceWeightings: [1, 0.8, 0.6]
}, {
    id: "Zombies",
    name: "Zombies".localize("game topic"),
    genreWeightings: [1, 0.7, 0.9, 0.7, 0.9, 1],
    audienceWeightings: [0.9,
        0.8, 1
    ]
}, {
    id: "Hacking",
    name: "Hacking".localize("game topic"),
    genreWeightings: [0.7, 0.8, 0.7, 1, 1, 0.6],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Government",
    name: "Government".localize("game topic"),
    genreWeightings: [0.6, 0.6, 0.6, 1, 1, 0.7],
    audienceWeightings: [0.6, 1, 0.8]
}, {
    id: "Prison",
    name: "Prison".localize("game topic"),
    genreWeightings: [1, 1, 0.8, 1, 0.8, 0.6],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Surgery",
    name: "Surgery".localize("game topic"),
    genreWeightings: [0.8, 0.7, 0.6, 1, 0.7, 0.6],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Music",
    name: "Music".localize("game topic"),
    genreWeightings: [1, 0.9, 0.6, 1, 0.6, 1],
    audienceWeightings: [1, 0.9, 0.8],
    missionOverrides: [
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1]
    ]
}, {
    id: "Rythm",
    name: "Rhythm".localize("game topic"),
    genreWeightings: [1, 0.7, 0.7, 1, 0.6, 1],
    audienceWeightings: [1, 0.9, 0.8],
    missionOverrides: [
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0,
            0, 0, 0, 0, 0.9, 0.8, 1
        ],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1]
    ],
    iconUrl: "./images/topic icons/icon_topic_rhythm.png"
}, {
    id: "Superheroes",
    name: "Superheroes".localize("game topic"),
    genreWeightings: [1, 0.6, 0.9, 0.6, 0.6, 0.7],
    audienceWeightings: [1, 1, 1]
}, {
    id: "Post Apocalyptic",
    name: "Post Apocalyptic".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.9, 0.6],
    audienceWeightings: [0.6, 0.9, 1]
}, {
    id: "Alternate History",
    name: "Alternate History".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.8, 0.9, 0.6],
    audienceWeightings: [0.6, 1,
        1
    ]
}, {
    id: "Vampire",
    name: "Vampire".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.6, 0.7],
    audienceWeightings: [0.7, 1, 1]
}, {
    id: "Werewolf",
    name: "Werewolf".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.6, 0.7],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Aliens",
    name: "Aliens".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.9, 0.7],
    audienceWeightings: [0.9, 1, 1]
}, {
    id: "Wild West",
    name: "Wild West".localize("game topic"),
    genreWeightings: [0.9, 0.7, 1, 0.6, 0.6, 0.7],
    audienceWeightings: [1, 0.9, 1]
}, {
    id: "Dance",
    name: "Dance".localize("game topic"),
    genreWeightings: [0.9, 0.6, 0.6, 1, 0.6, 1],
    audienceWeightings: [1, 0.9, 0.8]
}, {
    id: "Cooking",
    name: "Cooking".localize("game topic"),
    genreWeightings: [0.9, 0.7, 0.8, 1, 0.7, 1],
    audienceWeightings: [0.8, 1, 0.6]
}, {
    id: "Farming",
    name: "Farming".localize("game topic"),
    genreWeightings: [0.6, 0.7, 1, 1, 0.8, 0.9],
    audienceWeightings: [0.9, 1, 0.8]
}, {
    id: "Crime",
    name: "Crime".localize("game topic"),
    genreWeightings: [1, 0.7, 0.8, 0.9, 0.7, 0.6],
    audienceWeightings: [0.6, 0.8, 1]
}, {
    id: "Disasters",
    name: "Disasters".localize("game topic"),
    genreWeightings: [0.9, 0.8, 0.7, 1, 1, 0.7],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Assassin",
    name: "Assassin".localize("game topic"),
    genreWeightings: [1, 0.7, 1, 0.8, 0.6, 0.6],
    audienceWeightings: [0.6, 0.8, 1]
}, {
    id: "Thief",
    name: "Thief".localize("game topic"),
    genreWeightings: [0.9, 0.8, 1, 0.8, 0.9, 0.7],
    audienceWeightings: [0.7, 1, 1]
}, {
    id: "Colonization",
    name: "Colonization".localize("game topic"),
    genreWeightings: [0.7, 0.6, 0.6, 1, 1, 0.7],
    audienceWeightings: [0.7, 1, 0.8]
}, {
    id: "Construction",
    name: "Construction".localize("game topic"),
    genreWeightings: [0.7, 0.6, 0.6, 1, 0.9, 0.8],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Mythology",
    name: "Mythology".localize("game topic"),
    genreWeightings: [1, 0.8, 0.9, 0.9, 0.8, 0.7],
    audienceWeightings: [0.7, 1, 1]
}, {
    id: "Abstract",
    name: "Abstract".localize("game topic"),
    genreWeightings: [0.9, 1, 0.6, 0.6, 0.8, 0.6],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Mad Science",
    name: "Mad Science".localize("game topic"),
    genreWeightings: [0.9, 1, 0.7, 0.9, 0.6, 0.6],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Extreme Sports",
    name: "Extreme Sports".localize("game topic"),
    genreWeightings: [1, 0.6, 0.6, 1, 0.7, 0.9],
    audienceWeightings: [1, 0.7, 1]
}, {
    id: "Dystopian",
    name: "Dystopian".localize("game topic"),
    genreWeightings: [0.8, 0.9, 0.8, 1, 0.9, 0.6],
    audienceWeightings: [0.6, 0.8, 1]
}, {
    id: "Expedition",
    name: "Expedition".localize("game topic"),
    genreWeightings: [0.7, 0.9, 0.6, 0.9, 1, 0.6],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Technology",
    name: "Technology".localize("game topic"),
    genreWeightings: [0.6, 0.7, 0.6, 1, 0.9, 0.6],
    audienceWeightings: [0.8, 1, 0.9]
}];
if (GameFlags.ghg6 && Topics.topics.some(function (a) {
    return 6 != a.genreWeightings.length || a.genreWeightings.some(function (a) {
        return 0.6 > a || 1 < a
    })
})) throw "invalid topic data";