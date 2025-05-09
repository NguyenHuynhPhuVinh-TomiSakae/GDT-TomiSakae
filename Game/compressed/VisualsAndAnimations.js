var SpriteSheetX = function (a) {
    createjs.SpriteSheet.apply(this, arguments);
    this.targetFPS = a.targetFPS;
    this.baseImage = a.baseImage
};
(function () {
    SpriteSheetX.prototype = new createjs.SpriteSheet
})();
var AnimationSpriteSheets = {};
(function () {
    var a = AnimationSpriteSheets;
    a.getAllImages = function () {
        return []
    };
    PlatformShim.ISLOWRES ? (a.typingScreenL1 = {
        images: ["./animations1366/typingScreenL1.png"],
        frames: {
            regY: 0,
            height: 32,
            regX: 0,
            width: 23.4782,
            count: 46
        },
        animations: {
            loop: [0, 45]
        },
        targetFPS: {
            loop: 7
        }
    }, a.typingScreenL2 = {
        images: ["./animations1366/superb/typingScreenL2.png"],
        frames: {
            regY: -14,
            height: 25,
            regX: -9,
            width: 22,
            count: 18
        },
        animations: {
            loop: [0, 17]
        },
        targetFPS: {
            loop: 10
        },
        baseImage: "./animations1366/superb/typingScreenL2_base.png"
    }, a.typingScreenL3 = {
        images: ["./animations1366/superb/typingScreenL3.png"],
        frames: {
            regY: -10,
            height: 34,
            regX: -18,
            width: 28,
            count: 19
        },
        animations: {
            loop: [0, 18]
        },
        targetFPS: {
            loop: 5
        },
        baseImage: "./animations1366/superb/typingScreenL3_base.png"
    }, a.typingScreenL4 = {
        images: ["./animations1366/superb/typingScreenL4.png"],
        frames: {
            height: 48,
            width: 39,
            count: 84,
            regX: 0,
            regY: 0
        },
        animations: {
            loop: [0, 83]
        },
        targetFPS: {
            loop: 5
        },
        baseImage: "./animations1366/superb/typingScreenL4_base.png"
    }, a.hwLabScreenWall = {
        images: ["./animations1366/superb/hwLabScreenWall.png"],
        frames: {
            height: 217,
            width: 292,
            count: 30,
            regX: -11,
            regY: -66
        },
        animations: {
            loop: [0, 29]
        },
        targetFPS: {
            loop: 10
        },
        baseImage: "./animations1366/superb/hwLabScreenWall_base.png"
    }, a.hwTV = {
        images: ["./animations1366/superb/hwTV.png"],
        frames: {
            height: 184,
            width: 155,
            count: 61,
            regX: -10,
            regY: -18
        },
        animations: {
            loop: [0, 60]
        },
        targetFPS: {
            loop: 10
        },
        baseImage: "./animations1366/superb/hwTV_base.png"
    }, a.hwFrontFemale1 = {
        images: ["./animations1366/superb/hwFrontFemale1.png"],
        frames: {
            height: 61,
            width: 40,
            count: 31,
            regX: -24,
            regY: -7
        },
        animations: {
            loop: [0,
                30
            ]
        },
        targetFPS: {
            loop: 10
        },
        baseImage: "./animations1366/superb/hwFrontFemale1_base.png"
    }, a.hwFrontFemale2 = {
        images: ["./animations1366/superb/hwFrontFemale2.png"],
        frames: {
            height: 98,
            width: 40,
            count: 31,
            regX: -24,
            regY: -10
        },
        animations: {
            loop: [0, 30]
        },
        targetFPS: {
            loop: 10
        },
        baseImage: "./animations1366/superb/hwFrontFemale2_base.png"
    }, a.hwFrontFemale4 = {
        images: ["./animations1366/superb/hwFrontFemale4.png"],
        frames: {
            height: 64,
            width: 45,
            count: 11,
            regX: -18,
            regY: -42
        },
        animations: {
            loop: [0, 10]
        },
        targetFPS: {
            loop: 10
        },
        baseImage: "./animations1366/superb/hwFrontFemale4_base.png"
    },
        a.hwBackFemale1 = {
            images: ["./animations1366/superb/hwBackFemale1.png"],
            frames: {
                height: 59,
                width: 36,
                count: 11,
                regX: -22,
                regY: -10
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwBackFemale1_base.png"
        }, a.hwBackFemale2 = {
            images: ["./animations1366/superb/hwBackFemale2.png"],
            frames: {
                height: 57,
                width: 36,
                count: 11,
                regX: -22,
                regY: -11
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwBackFemale2_base.png"
        }, a.hwBackFemale3 = {
            images: ["./animations1366/superb/hwBackFemale3.png"],
            frames: {
                height: 59,
                width: 48,
                count: 11,
                regX: -22,
                regY: -10
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwBackFemale3_base.png"
        }, a.hwBackFemale4 = {
            images: ["./animations1366/superb/hwBackFemale4.png"],
            frames: {
                height: 57,
                width: 48,
                count: 11,
                regX: -22,
                regY: -11
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwBackFemale4_base.png"
        }, a.hwFrontMale2 = {
            images: ["./animations1366/superb/hwFrontMale2.png"],
            frames: {
                height: 58,
                width: 43,
                count: 31,
                regX: -24,
                regY: -10
            },
            animations: {
                loop: [0, 30]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwFrontMale2_base.png"
        }, a.hwFrontMale3 = {
            images: ["./animations1366/superb/hwFrontMale3.png"],
            frames: {
                height: 65,
                width: 50,
                count: 11,
                regX: -15,
                regY: -41
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwFrontMale3_base.png"
        }, a.hwFrontMale4 = {
            images: ["./animations1366/superb/hwFrontMale4.png"],
            frames: {
                height: 66,
                width: 50,
                count: 11,
                regX: -15,
                regY: -41
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwFrontMale4_base.png"
        }, a.hwBackMale1 = {
            images: ["./animations1366/superb/hwBackMale1.png"],
            frames: {
                height: 58,
                width: 42,
                count: 11,
                regX: -20,
                regY: -11
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwBackMale1_base.png"
        }, a.hwBackMale2 = {
            images: ["./animations1366/superb/hwBackMale2.png"],
            frames: {
                height: 58,
                width: 53,
                count: 11,
                regX: -20,
                regY: -11
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/hwBackMale2_base.png"
        },
        a.rndActor1 = {
            images: ["./animations1366/superb/rndActor1.png"],
            frames: {
                height: 68,
                width: 69,
                count: 11,
                regX: -6,
                regY: -13
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndActor1_base.png"
        }, a.rndFemaleBoardBack1 = {
            images: ["./animations1366/superb/rndFemaleBoardBack1.png"],
            frames: {
                height: 62,
                width: 48,
                count: 11,
                regX: -22,
                regY: -11
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndFemaleBoardBack1_base.png"
        }, a.rndMaleBoardFront1 = {
            images: ["./animations1366/superb/rndMaleBoardFront1.png"],
            frames: {
                height: 86,
                width: 67,
                count: 16,
                regX: -10,
                regY: -7
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleBoardFront1_base.png"
        }, a.rndFemaleTypingBack1 = {
            images: ["./animations1366/superb/rndFemaleTypingBack1.png"],
            frames: {
                height: 57,
                width: 51,
                count: 18,
                regX: -17,
                regY: -14
            },
            animations: {
                loop: [0, 17]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndFemaleTypingBack1_base.png"
        }, a.rndMaleTypingBack1 = {
            images: ["./animations1366/superb/rndMaleTypingBack1.png"],
            frames: {
                height: 63,
                width: 52,
                count: 18,
                regX: -13,
                regY: -9
            },
            animations: {
                loop: [0, 17]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleTypingBack1_base.png"
        }, a.rndOperator1 = {
            images: ["./animations1366/superb/rndOperator1.png"],
            frames: {
                height: 116,
                width: 53,
                count: 11,
                regX: -13,
                regY: -14
            },
            animations: {
                loop: [0, 10]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndOperator1_base.png"
        }, a.rndFemaleTableBack1 = {
            images: ["./animations1366/superb/rndFemaleTableBack1.png"],
            frames: {
                height: 63,
                width: 54,
                count: 16,
                regX: -38,
                regY: -4
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndFemaleTableBack1_base.png"
        }, a.rndFemaleTableFront1_body = {
            images: ["./animations1366/superb/rndFemaleTableFront1_body.png"],
            frames: {
                height: 77,
                width: 52,
                count: 16,
                regX: -27,
                regY: -17
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndFemaleTableFront1_body_base.png"
        }, a.rndFemaleTableFront1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 16,
                regX: 0,
                regY: 0
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndFemaleTableFront1_pants_base.png"
        }, a.rndMaleFrontTable1_body = {
            images: ["./animations1366/superb/rndMaleFrontTable1_body.png"],
            frames: {
                height: 79,
                width: 48,
                count: 16,
                regX: -28,
                regY: -11
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleFrontTable1_body_base.png"
        }, a.rndMaleFrontTable1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 16,
                regX: 0,
                regY: 0
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleFrontTable1_pants_base.png"
        }, a.rndMaleFrontTable2_body = {
            images: ["./animations1366/superb/rndMaleFrontTable2_body.png"],
            frames: {
                height: 62,
                width: 55,
                count: 16,
                regX: -28,
                regY: -14
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleFrontTable2_body_base.png"
        }, a.rndMaleFrontTable2_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 16,
                regX: 0,
                regY: 0
            },
            animations: {
                loop: [0,
                    15
                ]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleFrontTable2_pants_base.png"
        }, a.rndMaleTableBack1 = {
            images: ["./animations1366/superb/rndMaleTableBack1.png"],
            frames: {
                height: 67,
                width: 52,
                count: 16,
                regX: -37,
                regY: -5
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleTableBack1_base.png"
        }, a.rndMaleTableBack2 = {
            images: ["./animations1366/superb/rndMaleTableBack2.png"],
            frames: {
                height: 73,
                width: 53,
                count: 16,
                regX: -37,
                regY: 0
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndMaleTableBack2_base.png"
        }, a.notepadBackC1_body = {
            images: ["./animations1366/notepadBackC1_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC1_body_base.png"
        }, a.notepadBackC2_body = {
            images: ["./animations1366/notepadBackC2_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37,
                    37
                ]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC2_body_base.png"
        }, a.notepadBackC3_body = {
            images: ["./animations1366/notepadBackC3_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC3_body_base.png"
        }, a.notepadBackC4_body = {
            images: ["./animations1366/notepadBackC4_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0,
                    0
                ],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC4_body_base.png"
        }, a.notepadBackC5_body = {
            images: ["./animations1366/notepadBackC5_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC5_body_base.png"
        }, a.notepadBackC6_body = {
            images: ["./animations1366/notepadBackC6_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC6_body_base.png"
        }, a.notepadBackC7_body = {
            images: ["./animations1366/notepadBackC7_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC7_body_base.png"
        }, a.notepadBackC8_body = {
            images: ["./animations1366/notepadBackC8_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -21,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC8_body_base.png"
        }, a.notepadBackC9_body = {
            images: ["./animations1366/notepadBackC9_body.png"],
            frames: {
                height: 38,
                width: 36,
                count: 38,
                regX: -42,
                regY: -31
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC9_body_base.png"
        }, a.notepadBackC10_body = {
            images: ["./animations1366/notepadBackC10_body.png"],
            frames: {
                height: 38,
                width: 37,
                count: 38,
                regX: -41,
                regY: -31
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC10_body_base.png"
        }, a.notepadBackC11_body = {
            images: ["./animations1366/notepadBackC11_body.png"],
            frames: {
                height: 38,
                width: 36,
                count: 38,
                regX: -41,
                regY: -31
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC11_body_base.png"
        }, a.notepadBackC12_body = {
            images: ["./animations1366/notepadBackC12_body.png"],
            frames: {
                height: 41,
                width: 59,
                count: 38,
                regX: -19,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC12_body_base.png"
        }, a.notepadBackC1_chair = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 38,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC1_chair_base.png"
        }, a.notepadBackC1_hand = {
            images: ["./animations1366/notepadBackC1_hands.png"],
            frames: {
                height: 44,
                width: 56,
                count: 38,
                regX: -6,
                regY: -22
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            }
        }, a.notepadBackC4_hand = {
            images: ["./animations1366/notepadBackC4_hands.png"],
            frames: {
                height: 44,
                width: 56,
                count: 38,
                regX: -6,
                regY: -22
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            }
        }, a.notepadBackC5_hand = {
            images: ["./animations1366/notepadBackC5_hands.png"],
            frames: {
                height: 44,
                width: 56,
                count: 38,
                regX: -6,
                regY: -22
            },
            animations: {
                start: [0,
                    0
                ],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            }
        }, a.notepadBackC9_hand = {
            images: ["./animations1366/notepadBackC9_hands.png"],
            frames: {
                height: 48,
                width: 63,
                count: 38,
                regX: -5,
                regY: -22
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC9_hands_base.png"
        }, a.notepadBackC10_hand = {
            images: ["./animations1366/notepadBackC10_hands.png"],
            frames: {
                height: 48,
                width: 63,
                count: 38,
                regX: -5,
                regY: -22
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC10_hands_base.png"
        }, a.notepadBackC12_hand = {
            images: ["./animations1366/notepadBackC12_hands.png"],
            frames: {
                height: 48,
                width: 63,
                count: 38,
                regX: -5,
                regY: -22
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC12_hands_base.png"
        }, a.notepadBackC1_head = {
            images: ["./animations1366/notepadBackC1_head.png"],
            frames: {
                height: 43,
                width: 46,
                count: 38,
                regX: -32,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC1_head_base.png"
        }, a.notepadBackC2_head = {
            images: ["./animations1366/notepadBackC2_head.png"],
            frames: {
                height: 46,
                width: 45,
                count: 38,
                regX: -33,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC2_head_base.png"
        }, a.notepadBackC3_head = {
            images: ["./animations1366/notepadBackC3_head.png"],
            frames: {
                height: 45,
                width: 47,
                count: 38,
                regX: -31,
                regY: -2
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC3_head_base.png"
        }, a.notepadBackC4_head = {
            images: ["./animations1366/notepadBackC4_head.png"],
            frames: {
                height: 45,
                width: 48,
                count: 38,
                regX: -31,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC4_head_base.png"
        }, a.notepadBackC5_head = {
            images: ["./animations1366/notepadBackC5_head.png"],
            frames: {
                height: 44,
                width: 45,
                count: 38,
                regX: -33,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC5_head_base.png"
        }, a.notepadBackC6_head = {
            images: ["./animations1366/notepadBackC6_head.png"],
            frames: {
                height: 43,
                width: 48,
                count: 38,
                regX: -32,
                regY: -3
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC6_head_base.png"
        }, a.notepadBackC7_head = {
            images: ["./animations1366/notepadBackC7_head.png"],
            frames: {
                height: 45,
                width: 48,
                count: 38,
                regX: -31,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC7_head_base.png"
        }, a.notepadBackC8_head = {
            images: ["./animations1366/notepadBackC8_head.png"],
            frames: {
                height: 40,
                width: 47,
                count: 38,
                regX: -31,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC8_head_base.png"
        }, a.notepadBackC9_head = {
            images: ["./animations1366/notepadBackC9_head.png"],
            frames: {
                height: 51,
                width: 52,
                count: 38,
                regX: -33,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC9_head_base.png"
        }, a.notepadBackC10_head = {
            images: ["./animations1366/notepadBackC10_head.png"],
            frames: {
                height: 51,
                width: 52,
                count: 38,
                regX: -33,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC10_head_base.png"
        }, a.notepadBackC11_head = {
            images: ["./animations1366/notepadBackC11_head.png"],
            frames: {
                height: 51,
                width: 48,
                count: 38,
                regX: -33,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC11_head_base.png"
        }, a.notepadBackC12_head = {
            images: ["./animations1366/notepadBackC12_head.png"],
            frames: {
                height: 51,
                width: 50,
                count: 38,
                regX: -31,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC12_head_base.png"
        }, a.notepadBackC1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 38,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC1_pants_base.png"
        }, a.notepadBackC9_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 38,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 37],
                end: [37, 37]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/notepadBackC9_pants_base.png"
        }, a.notepadImage = {
            images: ["./animations1366/notepadImage.png"],
            frames: {
                regY: 0,
                height: 107,
                regX: 0,
                width: 107,
                count: 1
            },
            animations: {
                all: [0, 0]
            },
            targetFPS: {
                all: 7
            }
        }, a.notepadFrontC1_body = {
            images: ["./animations1366/superb/notepadFrontC1_body.png"],
            frames: {
                height: 48,
                width: 60,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC1_body_base.png"
        }, a.notepadFrontC2_body = {
            images: ["./animations1366/superb/notepadFrontC2_body.png"],
            frames: {
                height: 48,
                width: 60,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC2_body_base.png"
        }, a.notepadFrontC3_body = {
            images: ["./animations1366/superb/notepadFrontC3_body.png"],
            frames: {
                height: 48,
                width: 60,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC3_body_base.png"
        }, a.notepadFrontC4_body = {
            images: ["./animations1366/superb/notepadFrontC4_body.png"],
            frames: {
                height: 48,
                width: 60,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC4_body_base.png"
        }, a.notepadFrontC5_body = {
            images: ["./animations1366/superb/notepadFrontC5_body.png"],
            frames: {
                height: 48,
                width: 62,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC5_body_base.png"
        }, a.notepadFrontC6_body = {
            images: ["./animations1366/superb/notepadFrontC6_body.png"],
            frames: {
                height: 48,
                width: 62,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC6_body_base.png"
        }, a.notepadFrontC7_body = {
            images: ["./animations1366/superb/notepadFrontC7_body.png"],
            frames: {
                height: 48,
                width: 62,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC7_body_base.png"
        },
        a.notepadFrontC8_body = {
            images: ["./animations1366/superb/notepadFrontC8_body.png"],
            frames: {
                height: 48,
                width: 62,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC8_body_base.png"
        }, a.notepadFrontC9_body = {
            images: ["./animations1366/superb/notepadFrontC9_body.png"],
            frames: {
                height: 48,
                width: 60,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC9_body_base.png"
        }, a.notepadFrontC10_body = {
            images: ["./animations1366/superb/notepadFrontC10_body.png"],
            frames: {
                height: 48,
                width: 60,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC10_body_base.png"
        }, a.notepadFrontC11_body = {
            images: ["./animations1366/superb/notepadFrontC11_body.png"],
            frames: {
                height: 44,
                width: 45,
                count: 39,
                regX: -28,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC11_body_base.png"
        }, a.notepadFrontC12_body = {
            images: ["./animations1366/superb/notepadFrontC12_body.png"],
            frames: {
                height: 44,
                width: 44,
                count: 39,
                regX: -29,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC12_body_base.png"
        }, a.notepadFrontC1_chair = {
            images: ["./animations1366/superb/notepadFrontC1_chair.png"],
            frames: {
                height: 55,
                width: 67,
                count: 39,
                regX: -11,
                regY: -47
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC1_chair_base.png"
        }, a.notepadFrontC1_hand = {
            images: ["./animations1366/superb/notepadFrontC1_hands.png"],
            frames: {
                height: 57,
                width: 66,
                count: 39,
                regX: -41,
                regY: -37
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC1_hands_base.png"
        }, a.notepadFrontC4_hand = {
            images: ["./animations1366/superb/notepadFrontC4_hands.png"],
            frames: {
                height: 57,
                width: 66,
                count: 39,
                regX: -41,
                regY: -37
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC4_hands_base.png"
        }, a.notepadFrontC5_hand = {
            images: ["./animations1366/superb/notepadFrontC5_hands.png"],
            frames: {
                height: 57,
                width: 66,
                count: 39,
                regX: -41,
                regY: -37
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC5_hands_base.png"
        },
        a.notepadFrontC9_hand = {
            images: ["./animations1366/superb/notepadFrontC9_hands.png"],
            frames: {
                height: 55,
                width: 76,
                count: 39,
                regX: -31,
                regY: -37
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC9_hands_base.png"
        }, a.notepadFrontC10_hand = {
            images: ["./animations1366/superb/notepadFrontC10_hands.png"],
            frames: {
                height: 55,
                width: 76,
                count: 39,
                regX: -31,
                regY: -37
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC10_hands_base.png"
        }, a.notepadFrontC12_hand = {
            images: ["./animations1366/superb/notepadFrontC12_hands.png"],
            frames: {
                height: 55,
                width: 76,
                count: 39,
                regX: -31,
                regY: -37
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC12_hands_base.png"
        }, a.notepadFrontC1_head = {
            images: ["./animations1366/superb/notepadFrontC1_head.png"],
            frames: {
                height: 42,
                width: 45,
                count: 39,
                regX: -29,
                regY: -8
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC1_head_base.png"
        }, a.notepadFrontC2_head = {
            images: ["./animations1366/superb/notepadFrontC2_head.png"],
            frames: {
                height: 43,
                width: 47,
                count: 39,
                regX: -28,
                regY: -7
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC2_head_base.png"
        }, a.notepadFrontC3_head = {
            images: ["./animations1366/superb/notepadFrontC3_head.png"],
            frames: {
                height: 41,
                width: 43,
                count: 39,
                regX: -29,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC3_head_base.png"
        }, a.notepadFrontC5_head = {
            images: ["./animations1366/superb/notepadFrontC4_head.png"],
            frames: {
                height: 42,
                width: 44,
                count: 39,
                regX: -29,
                regY: -8
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC4_head_base.png"
        }, a.notepadFrontC4_head = {
            images: ["./animations1366/superb/notepadFrontC5_head.png"],
            frames: {
                height: 41,
                width: 45,
                count: 39,
                regX: -31,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC5_head_base.png"
        }, a.notepadFrontC6_head = {
            images: ["./animations1366/superb/notepadFrontC6_head.png"],
            frames: {
                height: 45,
                width: 43,
                count: 39,
                regX: -31,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC6_head_base.png"
        },
        a.notepadFrontC8_head = {
            images: ["./animations1366/superb/notepadFrontC7_head.png"],
            frames: {
                height: 42,
                width: 45,
                count: 39,
                regX: -29,
                regY: -8
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC7_head_base.png"
        }, a.notepadFrontC7_head = {
            images: ["./animations1366/superb/notepadFrontC8_head.png"],
            frames: {
                height: 43,
                width: 47,
                count: 39,
                regX: -30,
                regY: -7
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC8_head_base.png"
        }, a.notepadFrontC9_head = {
            images: ["./animations1366/superb/notepadFrontC9_head.png"],
            frames: {
                height: 46,
                width: 47,
                count: 39,
                regX: -25,
                regY: -7
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC9_head_base.png"
        }, a.notepadFrontC10_head = {
            images: ["./animations1366/superb/notepadFrontC10_head.png"],
            frames: {
                height: 44,
                width: 43,
                count: 39,
                regX: -31,
                regY: -8
            },
            animations: {
                start: [0,
                    0
                ],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC10_head_base.png"
        }, a.notepadFrontC11_head = {
            images: ["./animations1366/superb/notepadFrontC11_head.png"],
            frames: {
                height: 42,
                width: 41,
                count: 39,
                regX: -31,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC11_head_base.png"
        }, a.notepadFrontC12_head = {
            images: ["./animations1366/superb/notepadFrontC12_head.png"],
            frames: {
                height: 43,
                width: 43,
                count: 39,
                regX: -30,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC12_head_base.png"
        }, a.notepadFrontC1_pants = {
            images: ["./animations1366/superb/notepadFrontC1_pants.png"],
            frames: {
                height: 31,
                width: 46,
                count: 39,
                regX: -31,
                regY: -71
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC1_pants_base.png"
        }, a.notepadFrontC9_pants = {
            images: ["./animations1366/superb/notepadFrontC9_pants.png"],
            frames: {
                height: 27,
                width: 39,
                count: 39,
                regX: -31,
                regY: -74
            },
            animations: {
                start: [0, 0],
                loop: [0, 38],
                end: [38, 38]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/notepadFrontC9_pants_base.png"
        }, a.teaCupImage = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 1,
                regX: 0,
                regY: 0
            },
            animations: {
                all: [0, 0]
            },
            targetFPS: {
                all: 7
            },
            baseImage: "./animations1366/superb/teacup.png"
        }, a.teaCupImageLevel2 = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 1,
                regX: 0,
                regY: 0
            },
            animations: {
                all: [0, 0]
            },
            targetFPS: {
                all: 7
            },
            baseImage: "./animations1366/superb/teacupLevel2.png"
        }, a.pong = {
            images: ["./animations1366/pong.png"],
            frames: {
                height: 77,
                regX: -16,
                count: 60,
                regY: -14,
                width: 77
            },
            animations: {
                all: [0, 59]
            },
            targetFPS: {
                all: 10
            },
            baseImage: "./animations1366/pong_base.png"
        }, a.idleBackC1_body = {
            images: ["./animations1366/idleBackC1_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC1_body_base.png"
        }, a.idleBackC2_body = {
            images: ["./animations1366/idleBackC2_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC2_body_base.png"
        }, a.idleBackC3_body = {
            images: ["./animations1366/idleBackC3_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC3_body_base.png"
        }, a.idleBackC4_body = {
            images: ["./animations1366/idleBackC4_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC4_body_base.png"
        }, a.idleBackC5_body = {
            images: ["./animations1366/idleBackC5_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC5_body_base.png"
        }, a.idleBackC6_body = {
            images: ["./animations1366/idleBackC6_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC6_body_base.png"
        }, a.idleBackC7_body = {
            images: ["./animations1366/idleBackC7_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC7_body_base.png"
        }, a.idleBackC8_body = {
            images: ["./animations1366/idleBackC8_body.png"],
            frames: {
                height: 37,
                width: 53,
                count: 11,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC8_body_base.png"
        }, a.idleBackC9_body = {
            images: ["./animations1366/idleBackC9_body.png"],
            frames: {
                height: 39,
                width: 36,
                count: 11,
                regX: -47,
                regY: -31
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC9_body_base.png"
        }, a.idleBackC10_body = {
            images: ["./animations1366/idleBackC10_body.png"],
            frames: {
                height: 39,
                width: 36,
                count: 11,
                regX: -47,
                regY: -31
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC10_body_base.png"
        }, a.idleBackC11_body = {
            images: ["./animations1366/idleBackC11_body.png"],
            frames: {
                height: 39,
                width: 36,
                count: 11,
                regX: -47,
                regY: -31
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9,
                    0
                ]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC11_body_base.png"
        }, a.idleBackC12_body = {
            images: ["./animations1366/idleBackC12_body.png"],
            frames: {
                height: 39,
                width: 50,
                count: 11,
                regX: -33,
                regY: -31
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC12_body_base.png"
        }, a.idleBackC1_chair = {
            images: ["./animations1366/idleBackC1_chair.png"],
            frames: {
                height: 44,
                width: 59,
                count: 11,
                regX: -35,
                regY: -44
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC1_chair_base.png"
        }, a.idleBackC1_hand = {
            images: ["./animations1366/idleBackC1_hands.png"],
            frames: {
                height: 25,
                width: 36,
                count: 11,
                regX: -26,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleBackC4_hand = {
            images: ["./animations1366/idleBackC4_hands.png"],
            frames: {
                height: 25,
                width: 36,
                count: 11,
                regX: -26,
                regY: -33
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleBackC5_hand = {
            images: ["./animations1366/idleBackC5_hands.png"],
            frames: {
                height: 25,
                width: 36,
                count: 11,
                regX: -26,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC5_hands_base.png"
        }, a.idleBackC9_hand = {
            images: ["./animations1366/idleBackC9_hands.png"],
            frames: {
                height: 33,
                width: 43,
                count: 11,
                regX: -28,
                regY: -33
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleBackC10_hand = {
            images: ["./animations1366/idleBackC10_hands.png"],
            frames: {
                height: 33,
                width: 43,
                count: 11,
                regX: -28,
                regY: -33
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleBackC12_hand = {
            images: ["./animations1366/idleBackC12_hands.png"],
            frames: {
                height: 33,
                width: 43,
                count: 11,
                regX: -28,
                regY: -33
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleBackC1_head = {
            images: ["./animations1366/idleBackC1_head.png"],
            frames: {
                height: 41,
                width: 44,
                count: 11,
                regX: -44,
                regY: -5
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC1_head_base.png"
        }, a.idleBackC2_head = {
            images: ["./animations1366/idleBackC2_head.png"],
            frames: {
                height: 46,
                width: 44,
                count: 11,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC2_head_base.png"
        }, a.idleBackC3_head = {
            images: ["./animations1366/idleBackC3_head.png"],
            frames: {
                height: 44,
                width: 45,
                count: 11,
                regX: -44,
                regY: -2
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC3_head_base.png"
        }, a.idleBackC4_head = {
            images: ["./animations1366/idleBackC4_head.png"],
            frames: {
                height: 44,
                width: 47,
                count: 11,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC4_head_base.png"
        }, a.idleBackC5_head = {
            images: ["./animations1366/idleBackC5_head.png"],
            frames: {
                height: 44,
                width: 44,
                count: 11,
                regX: -44,
                regY: -4
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC5_head_base.png"
        }, a.idleBackC6_head = {
            images: ["./animations1366/idleBackC6_head.png"],
            frames: {
                height: 43,
                width: 47,
                count: 11,
                regX: -44,
                regY: -2
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC6_head_base.png"
        }, a.idleBackC7_head = {
            images: ["./animations1366/idleBackC7_head.png"],
            frames: {
                height: 44,
                width: 48,
                count: 11,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC7_head_base.png"
        }, a.idleBackC8_head = {
            images: ["./animations1366/idleBackC8_head.png"],
            frames: {
                height: 41,
                width: 45,
                count: 11,
                regX: -43,
                regY: -4
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC8_head_base.png"
        }, a.idleBackC9_head = {
            images: ["./animations1366/idleBackC9_head.png"],
            frames: {
                height: 52,
                width: 49,
                count: 11,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC9_head_base.png"
        }, a.idleBackC10_head = {
            images: ["./animations1366/idleBackC10_head.png"],
            frames: {
                height: 53,
                width: 49,
                count: 11,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0,
                    9
                ],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC10_head_base.png"
        }, a.idleBackC11_head = {
            images: ["./animations1366/idleBackC11_head.png"],
            frames: {
                height: 53,
                width: 47,
                count: 11,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC11_head_base.png"
        }, a.idleBackC12_head = {
            images: ["./animations1366/idleBackC12_head.png"],
            frames: {
                height: 53,
                width: 48,
                count: 11,
                regX: -42,
                regY: -4
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC12_head_base.png"
        }, a.idleBackC1_pants = {
            images: ["./animations1366/idleBackC1_pants.png"],
            frames: {
                height: 34,
                width: 43,
                count: 11,
                regX: -23,
                regY: -58
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC1_pants_base.png"
        }, a.idleBackC9_pants = {
            images: ["./animations1366/idleBackC9_pants.png"],
            frames: {
                height: 32,
                width: 45,
                count: 11,
                regX: -21,
                regY: -64
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/idleBackC9_pants_base.png"
        }, a.idleFrontC1_body = {
            images: ["./animations1366/superb/idleFrontC1_body.png"],
            frames: {
                height: 48,
                width: 51,
                count: 11,
                regX: -25,
                regY: -38
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC1_body_base.png"
        }, a.idleFrontC2_body = {
            images: ["./animations1366/superb/idleFrontC2_body.png"],
            frames: {
                height: 49,
                width: 52,
                count: 11,
                regX: -25,
                regY: -38
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC2_body_base.png"
        }, a.idleFrontC3_body = {
            images: ["./animations1366/superb/idleFrontC3_body.png"],
            frames: {
                height: 48,
                width: 52,
                count: 11,
                regX: -25,
                regY: -38
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC3_body_base.png"
        }, a.idleFrontC4_body = {
            images: ["./animations1366/superb/idleFrontC4_body.png"],
            frames: {
                height: 49,
                width: 51,
                count: 11,
                regX: -25,
                regY: -38
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC4_body_base.png"
        }, a.idleFrontC5_body = {
            images: ["./animations1366/superb/idleFrontC5_body.png"],
            frames: {
                height: 48,
                width: 50,
                count: 11,
                regX: -26,
                regY: -39
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC5_body_base.png"
        }, a.idleFrontC6_body = {
            images: ["./animations1366/superb/idleFrontC6_body.png"],
            frames: {
                height: 48,
                width: 50,
                count: 11,
                regX: -26,
                regY: -39
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC6_body_base.png"
        }, a.idleFrontC7_body = {
            images: ["./animations1366/superb/idleFrontC7_body.png"],
            frames: {
                height: 48,
                width: 50,
                count: 11,
                regX: -26,
                regY: -39
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC7_body_base.png"
        }, a.idleFrontC8_body = {
            images: ["./animations1366/superb/idleFrontC8_body.png"],
            frames: {
                height: 49,
                width: 50,
                count: 11,
                regX: -26,
                regY: -38
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC8_body_base.png"
        }, a.idleFrontC9_body = {
            images: ["./animations1366/superb/idleFrontC9_body.png"],
            frames: {
                height: 46,
                width: 48,
                count: 11,
                regX: -26,
                regY: -40
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC9_body_base.png"
        }, a.idleFrontC10_body = {
            images: ["./animations1366/superb/idleFrontC10_body.png"],
            frames: {
                height: 46,
                width: 48,
                count: 11,
                regX: -26,
                regY: -40
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC10_body_base.png"
        }, a.idleFrontC11_body = {
            images: ["./animations1366/superb/idleFrontC11_body.png"],
            frames: {
                height: 42,
                width: 39,
                count: 11,
                regX: -24,
                regY: -40
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC11_body_base.png"
        }, a.idleFrontC12_body = {
            images: ["./animations1366/superb/idleFrontC12_body.png"],
            frames: {
                height: 42,
                width: 38,
                count: 11,
                regX: -26,
                regY: -40
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC12_body_base.png"
        }, a.idleFrontC1_chair = {
            images: ["./animations1366/superb/idleFrontC1_chair.png"],
            frames: {
                height: 42,
                width: 40,
                count: 11,
                regX: -24,
                regY: -48
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC1_chair_base.png"
        },
        a.idleFrontC1_hand = {
            images: ["./animations1366/superb/idleFrontC1_hands.png"],
            frames: {
                height: 29,
                width: 38,
                count: 11,
                regX: -46,
                regY: -63
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleFrontC4_hand = {
            images: ["./animations1366/superb/idleFrontC4_hands.png"],
            frames: {
                height: 29,
                width: 38,
                count: 11,
                regX: -46,
                regY: -63
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        },
        a.idleFrontC5_hand = {
            images: ["./animations1366/superb/idleFrontC5_hands.png"],
            frames: {
                height: 29,
                width: 38,
                count: 11,
                regX: -46,
                regY: -63
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleFrontC9_hand = {
            images: ["./animations1366/superb/idleFrontC9_hands.png"],
            frames: {
                height: 38,
                width: 54,
                count: 11,
                regX: -28,
                regY: -52
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        },
        a.idleFrontC10_hand = {
            images: ["./animations1366/superb/idleFrontC10_hands.png"],
            frames: {
                height: 38,
                width: 54,
                count: 11,
                regX: -28,
                regY: -52
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.idleFrontC12_hand = {
            images: ["./animations1366/superb/idleFrontC12_hands.png"],
            frames: {
                height: 38,
                width: 54,
                count: 11,
                regX: -28,
                regY: -52
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/empty_base.png"
        },
        a.idleFrontC1_head = {
            images: ["./animations1366/superb/idleFrontC1_head.png"],
            frames: {
                height: 40,
                width: 42,
                count: 11,
                regX: -21,
                regY: -9
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC1_head_base.png"
        }, a.idleFrontC2_head = {
            images: ["./animations1366/superb/idleFrontC2_head.png"],
            frames: {
                height: 41,
                width: 43,
                count: 11,
                regX: -21,
                regY: -8
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC2_head_base.png"
        },
        a.idleFrontC3_head = {
            images: ["./animations1366/superb/idleFrontC3_head.png"],
            frames: {
                height: 39,
                width: 40,
                count: 11,
                regX: -22,
                regY: -10
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC3_head_base.png"
        }, a.idleFrontC5_head = {
            images: ["./animations1366/superb/idleFrontC4_head.png"],
            frames: {
                height: 40,
                width: 41,
                count: 11,
                regX: -22,
                regY: -9
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC4_head_base.png"
        },
        a.idleFrontC4_head = {
            images: ["./animations1366/superb/idleFrontC5_head.png"],
            frames: {
                height: 40,
                width: 41,
                count: 11,
                regX: -24,
                regY: -9
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC5_head_base.png"
        }, a.idleFrontC6_head = {
            images: ["./animations1366/superb/idleFrontC6_head.png"],
            frames: {
                height: 45,
                width: 41,
                count: 11,
                regX: -23,
                regY: -4
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC6_head_base.png"
        },
        a.idleFrontC8_head = {
            images: ["./animations1366/superb/idleFrontC7_head.png"],
            frames: {
                height: 40,
                width: 42,
                count: 11,
                regX: -22,
                regY: -9
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC7_head_base.png"
        }, a.idleFrontC7_head = {
            images: ["./animations1366/superb/idleFrontC8_head.png"],
            frames: {
                height: 43,
                width: 44,
                count: 11,
                regX: -22,
                regY: -6
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC8_head_base.png"
        },
        a.idleFrontC9_head = {
            images: ["./animations1366/superb/idleFrontC9_head.png"],
            frames: {
                height: 45,
                width: 42,
                count: 11,
                regX: -20,
                regY: -9
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC9_head_base.png"
        }, a.idleFrontC11_head = {
            images: ["./animations1366/superb/idleFrontC10_head.png"],
            frames: {
                height: 42,
                width: 38,
                count: 11,
                regX: -24,
                regY: -10
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC10_head_base.png"
        },
        a.idleFrontC10_head = {
            images: ["./animations1366/superb/idleFrontC11_head.png"],
            frames: {
                height: 43,
                width: 40,
                count: 11,
                regX: -24,
                regY: -9
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC11_head_base.png"
        }, a.idleFrontC12_head = {
            images: ["./animations1366/superb/idleFrontC12_head.png"],
            frames: {
                height: 44,
                width: 40,
                count: 11,
                regX: -23,
                regY: -10
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC12_head_base.png"
        },
        a.idleFrontC1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 11,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC1_pants_base.png"
        }, a.idleFrontC9_pants = {
            images: ["./animations1366/superb/idleFrontC9_pants.png"],
            frames: {
                height: 25,
                width: 35,
                count: 11,
                regX: -32,
                regY: -76
            },
            animations: {
                start: [0, 9],
                loop: [10, 10],
                end: [9, 0]
            },
            targetFPS: {
                start: 20,
                loop: 5,
                end: 20
            },
            baseImage: "./animations1366/superb/idleFrontC9_pants_base.png"
        },
        a.typingBackC1_body = {
            images: ["./animations1366/typingBackC1_body.png"],
            frames: {
                height: 34,
                width: 46,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC1_body_base.png"
        }, a.typingBackC2_body = {
            images: ["./animations1366/typingBackC2_body.png"],
            frames: {
                height: 34,
                width: 48,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC2_body_base.png"
        },
        a.typingBackC3_body = {
            images: ["./animations1366/typingBackC3_body.png"],
            frames: {
                height: 34,
                width: 46,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC3_body_base.png"
        }, a.typingBackC4_body = {
            images: ["./animations1366/typingBackC4_body.png"],
            frames: {
                height: 34,
                width: 48,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC4_body_base.png"
        },
        a.typingBackC5_body = {
            images: ["./animations1366/typingBackC5_body.png"],
            frames: {
                height: 34,
                width: 48,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC5_body_base.png"
        }, a.typingBackC6_body = {
            images: ["./animations1366/typingBackC6_body.png"],
            frames: {
                height: 34,
                width: 46,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC6_body_base.png"
        },
        a.typingBackC7_body = {
            images: ["./animations1366/typingBackC7_body.png"],
            frames: {
                height: 34,
                width: 48,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC7_body_base.png"
        }, a.typingBackC8_body = {
            images: ["./animations1366/typingBackC8_body.png"],
            frames: {
                height: 34,
                width: 48,
                count: 17,
                regX: -32,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC8_body_base.png"
        },
        a.typingBackC9_body = {
            images: ["./animations1366/typingBackC9_body.png"],
            frames: {
                height: 17,
                width: 31,
                count: 17,
                regX: -47,
                regY: -40
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC9_body_base.png"
        }, a.typingBackC10_body = {
            images: ["./animations1366/typingBackC10_body.png"],
            frames: {
                height: 19,
                width: 31,
                count: 17,
                regX: -47,
                regY: -39
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC10_body_base.png"
        },
        a.typingBackC11_body = {
            images: ["./animations1366/typingBackC11_body.png"],
            frames: {
                height: 18,
                width: 31,
                count: 17,
                regX: -47,
                regY: -39
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC11_body_base.png"
        }, a.typingBackC12_body = {
            images: ["./animations1366/typingBackC12_body.png"],
            frames: {
                height: 34,
                width: 46,
                count: 17,
                regX: -32,
                regY: -32
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC12_body_base.png"
        },
        a.typingBackC1_chair = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 17,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC1_chair_base.png"
        }, a.typingBackC1_hand = {
            images: ["./animations1366/typingBackC1_hands.png"],
            frames: {
                height: 26,
                width: 29,
                count: 17,
                regX: -25,
                regY: -32
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC1_hands_base.png"
        },
        a.typingBackC4_hand = {
            images: ["./animations1366/typingBackC4_hands.png"],
            frames: {
                height: 26,
                width: 29,
                count: 17,
                regX: -25,
                regY: -32
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC4_hands_base.png"
        }, a.typingBackC5_hand = {
            images: ["./animations1366/typingBackC5_hands.png"],
            frames: {
                height: 26,
                width: 29,
                count: 17,
                regX: -25,
                regY: -32
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC5_hands_base.png"
        },
        a.typingBackC9_hand = {
            images: ["./animations1366/typingBackC9_hands.png"],
            frames: {
                height: 33,
                width: 40,
                count: 17,
                regX: -26,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC9_hands_base.png"
        }, a.typingBackC10_hand = {
            images: ["./animations1366/typingBackC10_hands.png"],
            frames: {
                height: 33,
                width: 40,
                count: 17,
                regX: -26,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC10_hands_base.png"
        },
        a.typingBackC12_hand = {
            images: ["./animations1366/typingBackC12_hands.png"],
            frames: {
                height: 33,
                width: 40,
                count: 17,
                regX: -26,
                regY: -33
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC12_hands_base.png"
        }, a.typingBackC1_head = {
            images: ["./animations1366/typingBackC1_head.png"],
            frames: {
                height: 40,
                width: 35,
                count: 17,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC1_head_base.png"
        },
        a.typingBackC2_head = {
            images: ["./animations1366/typingBackC2_head.png"],
            frames: {
                height: 45,
                width: 34,
                count: 17,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC2_head_base.png"
        }, a.typingBackC3_head = {
            images: ["./animations1366/typingBackC3_head.png"],
            frames: {
                height: 43,
                width: 34,
                count: 17,
                regX: -44,
                regY: -2
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC3_head_base.png"
        },
        a.typingBackC4_head = {
            images: ["./animations1366/typingBackC4_head.png"],
            frames: {
                height: 43,
                width: 36,
                count: 17,
                regX: -43,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC4_head_base.png"
        }, a.typingBackC5_head = {
            images: ["./animations1366/typingBackC5_head.png"],
            frames: {
                height: 43,
                width: 35,
                count: 17,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC5_head_base.png"
        },
        a.typingBackC6_head = {
            images: ["./animations1366/typingBackC6_head.png"],
            frames: {
                height: 41,
                width: 36,
                count: 17,
                regX: -44,
                regY: -3
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC6_head_base.png"
        }, a.typingBackC7_head = {
            images: ["./animations1366/typingBackC7_head.png"],
            frames: {
                height: 43,
                width: 37,
                count: 17,
                regX: -43,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC7_head_base.png"
        },
        a.typingBackC8_head = {
            images: ["./animations1366/typingBackC8_head.png"],
            frames: {
                height: 39,
                width: 36,
                count: 17,
                regX: -42,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC8_head_base.png"
        }, a.typingBackC9_head = {
            images: ["./animations1366/typingBackC9_head.png"],
            frames: {
                height: 50,
                width: 41,
                count: 17,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC9_head_base.png"
        },
        a.typingBackC10_head = {
            images: ["./animations1366/typingBackC10_head.png"],
            frames: {
                height: 50,
                width: 41,
                count: 17,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC10_head_base.png"
        }, a.typingBackC11_head = {
            images: ["./animations1366/typingBackC11_head.png"],
            frames: {
                height: 51,
                width: 38,
                count: 17,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC11_head_base.png"
        },
        a.typingBackC12_head = {
            images: ["./animations1366/typingBackC12_head.png"],
            frames: {
                height: 51,
                width: 39,
                count: 17,
                regX: -42,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC12_head_base.png"
        }, a.typingBackC1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 17,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC1_pants_base.png"
        },
        a.typingBackC9_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 17,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 16],
                end: [16, 16]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/typingBackC9_pants_base.png"
        }, a.typingFrontC1_body = {
            images: ["./animations1366/superb/typingFrontC1_body.png"],
            frames: {
                height: 44,
                width: 48,
                count: 10,
                regX: -29,
                regY: -41
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC1_body_base.png"
        },
        a.typingFrontC2_body = {
            images: ["./animations1366/superb/typingFrontC2_body.png"],
            frames: {
                height: 43,
                width: 48,
                count: 10,
                regX: -29,
                regY: -42
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC2_body_base.png"
        }, a.typingFrontC3_body = {
            images: ["./animations1366/superb/typingFrontC3_body.png"],
            frames: {
                height: 43,
                width: 48,
                count: 10,
                regX: -29,
                regY: -42
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC3_body_base.png"
        },
        a.typingFrontC4_body = {
            images: ["./animations1366/superb/typingFrontC4_body.png"],
            frames: {
                height: 44,
                width: 48,
                count: 10,
                regX: -29,
                regY: -41
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC4_body_base.png"
        }, a.typingFrontC5_body = {
            images: ["./animations1366/superb/typingFrontC5_body.png"],
            frames: {
                height: 44,
                width: 47,
                count: 10,
                regX: -29,
                regY: -41
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC5_body_base.png"
        },
        a.typingFrontC6_body = {
            images: ["./animations1366/superb/typingFrontC6_body.png"],
            frames: {
                height: 43,
                width: 47,
                count: 10,
                regX: -29,
                regY: -42
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC6_body_base.png"
        }, a.typingFrontC7_body = {
            images: ["./animations1366/superb/typingFrontC7_body.png"],
            frames: {
                height: 44,
                width: 47,
                count: 10,
                regX: -29,
                regY: -41
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC7_body_base.png"
        },
        a.typingFrontC8_body = {
            images: ["./animations1366/superb/typingFrontC8_body.png"],
            frames: {
                height: 43,
                width: 47,
                count: 10,
                regX: -29,
                regY: -42
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC8_body_base.png"
        }, a.typingFrontC9_body = {
            images: ["./animations1366/superb/typingFrontC9_body.png"],
            frames: {
                height: 42,
                width: 46,
                count: 10,
                regX: -29,
                regY: -43
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC9_body_base.png"
        },
        a.typingFrontC10_body = {
            images: ["./animations1366/superb/typingFrontC10_body.png"],
            frames: {
                height: 41,
                width: 46,
                count: 10,
                regX: -29,
                regY: -44
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC10_body_base.png"
        }, a.typingFrontC11_body = {
            images: ["./animations1366/superb/typingFrontC11_body.png"],
            frames: {
                height: 38,
                width: 35,
                count: 10,
                regX: -28,
                regY: -44
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC11_body_base.png"
        }, a.typingFrontC12_body = {
            images: ["./animations1366/superb/typingFrontC12_body.png"],
            frames: {
                height: 38,
                width: 35,
                count: 10,
                regX: -29,
                regY: -44
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC12_body_base.png"
        }, a.typingFrontC1_chair = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 10,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC1_chair_base.png"
        }, a.typingFrontC1_hand = {
            images: ["./animations1366/superb/typingFrontC1_hands.png"],
            frames: {
                height: 28,
                width: 36,
                count: 10,
                regX: -49,
                regY: -64
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.typingFrontC4_hand = {
            images: ["./animations1366/superb/typingFrontC4_hands.png"],
            frames: {
                height: 28,
                width: 36,
                count: 10,
                regX: -49,
                regY: -64
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.typingFrontC5_hand = {
            images: ["./animations1366/superb/typingFrontC5_hands.png"],
            frames: {
                height: 28,
                width: 36,
                count: 10,
                regX: -49,
                regY: -64
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/empty_base.png"
        }, a.typingFrontC9_hand = {
            images: ["./animations1366/superb/typingFrontC9_hands.png"],
            frames: {
                height: 37,
                width: 52,
                count: 10,
                regX: -31,
                regY: -53
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC9_hands_base.png"
        }, a.typingFrontC10_hand = {
            images: ["./animations1366/superb/typingFrontC10_hands.png"],
            frames: {
                height: 37,
                width: 52,
                count: 10,
                regX: -31,
                regY: -53
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC10_hands_base.png"
        }, a.typingFrontC12_hand = {
            images: ["./animations1366/superb/typingFrontC12_hands.png"],
            frames: {
                height: 37,
                width: 52,
                count: 10,
                regX: -31,
                regY: -53
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC12_hands_base.png"
        }, a.typingFrontC1_head = {
            images: ["./animations1366/superb/typingFrontC1_head.png"],
            frames: {
                height: 40,
                width: 35,
                count: 10,
                regX: -29,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC1_head_base.png"
        }, a.typingFrontC2_head = {
            images: ["./animations1366/superb/typingFrontC2_head.png"],
            frames: {
                height: 41,
                width: 36,
                count: 10,
                regX: -29,
                regY: -8
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC2_head_base.png"
        }, a.typingFrontC3_head = {
            images: ["./animations1366/superb/typingFrontC3_head.png"],
            frames: {
                height: 39,
                width: 32,
                count: 10,
                regX: -30,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC3_head_base.png"
        },
        a.typingFrontC5_head = {
            images: ["./animations1366/superb/typingFrontC4_head.png"],
            frames: {
                height: 40,
                width: 33,
                count: 10,
                regX: -30,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC4_head_base.png"
        }, a.typingFrontC4_head = {
            images: ["./animations1366/superb/typingFrontC5_head.png"],
            frames: {
                height: 39,
                width: 34,
                count: 10,
                regX: -31,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC5_head_base.png"
        },
        a.typingFrontC6_head = {
            images: ["./animations1366/superb/typingFrontC6_head.png"],
            frames: {
                height: 45,
                width: 33,
                count: 10,
                regX: -31,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC6_head_base.png"
        }, a.typingFrontC8_head = {
            images: ["./animations1366/superb/typingFrontC7_head.png"],
            frames: {
                height: 40,
                width: 34,
                count: 10,
                regX: -30,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC7_head_base.png"
        },
        a.typingFrontC7_head = {
            images: ["./animations1366/superb/typingFrontC8_head.png"],
            frames: {
                height: 42,
                width: 36,
                count: 10,
                regX: -30,
                regY: -7
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC8_head_base.png"
        }, a.typingFrontC9_head = {
            images: ["./animations1366/superb/typingFrontC9_head.png"],
            frames: {
                height: 44,
                width: 36,
                count: 10,
                regX: -26,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC9_head_base.png"
        },
        a.typingFrontC10_head = {
            images: ["./animations1366/superb/typingFrontC10_head.png"],
            frames: {
                height: 43,
                width: 33,
                count: 10,
                regX: -31,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC10_head_base.png"
        }, a.typingFrontC11_head = {
            images: ["./animations1366/superb/typingFrontC11_head.png"],
            frames: {
                height: 42,
                width: 32,
                count: 10,
                regX: -31,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC11_head_base.png"
        }, a.typingFrontC12_head = {
            images: ["./animations1366/superb/typingFrontC12_head.png"],
            frames: {
                height: 42,
                width: 33,
                count: 10,
                regX: -30,
                regY: -11
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC12_head_base.png"
        }, a.typingFrontC1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 10,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC1_pants_base.png"
        }, a.typingFrontC9_pants = {
            images: ["./animations1366/superb/typingFrontC9_pants.png"],
            frames: {
                height: 5,
                width: 27,
                count: 10,
                regX: -33,
                regY: -77
            },
            animations: {
                start: [0, 0],
                loop: [0, 9],
                end: [9, 9]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/typingFrontC9_pants_base.png"
        }, a.thinkingFrontC1_body = {
            images: ["./animations1366/superb/thinkingFrontC1_body.png"],
            frames: {
                height: 58,
                width: 54,
                count: 34,
                regX: -29,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC1_body_base.png"
        }, a.thinkingFrontC2_body = {
            images: ["./animations1366/superb/thinkingFrontC2_body.png"],
            frames: {
                height: 59,
                width: 53,
                count: 34,
                regX: -29,
                regY: -27
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC2_body_base.png"
        }, a.thinkingFrontC3_body = {
            images: ["./animations1366/superb/thinkingFrontC3_body.png"],
            frames: {
                height: 58,
                width: 53,
                count: 34,
                regX: -29,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC3_body_base.png"
        }, a.thinkingFrontC4_body = {
            images: ["./animations1366/superb/thinkingFrontC4_body.png"],
            frames: {
                height: 59,
                width: 53,
                count: 34,
                regX: -29,
                regY: -27
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC4_body_base.png"
        }, a.thinkingFrontC5_body = {
            images: ["./animations1366/superb/thinkingFrontC5_body.png"],
            frames: {
                height: 58,
                width: 53,
                count: 34,
                regX: -29,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC5_body_base.png"
        }, a.thinkingFrontC6_body = {
            images: ["./animations1366/superb/thinkingFrontC6_body.png"],
            frames: {
                height: 59,
                width: 53,
                count: 34,
                regX: -29,
                regY: -27
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC6_body_base.png"
        },
        a.thinkingFrontC7_body = {
            images: ["./animations1366/superb/thinkingFrontC7_body.png"],
            frames: {
                height: 58,
                width: 53,
                count: 34,
                regX: -29,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC7_body_base.png"
        }, a.thinkingFrontC8_body = {
            images: ["./animations1366/superb/thinkingFrontC8_body.png"],
            frames: {
                height: 58,
                width: 53,
                count: 34,
                regX: -29,
                regY: -28
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC8_body_base.png"
        }, a.thinkingFrontC9_body = {
            images: ["./animations1366/superb/thinkingFrontC9_body.png"],
            frames: {
                height: 56,
                width: 52,
                count: 34,
                regX: -29,
                regY: -29
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC9_body_base.png"
        }, a.thinkingFrontC10_body = {
            images: ["./animations1366/superb/thinkingFrontC10_body.png"],
            frames: {
                height: 56,
                width: 50,
                count: 34,
                regX: -31,
                regY: -29
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC10_body_base.png"
        }, a.thinkingFrontC11_body = {
            images: ["./animations1366/superb/thinkingFrontC11_body.png"],
            frames: {
                height: 41,
                width: 40,
                count: 34,
                regX: -28,
                regY: -39
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC11_body_base.png"
        }, a.thinkingFrontC12_body = {
            images: ["./animations1366/superb/thinkingFrontC12_body.png"],
            frames: {
                height: 42,
                width: 39,
                count: 34,
                regX: -31,
                regY: -38
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC12_body_base.png"
        }, a.thinkingFrontC1_chair = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 34,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC1_chair_base.png"
        }, a.thinkingFrontC1_hand = {
            images: ["./animations1366/superb/thinkingFrontC1_hands.png"],
            frames: {
                height: 75,
                width: 51,
                count: 34,
                regX: -41,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC1_hands_base.png"
        }, a.thinkingFrontC4_hand = {
            images: ["./animations1366/superb/thinkingFrontC4_hands.png"],
            frames: {
                height: 75,
                width: 51,
                count: 34,
                regX: -41,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC4_hands_base.png"
        },
        a.thinkingFrontC5_hand = {
            images: ["./animations1366/superb/thinkingFrontC5_hands.png"],
            frames: {
                height: 75,
                width: 51,
                count: 34,
                regX: -41,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC5_hands_base.png"
        }, a.thinkingFrontC9_hand = {
            images: ["./animations1366/superb/thinkingFrontC9_hands.png"],
            frames: {
                height: 70,
                width: 59,
                count: 34,
                regX: -31,
                regY: -21
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC9_hands_base.png"
        }, a.thinkingFrontC10_hand = {
            images: ["./animations1366/superb/thinkingFrontC10_hands.png"],
            frames: {
                height: 70,
                width: 59,
                count: 34,
                regX: -31,
                regY: -21
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC10_hands_base.png"
        }, a.thinkingFrontC12_hand = {
            images: ["./animations1366/superb/thinkingFrontC12_hands.png"],
            frames: {
                height: 70,
                width: 59,
                count: 34,
                regX: -31,
                regY: -21
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC12_hands_base.png"
        }, a.thinkingFrontC1_head = {
            images: ["./animations1366/superb/thinkingFrontC1_head.png"],
            frames: {
                height: 40,
                width: 37,
                count: 34,
                regX: -26,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC1_head_base.png"
        }, a.thinkingFrontC2_head = {
            images: ["./animations1366/superb/thinkingFrontC2_head.png"],
            frames: {
                height: 41,
                width: 38,
                count: 34,
                regX: -26,
                regY: -8
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC2_head_base.png"
        }, a.thinkingFrontC3_head = {
            images: ["./animations1366/superb/thinkingFrontC3_head.png"],
            frames: {
                height: 39,
                width: 35,
                count: 34,
                regX: -27,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC3_head_base.png"
        }, a.thinkingFrontC5_head = {
            images: ["./animations1366/superb/thinkingFrontC4_head.png"],
            frames: {
                height: 40,
                width: 36,
                count: 34,
                regX: -27,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC4_head_base.png"
        }, a.thinkingFrontC4_head = {
            images: ["./animations1366/superb/thinkingFrontC5_head.png"],
            frames: {
                height: 40,
                width: 36,
                count: 34,
                regX: -29,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC5_head_base.png"
        },
        a.thinkingFrontC6_head = {
            images: ["./animations1366/superb/thinkingFrontC6_head.png"],
            frames: {
                height: 45,
                width: 36,
                count: 34,
                regX: -28,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC6_head_base.png"
        }, a.thinkingFrontC8_head = {
            images: ["./animations1366/superb/thinkingFrontC7_head.png"],
            frames: {
                height: 40,
                width: 37,
                count: 34,
                regX: -27,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC7_head_base.png"
        }, a.thinkingFrontC7_head = {
            images: ["./animations1366/superb/thinkingFrontC8_head.png"],
            frames: {
                height: 43,
                width: 39,
                count: 34,
                regX: -27,
                regY: -6
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC8_head_base.png"
        }, a.thinkingFrontC9_head = {
            images: ["./animations1366/superb/thinkingFrontC9_head.png"],
            frames: {
                height: 45,
                width: 38,
                count: 34,
                regX: -25,
                regY: -8
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC9_head_base.png"
        }, a.thinkingFrontC10_head = {
            images: ["./animations1366/superb/thinkingFrontC10_head.png"],
            frames: {
                height: 43,
                width: 33,
                count: 34,
                regX: -31,
                regY: -9
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC10_head_base.png"
        }, a.thinkingFrontC11_head = {
            images: ["./animations1366/superb/thinkingFrontC11_head.png"],
            frames: {
                height: 42,
                width: 32,
                count: 34,
                regX: -31,
                regY: -10
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC11_head_base.png"
        }, a.thinkingFrontC12_head = {
            images: ["./animations1366/superb/thinkingFrontC12_head.png"],
            frames: {
                height: 42,
                width: 34,
                count: 34,
                regX: -30,
                regY: -11
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC12_head_base.png"
        },
        a.thinkingFrontC1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 34,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC1_pants_base.png"
        }, a.thinkingFrontC9_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 34,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/superb/thinkingFrontC9_pants_base.png"
        },
        a.thinkingBackC1_body = {
            images: ["./animations1366/thinkingBackC1_body.png"],
            frames: {
                height: 49,
                width: 49,
                count: 34,
                regX: -31,
                regY: -17
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC1_body_base.png"
        }, a.thinkingBackC2_body = {
            images: ["./animations1366/thinkingBackC2_body.png"],
            frames: {
                height: 50,
                width: 49,
                count: 34,
                regX: -31,
                regY: -17
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC2_body_base.png"
        },
        a.thinkingBackC3_body = {
            images: ["./animations1366/thinkingBackC3_body.png"],
            frames: {
                height: 50,
                width: 49,
                count: 34,
                regX: -31,
                regY: -17
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC3_body_base.png"
        }, a.thinkingBackC4_body = {
            images: ["./animations1366/thinkingBackC4_body.png"],
            frames: {
                height: 50,
                width: 49,
                count: 34,
                regX: -31,
                regY: -17
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC4_body_base.png"
        },
        a.thinkingBackC5_body = {
            images: ["./animations1366/thinkingBackC5_body.png"],
            frames: {
                height: 48,
                width: 49,
                count: 34,
                regX: -31,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC5_body_base.png"
        }, a.thinkingBackC6_body = {
            images: ["./animations1366/thinkingBackC6_body.png"],
            frames: {
                height: 48,
                width: 49,
                count: 34,
                regX: -31,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC6_body_base.png"
        },
        a.thinkingBackC7_body = {
            images: ["./animations1366/thinkingBackC7_body.png"],
            frames: {
                height: 50,
                width: 49,
                count: 34,
                regX: -31,
                regY: -17
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC7_body_base.png"
        }, a.thinkingBackC8_body = {
            images: ["./animations1366/thinkingBackC8_body.png"],
            frames: {
                height: 48,
                width: 49,
                count: 34,
                regX: -31,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC8_body_base.png"
        },
        a.thinkingBackC9_body = {
            images: ["./animations1366/thinkingBackC9_body.png"],
            frames: {
                height: 27,
                width: 32,
                count: 34,
                regX: -46,
                regY: -35
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC9_body_base.png"
        }, a.thinkingBackC10_body = {
            images: ["./animations1366/thinkingBackC10_body.png"],
            frames: {
                height: 22,
                width: 32,
                count: 34,
                regX: -46,
                regY: -35
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC10_body_base.png"
        },
        a.thinkingBackC11_body = {
            images: ["./animations1366/thinkingBackC11_body.png"],
            frames: {
                height: 22,
                width: 32,
                count: 34,
                regX: -46,
                regY: -35
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC11_body_base.png"
        }, a.thinkingBackC12_body = {
            images: ["./animations1366/thinkingBackC12_body.png"],
            frames: {
                height: 48,
                width: 46,
                count: 34,
                regX: -32,
                regY: -18
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC12_body_base.png"
        },
        a.thinkingBackC1_chair = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 34,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC1_chair_base.png"
        }, a.thinkingBackC1_hand = {
            images: ["./animations1366/thinkingBackC1_hands.png"],
            frames: {
                height: 46,
                width: 45,
                count: 34,
                regX: -26,
                regY: -11
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC1_hands_base.png"
        },
        a.thinkingBackC4_hand = {
            images: ["./animations1366/thinkingBackC4_hands.png"],
            frames: {
                height: 46,
                width: 45,
                count: 34,
                regX: -26,
                regY: -11
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC4_hands_base.png"
        }, a.thinkingBackC5_hand = {
            images: ["./animations1366/thinkingBackC5_hands.png"],
            frames: {
                height: 46,
                width: 45,
                count: 34,
                regX: -26,
                regY: -11
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC5_hands_base.png"
        },
        a.thinkingBackC9_hand = {
            images: ["./animations1366/thinkingBackC9_hands.png"],
            frames: {
                height: 54,
                width: 41,
                count: 34,
                regX: -27,
                regY: -12
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC9_hands_base.png"
        }, a.thinkingBackC10_hand = {
            images: ["./animations1366/thinkingBackC10_hands.png"],
            frames: {
                height: 54,
                width: 41,
                count: 34,
                regX: -27,
                regY: -12
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC10_hands_base.png"
        },
        a.thinkingBackC12_hand = {
            images: ["./animations1366/thinkingBackC12_hands.png"],
            frames: {
                height: 54,
                width: 41,
                count: 34,
                regX: -27,
                regY: -12
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC12_hands_base.png"
        }, a.thinkingBackC1_head = {
            images: ["./animations1366/thinkingBackC1_head.png"],
            frames: {
                height: 40,
                width: 35,
                count: 34,
                regX: -44,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC1_head_base.png"
        },
        a.thinkingBackC2_head = {
            images: ["./animations1366/thinkingBackC2_head.png"],
            frames: {
                height: 46,
                width: 35,
                count: 34,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC2_head_base.png"
        }, a.thinkingBackC3_head = {
            images: ["./animations1366/thinkingBackC3_head.png"],
            frames: {
                height: 44,
                width: 37,
                count: 34,
                regX: -44,
                regY: -2
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC3_head_base.png"
        },
        a.thinkingBackC4_head = {
            images: ["./animations1366/thinkingBackC4_head.png"],
            frames: {
                height: 43,
                width: 37,
                count: 34,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC4_head_base.png"
        }, a.thinkingBackC5_head = {
            images: ["./animations1366/thinkingBackC5_head.png"],
            frames: {
                height: 44,
                width: 35,
                count: 34,
                regX: -44,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC5_head_base.png"
        },
        a.thinkingBackC6_head = {
            images: ["./animations1366/thinkingBackC6_head.png"],
            frames: {
                height: 41,
                width: 37,
                count: 34,
                regX: -44,
                regY: -3
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC6_head_base.png"
        }, a.thinkingBackC7_head = {
            images: ["./animations1366/thinkingBackC7_head.png"],
            frames: {
                height: 44,
                width: 38,
                count: 34,
                regX: -44,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC7_head_base.png"
        },
        a.thinkingBackC8_head = {
            images: ["./animations1366/thinkingBackC8_head.png"],
            frames: {
                height: 40,
                width: 36,
                count: 34,
                regX: -43,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC8_head_base.png"
        }, a.thinkingBackC9_head = {
            images: ["./animations1366/thinkingBackC9_head.png"],
            frames: {
                height: 52,
                width: 42,
                count: 34,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC9_head_base.png"
        },
        a.thinkingBackC10_head = {
            images: ["./animations1366/thinkingBackC10_head.png"],
            frames: {
                height: 53,
                width: 42,
                count: 34,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC10_head_base.png"
        }, a.thinkingBackC11_head = {
            images: ["./animations1366/thinkingBackC11_head.png"],
            frames: {
                height: 53,
                width: 40,
                count: 34,
                regX: -43,
                regY: -5
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC11_head_base.png"
        },
        a.thinkingBackC12_head = {
            images: ["./animations1366/thinkingBackC12_head.png"],
            frames: {
                height: 53,
                width: 41,
                count: 34,
                regX: -42,
                regY: -4
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC12_head_base.png"
        }, a.thinkingBackC1_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 34,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC1_pants_base.png"
        },
        a.thinkingBackC9_pants = {
            images: ["./animations1366/empty_sheet.png"],
            frames: {
                height: 1,
                width: 1,
                count: 34,
                regX: 0,
                regY: 0
            },
            animations: {
                start: [0, 0],
                loop: [0, 33],
                end: [33, 33]
            },
            targetFPS: {
                start: 10,
                loop: 10,
                end: 10
            },
            baseImage: "./animations1366/thinkingBackC9_pants_base.png"
        }, a.airCon = {
            images: ["./animations1366/superb/airCon.png"],
            frames: {
                height: 37,
                width: 55,
                count: 21,
                regX: -210,
                regY: -218
            },
            animations: {
                loop: [0, 20]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/airCon_base.png"
        }, a.waterCooler = {
            images: ["./animations1366/superb/waterCooler.png"],
            frames: {
                height: 20,
                width: 8,
                count: 16,
                regX: -20,
                regY: -32
            },
            animations: {
                loop: [0, 15]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/waterCooler_base.png"
        }, a.printer = {
            images: ["./animations1366/superb/printer.png"],
            frames: {
                height: 24,
                width: 29,
                count: 41,
                regX: -32,
                regY: -48
            },
            animations: {
                loop: [0, 40]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/printer_base.png"
        }, a.rndPrinterLeftScreen = {
            images: ["./animations1366/superb/rndPrinterLeftScreen.png"],
            frames: {
                height: 72,
                width: 101,
                count: 30,
                regX: -10,
                regY: -36
            },
            animations: {
                loop: [0, 29]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndPrinterLeftScreen_base.png"
        }, a.rndPrinterRightScreen = {
            images: ["./animations1366/superb/rndPrinterRightScreen.png"],
            frames: {
                height: 97,
                width: 100,
                count: 30,
                regX: -22,
                regY: -9
            },
            animations: {
                loop: [0, 29]
            },
            targetFPS: {
                loop: 10
            },
            baseImage: "./animations1366/superb/rndPrinterRightScreen_base.png"
        }) : (a.typingScreenL1 = {
            images: ["./animations/typingScreenL1.png"],
            frames: {
                regY: 0,
                height: 60,
                regX: 0,
                width: 44,
                count: 46
            },
            animations: {
                loop: [0, 45]
            },
            targetFPS: {
                loop: 7
            }
        }, a.typingScreenL2 = {
            images: ["./animations/superb/typingScreenL2.png"],
            frames: {
                regY: -6,
                height: 74,
                regX: -18,
                width: 51,
                count: 54
            },
            animations: {
                loop: [0, 53]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/typingScreenL2_base.png"
        }, a.typingScreenL3 = {
            images: ["./animations/superb/typingScreenL3.png"],
            frames: {
                regY: -24,
                height: 55,
                regX: -39,
                width: 44,
                count: 56
            },
            animations: {
                loop: [0, 55]
            },
            targetFPS: {
                loop: 15
            },
            baseImage: "./animations/superb/typingScreenL3_base.png"
        }, a.typingScreenL4 = {
            images: ["./animations/superb/typingScreenL4.png"],
            frames: {
                height: 92,
                width: 74,
                count: 250,
                regX: -0,
                regY: -0
            },
            animations: {
                loop: [0, 249]
            },
            targetFPS: {
                loop: 15
            },
            baseImage: "./animations/superb/typingScreenL4_base.png"
        }, a.hwLabScreenWall = {
            images: "./animations/superb/hwLabScreenWall_0.png ./animations/superb/hwLabScreenWall_1.png ./animations/superb/hwLabScreenWall_2.png ./animations/superb/hwLabScreenWall_3.png ./animations/superb/hwLabScreenWall_4.png ./animations/superb/hwLabScreenWall_5.png".split(" "),
            frames: {
                height: 407,
                width: 546,
                count: 90,
                regX: -22,
                regY: -123
            },
            animations: {
                loop: [0, 89]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwLabScreenWall_base.png"
        }, a.hwTV = {
            images: "./animations/superb/hwTV_0.png ./animations/superb/hwTV_1.png ./animations/superb/hwTV_2.png ./animations/superb/hwTV_3.png ./animations/superb/hwTV_4.png ./animations/superb/hwTV_5.png".split(" "),
            frames: {
                height: 343,
                width: 289,
                count: 182,
                regX: -20,
                regY: -35
            },
            animations: {
                loop: [0, 181]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwTV_base.png"
        }, a.hwFrontFemale1 = {
            images: ["./animations/superb/hwFrontFemale1.png"],
            frames: {
                height: 232,
                width: 75,
                count: 90,
                regX: -45,
                regY: -13
            },
            animations: {
                loop: [0, 89]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwFrontFemale1_base.png"
        }, a.hwFrontFemale2 = {
            images: ["./animations/superb/hwFrontFemale2.png"],
            frames: {
                height: 226,
                width: 75,
                count: 90,
                regX: -45,
                regY: -19
            },
            animations: {
                loop: [0, 89]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwFrontFemale2_base.png"
        }, a.hwFrontFemale4 = {
            images: ["./animations/superb/hwFrontFemale4.png"],
            frames: {
                height: 226,
                width: 85,
                count: 31,
                regX: -34,
                regY: -19
            },
            animations: {
                loop: [0, 30]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwFrontFemale4_base.png"
        }, a.hwBackFemale1 = {
            images: ["./animations/superb/hwBackFemale1.png"],
            frames: {
                height: 225,
                width: 68,
                count: 31,
                regX: -40,
                regY: -19
            },
            animations: {
                loop: [0, 30]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwBackFemale1_base.png"
        }, a.hwBackFemale2 = {
            images: ["./animations/superb/hwBackFemale2.png"],
            frames: {
                height: 224,
                width: 68,
                count: 31,
                regX: -40,
                regY: -20
            },
            animations: {
                loop: [0, 30]
            },
            targetFPS: {
                loop: 30
            },
            baseImage: "./animations/superb/hwBackFemale2_base.png"
        },
            a.hwBackFemale3 = {
                images: ["./animations/superb/hwBackFemale3.png"],
                frames: {
                    height: 110,
                    width: 90,
                    count: 31,
                    regX: -41,
                    regY: -18
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwBackFemale3_base.png"
            }, a.hwBackFemale4 = {
                images: ["./animations/superb/hwBackFemale4.png"],
                frames: {
                    height: 108,
                    width: 92,
                    count: 31,
                    regX: -40,
                    regY: -20
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwBackFemale4_base.png"
            }, a.hwFrontMale2 = {
                images: ["./animations/superb/hwFrontMale2.png"],
                frames: {
                    height: 227,
                    width: 81,
                    count: 90,
                    regX: -46,
                    regY: -19
                },
                animations: {
                    loop: [0, 89]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwFrontMale2_base.png"
            }, a.hwFrontMale3 = {
                images: ["./animations/superb/hwFrontMale3.png"],
                frames: {
                    height: 220,
                    width: 93,
                    count: 31,
                    regX: -28,
                    regY: -26
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwFrontMale3_base.png"
            }, a.hwFrontMale4 = {
                images: ["./animations/superb/hwFrontMale4.png"],
                frames: {
                    height: 227,
                    width: 93,
                    count: 31,
                    regX: -28,
                    regY: -19
                },
                animations: {
                    loop: [0,
                        30
                    ]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwFrontMale4_base.png"
            }, a.hwBackMale1 = {
                images: ["./animations/superb/hwBackMale1.png"],
                frames: {
                    height: 226,
                    width: 79,
                    count: 31,
                    regX: -37,
                    regY: -21
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwBackMale1_base.png"
            }, a.hwBackMale2 = {
                images: ["./animations/superb/hwBackMale2.png"],
                frames: {
                    height: 113,
                    width: 101,
                    count: 31,
                    regX: -37,
                    regY: -21
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/hwBackMale2_base.png"
            },
            a.rndActor1 = {
                images: ["./animations/superb/rndActor1.png"],
                frames: {
                    height: 227,
                    width: 133,
                    count: 31,
                    regX: -9,
                    regY: -23
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndActor1_base.png"
            }, a.rndFemaleBoardBack1 = {
                images: ["./animations/superb/rndFemaleBoardBack1.png"],
                frames: {
                    height: 227,
                    width: 89,
                    count: 31,
                    regX: -41,
                    regY: -20
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndFemaleBoardBack1_base.png"
            }, a.rndMaleBoardFront1 = {
                images: ["./animations/superb/rndMaleBoardFront1.png"],
                frames: {
                    height: 235,
                    width: 125,
                    count: 46,
                    regX: -19,
                    regY: -12
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleBoardFront1_base.png"
            }, a.rndFemaleTypingBack1 = {
                images: ["./animations/superb/rndFemaleTypingBack1.png"],
                frames: {
                    height: 224,
                    width: 96,
                    count: 51,
                    regX: -31,
                    regY: -26
                },
                animations: {
                    loop: [0, 50]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndFemaleTypingBack1_base.png"
            }, a.rndMaleTypingBack1 = {
                images: ["./animations/superb/rndMaleTypingBack1.png"],
                frames: {
                    height: 233,
                    width: 99,
                    count: 51,
                    regX: -23,
                    regY: -17
                },
                animations: {
                    loop: [0, 50]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleTypingBack1_base.png"
            }, a.rndOperator1 = {
                images: ["./animations/superb/rndOperator1.png"],
                frames: {
                    height: 218,
                    width: 100,
                    count: 31,
                    regX: -24,
                    regY: -27
                },
                animations: {
                    loop: [0, 30]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndOperator1_base.png"
            }, a.rndFemaleTableBack1 = {
                images: ["./animations/superb/rndFemaleTableBack1.png"],
                frames: {
                    height: 121,
                    width: 101,
                    count: 46,
                    regX: -70,
                    regY: -6
                },
                animations: {
                    loop: [0,
                        45
                    ]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndFemaleTableBack1_base.png"
            }, a.rndFemaleTableFront1_body = {
                images: ["./animations/superb/rndFemaleTableFront1_body.png"],
                frames: {
                    height: 143,
                    width: 98,
                    count: 46,
                    regX: -49,
                    regY: -32
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndFemaleTableFront1_body_base.png"
            }, a.rndFemaleTableFront1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 46,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndFemaleTableFront1_pants_base.png"
            }, a.rndMaleFrontTable1_body = {
                images: ["./animations/superb/rndMaleFrontTable1_body.png"],
                frames: {
                    height: 148,
                    width: 90,
                    count: 46,
                    regX: -51,
                    regY: -21
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleFrontTable1_body_base.png"
            }, a.rndMaleFrontTable1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 46,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleFrontTable1_pants_base.png"
            },
            a.rndMaleFrontTable2_body = {
                images: ["./animations/superb/rndMaleFrontTable2_body.png"],
                frames: {
                    height: 117,
                    width: 105,
                    count: 92,
                    regX: -51,
                    regY: -25
                },
                animations: {
                    loop: [0, 91]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleFrontTable2_body_base.png"
            }, a.rndMaleFrontTable2_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 92,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    loop: [0, 91]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleFrontTable2_pants_base.png"
            }, a.rndMaleTableBack1 = {
                images: ["./animations/superb/rndMaleTableBack1.png"],
                frames: {
                    height: 125,
                    width: 96,
                    count: 92,
                    regX: -69,
                    regY: -9
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleTableBack1_base.png"
            }, a.rndMaleTableBack2 = {
                images: ["./animations/superb/rndMaleTableBack2.png"],
                frames: {
                    height: 136,
                    width: 101,
                    count: 46,
                    regX: -68,
                    regY: 0
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndMaleTableBack2_base.png"
            }, a.notepadBackC1_body = {
                images: ["./animations/notepadBackC1_body.png"],
                frames: {
                    height: 70,
                    width: 106,
                    count: 113,
                    regX: -41,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC1_body_base.png"
            }, a.notepadBackC2_body = {
                images: ["./animations/notepadBackC2_body.png"],
                frames: {
                    height: 70,
                    width: 106,
                    count: 113,
                    regX: -41,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC2_body_base.png"
            }, a.notepadBackC3_body = {
                images: ["./animations/notepadBackC3_body.png"],
                frames: {
                    height: 70,
                    width: 106,
                    count: 113,
                    regX: -41,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC3_body_base.png"
            }, a.notepadBackC4_body = {
                images: ["./animations/notepadBackC4_body.png"],
                frames: {
                    height: 70,
                    width: 106,
                    count: 113,
                    regX: -41,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC4_body_base.png"
            }, a.notepadBackC5_body = {
                images: ["./animations/notepadBackC5_body.png"],
                frames: {
                    height: 71,
                    width: 105,
                    count: 113,
                    regX: -42,
                    regY: -55
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC5_body_base.png"
            }, a.notepadBackC6_body = {
                images: ["./animations/notepadBackC6_body.png"],
                frames: {
                    height: 71,
                    width: 105,
                    count: 113,
                    regX: -42,
                    regY: -55
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC6_body_base.png"
            }, a.notepadBackC7_body = {
                images: ["./animations/notepadBackC7_body.png"],
                frames: {
                    height: 70,
                    width: 106,
                    count: 113,
                    regX: -41,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC7_body_base.png"
            }, a.notepadBackC8_body = {
                images: ["./animations/notepadBackC8_body.png"],
                frames: {
                    height: 70,
                    width: 105,
                    count: 113,
                    regX: -42,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC8_body_base.png"
            }, a.notepadBackC9_body = {
                images: ["./animations/notepadBackC9_body.png"],
                frames: {
                    height: 67,
                    width: 61,
                    count: 113,
                    regX: -81,
                    regY: -61
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC9_body_base.png"
            }, a.notepadBackC10_body = {
                images: ["./animations/notepadBackC10_body.png"],
                frames: {
                    height: 67,
                    width: 61,
                    count: 113,
                    regX: -81,
                    regY: -61
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC10_body_base.png"
            }, a.notepadBackC11_body = {
                images: ["./animations/notepadBackC11_body.png"],
                frames: {
                    height: 67,
                    width: 60,
                    count: 113,
                    regX: -81,
                    regY: -61
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC11_body_base.png"
            }, a.notepadBackC12_body = {
                images: ["./animations/notepadBackC12_body.png"],
                frames: {
                    height: 72,
                    width: 105,
                    count: 113,
                    regX: -37,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC12_body_base.png"
            }, a.notepadBackC1_chair = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 113,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC1_chair_base.png"
            }, a.notepadBackC1_hand = {
                images: ["./animations/notepadBackC1_hands.png"],
                frames: {
                    height: 77,
                    width: 100,
                    count: 113,
                    regX: -14,
                    regY: -44
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                }
            }, a.notepadBackC4_hand = {
                images: ["./animations/notepadBackC4_hands.png"],
                frames: {
                    height: 77,
                    width: 100,
                    count: 113,
                    regX: -14,
                    regY: -44
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                }
            }, a.notepadBackC5_hand = {
                images: ["./animations/notepadBackC5_hands.png"],
                frames: {
                    height: 77,
                    width: 100,
                    count: 113,
                    regX: -14,
                    regY: -44
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                }
            }, a.notepadBackC9_hand = {
                images: ["./animations/notepadBackC9_hands.png"],
                frames: {
                    height: 84,
                    width: 114,
                    count: 113,
                    regX: -11,
                    regY: -44
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112,
                        112
                    ]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC9_hands_base.png"
            }, a.notepadBackC10_hand = {
                images: ["./animations/notepadBackC10_hands.png"],
                frames: {
                    height: 84,
                    width: 115,
                    count: 113,
                    regX: -10,
                    regY: -44
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC10_hands_base.png"
            }, a.notepadBackC12_hand = {
                images: ["./animations/notepadBackC12_hands.png"],
                frames: {
                    height: 84,
                    width: 114,
                    count: 113,
                    regX: -11,
                    regY: -44
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC12_hands_base.png"
            }, a.notepadBackC1_head = {
                images: ["./animations/notepadBackC1_head.png"],
                frames: {
                    height: 76,
                    width: 80,
                    count: 113,
                    regX: -63,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC1_head_base.png"
            }, a.notepadBackC2_head = {
                images: ["./animations/notepadBackC2_head.png"],
                frames: {
                    height: 81,
                    width: 78,
                    count: 113,
                    regX: -64,
                    regY: -2
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC2_head_base.png"
            }, a.notepadBackC3_head = {
                images: ["./animations/notepadBackC3_head.png"],
                frames: {
                    height: 78,
                    width: 81,
                    count: 113,
                    regX: -62,
                    regY: -7
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC3_head_base.png"
            }, a.notepadBackC4_head = {
                images: ["./animations/notepadBackC4_head.png"],
                frames: {
                    height: 78,
                    width: 83,
                    count: 113,
                    regX: -62,
                    regY: -3
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC4_head_base.png"
            }, a.notepadBackC5_head = {
                images: ["./animations/notepadBackC5_head.png"],
                frames: {
                    height: 76,
                    width: 78,
                    count: 113,
                    regX: -64,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC5_head_base.png"
            }, a.notepadBackC6_head = {
                images: ["./animations/notepadBackC6_head.png"],
                frames: {
                    height: 75,
                    width: 82,
                    count: 113,
                    regX: -63,
                    regY: -8
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC6_head_base.png"
            }, a.notepadBackC7_head = {
                images: ["./animations/notepadBackC7_head.png"],
                frames: {
                    height: 78,
                    width: 84,
                    count: 113,
                    regX: -62,
                    regY: -3
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC7_head_base.png"
            }, a.notepadBackC8_head = {
                images: ["./animations/notepadBackC8_head.png"],
                frames: {
                    height: 75,
                    width: 81,
                    count: 113,
                    regX: -62,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC8_head_base.png"
            }, a.notepadBackC9_head = {
                images: ["./animations/notepadBackC9_head.png"],
                frames: {
                    height: 92,
                    width: 91,
                    count: 113,
                    regX: -65,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC9_head_base.png"
            }, a.notepadBackC10_head = {
                images: ["./animations/notepadBackC10_head.png"],
                frames: {
                    height: 91,
                    width: 91,
                    count: 113,
                    regX: -65,
                    regY: -13
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC10_head_base.png"
            }, a.notepadBackC11_head = {
                images: ["./animations/notepadBackC11_head.png"],
                frames: {
                    height: 91,
                    width: 84,
                    count: 113,
                    regX: -64,
                    regY: -13
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC11_head_base.png"
            }, a.notepadBackC12_head = {
                images: ["./animations/notepadBackC12_head.png"],
                frames: {
                    height: 91,
                    width: 87,
                    count: 113,
                    regX: -61,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC12_head_base.png"
            }, a.notepadBackC1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 113,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC1_pants_base.png"
            }, a.notepadBackC9_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 113,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/notepadBackC9_pants_base.png"
            }, a.notepadImage = {
                images: ["./animations/notepadImage.png"],
                frames: {
                    regY: 0,
                    height: 200,
                    regX: 0,
                    width: 200,
                    count: 1
                },
                animations: {
                    all: [0, 0]
                },
                targetFPS: {
                    all: 7
                }
            }, a.notepadFrontC1_body = {
                images: ["./animations/superb/notepadFrontC1_body.png"],
                frames: {
                    height: 84,
                    width: 109,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC1_body_base.png"
            }, a.notepadFrontC2_body = {
                images: ["./animations/superb/notepadFrontC2_body.png"],
                frames: {
                    height: 85,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC2_body_base.png"
            }, a.notepadFrontC3_body = {
                images: ["./animations/superb/notepadFrontC3_body.png"],
                frames: {
                    height: 84,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC3_body_base.png"
            }, a.notepadFrontC4_body = {
                images: ["./animations/superb/notepadFrontC4_body.png"],
                frames: {
                    height: 85,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC4_body_base.png"
            }, a.notepadFrontC5_body = {
                images: ["./animations/superb/notepadFrontC5_body.png"],
                frames: {
                    height: 84,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -75
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC5_body_base.png"
            }, a.notepadFrontC6_body = {
                images: ["./animations/superb/notepadFrontC6_body.png"],
                frames: {
                    height: 84,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -75
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC6_body_base.png"
            }, a.notepadFrontC7_body = {
                images: ["./animations/superb/notepadFrontC7_body.png"],
                frames: {
                    height: 84,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -75
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC7_body_base.png"
            }, a.notepadFrontC8_body = {
                images: ["./animations/superb/notepadFrontC8_body.png"],
                frames: {
                    height: 85,
                    width: 110,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC8_body_base.png"
            },
            a.notepadFrontC9_body = {
                images: ["./animations/superb/notepadFrontC9_body.png"],
                frames: {
                    height: 84,
                    width: 107,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC9_body_base.png"
            }, a.notepadFrontC10_body = {
                images: ["./animations/superb/notepadFrontC10_body.png"],
                frames: {
                    height: 84,
                    width: 107,
                    count: 113,
                    regX: -57,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC10_body_base.png"
            }, a.notepadFrontC11_body = {
                images: ["./animations/superb/notepadFrontC11_body.png"],
                frames: {
                    height: 77,
                    width: 79,
                    count: 113,
                    regX: -55,
                    regY: -74
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC11_body_base.png"
            }, a.notepadFrontC12_body = {
                images: ["./animations/superb/notepadFrontC12_body.png"],
                frames: {
                    height: 76,
                    width: 77,
                    count: 113,
                    regX: -58,
                    regY: -74
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC12_body_base.png"
            }, a.notepadFrontC1_chair = {
                images: ["./animations/superb/notepadFrontC1_chair.png"],
                frames: {
                    height: 96,
                    width: 121,
                    count: 113,
                    regX: -21,
                    regY: -91
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC1_chair_base.png"
            }, a.notepadFrontC1_hand = {
                images: ["./animations/superb/notepadFrontC1_hands.png"],
                frames: {
                    height: 100,
                    width: 118,
                    count: 113,
                    regX: -81,
                    regY: -72
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                }
            }, a.notepadFrontC4_hand = {
                images: ["./animations/superb/notepadFrontC4_hands.png"],
                frames: {
                    height: 100,
                    width: 118,
                    count: 113,
                    regX: -81,
                    regY: -72
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                }
            }, a.notepadFrontC5_hand = {
                images: ["./animations/superb/notepadFrontC5_hands.png"],
                frames: {
                    height: 100,
                    width: 118,
                    count: 113,
                    regX: -81,
                    regY: -72
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                }
            }, a.notepadFrontC9_hand = {
                images: ["./animations/superb/notepadFrontC9_hands.png"],
                frames: {
                    height: 97,
                    width: 139,
                    count: 113,
                    regX: -60,
                    regY: -72
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC9_hands_base.png"
            }, a.notepadFrontC10_hand = {
                images: ["./animations/superb/notepadFrontC10_hands.png"],
                frames: {
                    height: 97,
                    width: 139,
                    count: 113,
                    regX: -60,
                    regY: -72
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC10_hands_base.png"
            }, a.notepadFrontC12_hand = {
                images: ["./animations/superb/notepadFrontC12_hands.png"],
                frames: {
                    height: 97,
                    width: 139,
                    count: 113,
                    regX: -60,
                    regY: -72
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC12_hands_base.png"
            }, a.notepadFrontC1_head = {
                images: ["./animations/superb/notepadFrontC1_head.png"],
                frames: {
                    height: 71,
                    width: 79,
                    count: 113,
                    regX: -56,
                    regY: -18
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC1_head_base.png"
            }, a.notepadFrontC2_head = {
                images: ["./animations/superb/notepadFrontC2_head.png"],
                frames: {
                    height: 73,
                    width: 83,
                    count: 113,
                    regX: -55,
                    regY: -16
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC2_head_base.png"
            }, a.notepadFrontC3_head = {
                images: ["./animations/superb/notepadFrontC3_head.png"],
                frames: {
                    height: 68,
                    width: 74,
                    count: 113,
                    regX: -58,
                    regY: -21
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC3_head_base.png"
            }, a.notepadFrontC4_head = {
                images: ["./animations/superb/notepadFrontC4_head.png"],
                frames: {
                    height: 70,
                    width: 77,
                    count: 113,
                    regX: -61,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC4_head_base.png"
            }, a.notepadFrontC5_head = {
                images: ["./animations/superb/notepadFrontC5_head.png"],
                frames: {
                    height: 72,
                    width: 75,
                    count: 113,
                    regX: -58,
                    regY: -18
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC5_head_base.png"
            }, a.notepadFrontC6_head = {
                images: ["./animations/superb/notepadFrontC6_head.png"],
                frames: {
                    height: 78,
                    width: 76,
                    count: 113,
                    regX: -60,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC6_head_base.png"
            },
            a.notepadFrontC7_head = {
                images: ["./animations/superb/notepadFrontC7_head.png"],
                frames: {
                    height: 73,
                    width: 81,
                    count: 113,
                    regX: -59,
                    regY: -16
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC7_head_base.png"
            }, a.notepadFrontC8_head = {
                images: ["./animations/superb/notepadFrontC8_head.png"],
                frames: {
                    height: 72,
                    width: 77,
                    count: 113,
                    regX: -58,
                    regY: -18
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC8_head_base.png"
            }, a.notepadFrontC9_head = {
                images: ["./animations/superb/notepadFrontC9_head.png"],
                frames: {
                    height: 78,
                    width: 83,
                    count: 113,
                    regX: -49,
                    regY: -17
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC9_head_base.png"
            }, a.notepadFrontC10_head = {
                images: ["./animations/superb/notepadFrontC10_head.png"],
                frames: {
                    height: 77,
                    width: 74,
                    count: 113,
                    regX: -61,
                    regY: -18
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC10_head_base.png"
            }, a.notepadFrontC11_head = {
                images: ["./animations/superb/notepadFrontC11_head.png"],
                frames: {
                    height: 74,
                    width: 72,
                    count: 113,
                    regX: -60,
                    regY: -21
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC11_head_base.png"
            }, a.notepadFrontC12_head = {
                images: ["./animations/superb/notepadFrontC12_head.png"],
                frames: {
                    height: 74,
                    width: 74,
                    count: 113,
                    regX: -58,
                    regY: -21
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC12_head_base.png"
            }, a.notepadFrontC1_pants = {
                images: ["./animations/superb/notepadFrontC1_pants.png"],
                frames: {
                    height: 51,
                    width: 79,
                    count: 113,
                    regX: -62,
                    regY: -136
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC1_pants_base.png"
            }, a.notepadFrontC9_pants = {
                images: ["./animations/superb/notepadFrontC9_pants.png"],
                frames: {
                    height: 44,
                    width: 66,
                    count: 113,
                    regX: -62,
                    regY: -142
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 112],
                    end: [112, 112]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/notepadFrontC9_pants_base.png"
            }, a.teaCupImage = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 1,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    all: [0, 0]
                },
                targetFPS: {
                    all: 7
                },
                baseImage: "./animations/superb/teacup.png"
            }, a.teaCupImageLevel2 = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 1,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    all: [0, 0]
                },
                targetFPS: {
                    all: 7
                },
                baseImage: "./animations/superb/teacupLevel2.png"
            }, a.pong = {
                images: ["./animations/pong.png"],
                frames: {
                    height: 146,
                    regX: -29,
                    count: 120,
                    regY: -26,
                    width: 147
                },
                animations: {
                    all: [0, 119]
                },
                targetFPS: {
                    all: 20
                },
                baseImage: "./animations/pong_base.png"
            }, a.idleBackC1_body = {
                images: ["./animations/idleBackC1_body.png"],
                frames: {
                    height: 61,
                    width: 94,
                    count: 30,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC1_body_base.png"
            },
            a.idleBackC2_body = {
                images: ["./animations/idleBackC2_body.png"],
                frames: {
                    height: 61,
                    width: 94,
                    count: 30,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC2_body_base.png"
            }, a.idleBackC3_body = {
                images: ["./animations/idleBackC3_body.png"],
                frames: {
                    height: 61,
                    width: 94,
                    count: 30,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC3_body_base.png"
            },
            a.idleBackC4_body = {
                images: ["./animations/idleBackC4_body.png"],
                frames: {
                    height: 61,
                    width: 94,
                    count: 30,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC4_body_base.png"
            }, a.idleBackC5_body = {
                images: ["./animations/idleBackC5_body.png"],
                frames: {
                    height: 61,
                    width: 93,
                    count: 30,
                    regX: -64,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC5_body_base.png"
            },
            a.idleBackC6_body = {
                images: ["./animations/idleBackC6_body.png"],
                frames: {
                    height: 61,
                    width: 93,
                    count: 30,
                    regX: -64,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC6_body_base.png"
            }, a.idleBackC7_body = {
                images: ["./animations/idleBackC7_body.png"],
                frames: {
                    height: 61,
                    width: 94,
                    count: 30,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC7_body_base.png"
            },
            a.idleBackC8_body = {
                images: ["./animations/idleBackC8_body.png"],
                frames: {
                    height: 61,
                    width: 93,
                    count: 30,
                    regX: -64,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC8_body_base.png"
            }, a.idleBackC9_body = {
                images: ["./animations/idleBackC9_body.png"],
                frames: {
                    height: 65,
                    width: 61,
                    count: 30,
                    regX: -91,
                    regY: -62
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC9_body_base.png"
            },
            a.idleBackC10_body = {
                images: ["./animations/idleBackC10_body.png"],
                frames: {
                    height: 65,
                    width: 61,
                    count: 30,
                    regX: -90,
                    regY: -62
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC10_body_base.png"
            }, a.idleBackC11_body = {
                images: ["./animations/idleBackC11_body.png"],
                frames: {
                    height: 65,
                    width: 61,
                    count: 30,
                    regX: -91,
                    regY: -62
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC11_body_base.png"
            },
            a.idleBackC12_body = {
                images: ["./animations/idleBackC12_body.png"],
                frames: {
                    height: 65,
                    width: 87,
                    count: 30,
                    regX: -64,
                    regY: -62
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC12_body_base.png"
            }, a.idleBackC1_chair = {
                images: ["./animations/idleBackC1_chair.png"],
                frames: {
                    height: 74,
                    width: 104,
                    count: 30,
                    regX: -68,
                    regY: -86
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC1_chair_base.png"
            },
            a.idleBackC1_hand = {
                images: ["./animations/idleBackC1_hands.png"],
                frames: {
                    height: 39,
                    width: 61,
                    count: 30,
                    regX: -52,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC1_hands_base.png"
            }, a.idleBackC4_hand = {
                images: ["./animations/idleBackC4_hands.png"],
                frames: {
                    height: 39,
                    width: 60,
                    count: 30,
                    regX: -52,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC4_hands_base.png"
            },
            a.idleBackC5_hand = {
                images: ["./animations/idleBackC5_hands.png"],
                frames: {
                    height: 39,
                    width: 60,
                    count: 30,
                    regX: -52,
                    regY: -65
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC5_hands_base.png"
            }, a.idleBackC9_hand = {
                images: ["./animations/idleBackC9_hands.png"],
                frames: {
                    height: 55,
                    width: 75,
                    count: 30,
                    regX: -54,
                    regY: -64
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC9_hands_base.png"
            },
            a.idleBackC10_hand = {
                images: ["./animations/idleBackC10_hands.png"],
                frames: {
                    height: 55,
                    width: 75,
                    count: 30,
                    regX: -54,
                    regY: -64
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC10_hands_base.png"
            }, a.idleBackC12_hand = {
                images: ["./animations/idleBackC12_hands.png"],
                frames: {
                    height: 55,
                    width: 75,
                    count: 30,
                    regX: -54,
                    regY: -64
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC12_hands_base.png"
            },
            a.idleBackC1_head = {
                images: ["./animations/idleBackC1_head.png"],
                frames: {
                    height: 72,
                    width: 77,
                    count: 30,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC1_head_base.png"
            }, a.idleBackC2_head = {
                images: ["./animations/idleBackC2_head.png"],
                frames: {
                    height: 84,
                    width: 77,
                    count: 30,
                    regX: -85,
                    regY: -1
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC2_head_base.png"
            },
            a.idleBackC3_head = {
                images: ["./animations/idleBackC3_head.png"],
                frames: {
                    height: 78,
                    width: 81,
                    count: 30,
                    regX: -85,
                    regY: -7
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC3_head_base.png"
            }, a.idleBackC4_head = {
                images: ["./animations/idleBackC4_head.png"],
                frames: {
                    height: 76,
                    width: 83,
                    count: 30,
                    regX: -85,
                    regY: -3
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC4_head_base.png"
            },
            a.idleBackC5_head = {
                images: ["./animations/idleBackC5_head.png"],
                frames: {
                    height: 76,
                    width: 77,
                    count: 30,
                    regX: -85,
                    regY: -11
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC5_head_base.png"
            }, a.idleBackC6_head = {
                images: ["./animations/idleBackC6_head.png"],
                frames: {
                    height: 74,
                    width: 81,
                    count: 30,
                    regX: -85,
                    regY: -8
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC6_head_base.png"
            },
            a.idleBackC7_head = {
                images: ["./animations/idleBackC7_head.png"],
                frames: {
                    height: 77,
                    width: 84,
                    count: 30,
                    regX: -85,
                    regY: -3
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC7_head_base.png"
            }, a.idleBackC8_head = {
                images: ["./animations/idleBackC8_head.png"],
                frames: {
                    height: 75,
                    width: 79,
                    count: 30,
                    regX: -83,
                    regY: -11
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC8_head_base.png"
            },
            a.idleBackC9_head = {
                images: ["./animations/idleBackC9_head.png"],
                frames: {
                    height: 91,
                    width: 84,
                    count: 30,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC9_head_base.png"
            }, a.idleBackC10_head = {
                images: ["./animations/idleBackC10_head.png"],
                frames: {
                    height: 92,
                    width: 84,
                    count: 30,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC10_head_base.png"
            },
            a.idleBackC11_head = {
                images: ["./animations/idleBackC11_head.png"],
                frames: {
                    height: 92,
                    width: 80,
                    count: 30,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC11_head_base.png"
            }, a.idleBackC12_head = {
                images: ["./animations/idleBackC12_head.png"],
                frames: {
                    height: 92,
                    width: 83,
                    count: 30,
                    regX: -82,
                    regY: -10
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC12_head_base.png"
            },
            a.idleBackC1_pants = {
                images: ["./animations/idleBackC1_pants.png"],
                frames: {
                    height: 59,
                    width: 82,
                    count: 30,
                    regX: -40,
                    regY: -111
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC1_pants_base.png"
            }, a.idleBackC9_pants = {
                images: ["./animations/idleBackC9_pants.png"],
                frames: {
                    height: 56,
                    width: 79,
                    count: 30,
                    regX: -42,
                    regY: -121
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/idleBackC9_pants_base.png"
            },
            a.idleFrontC1_body = {
                images: ["./animations/superb/idleFrontC1_body.png"],
                frames: {
                    height: 83,
                    width: 90,
                    count: 30,
                    regX: -50,
                    regY: -75
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC1_body_base.png"
            }, a.idleFrontC2_body = {
                images: ["./animations/superb/idleFrontC2_body.png"],
                frames: {
                    height: 85,
                    width: 91,
                    count: 30,
                    regX: -50,
                    regY: -75
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC2_body_base.png"
            },
            a.idleFrontC3_body = {
                images: ["./animations/superb/idleFrontC3_body.png"],
                frames: {
                    height: 84,
                    width: 90,
                    count: 30,
                    regX: -50,
                    regY: -75
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC3_body_base.png"
            }, a.idleFrontC4_body = {
                images: ["./animations/superb/idleFrontC4_body.png"],
                frames: {
                    height: 85,
                    width: 91,
                    count: 30,
                    regX: -50,
                    regY: -75
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC4_body_base.png"
            },
            a.idleFrontC5_body = {
                images: ["./animations/superb/idleFrontC5_body.png"],
                frames: {
                    height: 84,
                    width: 91,
                    count: 30,
                    regX: -50,
                    regY: -76
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC5_body_base.png"
            }, a.idleFrontC6_body = {
                images: ["./animations/superb/idleFrontC6_body.png"],
                frames: {
                    height: 84,
                    width: 90,
                    count: 30,
                    regX: -51,
                    regY: -76
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC6_body_base.png"
            },
            a.idleFrontC7_body = {
                images: ["./animations/superb/idleFrontC7_body.png"],
                frames: {
                    height: 84,
                    width: 91,
                    count: 30,
                    regX: -50,
                    regY: -76
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC7_body_base.png"
            }, a.idleFrontC8_body = {
                images: ["./animations/superb/idleFrontC8_body.png"],
                frames: {
                    height: 85,
                    width: 91,
                    count: 30,
                    regX: -50,
                    regY: -75
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC8_body_base.png"
            },
            a.idleFrontC9_body = {
                images: ["./animations/superb/idleFrontC9_body.png"],
                frames: {
                    height: 80,
                    width: 85,
                    count: 30,
                    regX: -51,
                    regY: -78
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC9_body_base.png"
            }, a.idleFrontC10_body = {
                images: ["./animations/superb/idleFrontC10_body.png"],
                frames: {
                    height: 81,
                    width: 85,
                    count: 30,
                    regX: -51,
                    regY: -77
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC10_body_base.png"
            },
            a.idleFrontC11_body = {
                images: ["./animations/superb/idleFrontC11_body.png"],
                frames: {
                    height: 73,
                    width: 67,
                    count: 30,
                    regX: -48,
                    regY: -78
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC11_body_base.png"
            }, a.idleFrontC12_body = {
                images: ["./animations/superb/idleFrontC12_body.png"],
                frames: {
                    height: 73,
                    width: 65,
                    count: 30,
                    regX: -51,
                    regY: -78
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC12_body_base.png"
            },
            a.idleFrontC1_chair = {
                images: ["./animations/superb/idleFrontC1_chair.png"],
                frames: {
                    height: 71,
                    width: 67,
                    count: 30,
                    regX: -48,
                    regY: -92
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC1_chair_base.png"
            }, a.idleFrontC1_hand = {
                images: ["./animations/superb/idleFrontC1_hands.png"],
                frames: {
                    height: 46,
                    width: 64,
                    count: 30,
                    regX: -89,
                    regY: -122
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC1_hands_base.png"
            },
            a.idleFrontC4_hand = {
                images: ["./animations/superb/idleFrontC4_hands.png"],
                frames: {
                    height: 46,
                    width: 64,
                    count: 30,
                    regX: -89,
                    regY: -122
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC4_hands_base.png"
            }, a.idleFrontC5_hand = {
                images: ["./animations/superb/idleFrontC5_hands.png"],
                frames: {
                    height: 46,
                    width: 64,
                    count: 30,
                    regX: -89,
                    regY: -122
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC5_hands_base.png"
            },
            a.idleFrontC9_hand = {
                images: ["./animations/superb/idleFrontC9_hands.png"],
                frames: {
                    height: 66,
                    width: 96,
                    count: 30,
                    regX: -54,
                    regY: -100
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC9_hands_base.png"
            }, a.idleFrontC10_hand = {
                images: ["./animations/superb/idleFrontC10_hands.png"],
                frames: {
                    height: 66,
                    width: 96,
                    count: 30,
                    regX: -54,
                    regY: -100
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC10_hands_base.png"
            },
            a.idleFrontC12_hand = {
                images: ["./animations/superb/idleFrontC12_hands.png"],
                frames: {
                    height: 66,
                    width: 96,
                    count: 30,
                    regX: -54,
                    regY: -100
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC12_hands_base.png"
            }, a.idleFrontC1_head = {
                images: ["./animations/superb/idleFrontC1_head.png"],
                frames: {
                    height: 69,
                    width: 73,
                    count: 30,
                    regX: -42,
                    regY: -19
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC1_head_base.png"
            },
            a.idleFrontC2_head = {
                images: ["./animations/superb/idleFrontC2_head.png"],
                frames: {
                    height: 70,
                    width: 76,
                    count: 30,
                    regX: -41,
                    regY: -18
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC2_head_base.png"
            }, a.idleFrontC3_head = {
                images: ["./animations/superb/idleFrontC3_head.png"],
                frames: {
                    height: 66,
                    width: 68,
                    count: 30,
                    regX: -44,
                    regY: -22
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC3_head_base.png"
            },
            a.idleFrontC4_head = {
                images: ["./animations/superb/idleFrontC4_head.png"],
                frames: {
                    height: 69,
                    width: 71,
                    count: 30,
                    regX: -47,
                    regY: -20
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC4_head_base.png"
            }, a.idleFrontC5_head = {
                images: ["./animations/superb/idleFrontC5_head.png"],
                frames: {
                    height: 69,
                    width: 69,
                    count: 30,
                    regX: -45,
                    regY: -20
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC5_head_base.png"
            },
            a.idleFrontC6_head = {
                images: ["./animations/superb/idleFrontC6_head.png"],
                frames: {
                    height: 78,
                    width: 69,
                    count: 30,
                    regX: -46,
                    regY: -10
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC6_head_base.png"
            }, a.idleFrontC7_head = {
                images: ["./animations/superb/idleFrontC7_head.png"],
                frames: {
                    height: 73,
                    width: 75,
                    count: 30,
                    regX: -44,
                    regY: -15
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC7_head_base.png"
            },
            a.idleFrontC8_head = {
                images: ["./animations/superb/idleFrontC8_head.png"],
                frames: {
                    height: 70,
                    width: 72,
                    count: 30,
                    regX: -44,
                    regY: -19
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC8_head_base.png"
            }, a.idleFrontC9_head = {
                images: ["./animations/superb/idleFrontC9_head.png"],
                frames: {
                    height: 79,
                    width: 73,
                    count: 30,
                    regX: -40,
                    regY: -20
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC9_head_base.png"
            },
            a.idleFrontC10_head = {
                images: ["./animations/superb/idleFrontC10_head.png"],
                frames: {
                    height: 74,
                    width: 69,
                    count: 30,
                    regX: -47,
                    regY: -20
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC10_head_base.png"
            }, a.idleFrontC11_head = {
                images: ["./animations/superb/idleFrontC11_head.png"],
                frames: {
                    height: 72,
                    width: 66,
                    count: 30,
                    regX: -47,
                    regY: -22
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC11_head_base.png"
            },
            a.idleFrontC12_head = {
                images: ["./animations/superb/idleFrontC12_head.png"],
                frames: {
                    height: 77,
                    width: 69,
                    count: 30,
                    regX: -46,
                    regY: -22
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC12_head_base.png"
            }, a.idleFrontC1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 30,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC1_pants_base.png"
            },
            a.idleFrontC9_pants = {
                images: ["./animations/superb/idleFrontC9_pants.png"],
                frames: {
                    height: 41,
                    width: 63,
                    count: 30,
                    regX: -62,
                    regY: -154
                },
                animations: {
                    start: [0, 28],
                    loop: [29, 29],
                    end: [28, 0]
                },
                targetFPS: {
                    start: 60,
                    loop: 15,
                    end: 60
                },
                baseImage: "./animations/superb/idleFrontC9_pants_base.png"
            }, a.typingBackC1_body = {
                images: ["./animations/typingBackC1_body.png"],
                frames: {
                    height: 56,
                    width: 84,
                    count: 51,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC1_body_base.png"
            },
            a.typingBackC2_body = {
                images: ["./animations/typingBackC2_body.png"],
                frames: {
                    height: 56,
                    width: 85,
                    count: 51,
                    regX: -62,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC2_body_base.png"
            }, a.typingBackC3_body = {
                images: ["./animations/typingBackC3_body.png"],
                frames: {
                    height: 56,
                    width: 85,
                    count: 51,
                    regX: -62,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC3_body_base.png"
            },
            a.typingBackC4_body = {
                images: ["./animations/typingBackC4_body.png"],
                frames: {
                    height: 56,
                    width: 85,
                    count: 51,
                    regX: -62,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC4_body_base.png"
            }, a.typingBackC5_body = {
                images: ["./animations/typingBackC5_body.png"],
                frames: {
                    height: 56,
                    width: 84,
                    count: 51,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC5_body_base.png"
            },
            a.typingBackC6_body = {
                images: ["./animations/typingBackC6_body.png"],
                frames: {
                    height: 56,
                    width: 84,
                    count: 51,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC6_body_base.png"
            }, a.typingBackC7_body = {
                images: ["./animations/typingBackC7_body.png"],
                frames: {
                    height: 56,
                    width: 85,
                    count: 51,
                    regX: -62,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC7_body_base.png"
            },
            a.typingBackC8_body = {
                images: ["./animations/typingBackC8_body.png"],
                frames: {
                    height: 56,
                    width: 84,
                    count: 51,
                    regX: -63,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC8_body_base.png"
            }, a.typingBackC9_body = {
                images: ["./animations/typingBackC9_body.png"],
                frames: {
                    height: 26,
                    width: 51,
                    count: 51,
                    regX: -91,
                    regY: -77
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC9_body_base.png"
            },
            a.typingBackC10_body = {
                images: ["./animations/typingBackC10_body.png"],
                frames: {
                    height: 26,
                    width: 52,
                    count: 51,
                    regX: -90,
                    regY: -77
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC10_body_base.png"
            }, a.typingBackC11_body = {
                images: ["./animations/typingBackC11_body.png"],
                frames: {
                    height: 27,
                    width: 52,
                    count: 51,
                    regX: -90,
                    regY: -77
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC11_body_base.png"
            },
            a.typingBackC12_body = {
                images: ["./animations/typingBackC12_body.png"],
                frames: {
                    height: 56,
                    width: 79,
                    count: 51,
                    regX: -63,
                    regY: -64
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC12_body_base.png"
            }, a.typingBackC1_chair = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 51,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC1_chair_base.png"
            },
            a.typingBackC1_hand = {
                images: ["./animations/typingBackC1_hands.png"],
                frames: {
                    height: 41,
                    width: 50,
                    count: 51,
                    regX: -49,
                    regY: -63
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC1_hands_base.png"
            }, a.typingBackC4_hand = {
                images: ["./animations/typingBackC4_hands.png"],
                frames: {
                    height: 41,
                    width: 50,
                    count: 51,
                    regX: -49,
                    regY: -63
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC4_hands_base.png"
            },
            a.typingBackC5_hand = {
                images: ["./animations/typingBackC5_hands.png"],
                frames: {
                    height: 41,
                    width: 50,
                    count: 51,
                    regX: -49,
                    regY: -63
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC5_hands_base.png"
            }, a.typingBackC9_hand = {
                images: ["./animations/typingBackC9_hands.png"],
                frames: {
                    height: 54,
                    width: 68,
                    count: 51,
                    regX: -52,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC9_hands_base.png"
            },
            a.typingBackC10_hand = {
                images: ["./animations/typingBackC10_hands.png"],
                frames: {
                    height: 54,
                    width: 68,
                    count: 51,
                    regX: -52,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC10_hands_base.png"
            }, a.typingBackC12_hand = {
                images: ["./animations/typingBackC12_hands.png"],
                frames: {
                    height: 54,
                    width: 68,
                    count: 51,
                    regX: -52,
                    regY: -65
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC12_hands_base.png"
            },
            a.typingBackC1_head = {
                images: ["./animations/typingBackC1_head.png"],
                frames: {
                    height: 70,
                    width: 58,
                    count: 51,
                    regX: -85,
                    regY: -13
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC1_head_base.png"
            }, a.typingBackC2_head = {
                images: ["./animations/typingBackC2_head.png"],
                frames: {
                    height: 80,
                    width: 58,
                    count: 51,
                    regX: -85,
                    regY: -2
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC2_head_base.png"
            },
            a.typingBackC3_head = {
                images: ["./animations/typingBackC3_head.png"],
                frames: {
                    height: 75,
                    width: 59,
                    count: 51,
                    regX: -85,
                    regY: -7
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC3_head_base.png"
            }, a.typingBackC4_head = {
                images: ["./animations/typingBackC4_head.png"],
                frames: {
                    height: 75,
                    width: 61,
                    count: 51,
                    regX: -85,
                    regY: -3
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC4_head_base.png"
            },
            a.typingBackC5_head = {
                images: ["./animations/typingBackC5_head.png"],
                frames: {
                    height: 74,
                    width: 58,
                    count: 51,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC5_head_base.png"
            }, a.typingBackC6_head = {
                images: ["./animations/typingBackC6_head.png"],
                frames: {
                    height: 71,
                    width: 61,
                    count: 51,
                    regX: -85,
                    regY: -8
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC6_head_base.png"
            },
            a.typingBackC7_head = {
                images: ["./animations/typingBackC7_head.png"],
                frames: {
                    height: 75,
                    width: 61,
                    count: 51,
                    regX: -85,
                    regY: -3
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC7_head_base.png"
            }, a.typingBackC8_head = {
                images: ["./animations/typingBackC8_head.png"],
                frames: {
                    height: 74,
                    width: 62,
                    count: 51,
                    regX: -82,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC8_head_base.png"
            },
            a.typingBackC9_head = {
                images: ["./animations/typingBackC9_head.png"],
                frames: {
                    height: 90,
                    width: 70,
                    count: 51,
                    regX: -84,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC9_head_base.png"
            }, a.typingBackC10_head = {
                images: ["./animations/typingBackC10_head.png"],
                frames: {
                    height: 90,
                    width: 70,
                    count: 51,
                    regX: -84,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC10_head_base.png"
            },
            a.typingBackC11_head = {
                images: ["./animations/typingBackC11_head.png"],
                frames: {
                    height: 88,
                    width: 65,
                    count: 51,
                    regX: -84,
                    regY: -13
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC11_head_base.png"
            }, a.typingBackC12_head = {
                images: ["./animations/typingBackC12_head.png"],
                frames: {
                    height: 89,
                    width: 66,
                    count: 51,
                    regX: -82,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC12_head_base.png"
            },
            a.typingBackC1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 51,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC1_pants_base.png"
            }, a.typingBackC9_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 51,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 50],
                    end: [50, 50]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/typingBackC9_pants_base.png"
            }, a.typingFrontC1_body = {
                images: ["./animations/superb/typingFrontC1_body.png"],
                frames: {
                    height: 75,
                    width: 84,
                    count: 30,
                    regX: -57,
                    regY: -80
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC1_body_base.png"
            }, a.typingFrontC2_body = {
                images: ["./animations/superb/typingFrontC2_body.png"],
                frames: {
                    height: 75,
                    width: 85,
                    count: 30,
                    regX: -56,
                    regY: -82
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC2_body_base.png"
            },
            a.typingFrontC3_body = {
                images: ["./animations/superb/typingFrontC3_body.png"],
                frames: {
                    height: 75,
                    width: 85,
                    count: 30,
                    regX: -57,
                    regY: -81
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC3_body_base.png"
            }, a.typingFrontC4_body = {
                images: ["./animations/superb/typingFrontC4_body.png"],
                frames: {
                    height: 76,
                    width: 86,
                    count: 30,
                    regX: -56,
                    regY: -81
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC4_body_base.png"
            },
            a.typingFrontC5_body = {
                images: ["./animations/superb/typingFrontC5_body.png"],
                frames: {
                    height: 76,
                    width: 85,
                    count: 30,
                    regX: -57,
                    regY: -81
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC5_body_base.png"
            }, a.typingFrontC6_body = {
                images: ["./animations/superb/typingFrontC6_body.png"],
                frames: {
                    height: 76,
                    width: 85,
                    count: 30,
                    regX: -57,
                    regY: -81
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC6_body_base.png"
            },
            a.typingFrontC7_body = {
                images: ["./animations/superb/typingFrontC7_body.png"],
                frames: {
                    height: 76,
                    width: 85,
                    count: 30,
                    regX: -57,
                    regY: -81
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC7_body_base.png"
            }, a.typingFrontC8_body = {
                images: ["./animations/superb/typingFrontC8_body.png"],
                frames: {
                    height: 76,
                    width: 85,
                    count: 30,
                    regX: -57,
                    regY: -81
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC8_body_base.png"
            },
            a.typingFrontC9_body = {
                images: ["./animations/superb/typingFrontC9_body.png"],
                frames: {
                    height: 70,
                    width: 80,
                    count: 30,
                    regX: -57,
                    regY: -85
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC9_body_base.png"
            }, a.typingFrontC10_body = {
                images: ["./animations/superb/typingFrontC10_body.png"],
                frames: {
                    height: 69,
                    width: 80,
                    count: 30,
                    regX: -57,
                    regY: -86
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC10_body_base.png"
            },
            a.typingFrontC11_body = {
                images: ["./animations/superb/typingFrontC11_body.png"],
                frames: {
                    height: 62,
                    width: 62,
                    count: 30,
                    regX: -54,
                    regY: -87
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC11_body_base.png"
            }, a.typingFrontC12_body = {
                images: ["./animations/superb/typingFrontC12_body.png"],
                frames: {
                    height: 65,
                    width: 58,
                    count: 30,
                    regX: -58,
                    regY: -84
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC12_body_base.png"
            },
            a.typingFrontC1_chair = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 30,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC1_chair_base.png"
            }, a.typingFrontC1_hand = {
                images: ["./animations/superb/typingFrontC1_hands.png"],
                frames: {
                    height: 46,
                    width: 62,
                    count: 30,
                    regX: -94,
                    regY: -122
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC1_hands_base.png"
            },
            a.typingFrontC4_hand = {
                images: ["./animations/superb/typingFrontC4_hands.png"],
                frames: {
                    height: 46,
                    width: 62,
                    count: 30,
                    regX: -94,
                    regY: -122
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC4_hands_base.png"
            }, a.typingFrontC5_hand = {
                images: ["./animations/superb/typingFrontC5_hands.png"],
                frames: {
                    height: 46,
                    width: 62,
                    count: 30,
                    regX: -94,
                    regY: -122
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC5_hands_base.png"
            },
            a.typingFrontC9_hand = {
                images: ["./animations/superb/typingFrontC9_hands.png"],
                frames: {
                    height: 62,
                    width: 92,
                    count: 30,
                    regX: -60,
                    regY: -103
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC9_hands_base.png"
            }, a.typingFrontC10_hand = {
                images: ["./animations/superb/typingFrontC10_hands.png"],
                frames: {
                    height: 62,
                    width: 92,
                    count: 30,
                    regX: -60,
                    regY: -103
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC10_hands_base.png"
            },
            a.typingFrontC12_hand = {
                images: ["./animations/superb/typingFrontC12_hands.png"],
                frames: {
                    height: 62,
                    width: 92,
                    count: 30,
                    regX: -60,
                    regY: -103
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC12_hands_base.png"
            }, a.typingFrontC1_head = {
                images: ["./animations/superb/typingFrontC1_head.png"],
                frames: {
                    height: 69,
                    width: 58,
                    count: 30,
                    regX: -57,
                    regY: -19
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC1_head_base.png"
            },
            a.typingFrontC2_head = {
                images: ["./animations/superb/typingFrontC2_head.png"],
                frames: {
                    height: 70,
                    width: 61,
                    count: 30,
                    regX: -57,
                    regY: -18
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC2_head_base.png"
            }, a.typingFrontC3_head = {
                images: ["./animations/superb/typingFrontC3_head.png"],
                frames: {
                    height: 66,
                    width: 53,
                    count: 30,
                    regX: -59,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC3_head_base.png"
            },
            a.typingFrontC4_head = {
                images: ["./animations/superb/typingFrontC4_head.png"],
                frames: {
                    height: 68,
                    width: 57,
                    count: 30,
                    regX: -62,
                    regY: -21
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC4_head_base.png"
            }, a.typingFrontC5_head = {
                images: ["./animations/superb/typingFrontC5_head.png"],
                frames: {
                    height: 69,
                    width: 56,
                    count: 30,
                    regX: -59,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC5_head_base.png"
            },
            a.typingFrontC6_head = {
                images: ["./animations/superb/typingFrontC6_head.png"],
                frames: {
                    height: 77,
                    width: 55,
                    count: 30,
                    regX: -61,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC6_head_base.png"
            }, a.typingFrontC7_head = {
                images: ["./animations/superb/typingFrontC7_head.png"],
                frames: {
                    height: 72,
                    width: 60,
                    count: 30,
                    regX: -60,
                    regY: -16
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC7_head_base.png"
            },
            a.typingFrontC8_head = {
                images: ["./animations/superb/typingFrontC8_head.png"],
                frames: {
                    height: 69,
                    width: 58,
                    count: 30,
                    regX: -59,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC8_head_base.png"
            }, a.typingFrontC9_head = {
                images: ["./animations/superb/typingFrontC9_head.png"],
                frames: {
                    height: 76,
                    width: 65,
                    count: 30,
                    regX: -49,
                    regY: -19
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC9_head_base.png"
            },
            a.typingFrontC10_head = {
                images: ["./animations/superb/typingFrontC10_head.png"],
                frames: {
                    height: 74,
                    width: 54,
                    count: 30,
                    regX: -62,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC10_head_base.png"
            }, a.typingFrontC11_head = {
                images: ["./animations/superb/typingFrontC11_head.png"],
                frames: {
                    height: 71,
                    width: 53,
                    count: 30,
                    regX: -61,
                    regY: -23
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC11_head_base.png"
            },
            a.typingFrontC12_head = {
                images: ["./animations/superb/typingFrontC12_head.png"],
                frames: {
                    height: 73,
                    width: 58,
                    count: 30,
                    regX: -58,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC12_head_base.png"
            }, a.typingFrontC1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 30,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC1_pants_base.png"
            },
            a.typingFrontC9_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 30,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 29],
                    end: [29, 29]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/typingFrontC9_pants_base.png"
            }, a.thinkingFrontC1_body = {
                images: ["./animations/superb/thinkingFrontC1_body.png"],
                frames: {
                    height: 103,
                    width: 97,
                    count: 100,
                    regX: -57,
                    regY: -54
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC1_body_base.png"
            },
            a.thinkingFrontC2_body = {
                images: ["./animations/superb/thinkingFrontC2_body.png"],
                frames: {
                    height: 105,
                    width: 98,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC2_body_base.png"
            }, a.thinkingFrontC3_body = {
                images: ["./animations/superb/thinkingFrontC3_body.png"],
                frames: {
                    height: 105,
                    width: 97,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC3_body_base.png"
            }, a.thinkingFrontC4_body = {
                images: ["./animations/superb/thinkingFrontC4_body.png"],
                frames: {
                    height: 105,
                    width: 97,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC4_body_base.png"
            }, a.thinkingFrontC5_body = {
                images: ["./animations/superb/thinkingFrontC5_body.png"],
                frames: {
                    height: 106,
                    width: 98,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC5_body_base.png"
            }, a.thinkingFrontC6_body = {
                images: ["./animations/superb/thinkingFrontC6_body.png"],
                frames: {
                    height: 106,
                    width: 98,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC6_body_base.png"
            }, a.thinkingFrontC7_body = {
                images: ["./animations/superb/thinkingFrontC7_body.png"],
                frames: {
                    height: 105,
                    width: 97,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC7_body_base.png"
            }, a.thinkingFrontC8_body = {
                images: ["./animations/superb/thinkingFrontC8_body.png"],
                frames: {
                    height: 105,
                    width: 98,
                    count: 100,
                    regX: -57,
                    regY: -53
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC8_body_base.png"
            }, a.thinkingFrontC9_body = {
                images: ["./animations/superb/thinkingFrontC9_body.png"],
                frames: {
                    height: 101,
                    width: 94,
                    count: 100,
                    regX: -58,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC9_body_base.png"
            }, a.thinkingFrontC10_body = {
                images: ["./animations/superb/thinkingFrontC10_body.png"],
                frames: {
                    height: 101,
                    width: 94,
                    count: 100,
                    regX: -58,
                    regY: -56
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC10_body_base.png"
            }, a.thinkingFrontC11_body = {
                images: ["./animations/superb/thinkingFrontC11_body.png"],
                frames: {
                    height: 73,
                    width: 70,
                    count: 100,
                    regX: -55,
                    regY: -76
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC11_body_base.png"
            }, a.thinkingFrontC12_body = {
                images: ["./animations/superb/thinkingFrontC12_body.png"],
                frames: {
                    height: 73,
                    width: 70,
                    count: 100,
                    regX: -58,
                    regY: -75
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC12_body_base.png"
            },
            a.thinkingFrontC1_chair = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 100,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC1_chair_base.png"
            }, a.thinkingFrontC1_hand = {
                images: ["./animations/superb/thinkingFrontC1_hands.png"],
                frames: {
                    height: 136,
                    width: 90,
                    count: 100,
                    regX: -80,
                    regY: -34
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC1_hands_base.png"
            },
            a.thinkingFrontC4_hand = {
                images: ["./animations/superb/thinkingFrontC4_hands.png"],
                frames: {
                    height: 136,
                    width: 90,
                    count: 100,
                    regX: -80,
                    regY: -34
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC4_hands_base.png"
            }, a.thinkingFrontC5_hand = {
                images: ["./animations/superb/thinkingFrontC5_hands.png"],
                frames: {
                    height: 136,
                    width: 90,
                    count: 100,
                    regX: -80,
                    regY: -34
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC5_hands_base.png"
            }, a.thinkingFrontC9_hand = {
                images: ["./animations/superb/thinkingFrontC9_hands.png"],
                frames: {
                    height: 129,
                    width: 107,
                    count: 100,
                    regX: -60,
                    regY: -38
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC9_hands_base.png"
            }, a.thinkingFrontC10_hand = {
                images: ["./animations/superb/thinkingFrontC10_hands.png"],
                frames: {
                    height: 129,
                    width: 107,
                    count: 100,
                    regX: -60,
                    regY: -38
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC10_hands_base.png"
            }, a.thinkingFrontC12_hand = {
                images: ["./animations/superb/thinkingFrontC12_hands.png"],
                frames: {
                    height: 129,
                    width: 106,
                    count: 100,
                    regX: -61,
                    regY: -38
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC12_hands_base.png"
            }, a.thinkingFrontC1_head = {
                images: ["./animations/superb/thinkingFrontC1_head.png"],
                frames: {
                    height: 68,
                    width: 63,
                    count: 100,
                    regX: -52,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC1_head_base.png"
            }, a.thinkingFrontC2_head = {
                images: ["./animations/superb/thinkingFrontC2_head.png"],
                frames: {
                    height: 70,
                    width: 67,
                    count: 100,
                    regX: -50,
                    regY: -18
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC2_head_base.png"
            }, a.thinkingFrontC3_head = {
                images: ["./animations/superb/thinkingFrontC3_head.png"],
                frames: {
                    height: 66,
                    width: 59,
                    count: 100,
                    regX: -53,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC3_head_base.png"
            }, a.thinkingFrontC4_head = {
                images: ["./animations/superb/thinkingFrontC4_head.png"],
                frames: {
                    height: 69,
                    width: 61,
                    count: 100,
                    regX: -57,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC4_head_base.png"
            },
            a.thinkingFrontC5_head = {
                images: ["./animations/superb/thinkingFrontC5_head.png"],
                frames: {
                    height: 69,
                    width: 60,
                    count: 100,
                    regX: -54,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC5_head_base.png"
            }, a.thinkingFrontC6_head = {
                images: ["./animations/superb/thinkingFrontC6_head.png"],
                frames: {
                    height: 78,
                    width: 60,
                    count: 100,
                    regX: -55,
                    regY: -10
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC6_head_base.png"
            }, a.thinkingFrontC7_head = {
                images: ["./animations/superb/thinkingFrontC7_head.png"],
                frames: {
                    height: 73,
                    width: 66,
                    count: 100,
                    regX: -53,
                    regY: -15
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC7_head_base.png"
            }, a.thinkingFrontC8_head = {
                images: ["./animations/superb/thinkingFrontC8_head.png"],
                frames: {
                    height: 69,
                    width: 63,
                    count: 100,
                    regX: -53,
                    regY: -20
                },
                animations: {
                    start: [0,
                        0
                    ],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC8_head_base.png"
            }, a.thinkingFrontC9_head = {
                images: ["./animations/superb/thinkingFrontC9_head.png"],
                frames: {
                    height: 76,
                    width: 66,
                    count: 100,
                    regX: -49,
                    regY: -19
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC9_head_base.png"
            }, a.thinkingFrontC10_head = {
                images: ["./animations/superb/thinkingFrontC10_head.png"],
                frames: {
                    height: 74,
                    width: 56,
                    count: 100,
                    regX: -61,
                    regY: -20
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC10_head_base.png"
            }, a.thinkingFrontC11_head = {
                images: ["./animations/superb/thinkingFrontC11_head.png"],
                frames: {
                    height: 72,
                    width: 55,
                    count: 100,
                    regX: -60,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC11_head_base.png"
            }, a.thinkingFrontC12_head = {
                images: ["./animations/superb/thinkingFrontC12_head.png"],
                frames: {
                    height: 73,
                    width: 58,
                    count: 100,
                    regX: -58,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC12_head_base.png"
            }, a.thinkingFrontC1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 100,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC1_pants_base.png"
            }, a.thinkingFrontC9_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 100,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/superb/thinkingFrontC9_pants_base.png"
            }, a.thinkingBackC1_body = {
                images: ["./animations/thinkingBackC1_body.png"],
                frames: {
                    height: 86,
                    width: 87,
                    count: 100,
                    regX: -60,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC1_body_base.png"
            }, a.thinkingBackC2_body = {
                images: ["./animations/thinkingBackC2_body.png"],
                frames: {
                    height: 86,
                    width: 89,
                    count: 100,
                    regX: -58,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC2_body_base.png"
            }, a.thinkingBackC3_body = {
                images: ["./animations/thinkingBackC3_body.png"],
                frames: {
                    height: 86,
                    width: 88,
                    count: 100,
                    regX: -59,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC3_body_base.png"
            }, a.thinkingBackC4_body = {
                images: ["./animations/thinkingBackC4_body.png"],
                frames: {
                    height: 86,
                    width: 88,
                    count: 100,
                    regX: -59,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC4_body_base.png"
            }, a.thinkingBackC5_body = {
                images: ["./animations/thinkingBackC5_body.png"],
                frames: {
                    height: 86,
                    width: 87,
                    count: 100,
                    regX: -60,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC5_body_base.png"
            }, a.thinkingBackC6_body = {
                images: ["./animations/thinkingBackC6_body.png"],
                frames: {
                    height: 86,
                    width: 87,
                    count: 100,
                    regX: -60,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC6_body_base.png"
            }, a.thinkingBackC7_body = {
                images: ["./animations/thinkingBackC7_body.png"],
                frames: {
                    height: 86,
                    width: 87,
                    count: 100,
                    regX: -59,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC7_body_base.png"
            }, a.thinkingBackC8_body = {
                images: ["./animations/thinkingBackC8_body.png"],
                frames: {
                    height: 86,
                    width: 87,
                    count: 100,
                    regX: -60,
                    regY: -35
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC8_body_base.png"
            }, a.thinkingBackC9_body = {
                images: ["./animations/thinkingBackC9_body.png"],
                frames: {
                    height: 74,
                    width: 90,
                    count: 100,
                    regX: -52,
                    regY: -69
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC9_body_base.png"
            }, a.thinkingBackC10_body = {
                images: ["./animations/thinkingBackC10_body.png"],
                frames: {
                    height: 35,
                    width: 52,
                    count: 100,
                    regX: -90,
                    regY: -69
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC10_body_base.png"
            }, a.thinkingBackC11_body = {
                images: ["./animations/thinkingBackC11_body.png"],
                frames: {
                    height: 35,
                    width: 52,
                    count: 100,
                    regX: -90,
                    regY: -69
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC11_body_base.png"
            }, a.thinkingBackC12_body = {
                images: ["./animations/thinkingBackC12_body.png"],
                frames: {
                    height: 83,
                    width: 80,
                    count: 100,
                    regX: -62,
                    regY: -36
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC12_body_base.png"
            }, a.thinkingBackC1_chair = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 100,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC1_chair_base.png"
            }, a.thinkingBackC1_hand = {
                images: ["./animations/thinkingBackC1_hands.png"],
                frames: {
                    height: 80,
                    width: 77,
                    count: 100,
                    regX: -52,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC1_hands_base.png"
            }, a.thinkingBackC4_hand = {
                images: ["./animations/thinkingBackC4_hands.png"],
                frames: {
                    height: 80,
                    width: 77,
                    count: 100,
                    regX: -52,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC4_hands_base.png"
            }, a.thinkingBackC5_hand = {
                images: ["./animations/thinkingBackC5_hands.png"],
                frames: {
                    height: 80,
                    width: 77,
                    count: 100,
                    regX: -52,
                    regY: -22
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC5_hands_base.png"
            }, a.thinkingBackC9_hand = {
                images: ["./animations/thinkingBackC9_hands.png"],
                frames: {
                    height: 95,
                    width: 72,
                    count: 100,
                    regX: -54,
                    regY: -24
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC9_hands_base.png"
            }, a.thinkingBackC10_hand = {
                images: ["./animations/thinkingBackC10_hands.png"],
                frames: {
                    height: 95,
                    width: 72,
                    count: 100,
                    regX: -54,
                    regY: -24
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC10_hands_base.png"
            }, a.thinkingBackC12_hand = {
                images: ["./animations/thinkingBackC12_hands.png"],
                frames: {
                    height: 95,
                    width: 72,
                    count: 100,
                    regX: -54,
                    regY: -24
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC12_hands_base.png"
            }, a.thinkingBackC1_head = {
                images: ["./animations/thinkingBackC1_head.png"],
                frames: {
                    height: 71,
                    width: 60,
                    count: 100,
                    regX: -85,
                    regY: -13
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC1_head_base.png"
            }, a.thinkingBackC2_head = {
                images: ["./animations/thinkingBackC2_head.png"],
                frames: {
                    height: 82,
                    width: 60,
                    count: 100,
                    regX: -85,
                    regY: -1
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC2_head_base.png"
            }, a.thinkingBackC3_head = {
                images: ["./animations/thinkingBackC3_head.png"],
                frames: {
                    height: 76,
                    width: 63,
                    count: 100,
                    regX: -85,
                    regY: -7
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC3_head_base.png"
            }, a.thinkingBackC4_head = {
                images: ["./animations/thinkingBackC4_head.png"],
                frames: {
                    height: 75,
                    width: 65,
                    count: 100,
                    regX: -85,
                    regY: -3
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC4_head_base.png"
            }, a.thinkingBackC5_head = {
                images: ["./animations/thinkingBackC5_head.png"],
                frames: {
                    height: 75,
                    width: 60,
                    count: 100,
                    regX: -85,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC5_head_base.png"
            }, a.thinkingBackC6_head = {
                images: ["./animations/thinkingBackC6_head.png"],
                frames: {
                    height: 72,
                    width: 64,
                    count: 100,
                    regX: -85,
                    regY: -8
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC6_head_base.png"
            }, a.thinkingBackC7_head = {
                images: ["./animations/thinkingBackC7_head.png"],
                frames: {
                    height: 76,
                    width: 66,
                    count: 100,
                    regX: -85,
                    regY: -3
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC7_head_base.png"
            }, a.thinkingBackC8_head = {
                images: ["./animations/thinkingBackC8_head.png"],
                frames: {
                    height: 74,
                    width: 62,
                    count: 100,
                    regX: -83,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC8_head_base.png"
            }, a.thinkingBackC9_head = {
                images: ["./animations/thinkingBackC9_head.png"],
                frames: {
                    height: 95,
                    width: 71,
                    count: 100,
                    regX: -85,
                    regY: -11
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC9_head_base.png"
            }, a.thinkingBackC10_head = {
                images: ["./animations/thinkingBackC10_head.png"],
                frames: {
                    height: 95,
                    width: 71,
                    count: 100,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC10_head_base.png"
            }, a.thinkingBackC11_head = {
                images: ["./animations/thinkingBackC11_head.png"],
                frames: {
                    height: 93,
                    width: 67,
                    count: 100,
                    regX: -85,
                    regY: -12
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC11_head_base.png"
            }, a.thinkingBackC12_head = {
                images: ["./animations/thinkingBackC12_head.png"],
                frames: {
                    height: 94,
                    width: 70,
                    count: 100,
                    regX: -82,
                    regY: -10
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC12_head_base.png"
            }, a.thinkingBackC1_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 100,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC1_pants_base.png"
            }, a.thinkingBackC9_pants = {
                images: ["./animations/empty_sheet.png"],
                frames: {
                    height: 1,
                    width: 1,
                    count: 100,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    start: [0, 0],
                    loop: [0, 99],
                    end: [99, 99]
                },
                targetFPS: {
                    start: 30,
                    loop: 30,
                    end: 30
                },
                baseImage: "./animations/thinkingBackC9_pants_base.png"
            }, a.airCon = {
                images: ["./animations/superb/airCon.png"],
                frames: {
                    height: 68,
                    width: 105,
                    count: 62,
                    regX: -392,
                    regY: -410
                },
                animations: {
                    loop: [0, 61]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/airCon_base.png"
            }, a.waterCooler = {
                images: ["./animations/superb/waterCooler.png"],
                frames: {
                    height: 37,
                    width: 16,
                    count: 46,
                    regX: -40,
                    regY: -65
                },
                animations: {
                    loop: [0, 45]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/waterCooler_base.png"
            }, a.printer = {
                images: ["./animations/superb/printer.png"],
                frames: {
                    height: 50,
                    width: 58,
                    count: 121,
                    regX: -58,
                    regY: -86
                },
                animations: {
                    loop: [0, 120]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/printer_base.png"
            }, a.rndPrinterLeftScreen = {
                images: ["./animations/superb/rndPrinterLeftScreen.png"],
                frames: {
                    height: 133,
                    width: 187,
                    count: 90,
                    regX: -19,
                    regY: -68
                },
                animations: {
                    loop: [0, 89]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndPrinterLeftScreen_base.png"
            }, a.rndPrinterRightScreen = {
                images: ["./animations/superb/rndPrinterRightScreen.png"],
                frames: {
                    height: 181,
                    width: 186,
                    count: 90,
                    regX: -42,
                    regY: -16
                },
                animations: {
                    loop: [0, 89]
                },
                targetFPS: {
                    loop: 30
                },
                baseImage: "./animations/superb/rndPrinterRightScreen_base.png"
            })
})();
"use strict";
var BitmapAnimationFactory = {
    createAnimation: function (a, b, c, f, d) {
        var k, m = CanvasManager.globalScale;
        switch (a) {
            case "thinking":
                k = BitmapAnimationFactory.createThinkingAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY = m;
                break;
            case "typing":
                k = BitmapAnimationFactory.createTypingAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY = m;
                break;
            case "sitBack":
                k = BitmapAnimationFactory.createIdleAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY = m;
                break;
            case "drawNotepad":
                k = BitmapAnimationFactory.createNotepadAnimation(b, c, f, d);
                k.scaleX = m;
                k.scaleY =
                    m;
                break;
            case "screen":
                k = BitmapAnimationFactory.createScreenAnimation(b, c)
        }
        return k
    },
    createTeaCupAnimation: function (a) {
        return 2 === GameManager.company.currentLevel ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.teaCupImageLevel2), a) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.teaCupImage), a)
    },
    createScreenAnimation: function (a, b) {
        var c = CanvasManager.globalScale;
        if (b === CharacterOrientation.NW) {
            if (1 === GameManager.company.currentLevel) {
                var f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL1),
                    a);
                f.x = VisualsManager.toScreenCoordinates(12, c);
                f.scaleX = c;
                f.scaleY = c;
                return f
            }
            if (2 === GameManager.company.currentLevel) return f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL2), a), f.x = VisualsManager.toScreenCoordinates(-1, c), f.y = VisualsManager.toScreenCoordinates(-17, c), f.scaleX = c, f.scaleY = c, f;
            if (3 === GameManager.company.currentLevel) return f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL3), a), f.x = VisualsManager.toScreenCoordinates(-16, c), f.y = VisualsManager.toScreenCoordinates(-35,
                c), f.scaleX = c, f.scaleY = c, f;
            if (4 === GameManager.company.currentLevel) return f = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.typingScreenL4), a), f.x = VisualsManager.toScreenCoordinates(-4, c), f.y = VisualsManager.toScreenCoordinates(-39, c), f.scaleX = c, f.scaleY = c, f
        }
    },
    createThinkingAnimation: function (a, b, c, f) {
        return this._createAnimation(a, b, c, f, "thinking")
    },
    createNotepadAnimation: function (a, b, c, f) {
        return this._createAnimation(a, b, c, f, "notepad")
    },
    createIdleAnimation: function (a, b, c, f) {
        return this._createAnimation(a,
            b, c, f, "idle")
    },
    createTypingAnimation: function (a, b, c, f) {
        return this._createAnimation(a, b, c, f, "typing")
    },
    _createAnimation: function (a, b, c, f, d) {
        b === CharacterOrientation.NW ? (b = new CompositeBitmapAnimation, b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC1_chair"]), a)), 8 < f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC9_pants"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC1_pants"]), a)), 4 ===
            f || 7 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC4_hand"]), a)) : 5 === f || 8 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC5_hand"]), a)) : 9 === f || 11 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC9_hand"]), a)) : 10 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC10_hand"]), a)) : 12 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d +
                "BackC12_hand"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC1_hand"]), a)), void 0 === c && (c = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC" + c + "_body"]), a)), void 0 === f && (f = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "BackC" + f + "_head"]), a))) : (b = new CompositeBitmapAnimation, b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC1_chair"]), a)), 8 < f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d +
                    "FrontC9_pants"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC1_pants"]), a)), 4 === f || 7 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC4_hand"]), a)) : 5 === f || 8 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC5_hand"]), a)) : 9 === f || 11 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC9_hand"]), a)) : 10 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d +
                        "FrontC10_hand"]), a)) : 12 === f ? b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC12_hand"]), a)) : b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC1_hand"]), a)), void 0 === c && (c = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC" + c + "_body"]), a)), void 0 === f && (f = 1), b.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets[d + "FrontC" + f + "_head"]), a)));
        return b
    }
},
    BitmapAnimationX = function (a,
        b) {
        this.speedFactor = 1;
        b && (this.speedFactor = b);
        createjs.BitmapAnimation.apply(this, arguments);
        this.targetFPS = a.targetFPS;
        a.baseImage && (!0 === GameFlags.SLOWDOWN_BASEIMAGE ? window.setTimeout(function (b) {
            b.baseImage = new Image;
            b.baseImage.src = a.baseImage
        }, 1, this) : (this.baseImage = new Image, this.baseImage.src = a.baseImage))
    };
(function () {
    BitmapAnimationX.prototype = new createjs.BitmapAnimation;
    var a = BitmapAnimationX.prototype;
    a.setAlpha = function (a) {
        this.alpha = a
    };
    a.setPaused = function (a) {
        this.paused = a
    };
    a.saveState = function () {
        var a = {};
        a.currentFrame = this.currentAnimationFrame;
        a.currentAnimation = this.currentAnimation;
        a.storyBoard = this.currentStoryBoard;
        a.paused = this.paused;
        a.alpha = this.alpha;
        return a
    };
    a.loadState = function (a) {
        a && (this.currentStoryBoard = a.storyBoard, this.currentAnimationFrame = a.currentFrame, this._animation = this.spriteSheet.getAnimation(a.currentAnimation),
            this.currentAnimation = a.currentAnimation, this._normalizeFrame(), this.paused = a.paused, this.alpha = a.alpha)
    };
    a.playStoryBoard = function (a) {
        (this.currentStoryBoard = a) && a.length ? (a = a[0], "#stop" == a ? this._stopAnimation() : this.gotoAndPlay(a)) : this.stop()
    };
    a._stopAnimation = function () {
        var a = this._animation.frames.last();
        this.gotoAndStop(a)
    };
    a.onAnimationEnd = function (a, c) {
        if (this.currentStoryBoard && 0 < this.currentStoryBoard.length && (this.currentStoryBoard.splice(0, 1), 0 < this.currentStoryBoard.length)) {
            var f = this.currentStoryBoard[0];
            "#stop" == f ? this._stopAnimation() : this.gotoAndPlay(f)
        }
        if (this.onAnimationEnded && this.currentStoryBoard && (0 == this.currentStoryBoard.length || 1 == this.currentStoryBoard.length && "#stop" === this.currentStoryBoard[0])) this.onAnimationEnded(a, c)
    };
    a._tick = function () {
        if (!this.paused && this._lastFrameTime && this._animation) {
            var a = GameManager.gameTime - this._lastFrameTime;
            this.onFire && (a *= 2);
            a = Math.floor(a * this.speedFactor / (1E3 / this.targetFPS[this._animation.name]));
            if (0 < a) {
                for (var c = 0; c < a; c++) this._advanceCount++,
                    this.advance();
                this._lastFrameTime = GameManager.gameTime
            }
        } else this._lastFrameTime = GameManager.gameTime
    };
    a.draw = function (a, c, f, d) {
        if (this.DisplayObject_draw(a, c)) return !0;
        this._normalizeFrame();
        var k = this.spriteSheet.getFrame(this.currentFrame);
        if (null == k) {
            if (10 < d) return;
            this.spriteSheet._calculateFrames();
            return this.draw(a, c, f, d ? ++d : 1)
        }
        c = k.rect;
        if (this.baseImage) return this.baseImage.complete && k.image.complete && (this.cachedFrame || (this.cachedFrame = document.createElement("canvas"), this.cachedFrame.width =
            this.baseImage.naturalWidth, this.cachedFrame.height = this.baseImage.naturalHeight), this.cachedFrame.frameNr !== this.currentFrame && (f = this.cachedFrame.getContext("2d"), f.clearRect(0, 0, this.cachedFrame.width, this.cachedFrame.height), f.drawImage(this.baseImage, 0, 0), f.drawImage(k.image, c.x, c.y, c.width, c.height, -k.regX, -k.regY, c.width, c.height), this.cachedFrame.frameNr = this.currentFrame), this.cachedFrame && 0 < this.cachedFrame.width && 0 < this.cachedFrame.height && a.drawImage(this.cachedFrame, 0, 0)), !0;
        k.image.complete &&
            a.drawImage(k.image, c.x, c.y, c.width, c.height, -k.regX, -k.regY, c.width, c.height);
        return !0
    }
})();
CharacterNameVisual = function (a) {
    createjs.Container.apply(this, arguments);
    this.character = a;
    this.init()
};
(function () {
    CharacterNameVisual.prototype = new createjs.Container;
    CharacterNameVisual.prototype.init = function () {
        this.removeAllChildren();
        var a = 0 === this.character.id ? "" : this.character.name,
            b = VisualsManager.toScreenCoordinates(280, CanvasManager.globalScaleIgnoringLowResBackground),
            c = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans",
            f = 24;
        do var d = "bold {0}pt {1}".format(f, c),
            d = new createjs.Text(a, d, "black"),
            f = f - 2; while (d.getMeasuredWidth() > b && 10 < f);
        b = f / 32;
        f = createjs.Graphics.getHSL(0, 0, 34);
        d = this.character.flags.expert ?
            "{0}({1})".format("" != a ? "\n" : "", Missions.getMissionWithId(this.character.flags.expert).name) : "";
        d = new createjs.Text(a + d, "bold 32pt {0}".format(c), f);
        d.textAlign = "center";
        d.textBaseline = "alphabetical";
        this.addChildAt(d, 0);
        this.scaleX = b * CanvasManager.globalScale;
        this.scaleY = b * CanvasManager.globalScale;
        switch (this.character.getOrientation()) {
            case CharacterOrientation.NW:
                this.skewY = -30;
                this.skewX = -60;
                this.x = VisualsManager.toScreenCoordinates(170, CanvasManager.globalScale);
                this.y = VisualsManager.toScreenCoordinates(230,
                    CanvasManager.globalScale);
                break;
            case CharacterOrientation.SE:
                this.skewY = -30, this.skewX = -60, this.x = VisualsManager.toScreenCoordinates(-50, CanvasManager.globalScale), this.y = VisualsManager.toScreenCoordinates(90, CanvasManager.globalScale)
        }
    }
})();
var CompositeBitmapAnimation = function (a) {
    this._internalAnimations = []
};
(function () {
    CompositeBitmapAnimation.prototype = new createjs.DisplayObject;
    var a = CompositeBitmapAnimation.prototype;
    a.isVisible = function () {
        return 0 < this._internalAnimations[0].alpha
    };
    a.addAnimation = function (a) {
        if (0 < this._internalAnimations.length) {
            if (this._internalAnimations[0].speedFactor != a.speedFactor) throw "invalid speedFactor for CompositeBitmapAnimation";
        } else {
            var c = this;
            a.onAnimationEnded = function (a, b) {
                c.onAnimationEnd(a, b)
            }
        }
        this._internalAnimations.push(a)
    };
    a.setAlpha = function (a) {
        for (var c =
            0; c < this._internalAnimations.length; c++) this._internalAnimations[c].setAlpha(a)
    };
    a.isAllLoaded = function () {
        for (var a = 0, c = this._internalAnimations.length; a < c; a++)
            if (this._internalAnimations[a].baseImage && !this._internalAnimations[a].baseImage.complete || !this._internalAnimations[a].spriteSheet.complete) return !1;
        return this.overlay && (this.overlay.deskImage && !this.overlay.deskImage.complete || this.overlay.keyBoardImage && !this.overlay.keyBoardImage.complete || this.overlay.pcImage && !this.overlay.pcImage.complete) ?
            !1 : !0
    };
    a.setPaused = function (a) {
        this.paused = a;
        for (var c = 0; c < this._internalAnimations.length; c++) this._internalAnimations[c].setPaused(a)
    };
    a.saveState = function () {
        var a = {};
        a.currentFrame = this._internalAnimations[0].currentAnimationFrame;
        a.currentAnimation = this._internalAnimations[0].currentAnimation;
        a.storyBoard = this._internalAnimations[0].currentStoryBoard;
        a.paused = this._internalAnimations[0].paused;
        a.alpha = this._internalAnimations[0].alpha;
        return a
    };
    a.loadState = function (a) {
        if (a)
            for (var c = 0; c < this._internalAnimations.length; c++) {
                this._internalAnimations[c].currentStoryBoard =
                    a.storyBoard;
                this._internalAnimations[c].currentAnimationFrame = a.currentFrame;
                var f = this._internalAnimations[c].spriteSheet.getAnimation(a.currentAnimation);
                this._internalAnimations[c]._animation = f;
                this._internalAnimations[c].currentAnimation = a.currentAnimation;
                if (this._internalAnimations[c].currentStoryBoard)
                    for (var d = this._internalAnimations[c].currentStoryBoard, k = 0; k < d.length; k++)(f = this._internalAnimations[c].spriteSheet._animations.first(function (a) {
                        return a === d[k]
                    })) || (d[k] = "loop");
                if (this._internalAnimations[c].currentAnimation) {
                    var m =
                        this._internalAnimations[c].currentAnimation,
                        f = this._internalAnimations[c].spriteSheet._animations.first(function (a) {
                            return a === m
                        });
                    f || (this._internalAnimations[c].currentAnimation = "loop", this._internalAnimations[c]._animation = this._internalAnimations[c].spriteSheet.getAnimation(this._internalAnimations[c].currentAnimation), this._internalAnimations[c].currentAnimationFrame = 0)
                }
                this._internalAnimations[c]._normalizeFrame();
                this._internalAnimations[c].paused = a.paused;
                this._internalAnimations[c].alpha =
                    a.alpha
            }
    };
    a.stop = function () {
        for (var a = 0; a < this._internalAnimations.length; a++) this._internalAnimations[a].stop()
    };
    a.gotoAndPlay = function (a) {
        for (var c = 0; c < this._internalAnimations.length; c++) this._internalAnimations[c].gotoAndPlay(a)
    };
    a.gotoAndStop = function (a) {
        for (var c = 0; c < this._internalAnimations.length; c++) this._internalAnimations[c].gotoAndStop(a)
    };
    a.playStoryBoard = function (a) {
        for (var c = 0; c < this._internalAnimations.length; c++)
            if ((this._internalAnimations[c].currentStoryBoard = a) && a.length) {
                var f =
                    a[0];
                "#stop" == f ? this._internalAnimations[c]._stopAnimation() : this._internalAnimations[c].gotoAndPlay(f)
            } else this._internalAnimations[c].stop()
    };
    a._stopAnimation = function () {
        for (var a = 0; a < this._internalAnimations.length; a++) {
            var c = this._internalAnimations[a]._animation.frames.last();
            this._internalAnimations[a].gotoAndStop(c)
        }
    };
    a.onAnimationEnd = function (a, c) {
        if (this.onAnimationEnded && (0 == a.currentStoryBoard.length || 1 == a.currentStoryBoard.length && "#stop" === a.currentStoryBoard[0])) this.onAnimationEnded(a,
            c)
    };
    a._tick = function () {
        for (var a = 0; a < this._internalAnimations.length; a++) this._internalAnimations[a]._tick()
    };
    a.draw = function (a, c) {
        var f = this._internalAnimations[0].currentFrame;
        if (!this.isAllLoaded() || void 0 === this._internalAnimations[0].baseImage) return !0;
        this.cachedFrame || (this.cachedFrame = document.createElement("canvas"), this.cachedFrame.width = this._internalAnimations[0].baseImage.naturalWidth, this.cachedFrame.height = this._internalAnimations[0].baseImage.naturalHeight);
        if (this.cachedFrame.frameNr !==
            f) {
            var d = this.cachedFrame.getContext("2d");
            d.clearRect(0, 0, this.cachedFrame.width, this.cachedFrame.height);
            for (var k = 0, m = this._internalAnimations.length; k < m; k++) this._internalAnimations[k].currentFrame = this._internalAnimations[0].currentFrame, this._internalAnimations[k].currentAnimationFrame = this._internalAnimations[0].currentAnimationFrame, this._internalAnimations[k]._animation = this._internalAnimations[0]._animation, this._internalAnimations[k].draw(d, c, void 0), (1 === k && 2 < m || 1 === m || 0 === k && 2 === m) &&
                this.overlay && (this.overlay.deskImage && d.drawImage(this.overlay.deskImage, 0, 0), this.overlay.keyBoardImage && d.drawImage(this.overlay.keyBoardImage, 0, 0));
            this.overlay && this.overlay.pcImage && d.drawImage(this.overlay.pcImage, 0, 0);
            this.cachedFrame.frameNr = f
        }
        this.cachedFrame && 0 < this.cachedFrame.width && 0 < this.cachedFrame.height && a.drawImage(this.cachedFrame, this.x, this.y);
        return !0
    }
})();
var GameStatusBar = function () {
    this.initialize();
    this.width = 300;
    this.textContainerHeight = this.height = 80;
    this.mainShape = new createjs.Shape;
    this.addChild(this.mainShape);
    this.gameName = new createjs.Text;
    this.gameName.textBaseline = "middle";
    this.addChild(this.gameName);
    var a = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
    this.gameDetailText = new createjs.Text("", "12pt {0}".format(a), "black");
    this.gameDetailText.textAlign = "center";
    this.gameDetailText.textBaseline = "alphabetic";
    this.gameDetailText.text = "No Project".localize();
    this.gameDetailText.x = this.width / 2;
    this.gameDetailText.y = this.textContainerHeight / 2 + 10;
    this.gameDetailText.lineHeight = this.gameDetailText.getMeasuredLineHeight();
    this.addChild(this.gameDetailText);
    this.progressBar = new ProgressBarVisual;
    this.progressBar.height = 20;
    this.progressBar.width = this.width - 60;
    this.progressBar.x = 30;
    this.progressBar.y = this.textContainerHeight - 25;
    this.progressBar.alpha = 0;
    this.addChild(this.progressBar);
    this.stateText = new createjs.Text("", "10pt {0}".format(a), "DimGray");
    this.stateText.x =
        this.width / 2;
    this.stateText.y = this.textContainerHeight - 11;
    this.stateText.textAlign = "center";
    this.stateText.textBaseline = "alphabetic";
    this.addChild(this.stateText);
    a = this.textContainerHeight / 2 - 30;
    this.designPoints = new PointsDisplayVisual(DESIGN_POINTS_COLOR, "black", "Design".localize());
    this.designPoints.x = -30;
    this.designPoints.y = a;
    this.addChild(this.designPoints);
    this.technologyPoints = new PointsDisplayVisual(TECHNOLOGY_POINTS_COLOR, "black", "Technology".localize());
    this.technologyPoints.x = this.width -
        30;
    this.technologyPoints.y = a;
    this.addChild(this.technologyPoints);
    this.bugs = new PointsDisplayVisual(BUGS_COLOR, "black", "Bugs".localize());
    this.bugs.x = this.x - 120;
    this.bugs.y = 0;
    this.bugs.size = 100;
    this.addChild(this.bugs);
    this.enginePoints = new PointsDisplayVisual(TECHNOLOGY_POINTS_COLOR, "black", "Remaining".localize("label for visual which shows 'points remaining'"));
    this.enginePoints.x = this.width / 2 - this.enginePoints.size / 4;
    this.enginePoints.y = this.textContainerHeight + 5;
    this.enginePoints.alpha = 0;
    this.addChild(this.enginePoints);
    this.hypePoints = new HypePointsVisual;
    this.hypePoints.x = this.width / 2 - this.hypePoints.width / 2;
    this.hypePoints.y = this.textContainerHeight;
    this.hypePoints.alpha = 0;
    this.addChildAt(this.hypePoints, 0);
    this.isInvalid = !0
};
(function () {
    GameStatusBar.prototype = new createjs.Container;
    var a = GameStatusBar.prototype;
    a.reset = function () {
        this.finishEngine()
    };
    a.startDevelopment = function () {
        createjs.Tween.get(this.designPoints).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.technologyPoints).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.bugs).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.gameName).to({
            alpha: 1
        }, 400);
        this.stateText.shadow = null;
        this.stateText.color = "DimGray";
        createjs.Tween.get(this.stateText).to({
            alpha: 1
        }, 400)
    };
    a.startEngine =
        function () {
            createjs.Tween.get(this.designPoints).to({
                alpha: 0
            }, 400);
            createjs.Tween.get(this.technologyPoints).to({
                alpha: 0
            }, 400);
            createjs.Tween.get(this.bugs).to({
                alpha: 0
            }, 400);
            createjs.Tween.get(this.enginePoints).to({
                alpha: 1
            }, 400);
            this.updateGameNameText(GameManager.currentEngineDev.name);
            this.gameDetailText.text = "Custom Game Engine".localize();
            createjs.Tween.get(this.gameName).to({
                alpha: 1
            }, 400)
        };
    a.startContract = function () {
        var a = GameManager.currentContract;
        createjs.Tween.get(this.designPoints).to({
            alpha: 1
        },
            400);
        createjs.Tween.get(this.technologyPoints).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.bugs).to({
            alpha: 0
        }, 400);
        this.updateGameNameText(a.name);
        this.gameDetailText.text = "Contract".localize();
        this.stateText.text = "Time Left".localize("label for progressbar");
        this.stateText.shadow = null;
        this.stateText.color = "DimGray";
        createjs.Tween.get(this.stateText).to({
            alpha: 1
        }, 400);
        createjs.Tween.get(this.gameName).to({
            alpha: 1
        }, 400)
    };
    a.finishContract = function () {
        this.endDevelopment()
    };
    a.finishEngine = function () {
        this.enginePoints.alpha =
            0;
        this.endDevelopment()
    };
    a.endDevelopment = function () {
        this.designPoints.alpha = 0.2;
        this.technologyPoints.alpha = 0.2;
        this.bugs.alpha = 0.2;
        this.gameName.alpha = 0;
        this.stateText.alpha = 0;
        this.progressBar.alpha = 0;
        this.hypePoints.alpha = 0;
        this.gameDetailText.text = "No Project".localize();
        this.designPoints.updatePoints(0);
        this.technologyPoints.updatePoints(0);
        this.bugs.updatePoints(0);
        this.updateProgress(!1);
        GameManager.spawnedPoints = 0
    };
    a.onTick = function () {
        this.isInvalid && (this.redraw(), this.isInvalid = !1)
    };
    a.updateProgress =
        function (a, c, f) {
            f || (f = 400);
            !a || isNaN(a) ? 1 === this.progressBar.alpha && (createjs.Tween.get(this.progressBar).to({
                alpha: 0
            }, f), this.stateText.shadow = null, this.stateText.color = "DimGray") : (c && 0 < a ? createjs.Tween.get(this.progressBar).to({
                progress: a
            }, f) : this.progressBar.progress = a, 0 === this.progressBar.alpha && (createjs.Tween.get(this.progressBar).to({
                alpha: 1
            }, f), this.stateText.color = "white", this.stateText.shadow = new createjs.Shadow("black", 0, 0, 2)))
        };
    a.updateStatusMessage = function (a) {
        this.stateText.text = a;
        this.stateText.lineHeight ||
            (this.stateText.lineHeight = this.stateText.getMeasuredLineHeight());
        0 === this.stateText.alpha && createjs.Tween.get(this.stateText).to({
            alpha: 1
        }, 400)
    };
    a.updateHypePoints = function (a) {
        this.hypePoints.points != a && (this.hypePoints.points = a, this.hypePoints.updateText("Hype {0}".localize("hype {0} points").format(a)));
        0 === this.hypePoints.alpha && createjs.Tween.get(this.hypePoints).to({
            alpha: 1
        }, 400)
    };
    a.getGlobalLocationOfPointsDisplay = function (a) {
        a = "t" === a ? this.technologyPoints : "e" === a ? this.enginePoints : "b" ===
            a ? this.bugs : this.designPoints;
        return this.localToGlobal(a.x + a.size / 4, a.y + a.size / 4)
    };
    a.pulsePointsDisplay = function (a, c) {
        ("t" === a ? this.technologyPoints : "e" === a ? this.enginePoints : "b" === a || "br" === a ? this.bugs : this.designPoints).pulse(c)
    };
    a.updateGameNameText = function (a) {
        var c = this.children.indexOf(this.gameName);
        this.removeChild(this.gameName);
        var f = 24,
            d = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
        do var k = "{0}pt {1}".format(f, d),
            k = new createjs.Text(a, k, "black"),
            f = f - 2; while (1.1 * k.getMeasuredWidth() >
            this.width && 10 < f);
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.lineHeight = k.getMeasuredLineHeight();
        k.y = this.textContainerHeight / 4;
        k.x = 30 + (this.width - 60) / 2;
        k.maxWidth = this.width - 60;
        this.gameName = k;
        this.addChildAt(this.gameName, c)
    };
    a.updateGameName = function () {
        var a = GameManager.company.currentGame;
        a && a.topic && a.genre && (this.updateGameNameText(a.title), this.gameDetailText.text = a.topic.name + " / " + a.genre.name, a.secondGenre && (this.gameDetailText.text += "-" + a.secondGenre.name))
    };
    a.updatePoints = function () {
        var a =
            GameManager.company.currentGame;
        a ? (this.designPoints.updatePoints(a.designPoints), this.technologyPoints.updatePoints(a.technologyPoints), this.bugs.updatePoints(a.bugs)) : GameManager.currentEngineDev ? this.enginePoints.updatePoints(GameManager.currentEngineDev.remainingPointsDisplay) : GameManager.currentContract && (a = GameManager.currentContract, this.designPoints.updatePoints(a.visualDRemaining), this.technologyPoints.updatePoints(a.visualTRemaining))
    };
    a.redraw = function () {
        var a = this.mainShape.graphics;
        a.beginFill(createjs.Graphics.getRGB(255,
            255, 255, 0.8));
        a.beginStroke("black");
        a.setStrokeStyle(1);
        a.drawRoundRect(0, 0, this.width, this.textContainerHeight, 14.3);
        a.closePath()
    }
})();
var LevelOverlay = function (a) {
    this.centerOverlay = new createjs.Container;
    this.leftOverlay = new createjs.Container;
    this.rightOverlay = new createjs.Container;
    this.company = a;
    this.initAnimations();
    a.levelOverlay && this.loadState(a.levelOverlay)
};
(function () {
    var a = LevelOverlay.prototype;
    a.initAnimations = function () {
        var a = GameManager.company.currentLevel,
            c = CanvasManager.globalScale;
        if (2 === a || 3 === a) this.airConAnimation1 = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.airCon)), this.airConAnimation1.scaleX = c, this.airConAnimation1.scaleY = c, this.airConAnimation1.x = VisualsManager.toScreenCoordinates(84, c), this.airConAnimation1.y = VisualsManager.toScreenCoordinates(-2, c), this.airConAnimation2 = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.airCon)),
            this.airConAnimation2.scaleX = c, this.airConAnimation2.scaleY = c, this.airConAnimation2.x = VisualsManager.toScreenCoordinates(406, c), this.airConAnimation2.y = VisualsManager.toScreenCoordinates(-188, c);
        1 < a && (this.waterCoolerAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.waterCooler)), this.waterCoolerAnimation.scaleX = c, this.waterCoolerAnimation.scaleY = c);
        4 === a && (GameManager.company.flags.hwLabUnlocked && (this.hwLabScreenWallAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwLabScreenWall)),
            this.hwLabScreenWallAnimation.scaleX = c, this.hwLabScreenWallAnimation.scaleY = c, this.hwLabScreenWallAnimation.x = VisualsManager.toScreenCoordinates(503, c), this.hwLabScreenWallAnimation.y = VisualsManager.toScreenCoordinates(182, c), this.hwLabTVAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwTV)), this.hwLabTVAnimation.scaleX = c, this.hwLabTVAnimation.scaleY = c, this.hwLabTVAnimation.x = VisualsManager.toScreenCoordinates(2298, c), this.hwLabTVAnimation.y = VisualsManager.toScreenCoordinates(788,
                c), this.hwLabTVAnimationCenter = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwTV)), this.hwLabTVAnimationCenter.scaleX = c, this.hwLabTVAnimationCenter.scaleY = c, this.hwLabTVAnimationCenter.x = VisualsManager.toScreenCoordinates(-262, c), this.hwLabTVAnimationCenter.y = VisualsManager.toScreenCoordinates(788, c)), GameManager.company.flags.rndLabUnlocked && (this.printerAnimation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.printer)), this.printerAnimation.scaleX = c, this.printerAnimation.scaleY =
                    c, this.printerAnimation.x = VisualsManager.toScreenCoordinates(608, c), this.printerAnimation.y = VisualsManager.toScreenCoordinates(435, c), this.rndPrinterLeftScreen = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndPrinterLeftScreen)), this.rndPrinterLeftScreen.scaleX = c, this.rndPrinterLeftScreen.scaleY = c, this.rndPrinterLeftScreen.x = VisualsManager.toScreenCoordinates(395, c), this.rndPrinterLeftScreen.y = VisualsManager.toScreenCoordinates(311, c), this.rndPrinterRightScreen = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndPrinterRightScreen)),
                    this.rndPrinterRightScreen.scaleX = c, this.rndPrinterRightScreen.scaleY = c, this.rndPrinterRightScreen.x = VisualsManager.toScreenCoordinates(747, c), this.rndPrinterRightScreen.y = VisualsManager.toScreenCoordinates(311, c)));
        var f = this,
            a = GameManager.company.currentLevel;
        4 === a && (GameManager.company.flags.hwLabUnlocked && (this.leftOverlay.addChild(this.hwLabScreenWallAnimation), this.leftOverlay.addChild(this.hwLabTVAnimation), this.centerOverlay.addChild(this.hwLabTVAnimationCenter)), GameManager.company.flags.rndLabUnlocked &&
            (this.rightOverlay.addChild(this.rndPrinterLeftScreen), this.rightOverlay.addChild(this.rndPrinterRightScreen), this.rightOverlay.addChild(this.printerAnimation)));
        if (2 === a || 3 === a) this.centerOverlay.addChild(this.airConAnimation1), this.centerOverlay.addChild(this.airConAnimation2), this.airConAnimation1.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "airConAnimation1")
        }, this.airConAnimation2.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "airConAnimation2")
        };
        1 < a && (4 === a ? (this.waterCoolerAnimation.x =
            1541 / VisualsManager.Divisor * c, this.waterCoolerAnimation.y = 440 / VisualsManager.Divisor * c) : (this.waterCoolerAnimation.x = 1501 / VisualsManager.Divisor * c, this.waterCoolerAnimation.y = 211 / VisualsManager.Divisor * c), this.centerOverlay.addChild(this.waterCoolerAnimation), this.waterCoolerAnimation.onAnimationEnded = function (a, b) {
                f.endedAnimation.call(f, a, b, "waterCoolerAnimation")
            });
        this.airConAnimation1 && (this.airConAnimation1.gotoAndStop("loop"), this.airConAnimation2.gotoAndStop("loop"), this.airConAnimation1.setAlpha(0),
            this.airConAnimation2.setAlpha(0));
        this.waterCoolerAnimation && (this.waterCoolerAnimation.gotoAndStop("loop"), this.waterCoolerAnimation.setAlpha(1));
        this.hwLabScreenWallAnimation && (this.hwLabScreenWallAnimation.gotoAndStop("loop"), this.hwLabScreenWallAnimation.setAlpha(0), this.hwLabTVAnimation.gotoAndStop("loop"), this.hwLabTVAnimation.setAlpha(0), this.hwLabTVAnimationCenter.gotoAndStop("loop"), this.hwLabTVAnimationCenter.setAlpha(0));
        this.printerAnimation && (this.printerAnimation.gotoAndStop("loop"),
            this.printerAnimation.setAlpha(0), this.rndPrinterLeftScreen.gotoAndStop("loop"), this.rndPrinterLeftScreen.setAlpha(0), this.rndPrinterRightScreen.gotoAndStop("loop"), this.rndPrinterRightScreen.setAlpha(0))
    };
    a.startAirCon1 = function () {
        this.airConAnimation1 && (this.airConAnimation1.setAlpha(1), this.airConAnimation1.playStoryBoard(["loop"]))
    };
    a.startHwLabScreenWall = function () {
        this.hwLabScreenWallAnimation.paused && (this.hwLabScreenWallAnimation.setAlpha(1), this.hwLabScreenWallAnimation.playStoryBoard(["loop"]))
    };
    a.stopHwLabScreenWall = function () {
        this.hwLabScreenWallAnimation.paused || (this.hwLabScreenWallAnimation.setAlpha(0), this.hwLabScreenWallAnimation.paused = !0)
    };
    a.starthwLabTV = function () {
        this.hwLabTVAnimation.paused && (this.hwLabTVAnimation.setAlpha(1), this.hwLabTVAnimation.playStoryBoard(["loop"]), this.hwLabTVAnimationCenter.setAlpha(1), this.hwLabTVAnimationCenter.playStoryBoard(["loop"]))
    };
    a.stophwLabTV = function () {
        this.hwLabTVAnimation.paused || (this.hwLabTVAnimation.setAlpha(0), this.hwLabTVAnimation.paused = !0, this.hwLabTVAnimationCenter.setAlpha(0), this.hwLabTVAnimationCenter.paused = !0)
    };
    a.startPrinter = function () {
        this.printerAnimation.paused && (this.printerAnimation.setAlpha(1), this.printerAnimation.playStoryBoard(["loop"]))
    };
    a.stopPrinter = function () {
        this.printerAnimation.paused || (this.printerAnimation.setAlpha(0), this.printerAnimation.paused = !0)
    };
    a.startRndPrinterLeftScreen = function () {
        this.rndPrinterLeftScreen.paused && (this.rndPrinterLeftScreen.setAlpha(1), this.rndPrinterLeftScreen.playStoryBoard(["loop"]))
    };
    a.stopRndPrinterLeftScreen = function () {
        this.rndPrinterLeftScreen.paused || (this.rndPrinterLeftScreen.setAlpha(0), this.rndPrinterLeftScreen.paused = !0)
    };
    a.startRndPrinterRightScreen = function () {
        this.rndPrinterRightScreen.paused && (this.rndPrinterRightScreen.setAlpha(1), this.rndPrinterRightScreen.playStoryBoard(["loop"]))
    };
    a.stopRndPrinterRightScreen = function () {
        this.rndPrinterRightScreen.paused || (this.rndPrinterRightScreen.setAlpha(0), this.rndPrinterRightScreen.paused = !0)
    };
    a.startAirCon2 = function () {
        this.airConAnimation2 &&
            (this.airConAnimation2.setAlpha(1), this.airConAnimation2.playStoryBoard(["loop"]))
    };
    a.startWaterCooler = function () {
        this.waterCoolerAnimation && !0 === this.waterCoolerAnimation.paused && this.waterCoolerAnimation.playStoryBoard(["loop"])
    };
    a.endedAnimation = function (a, c, f) {
        "loop" === a.currentAnimation && "airConAnimation1" !== f && "airConAnimation2" !== f && "waterCoolerAnimation" === f && this.waterCoolerAnimation.gotoAndStop("loop")
    };
    a.saveState = function () {
        var a = {};
        this.airConAnimation1 && (a.airConAnimation1 = this.airConAnimation1.saveState());
        this.airConAnimation2 && (a.airConAnimation2 = this.airConAnimation2.saveState());
        this.waterCoolerAnimation && (a.waterCoolerAnimation = this.waterCoolerAnimation.saveState());
        this.hwLabScreenWallAnimation && (a.hwLabScreenWallAnimation = this.hwLabScreenWallAnimation.saveState());
        this.hwLabTVAnimation && (a.hwLabTVnimation = this.hwLabTVAnimation.saveState());
        this.printerAnimation && (a.printerAnimation = this.printerAnimation.saveState());
        this.rndPrinterLeftScreen && (a.rndPrinterLeftScreen = this.rndPrinterLeftScreen.saveState());
        this.rndPrinterRightScreen && (a.rndPrinterRightScreen = this.rndPrinterRightScreen.saveState());
        return a
    };
    a.loadState = function (a) {
        if (a) {
            if (2 === GameManager.company.currentLevel || 3 === GameManager.company.currentLevel) this.airConAnimation1.loadState(a.airConAnimation1), this.airConAnimation2.loadState(a.airConAnimation2);
            1 < GameManager.company.currentLevel && this.waterCoolerAnimation.loadState(a.waterCoolerAnimation);
            4 === GameManager.company.currentLevel && GameManager.company.flags.hwLabUnlocked && (this.hwLabScreenWallAnimation.loadState(a.hwLabScreenWallAnimation),
                this.hwLabTVAnimation.loadState(a.hwLabTVnimation), this.hwLabTVAnimationCenter.loadState(a.hwLabTVnimation));
            4 === GameManager.company.currentLevel && GameManager.company.flags.rndLabUnlocked && (this.printerAnimation.loadState(a.printerAnimation), this.rndPrinterLeftScreen.loadState(a.rndPrinterLeftScreen), this.rndPrinterRightScreen.loadState(a.rndPrinterRightScreen))
        }
    }
})();
var PointsDisplayVisual = function (a, b, c) {
    this.initialize();
    this.innerContainer = new createjs.Container;
    this.mainShape = new createjs.Shape;
    this.innerContainer.addChild(this.mainShape);
    var f = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
    this.text = new createjs.Text("0", "14pt {0}".format(f), b);
    this.text.textAlign = "center";
    this.text.textBaseline = "middle";
    this.text.lineHeight = this.text.getMeasuredLineHeight();
    SettingsGameplay.isTextCacheEnabled() ? (this.text.cache(-50, -50, 100, 100), this.textIsCached = !0) : (this.text.uncache(),
        this.textIsCached = !1);
    this.innerContainer.addChild(this.text);
    this.points = 0;
    this.size = 120;
    this.addChild(this.innerContainer);
    this.color = a;
    this.captionBorder = new createjs.Shape;
    this.innerContainer.addChild(this.captionBorder);
    this.captionText = new createjs.Text(c, "10pt {0}".format(f), b);
    this.captionText.textBaseline = "alphabetic";
    this.captionText.direction = "rtl";
    this.captionText.lineHeight = this.captionText.getMeasuredLineHeight();
    this.captionText.lineWidth = this.captionText.getMeasuredWidth();
    this.innerContainer.addChild(this.captionText);
    this.isInvalid = !0
};
(function () {
    PointsDisplayVisual.prototype = new createjs.Container;
    var a = PointsDisplayVisual.prototype;
    a.updatePoints = function (a) {
        this.points = a
    };
    a.pulse = function (a) {
        var c = new createjs.Shape;
        c.alpha = 0;
        var f = c.graphics;
        f.clear();
        var d = this.size / 4;
        f.beginRadialGradientFill([this.color, this.color, this.color, "white", this.color, "transparent"], [0, 0.8, 0.85, 0.86, 0.9, 1], d, d, 0, d, d, d);
        f.drawEllipse(0, 0, this.size / 2, this.size / 2);
        f.closePath();
        this.addChildAt(c, 0);
        f = 0.4 * this.size / 4;
        c.scaleX = 1.4;
        c.scaleY = 1.4;
        c.x = -f;
        c.y = -f;
        createjs.Tween.get(c).to({
            alpha: 0.8
        }, 100).wait(200).to({
            alpha: 0
        }, 100);
        createjs.Tween.get(c).to({
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0
        }, 400).call(function () {
            c.parent.removeChild(c);
            a && a()
        })
    };
    a.onTick = function () {
        this.isInvalid && (this.drawMainShape(), this.text.y = this.size / 4, this.text.x = this.size / 4);
        this.text.text != Math.floor(this.points) && (this.text.text = Math.floor(this.points), SettingsGameplay.isTextCacheEnabled() ? (this.textIsCached || (this.text.cache(-50, -50, 100, 100), this.textIsCached = !0), this.text.updateCache()) :
            this.text.uncache());
        this.isInvalid = !1
    };
    a.drawMainShape = function () {
        var a = this.mainShape.graphics;
        a.clear();
        a.beginFill(this.color);
        a.setStrokeStyle(2);
        a.beginStroke("black");
        a.drawEllipse(0, 0, this.size / 2, this.size / 2);
        a.closePath();
        var c = this.captionText.lineWidth || this.captionText.getMeasuredWidth(),
            f = this.captionText.lineHeight || this.captionText.getMeasuredLineHeight(),
            a = this.captionBorder.graphics;
        a.clear();
        a.beginFill(this.color);
        a.setStrokeStyle(1);
        a.beginStroke("black");
        var d = this.size / 4 - c / 2,
            k = this.size / 2 + 5;
        a.drawRoundRect(d - 5, k, c + 10, f + 10, 2);
        a.closePath();
        0 === this.captionText.cacheID && (this.captionText.x = d, this.captionText.y = k + 10 + f / 2, SettingsGameplay.isTextCacheEnabled() ? this.captionText.cache(0, -15, 100, 25) : this.captionText.uncache())
    }
})();
var ProgressBarVisual = function () {
    this.initialize()
};
(function () {
    ProgressBarVisual.prototype = new createjs.Shape;
    var a = ProgressBarVisual.prototype;
    a.width = 100;
    a.height = 20;
    a.progress = 0;
    a.color = "darkblue";
    a.isHorizontal = !0;
    a.onTick = function () {
        if (0 != this.alpha) {
            var a = this.width,
                c = this.height,
                f = this.graphics;
            f.clear();
            f.beginFill("#A0A0A0");
            f.drawRoundRect(0, 0, a, c, 2);
            f.beginFill(this.color);
            var d = 1,
                a = a - 2,
                c = c - 2;
            if (this.isHorizontal) a *= this.progress.clamp(0, 1);
            else var k = c * this.progress.clamp(0, 1),
                d = c - k + 1,
                c = k;
            f.drawRoundRect(1, d, a, c, 2);
            f.closePath()
        }
    }
})();
var CharacterOverlay = function (a) {
    this.initialize();
    this.character = a;
    this.speedFactor = 0.8 + 0.2 * this.character.speedFactor;
    this.initAnimations();
    this.progressBar = new ProgressBarVisual;
    this.progressBar.alpha = 0;
    this.progressBar.y = VisualsManager.toScreenCoordinates(-30);
    this.addChild(this.progressBar);
    this.efficiencyBar = new ProgressBarVisual;
    this.efficiencyBar.alpha = 1 > a.efficiency ? 1 : 0;
    this.efficiencyBar.progress = 0.3;
    this.efficiencyBar.width = 12;
    this.efficiencyBar.height = 70;
    this.efficiencyBar.isHorizontal = !1;
    this.efficiencyBar.x -= VisualsManager.toScreenCoordinates(30);
    this.addChild(this.efficiencyBar);
    this.boostVisual = new CircularProgressVisual;
    this.boostVisual.radius = 20;
    this.boostVisual.x = VisualsManager.toScreenCoordinates(166, CanvasManager.globalScale);
    this.boostVisual.y = VisualsManager.toScreenCoordinates(5, CanvasManager.globalScale);
    this.boostVisual.alpha = 0.8;
    this.addChild(this.boostVisual);
    a.visualData && this.loadState(a.visualData);
    a.onFire && this.setOnFire(!0)
};
(function () {
    var a = CharacterOverlay;
    a.prototype = new createjs.Container;
    a = a.prototype;
    a.saySomething = function (a, c, f, d) {
        void 0 === f && (f = 0);
        d || (d = "black");
        c || (c = 800);
        var k = new createjs.Container;
        k.x = 25;
        k.y = -25 + f;
        a = new createjs.Text(a, "18pt Arial", d);
        a.textBaseline = "top";
        d = a.getMeasuredWidth();
        var m = a.getMeasuredLineHeight(),
            l = new createjs.Shape,
            g = l.graphics;
        g.beginFill(createjs.Graphics.getRGB(255, 255, 255, 0.8));
        g.beginStroke("black");
        g.setStrokeStyle(1);
        g.drawRoundRect(-4, -4, d + 8, m + 8, 5);
        g.closePath();
        k.addChild(l);
        k.addChild(a);
        k.alpha = 0;
        this.addChild(k);
        var n = this;
        a = c / 6;
        createjs.Tween.get(k).to({
            y: -60 + f
        }, c);
        createjs.Tween.get(k).to({
            alpha: 1
        }, a).wait(c - 2 * a).to({
            alpha: 0,
            x: 35
        }, a).call(function () {
            n.removeChild(k)
        })
    };
    a._getSpawnPointOrigin = function () {
        return this.character.getOrientation() === CharacterOrientation.NW ? {
            x: 25,
            y: -10
        } : {
            x: 130,
            y: 90
        }
    };
    a.spawnBugRemovePoint = function (a, c, f, d) {
        d || (d = 0);
        c = new MersenneTwister(a);
        var k = new createjs.Shape;
        k.alpha = 0;
        var m = this._getSpawnPointOrigin();
        k.x = m.x + 10 * c.random() * c.randomSign();
        k.y = m.y - 40 + -20 * c.random();
        k.regX = 5;
        k.regY = 5;
        k.scaleX = 0;
        k.scaleY = 0;
        var l = k.graphics;
        l.beginFill(BUGS_COLOR);
        l.beginStroke("black");
        l.setStrokeStyle(0.5);
        l.drawCircle(5, 5, 10);
        l.closePath();
        this.addChild(k);
        var g = this,
            l = f / 8;
        f /= 2;
        var n = GameManager.gameId;
        GameManager.increaseSpawnedPoints();
        var r = [],
            p = this;
        r.push(createjs.Tween.get(k).wait(d).to({
            y: m.y - 80 - 60 * c.random()
        }, f, createjs.Ease.backIn).call(function () {
            n == GameManager.gameId && (GameManager.decreaseBugs(1), VisualsManager.updatePoints(), 1 == GameManager.company.flags.currentZone &&
                Sound.playSoundOnce("bugDecrease", 0.2), p.character.removeSpawnedPoint(a), GameManager.decreaseSpawnedPoints(), VisualsManager.pulsePointsDisplay("br"))
        }));
        r.push(createjs.Tween.get(k).wait(d).to({
            alpha: 1
        }, l).wait(f - 2 * l).to({
            alpha: 0
        }, l).call(function () {
            g.removeChild(k)
        }));
        r.push(createjs.Tween.get(k).wait(d).to({
            scaleX: 1,
            scaleY: 1
        }, 2 * l, createjs.Ease.backOut));
        return r
    };
    a.spawnPoint = function (a, c, f, d) {
        d || (d = 0);
        if (!this.spawnPointVisuals || this.spawnPointVisuals.gameId != GameManager.gameId) this.spawnPointVisuals = {
            gameId: GameManager.gameId
        };
        else if (GameFlags.GROUP_POINTS && c in this.spawnPointVisuals) {
            var k = this.spawnPointVisuals[c];
            if (k) {
                k.weight++;
                f = k.targetScaleX;
                d = k.targetScaleY;
                k.targetScaleX = Math.min(2, f + 0.2);
                k.targetScaleY = Math.min(2, d + 0.2);
                var m = createjs.Tween.get(k);
                m.isScaleTween = !0;
                m.set({
                    scaleX: f,
                    scaleY: d
                }).to({
                    scaleX: k.targetScaleX,
                    scaleY: k.targetScaleY
                }, 100);
                k.ids.push(a);
                k.textShape || (k.textShape = new createjs.Text(k.weight, "10pt {0}".format(UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans"), "black"),
                    k.textShape.textAlign = "center", k.textShape.textBaseline = "middle", k.textShape.x = 5, k.textShape.y = 4, k.addChild(k.textShape));
                k.textShape.text = k.weight;
                GameManager.increaseSpawnedPoints();
                return [m]
            }
        }
        m = new MersenneTwister(a);
        k = new createjs.Container;
        k.alpha = 0;
        var l = this._getSpawnPointOrigin();
        l.x += this.x;
        l.y += this.y;
        k.x = l.x + 10 * m.random() * m.randomSign();
        k.y = l.y + -20 * m.random();
        k.regX = 5;
        k.regY = 5;
        k.scaleX = 0;
        k.scaleY = 0;
        k.targetScaleX = 1;
        k.targetScaleY = 1;
        var g = "t" === c || "e" === c ? TECHNOLOGY_POINTS_COLOR : "d" === c ?
            DESIGN_POINTS_COLOR : "b" === c ? BUGS_COLOR : RESEARCH_POINTS_COLOR;
        1 == GameManager.company.flags.currentZone && Sound.playSpawnSound(c);
        var n = new createjs.Shape;
        k.addChild(n);
        n = n.graphics;
        n.beginFill(g);
        n.beginStroke("black");
        n.setStrokeStyle(0.5);
        n.drawCircle(5, 5, 10);
        n.closePath();
        CanvasManager.characterStage.addChild(k);
        k.weight = 1;
        k.ids = [a];
        this.spawnPointVisuals[c] = k;
        var r = CanvasManager.characterStage;
        a = VisualsManager.getGlobalLocationOfPointsDisplay(c);
        var g = f / 8,
            n = f / 2,
            p = GameManager.gameId;
        GameManager.increaseSpawnedPoints();
        var s = [],
            u = this;
        s.push(createjs.Tween.get(k).wait(d).to({
            y: l.y - 80 - 20 * m.random()
        }, n, createjs.Ease.backOut).call(function () {
            delete u.spawnPointVisuals[c]
        }).to({
            x: a.x,
            y: a.y
        }, f - n, createjs.Ease.quadIn).call(function () {
            if (p == GameManager.gameId) {
                var a = k.weight;
                VisualsManager.pulsePointsDisplay(c);
                "t" === c ? GameManager.company.currentGame ? GameManager.company.currentGame.technologyPoints += a : GameManager.currentContract && (GameManager.currentContract.visualTRemaining -= a) : "d" === c ? GameManager.company.currentGame ?
                    GameManager.company.currentGame.designPoints += a : GameManager.currentContract && (GameManager.currentContract.visualDRemaining -= a) : "r" === c ? GameManager.company.researchPoints += a : "e" === c ? GameManager.increaseDisplayEnginePoints(u.character, a) : "b" === c && GameManager.company.currentGame && (GameManager.company.currentGame.bugs += a);
                1 == GameManager.company.flags.currentZone && Sound.playSpawnSound(c, !0);
                VisualsManager.updatePoints();
                for (a = 0; a < k.ids.length; a++) u.character.removeSpawnedPoint(k.ids[a]), GameManager.decreaseSpawnedPoints();
                "r" != c && GameManager.currentFeature && "preparation" != GameManager.currentFeature.id && Tutorial.gamePoints()
            }
        }));
        s.push(createjs.Tween.get(k).wait(d).to({
            alpha: 1
        }, g).wait(f - 2 * g).to({
            alpha: 0
        }, g).call(function () {
            r.removeChild(k)
        }));
        s.push(createjs.Tween.get(k).wait(d).to({
            scaleX: 1,
            scaleY: 1
        }, 2 * g, createjs.Ease.backOut));
        return s
    };
    a.startResearching = function () {
        if (1 != this.progressBar.alpha && (createjs.Tween.get(this.progressBar).to({
            alpha: 1
        }, 400), this.character.currentResearch.isTraining)) {
            var a = this.character.currentResearch,
                c = Training.getAllTrainings().first(function (c) {
                    return c.id === a.id
                });
            a.isSkillTraining = c && c.isSkillTraining;
            a.isSkillTraining && (this.animateTrainingProgress(), this.trainingOverlay.fadeIn(1200))
        }
    };
    a.finishResearching = function () {
        createjs.Tween.get(this.progressBar).to({
            alpha: 0
        }, 400);
        this.trainingOverlay.fadeOut(1200)
    };
    a.onTick = function () {
        this.character.state === CharacterState.Researching && (this.progressBar.progress = this.character.currentResearch.progress, this.progressBar.color = this.character.currentResearch.progressColor ?
            this.character.currentResearch.progressColor : "research" == this.character.currentResearch.type ? "darkblue" : "lightgreen");
        var a = this.character.efficiency;
        1 != a ? (this.efficiencyBar.progress = a, this.efficiencyBar.color = createjs.Graphics.getHSL(80 * a, 100, 50), this.efficiencyBar.alpha = (this.efficiencyBar.alpha + 0.01).clamp(0, 0.8)) : 0 != this.efficiencyBar.alpha && (this.efficiencyBar.alpha = (this.efficiencyBar.alpha - 0.01).clamp(0, 1))
    };
    a.initAnimations = function () {
        var a = CanvasManager.globalScale;
        if (this.character.getOrientation() ===
            CharacterOrientation.NW) {
            var c = BitmapAnimationFactory.createAnimation("screen", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
            c && this.addChild(c);
            this.screenAnimation = c
        }
        c = BitmapAnimationFactory.createAnimation("typing", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.typingAnimation = c;
        c = BitmapAnimationFactory.createAnimation("thinking", this.speedFactor, this.character.getOrientation(),
            this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.thinkingAnimation = c;
        c = BitmapAnimationFactory.createAnimation("sitBack", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.sitBackAnimation = c;
        c = BitmapAnimationFactory.createAnimation("drawNotepad", this.speedFactor, this.character.getOrientation(), this.character.flags.body, this.character.flags.head);
        c.overlay = this;
        this.addChild(c);
        this.drawNotepadAnimation = c;
        c = "";
        c = this.character.getOrientation() == CharacterOrientation.NW ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.notepadImage), this.speedFactor) : BitmapAnimationFactory.createTeaCupAnimation(this.speedFactor);
        c.overlay = this;
        c.scaleX = a;
        c.scaleY = a;
        this.addChild(c);
        this.notepadImage = c;
        var f = this;
        this.typingAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "typing")
        };
        this.thinkingAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f,
                a, b, "thinking")
        };
        this.sitBackAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "sitBack")
        };
        this.drawNotepadAnimation.onAnimationEnded = function (a, b) {
            f.endedAnimation.call(f, a, b, "drawNotepad")
        };
        1 === GameManager.company.currentLevel && (c = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.pong)), c.x = VisualsManager.toScreenCoordinates(1321, a) - VisualsManager.toScreenCoordinates(1039, a), c.y = VisualsManager.toScreenCoordinates(261, a) - VisualsManager.toScreenCoordinates(539, a), c.scaleX =
            a, c.scaleY = a, this.addChild(c), this.pongAnimation = c);
        this.notepadImage.gotoAndStop("all");
        this.sitBackAnimation.gotoAndStop("loop");
        this.screenAnimation && this.screenAnimation.gotoAndStop("loop");
        this.pongAnimation && this.pongAnimation.gotoAndStop("all");
        this.typingAnimation.setAlpha(0);
        this.thinkingAnimation.setAlpha(0);
        this.sitBackAnimation.setAlpha(1);
        this.drawNotepadAnimation.setAlpha(0);
        this.refreshName()
    };
    a.refreshName = function () {
        var a = new CharacterNameVisual(this.character);
        a.alpha = 0.7;
        this.characterNameVisual &&
            this.removeChild(this.characterNameVisual);
        this.characterNameVisual = a;
        this.addChildAt(this.characterNameVisual, 0)
    };
    a.endedAnimation = function (a, c, f) {
        "loop" === a.currentAnimation ? this.character.loopEnded() : null === a.currentAnimation && a.paused || "end" === a.currentAnimation ? this.character.animationEnded(f) : !0 === a.paused ? this.character.loopEnded() : "sitBack" === f && "start" === c && null != a.currentStoryBoard && 0 === a.currentStoryBoard.length && this.sitBackAnimation.playStoryBoard(["loop"])
    };
    a.removeAllAnimation = function () {
        this.typingAnimation.setAlpha(0);
        this.thinkingAnimation.setAlpha(0);
        this.sitBackAnimation.setAlpha(0);
        this.drawNotepadAnimation.setAlpha(0);
        this.notepadImage.setAlpha(1);
        this.screenAnimation && this.screenAnimation.setPaused(!0);
        this.typingAnimation.stop();
        this.thinkingAnimation.stop();
        this.sitBackAnimation.stop();
        this.drawNotepadAnimation.stop()
    };
    a.startThinking = function () {
        this.removeAllAnimation();
        this.thinkingAnimation.setAlpha(1);
        this.thinkingAnimation.playStoryBoard(["start", "loop"])
    };
    a.continueThinking = function () {
        this.thinkingAnimation.setPaused(!1)
    };
    a.endThinking = function () {
        this.thinkingAnimation.playStoryBoard(["end", "#stop"])
    };
    a.startDrawNotepad = function () {
        this.removeAllAnimation();
        this.notepadImage.setAlpha(0);
        this.drawNotepadAnimation.setAlpha(1);
        this.drawNotepadAnimation.playStoryBoard(["start", "loop"])
    };
    a.continueDrawNotepad = function () {
        this.drawNotepadAnimation.setPaused(!1)
    };
    a.endDrawNotepad = function () {
        this.drawNotepadAnimation.playStoryBoard(["end", "#stop"])
    };
    a.startSitBack = function () {
        this.removeAllAnimation();
        this.sitBackAnimation.setAlpha(1);
        this.sitBackAnimation.playStoryBoard(["start", "loop"])
    };
    a.startSitBackLoop = function () {
        this.removeAllAnimation();
        this.sitBackAnimation.setAlpha(1);
        this.sitBackAnimation.playStoryBoard(["loop"])
    };
    a.continueSitBack = function () {
        this.sitBackAnimation.setPaused(!1)
    };
    a.endSitBack = function () {
        this.sitBackAnimation.playStoryBoard(["end", "#stop"])
    };
    a.startTyping = function () {
        this.removeAllAnimation();
        this.screenAnimation && this.screenAnimation.setPaused(!1);
        this.typingAnimation.setAlpha(1);
        this.typingAnimation.playStoryBoard(["start",
            "loop"
        ])
    };
    a.continueTyping = function () {
        this.screenAnimation && this.screenAnimation.setPaused(!1);
        this.typingAnimation.setPaused(!1)
    };
    a.endTyping = function () {
        this.screenAnimation && this.screenAnimation.stop();
        this.typingAnimation.playStoryBoard(["end", "#stop"])
    };
    a.playPong = function () {
        if (this.pongAnimation && this.pongAnimation.paused) {
            this.pongAnimation.playStoryBoard(["all", "#stop"]);
            var a = GameManager.gameId,
                c = function () {
                    a == GameManager.gameId && 1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("ping",
                        0.5)
                },
                f = function () {
                    a == GameManager.gameId && 1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("pong", 0.5)
                };
            createjs.Tween.get(this).wait(500).call(c).wait(720).call(f).wait(650).call(c).wait(1100).call(f).wait(300).call(c).wait(850).call(c).wait(500).call(f).wait(650).call(c).wait(1100).call(f).wait(200).call(c).wait(2E3).call(function () {
                Achievements.activate(Achievements.lvl1EasterEgg);
                GameManager.checkAchievements()
            });
            ghg4.ghg5("pong played")
        }
    };
    a.saveState = function () {
        var a = {};
        a.typingAnimation =
            this.typingAnimation.saveState();
        this.screenAnimation && (a.screenAnimation = this.screenAnimation.saveState());
        a.thinkingAnimation = this.thinkingAnimation.saveState();
        a.sitBackAnimation = this.sitBackAnimation.saveState();
        a.drawNotepadAnimation = this.drawNotepadAnimation.saveState();
        a.notepadImage = this.notepadImage.saveState();
        this.pongAnimation && (a.pong = this.pongAnimation.saveState());
        this.character.state === CharacterState.Researching && (a.currentTraining = this.currentTrainingState);
        return a
    };
    a.loadState =
        function (a) {
            a && (this.typingAnimation.loadState(a.typingAnimation), this.screenAnimation && this.screenAnimation.loadState(a.screenAnimation), this.thinkingAnimation.loadState(a.thinkingAnimation), this.sitBackAnimation.loadState(a.sitBackAnimation), this.drawNotepadAnimation.loadState(a.drawNotepadAnimation), this.notepadImage.loadState(a.notepadImage), this.pongAnimation && this.pongAnimation.loadState(a.pongAnimation), a.currentTraining && (this.currentTrainingState = a.currentTraining))
        };
    a.resumeTraining = function () {
        if (void 0 ==
            this.currentTrainingState) this.character.currentResearch && this.character.currentResearch.isSkillTraining && this.trainingOverlay.show();
        else if (this.character.currentResearch && this.character.currentResearch.isSkillTraining) {
            var a = this.currentTrainingState;
            this.animateTrainingProgress(a.updates);
            var c = GameManager.gameTime - a.start;
            this.trainingTweens.forEach(function (a) {
                a.setPosition(c)
            });
            this.trainingOverlay.show()
        }
    };
    a.setOnFire = function (a) {
        a ? (this.typingAnimation.onFire = !0, this.screenAnimation && (this.screenAnimation.onFire = !0), this.thinkingAnimation.onFire = !0, this.sitBackAnimation.onFire = !0, this.drawNotepadAnimation.onFire = !0, this.notepadImage.onFire = !0, this.pongAnimation && (this.pongAnimation.onFire = !0)) : (this.typingAnimation.onFire = void 0, this.screenAnimation && (this.screenAnimation.onFire = void 0), this.thinkingAnimation.onFire = void 0, this.sitBackAnimation.onFire = void 0, this.drawNotepadAnimation.onFire = void 0, this.notepadImage.onFire = void 0, this.pongAnimation && (this.pongAnimation.onFire = void 0))
    };
    GameManager.addTickListener(function (a) {
        VisualsManager.characterOverlays.forEach(function (a) {
            a.character.state ==
                CharacterState.Researching && a.trainingOverlay && a.trainingTweens && a.trainingTweens.forEach(function (a) {
                    a = a._target;
                    void 0 != a.gamedev_text_int && a.text(Math.floor(a.gamedev_text_int));
                    void 0 != a.gamedev_yTilt && a.css("transform", "rotateY({0}deg)".format(a.gamedev_yTilt))
                })
        })
    }, !0);
    a.animateTrainingProgress = function (a) {
        if (this.trainingOverlay) {
            for (var c = this.trainingOverlay, f = [], d = [{
                p: this.character.designFactor,
                t: "d"
            }, {
                p: this.character.technologyFactor,
                t: "t"
            }, {
                p: this.character.speedFactor,
                t: "s"
            }, {
                p: this.character.researchFactor,
                t: "r"
            }], k = 0; k < d.length; k++) {
                var m = d[k],
                    l = c.find(".training{0}.trainingColumnRight".format(m.t.toUpperCase()));
                if (void 0 == l.gamedev_text_int) {
                    var g = Math.floor(500 * m.p);
                    l.text(g);
                    a && (l = a.first(function (a) {
                        return a.t === m.t
                    })) && (l.o = g)
                }
            }
            if (a) {
                if (0 < a.length) {
                    1 == GameManager.company.flags.currentZone && Sound.playSoundOnce("trainingProgress", 0.1);
                    for (var n = this, k = 0; k < a.length; k++) {
                        var r = GameManager.gameId;
                        (function (a) {
                            var b = c.find(".trainingGain.training{0}".format(a.t.toUpperCase()));
                            b.text("+" + a.p);
                            void 0 ===
                                b.gamedev_yTilt && (b.gamedev_yTilt = 90);
                            f.push(createjs.Tween.get(b).to({
                                gamedev_yTilt: 0
                            }, 400, createjs.Ease.bounceOut).wait(800).to({
                                gamedev_yTilt: 90
                            }, 400));
                            b = c.find(".training{0}.trainingColumnRight".format(a.t.toUpperCase()));
                            void 0 === b.gamedev_text_int && (b.gamedev_text_int = a.o);
                            var d = createjs.Tween.get(b).wait(200).to({
                                gamedev_text_int: a.o + a.p
                            }, 500);
                            d.call(function () {
                                r == GameManager.gameId && (n.character.applyTrainingUpdate(a), -1 != n.trainingTweens.indexOf(d) && n.trainingTweens.remove(d))
                            });
                            f.push(d)
                        })(a[k])
                    }
                }
                this.currentTrainingState = {
                    updates: a,
                    start: GameManager.gameTime
                }
            }
            this.trainingTweens = f
        }
    }
})();
var ProjectWorkerVisual = function (a) {
    this.state = {
        progressF: 0
    };
    this.efficiency = 0;
    createjs.Container.apply(this, arguments);
    this.init();
    this.visualData = a
};
(function () {
    var a = ProjectWorkerVisual;
    a.prototype = new createjs.Container;
    a = a.prototype;
    a.init = function () {
        this.alpha = 0;
        this.efficiencyBar = new ProgressBarVisual;
        this.efficiencyBar.alpha = 1 > this.efficiency ? 1 : 0;
        this.efficiencyBar.progress = 0.3;
        this.efficiencyBar.width = 12;
        this.efficiencyBar.height = 70;
        this.efficiencyBar.isHorizontal = !1;
        this.efficiencyBar.x -= 30 / VisualsManager.Divisor;
        this.scaleY = this.scaleX = CanvasManager.globalScale;
        this.addChild(this.efficiencyBar)
    };
    a.save = function () {
        var a = {};
        a.id = this.id;
        a.alpha = this.alpha;
        a.progress = this.efficiencyBar.progress;
        a.efficiencyBarAlpha = this.efficiencyBar.alpha;
        a.state = this.state;
        a.efficiency = this.efficiency;
        a.zone = this.zone;
        a.visualData = this.animation.saveState();
        return a
    };
    a.load = function () {
        this.visualData && (this.zone = this.visualData.zone, this.setPosition(this.visualData.id), this.alpha = this.visualData.alpha, void 0 != this.visualData.efficiencyBarAlpha && (this.efficiencyBar.alpha = this.visualData.efficiencyBarAlpha), this.efficiencyBar.progress = this.visualData.progress,
            this.state = this.visualData.state, this.efficiency = this.visualData.efficiency, this.loadAnimations(), this.animation.loadState(this.visualData.visualData))
    };
    a.loadAnimations = function () {
        var a = 200,
            b = 150,
            d = 250;
        PlatformShim.ISLOWRES && (a = 107, b = 80, d = 133);
        var k = CanvasManager.globalScale;
        0 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontFemale1), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTypingBack1), 1) : 1 === this.id ? this.animation =
            0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackMale2), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleTypingBack1), 1) : 2 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale2), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndOperator1), 1) : 3 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackMale1), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndActor1),
                1) : 4 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontMale2), 1)), this.animation.overlay = {
                    deskImage: this.getSubImage(this.x - 552 / VisualsManager.Divisor * k, this.y - 746 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk2)
                }) : this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleBoardBack1), 1) : 5 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation,
                    this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontMale3), 1)), this.animation.overlay = {
                        deskImage: this.getSubImage(this.x - 998 / VisualsManager.Divisor * k, this.y - 486 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk1)
                    }) : this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTableBack1), 1) : 6 === this.id ? 0 === this.zone ? this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale3), 1) : (this.animation = new CompositeBitmapAnimation,
                        this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable1_pants), 1)), this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable1_body), 1)), this.animation.overlay = {
                            deskImage: this.getSubImage(this.x - 735 / VisualsManager.Divisor * k, this.y - 600 / VisualsManager.Divisor * k, a, a, ResourceKeys.rndDesk1)
                        }) : 7 === this.id ? this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale4),
                            1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleTableBack1), 1) : 8 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontFemale2), 1)), this.animation.overlay = {
                                deskImage: this.getSubImage(this.x - 552 / VisualsManager.Divisor * k, this.y - 746 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk2)
                            }) : this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleTableBack2),
                                1) : 9 === this.id ? 0 === this.zone ? (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontMale4), 1)), this.animation.overlay = {
                                    deskImage: this.getSubImage(this.x - 552 / VisualsManager.Divisor * k, this.y - 746 / VisualsManager.Divisor * k, b, d, ResourceKeys.hwDesk2)
                                }) : (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTableFront1_pants), 1)), this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndFemaleTableFront1_body),
                                    1)), this.animation.overlay = {
                                        deskImage: this.getSubImage(this.x - 1043 / VisualsManager.Divisor * k, this.y - 765 / VisualsManager.Divisor * k, a, a, ResourceKeys.rndDesk2)
                                    }) : 10 === this.id ? 0 === this.zone ? this.animation = new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwFrontFemale4), 1) : (this.animation = new CompositeBitmapAnimation, this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable2_pants), 1)), this.animation.addAnimation(new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleFrontTable2_body),
                                        1)), this.animation.overlay = {
                                            deskImage: this.getSubImage(this.x - 1043 / VisualsManager.Divisor * k, this.y - 765 / VisualsManager.Divisor * k, a, a, ResourceKeys.rndDesk2)
                                        }) : this.animation = 0 === this.zone ? new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.hwBackFemale1), 1) : new BitmapAnimationX(new SpriteSheetX(AnimationSpriteSheets.rndMaleBoardFront1), 1);
        this.animation.gotoAndPlay("loop");
        this.animation.setAlpha(1);
        this.addChild(this.animation)
    };
    a.getSubImage = function (a, b, d, k, m) {
        var l = document.createElement("canvas");
        l.width = d;
        l.height = k;
        l.getContext("2d").drawImage(GameDev.ResourceManager.resources[m], -a / CanvasManager.globalScale, -b / CanvasManager.globalScale);
        a = new Image;
        a.src = l.toDataURL("image/png");
        return a
    };
    a.setPosition = function (a) {
        this.id = a;
        0 === this.zone ? this.setHwLabPosition() : this.setRndLabPosition()
    };
    a.setHwLabPosition = function () {
        var a = CanvasManager.globalScale;
        0 === this.id ? (this.x = 1860 * a, this.y = 920 * a) : 1 === this.id ? (this.x = 1720 * a, this.y = 940 * a) : 2 === this.id ? (this.x = 1400 * a, this.y = 820 * a) : 3 === this.id ? (this.x =
            770 * a, this.y = 850 * a) : 4 === this.id ? (this.x = 1300 * a, this.y = 980 * a) : 5 === this.id ? (this.x = 1240 * a, this.y = 530 * a) : 6 === this.id ? (this.x = 1100 * a, this.y = 640 * a) : 7 === this.id ? (this.x = 1100 * a, this.y = 1040 * a) : 8 === this.id ? (this.x = 800 * a, this.y = 670 * a) : 9 === this.id ? (this.x = 1100 * a, this.y = 850 * a) : 10 === this.id ? (this.x = 1788 * a, this.y = 850 * a) : (this.x = 2100 * a, this.y = 1102 * a);
        this.x /= VisualsManager.Divisor;
        this.y /= VisualsManager.Divisor
    };
    a.setRndLabPosition = function () {
        var a = CanvasManager.globalScale;
        0 === this.id ? (this.x = 820 * a, this.y = 420 *
            a) : 1 === this.id ? (this.x = 420 * a, this.y = 420 * a) : 2 === this.id ? (this.x = 1620 * a, this.y = 900 * a) : 3 === this.id ? (this.x = 1830 * a, this.y = 770 * a) : 4 === this.id ? (this.x = 1520 * a, this.y = 510 * a) : 5 === this.id ? (this.x = 1080 * a, this.y = 955 * a) : 11 === this.id ? (this.x = 1250 * a, this.y = 470 * a) : 6 === this.id ? (this.x = 960 * a, this.y = 560 * a) : 7 === this.id ? (this.x = 1370 * a, this.y = 790 * a) : 8 === this.id ? (this.x = 810 * a, this.y = 800 * a) : 9 === this.id ? (this.x = 1100 * a, this.y = 790 * a) : 10 === this.id && (this.x = 1258 * a, this.y = 700 * a);
        this.x /= VisualsManager.Divisor;
        this.y /= VisualsManager.Divisor
    };
    a.tick = function () {
        this.lastUpdate || (this.lastUpdate = GameManager.gameTime);
        var a = GameManager.gameTime - this.lastUpdate;
        if (!(0 >= a)) {
            var b = this.getAffordanceFactor();
            1 > b && (b *= 2);
            b *= a / 22E3;
            this.efficiency = (this.efficiency + b).clamp(0, 1);
            this.animation.speedFactor != this.efficiency && (this.animation.speedFactor = this.efficiency);
            0 < this.efficiency && 1 > this.alpha && (this.alpha += 0.02, 0.9 < this.alpha && (2 === this.zone ? 0 === this.id ? VisualsManager.levelOverlay.startRndPrinterRightScreen() : 1 === this.id ? VisualsManager.levelOverlay.startRndPrinterLeftScreen() :
                2 === this.id && VisualsManager.levelOverlay.startPrinter() : 0 === this.zone && (0 === this.id ? VisualsManager.levelOverlay.starthwLabTV() : 2 === this.id && VisualsManager.levelOverlay.startHwLabScreenWall())));
            0 === this.efficiency && 0 < this.alpha && (this.alpha -= 0.02, 0.9 > this.alpha && (2 === this.zone ? 0 === this.id ? VisualsManager.levelOverlay.stopRndPrinterRightScreen() : 1 === this.id ? VisualsManager.levelOverlay.stopRndPrinterLeftScreen() : 2 === this.id && VisualsManager.levelOverlay.stopPrinter() : 0 === this.zone && (0 === this.id ? VisualsManager.levelOverlay.stophwLabTV() :
                2 === this.id && VisualsManager.levelOverlay.stopHwLabScreenWall())));
            1 != this.efficiency ? (this.efficiencyBar.progress = this.efficiency, this.efficiencyBar.color = createjs.Graphics.getHSL(80 * this.efficiency, 100, 50), this.efficiencyBar.alpha = (this.efficiencyBar.alpha + 0.01).clamp(0, 0.8)) : 0 != this.efficiencyBar.alpha && (this.efficiencyBar.alpha = (this.efficiencyBar.alpha - 0.01).clamp(0, 1));
            this._doWork(a);
            this.lastUpdate = GameManager.gameTime
        }
    };
    a._doWork = function (a) {
        var b;
        b = a / 1E3 * 1 * this.efficiency;
        a = this.getCurrentProject();
        var d = GameManager.company.licencedPlatforms.filter(function (a) {
            return !0 === a.isCustom && 0 < a.maintenancePoints && 1E6 * a.unitsSold * Sales.consoleUnitPrice > a.currentSalesCash
        });
        a || 0 !== d.length && 2 !== this.zone || (b /= 7);
        this.state.progressF += b;
        b = Math.floor(this.state.progressF);
        0 < b && (this.state.progressF -= b);
        for (var k = 0; k < b; k++) {
            var m = a && 0 < a.remainingPoints;
            if (0 === this.zone && 0 < d.length)
                for (var l = d.length - 1; 0 <= l; l--)
                    if (0 < d[l].maintenancePoints) {
                        d[l].maintenancePoints--;
                        d[l].repairPoints++;
                        0 === d[l].maintenancePoints &&
                            d[l].unitsSold === Math.floor(d[l].currentSalesCash / Sales.consoleUnitPrice) ? UI.removeMaintenanceCard(d[l]) : (UI.updateRepairPoints(d[l]), UI.updateMaintenanceCard(d[l]));
                        this._spawnPoint("t");
                        return
                    } m && (a.remainingPoints--, m = a.startPoints - a.remainingPoints, a.progress = 0 == m ? 0 : m / a.startPoints, 0 >= a.remainingPoints && GameManager.finishProject(a));
            var g;
            2 == this.zone ? (g = a ? "d" : "r", "r" === g && (GameManager.company.researchPoints++, VisualsManager.pulsePointsDisplay(g), VisualsManager.updatePoints()), a && a.id === Research.AAAMarketingCampaign.id &&
                (GameManager.company.currentGame ? GameManager.company.currentGame.hypePoints += 100 / a.startPoints : GameManager.finishProject(a))) : 0 === this.zone && (g = "t", a && a.id === Research.AAACustomHardware.id && (GameManager.company.currentGame ? GameManager.company.currentGame.hypePoints += 50 / a.startPoints : GameManager.finishProject(a)));
            this._spawnPoint(g)
        }
    };
    var b = new MersenneTwister(0);
    a._spawnPoint = function (a) {
        var f = new createjs.Shape;
        f.alpha = 0;
        f.x = 20 * b.random() * b.randomSign();
        f.y = -20 * b.random();
        f.regX = 5;
        f.regY = 5;
        f.scaleX =
            0;
        f.scaleY = 0;
        var d = "t" === a || "e" === a ? TECHNOLOGY_POINTS_COLOR : "d" === a ? DESIGN_POINTS_COLOR : "b" === a ? BUGS_COLOR : RESEARCH_POINTS_COLOR;
        this.zone == GameManager.company.flags.currentZone && Sound.playSpawnSound(a);
        a = f.graphics;
        a.beginFill(d);
        a.beginStroke("black");
        a.setStrokeStyle(0.5);
        a.drawCircle(5, 5, 10);
        a.closePath();
        this.addChild(f);
        var k = this,
            d = [];
        d.push(createjs.Tween.get(f).to({
            y: -80 - 60 * b.random()
        }, 600, createjs.Ease.backIn));
        d.push(createjs.Tween.get(f).to({
            alpha: 1
        }, 150).wait(300).to({
            alpha: 0
        }, 150).call(function () {
            k.removeChild(f)
        }));
        d.push(createjs.Tween.get(f).to({
            scaleX: 1,
            scaleY: 1
        }, 300, createjs.Ease.backOut))
    }
})();
IsometricCompanyNameVisual = function () {
    createjs.Container.apply(this, arguments)
};
(function () {
    IsometricCompanyNameVisual.prototype = new createjs.Container;
    IsometricCompanyNameVisual.prototype.updateVisual = function (a) {
        this.removeAllChildren();
        var b = GameManager.company.name,
            c = VisualsManager.toScreenCoordinates(600, CanvasManager.globalScaleIgnoringLowResBackground),
            f = 54;
        do var d = "{0}pt {1}".format(f, "Calibri"),
            d = new createjs.Text(b, d, "black"),
            f = f - 2; while (d.getMeasuredWidth() > c && 10 < f);
        for (var c = f / 32, f = a ? 1 : 5, k = 0; k < f; k++) d = createjs.Graphics.getHSL(0, 0, 0 == k ? 70 : 60 / k), a && (d = createjs.Graphics.getHSL(0,
            0, 41)), d = new createjs.Text(b, "32pt {0}".format("Calibri"), d), d.textAlign = "center", d.textBaseline = "alphabetical", d.x += 1 * k, d.y -= 1 * k, this.addChildAt(d, 0);
        this.skewY = 30;
        this.scaleX = c * CanvasManager.globalScale;
        this.scaleY = c * CanvasManager.globalScale;
        this.alpha = a ? 0.8 : 1
    }
})();
var HypePointsVisual = function () {
    this.initialize();
    this.width = 150;
    this.height = 30;
    this.border = new createjs.Shape;
    this.addChild(this.border);
    this.text = new createjs.Text("Hype 400", "14pt {0}".format(UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans"), "white");
    this.text.textAlign = "center";
    this.text.textBaseline = "middle";
    this.text.x = this.width / 2;
    this.text.y = this.height / 2 - 2;
    this.text.maxWidth = this.width - 10;
    this.addChild(this.text);
    this._redraw()
};
(function () {
    var a = HypePointsVisual;
    a.prototype = new createjs.Container;
    a = a.prototype;
    a.updateText = function (a) {
        this.text.text = a
    };
    a._redraw = function () {
        var a = this.width,
            c = this.height,
            f = this.border.graphics;
        f.clear();
        var d = createjs.Graphics.getRGB(204, 0, 51, 0.7);
        f.beginFill(d);
        f.setStrokeStyle(2);
        f.beginStroke("black");
        f.drawRoundRect(0, 0, a, c, 2);
        f.closePath()
    }
})();
var CircularProgressVisual = function () {
    this.maxValue = this.angleArc = 360;
    this.minValue = 0;
    this.bgColor = "red";
    this.fgColor = "blue";
    this.radius = 20;
    this.lineWidth = 10;
    this.updateValue(0);
    this.startAngle = 1.5 * Math.PI;
    createjs.Shape.apply(this, arguments)
};
(function () {
    CircularProgressVisual.prototype = new createjs.Shape;
    var a = CircularProgressVisual.prototype;
    a.onTick = function () {
        this.invalid && (this._redraw(), this.invalid = !1)
    };
    a.invalidate = function () {
        this.invalid = !0
    };
    a.updateValue = function (a) {
        this.value = a;
        this.endAngle = 0 === a || 360 === a ? this.startAngle : (this.value - 90) / 180 * Math.PI
    };
    var b = 2 * Math.PI;
    a._redraw = function () {
        var a = this.graphics;
        a.clear();
        a.setStrokeStyle(this.lineWidth);
        this.bgColor && (a.beginStroke(this.bgColor), a.arc(this.radius, this.radius, this.radius,
            0, b));
        a.beginStroke(this.fgColor);
        a.arc(this.radius, this.radius, this.radius, this.startAngle, this.endAngle)
    }
})();