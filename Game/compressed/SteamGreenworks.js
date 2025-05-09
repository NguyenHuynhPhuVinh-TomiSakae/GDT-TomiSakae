if (GameFlags.IS_STEAM && Steam && Steam.isAvailable()) {
    var Greenworks = {};
    (function () {
        function a(a, b) {
            b ? setTimeout(function () {
                $("#greenworksLoadingProgress").html(a)
            }, b) : $("#greenworksLoadingProgress").html(a)
        }

        function b(b, c) {
            a(b);
            console.log(b);
            !0 === c && q()
        }

        function c(a) {
            var c = [];
            if ("undefined" == typeof G) return c;
            for (var d = G.readdirSync(a), f = 0; f < d.length; f++) {
                var g = d[f];
                0 <= g.lastIndexOf("/") && g.substring(g.lastIndexOf("/") + 1);
                g = F ? F.resolve(a + "/" + g) : a + "/" + g;
                try {
                    G.statSync(g).isFile() || c.push(g)
                } catch (k) {
                    b(k,
                        !1)
                }
            }
            return c
        }

        function f(a, b) {
            if (b) {
                var c = F ? F.resolve(a + "/package.json") : a + "/package.json";
                return G.writeFileSync(c, JSON.stringify(b, null, 4))
            }
        }

        function d(a) {
            a = a.replaceAll("\\", "/");
            return a.substr(a.lastIndexOf("/") + 1)
        }

        function k(a) {
            a = d(a);
            return 0 <= a.lastIndexOf(".") ? a.substr(0, a.lastIndexOf(".")) : a
        }

        function m(a) {
            var b = F ? F.resolve(a) : a;
            return 0 <= b.lastIndexOf("/") ? a.substr(b.lastIndexOf("/") + 1) : a.substr(b.lastIndexOf("\\") + 1)
        }

        function l(a) {
            "file:///" != a.substring(0, 8) && (a = "file:///" + a);
            return a
        }

        function g(a) {
            w.onGoing = !0;
            if (G.existsSync(a)) {
                G.readdirSync(a).forEach(function (c, d) {
                    w.onGoing = !0;
                    var f = a + "/" + c;
                    G.lstatSync(f).isDirectory() ? g(f) : G.unlinkSync(f, function (a) {
                        a && b(a, !1)
                    })
                });
                var c = 0,
                    d = function (f) {
                        try {
                            w.onGoing = !0, G.rmdirSync(f)
                        } catch (g) {
                            w.onGoing = !0, G.rmdir(f, function (g) {
                                if (g) {
                                    if (("EBUSY" === g.code || "ENOTEMPTY" === g.code) && c < E) return c++, setTimeout(function () {
                                        d(a)
                                    }, 1E3);
                                    "EBUSY" === g.code || "ENOTEMPTY" === g.code ? console.log("Warning: Could not remove the folder " + f + ", because it is currently locked by GDT. Don't worry, this folder will be deleted on the next start. You can ignore this warning.") :
                                        b(g, !1)
                                }
                            })
                        }
                    };
                a !== H && d(a)
            }
        }

        function n(a) {
            G.existsSync(a) && G.unlink(a, function (a) {
                a && b(a, !1)
            })
        }

        function r(b, c) {
            if (c >= b.length) q();
            else {
                w.onGoing = !0;
                var f = b[c],
                    g = K + "/" + d(f.fileName);
                G.existsSync(g) || (N.push(f), r(c + 1));
                var l = k(g),
                    m = F ? F.join(H, l) : H + "/" + l;
                G.existsSync(m) || mkdirP.sync(m);
                a("Preparing " + b[c].title + " " + Math.round((c + 1) / b.length / 2 * 100 + 50) + "%");
                I.Utils.extractArchive(g, m, "", function () {
                    w.onGoing = !0;
                    p(g, L, m, b, c)
                }, function (a) {
                    w.onGoing = !0;
                    N.push(f);
                    r(b, c + 1)
                })
            }
        }

        function p(a, b, d, f, l) {
            w.onGoing = !0;
            var n = c(d),
                n = m(n[0]);
            d = F ? F.join(d, n) : d + "/" + n;
            var p = F ? F.join(b, n) : b + "/" + n;
            a = k(a);
            a = a.substr(0, a.indexOf("_"));
            p = n.substr(0, a.length + 1) != a + "_" ? F ? F.join(b, a + "_" + n) : b + "/" + a + "_" + n : F ? F.join(b, n) : b + "/" + n;
            (f[l].hasChanged || f[l].isNew) && g(p);
            null == I.Utils.move && (I.Utils.move = function (a, b, c, d) {
                G.rename(a, b, function (a) {
                    a ? d && d(a) : c && c()
                })
            });
            I.Utils.move(d, p);
            r(f, l + 1)
        }

        function s(a) {
            var b = [];
            a && (b = a.items ? a.items : a);
            if (a = b) {
                for (var f = c(L + "/"), l = [], p = "", s = 0; s < f.length; s++) {
                    p = m(f[s]);
                    if (0 < a.length)
                        for (var u = 0; u <
                            a.length; u++)
                            if (k(a[u].fileName).toLowerCase() == p.toLowerCase()) {
                                p = "";
                                break
                            } 0 < p.length && l.push(d(p))
                }
                a = l
            } else a = [];
            if (0 < a.length)
                for (l = l = "", f = 0; f < a.length; f++) {
                    w.onGoing = !0;
                    l = K + "/" + a[f] + ".zip";
                    n(l);
                    if (l = w.readPackageJsonAsObject(L + "/" + a[f])) ModSupport.disableMod({
                        id: l.id,
                        active: !0
                    }), DataStore.commit && DataStore.commit();
                    l = L + "/" + a[f];
                    l = F ? F.resolve(l) : l;
                    g(l)
                }
            0 < b.length ? r(b, 0) : q()
        }

        function u(a) {
            b(a, !0)
        }

        function t(b) {
            var c = "";
            b && (b.reason && (c += "(" + b.reason + ") "), c += b.value && "undefined" != b.value ? Math.round(b.value /
                2) + "%" : "0%");
            a(c);
            w.onGoing = !0
        }

        function q() {
            if (!w.skipped && !w.finished) {
                ModSupport.init();
                w.onGoing = !0;
                if (0 < N.length) {
                    for (var a = "The following workshop mods could not be found, extracted or loaded:".localize() + "<br><br>", b = 0; b < N.length; b++) a += N[b].title + "<br>" + N[b].fileName + "<br><br>";
                    CustomAlert.warn(a)
                }
                w.finished = !0;
                $("#greenworksLoading").remove();
                g(H)
            }
        }

        function v() {
            try {
                w.onGoing = !0, G.existsSync(K) || mkdirP.sync(K), G.existsSync(L) || mkdirP.sync(L), G.existsSync(H) || mkdirP.sync(H)
            } catch (a) {
                b(a, !1)
            }
        }

        function A(a, b, c, d) {
            var f = l(a),
                g = k(a),
                m = new Image;
            m.onload = function () {
                var a = document.createElement("canvas"),
                    f = a.getContext("2d");
                a.width = 120;
                a.height = 120;
                f.fillStyle = "#000000";
                f.globalAlpha = 0;
                f.fillRect(0, 0, 120, 120);
                f.globalAlpha = 1;
                var k = document.createElement("canvas"),
                    l = k.getContext("2d");
                k.width = this.width;
                k.height = this.height;
                var n = this.height / this.width * 120;
                l.drawImage(m, 0, 0);
                z(k, this.width, this.height, 120, n);
                f.drawImage(k, 0.5 * a.width - 0.5 * k.width, 0.5 * a.height - 0.5 * k.height);
                var a = a.toDataURL("image/png"),
                    a = a.replace("data:image/png;base64,", ""),
                    a = new Buffer(a, "base64"),
                    p = b + "/" + g + "-Thumbnail.png";
                G.writeFile(p, a, function (a) {
                    a ? d && d(a) : c && c(p)
                })
            };
            m.src = f
        }

        function z(a, b, c, d, f) {
            Date.now();
            for (var g = a.getContext("2d").getImageData(0, 0, b, c), k = a.getContext("2d").getImageData(0, 0, d, f), g = g.data, l = k.data, m = b / d, n = c / f, p = Math.ceil(m / 2), q = Math.ceil(n / 2), r = 0; r < f; r++)
                for (var s = 0; s < d; s++) {
                    for (var u = 4 * (s + r * d), t = 0, v = 0, w = 0, z = 0, A = 0, B = 0, C = 0, E = (r + 0.5) * n, D = Math.floor(r * n); D < (r + 1) * n; D++)
                        for (var F = (s + 0.5) * m, G = Math.abs(E - (D +
                            0.5)) / q, G = G * G, I = Math.floor(s * m); I < (s + 1) * m; I++) {
                            var H = Math.abs(F - (I + 0.5)) / p,
                                t = Math.sqrt(G + H * H); - 1 <= t && 1 >= t && (t = 2 * t * t * t - 3 * t * t + 1, 0 < t && (H = 4 * (I + D * b), C += t * g[H + 3], w += t, 255 > g[H + 3] && (t = t * g[H + 3] / 250), z += t * g[H], A += t * g[H + 1], B += t * g[H + 2], v += t))
                        }
                    l[u] = z / v;
                    l[u + 1] = A / v;
                    l[u + 2] = B / v;
                    l[u + 3] = C / w
                }
            a.getContext("2d").clearRect(0, 0, Math.max(b, d), Math.max(c, f));
            a.width = d;
            a.height = f;
            a.getContext("2d").putImageData(k, 0, 0)
        }

        function B(a, c, d) {
            a = $.extend({
                outputFile: "",
                folder: "",
                name: "",
                image: "",
                desc: ""
            }, a);
            I.Utils.createArchive(a.outputFile,
                a.folder, "", 9,
                function () {
                    I.ugcPublish(a.outputFile, a.name, a.desc, a.image, function (a) {
                        d && d(a)
                    }, function (a) {
                        c && c(a)
                    }, function (a) {
                        c && c("Please wait...".localize())
                    })
                },
                function (a) {
                    c && c(e);
                    b(a, !1)
                })
        }

        function D(a, c, d) {
            a = $.extend({
                name: "",
                desc: "",
                image: "",
                folder: "",
                publishedFileId: 0,
                outputFile: ""
            }, a);
            var f = function (b) {
                I.ugcPublishUpdate(a.publishedFileId, b, a.name, a.desc, a.image, function (a) {
                    d && d()
                }, function (a) {
                    c && c(a)
                }, function (a) {
                    c && c("Please wait...".localize())
                })
            };
            "" != a.folder.trim() ? I.Utils.createArchive(a.outputFile,
                a.folder, "", 9,
                function () {
                    f(a.outputFile)
                },
                function (a) {
                    c && c(a);
                    b(a, !1)
                }) : f("")
        }
        var E = 10,
            w = Greenworks,
            F = require("path"),
            C = F ? F.dirname(process.execPath) : "",
            J = "/Contents/Frameworks/node-webkit"; - 1 < C.lastIndexOf(J) ? C = C.substr(0, C.lastIndexOf(J)) + "/Contents/Resources/app.nw" : (J = "/Contents/Frameworks/nwjs Framework.framework", -1 < C.lastIndexOf(J) && (C = C.substr(0, C.lastIndexOf(J)) + "/Contents/Resources/app.nw"));
        var K = F ? F.resolve(C + "/ugc/") : "./ugc/",
            L = F ? F.resolve(C + "/mods_ws/") : "./mods_ws/",
            H = F ? F.resolve(C +
                "/temp/") : "./temp/",
            G = require("fs"),
            I = Steam.api,
            N = [];
        w.extractFilename = function (a, b) {
            return b ? k(a) : d(a)
        };
        w.showOverlay = function () {
            w.available && (0 < arguments.length ? I.ugcShowOverlay(arguments[0]) : I.ugcShowOverlay())
        };
        w.createArchiveAndPublish = function (a, c, g) {
            if (w.available) {
                a = $.extend({
                    name: "",
                    desc: "",
                    image: "",
                    folder: "",
                    createImage: !0,
                    updateJson: !0
                }, a);
                var k = I.getSteamId(),
                    l = m(a.folder),
                    n = "" + k.accountId,
                    l = k.isValid ? l.substr(0, n.length + 1) != n + "_" ? F.join(H, (k.isValid ? n + "_" : "") + m(a.folder) + ".zip") : F.join(H,
                        m(a.folder) + ".zip") : F.join(H, +m(a.folder) + ".zip"),
                    p = F ? F.resolve(l) : l,
                    q = F ? F.resolve(a.folder) : a.folder,
                    r = "undefined" !== typeof w.readPackageJsonAsObject(q) ? w.readPackageJsonAsObject(q) : void 0;
                a.updateJson = a.updateJson && "undefined" !== typeof r;
                !0 === a.updateJson && (r.name = a.name, r.description = a.desc);
                v();
                !0 === a.createImage && a.image && "" != a.image.trim() ? A(a.image, q, function (b) {
                    !0 === a.updateJson && (r.image = d(b), f(q, r));
                    B({
                        outputFile: p,
                        folder: q,
                        name: a.name,
                        desc: a.desc,
                        image: a.image
                    }, c, g)
                }, function (a) {
                    c && c(e);
                    b(a, !1)
                }) : (!0 === a.updateJson && f(q, r), B({
                    outputFile: p,
                    folder: q,
                    name: a.name,
                    desc: a.desc,
                    image: a.image
                }, c, g))
            }
        };
        w.createArchiveAndPublishUpdate = function (a, c, g) {
            if (w.available) {
                a = $.extend({
                    name: "",
                    desc: "",
                    image: "",
                    pid: "",
                    folder: "",
                    createImage: !0,
                    updateJson: !0
                }, a);
                var k = I.getSteamId(),
                    l = "" + k.accountId,
                    n = "",
                    p = "",
                    q = "";
                "" != a.folder.trim() && (n = m(a.folder), n = k.isValid ? n.substr(0, l.length + 1) != l + "_" ? F.join(H, (k.isValid ? l + "_" : "") + m(a.folder) + ".zip") : F.join(H, m(a.folder) + ".zip") : F.join(H, +m(a.folder) + ".zip"), p =
                    F ? F.resolve(n) : n, q = F ? F.resolve(a.folder) : a.folder);
                var r = "undefined" !== typeof w.readPackageJsonAsObject(q) ? w.readPackageJsonAsObject(q) : void 0;
                a.updateJson = a.updateJson && "undefined" !== typeof r;
                !0 === a.updateJson && (r.name = a.name, r.description = a.desc);
                v();
                !0 === a.createImage && "" != a.image.trim() && "" != a.folder.trim() ? A(a.image, q, function (b) {
                    !0 === a.updateJson && (r.image = d(b), f(q, r));
                    D({
                        name: a.name,
                        desc: a.desc,
                        image: a.image,
                        folder: q,
                        publishedFileId: a.pid,
                        outputFile: p
                    }, c, g)
                }, function (a) {
                    c && c(e);
                    b(a, !1)
                }) : (!0 ===
                    a.updateJson && f(q, r), D({
                        name: a.name,
                        desc: a.desc,
                        image: a.image,
                        folder: q,
                        publishedFileId: a.pid,
                        outputFile: p
                    }, c, g))
            }
        };
        w.getPublishedItems = function (a) {
            w.available && I.ugcGetUserItems(0, 0, 3, function (b) {
                a && a(b.items)
            }, function (a) { }, function (a) { })
        };
        w.onGoing = !1;
        w.finished = !1;
        w.skipped = !1;
        w.skipVisible = !1;
        w.skipSync = function () {
            q();
            w.skipped = !0
        };
        w.checkIfOngoing = function () {
            if (!w.finished) {
                if (w.onGoing) w.onGoing = !1;
                else if (!w.skipVisible) {
                    var a = $("#skipSyncButton");
                    a && (a.show().removeClass("hidden").addClass("show"),
                        w.skipVisible = !0)
                }
                setTimeout(w.checkIfOngoing, 2E3)
            }
        };
        w.synchronize = function () {
            try {
                setTimeout(w.checkIfOngoing, 2E3), N = [], g(H), v(), w.available ? I.ugcSynchronizeItems(K, s, u, t) : q()
            } catch (a) {
                b(a, !0)
            }
        };
        w.unsubscribe = function (a, b, c) {
            w.available && I.ugcUnsubscribe(a, function (a) {
                b(a)
            }, function (a) {
                c(a)
            })
        };
        w.readPackageJsonAsObject = function (a) {
            a = F ? F.resolve(a + "/package.json") : a + "/package.json";
            if (G.existsSync(a)) {
                var b = G.readFileSync(a, "utf8"),
                    b = b.replace(/^\uFEFF/, "");
                try {
                    return JSON.parse(b)
                } catch (c) {
                    b = G.readFileSync(a,
                        "utf16le"), b = b.replace(/^\uFEFF/, "")
                }
                try {
                    return JSON.parse(b)
                } catch (d) {
                    b = G.readFileSync(a, "ascii")
                }
                try {
                    return JSON.parse(b)
                } catch (f) {
                    console.log("Could not parse JSON at " + a + ". The system reported: " + f)
                }
            }
        };
        w.available = !1;
        F && G && mkdirP && I ? w.available = I.initAPI() : b("Greenworks requirements missing!".localize(), !0)
    })()
};