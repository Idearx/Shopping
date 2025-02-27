/*!
 * Web Analytics(hwa-js-api-1.1.7_20160506_1,builded by ming t1)
 *
 * JavaScript tracking client,基于piwik开源JS API 并加以改进以适应华为IT需求
 *
 * @link http://piwik.org
 * @source http://dev.piwik.org/trac/browser/trunk/js/piwik.js
 * @license http://www.opensource.org/licenses/bsd-license.php Simplified BSD
 */
;var dmpa_js_init_time = (typeof window.performance != "undefined") ? window.performance.timing.navigationStart : (typeof hwa_pv_start_time != "undefined" ? hwa_pv_start_time : new Date().getTime());
var asyn_pv_sendtime_dmpa = dmpa_js_init_time;
var dmpa_prototype_options_dmpaid;
var dmpa_prototype_options_gdomain;

function isIE() {
    if (window.navigator.userAgent.indexOf("MSIE") > -1) {
        return true
    } else {
        return false
    }
}

function isIE8() {
    if (window.navigator.userAgent.indexOf("MSIE") > -1 && window.navigator.userAgent.indexOf("Trident/4") > -1) {
        return true
    } else {
        return false
    }
}

function isFF() {
    if (window.navigator.userAgent.indexOf("Firefox") > -1) {
        return true
    } else {
        return false
    }
}

if (isFF()) {
    try {
        if (typeof (HTMLElement) != "undefined" && !window.opera) {
            HTMLElement.prototype.__defineGetter__("innerText", function () {
                return this.textContent
            });
            HTMLElement.prototype.__defineSetter__("innerText", function (a) {
                this.textContent = a
            })
        }
    } catch (e) {
    }
}
var dmpa_source_this = this;
(function (z) {
    w.before = h("before");
    w.around = h("around");
    w.on = h("on");
    w.afterReturning = h("afterReturning");
    w.afterThrowing = h("afterThrowing");
    w.after = h("after");
    w.joinpoint = i;
    w.add = function () {
        return w.apply(null, arguments)
    };

    function w(H, G, F) {
        var E, D;
        if (arguments.length < 3) {
            return a(H, G)
        } else {
            if (m(G)) {
                D = p(H, G, F)
            } else {
                E = typeof G;
                if (E === "string") {
                    if (typeof H[G] === "function") {
                        D = n(H, G, F)
                    }
                } else {
                    if (E === "function") {
                        D = p(H, G(H), F)
                    } else {
                        D = o(H, G, F)
                    }
                }
            }
            return D
        }
    }

    function B(G, E) {
        var H, F, D;
        this.target = G;
        this.func = E;
        this.aspects = {};
        H = this.orig = G[E];
        F = this;
        D = this.advised = function () {
            var L, O, J, K, M;
            if (this instanceof D) {
                L = v(H.prototype);
                K = function (Q) {
                    return d(H, L, Q)
                }
            } else {
                L = this;
                K = function (Q) {
                    return H.apply(L, Q)
                }
            }
            J = s.call(arguments);
            M = "afterReturning";
            O = A({target: L, method: E, args: J});
            try {
                F._callSimpleAdvice("before", L, J);
                try {
                    O.result = F._callAroundAdvice(L, E, J, P)
                } catch (N) {
                    O.result = O.exception = N;
                    M = "afterThrowing"
                }
                J = [O.result];
                I(M, J);
                I("after", J);
                if (O.exception) {
                    throw O.exception
                }
                return O.result
            } finally {
                t()
            }

            function P(R) {
                var Q = K(R);
                F._callSimpleAdvice("on", L, R);
                return Q
            }

            function I(R, Q) {
                F._callSimpleAdvice(R, L, Q)
            }
        };
        f(D, "_advisor", {value: F, configurable: true})
    }

    B.prototype = {
        _callSimpleAdvice: function (F, E, D) {
            var G, H;
            H = this.aspects[F];
            if (!H) {
                return
            }
            G = g[F];
            G(this.aspects[F], function (I) {
                var J = I.advice;
                J && J.apply(E, D)
            })
        }, _callAroundAdvice: function (G, K, F, E) {
            var D, I;
            I = this.aspects.around;
            D = I ? I.length : 0;

            function J(M, L) {
                return M < 0 ? E(L) : H(I[M].advice, M, L)
            }

            function H(S, O, R) {
                var T, N;
                T = 0;
                N = A({target: G, method: K, args: R, proceed: L, proceedApply: P, proceedCount: M});
                try {
                    return S.call(G, N)
                } finally {
                    t()
                }

                function M() {
                    return T
                }

                function L() {
                    return Q(arguments.length > 0 ? s.call(arguments) : R)
                }

                function P(U) {
                    return Q(U || R)
                }

                function Q(U) {
                    T++;
                    return J(O - 1, U)
                }
            }

            return J(D - 1, F)
        }, add: function (D) {
            var E, F;
            E = this;
            F = E.aspects;
            c(F, D);
            return {
                remove: function () {
                    var G = k(F, D);
                    if (!G) {
                        E.remove()
                    }
                }
            }
        }, remove: function () {
            delete this.advised._advisor;
            this.target[this.func] = this.orig
        }
    };
    B.get = function (G, E) {
        if (!(E in G)) {
            return
        }
        var F, D;
        D = G[E];
        if (typeof D !== "function") {
            throw new Error("Advice can only be applied to functions: " + E)
        }
        F = D._advisor;
        if (!F) {
            F = new B(G, E);
            G[E] = F.advised
        }
        return F
    };

    function a(G, D) {
        var E, F;
        E = G.name || "_";
        F = {};
        F[E] = G;
        n(F, E, D);
        return F[E]
    }

    function n(F, G, D) {
        var E = B.get(F, G);
        return E && E.add(D)
    }

    function p(J, I, E) {
        var D, G, H, F;
        D = [];
        F = 0;
        while ((H = I[F++])) {
            G = n(J, H, E);
            G && D.push(G)
        }
        return b(D)
    }

    function o(H, F, E) {
        var D = [];
        for (var G in H) {
            if (typeof H[G] == "function" && F.test(G)) {
                D.push(n(H, G, E))
            }
        }
        return b(D)
    }

    function b(D) {
        return {
            remove: function () {
                for (var E = D.length - 1; E >= 0; --E) {
                    D[E].remove()
                }
            }
        }
    }

    function h(D) {
        return function (G, H, F) {
            var E = {};
            if (arguments.length === 2) {
                E[D] = H;
                return w(G, E)
            } else {
                E[D] = F;
                return w(G, H, E)
            }
        }
    }

    function c(D, E) {
        var G, F, H;
        for (G in g) {
            F = E[G];
            if (F) {
                H = D[G];
                if (!H) {
                    D[G] = H = []
                }
                H.push({aspect: E, advice: F})
            }
        }
    }

    function k(D, E) {
        var G, I, H;
        H = 0;
        for (G in g) {
            I = D[G];
            if (I) {
                H += I.length;
                for (var F = I.length - 1; F >= 0; --F) {
                    if (I[F].aspect === E) {
                        I.splice(F, 1);
                        --H;
                        break
                    }
                }
            }
        }
        return H
    }

    function d(G, D, E) {
        try {
            f(D, "constructor", {value: G, enumerable: false})
        } catch (F) {
        }
        G.apply(D, E);
        return D
    }

    var j, l, r, C, y, g, s, m, f, v;
    l = [];
    r = Array.prototype;
    C = r.unshift;
    y = r.push;
    s = r.slice;
    m = Array.isArray || function (D) {
        return Object.prototype.toString.call(D) == "[object Array]"
    };
    f = q() ? Object.defineProperty : function (E, F, D) {
        E[F] = D.value
    };
    v = Object.create || (function () {
        function D() {
        }

        return function (F) {
            D.prototype = F;
            var E = new D();
            D.prototype = null;
            return E
        }
    }());
    g = {before: u, around: false};
    g.on = g.afterReturning = g.afterThrowing = g.after = x;

    function x(G, F) {
        for (var E = 0, D = G.length; E < D; E++) {
            F(G[E])
        }
    }

    function u(F, E) {
        for (var D = F.length - 1; D >= 0; --D) {
            E(F[D])
        }
    }

    function i() {
        return j
    }

    function A(D) {
        l.push(j);
        return j = D
    }

    function t() {
        return j = l.pop()
    }

    function q() {
        try {
            return "x" in Object.defineProperty({}, "x", {})
        } catch (D) {
        }
    }

    z.hwa_meld = w
})(window);
if (typeof JSON !== "object") {
    JSON = {}
}
(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }

    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"},
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case"string":
                return quote(value);
            case"number":
                return isFinite(value) ? String(value) : "null";
            case"boolean":
            case"null":
                return String(value);
            case"object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }

    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {"": value})
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"": j}, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}(window));
var DMPA = DMPA || (function () {
    var expireDateTime, plugins = {}, documentAlias = document, navigatorAlias = navigator, screenAlias = screen,
        windowAlias = window, pageId = null, pageIdBeforeHashChange = null, jalorPageForwardFlag = false,
        jalorPageForwardFlag4PV = false, urlBeforeHashChange = null, urlRefBeforeHashChange = null,
        configiFrameTrackingDisabled = false, dis_parent = false, documentTileBeforeHashchange = null,
        hasLoaded = false, registeredOnLoadHandlers = [], registeredOnUnloadHandlers = [],
        encodeWrapper = windowAlias.encodeURIComponent, decodeWrapper = windowAlias.decodeURIComponent,
        urldecode = unescape, asyncTracker, perfInfo, i;

    function isDefined(property) {
        return "undefined" !== typeof property
    }

    function hwaLog(message) {
        if (typeof console != "undefined" && typeof console.log != "undefined") {
            console.log(message)
        }
    }

    function isFunction(property) {
        return typeof property === "function"
    }

    function isObject(property) {
        return typeof property === "object"
    }

    function isString(property) {
        return typeof property === "string" || property instanceof String
    }

    function mixin() {
        var target = arguments[0];
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            var src = arguments[i];
            if ((typeof src).toLowerCase() != "object") {
                return
            }
            for (var p in src) {
                if (typeof src[p] != "undefined" && src[p] != "undefined") {
                    target[p] = src[p]
                }
            }
        }
        return target
    }

    function preventDefault(e) {
        e.preventDefault && e.preventDefault();
        e.returnValue = false
    }

    function apply() {
        var i, f, parameterArray;
        for (i = 0; i < arguments.length; i += 1) {
            parameterArray = arguments[i];
            f = parameterArray.shift();
            if (isString(f)) {
                asyncTracker[f].apply(asyncTracker, parameterArray)
            } else {
                f.apply(asyncTracker, parameterArray)
            }
        }
    }

    function addEventListener(element, eventType, eventHandler, useCapture) {
        if (element.attachEvent) {
            element.attachEvent("on" + eventType, (function (el) {
                return function () {
                    eventHandler.call(el, window.event)
                }
            }(element)))
        } else {
            element.addEventListener(eventType, eventHandler, useCapture)
        }
        element = null;
        return true
    }

    function removeEventListener(element, eventType, eventHandler) {
        if (element.removeEventListener) {
            element.removeEventListener(eventType, eventHandler);
            return true
        }
        if (element.detachEvent) {
            return element.detachEvent("on" + eventType, eventHandler)
        }
        element["on" + eventType] = null
    }

    function executePluginMethod(methodName, callback) {
        var result = "", i, pluginMethod;
        for (i in plugins) {
            if (Object.prototype.hasOwnProperty.call(plugins, i)) {
                pluginMethod = plugins[i][methodName];
                if (isFunction(pluginMethod)) {
                    result += pluginMethod(callback)
                }
            }
        }
        return result
    }

    function beforeUnloadHandler() {
        var now;
        executePluginMethod("unload");
        for (i = 0; i < registeredOnUnloadHandlers.length; i++) {
            registeredOnUnloadHandlers[i]()
        }
        if (expireDateTime) {
            do {
                now = new Date()
            } while (now.getTimeAlias() < expireDateTime && expireDateTime - now.getTimeAlias() < 1000)
        }
    }

    function loadHandler() {
        if (!hasLoaded) {
            hasLoaded = true;
            executePluginMethod("load");
            for (var i = 0; i < registeredOnLoadHandlers.length; i++) {
                registeredOnLoadHandlers[i]()
            }
        }
        return true
    }

    function hashchangeHandler() {
    }

    function addReadyListener() {
        var _timer;
        if (documentAlias.attachEvent) {
            var readyFunc = function () {
                if (documentAlias.readyState === "complete") {
                    documentAlias.detachEvent("onreadystatechange", readyFunc);
                    loadHandler(true)
                }
            };
            documentAlias.attachEvent("onreadystatechange", readyFunc);
            if (documentAlias.readyState === "complete") {
                documentAlias.detachEvent("onreadystatechange", readyFunc);
                loadHandler(true)
            }
        } else {
            if (documentAlias.addEventListener) {
                addEventListener(documentAlias, "DOMContentLoaded", function ready() {
                    documentAlias.removeEventListener("DOMContentLoaded", ready, false);
                    loadHandler()
                })
            }
        }
        if (typeof documentAlias.readyState != "undefined") {
            _timer = setInterval(function () {
                if (hasLoaded || /loaded|complete/.test(documentAlias.readyState)) {
                    clearInterval(_timer);
                    loadHandler()
                }
            }, 10)
        }
        addEventListener(windowAlias, "load", loadHandler, false);
        addEventListener(windowAlias, "hashchange", hashchangeHandler, false)
    }

    function loadScript(src, onLoad) {
        var script = documentAlias.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        if (script.readyState) {
            script.onreadystatechange = function () {
                var state = this.readyState;
                if (state === "loaded" || state === "complete") {
                    script.onreadystatechange = null;
                    onLoad()
                }
            }
        } else {
            script.onload = onLoad
        }
        documentAlias.getElementsByTagName("head")[0].appendChild(script)
    }

    function getReferrer() {
        var referrer = "";
        try {
            referrer = windowAlias.top.document.referrer
        } catch (e) {
            if (windowAlias.parent) {
                try {
                    referrer = windowAlias.parent.document.referrer
                } catch (e2) {
                    referrer = ""
                }
            }
        }
        if (referrer === "") {
            referrer = documentAlias.referrer
        }
        return referrer
    }

    function getProtocolScheme(url) {
        var e = new RegExp("^([a-z]+):"), matches = e.exec(url);
        return matches ? matches[1] : null
    }

    function getHostName(url) {
        var e = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), matches = e.exec(url);
        return matches ? matches[1] : url
    }

    function getParameter(url, name) {
        var e = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+)[?])([^#]+)"), matches = e.exec(url),
            f = new RegExp("(?:^|&)" + name + "=([^&]*)"), result = matches ? f.exec(matches[1]) : 0;
        return result ? decodeWrapper(result[1]) : ""
    }

    function utf8_encode(argString) {
        return urldecode(encodeWrapper(argString))
    }

    function sha1(str) {
        var rotate_left = function (n, s) {
                return (n << s) | (n >>> (32 - s))
            }, cvt_hex = function (val) {
                var str = "", i, v;
                for (i = 7; i >= 0; i--) {
                    v = (val >>> (i * 4)) & 15;
                    str += v.toString(16)
                }
                return str
            }, blockstart, i, j, W = [], H0 = 1732584193, H1 = 4023233417, H2 = 2562383102, H3 = 271733878, H4 = 3285377520,
            A, B, C, D, E, temp, str_len, word_array = [];
        str = utf8_encode(str);
        str_len = str.length;
        for (i = 0; i < str_len - 3; i += 4) {
            j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
            word_array.push(j)
        }
        switch (str_len & 3) {
            case 0:
                i = 2147483648;
                break;
            case 1:
                i = str.charCodeAt(str_len - 1) << 24 | 8388608;
                break;
            case 2:
                i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 32768;
                break;
            case 3:
                i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 128;
                break
        }
        word_array.push(i);
        while ((word_array.length & 15) !== 14) {
            word_array.push(0)
        }
        word_array.push(str_len >>> 29);
        word_array.push((str_len << 3) & 4294967295);
        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) {
                W[i] = word_array[blockstart + i]
            }
            for (i = 16; i <= 79; i++) {
                W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
            }
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 1518500249) & 4294967295;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp
            }
            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 1859775393) & 4294967295;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp
            }
            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 2400959708) & 4294967295;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp
            }
            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 3395469782) & 4294967295;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp
            }
            H0 = (H0 + A) & 4294967295;
            H1 = (H1 + B) & 4294967295;
            H2 = (H2 + C) & 4294967295;
            H3 = (H3 + D) & 4294967295;
            H4 = (H4 + E) & 4294967295
        }
        temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        return temp.toLowerCase()
    }

    function urlFixup(hostName, href, referrer) {
        if (hostName === "translate.googleusercontent.com") {
            if (referrer === "") {
                referrer = href
            }
            href = getParameter(href, "u");
            hostName = getHostName(href)
        } else {
            if (hostName === "cc.bingj.com" || hostName === "webcache.googleusercontent.com" || hostName.slice(0, 5) === "74.6.") {
                href = documentAlias.links[0].href;
                hostName = getHostName(href)
            }
        }
        return [hostName, href, referrer]
    }

    function domainFixup(domain) {
        var domain = (location.hostname + "/").match(/[\w-]+\.(com|info|net|org|me|mobi|hk|us|biz|xxx|ca|mx|tv|ws|am|asia|at|be|bz|cc|co|de|nom|es|eu|fm|fr|gs|firm|gen|ind|in|it|jobs|jp|ms|nl|nu|se|tc|tk|idv|tw|vg|gov|cn|ha)(\.(cn|hk|jp|tw|kr|mo|uk|ag|es|co|nz|in|br|bz|mx))*\//gi);
        dmpa_prototype_options_gdomain = domain = domain ? 0 < domain.length ? domain[0].substr(0, domain[0].length - 1) : void 0 : document.domain;
        return domain
    }

    function titleFixup(title) {
        if (!isString(title)) {
            title = title.text || "";
            var tmp = documentAlias.getElementsByTagName("title");
            if (tmp && isDefined(tmp[0])) {
                title = tmp[0].text
            }
        }
        return title
    }

    function getPiwikUrlForOverlay(trackerUrl, apiUrl) {
        if (apiUrl) {
            return apiUrl
        }
        if (trackerUrl.slice(-5) === "/hwa/") {
            trackerUrl = trackerUrl.slice(0, trackerUrl.length - 5)
        }
        return trackerUrl
    }

    function isOverlaySession(configTrackerSiteId) {
        var windowName = "Piwik_Overlay";
        var referrerRegExp = new RegExp("/redirect\\?module=Overlay&action=startOverlaySession&idSite=([^&]+)&period=([^&]+)&date=([^&]+)&url=([^&]+)$");
        var match = referrerRegExp.exec(documentAlias.referrer);
        if (match) {
            var idsite = match[1];
            if (idsite !== String(configTrackerSiteId)) {
                return false
            }
            var period = match[2], date = match[3];
            windowAlias.name = windowName + "###" + period + "###" + date
        }
        var windowNameParts = windowAlias.name.split("###");
        return windowNameParts.length === 3 && windowNameParts[0] === windowName
    }

    function injectOverlayScripts(configTrackerUrl, configApiUrl, configTrackerSiteId) {
        var windowNameParts = windowAlias.name.split("###"), period = windowNameParts[1], date = windowNameParts[2],
            piwikUrl = getPiwikUrlForOverlay(configTrackerUrl, configApiUrl);
        loadScript(piwikUrl + "resource/scripts/client/client.js?v=1", function () {
            Piwik_Overlay_Client.initialize(piwikUrl, configTrackerSiteId, period, date)
        })
    }

    var intranet = true;
    var autoSendPV = true;
    var autoLinkTracking = true;
    var bfdvalue = null;

    function Tracker(siteId) {
        var registeredHooks = {}, fields = {}, mapFields = {
                siteId: "idsite",
                page_hierarchy: "hier",
                action_type: "action",
                page_title: "dt",
                url: "url",
                referrer: "urlref",
                is_landing_page: "blp",
                uid: "_id",
                uid_encrypt: "_idenc",
                user_id_type: "_ut",
                session_id: "_sid",
                page_id: "_pid",
                data: "data",
                search_keyword: "s_key",
                search_category: "s_cat",
                search_type: "s_t",
                order_type: "o_t",
                search_resultsCount: "s_count",
                search_id: "s_id",
                search_pageIndex: "s_page_n",
                search_clickIndex: "s_item_n",
                search_clickIndex_inpage: "s_item_index",
                search_clickType: "l_type",
                search_clickTitle: "l_title",
                search_clickUrl: "l_href",
                language: "url_l",
                goal_id: "idgoal",
                revenue: "revenue",
                link_title: "l_title",
                link_type: "l_type",
                link_target: "l_target",
                link_html: "l_html",
                link_href: "l_href",
                page_x: "pagex",
                page_y: "pagey",
                opr_wf_d: "opr_wf_d",
                opr_wf_n: "opr_wf_n",
                opr_wf_s: "opr_wf_s",
                biz_wf_n: "biz_wf_n",
                biz_wf_s_s: "biz_wf_s_s",
                biz_wf_s_n: "biz_wf_s_n",
                t_d_1: "t_d_1",
                appn: "appn",
                appv: "appv",
                user_id: "user_id"
            }, locationArray = urlFixup(documentAlias.domain, windowAlias.location.href, getReferrer()),
            domainAlias = domainFixup(locationArray[0]), locationHrefAlias = locationArray[1],
            configReferrerUrl = locationArray[2], configRequestMethod = "GET",
            configTrackerUrl = ("https:" == location.protocol ? "https:" : "http:") + "//nebula-collector.huawei.com/dmpa/",
            configApiUrl = ("https:" == location.protocol ? "https:" : "http:") + "//w3.huawei.com/hwasite/",
            configTrackerSiteId = siteId || "", configHierarchy = "", configCustomUrl,
            configTitle = documentAlias.title,
            configDownloadExtensions = "7z|aac|ar[cj]|as[fx]|avi|bin|csv|deb|dmg|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|ms[ip]|od[bfgpst]|og[gv]|pdf|phps|png|ppt|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd||xls|xml|z|zip",
            configHostsAlias = [domainAlias], configIgnoreClasses = [], configDownloadClasses = [],
            configLinkClasses = [], configTrackerPause = 80, configMinimumVisitTime, configHeartBeatTimer,
            configDiscardHashTag, configCustomData,
            configCampaignNameParameters = ["ha_campaign", "ha_campaign", "utm_campaign", "utm_source", "utm_medium"],
            configCampaignKeywordParameters = ["ha_kwd", "ha_kwd", "utm_term"], configCookieNamePrefix = "_dmpa_",
            configCookieDomain, configCookiePath = "/" + (intranet ? location.pathname.split("/")[0] : ""),
            configCookiesDisabled = (typeof g_hwa_configCookiesDisabled != "undefined") ? g_hwa_configCookiesDisabled : false,
            configDoNotTrack, configCountPreRendered, configConversionAttributionFirstReferrer,
            configVisitorCookieTimeout = 63072000000, configSessionCookieTimeout = 1800000,
            configReferralCookieTimeout = 15768000000, cookieSecure = documentAlias.location.protocol === "https",
            customVariables = false, customVariablesPage = {}, customVariableMaximumLength = 200, browserFeatures = {},
            linkTrackingInstalled = false, activityTrackingInstalled = false, lastActivityTime, lastButton, lastTarget,
            hash = sha1, domainHash, visitorUUID, visitorUUIDEncrypt, pageURLBeforeRegenerate,
            configHaIgnoreClass = "ha_ignore", configHaClickClass = "hwa-click", perf_event_q = [],
            perf_send_status = "sleeping", perf_ajaxpage_in = 0, perf_ajaxpage_out = 0, perf_ajaxpage_sended = false,
            perf_ajaxpage_min_time = 0, perf_ajaxpage_max_time = 0, perf_ajaxpage_firstloadtime = 0,
            ajaxthreshold_time = 0, perf_url_ignore_p = /(\.css)|(only4ssoTimeUpdate.do)/i,
            ha_js_parent_pid = ha_js_parent_pid || hash(dmpa_js_init_time + locationHrefAlias + (new Date() - 0));
        var ha_js_parent_sid, ha_js_parent_url, duration, perf_ifrmae_succeed_flag = false;
        var hasiFrame = false;

        function sendPerfQueue() {
            try {
                perf_send_status = "sending";
                var _qlen = perf_event_q.length;
                var _tmp_q = [];
                for (var i = 0; i < _qlen; i++) {
                    _tmp_q.push(perf_event_q.shift())
                }
                if (perf_event_q.length > 0) {
                    perf_send_status = "ready";
                    setTimeout(sendPerfQueue, 4000)
                } else {
                    perf_send_status = "sleeping"
                }
                logLink(null, "ajax-perf", {data: JSON.stringify(_tmp_q)});
                if (perf_ajaxpage_in > 0 && perf_ajaxpage_in == perf_ajaxpage_out) {
                    logLink(null, "ajax-pp", {ri1: (0 + perf_ajaxpage_max_time - asyn_pv_sendtime_dmpa)});
                    perf_ajaxpage_in = 0;
                    perf_ajaxpage_out = 0
                }
            } catch (e) {
            }
        }

        function getCustomName(name) {
            var ret = null;
            if (name) {
                var m = name.match(/((metric)|(dimension))(.*)/);
                if (m && m[4]) {
                    if (m[2]) {
                        ret = "ri"
                    } else {
                        if (m[3]) {
                            ret = "rv"
                        }
                    }
                    if (ret) {
                        var no = m[4] - 0;
                        if (isNaN(no) || no < 1 || no > 10) {
                            return null
                        }
                        ret += no
                    }
                }
            }
            return ret
        }

        function mapData(data) {
            var ret = {};
            for (var o in data) {
                var name = mapFields[o];
                if (o == "search_filters") {
                    for (var i = 1; i <= data[o].length; i++) {
                        ret["s_f" + i] = data[o][i - 1]
                    }
                }
                var custom_name = getCustomName(o);
                if (custom_name) {
                    ret[custom_name] = data[o];
                    continue
                }
                if (name) {
                    ret[name] = data[o]
                }
            }
            return ret
        }

        function getbfdCookie() {
            var bfdkey = "bfdid";
            var _bfd_value = getBfdid(bfdkey);
            return _bfd_value
        }

        function setCookie(cookieName, value, msToExpire, path, domain, secure) {
            if (configCookiesDisabled) {
                return
            }
            var expiryDate;
            if (msToExpire) {
                expiryDate = new Date();
                expiryDate.setTime(expiryDate.getTime() + msToExpire)
            }
            if ("_dmpa_ses" == cookieName) {
                documentAlias.cookie = "_dmpa_ses=" + encodeWrapper(value) + ";path=/;domain=" + dmpa_prototype_options_gdomain
            } else {
                documentAlias.cookie = cookieName + "=" + encodeWrapper(value) + (msToExpire ? ";expires=" + expiryDate.toGMTString() : "") + ";path=" + (path || "/") + (dmpa_prototype_options_gdomain ? ";domain=" + dmpa_prototype_options_gdomain : "") + (secure ? ";secure" : "")
            }
        }

        function getCookie(cookieName) {
            if (configCookiesDisabled) {
                return 0
            }
            var cookiePattern = new RegExp("(^|;)[ ]*" + cookieName + "=([^;]*)"),
                cookieMatch = cookiePattern.exec(documentAlias.cookie);
            return cookieMatch ? decodeWrapper(cookieMatch[2]) : 0
        }

        function getBfdid(bfdkey) {
            var arr = document.cookie.split(";");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].indexOf(bfdkey) >= 0) {
                    var itemArr = arr[i].split("=");
                    for (var j = 0; j < itemArr.length; j++) {
                        var value = itemArr[1];
                        return value
                    }
                }
            }
        }

        function purify(url) {
            var targetPattern;
            if (configDiscardHashTag) {
                targetPattern = new RegExp("#.*");
                return url.replace(targetPattern, "")
            }
            return url
        }

        function resolveRelativeReference(baseUrl, url) {
            var protocol = getProtocolScheme(url), i;
            if (protocol) {
                return url
            }
            if (url.slice(0, 1) === "/") {
                return getProtocolScheme(baseUrl) + "://" + getHostName(baseUrl) + url
            }
            baseUrl = purify(baseUrl);
            if ((i = baseUrl.indexOf("?")) >= 0) {
                baseUrl = baseUrl.slice(0, i)
            }
            if ((i = baseUrl.lastIndexOf("/")) !== baseUrl.length - 1) {
                baseUrl = baseUrl.slice(0, i + 1)
            }
            return baseUrl + url
        }

        function isSiteHostName(hostName) {
            var i, alias, offset;
            for (i = 0; i < configHostsAlias.length; i++) {
                alias = domainFixup(configHostsAlias[i].toLowerCase());
                if (hostName === alias) {
                    return true
                }
                if (alias.slice(0, 1) === ".") {
                    if (hostName === alias.slice(1)) {
                        return true
                    }
                    offset = hostName.length - alias.length;
                    if ((offset > 0) && (hostName.slice(offset) === alias)) {
                        return true
                    }
                }
            }
            return false
        }

        function getParmers(request) {
            var json = {other: "other"};
            if (bfdvalue != null && "" != bfdvalue) {
                json.bfdid = bfdvalue
            }
            var _rv4 = JSON.stringify(json);
            request = request + "&rv1='" + encodeWrapper(_rv4) + "'";
            return request
        }

        function getImage(request) {
            var image = new Image(1, 1);
            image.onload = function () {
            };
            image.src = configTrackerUrl + "open/dc?" + request
        }

        function iframePost(data) {
            if (document.body) {
                try {
                    data = encodeURIComponent(data);
                    try {
                        var ifr = document.createElement('<iframe name="' + data + '"></iframe>')
                    } catch (d) {
                        ifr = document.createElement("iframe"), ifr.name = data
                    }
                    ifr.height = "0";
                    ifr.width = "0";
                    ifr.style.display = "none";
                    ifr.style.visibility = "hidden";
                    var _ss = "/favicon.ico";
                    if (typeof static_source_4hwa != "undefined") {
                        _ss = static_source_4hwa
                    }
                    var src = configTrackerUrl + "../api/2.0/analytics_iframe.html#" + encodeURIComponent(location.protocol + "//" + location.host + _ss),
                        clear = function () {
                            ifr.src = "";
                            ifr.parentNode && ifr.parentNode.removeChild(ifr)
                        };
                    addEventListener(windowAlias, "beforeunload", clear);
                    var flag = !1, l = 0, run = function () {
                        if (!flag) {
                            try {
                                if (9 < l || (ifr.contentWindow.location.host == location.host && ifr.contentWindow.location.path == _ss)) {
                                    flag = !0;
                                    clear();
                                    removeEventListener(windowAlias, "beforeunload", clear);
                                    return
                                }
                            } catch (e) {
                            }
                            l++;
                            setTimeout(run, 200)
                        }
                    };
                    addEventListener(ifr, "load", run);
                    document.body.appendChild(ifr);
                    ifr.src = src
                } catch (e) {
                }
            } else {
                setTimeout(function () {
                    iframePost(data)
                }, 100)
            }
        }

        var _cRequest = 0;
        var _dDate = new Date();

        function sendRequest(request, delay) {
            var now = new Date();
            if ((now - _dDate) > 1000) {
                _cRequest = 0;
                _dDate = now
            }
            if (!configDoNotTrack && _cRequest < 5) {
                _cRequest++;
                if (2000 >= request.length) {
                    getImage(request)
                } else {
                    setTimeout(function () {
                        iframePost(request)
                    })
                }
                expireDateTime = now.getTime() + delay
            }
            try {
                fields.data = null;
                fields.goal_id = null;
                fields.page_x = null;
                fields.page_y = null;
                fields.opr_wf_d = null;
                fields.opr_wf_n = null;
                fields.opr_wf_s = null;
                fields.biz_wf_n = null;
                fields.biz_wf_s_s = null;
                fields.biz_wf_s_n = null;
                if (fields.page_hierarchy != null) {
                    fields.page_hierarchy = fields.page_hierarchy.replace(/((g:{)|(t:{)|(tab:{)|(app:{)|(func:{)|(f:{))(.*?)}/g, "")
                }
                fields.ri1 = null;
                fields.ri2 = null;
                fields.ri3 = null;
                fields.ri4 = null;
                fields.ri5 = null;
                fields.rv1 = null;
                fields.rv2 = null;
                fields.rv3 = null;
                fields.rv4 = null;
                fields.rv5 = null;
                fields.t_d_1 = null
            } catch (e) {
            }
        }

        function getCookieName(baseName) {
            return configCookieNamePrefix + baseName
        }

        function hasCookies() {
            if (configCookiesDisabled) {
                return "0"
            }
            if (!isDefined(navigatorAlias.cookieEnabled)) {
                var testCookieName = getCookieName("testcookie");
                setCookie(testCookieName, "1");
                return getCookie(testCookieName) === "1" ? "1" : "0"
            }
            return navigatorAlias.cookieEnabled ? "1" : "0"
        }

        function updateDomainHash() {
            domainHash = hash((configCookieDomain || domainAlias) + (configCookiePath || "/")).slice(0, 4)
        }

        function getCustomVariablesFromCookie() {
            var cookieName = getCookieName("cvar"), cookie = getCookie(cookieName);
            if (cookie.length) {
                cookie = JSON.parse(cookie);
                if (isObject(cookie)) {
                    return cookie
                }
            }
            return {}
        }

        function loadCustomVariables() {
            if (customVariables === false) {
                customVariables = getCustomVariablesFromCookie()
            }
        }

        function activityHandler() {
            var now = new Date();
            lastActivityTime = now.getTime()
        }

        function setVisitorIdCookie(uuid, createTs, visitCount, nowTs, lastVisitTs, lastEcommerceOrderTs) {
            setCookie(getCookieName("id"), uuid + "." + createTs + "." + visitCount + "." + nowTs + "." + lastVisitTs + "." + lastEcommerceOrderTs, configVisitorCookieTimeout, configCookiePath, configCookieDomain, cookieSecure)
        }

        function loadVisitorIdCookie() {
            var now = new Date(), nowTs = Math.round(now.getTime() / 1000), id = getCookie(getCookieName("id")),
                tmpContainer;
            var cst_uid = document.getElementById("fm_loginUserName");
            if (cst_uid && cst_uid.innerText) {
                visitorUUID = cst_uid.innerText.replace(/\s{1,}/g, "").split("|")[0];
                visitorUUIDEncrypt = 0
            }
            visitorUUID = dmpa_prototype_options_dmpaid;
            visitorUUIDEncrypt = 0;
            if (id) {
                tmpContainer = id.split(".");
                tmpContainer.unshift("0");
                if (tmpContainer[0] === visitorUUID || !visitorUUID) {
                    return tmpContainer
                }
            }
            if (!visitorUUID) {
                visitorUUID = dmpa_prototype_options_dmpaid
            }
            tmpContainer = ["1", visitorUUID, nowTs, 0, nowTs, "", ""];
            return tmpContainer
        }

        function loadReferrerAttributionCookie() {
            var cookie = getCookie(getCookieName("ref"));
            if (cookie.length) {
                try {
                    cookie = JSON.parse(cookie);
                    if (isObject(cookie)) {
                        return cookie
                    }
                } catch (err) {
                }
            }
            return ["", "", 0, ""]
        }

        var unloadCookieFuncBound;

        function getPerformance() {
            try {
                if (!perfInfo) {
                    var perf = windowAlias.performance || windowAlias.webkitPerformance, perf = perf && perf.timing;
                    if (perf) {
                        var c = perf.navigationStart;
                        if (0 == c) {
                            return !1
                        }
                        var d = perf.loadEventStart - c;
                        if (Infinity == d || isNaN(d) || d <= 0) {
                            return !1
                        }
                        perfInfo = {
                            plt: d,
                            dns: perf.connectEnd - c,
                            dit: perf.domInteractive - c,
                            tcp: perf.connectEnd - perf.connectStart,
                            srt: perf.responseStart - perf.requestStart,
                            pdt: perf.responseEnd - perf.responseStart,
                            rrt: perf.domComplete - perf.domLoading,
                            clt: perf.loadEventEnd - perf.loadEventStart
                        };
                        for (var o in perfInfo) {
                            if (perfInfo[o] < 0) {
                                perfInfo[o] = 0
                            }
                        }
                    } else {
                        var b = windowAlias.external, c = b && b.onloadT;
                        b && !b.isValidLoadTime && (c = void 0);
                        2147483648 < c && (c = void 0);
                        0 < c && b.setPageReadyTime();
                        if (c == void 0) {
                            if (document.readyState != "complete") {
                                return !1
                            }
                            var _lpName = getCookieName("lp"), _info = getCookie(_lpName);
                            registeredOnUnloadHandlers.push(function () {
                                setCookie(_lpName, JSON.stringify({url: locationHrefAlias, t: new Date() - 0}), 60000)
                            });
                            setCookie(_lpName, "", -86400);
                            if (!_info) {
                                perfInfo = {plt: new Date().getTime() - dmpa_js_init_time};
                                return perfInfo
                            }
                            _info = JSON.parse(_info);
                            c = new Date() - (_info.t || 0);
                            if (c >= 60000) {
                                return !1
                            }
                        }
                        perfInfo = {plt: c}
                    }
                }
                return perfInfo
            } catch (e) {
            }
        }

        function buildPayload(data) {
            var ret = [];
            for (var o in data) {
                if (data[o] != null) {
                    ret.push(o + "=" + encodeURIComponent(data[o]))
                }
            }
            return ret.join("&")
        }

        function getRequest(request, customData, pluginMethod, currentEcommerceOrderTs) {
            var i, now = new Date(), nowTs = Math.round(now.getTime() / 1000), newVisitor, uuid, visitCount, createTs,
                currentVisitTs, lastVisitTs, lastEcommerceOrderTs, referralTs, referralUrl, referralUrlMaxLength = 1024,
                currentReferrerHostName, originalReferrerHostName, customVariablesCopy = customVariables,
                idname = getCookieName("id"), sesname = getCookieName("ses"), refname = getCookieName("ref"),
                cvarname = getCookieName("cvar"), datasend = null, id = loadVisitorIdCookie(), ses = getCookie(sesname),
                attributionCookie = loadReferrerAttributionCookie(), currentUrl = configCustomUrl || locationHrefAlias,
                campaignNameDetected, campaignKeywordDetected;
            if (configCookiesDisabled) {
                configCookiesDisabled = false;
                setCookie(idname, "", -86400, configCookiePath, configCookieDomain);
                setCookie(sesname, "", -86400, configCookiePath, configCookieDomain);
                setCookie(cvarname, "", -86400, configCookiePath, configCookieDomain);
                setCookie(refname, "", -86400, configCookiePath, configCookieDomain);
                configCookiesDisabled = true
            }
            if (configDoNotTrack) {
                return ""
            }
            newVisitor = id[0];
            uuid = id[1];
            createTs = id[2];
            visitCount = id[3];
            currentVisitTs = id[4];
            lastVisitTs = id[5];
            if (!isDefined(id[6])) {
                id[6] = ""
            }
            lastEcommerceOrderTs = id[6];
            if (!isDefined(currentEcommerceOrderTs)) {
                currentEcommerceOrderTs = ""
            }
            var charSet = document.characterSet || document.charset;
            if (!charSet || charSet.toLowerCase() === "utf-8") {
                charSet = null
            }
            campaignNameDetected = attributionCookie[0];
            campaignKeywordDetected = attributionCookie[1];
            referralTs = attributionCookie[2];
            referralUrl = attributionCookie[3];
            var _dmpa_ses_time = getCookie("_dmpa_ses_time");
            var newDate = new Date() - 0;
            if (!ses) {
                visitCount++;
                ses = hash(uuid + (new Date() - 0) + "" + Math.random());
                lastVisitTs = currentVisitTs;
                if (!configConversionAttributionFirstReferrer || !campaignNameDetected.length) {
                    for (i in configCampaignNameParameters) {
                        if (Object.prototype.hasOwnProperty.call(configCampaignNameParameters, i)) {
                            campaignNameDetected = getParameter(currentUrl, configCampaignNameParameters[i]);
                            if (campaignNameDetected.length) {
                                break
                            }
                        }
                    }
                    for (i in configCampaignKeywordParameters) {
                        if (Object.prototype.hasOwnProperty.call(configCampaignKeywordParameters, i)) {
                            campaignKeywordDetected = getParameter(currentUrl, configCampaignKeywordParameters[i]);
                            if (campaignKeywordDetected.length) {
                                break
                            }
                        }
                    }
                }
                currentReferrerHostName = getHostName(configReferrerUrl);
                originalReferrerHostName = referralUrl.length ? getHostName(referralUrl) : "";
                if (currentReferrerHostName.length && !isSiteHostName(currentReferrerHostName) && (!configConversionAttributionFirstReferrer || !originalReferrerHostName.length || isSiteHostName(originalReferrerHostName))) {
                    referralUrl = configReferrerUrl
                }
                if (referralUrl.length || campaignNameDetected.length) {
                    referralTs = nowTs;
                    attributionCookie = [campaignNameDetected, campaignKeywordDetected, referralTs, purify(referralUrl.slice(0, referralUrlMaxLength))];
                    setCookie(refname, JSON.stringify(attributionCookie), configReferralCookieTimeout, configCookiePath, configCookieDomain, cookieSecure)
                }
                setCookie("_dmpa_ses_time", newDate + configSessionCookieTimeout, configSessionCookieTimeout, configCookiePath, configCookieDomain, cookieSecure)
            }
            if (!_dmpa_ses_time) {
                setCookie("_dmpa_ses_time", newDate + configSessionCookieTimeout, configSessionCookieTimeout, configCookiePath, configCookieDomain, cookieSecure);
                ses = hash(uuid + newDate + "" + Math.random())
            } else {
                var timeMistake = newDate - _dmpa_ses_time;
                if (timeMistake > 0) {
                    ses = hash(uuid + newDate + "" + Math.random())
                }
                setCookie("_dmpa_ses_time", newDate + configSessionCookieTimeout, configSessionCookieTimeout, configCookiePath, configCookieDomain, cookieSecure)
            }
            pageId = pageId || hash(uuid + ses + newDate);

            function isLandingPage() {
                if (configReferrerUrl === "") {
                    return false
                }
                var referrerHost = getHostName(configReferrerUrl);
                var ret = /(\/\/)([^\/]*)(.*)/.exec(configReferrerUrl);
                var referrerPath = ret && ret[3] || "";
                return referrerHost != location.hostname || !(new RegExp(configCookiePath)).test(referrerPath)
            }

            if (request.action == "pv" && jalorPageForwardFlag4PV) {
                fields.page_hierarchy = null;
                jalorPageForwardFlag4PV = false
            }
            var hwaHier = (request.hier ? request.hier : configHierarchy);
            if (hwaHier == null || hwaHier == "") {
                if (request.action == "link-h") {
                    hwaHier = fields.page_hierarchy_before;
                    fields.page_hierarchy_before = null
                } else {
                    hwaHier = fields.page_hierarchy
                }
            }
            if (!/((c:{)|(c{)|(c\())(.*?)}/.test(hwaHier)) {
                if (fields.page_hierarchy != null && fields.page_hierarchy.match(/((c:{)|(c{)|(c\())(.*?)}/g) != null) {
                    var hwaPageHier = fields.page_hierarchy.match(/((c:{)|(c{)|(c\())(.*?)}/g)[0];
                    if (hwaPageHier != null) {
                        hwaHier = hwaPageHier + (hwaHier == null ? "" : hwaHier)
                    }
                } else {
                    if (isDefined(documentAlias.getElementById("hwa-page-hier"))) {
                        var hwaPageHier = getPageHierCurrent(documentAlias.getElementById("hwa-page-hier"));
                        if (hwaPageHier != null) {
                            hwaHier = hwaPageHier + (hwaHier == null ? "" : hwaHier)
                        }
                    }
                }
            }
            request.hier = hwaHier;
            if (request.action != "link-h") {
                fields.page_hierarchy = hwaHier
            } else {
                fields.page_hierarchy = null
            }
            var _bfdid_ = getbfdCookie();
            datasend = {
                action: request.action,
                idsite: configTrackerSiteId,
                hier: hwaHier,
                r: String(Math.random()).slice(2, 8),
                t: (request.action == "pv" ? dmpa_js_init_time : now - 0),
                tz: (-now.getTimezoneOffset() / 60),
                dt: configTitle,
                url: (request.action == "link-h" ? purify(urlBeforeHashChange) : purify(currentUrl)),
                urlref: (request.action == "link-h" ? purify(urlRefBeforeHashChange) : (configReferrerUrl.length ? purify(configReferrerUrl) : null)),
                blp: isLandingPage() ? 1 : 0,
                _idenc: visitorUUIDEncrypt,
                _id: uuid,
                _sid: ses,
                _pid: (request.action == "link-h" ? pageIdBeforeHashChange : pageId),
                _idts: createTs,
                _idvc: visitCount,
                _idn: newVisitor,
                _rcn: (campaignNameDetected.length ? campaignNameDetected : null),
                _rck: (campaignKeywordDetected.length ? campaignKeywordDetected : null),
                _refts: referralTs,
                _viewts: lastVisitTs,
                _ects: (String(lastEcommerceOrderTs).length ? lastEcommerceOrderTs : null),
                _ref: (String(referralUrl).length ? purify(referralUrl.slice(0, referralUrlMaxLength)) : null),
                cs: (charSet ? charSet : null),
                data: customData,
                _bfd_id: _bfdid_,
                user_id: request.user_id
            };
            if (fields.pageReadyTime) {
                try {
                    var now1 = new Date();
                    datasend.offset = now1.getTime() - fields.pageReadyTime
                } catch (ee1) {
                    datasend.offset = 0
                }
            }
            if (request.action && (request.action == "search" || request.action == "searchclick")) {
                datasend.ri1 = 10
            }
            if (request.action != "link-h") {
                mixin(datasend, mapData(fields))
            }
            mixin(datasend, request);
            if ((request.action == "pp" || request.action == "ajax-pp") && !configiFrameTrackingDisabled && !dis_parent && perf_ifrmae_succeed_flag) {
                var tempStructure, p;
                try {
                    p = windowAlias.performance.timing || windowAlias.webkitPerformance.timing;
                    if (p.loadEventEnd) {
                        duration = p.loadEventEnd - dmpa_js_init_time
                    } else {
                        duration = p.loadEventStart - dmpa_js_init_time
                    }
                } catch (e) {
                }
                if (request.action == "ajax-pp") {
                    duration = perf_ajaxpage_max_time - dmpa_js_init_time
                }
                if (window == top && hasiFrame) {
                    tempStructure = {
                        sid: ha_js_parent_sid,
                        pid: ha_js_parent_pid,
                        time: dmpa_js_init_time,
                        dur: duration,
                        istop: true
                    }
                }
                if (window !== top && !dis_parent && typeof ha_js_parent_sid == "string") {
                    tempStructure = {
                        sid: ha_js_parent_sid,
                        pid: ha_js_parent_pid,
                        time: dmpa_js_init_time,
                        dur: duration,
                        url: ha_js_parent_url
                    }
                }
                datasend.rv5 = JSON.stringify(tempStructure)
            }
            var customVariablesPageStringified = JSON.stringify(customVariablesPage);
            if (customVariablesPageStringified.length > 2) {
                datasend.cvar = customVariablesPageStringified
            }
            for (i in browserFeatures) {
                if (Object.prototype.hasOwnProperty.call(browserFeatures, i)) {
                    datasend[i] = browserFeatures[i]
                }
            }
            customData = customData || configCustomData;
            if (customData) {
                var sCustomData = JSON.stringify(customData);
                if (sCustomData.length < 4000) {
                    datasend.data = sCustomData
                }
            }
            if (customVariables) {
                var customVariablesStringified = JSON.stringify(customVariables);
                if (customVariablesStringified.length > 2) {
                    datasend._cvar = customVariablesStringified
                }
                for (i in customVariablesCopy) {
                    if (Object.prototype.hasOwnProperty.call(customVariablesCopy, i)) {
                        if (customVariables[i][0] === "" || customVariables[i][1] === "") {
                            delete customVariables[i]
                        }
                    }
                }
                setCookie(cvarname, JSON.stringify(customVariables), configSessionCookieTimeout, configCookiePath, configCookieDomain, cookieSecure)
            }
            if (request.action == "link-h") {
                pageIdBeforeHashChange = null
            }
            setVisitorIdCookie(uuid, createTs, visitCount, nowTs, lastVisitTs, isDefined(currentEcommerceOrderTs) && String(currentEcommerceOrderTs).length ? currentEcommerceOrderTs : lastEcommerceOrderTs);
            setCookie(sesname, ses, configSessionCookieTimeout, configCookiePath, configCookieDomain, cookieSecure);
            request = buildPayload(datasend);
            request += executePluginMethod(pluginMethod);
            return request
        }

        function logiFramePerf() {
            var i_error = 0, _topTimer, _childTimer;
            if (windowAlias !== top) {
                if (!configiFrameTrackingDisabled) {
                    top.postMessage({flag: "ifr_get"}, "*")
                }
                _childTimer = setInterval(function () {
                    if (!ha_js_parent_sid) {
                        top.postMessage({flag: "ifr_get"}, "*");
                        if ((i_error += 1) >= 10) {
                            perf_ifrmae_succeed_flag = true;
                            clearInterval(_childTimer)
                        }
                    }
                }, Math.ceil(Math.random() * 2000))
            } else {
                _topTimer = setInterval(function () {
                    if (hasiFrame) {
                        perf_ifrmae_succeed_flag = true;
                        clearInterval(_topTimer)
                    }
                }, 300);
                setTimeout(function () {
                    hasiFrame = false;
                    perf_ifrmae_succeed_flag = true;
                    clearInterval(_topTimer)
                }, 10000)
            }
            addEventListener(windowAlias, "message", function (event) {
                switch (event.data.flag) {
                    case"ifr_get":
                        var iFrameArray = [];
                        hasiFrame = true;
                        var parentMessage = {
                            ifr_siteId: ha_js_parent_sid,
                            ifr_pageId: ha_js_parent_pid,
                            ifr_time: dmpa_js_init_time,
                            ifr_url: document.location.href
                        };
                        if (configiFrameTrackingDisabled) {
                            parentMessage.flag = "ifr_dis"
                        } else {
                            parentMessage.flag = "ifr_set"
                        }
                        event.source.postMessage(parentMessage, event.origin);
                        break;
                    case"ifr_dis":
                        dis_parent = true;
                        perf_ifrmae_succeed_flag = true;
                        break;
                    case"ifr_set":
                        var urlPattern = new RegExp("[.xml]", "i");
                        if (urlPattern.test(document.referrer)) {
                            ha_js_parent_url = event.data.ifr_url
                        } else {
                            ha_js_parent_url = document.referrer
                        }
                        if (event.data.ifr_siteId) {
                            dmpa_js_init_time = event.data.ifr_time;
                            ha_js_parent_sid = event.data.ifr_siteId;
                            ha_js_parent_pid = event.data.ifr_pageId;
                            perf_ifrmae_succeed_flag = true;
                            dis_parent = false
                        }
                        break
                }
            }, false)
        }

        function logPerformance(customTitle, customData, dryrun) {
            if (!configiFrameTrackingDisabled && !perf_ifrmae_succeed_flag) {
                setTimeout(function () {
                    logPerformance(customTitle, customData, dryrun)
                }, 100);
                return
            } else {
                if (documentAlias.readyState != "complete") {
                    setTimeout(function () {
                        logPerformance(customTitle, customData, dryrun)
                    }, 100);
                    return
                }
            }
            perfInfo = perfInfo || getPerformance();
            if (!perfInfo || dryrun) {
                return
            }
            var request = getRequest(mixin(perfInfo, {action: "pp"}), customData, "performance");
            sendRequest(request, configTrackerPause)
        }

        function getJsonData() {
            var _bfd_cookie = getbfdCookie();
            if (_bfd_cookie) {
                _json.bfdid = _bfd_cookie
            } else {
            }
            return _json
        }

        function logPageView(data) {
            var now = new Date();
            fields.pageReadyTime = (new Date()).getTime();
            var _pv_timeout = 10;
            if (dmpa_source_this.parent != dmpa_source_this) {
                _pv_timeout = 1000
            }
            setTimeout(function () {
                var request = getRequest(mixin({action: "pv"}, mapData(data)), null, "log");
                sendRequest(request, configTrackerPause);
                try {
                    if (typeof Jalor !== "object" || typeof Jalor.Page !== "object") {
                        return
                    }
                    hwa_meld.before(Jalor.Page, ["forward", "_forward", "forwardMethod", "forwardIntervalMethod"], function (result) {
                        try {
                            urlBeforeHashChange = windowAlias.location.href;
                            pageIdBeforeHashChange = pageId;
                            urlRefBeforeHashChange = configReferrerUrl;
                            documentTileBeforeHashchange = configTitle
                        } catch (e) {
                        }
                    });
                    hwa_meld.after(Jalor.Page, ["forward", "_forward", "forwardMethod", "forwardIntervalMethod"], function (result) {
                        try {
                            if (((new Date().getTime() - dmpa_js_init_time) < 1000)) {
                                return
                            }
                            if (pageURLBeforeRegenerate != null && pageURLBeforeRegenerate == windowAlias.location.href) {
                                return
                            } else {
                                pageURLBeforeRegenerate = windowAlias.location.href
                            }
                            var sesname = getCookieName("ses"), _id = loadVisitorIdCookie(), _ses = getCookie(sesname),
                                _uuid = _id[1];
                            pageId = hash(_uuid + _ses + (new Date() - 0));
                            fields.referrer = urlBeforeHashChange;
                            configReferrerUrl = urlBeforeHashChange;
                            fields.url = windowAlias.location.href;
                            configCustomUrl = windowAlias.location.href;
                            configTitle = documentAlias.title;
                            fields.page_hierarchy_before = fields.page_hierarchy;
                            fields.page_hierarchy = null;
                            var haBIStructure = {};
                            jalorPageForwardFlag = true;
                            jalorPageForwardFlag4PV = true;
                            setTimeout(function () {
                                logPageView(haBIStructure)
                            }, 500);
                            asyn_pv_sendtime_dmpa = new Date().getTime();
                            perf_ajaxpage_firstloadtime = 0
                        } catch (e) {
                        }
                    })
                } catch (e) {
                }
            }, _pv_timeout)
        }

        function logSiteSearch(type, data) {
            type = type == "click" ? "searchclick" : "search";
            var request = getRequest(mixin({action: type}, mapData(data)), null, "sitesearch");
            sendRequest(request, configTrackerPause)
        }

        function logGoal(gData, data) {
            var request = getRequest(mixin(gData, {action: "goal"}, mapData(data)), null, "goal");
            sendRequest(request, configTrackerPause)
        }

        function logLink(url, linkType, customData) {
            customData.data = configCustomData;
            var request = getRequest(mixin(customData, {action: linkType}), null, "link");
            sendRequest(request, configTrackerPause)
        }

        function prefixPropertyName(prefix, propertyName) {
            if (prefix !== "") {
                return prefix + propertyName.charAt(0).toUpperCase() + propertyName.slice(1)
            }
            return propertyName
        }

        function trackCallback(callback) {
            var isPreRendered, i, prefixes = ["", "webkit", "ms", "moz"], prefix;
            if (!configCountPreRendered) {
                for (i = 0; i < prefixes.length; i++) {
                    prefix = prefixes[i];
                    if (Object.prototype.hasOwnProperty.call(documentAlias, prefixPropertyName(prefix, "hidden"))) {
                        if (documentAlias[prefixPropertyName(prefix, "visibilityState")] === "prerender") {
                            isPreRendered = true
                        }
                        break
                    }
                }
            }
            if (isPreRendered) {
                addEventListener(documentAlias, prefix + "visibilitychange", function ready() {
                    documentAlias.removeEventListener(prefix + "visibilitychange", ready, false);
                    callback()
                });
                return
            }
            callback()
        }

        function getClassesRegExp(configClasses, defaultClass) {
            var i, classesRegExp = "(^| )(hwa[_-]" + defaultClass;
            if (configClasses) {
                for (i = 0; i < configClasses.length; i++) {
                    classesRegExp += "|" + configClasses[i]
                }
            }
            classesRegExp += ")( |$)";
            return new RegExp(classesRegExp)
        }

        function getLinkType(className, href) {
            var downloadPattern = getClassesRegExp(configDownloadClasses, "download"),
                linkPattern = getClassesRegExp(configLinkClasses, "link"),
                downloadExtensionsPattern = new RegExp("\\.(" + configDownloadExtensions + ")([?&#]|$)", "i");
            return linkPattern.test(className) ? "link" : (downloadPattern.test(className) || downloadExtensionsPattern.test(href) ? "download" : "link")
        }

        function processClick(evt) {
            try {
                var parentElement, tag, linkType, _c = 3, sourceElement = evt.target || evt.srcElement,
                    sourceElementOrginal = evt.target || evt.srcElement, event = event || evt;
                var ignorePattern = getClassesRegExp([configHaIgnoreClass], "ignore");
                if (ignorePattern.test(sourceElement.className)) {
                    return
                }
                var hwaClickPattern = getClassesRegExp([configHaClickClass], "hwa-click");
                if (hwaClickPattern.test(sourceElement.className)) {
                    var attrs = sourceElement.attributes, target = sourceElement.target;
                    if (attrs) {
                        if (attrs["hwa-opr-wf"]) {
                            if (attrs["hwa-opr-wf-status"] && attrs["hwa-opr-wf-status"].value == "end") {
                                var now = new Date();
                                var wf = fields[attrs["hwa-opr-wf"].value] = fields[attrs["hwa-opr-wf"].value] || [];
                                var duration = 0;
                                if (wf.length > 0) {
                                    duration = now.getTime() - wf[0].t
                                }
                                wf.push({
                                    t: now.getTime(),
                                    opr: (attrs["hwa-func"] ? attrs["hwa-func"].value : ""),
                                    duration: duration
                                });
                                var doc = sourceElement.ownerDocument || document, body = doc.body;
                                doc = doc.documentElement;
                                var haBIStructure = {
                                    l_title: sourceElement.innerText ? sourceElement.innerText : sourceElement.title,
                                    l_href: sourceHref,
                                    l_target: target,
                                    l_html: sourceElement.innerHTML,
                                    pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                                    pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0))
                                };
                                haBIStructure.hier = getModuleHier(sourceElement);
                                haBIStructure.opr_wf_d = duration;
                                haBIStructure.opr_wf_n = attrs["hwa-opr-wf"].value;
                                haBIStructure.opr_wf_s = attrs["hwa-opr-wf-status"].value;
                                haBIStructure.data = wf;
                                logLink(sourceElement.href, "click", haBIStructure);
                                delete fields[attrs["hwa-opr-wf"].value];
                                return
                            } else {
                                var now = new Date();
                                var wf = fields[attrs["hwa-opr-wf"].value] = fields[attrs["hwa-opr-wf"].value] || [];
                                if (wf.length > 10) {
                                    delete fields[attrs["hwa-opr-wf"].value];
                                    return
                                }
                                wf.push({t: now.getTime(), opr: (attrs["hwa-func"] ? attrs["hwa-func"].value : "")});
                                return
                            }
                        } else {
                            if (attrs["hwa-biz-wf"]) {
                                var now = new Date();
                                var doc = sourceElement.ownerDocument || document, body = doc.body;
                                doc = doc.documentElement;
                                var haBIStructure = {
                                    l_title: sourceElement.innerText ? sourceElement.innerText : sourceElement.title,
                                    l_href: sourceHref,
                                    l_target: target,
                                    l_html: sourceElement.innerHTML,
                                    pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                                    pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0))
                                };
                                haBIStructure.hier = getModuleHier(sourceElement);
                                haBIStructure.biz_wf_n = attrs["hwa-biz-wf"].value;
                                haBIStructure.biz_wf_s_s = attrs["hwa-biz-wf-status"] ? attrs["hwa-biz-wf-status"].value : "";
                                haBIStructure.biz_wf_s_n = attrs["hwa-func"] ? attrs["hwa-func"].value : "";
                                logLink(sourceElement.href, "click", haBIStructure);
                                return
                            } else {
                                if (attrs["hwa-query-form"]) {
                                    var targetForm = attrs["hwa-query-form"].value;
                                    if (!targetForm) {
                                        return
                                    }
                                    var doc = sourceElement.ownerDocument || document, body = doc.body;
                                    doc = doc.documentElement;
                                    var fills = [];
                                    var hwaforms = document.getElementsByTagName("form");
                                    var queryForm = null;
                                    if (!hwaforms || hwaforms.length < 1) {
                                        return
                                    }
                                    for (var i = 0; i < hwaforms.length; i++) {
                                        if (hwaforms[i] && hwaforms[i].attributes["hwa-query-form-name"] && targetForm == hwaforms[i].attributes["hwa-query-form-name"].value && typeof document.getElementsByClassName != "undefined") {
                                            var hwaFill = hwaforms[i].getElementsByClassName("hwa-query-fill");
                                            for (var j = 0; j < hwaFill.length; j++) {
                                                var i_id = hwaFill[j].attributes.id != null ? hwaFill[j].attributes.id.value : "";
                                                var i_name = hwaFill[j].attributes.name != null ? hwaFill[j].attributes.name.value : "";
                                                var i_value = hwaFill[j].value != null ? hwaFill[j].value : "";
                                                var i_ele = {};
                                                i_ele.id = i_id;
                                                i_ele.name = i_name;
                                                i_ele.value = i_value;
                                                fills.push(i_ele)
                                            }
                                            break
                                        }
                                    }
                                    var haBIStructure = {
                                        l_title: sourceElement.innerText ? sourceElement.innerText : null,
                                        l_html: sourceElement.innerHTML,
                                        pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                                        pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                                        rv1: sourceElementOrginal.attributes.id != null ? sourceElementOrginal.attributes.id.value : null,
                                        rv2: sourceElementOrginal.attributes.name != null ? sourceElementOrginal.attributes.name.value : null,
                                        data: JSON.stringify(fills)
                                    };
                                    haBIStructure.hier = getModuleHier(sourceElement);
                                    logLink(sourceElement.href, "click-query", haBIStructure);
                                    return
                                } else {
                                    var doc = sourceElement.ownerDocument || document, body = doc.body;
                                    doc = doc.documentElement;
                                    var haBIStructure = {
                                        l_title: sourceElement.innerText ? sourceElement.innerText : sourceElement.title,
                                        l_href: sourceHref,
                                        l_target: target,
                                        l_html: sourceElement.innerHTML,
                                        pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                                        pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0))
                                    };
                                    haBIStructure.hier = getModuleHier(sourceElement);
                                    logLink(sourceElement.href, "click", haBIStructure);
                                    return
                                }
                            }
                        }
                    }
                    return
                }
                while ((parentElement = sourceElement.parentNode) !== null && isDefined(parentElement) && ((tag = sourceElement.tagName.toUpperCase()) !== "A" && tag !== "AREA") && _c--) {
                    sourceElement = parentElement
                }
                if (isDefined(sourceElement.href) && sourceElement.href != "" && ((tag = sourceElement.tagName.toUpperCase()) == "A" || tag == "AREA")) {
                    var originalSourceHostName = sourceElement.hostname || getHostName(sourceElement.href),
                        sourceHostName = originalSourceHostName.toLowerCase(),
                        sourceHref = sourceElement.href.replace(originalSourceHostName, sourceHostName);
                    var attrs = sourceElement.attributes, target = sourceElement.target,
                        onclick = sourceElement.onclick;
                    if (attrs) {
                        var doc = sourceElement.ownerDocument || document, body = doc.body;
                        doc = doc.documentElement;
                        var custHWMicroFormatPattern = /^habi:(\w+)/i, haBIStructure = {
                            l_title: ((sourceElement.title != null && sourceElement.title != "") ? sourceElement.title : sourceElement.innerText),
                            l_href: sourceHref,
                            l_target: target,
                            l_html: sourceElement.innerHTML,
                            pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                            pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0))
                        }, result;
                        for (i = 0; i < sourceElement.attributes.length; i += 1) {
                            result = custHWMicroFormatPattern.exec(sourceElement.attributes[i].nodeName);
                            if (result) {
                                var _name = result[1].toLowerCase();
                                var _value = attrs[i].value;
                                if (_name == "data") {
                                    result = {};
                                    try {
                                        result = JSON.parse(_value)
                                    } catch (e) {
                                    }
                                    haBIStructure.data = result
                                }
                                var _pTitlePattern = /^parenttitle([1-3]?)$/i;
                                var _pTitleIdPattern = /^parenttitleid([1-3]?)$/i;
                                var match;
                                if (_name === "title") {
                                    haBIStructure.title = _value
                                } else {
                                    if (_name === "titleid") {
                                        var ele = documentAlias.getElementById(_value);
                                        if (ele) {
                                            haBIStructure.title = ele.childNodes[0].value.replace(/\n/g, "")
                                        }
                                    } else {
                                        if ((match = _pTitlePattern.exec(_name))) {
                                            if (match[1].length < 1) {
                                                haBIStructure.pTitleL3 = _value
                                            } else {
                                                haBIStructure["pTitleL" + match[1]] = _value
                                            }
                                        } else {
                                            if (match = _pTitleIdPattern.exec(_name)) {
                                                var ele = documentAlias.getElementById(_value);
                                                if (ele) {
                                                    if (match[1].length < 1) {
                                                        haBIStructure.pTitleL3 = ele.childNodes[0].value.replace(/\n/g, "")
                                                    } else {
                                                        haBIStructure["pTitleL" + match[1]] = ele.childNodes[0].value.replace(/\n/g, "")
                                                    }
                                                }
                                            } else {
                                                if (_name === "btype") {
                                                    haBIStructure.l_type = _value
                                                } else {
                                                    if (_name === "datacallback") {
                                                        if (_value && _value.length > 0) {
                                                            var custDataFunc = eval(_value);
                                                            if (isFunction(custDataFunc)) {
                                                                var custData = custDataFunc.apply(sourceElement);
                                                                if (isObject(custData)) {
                                                                    haBIStructure = mixin(haBIStructure, custData)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    linkType = getLinkType(sourceElement.className, sourceHref);
                    if (linkType) {
                        sourceHref = urldecode(sourceHref);
                        logLink(sourceHref, linkType, haBIStructure);
                        var href = sourceElement.getAttribute("href");
                        if ((!target || target == "_self") && href.indexOf("#") != 0 && href != location.href && href != (location.href + "#")) {
                            if (onclick != null && (onclick.toString().indexOf("return(false)") > -1 || onclick.toString().indexOf("return false") > -1 || onclick.toString().indexOf("return  false")) > -1) {
                            } else {
                            }
                        }
                    }
                    return
                }
                if (isDefined(sourceElement.target) && (sourceElement.target == "_self" || sourceElement.target == "_blank") && ((tag = sourceElement.tagName.toUpperCase()) == "A" || tag == "AREA")) {
                    var originalSourceHostName = sourceElement.hostname || getHostName(sourceElement.href),
                        sourceHostName = originalSourceHostName.toLowerCase(),
                        sourceHref = sourceElement.href.replace(originalSourceHostName, sourceHostName);
                    var doc = sourceElement.ownerDocument || document, body = doc.body;
                    doc = doc.documentElement;
                    haBIStructure = {
                        l_title: ((sourceElement.title != null && sourceElement.title != "") ? sourceElement.title : sourceElement.innerText),
                        l_target: target,
                        l_html: sourceElement.innerHTML,
                        pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                        pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0))
                    };
                    if (jalorPageForwardFlag) {
                        setTimeout(function () {
                            haBIStructure.l_href = windowAlias.location.href;
                            logLink(null, "link-h", haBIStructure);
                            return
                        }, 500)
                    } else {
                        logLink(null, "link", haBIStructure);
                        jalorPageForwardFlag = false
                    }
                }
                if (sourceElementOrginal.tagName.toUpperCase() === "BUTTON" || (sourceElementOrginal.tagName.toUpperCase() === "INPUT" && sourceElementOrginal.type.toUpperCase() === "BUTTON")) {
                    var doc = sourceElement.ownerDocument || document, body = doc.body;
                    doc = doc.documentElement;
                    var title_t;
                    if (sourceElementOrginal.title != null && sourceElementOrginal.title != "") {
                        title_t = sourceElementOrginal.title
                    } else {
                        if (sourceElementOrginal.attributes.value != null && sourceElementOrginal.attributes.value.value) {
                            title_t = sourceElementOrginal.attributes.value.value
                        } else {
                            title_t = sourceElementOrginal.innerText.substr(0, 100)
                        }
                    }
                    haBIStructure = {
                        l_title: title_t,
                        l_target: target,
                        l_html: sourceElementOrginal.outerHTML.substr(0, 500),
                        pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                        pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                        t_d_1: "button",
                        rv1: sourceElementOrginal.attributes.id != null ? sourceElementOrginal.attributes.id.value : null,
                        rv2: sourceElementOrginal.attributes.name != null ? sourceElementOrginal.attributes.name.value : null
                    };
                    logLink("", "click", haBIStructure);
                    return
                }
                if ("trackAll" === fields.trackType) {
                    var doc = sourceElement.ownerDocument || document, body = doc.body;
                    doc = doc.documentElement;
                    var title_t;
                    if (sourceElementOrginal.title != null && sourceElementOrginal.title != "") {
                        title_t = sourceElementOrginal.title
                    } else {
                        if (sourceElementOrginal.attributes.value != null && sourceElementOrginal.attributes.value.value) {
                            title_t = sourceElementOrginal.attributes.value.value
                        } else {
                            title_t = sourceElementOrginal.innerText.substr(0, 100)
                        }
                    }
                    haBIStructure = {
                        l_title: title_t,
                        l_target: target,
                        l_html: sourceElementOrginal.outerHTML.substr(0, 500),
                        pagex: event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)),
                        pagey: event.pageY || (event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                        rv1: sourceElementOrginal.attributes.id != null ? sourceElementOrginal.attributes.id.value : null,
                        rv2: sourceElementOrginal.attributes.name != null ? sourceElementOrginal.attributes.name.value : null,
                        rv3: sourceElementOrginal.attributes.value != null ? sourceElementOrginal.attributes.value.value : null
                    };
                    logLink("", "click-trackall", haBIStructure);
                    return
                }
            } catch (e) {
            }
        }

        function processKeydown(evt) {
            if ("trackAll" === fields.trackType && (evt.keyCode == 13 || evt.keyCode == 9)) {
                try {
                    var sourceElement = evt.target || evt.srcElement, event = event || evt;
                    var doc = sourceElement.ownerDocument || document, body = doc.body;
                    doc = doc.documentElement;
                    var title_t;
                    if (sourceElement.title != null && sourceElement.title != "") {
                        title_t = sourceElement.title
                    } else {
                        if (sourceElement.attributes.value != null && sourceElement.attributes.value.value) {
                            title_t = sourceElement.attributes.value.value
                        } else {
                            title_t = sourceElement.innerText.substr(0, 100)
                        }
                    }
                    var haBIStructure = {
                        l_title: title_t,
                        l_target: sourceElement.target,
                        l_html: sourceElement.outerHTML.substr(0, 500),
                        pagex: getElementX(sourceElement),
                        pagey: getElementY(sourceElement),
                        rv1: sourceElement.attributes.id != null ? sourceElement.attributes.id.value : null,
                        rv2: sourceElement.attributes.name != null ? sourceElement.attributes.name.value : null,
                        rv3: sourceElement.attributes.value != null ? sourceElement.attributes.value.value : null
                    };
                    var request = getRequest(mixin({action: "keydown_" + evt.keyCode}, haBIStructure));
                    sendRequest(request, configTrackerPause)
                } catch (e) {
                }
            }
        }

        function getElementX(sourceElement) {
            return sourceElement.getBoundingClientRect().left + Math.max(sourceElement.scrollLeft, document.body.scrollLeft)
        }

        function getElementY(sourceElement) {
            return sourceElement.getBoundingClientRect().top + Math.max(sourceElement.scrollTop, document.body.scrollTop)
        }

        function getModuleHier(sourceElement) {
            try {
                var parent = sourceElement, hwaParentClass = getClassesRegExp("hwa-dc", "dc");
                var levels = [], modules = [], tabs = [], func, module_hier;
                for (var i = 0; i < 20; i++) {
                    if (!isDefined(parent) || parent == null) {
                        break
                    }
                    if (parent.className != null && hwaParentClass.test(parent.className)) {
                        if (levels.length < 6 && isDefined(parent.attributes["hwa-hier"])) {
                            levels.push((parent.attributes["hwa-hier"].value || parent.attributes["hwa-hier"]))
                        }
                        if (modules.length < 3 && isDefined(parent.attributes["hwa-module"])) {
                            modules.push((parent.attributes["hwa-module"].value || parent.attributes["hwa-module"]))
                        }
                        if (tabs.length < 3 && isDefined(parent.attributes["hwa-tab"])) {
                            tabs.push((parent.attributes["hwa-tab"].value || parent.attributes["hwa-tab"]))
                        }
                    }
                    parent = parent.parentElement
                }
                var levels_t;
                for (var i = levels.length; i > 0; i--) {
                    levels_t = (levels_t == null ? "" : levels_t) + levels.pop() + "/"
                }
                if (levels_t != null) {
                    module_hier = "c:{" + levels_t + "}"
                }
                var modules_t;
                for (var i = modules.length; i > 0; i--) {
                    modules_t = (modules_t == null ? "" : modules_t) + modules.pop() + "/"
                }
                if (modules_t != null) {
                    module_hier = "g:{" + modules_t + "}"
                }
                var tabs_t;
                for (var i = tabs.length; i > 0; i--) {
                    tabs_t = (tabs_t == null ? "" : tabs_t) + tabs.pop() + "/"
                }
                if (tabs_t != null) {
                    module_hier = (module_hier == null ? "" : module_hier) + "t:{" + tabs_t + "}"
                }
                if (func == null && isDefined(sourceElement.attributes["hwa-func"])) {
                    func = "f:{" + (sourceElement.attributes["hwa-func"].value || sourceElement.attributes["hwa-func"]) + "}"
                }
                return (module_hier == null ? "" : module_hier) + func
            } catch (e) {
            }
        }

        function getPageHierCurrent(sourceElement) {
            try {
                var parentTemp = sourceElement;
                if (!isDefined(parentTemp) || parentTemp == null) {
                    return
                }
                var page_hier;
                if (isDefined(parentTemp.attributes["hwa-hier"])) {
                    page_hier = "c:{" + (parentTemp.attributes["hwa-hier"].value || parentTemp.attributes["hwa-hier"]) + "}"
                }
                return page_hier
            } catch (e) {
            }
        }

        function addClickListener(element, enable) {
            if (!linkTrackingInstalled) {
                linkTrackingInstalled = true;
                addEventListener(documentAlias, "click", processClick, false);
                addEventListener(windowAlias, "keydown", processKeydown, false)
            }
        }

        function _getFlashVersion() {
            var a, b, c;
            if ((c = (c = window.navigator) ? c.plugins : da) && c.length) {
                for (var d = 0; d < c.length && !b; d++) {
                    var e = c[d];
                    -1 < e.name["indexOf"]("Shockwave Flash") && (b = e.description)
                }
            }
            if (!b) {
                try {
                    a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a.GetVariable("$version")
                } catch (g) {
                }
            }
            if (!b) {
                try {
                    a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = "WIN 6,0,21,0", a.AllowScriptAccess = "always", b = a.GetVariable("$version")
                } catch (ca) {
                }
            }
            if (!b) {
                try {
                    a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), b = a.GetVariable("$version")
                } catch (l) {
                }
            }
            b && (a = b.match(/[\d]+/g)) && 3 <= a.length && (b = a[0] + "." + a[1] + " r" + a[2]);
            return b || ""
        }

        function detectBrowserFeatures() {
            var i, mimeType, pluginMap = {
                    pdf: "application/pdf",
                    qt: "video/quicktime",
                    realp: "audio/x-pn-realaudio-plugin",
                    wma: "application/x-mplayer2",
                    dir: "application/x-director",
                    fla: "application/x-shockwave-flash",
                    java: "application/x-java-vm",
                    gears: "application/x-googlegears",
                    ag: "application/x-silverlight"
                },
                devicePixelRatio = (new RegExp("Mac OS X.*Safari/")).test(navigatorAlias.userAgent) ? windowAlias.devicePixelRatio || 1 : 1;
            if (navigatorAlias.mimeTypes && navigatorAlias.mimeTypes.length) {
                for (i in pluginMap) {
                    if (Object.prototype.hasOwnProperty.call(pluginMap, i)) {
                        mimeType = navigatorAlias.mimeTypes[pluginMap[i]];
                        browserFeatures[i] = (mimeType && mimeType.enabledPlugin) ? "1" : "0"
                    }
                }
            }
            if (typeof navigator.javaEnabled !== "unknown" && isDefined(navigatorAlias.javaEnabled) && navigatorAlias.javaEnabled()) {
                browserFeatures.java = "1"
            }
            if (isFunction(windowAlias.GearsFactory)) {
                browserFeatures.gears = "1"
            }
            if (!browserFeatures.fla) {
                var _flav = _getFlashVersion();
                if (_flav) {
                    browserFeatures.fla = "1"
                }
            }
            browserFeatures.cookie = hasCookies();
            browserFeatures.res = screenAlias.width * devicePixelRatio + "x" + screenAlias.height * devicePixelRatio
        }

        function registerHook(hookName, userHook) {
            var hookObj = null;
            if (isString(hookName) && !isDefined(registeredHooks[hookName]) && userHook) {
                if (isObject(userHook)) {
                    hookObj = userHook
                } else {
                    if (isString(userHook)) {
                        try {
                            eval("hookObj =" + userHook)
                        } catch (e) {
                        }
                    }
                }
                registeredHooks[hookName] = hookObj
            }
            return hookObj
        }

        detectBrowserFeatures();
        executePluginMethod("run", registerHook);
        return {
            hook: registeredHooks, getHook: function (hookName) {
                return registeredHooks[hookName]
            }, set: function (name, value) {
                if (typeof name == "object") {
                    configCustomData = name.data;
                    mixin(fields, name);
                    if (name.siteId && windowAlias == top) {
                        ha_js_parent_sid = fields.siteId
                    }
                } else {
                    if (typeof name == "string") {
                        fields[name] = value;
                        if (name == "siteId" && windowAlias == top) {
                            ha_js_parent_sid = fields.siteId
                        }
                    }
                }
            }, get: function (name) {
                return fields[name]
            }, getVisitorId: function () {
                return (loadVisitorIdCookie())[1]
            }, getVisitorInfo: function () {
                return loadVisitorIdCookie()
            }, getAttributionInfo: function () {
                return loadReferrerAttributionCookie()
            }, getAttributionCampaignName: function () {
                return loadReferrerAttributionCookie()[0]
            }, getAttributionCampaignKeyword: function () {
                return loadReferrerAttributionCookie()[1]
            }, getAttributionReferrerTimestamp: function () {
                return loadReferrerAttributionCookie()[2]
            }, getAttributionReferrerUrl: function () {
                return loadReferrerAttributionCookie()[3]
            }, setSiteId: function (siteId) {
                configTrackerSiteId = siteId;
                if (windowAlias == top) {
                    ha_js_parent_sid = siteId
                }
            }, setHierarchy: function (hierarchy) {
                configHierarchy = hierarchy
            }, setUUID: function (uuid, encrypt) {
                visitorUUID = uuid;
                visitorUUIDEncrypt = encrypt
            }, setCustomData: function (key_or_obj, opt_value) {
                if (isObject(key_or_obj)) {
                    configCustomData = key_or_obj
                } else {
                    if (!configCustomData) {
                        configCustomData = []
                    }
                    configCustomData[key_or_obj] = opt_value
                }
            }, getCustomData: function () {
                return configCustomData
            }, setCustomVariable: function (index, name, value, scope) {
                var toRecord;
                if (!isDefined(scope)) {
                    scope = "visit"
                }
                if (index > 0) {
                    name = isDefined(name) && !isString(name) ? String(name) : name;
                    value = isDefined(value) && !isString(value) ? String(value) : value;
                    toRecord = [name.slice(0, customVariableMaximumLength), value.slice(0, customVariableMaximumLength)];
                    if (scope === "visit" || scope === 2) {
                        loadCustomVariables();
                        customVariables[index] = toRecord
                    } else {
                        if (scope === "page" || scope === 3) {
                            customVariablesPage[index] = toRecord
                        }
                    }
                }
            }, getCustomVariable: function (index, scope) {
                var cvar;
                if (!isDefined(scope)) {
                    scope = "visit"
                }
                if (scope === "page" || scope === 3) {
                    cvar = customVariablesPage[index]
                } else {
                    if (scope === "visit" || scope === 2) {
                        loadCustomVariables();
                        cvar = customVariables[index]
                    }
                }
                if (!isDefined(cvar) || (cvar && cvar[0] === "")) {
                    return false
                }
                return cvar
            }, deleteCustomVariable: function (index, scope) {
                if (this.getCustomVariable(index, scope)) {
                    this.setCustomVariable(index, "", "", scope)
                }
            }, setLinkTrackingTimer: function (delay) {
                configTrackerPause = delay
            }, setDownloadExtensions: function (extensions) {
                configDownloadExtensions = extensions
            }, addDownloadExtensions: function (extensions) {
                configDownloadExtensions += "|" + extensions
            }, setDomains: function (hostsAlias) {
                configHostsAlias = isString(hostsAlias) ? [hostsAlias] : hostsAlias;
                configHostsAlias.push(domainAlias)
            }, setIgnoreClasses: function (ignoreClasses) {
                configIgnoreClasses = isString(ignoreClasses) ? [ignoreClasses] : ignoreClasses
            }, setRequestMethod: function (method) {
                configRequestMethod = method || "GET"
            }, setReferrerUrl: function (url) {
                configReferrerUrl = url
            }, getReferrerUrl: function () {
                return configReferrerUrl
            }, setCustomUrl: function (url) {
                configCustomUrl = resolveRelativeReference(locationHrefAlias, url)
            }, getCurrentUrl: function () {
                return configCustomUrl || locationHrefAlias
            }, setDocumentTitle: function (title) {
                configTitle = title
            }, getDocumentTitle: function () {
                return configTitle
            }, setDownloadClasses: function (downloadClasses) {
                configDownloadClasses = isString(downloadClasses) ? [downloadClasses] : downloadClasses
            }, setLinkClasses: function (linkClasses) {
                configLinkClasses = isString(linkClasses) ? [linkClasses] : linkClasses
            }, setCampaignNameKey: function (campaignNames) {
                configCampaignNameParameters = isString(campaignNames) ? [campaignNames] : campaignNames
            }, setCampaignKeywordKey: function (campaignKeywords) {
                configCampaignKeywordParameters = isString(campaignKeywords) ? [campaignKeywords] : campaignKeywords
            }, discardHashTag: function (enableFilter) {
                configDiscardHashTag = enableFilter
            }, setCookieNamePrefix: function (cookieNamePrefix) {
                configCookieNamePrefix = cookieNamePrefix;
                customVariables = getCustomVariablesFromCookie()
            }, setCookieDomain: function (domain) {
                configCookieDomain = domainFixup(domain)
            }, setCookiePath: function (path) {
                configCookiePath = path
            }, setVisitorCookieTimeout: function (timeout) {
                configVisitorCookieTimeout = timeout * 1000
            }, setSessionCookieTimeout: function (timeout) {
                configSessionCookieTimeout = timeout * 1000
            }, setReferralCookieTimeout: function (timeout) {
                configReferralCookieTimeout = timeout * 1000
            }, setConversionAttributionFirstReferrer: function (enable) {
                configConversionAttributionFirstReferrer = enable
            }, disableCookies: function () {
                configCookiesDisabled = true;
                browserFeatures.cookie = "0"
            }, disableiFrameTracking: function (flag) {
                configiFrameTrackingDisabled = flag;
                if (configiFrameTrackingDisabled) {
                    ha_js_parent_sid = null
                } else {
                    if (windowAlias == top) {
                        ha_js_parent_sid = fields.siteId
                    }
                }
            }, setDoNotTrack: function (enable) {
                var dnt = navigatorAlias.doNotTrack || navigatorAlias.msDoNotTrack;
                configDoNotTrack = enable && (dnt === "yes" || dnt === "1");
                if (configDoNotTrack) {
                    this.disableCookies()
                }
            }, addListener: function (element, enable) {
                addClickListener(element, enable)
            }, enableLinkTracking: function () {
                if (hasLoaded) {
                    addClickListener()
                } else {
                    registeredOnLoadHandlers.push(function () {
                        addClickListener()
                    })
                }
            }, setHeartBeatTimer: function (minimumVisitLength, heartBeatDelay) {
                var now = new Date();
                configMinimumVisitTime = now.getTime() + minimumVisitLength * 1000;
                configHeartBeatTimer = heartBeatDelay * 1000
            }, killFrame: function () {
                if (windowAlias.location !== windowAlias.top.location) {
                    windowAlias.top.location = windowAlias.location
                }
            }, redirectFile: function (url) {
                if (windowAlias.location.protocol === "file:") {
                    windowAlias.location = url
                }
            }, setCountPreRendered: function (enable) {
                configCountPreRendered = enable
            }, setAutoSendPV: function (flag) {
                autoSendPV = flag
            }, setAutoLinkTracking: function (flag) {
                autoLinkTracking = flag
            }, trackGoal: function (idGoal, customRevenue, data) {
                trackCallback(function () {
                    logGoal({idgoal: idGoal, revenue: customRevenue}, data)
                })
            }, trackEvent: function (etype, data) {
                trackCallback(function () {
                    var request = getRequest(mixin({action: etype}, mapData(data)));
                    sendRequest(request, configTrackerPause)
                })
            }, trackLink: function (sourceUrl, linkType, customData) {
                trackCallback(function () {
                    logLink(sourceUrl, linkType, customData)
                })
            }, trackPageView: function (data) {
                if (isOverlaySession(configTrackerSiteId)) {
                    trackCallback(function () {
                        injectOverlayScripts(configTrackerUrl, configApiUrl, configTrackerSiteId)
                    })
                } else {
                    trackCallback(function () {
                        logPageView(data)
                    })
                }
            }, trackAjax: function (data) {
                if (typeof g_hwa_disable_trackajax != "undefined" && g_hwa_disable_trackajax == true) {
                    return
                }
                if (window.addEventListener && window.XMLHttpRequest) {
                    var _XMLHttpRequest = window.XMLHttpRequest;
                    window.XMLHttpRequest = function () {
                        var e, req, startTime, _open, _send, _datalist, _isignore_url;
                        req = new _XMLHttpRequest;
                        try {
                            _open = req.open;
                            req.open = function (type, url, async) {
                                if (!perf_url_ignore_p.test(url)) {
                                    var e;
                                    try {
                                        startTime = null;
                                        _datalist = {};
                                        var s_begin = function (_event) {
                                            try {
                                                var dur, codeMapping;
                                                codeMapping = {
                                                    1: "sending",
                                                    2: "headers",
                                                    3: "waiting",
                                                    4: "receiving"
                                                };
                                                if (startTime == null) {
                                                    startTime = new Date().getTime()
                                                }
                                                if (req.readyState == 2) {
                                                    var _now = new Date().getTime();
                                                    _datalist.st = startTime;
                                                    _datalist.url = url;
                                                    if (perf_ajaxpage_firstloadtime == 0 && _now - asyn_pv_sendtime_dmpa < 5000) {
                                                        req.ajaxpage_flag = 1;
                                                        perf_ajaxpage_in = ++perf_ajaxpage_in;
                                                        if (perf_ajaxpage_min_time == 0) {
                                                            perf_ajaxpage_min_time = startTime
                                                        }
                                                        ajaxthreshold_time = ((perf_ajaxpage_firstloadtime - asyn_pv_sendtime_dmpa) > 2000) ? 5000 : 3000
                                                    } else {
                                                        if (perf_ajaxpage_firstloadtime > 0 && (_now - perf_ajaxpage_firstloadtime <= ajaxthreshold_time)) {
                                                            req.ajaxpage_flag = 1;
                                                            perf_ajaxpage_in = ++perf_ajaxpage_in
                                                        }
                                                    }
                                                    return
                                                }
                                                if (startTime == null) {
                                                    return
                                                }
                                                dur = new Date().getTime() - startTime;
                                                (_datalist[codeMapping[req.readyState]]) = dur
                                            } catch (e) {
                                            }
                                        };
                                        req.addEventListener("readystatechange", s_begin, false);
                                        var s_end = function () {
                                            try {
                                                if (typeof _datalist != "undefined" && typeof _datalist.url != "undefined") {
                                                    var _now = new Date().getTime();
                                                    _datalist.tt = (_now - startTime);
                                                    if (perf_ajaxpage_firstloadtime == 0) {
                                                        perf_ajaxpage_firstloadtime = _now
                                                    }
                                                    if (req.ajaxpage_flag == 1) {
                                                        perf_ajaxpage_out = ++perf_ajaxpage_out;
                                                        perf_ajaxpage_max_time = _now
                                                    }
                                                    perf_event_q.push(_datalist);
                                                    if (perf_send_status == "sleeping") {
                                                        perf_send_status = "ready";
                                                        setTimeout(sendPerfQueue, 4000)
                                                    }
                                                }
                                            } catch (e) {
                                            }
                                        };
                                        req.addEventListener("loadend", s_end, false)
                                    } catch (_error) {
                                        e = _error;
                                        hwaLog("HWA error monitoring XHR open call->" + e.message)
                                    }
                                }
                                return _open.apply(req, arguments)
                            };
                            _send = req.send;
                            req.send = function () {
                                return _send.apply(req, arguments)
                            }
                        } catch (_error) {
                            e = _error;
                            hwaLog("HWA error monitoring XHR->" + e.message)
                        }
                        return req
                    }
                } else {
                    if (typeof $ != "undefined" || typeof jQuery != "undefined") {
                        try {
                            var _jq = (typeof $ != "undefined" && $(document) != null && typeof $(document).ajaxSend == "function") ? $ : jQuery;
                            if (_jq && typeof _jq(document).ajaxSend == "function") {
                                _jq(document).ajaxSend(function (a, b, c) {
                                    try {
                                        if (!perf_url_ignore_p.test(c.url)) {
                                            var _now = new Date().getTime();
                                            if (perf_ajaxpage_firstloadtime == 0 && _now - asyn_pv_sendtime_dmpa < 5000) {
                                                c.ajaxpage_flag = 1;
                                                perf_ajaxpage_in = ++perf_ajaxpage_in;
                                                if (perf_ajaxpage_min_time == 0) {
                                                    perf_ajaxpage_min_time = _now
                                                }
                                                ajaxthreshold_time = ((perf_ajaxpage_firstloadtime - asyn_pv_sendtime_dmpa) > 2000) ? 5000 : 3000
                                            } else {
                                                if (perf_ajaxpage_firstloadtime > 0 && (_now - perf_ajaxpage_firstloadtime <= ajaxthreshold_time)) {
                                                    c.ajaxpage_flag = 1;
                                                    perf_ajaxpage_in = ++perf_ajaxpage_in
                                                }
                                            }
                                            c.st = _now
                                        }
                                    } catch (e) {
                                    }
                                });
                                _jq(document).ajaxComplete(function (a, b, c) {
                                    try {
                                        if (!perf_url_ignore_p.test(c.url)) {
                                            var _now = new Date().getTime();
                                            var _dur = _now - c.st;
                                            if (perf_ajaxpage_firstloadtime == 0) {
                                                perf_ajaxpage_firstloadtime = _now
                                            }
                                            var haBIStructure = {url: c.url, st: c.st, tt: _dur};
                                            if (c.ajaxpage_flag == 1) {
                                                perf_ajaxpage_out = ++perf_ajaxpage_out;
                                                perf_ajaxpage_max_time = _now
                                            }
                                            if (typeof _dur == "number") {
                                                perf_event_q.push(haBIStructure);
                                                if (perf_send_status == "sleeping") {
                                                    perf_send_status = "ready";
                                                    setTimeout(sendPerfQueue, 4000)
                                                }
                                            }
                                        }
                                    } catch (e) {
                                    }
                                })
                            }
                        } catch (e) {
                        }
                    }
                }
            }, trackPerformance: function (customTitle, customData, dryrun) {
                if (!isOverlaySession(configTrackerSiteId)) {
                    trackCallback(function () {
                        logPerformance(customTitle, null, dryrun)
                    })
                }
            }, trackiFramePerformance: function () {
                logiFramePerf()
            }, trackSiteSearch: function (type, data) {
                trackCallback(function () {
                    logSiteSearch(type, data)
                })
            }, getNewPageId: function () {
                var sesname = getCookieName("ses"), id = loadVisitorIdCookie(), ses = getCookie(sesname), uuid = id[1];
                return hash(uuid + ses + (new Date() - 0))
            }, f: [], execQ: function (aArgs) {
                var exec = function (args) {
                    try {
                        var method = args[0];
                        if (this[method] && this[method].apply) {
                            method !== "exec" && this[method].apply(this, [].slice.call(args, 1));
                            return !0
                        }
                    } catch (e) {
                    }
                };
                aArgs = this.f.concat(aArgs);
                for (this.f = []; aArgs.length > 0; aArgs.shift()) {
                    !exec.call(this, aArgs[0]) && this.f.push(aArgs[0])
                }
            }
        }
    }

    addEventListener(windowAlias, "beforeunload", beforeUnloadHandler, false);
    addReadyListener();
    Date.prototype.getTimeAlias = Date.prototype.getTime;
    asyncTracker = new Tracker();
    asyncTracker.execQ(windowAlias.dmpa.q);
    asyncTracker.trackiFramePerformance();
    setTimeout(function () {
        if (autoSendPV) {
            asyncTracker.trackPageView();
            asyncTracker.trackPerformance(null, null)
        }
    }, 0);
    if (autoLinkTracking) {
        asyncTracker.enableLinkTracking()
    }
    asyncTracker.trackAjax();
    windowAlias.dmpa = function () {
        asyncTracker.execQ([arguments])
    };
    return {
        addPlugin: function (pluginName, pluginObj) {
            plugins[pluginName] = pluginObj
        }, getTracker: function (piwikUrl, siteId) {
            return new Tracker(piwikUrl, siteId)
        }, getAsyncTracker: function () {
            return asyncTracker
        }
    }
}());