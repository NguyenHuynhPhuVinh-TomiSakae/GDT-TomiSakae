(function () {
    (function (a) {
        var b = (0.12).toLocaleString().charAt(1),
            c = "." === b ? "," : ".";
        "1,000.00" !== (1E3).toLocaleString() && (Number.prototype.toLocaleString = function () {
            var a = Math.abs(this),
                d = a.toFixed(2).slice(-2),
                a = a.toFixed(2).slice(0, -3).replace(/(?=(?!^)(?:\d{3})+(?!\d))/g, c) + b + d;
            return 0 > this ? "-" + a : a
        })
    })(Number.prototype.toLocaleString);
    String.prototype.format = function () {
        var a = arguments;
        return this.replace(/{(\d+)}/g, function (b, c) {
            return "undefined" != typeof a[c] ? a[c] : b
        })
    };
    String.prototype.log = function () {
        GameFlags.ghg6 &&
            console.log(this)
    };
    String.prototype.replaceAll = function (a, b) {
        return this.split(a).join(b)
    };
    "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function (a) {
        return this.slice(0, a.length) == a
    });
    Number.prototype.clamp = function (a, b) {
        return Math.min(Math.max(this, a), b)
    };
    Array.prototype.weakIndexOf = function (a) {
        for (var b = 0; b < this.length; b++)
            if (this[b] == a) return b;
        return -1
    };
    Array.prototype.pickRandom = function (a) {
        a = !a && GameManager.company ? GameManager.company.getRandom() : a ? a.random() :
            Math.random();
        return this[Math.min(this.length - 1, Math.floor(a * this.length))]
    };
    Array.prototype.shuffle = function (a) {
        if (1 >= this.length) return this.slice();
        for (var b = [], c = 0; c < this.length; c++) b.push(c);
        for (var f = [], c = 0; c < this.length; c++) {
            var d = b.pickRandom(a);
            b.remove(d);
            f.push(this[d])
        }
        return f
    };
    Array.prototype.insertAt = function (a, b) {
        this.splice(a, 0, b)
    };
    Array.prototype.getPrevious = function (a) {
        a -= 1;
        return 0 > a || a >= this.length ? null : this[a]
    };
    Array.prototype.first = function (a) {
        if (!a) return 0 < this.length ? this[0] :
            null;
        for (var b = 0; b < this.length; b++) {
            var c = this[b];
            if (a(c)) return c
        }
        return null
    };
    Array.prototype.last = function (a) {
        if (!a) return 0 < this.length ? this[this.length - 1] : null;
        for (var b = this.length - 1; 0 <= b; b--) {
            var c = this[b];
            if (a(c)) return c
        }
        return null
    };
    Array.prototype.count = function (a) {
        return a ? this.filter(a).length : this.length
    };
    Array.prototype.average = function (a) {
        return 0 >= this.length ? 0 : this.sum(a) / this.length
    };
    Array.prototype.max = function (a) {
        for (var b = NaN, c = 0; c < this.length; c++) {
            var f = a ? a(this[c]) : this[c];
            if (isNaN(b) || f > b) b = f
        }
        return b
    };
    Array.prototype.min = function (a) {
        for (var b = NaN, c = 0; c < this.length; c++) {
            var f = a ? a(this[c]) : this[c];
            if (isNaN(b) || f < b) b = f
        }
        return b
    };
    Array.prototype.sum = function (a) {
        for (var b = 0, c = 0; c < this.length; c++) var f = a ? a(this[c]) : this[c],
            b = b + f;
        return b
    };
    Array.prototype.except = function (a) {
        return this.filter(function (b) {
            return -1 === a.indexOf(b)
        })
    };
    Array.prototype.skip = function (a) {
        return this.length < a ? [] : this.slice(a, this.length)
    };
    Array.prototype.addRange = function (a) {
        this.addRangeAt(this.length,
            a)
    };
    Array.prototype.addRangeAt = function (a, b) {
        if (b && 0 != b.length) {
            void 0 === a && (a = this.length);
            for (var c = b.length - 1; 0 <= c; c--) this.splice(a, 0, b[c])
        }
    };
    Array.prototype.remove = function (a) {
        a = this.indexOf(a);
        if (0 > a) return this;
        this.splice(a, 1)
    };
    Array.prototype.groupBy = function (a) {
        if (!a) return this;
        for (var b = [], c = {}, f = 0; f < this.length; f++) {
            var d = this[f],
                k = a(d); - 1 === b.indexOf(k) && (b.push(k), c[b.indexOf(k)] = []);
            c[b.indexOf(k)].push(d)
        }
        a = [];
        for (f = 0; f < b.length; f++) a.addRange(c[f]);
        return a
    };
    Math.randomSign = function () {
        return GameManager.company ?
            0 === Math.floor(2 * GameManager.company.getRandom()) ? -1 : 1 : 0 === Math.floor(2 * Math.random()) ? -1 : 1
    };
    MersenneTwister.prototype.randomSign = function () {
        return 0 === Math.floor(2 * this.random()) ? -1 : 1
    };
    Math.roundToDecimals = function (a, b) {
        return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
    };
    String.prototype.replaceAt = function (a, b) {
        return this.substr(0, a) + b + this.substr(a + b.length)
    };
    jQuery.fn.extend({
        enableActiveClassOnClick: function () {
            return $(this).on("mousedown mouseup mouseleave", function (a) {
                $(this).toggleClass("active",
                    "mousedown" === a.type)
            })
        }
    });
    jQuery.fn.extend({
        disableDrag: function () {
            return $(this).on("dragstart", function (a) {
                a.preventDefault()
            })
        }
    });
    jQuery.fn.extend({
        clickExcl: function (a) {
            return $(this).enableActiveClassOnClick().unbind("click").click(a)
        }
    });
    jQuery.fn.extend({
        clickExclOnce: function (a) {
            return $(this).enableActiveClassOnClick().unbind("click").one("click", a)
        }
    });
    jQuery.fn.extend({
        contextMenuExclOnce: function (a) {
            return $(this).unbind("contextmenu").one("contextmenu", a)
        }
    });
    Date.prototype.toISOString ||
        (Date.prototype.toISOString = function () {
            function a(a) {
                return 10 > a ? "0" + a : a
            }
            return this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z"
        })
})();