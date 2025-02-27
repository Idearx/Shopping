window.ec || (window.ec = {});
ol.pkg = function (j, h, g) {
    var b, d, u;
    if (arguments.length == 3) {
        b = j;
        d = h;
        u = g
    } else {
        b = window;
        d = j;
        u = h
    }
    if (!d || !d.length) {
        return null
    }
    var m = d.split(".");
    for (var l = b, k = 0; k < m.length - 1; k++) {
        l[m[k]] || (l[m[k]] = {});
        l = l[m[k]]
    }
    l = l[m[m.length - 1]] = u || l[m[m.length - 1]] || {};
    return l
};
ol.define = function (k, g, d) {
    var h = window, b, n;
    if (arguments.length == 3) {
        h = k;
        b = g;
        n = d
    } else {
        b = k;
        n = g
    }
    var y = b.split("."), l, a;
    for (var m = h, j = 0; j < y.length - 1; j++) {
        m[y[j]] || (m[y[j]] = {});
        m = m[y[j]]
    }
    a = y[y.length - 1];
    l = m[a];
    if (!l) {
        l = m[a] = function () {
            var q = arguments.callee, p = q._define, c;
            for (var o = arguments.length, f = o + 10; o < f; o++) {
                c = p[a + "_" + o];
                if (c) {
                    p[a + "_" + arguments.length] = p[a + "_" + o];
                    break
                }
            }
            if (!c) {
                c = p[a + "_0"]
            }
            if (!c) {
                if (logger && logger.error) {
                    logger.error(b, "function is undefined.")
                }
                return
            }
            c.apply(q, arguments)
        };
        l._define = {}
    }
    l._define[a + "_" + n.length] = n
};
ol.Cache = {
    _cache: {}, _size: 0, set: function (b, a) {
        if (!ol.Cache.contains(b)) {
            ol.Cache._size++
        }
        ol.Cache._cache[b] = a;
        return a
    }, get: function (b, c) {
        var d = ol.Cache;
        var a = d._cache[b];
        if (a) {
            return a
        }
        if (typeof c == "function") {
            a = c();
            d._cache[b] = a
        } else {
            if (c) {
                a = c;
                d._cache[b] = a
            } else {
                a = $(b);
                d._cache[b] = a
            }
        }
        d._size++;
        return a
    }, remove: function (a) {
        ol.Cache._size--;
        ol.Cache._cache[a] = null
    }, contains: function (a) {
        return ol.Cache._cache[a]
    }
};
ol.pkg("ol.ui");
(function () {
    var b = function () {
        var c = {};
        c.width = ol.ui.masker._bwidth;
        c.height = ol.ui.masker._bheight;
        ol.Cache.get("ec_mask").css(c)
    };
    var a = {css: {opacity: .2, background: "#000"}};
    ol.ui.masker = {
        isShown: false, mask: function (j) {
            var d = $;
            var c = ol.ui.masker;
            if (c.isShown) {
                return
            }
            j = d.extend(true, {}, a, j);
            var f = ol.Cache.get("ec_mask", function () {
                d(window).resize(function () {
                    if (ol.ui.masker.isShown) {
                        return
                    }
                    ol.Cache.get("ec_mask").css({width: c._bwidth(), height: c._bheight()})
                });
                return d("<div id='ec_mask' class='ec_mask'></div>").appendTo("body")
            });
            c.isShown = true;
            j.css.width = c._bwidth();
            j.css.height = c._bheight();
            j.css.visibility = "visible";
            f.css(j.css);
            d(window).bind("resize", b)
        }, unmask: function () {
            ol.ui.masker.isShown = false;
            ol.Cache.get("ec_mask").css({visibility: "hidden", width: 0, height: 0});
            $(window).unbind("resize", b)
        }, _bheight: function () {
            var c = $;
            if (c.browser.msie && c.browser.version < 7) {
                var g = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                var d = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (g < d) {
                    return c(window).height()
                } else {
                    return g
                }
            } else {
                return c(document).height()
            }
        }, _bwidth: function () {
            var c = $;
            if (c.browser.msie && c.browser.version < 7) {
                var d = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                var g = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (d < g) {
                    return c(window).width()
                } else {
                    return d
                }
            } else {
                return c(document).width()
            }
        }
    }
})();
(function () {
    var a = {event: "hover", menu: null};
    ol.ui.dropdown = function (b, d) {
        var c = this;
        c.hideTimer = null;
        c._objItem;
        c._menuItem;
        c._onMenu = false;
        c._events = {};
        c._isShow = false;
        c._hideMenu = function () {
            c.hideTimer = setTimeout(c.hide, 100)
        };
        c.init = function () {
            var f = $;
            d = f.extend({}, a, d);
            if (d.event == "hover") {
                d.event = "mouseover"
            } else {
                d.event = "click"
            }
            c._objItem = f(b);
            c._menuItem = d.menu ? f(d.menu) : c._objItem.next();
            c._objItem.unbind(d.event).bind(d.event, function (g) {
                clearTimeout(c.hideTimer);
                c.show()
            });
            c._menuItem.find(".dropdown_item").bind("click", function () {
                setTimeout(c.hide)
            })
        };
        c.bind = function (f, j, g) {
            c._menuItem.find(f).bind(j, g)
        };
        c.show = function () {
            switch (d.event) {
                case"mouseover":
                    c._objItem.unbind("mouseout").bind("mouseout", function (f) {
                        c._hideMenu();
                        c._objItem.addClass("hover")
                    });
                    c._menuItem.unbind("mouseover").bind("mouseover", function () {
                        clearTimeout(c.hideTimer);
                        c._menuItem.css("display", "block")
                    }).unbind("mouseout").bind("mouseout", function () {
                        c._hideMenu()
                    });
                    break;
                case"click":
                    if (c._isShow) {
                        c.hide();
                        return
                    } else {
                        c._events.menu_click = function () {
                            c._onMenu = true
                        };
                        c._events.document_click = function (f) {
                            if (f.button != 0) {
                                return true
                            }
                            if (c._onMenu === false) {
                                c.hide()
                            }
                            c._onMenu = false
                        };
                        setTimeout(function () {
                            c._menuItem.bind("click", c._events.menu_click);
                            $(document).bind("click", c._events.document_click)
                        }, 1)
                    }
                    break
            }
            c._objItem.addClass("hover");
            c._menuItem.css("display", "block");
            c._isShow = true
        };
        c.hide = function () {
            if (c._events.document_click) {
                $(document).unbind("click", c._events.document_click)
            }
            if (c._events.menu_click) {
                c._menuItem.unbind("click", c._events.menu_click)
            }
            c._objItem.removeClass("hover");
            c._menuItem.hide();
            c._isShow = false;
            c._onMenu = false
        };
        this.init()
    }
})();
ol.ui.scrollTo = function (p, g) {
    g = g || {offsetY: 45};
    if (typeof p != "object") {
        var d = p.toString().substr(0, 1);
        if (!(d == "#" || d == ".")) {
            p = "#" + p
        }
        p = $(p)
    }
    if (p.length == 0) {
        return
    }
    var b = p.offset().top;
    var a = document.documentElement && !/webkit/gi.test(navigator.userAgent) ? document.documentElement : document.body;
    var h = $(window).height();
    var f = a.scrollTop;
    if (!(f < b && b < f + h)) {
        a.scrollTop = b - g.offsetY
    }
};
(function () {
    var b = {white: {opacity: .55, background: "#fff"}, black: {opacity: .2, background: "#000"}};
    var a = {selector: "#ec_ui_loading", css: null, modal: true, maskConfig: null};
    ol.ui.loading = {
        options: null, show: function (d) {
            var g = ol.ui.loading;
            if (typeof d == "string") {
                d = {maskConfig: {css: b[d]}}
            }
            g.options = $.extend(true, {}, a, d);
            if (g.options.modal) {
                ol.ui.masker.mask(g.options.maskConfig)
            }
            var h = $(g.options.selector);
            if (h.length == 0) {
                h = $('<div id="ec_ui_loading" class="ec_ui_loading"></div>').appendTo("body")
            }
            if (g.options.css) h.css(g.options.css);
            h.show();
            h = null;
            g = null
        }, hide: function () {
            var c = ol.ui.loading.options;
            if (c) {
                if (c.modal) {
                    ol.ui.masker.unmask()
                }
                $(c.selector).hide()
            }
        }
    }
})();
(function () {
    var a = {row: "tr", colors: ["#fff", "#f7f7f7"], hover: "#e3f3bf", index: 1, remain: 0, alterNum: 1};
    ol.ui.alternation = function (b, c) {
        var d = $;

        function j(h, g) {
            var f = this;
            this.container = d(h);
            this.data = {};
            this.rows = null;
            this.init = function () {
                this.rows = this.container.find(g.row);
                var p;
                var l;
                for (var k = 0; k < this.rows.length; k++) {
                    p = this.rows[k];
                    p.setAttribute("alternation", k);
                    l = p.getAttribute("group");
                    this.data[k] = {group: l, backgroundColor: ""}
                }
            };
            this.bindColor = function () {
                if (!g.colors) {
                    return
                }
                var k = this.rows.length - g.remain;
                for (var m = g.index; m < k;) {
                    for (var l = 0; l < g.colors.length && m < k; l++) {
                        row = this.rows[m];
                        row.style.backgroundColor = g.colors[l];
                        this.data[m].backgroundColor = g.colors[l];
                        m = m + g.alterNum
                    }
                }
            };
            this.bindEvent = function () {
                this.rows.unbind("mouseover").bind("mouseover", function () {
                    var o = d(this);
                    var k = o.attr("alternation");
                    var p = f.data[k];
                    if (g.hover) {
                        o.css("backgroundColor", g.hover)
                    }
                    if (p.group) {
                        f.container.find(g.row + "[group=" + p.group + "]").addClass("hover")
                    }
                }).unbind("mouseout").bind("mouseout", function () {
                    var o = d(this);
                    var k = o.attr("alternation");
                    var p = f.data[k];
                    if (g.hover) {
                        o.css("backgroundColor", p.backgroundColor)
                    }
                    if (p.group) {
                        f.container.find(g.row + "[group=" + p.group + "]").removeClass("hover")
                    }
                })
            };
            this.init();
            this.bindColor();
            this.bindEvent()
        }

        c = d.extend({}, a, c);
        d(b).each(function () {
            new j(this, c)
        })
    }
})();
(function () {
    var a = function (u, k, h, g) {
        if (u.nodeType === 3) {
            var d = u.data.match(k);
            if (d) {
                var b = document.createElement(h || "span");
                b.className = g || "ec_ui_highlight highlight";
                var j = u.splitText(d.index);
                j.splitText(d[0].length);
                var f = j.cloneNode(true);
                b.appendChild(f);
                j.parentNode.replaceChild(b, j);
                return 1
            }
        } else {
            if (u.nodeType === 1 && u.childNodes && !/(script|style)/i.test(u.tagName) && !(u.tagName === h.toUpperCase() && u.className === g)) {
                for (var c = 0; c < u.childNodes.length; c++) {
                    c += a(u.childNodes[c], k, h, g)
                }
            }
        }
        return 0
    };
    ol.ui.highlight = function (u, g, t) {
        var b = {className: null, element: "span", caseSensitive: false, wordsOnly: false};
        $.extend(b, t);
        if (g.constructor === String) {
            g = [g]
        }
        g = $.grep(g, function (l, k) {
            return l != ""
        });
        if (g.length == 0) {
            return this
        }
        var h = g.join("|");
        h = h.replace(/([\\\$\{\}\(\)\[\]\+\?\-\>\<\^\!\.\*])/g, "\\$1");
        var f = b.caseSensitive ? "" : "i";
        var d = "(" + h + ")";
        if (b.wordsOnly) {
            d = "\\b" + d + "\\b"
        }
        var j = new RegExp(d, f);
        var c = u;
        if (typeof u == "string") {
            c = ol.Cache.get(u)
        }
        return c.each(function () {
            a(this, j, b.element, b.className)
        })
    }
})();
(function () {
    var b = {
        _ec_ui_alert: {
            _default: {
                title: "������ʾ",
                zIndex: 399,
                showCancel: false,
                modal: false,
                draggable: false,
                focus: ".box-ok:first",
                width: 300,
                clickOut: function (d) {
                    d.close()
                }
            }
        }, _ec_ui_info: {}, _ec_ui_warn: {}, _ec_ui_error: {}
    };

    function a(l, d, h) {
        var g = ol.Cache.get;
        var f = g(d.boxid, function () {
            return new ol.box(null, d)
        });
        f.open(l);
        if (h.timeout) {
            if (b[d.boxid].timer) {
                clearTimeout(b[d.boxid].timer)
            }
            b[d.boxid].timer = setTimeout(function () {
                if (ol.isIE6) {
                    f.close()
                } else {
                    f.fadeOut(800)
                }
            }, h.timeout);
            g("#" + d.boxid).unbind("mouseover").bind("mouseover", function () {
                clearTimeout(b[d.boxid].timer)
            }).unbind("mouseout").bind("mouseout", function () {
                b[d.boxid].timer = setTimeout(function () {
                    if (ol.isIE6) {
                        f.close()
                    } else {
                        f.fadeOut(800)
                    }
                }, h.timeout / 2)
            })
        }
    }

    var c = {
        title: "",
        zIndex: 399,
        showButton: false,
        modal: false,
        draggable: false,
        focus: ".box-close",
        width: 300
    };
    ol.ui.warn = function (d, f) {
        f = $.extend({}, c, f);
        f.boxid = "_ec_ui_warn";
        f.boxclass = "ec_ui_warn";
        var g = {timeout: f.timeout};
        delete f.timeout;
        a(d, f, g)
    };
    ol.ui.info = function (d, f) {
        f = $.extend({}, c, f);
        f.boxid = "_ec_ui_info";
        f.boxclass = "ec_ui_info";
        var g = {timeout: f.timeout};
        delete f.timeout;
        a(d, f, g)
    };
    ol.ui.error = function (d, f) {
        f = $.extend({}, c, f);
        f.boxid = "_ec_ui_error";
        f.boxclass = "ec_ui_error";
        var g = {timeout: f.timeout};
        delete f.timeout;
        a(d, f, g)
    };
    ol.ui.alert = function (d, f) {
        f = $.extend({}, b._ec_ui_alert._default, f);
        f.boxid = "_ec_ui_alert";
        f.boxclass = "ec_ui_alert";
        var g = ol.Cache.get(f.boxid, function () {
            return new ol.box(null, f)
        });
        g.setTitle(f.title);
        g.open(d)
    }
})();
(function () {
    var a = {style: "style1", offsetX: 0, offsetY: 0},
        b = '<div class="ec_ui_ballon"><div id="ballon_header"></div><div id="ballon_body"></div><div id="ballon_footer"></div></div>';
    ol.ui.ballon = function (h, d, g) {
        g = $.extend({}, a, g);
        var c = $(h);
        var f = $(b);
        var n;
        f.find("#ballon_body").html(d || "");
        c.mouseover(function () {
            n = setTimeout(function () {
                var m = g.offsetX || 0;
                var l = g.offsetY || 0;
                var k = c.offset().top + c.height();
                var j = c.offset().left;
                j = Math.max(j + m, 0);
                k = Math.max(k + l, 0);
                f.css({display: "block", top: k, left: j}).addClass(g.style);
                f.appendTo("body")
            }, 250)
        }).mouseout(function () {
            clearTimeout(n);
            f.remove()
        });
        return ol.ui
    }
})();
(function () {
    var a = {css: null, captureInput: false};
    ol.ui.hover = function (c, b) {
        var d = $;
        b = d.extend(true, {}, a, b);
        d(c).each(function () {
            var j = null;
            var p = false;
            var h = false;
            var g = d(this);
            var f = function () {
                if (p || h) {
                    return
                }
                if (b.css) {
                    j = g.attr("style");
                    g.css(b.css)
                } else {
                    g.addClass("hover")
                }
            };
            var o = function () {
                if (p || h) {
                    return
                }
                if (b.css) {
                    g.attr("style", j)
                } else {
                    g.removeClass("hover")
                }
            };
            g.mouseover(function () {
                f();
                h = true
            }).mouseout(function () {
                h = false;
                o()
            });
            if (this.tagName == "INPUT" || this.tagName == "TEXTAREA") {
                g.focus(function () {
                    f();
                    p = true
                }).blur(function () {
                    p = false;
                    o()
                })
            } else {
                if (b.captureInput) {
                    g.find("input[type=text],textarea").bind("focus", function () {
                        f();
                        p = true
                    }).bind("blur", function () {
                        p = false;
                        o()
                    })
                }
            }
        });
        return ol.ui
    }
})();
ol.pkg("ol.lang");
Array.prototype.clone = function () {
    return this.slice(0)
};
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
        value: function (d, c) {
            c = c || 0;
            return this.substring(!c || c < 0 ? 0 : +c, c + d.length) === d
        }
    })
}
if (!String.prototype.transHtmlAttribute) {
    String.prototype.transHtmlAttribute = function () {
        var a = this;
        var d = document.createElement("textarea");
        d.innerHTML = a;
        a = d.value;
        return a
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }
}
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length
};
String.prototype.replaceAll = function (b, a) {
    return this.replace(new RegExp(b, "gm"), a)
};
String.prototype.parseDate = function (n) {
    var b = {
        "\\.": {v: "\\."},
        "\\?": {v: "\\?"},
        "M+": {v: "(0[1-9]|1[0-2]|[1-9])", k: "MM"},
        "d+": {v: "(3[01]|[12][0-9]|0[1-9]|[1-9])", k: "dd"},
        "y+": {v: "(\\d{4})", k: "yyyy"},
        "H+": {v: "(2[0-3]|[01][0-9]|[0-9])", k: "HH"},
        "m+": {v: "([0-5][0-9]|[0-9])", k: "mm"},
        "s+": {v: "([0-5][0-9]|[0-9])", k: "ss"},
        S: {v: "(\\d+)", k: "S"}
    };
    var l = [];
    var c = n;
    var f;
    var h;
    for (var g in b) {
        if ((f = n.search(new RegExp("(" + g + ")"))) != -1) {
            h = b[g];
            c = c.replace(RegExp.$1, h.v);
            if (h.k) {
                l.push({n: h.k, order: f})
            }
        }
    }
    l.sort(function (k, d) {
        return k.order - d.order
    });
    h = {};
    for (var m = 0; m < l.length; m++) {
        h[l[m].n] = m + 1
    }
    var a = document.createElement("textarea");
    a.innerHTML = this;
    var j = a.value;
    var C = j.match(new RegExp(c));
    if (!C) {
        throw"Invalid String for parse to Date!"
    }
    var y = new Date;
    if (h.yyyy) {
        y.setFullYear(C[h.yyyy])
    }
    if (h.dd) {
        var B = C[h.dd];
        y.setDate(B);
        y.setDate(B)
    } else {
        y.setDate(1);
        y.setDate(1)
    }
    if (h.MM) {
        y.setMonth(C[h.MM] - 1)
    }
    if (h.HH) {
        y.setHours(C[h.HH])
    } else {
        y.setHours(0)
    }
    if (h.mm) {
        y.setMinutes(C[h.mm])
    } else {
        y.setMinutes(0)
    }
    if (h.ss) {
        y.setSeconds(C[h.ss])
    } else {
        y.setSeconds(0)
    }
    if (h.S) {
        y.setMilliseconds(C[h.S])
    } else {
        y.setMilliseconds(0)
    }
    return y
};
Date.prototype.format = function (c) {
    var b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    var a = {0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六"};
    if (/(y+)/.test(c)) {
        c = c.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(c)) {
        c = c.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + a[this.getDay() + ""])
    }
    for (var d in b) {
        if (new RegExp("(" + d + ")").test(c)) {
            c = c.replace(RegExp.$1, RegExp.$1.length == 1 ? b[d] : ("00" + b[d]).substr(("" + b[d]).length))
        }
    }
    return c
};
if (!0 && window.JSON && window.JSON.parse && window.JSON.stringify) {
    ol.lang.json = function () {
        var a = /___$/;
        return {
            parse: function (c) {
                try {
                    return window.JSON.parse(c)
                } catch (b) {
                    return false
                }
            }, stringify: function (c) {
                try {
                    return window.JSON.stringify(c, function (d, g) {
                        return !a.test(d) ? g : null
                    })
                } catch (b) {
                    return null
                }
            }
        }
    }()
} else {
    ol.lang.json = function () {
        function f(n) {
            return n < 10 ? "0" + n : n
        }

        Date.prototype.toJSON = function () {
            return [this.getUTCFullYear(), "-", f(this.getUTCMonth() + 1), "-", f(this.getUTCDate()), "T", f(this.getUTCHours()), ":", f(this.getUTCMinutes()), ":", f(this.getUTCSeconds()), "Z"].join("")
        };
        var m = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

        function stringify(value) {
            var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g, v;
            switch (typeof value) {
                case"string":
                    return r.test(value) ? '"' + value.replace(r, function (a) {
                        var c = m[a];
                        if (c) {
                            return c
                        }
                        c = a.charCodeAt();
                        return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                    }) + '"' : '"' + value + '"';
                case"number":
                    return isFinite(value) ? String(value) : "null";
                case"boolean":
                case"null":
                    return String(value);
                case"object":
                    if (!value) {
                        return "null"
                    }
                    a = [];
                    if (typeof value.length === "number" && !value.propertyIsEnumerable("length")) {
                        l = value.length;
                        for (i = 0; i < l; i += 1) {
                            a.push(stringify(value[i]) || "null")
                        }
                        return "[" + a.join(",") + "]"
                    }
                    for (k in value) {
                        if (k.match("___$")) {
                            continue
                        }
                        if (value.hasOwnProperty(k)) {
                            if (typeof k === "string") {
                                v = stringify(value[k]);
                                if (v) {
                                    a.push(stringify(k) + ":" + v)
                                }
                            }
                        }
                    }
                    return "{" + a.join(",") + "}"
            }
        }

        return {
            stringify: stringify, parse: function (text) {
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    return eval("(" + text + ")")
                }
                return false
            }
        }
    }()
}
ol.pkg("ol.util");
ol.util.trim = function (a) {
    if (a == null) {
        return ""
    }
    if (typeof a != "string") {
        return a
    }
    return a.trim()
};
ol.util.left = function (c, a, b) {
    if (c.len() < a) {
        return c
    }
    var l = 0;
    for (var d = 0; d < c.length; d++) {
        if (c.charCodeAt(d) > 128) {
            l = l + 2
        } else {
            l = l + 1
        }
        if (l > a) {
            return c.substring(0, d) + (b ? b : "")
        }
    }
    return c
};
ol.util.isEmpty = function (a) {
    if (ol.util.trim(a) == "") {
        return true
    }
    return false
};
ol.util.isDate = function (a) {
    if (a == null || a == "") {
        return false
    }
    re = /\d{4}-{1}\d{2}-{1}\d{2}$/;
    return a.match(re)
};
ol.util.isNumeric = function (a) {
    strRef = "1234567890";
    if (a == "") {
        return false
    }
    for (i = 0; i < a.length; i++) {
        tempChar = a.substring(i, i + 1);
        if (strRef.indexOf(tempChar, 0) == -1) {
            return false
        }
    }
    return true
};
ol.util.isFloat = function (b) {
    var a = /^[0-9]+.?[0-9]*$/;
    return a.test(s)
};
ol.util.isEmail = function (c, d) {
    if (!c) {
        return false
    }
    var a = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;
    var b = new RegExp(a);
    var f;
    if (d) {
        f = c.split(d)
    } else {
        f = [c]
    }
    for (var n = 0; n < f.length; n++) {
        if (f[n].match(b) == null) {
            return false
        }
    }
    return true
};
ol.util.unescapeHtml = function (a) {
    if (typeof a !== "string") {
        return a
    }
    if (ol.util.isEmpty(a)) {
        return ""
    }
    var d = document.createElement("textarea");
    d.innerHTML = a;
    a = d.value;
    return a
};
ol.util.parseDate = function (j) {
    if ("string" === typeof j) {
        j = j.trim();
        var g = document.createElement("textarea");
        g.innerHTML = j;
        j = g.value
    }
    var h = new Date(j);
    var a = null;
    if (isNaN(h.valueOf()) && "string" === typeof j) {
        if (/^\d{1,13}$/.test(j)) {
            h = new Date(parseInt(j))
        } else {
            if (a = /^(\d{4})-(\d{1,2})-(\d{1,2})[ T]{1}(\d{1,2}):(\d{1,2}):(\d{1,2})(\+\d{4})?$/.exec(j)) {
                h = new Date(parseInt(a[1]), parseInt(a[2]) - 1, parseInt(a[3]), parseInt(a[4]), parseInt(a[5]), parseInt(a[6]))
            }
        }
    }
    if (isNaN(h.valueOf())) {
    }
    return h
};
ol.util.isFunction = function (a) {
    if (!a) {
        return false
    }
    return Object.prototype.toString.call(a) === "[object Function]"
};
ol.util.isArray = function (a) {
    if (!a) {
        return false
    }
    return Object.prototype.toString.call(a) === "[object Array]"
};
ol.util.isObject = function (a) {
    if (!a) {
        return false
    }
    return Object.prototype.toString.call(a) === "[object Object]"
};
ol.util.cookie = {
    get: function (f) {
        var d = null;
        if (document.cookie && document.cookie != "") {
            var a = document.cookie.split(";");
            for (var b = 0; b < a.length; b++) {
                var c = (a[b] || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
                if (c.substring(0, f.length + 1) == f + "=") {
                    var n = function (g) {
                        g = g.replace(/\+/g, " ");
                        var j = '()<>@,;:\\"/[]?={}';
                        for (var h = 0; h < j.length; h++) {
                            if (g.indexOf(j.charAt(h)) != -1) {
                                if (g.startsWith('"')) {
                                    g = g.substring(1)
                                }
                                if (g.endsWith('"')) {
                                    g = g.substring(0, g.length - 1)
                                }
                                break
                            }
                        }
                        return decodeURIComponent(g)
                    };
                    d = n(c.substring(f.length + 1));
                    break
                }
            }
        }
        return d
    }, set: function (r, h, g) {
        g = g || {};
        if (h === null) {
            h = "";
            g.expires = -1
        }
        var d = "";
        if (g.expires && (typeof g.expires == "number" || g.expires.toUTCString)) {
            var f;
            if (typeof g.expires == "number") {
                f = new Date;
                f.setTime(f.getTime() + g.expires * 24 * 60 * 60 * 1e3)
            } else {
                f = g.expires
            }
            d = "; expires=" + f.toUTCString()
        }
        var c = "; path=" + (g.path || "/");
        var a = g.domain ? "; domain=" + g.domain : "";
        var b = g.secure ? "; secure" : "";
        document.cookie = [r, "=", encodeURIComponent(h), d, c, a, b].join("")
    }, remove: function (a) {
        this.set(a, null)
    }
};
ol.pkg("ol.form.input");
(function () {
    var a = 0;
    ol.form.input.label = function (b, j, c) {
        if (!j) {
            throw"Please set label text!";
            return ol.form.input
        }
        var d = $;
        c = d.extend({}, ol.form.input.label.defaults, c);
        d(b).each(function () {
            var k = d(this), o = k.attr("id"), m = Number(k.css("z-index")) || 1,
                f = parseInt(k.css("margin-top"), 10) + parseInt(k.css("border-top-width"), 10),
                h = parseInt(k.css("margin-left"), 10) + parseInt(k.css("border-left-width"), 10),
                n = d('<label style="display:none;position:absolute;cursor:text;float:left;z-index:' + (m + 1) + '">' + j + "</label>").attr("class", k.attr("class")),
                l = d('<input style="border:none;background:transparent;cursor:text;margin:0;" value="' + j + '" tabindex=-1 readonly>');
            if ("TEXTAREA" == k.prop("tagName")) {
                l.css("height", "auto")
            }
            if (!o && c.autoId) {
                o = "input_label_" + a++;
                k.attr("id", o)
            }
            var p = {color: c.color};
            n.attr("for", o).css(p);
            k.css("z-index", m).before(n);
            var g = k.parents("form");
            if (g.length > 0) {
                g.bind("reset", function () {
                    setTimeout(function () {
                        A()
                    }, 150)
                })
            }
            var A = function () {
                if (k.attr("value").length == 0) {
                    n.css("display", "block")
                }
            }, q = function () {
                n.css("display", "none")
            };
            k.bind("blur", A).bind("focus", q);
            if (document.activeElement != k[0]) {
                A()
            }
        });
        return ol.form.input
    }
})();
ol.form.input.label.defaults = {color: "#999", autoId: true};
(function () {
    var b = {max: Number.MAX_VALUE, exceedCallback: null}, a = function (d) {
        var j = d.length, c = d.replace(/[^\x00-\xff]/g, "").length,
            f = (c % 2 == 0 ? c / 2 : parseInt(c / 2) + 1) + (j - c);
        return f
    };
    ol.form.input.wordCount = function (d, g) {
        var c = $;
        opt = c.extend({}, b, g);
        c(d).each(function (j) {
            if (typeof opt.callback == "function") {
                var f = a(this.value);
                opt.callback.call(this, f);
                if (f > opt.max && opt.exceedCallback) {
                    opt.exceedCallback.call(this, f)
                }
            }
            c(this).bind("keyup", function () {
                var h = a(this.value);
                if (typeof opt.callback == "function") {
                    opt.callback.call(this, h)
                }
                if (h > opt.max && opt.exceedCallback) {
                    opt.exceedCallback.call(this, h)
                }
            })
        })
    }
})();
ol.pkg("ol.form.validator");
(function () {
    var d = function (m, l) {
        if (logger && logger.warn) {
            logger.warn(m, l)
        }
    }, k = function (m, l) {
        if (logger && logger.error) {
            logger.error(m, l)
        }
    }, g = {
        trim: true,
        validOnChange: false,
        allowEmpty: true,
        async: true,
        errorClass: null,
        successFunction: null,
        errorFunction: null
    };
    var x = {};
    var h = {};
    var j = function (q, t, m, n, r, l) {
        $.extend(l, m);
        if (n) {
            r = h[n];
            if (!r) {
                d(n + " rule is undefined!");
                return true
            }
        }
        var o;
        if (n) {
            l.type = n
        }
        if (r.length == 3) {
            o = r(q, t, l)
        } else {
            o = r(q, l)
        }
        if (!o) {
            if (l.errorFunction) {
                var p = function () {
                    if (m.errorClass && t) {
                        t.addClass(m.errorClass)
                    }
                    l.errorFunction(t || q, l)
                };
                if (m.async) {
                    setTimeout(p, 1)
                } else {
                    p()
                }
            }
            return false
        }
        return true
    };
    var a = function (q, r, n, l) {
        if (!n.type) {
            if (!j(q, r, n, null, n.rule, l)) {
                return false
            }
        } else {
            var o = n.type;
            if (typeof n.type == "string") {
                o = [n.type]
            }
            var p = {};
            for (var m = 0; m < o.length; m++) {
                if (!p[o[m]]) {
                    if (!j(q, r, n, o[m], null, l)) {
                        return false
                    }
                    p[o[m]] = 1
                }
            }
        }
        return true
    };
    var b = function (n) {
        var q = n.attr("validator");
        if (!q) {
            return true
        }
        var m = x[q];
        var w;
        switch (n.prop("tagName")) {
            case"SELECT":
                w = n.val();
                break;
            default:
                w = n[0].value
        }
        var t = {};
        var u = [];
        for (var o = 0; o < m.length; o++) {
            var r = {};
            if (m[o].trim) {
                w = $.trim(w)
            }
            if (!a(w, n, m[o], r)) {
                return false
            }
            u.push(r)
        }
        for (var o = 0; o < m.length; o++) {
            var v = m[o];
            if (v.successFunction) {
                var l = u[o];
                var p = function () {
                    if (v.errorClass && n) {
                        n.removeClass(v.errorClass)
                    }
                    v.successFunction(n || w, l)
                };
                if (v.async) {
                    setTimeout(p, 1)
                } else {
                    p()
                }
            }
        }
        return true
    };
    ol.form.validator = function (p, n) {
        if (typeof n == "object") {
            var q = {};
            if (a(p, null, n, q) && n.successFunction) {
                if (n.async) {
                    setTimeout(function () {
                        n.successFunction(p, q)
                    }, 1)
                } else {
                    n.successFunction(p, q)
                }
            }
            return
        }
        var m = p, o = n;
        var u = $(m);
        var v = u.prop("tagName");
        o = typeof o == "boolean" ? o : true;
        switch (v) {
            case"SELECT":
            case"INPUT":
            case"TEXTAREA":
                return b(u)
        }
        var t = u.find("select[validator],input[validator],textarea[validator]");
        var r = true;
        for (var l = 0; l < t.length; l++) {
            if (!b($(t[l]))) {
                if (o) {
                    return false
                } else {
                    r = false
                }
            }
        }
        return r
    };
    ol.form.validator.register = function (m, l) {
        h[m] = l
    };
    ol.form.validator.get = function (l) {
        return h[l]
    };
    var c = 0;
    ol.form.validator.bind = function (m, o) {
        var n = [];
        var r = $(m);
        o = $.extend({}, g, o);
        if (o.validOnChange) {
            r.on("change", function (t) {
                ol.form.filter(this);
                ol.form.validator(this, true)
            })
        }
        for (var p = 0; p < r.length; p++) {
            var q = $(r[p]);
            var l = q.attr("validator");
            if (!l) {
                l = "validator" + ++c + (new Date).getTime();
                q.attr("validator", l)
            }
            if (!x[l]) {
                x[l] = []
            }
            x[l].push(o);
            n.push(l)
        }
        return n
    };
    ol.form.filter = function (n) {
        if ($(n).attr("name") == "consignee" || $(n).attr("id") == "vatInvoice-consignee" || $(n).attr("id") == "contactBy") {
            var q = /[^a-zA-Z\u4E00-\u9FA5\uFF21-\uFF3A\uFF41-\uFF5A]/g;
            var l = $("#" + $(n).attr("name") + "-msg");
            if (q.test($(n).val())) {
                $(n).val(function () {
                    return $(n).val().replace(q, "")
                });
                if (l.length) {
                    l.addClass("report-errors filter  label-error").text("为了更好的送达，已帮你过滤不能识别的字符")
                } else {
                    $(n).next().addClass("report-errors   filter").text("为了更好的送达，已帮你过滤不能识别的字符")
                }
            } else {
                if (l.length) {
                    l.removeClass("filter report-errors icon-error label-error").innerText = ""
                } else {
                    $(n).next().removeClass("report-errors icon-error  filter");
                    if ($(n).next()[0]) {
                        $(n).next()[0].innerText = ""
                    }
                }
            }
        }
        if ($(n).attr("name") == "customerName" || $(n).attr("name") == "customerNameNoEncrypt") {
            var q = /[^a-zA-Z\u4E00-\u9FA5\uFF21-\uFF3A\uFF41-\uFF5A]/g;
            var l = $("#" + $(n).attr("name") + "-msg");
            if (q.test($(n).val())) {
                $(n).val(function () {
                    return $(n).val().replace(q, "")
                });
                if ($(n).val() != "") {
                    $(n).nextAll("span").remove();
                    $(n).parent().append("<span class='vam icon-warn'>为了更好的送达,已帮你过滤不能识别的字符</span>")
                } else {
                    $(n).nextAll("span").remove()
                }
            } else {
                $(n).nextAll("span").remove()
            }
        }
        if ($(n).attr("name") == "problemDescription" || $(n).attr("name") == "address" || $(n).attr("id") == "vatInvoice-address" || $(n).attr("id") == "contactAddress") {
            var l = $("#" + $(n).attr("name") + "-msg");
            addressFrontRegex = addressFrontRegex.replaceAll("&amp;", "&");
            addressFrontRegex = addressFrontRegex.replaceAll("&#034;", '"');
            addressFrontRegex = addressFrontRegex.replaceAll("&lt;", "<");
            addressFrontRegex = addressFrontRegex.replaceAll("&gt;", ">");
            addressFrontRegex = addressFrontRegex.replaceAll("&#039;", "'");
            var o = new RegExp(addressFrontRegex);
            var m = false;
            $.each($(n).val().split(""), function (t, r) {
                if (!o.test(r)) {
                    m = true
                }
            });
            var p = $(n).val().split("").filter(function (r) {
                return o.test(r)
            }).join("");
            if (m) {
                $(n).valS(p);
                if ($(n).val() != "") {
                    if (l.length) {
                        l.addClass("report-errors filter label-error").text("为了更好的送达，已帮你过滤不能识别的字符")
                    } else {
                        if ($(n).attr("name") == "problemDescription") {
                            $("#content-msg").addClass("report-errors filter").text("为了客服更好的理解您的诉求，已帮您过滤不能识别的字符")
                        } else {
                            $(n).next().addClass("report-errors  filter").text("为了更好的送达，已帮你过滤不能识别的字符")
                        }
                    }
                } else {
                    if ($(n).attr("name") == "problemDescription") {
                        $("#content-msg").text("");
                        $("#content-msg").removeClass("filter")
                    } else {
                        l.removeClass("filter")
                    }
                }
            } else {
                if (l.length) {
                    l.removeClass("filter report-errors icon-error label-error").text("")
                } else {
                    if ($(n).attr("name") == "problemDescription") {
                        $("#content-msg").removeClass("report-errors icon-error  filter").innerText = ""
                    } else {
                        $(n).next().removeClass("report-errors icon-error  filter");
                        if ($(n).next()[0]) {
                            $(n).next()[0].innerText = ""
                        }
                    }
                }
            }
        }
    };
    ol.form.getStrLeng = function (o) {
        var p = 0;
        var l = o.length;
        var m = -1;
        for (var n = 0; n < l; n++) {
            m = o.charCodeAt(n);
            if (m >= 0 && m <= 128) {
                p += 1
            } else {
                p += 2
            }
        }
        return p
    };
    ol.form.validator.defaults = g;
    var f = ol.form.validator, y = function (m, l) {
        return !m
    };
    f.register("regex", function (m, l) {
        if (l.allowEmpty && y(m)) {
            return true
        }
        if (!l.regex) {
            k("regex", "need parameter of 'regex'!");
            return false
        }
        return l.regex.test(m)
    });
    f.register("require", function (m, l) {
        l.allowEmpty = false;
        return !y(m)
    });
    f.register("email", function (m, l) {
        if (l.allowEmpty && y(m)) {
            return true
        }
        var n = null;
        if (l.separater) {
            n = l.separater
        }
        return ol.util.isEmail(m, n)
    });
    f.register("eq", function (o, l) {
        if (!l.compareTo) {
            k("eq", "need parameter of 'compareTo'!");
            return false
        }
        var m = $(l.compareTo).val();
        if (!l.format) {
            return o == m
        }
        var n = f.get("date");
        if (!(n(o, l) && n(m, l))) {
            return false
        }
        return o.parseDate(l.format).getTime() == m.parseDate(l.format).getTime()
    });
    f.register("lt", function (p, m) {
        if (m.allowEmpty && y(p)) {
            return true
        }
        if (!m.compareTo) {
            k("lt", "need parameter of 'compareTo'!");
            return false
        }
        var n = $(m.compareTo).val();
        if (!m.format) {
            m.negative = true;
            var l = f.get("float");
            if (!l(p, m)) {
                return false
            }
            if (!l(n, m)) {
                return false
            }
            p = parseFloat(p);
            n = parseFloat(n);
            return p < n
        }
        var o = f.get("date");
        if (!(o(p, m) && o(n, m))) {
            return false
        }
        return p.parseDate(m.format) < n.parseDate(m.format)
    });
    f.register("le", function (o, n) {
        var m = f.get("eq");
        var l = f.get("lt");
        return m(o, n) || l(o, n)
    });
    f.register("gt", function (p, m) {
        if (m.allowEmpty && y(p)) {
            return true
        }
        if (!m.compareTo) {
            k("gt", "need parameter of 'compareTo'!");
            return false
        }
        var n = $(m.compareTo).val();
        if (!m.format) {
            m.negative = true;
            var l = f.get("float");
            if (!l(p, m)) {
                return false
            }
            if (!l(n, m)) {
                return false
            }
            p = parseFloat(p);
            n = parseFloat(n);
            return p > n
        }
        var o = f.get("date");
        if (!(o(p, m) && o(n, m))) {
            return false
        }
        return p.parseDate(m.format) > n.parseDate(m.format)
    });
    f.register("ge", function (o, n) {
        var l = f.get("eq");
        var m = f.get("gt");
        return l(o, n) || m(o, n)
    });
    f.register("length", function (n, m) {
        if (m.allowEmpty && y(n)) {
            return true
        }
        if (!(m.min || m.max)) {
            k("length", "need parameter of 'min' or 'max'!");
            return false
        }
        var l = ol.form.getStrLeng(n);
        if (m.min && l < m.min) {
            return false
        }
        if (m.max && l > m.max) {
            return false
        }
        return true
    });
    f.register("range", function (o, n) {
        if (n.allowEmpty && y(o)) {
            return true
        }
        if (!(n.min || n.max)) {
            k("range", "need parameter of 'min' or 'max'!");
            return false
        }
        n.negative = true;
        var m = f.get("float");
        if (!m(o, n)) {
            return false
        }
        var l = parseFloat(o);
        if (n.min && l < n.min) {
            return false
        }
        if (n.max && l > n.max) {
            return false
        }
        return true
    });
    f.register("chinese", function (m, l) {
        if (l.allowEmpty && y(m)) {
            return true
        }
        l.regex = /^[\u4E00-\u9FA5]$/;
        return f.get("regex")(m, l)
    });
    f.register("int", function (m, l) {
        if (l.allowEmpty && y(m)) {
            return true
        }
        if (l.negative) {
            l.regex = /^[-]?\d+$/
        } else {
            l.regex = /^\d+$/
        }
        return f.get("regex")(m, l)
    });
    f.register("float", function (m, l) {
        if (l.allowEmpty && y(m)) {
            return true
        }
        if (l.negative) {
            l.regex = /^[-]?\d+(\.\d+)?$/
        } else {
            l.regex = /^\d+(\.\d+)?$/
        }
        return f.get("regex")(m, l)
    });
    f.register("date", function (p, n) {
        if (n.allowEmpty && y(p)) {
            return true
        }
        if (!n.format) {
            d("date", "need parameter of 'format'!");
            return false
        }
        var o = {
            "\\.": "\\.",
            "M+": "(0[1-9]|[1-9]|1[0-2])",
            "d+": "(0[1-9]|[1-9]|[12][0-9]|3[01])",
            "y+": "(\\d{4})",
            "H+": "([0-9]|[01][0-9]|2[0-3])",
            "m+": "([0-9]|[0-5][0-9])",
            "s+": "([0-9]|[0-5][0-9])",
            S: "(\\d+)"
        };
        var l = n.format;
        for (var m in o) {
            if (new RegExp("(" + m + ")").test(n.format)) {
                l = l.replace(RegExp.$1, o[m])
            }
        }
        n.regex = new RegExp("^" + l + "$");
        if (!f.get("regex")(p, n)) {
            return false
        }
        return p == p.parseDate(n.format).format(n.format)
    });
    f.register("url", function (m, l) {
        if (l.allowEmpty && y(m)) {
            return true
        }
        if (m.startsWith("http://")) {
            m = m.substring(7)
        } else {
            if (m.startsWith("https://")) {
                m = m.substring(8)
            } else {
                if (l.requireProtocol) {
                    return false
                }
            }
        }
        if (!m) {
            return false
        }
        l.regex = /^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return f.get("regex")(m, l)
    })
})();
(function () {
    var r = ol.template = function (j) {
        this.init = function () {
            j = g(j);
            var k;
            for (var l = 0; l < j.length; l++) {
                k = h(j[l]);
                b[k[0]] = d(k)
            }
        };
        this.parse = function (l, k) {
            if (!l || !(l = b[l])) {
                return ""
            }
            return a(l, k)
        };
        this.init()
    };
    r.parse = function (l, j) {
        var k = a(d(h(l)), j);
        return k
    };
    r.startDelimiter = "\x3c!--";
    r.endDelimiter = "--\x3e";
    var b = {},
        c = new RegExp(r.startDelimiter + "#macro \\S+\\s*\\w*" + r.endDelimiter + "[\\s\\S]*?" + r.startDelimiter + "/#macro" + r.endDelimiter, "g"),
        g = function (j) {
            return j.match(c)
        },
        f = new RegExp("(" + r.startDelimiter + "(/?)#([\\s\\S]*?)" + r.endDelimiter + ")|(')|([\r\n\t])|({#([^}]*?)})", "g"),
        h = function (k) {
            var u = k.replace(f, function (w, t, I, J, x, y, K, C) {
                if (t) {
                    return "\n" + (I ? "-" : "+") + J.replace(/[\r\n\t]/g, "") + "\n"
                }
                if (x) {
                    return "\\'"
                }
                if (y) {
                    return ""
                }
                if (K) {
                    var H = C.indexOf("?");
                    if (H != 0) {
                        switch (C.substring(H + 1)) {
                            case"html":
                                C = "ec.autoEncodeAttr(" + C.substring(0, H) + ")";
                                break;
                            case"js_string":
                                C = C.replace(/\"/g, '\\"').replace(/\r\n/g, "\\r\\n").replace(/\n/g, "\\n");
                                break
                        }
                    }
                    C = C.replace(/\'/g, "\\'");
                    return "'+(" + C + ")+'"
                }
            });
            u = u.split(/\n/);
            var q, l, n, v, j, m = ["var f=[];"];
            for (var z = 0; z < u.length; z++) {
                q = u[z];
                if (!q) {
                    continue
                }
                l = q.charAt(0);
                if (l !== "+" && l !== "-") {
                    m.push("f.push('" + q + "');");
                    continue
                }
                n = q.split(/\s/);
                switch (n[0]) {
                    case"+macro":
                        v = n[1];
                        j = n[2];
                        m.push('f.push("\x3c!--' + v + ' start--\x3e");');
                        break;
                    case"-macro":
                        m.push('f.push("\x3c!--' + v + ' end--\x3e");');
                        break;
                    case"+elseif":
                        n.splice(0, 1);
                        m.push("}else if" + n.join(" ") + "{");
                        break;
                    case"+else":
                        m.push("}else{");
                        break;
                    case"+if":
                    case"+for":
                    case"+switch":
                        n[0] = n[0].substr(1);
                        m.push(n.join(" ") + "{");
                        break;
                    case"+case":
                    case"+default":
                        n[0] = n[0].substr(1);
                        m.push(n.join(" ") + ":");
                        break;
                    case"-switch":
                    case"-for":
                    case"-if":
                        m.push("}");
                        break;
                    case"+list":
                        if (n.length != 4) {
                            throw v + ": list command error!"
                        }
                        var p = n[3] + "_index", o = n[3] + "_length", A = n[3] + "_num";
                        m.push("if(" + n[1] + ".constructor === Array){");
                        m.push("var " + n[3] + ";");
                        m.push("var " + o + "=" + n[1] + ".length;");
                        m.push("var " + p + ";");
                        m.push("for(var " + A + "=" + o + ";" + A + "--;){");
                        m.push(p + "=" + o + "-" + A + "-1;");
                        m.push(n[3] + "=" + n[1] + "[" + p + "];");
                        break;
                    case"-list":
                        m.push("}}");
                        break;
                    case"+break":
                        m.push("break;");
                        break;
                    case"-list":
                        m.push("}}}");
                        break;
                    case"+eval":
                        n.splice(0, 1);
                        m.push(n.join(" "));
                        break;
                    case"+var":
                        n[0] = n[0].substr(1);
                        m.push(n.join(" ") + ";");
                        break;
                    default:
                        break
                }
            }
            m.push("return f.join('');");
            return [v, j || "data", m.join("")]
        }, d = function (j) {
            try {
                return new Function(j[1], j[2])
            } catch (k) {
                logger.error("template:" + j[0], k)
            }
        }, a = function (j, k) {
            return j(k)
        }
})();

function alertS(t) {
    if ("string" === typeof t) {
        alert(t.transHtmlAttribute())
    } else {
        alert("参数错误")
    }
}