var $namespace = function (d, g, b) {
    var f = d.split(g || "."), h = b || window, e, a;
    for (e = 0, a = f.length; e < a; e++) {
        h = h[f[e]] = h[f[e]] || {}
    }
    return h
};
var $type = function (a, b) {
    if (!a instanceof b) {
        throw new SyntaxError()
    }
};
if (!$) {
    var $ = function (a) {
        return document.getElementById(a)
    }
}
if (!Array.prototype.each) {
    Array.prototype.each = function (a) {
        if (typeof a != "function") {
            throw"Illegal Argument for Array.each"
        }
        for (var b = 0; b < this.length; b++) {
            a(this[b])
        }
    }
}
if (!Array.prototype.contains) {
    Array.prototype.contains = function (b) {
        var a = false;
        this.each(function (d) {
            if ((b.equals && b.equals(d)) || d == b) {
                a = true;
                return
            }
        });
        return a
    }
}
if (!Array.prototype.containsKey) {
    Array.prototype.containsKey = function (b) {
        for (var a in this) {
            if (a.toLowerCase() == b.toLowerCase()) {
                return true
            }
        }
        return false
    }
}
if (!Array.prototype.getCaseInsensitive) {
    Array.prototype.getCaseInsensitive = function (b) {
        for (var a in this) {
            if (a.toLowerCase() == b.toLowerCase()) {
                return this[a]
            }
        }
        return null
    }
}
if (!String.prototype.charCodeAt) {
    String.prototype.charCodeAt = function (a) {
        var e = this.charAt(a);
        for (var b = 0; b < 65536; b++) {
            var d = String.fromCharCode(b);
            if (d == e) {
                return b
            }
        }
        return 0
    }
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (a) {
        return this.substr((this.length - a.length), a.length) == a
    }
}
if (!Exception) {
    var Exception = function (a, b) {
        this.cause = b;
        this.errorMessage = a
    };
    Exception.prototype = Error.prototype;
    Exception.prototype.getCause = function () {
        return this.cause
    };
    Exception.prototype.getMessage = function () {
        return this.message
    };
    Exception.prototype.getStackTrace = function () {
        if (this.callstack) {
            return this.callstack
        }
        if (this.stack) {
            var b = stack.split("\n");
            for (var d = 0, a = b.length; d < a; d++) {
                if (b[d].match(/^\s*[A-Za-z0-9\=+\$]+\(/)) {
                    this.callstack.push(b[d])
                }
            }
            this.callstack.shift();
            return this.callstack
        } else {
            if (window.opera && this.message) {
                var b = this.message.split("\n");
                for (var d = 0, a = b.length; d < a; d++) {
                    if (b[d].match(/^\s*[A-Za-z0-9\=+\$]+\(/)) {
                        var f = b[d];
                        if (b[d + 1]) {
                            f += " at " + b[d + 1];
                            d++
                        }
                        this.callstack.push(f)
                    }
                }
                this.callstack.shift();
                return this.callstack
            } else {
                var g = arguments.callee.caller;
                while (g) {
                    var e = g.toString();
                    var h = e.substring(e.indexOf("function") + 8, e.indexOf("(")) || "anonymous";
                    this.callstack.push(h);
                    g = g.caller
                }
                return this.callstack
            }
        }
    };
    Exception.prototype.printStackTrace = function (b) {
        var a = this.getMessage() + "|||" + this.getStackTrace().join("|||");
        if (this.cause) {
            if (this.cause.printStackTrace) {
                a += "||||||Caused by " + this.cause.printStackTrace().replace("\n", "|||")
            }
        }
        if (!b) {
            return b.replace("|||", "\n")
        } else {
            if (b.value) {
                b.value = a.replace("|||", "\n")
            } else {
                if (b.writeln) {
                    b.writeln(a.replace("|||", "\n"))
                } else {
                    if (b.innerHTML) {
                        b.innerHTML = a.replace("|||", "<br/>")
                    } else {
                        if (b.innerText) {
                            b.innerText = a.replace("|||", "<br/>")
                        } else {
                            if (b.append) {
                                b.append(a.replace("|||", "\n"))
                            } else {
                                if (b instanceof Function) {
                                    b(a.replace("|||", "\n"))
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
if (!RuntimeException) {
    var RuntimeException = Exception
}
if (!IllegalArgumentException) {
    var IllegalArgumentException = Exception
}
if (!DateFormat) {
    var DateFormat = function (d) {
        var b = d;
        var a = {
            longMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            longDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            d: function (e) {
                return (e.getDate() < 10 ? "0" : "") + e.getDate()
            },
            D: function (e) {
                return a.shortDays[e.getDay()]
            },
            j: function (e) {
                return e.getDate()
            },
            l: function (e) {
                return a.longDays[e.getDay()]
            },
            N: function (e) {
                return e.getDay() + 1
            },
            S: function (e) {
                return (e.getDate() % 10 == 1 && e.getDate() != 11 ? "st" : (e.getDate() % 10 == 2 && e.getDate() != 12 ? "nd" : (e.getDate() % 10 == 3 && e.getDate() != 13 ? "rd" : "th")))
            },
            w: function (e) {
                return e.getDay()
            },
            z: function (e) {
                return "Not Yet Supported"
            },
            W: function (e) {
                return "Not Yet Supported"
            },
            F: function (e) {
                return a.longMonths[e.getMonth()]
            },
            m: function (e) {
                return (e.getMonth() < 9 ? "0" : "") + (e.getMonth() + 1)
            },
            M: function (e) {
                return a.shortMonths[e.getMonth()]
            },
            n: function (e) {
                return e.getMonth() + 1
            },
            t: function (e) {
                return "Not Yet Supported"
            },
            L: function (e) {
                return (((e.getFullYear() % 4 == 0) && (e.getFullYear() % 100 != 0)) || (e.getFullYear() % 400 == 0)) ? "1" : "0"
            },
            o: function (e) {
                return "Not Supported"
            },
            Y: function (e) {
                return e.getFullYear()
            },
            y: function (e) {
                return ("" + e.getFullYear()).substr(2)
            },
            a: function (e) {
                return e.getHours() < 12 ? "am" : "pm"
            },
            A: function (e) {
                return e.getHours() < 12 ? "AM" : "PM"
            },
            B: function (e) {
                return "Not Yet Supported"
            },
            g: function (e) {
                return e.getHours() % 12 || 12
            },
            G: function (e) {
                return e.getHours()
            },
            h: function (e) {
                return ((e.getHours() % 12 || 12) < 10 ? "0" : "") + (e.getHours() % 12 || 12)
            },
            H: function (e) {
                return (e.getHours() < 10 ? "0" : "") + e.getHours()
            },
            i: function (e) {
                return (e.getMinutes() < 10 ? "0" : "") + e.getMinutes()
            },
            s: function (e) {
                return (e.getSeconds() < 10 ? "0" : "") + e.getSeconds()
            },
            e: function (e) {
                return "Not Yet Supported"
            },
            I: function (e) {
                return "Not Supported"
            },
            O: function (e) {
                return (-e.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(e.getTimezoneOffset() / 60) < 10 ? "0" : "") + (Math.abs(e.getTimezoneOffset() / 60)) + "00"
            },
            P: function (e) {
                return (-e.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(e.getTimezoneOffset() / 60) < 10 ? "0" : "") + (Math.abs(e.getTimezoneOffset() / 60)) + ":" + (Math.abs(e.getTimezoneOffset() % 60) < 10 ? "0" : "") + (Math.abs(e.getTimezoneOffset() % 60))
            },
            T: function (g) {
                var f = g.getMonth();
                g.setMonth(0);
                var e = g.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1");
                g.setMonth(f);
                return e
            },
            Z: function (e) {
                return -e.getTimezoneOffset() * 60
            },
            c: function (e) {
                return e.format("Y-m-d") + "T" + e.format("H:i:sP")
            },
            r: function (e) {
                return e.toString()
            },
            U: function (e) {
                return e.getTime() / 1000
            }
        };
        return {
            format: function (g) {
                var e = "";
                for (var f = 0; f < b.length; f++) {
                    var h = b.charAt(f);
                    if (a[h]) {
                        e += a[h].call(g)
                    } else {
                        e += h
                    }
                }
                return e
            }
        }
    };
    DateFormat.getDateInstance = function () {
        return new DateFormat("M/d/y h:i a")
    }
}
$namespace("org.owasp.esapi");
org.owasp.esapi.ESAPI = function (g) {
    var b = g;
    if (!b) {
        throw new RuntimeException("Configuration Error - Unable to load $ESAPI_Properties Object")
    }
    var a = null;
    var e = null;
    var d = null;
    var f = null;
    var h = null;
    return {
        properties: b, encoder: function () {
            if (!a) {
                if (!b.encoder.Implementation) {
                    throw new RuntimeException("Configuration Error - $ESAPI.properties.encoder.Implementation object not found.")
                }
                a = new b.encoder.Implementation()
            }
            return a
        }, logFactory: function () {
            if (!d) {
                if (!b.logging.Implementation) {
                    throw new RuntimeException("Configuration Error - $ESAPI.properties.logging.Implementation object not found.")
                }
                d = new b.logging.Implementation()
            }
            return d
        }, logger: function (i) {
            return this.logFactory().getLogger(i)
        }, locale: function () {
            return org.owasp.esapi.i18n.Locale.getLocale(b.localization.DefaultLocale)
        }, resourceBundle: function () {
            if (!f) {
                if (!b.localization.StandardResourceBundle) {
                    throw new RuntimeException("Configuration Error - $ESAPI.properties.localization.StandardResourceBundle not found.")
                }
                f = new org.owasp.esapi.i18n.ObjectResourceBundle(b.localization.StandardResourceBundle)
            }
            return f
        }, validator: function () {
            if (!e) {
                if (!b.validation.Implementation) {
                    throw new RuntimeException("Configuration Error - $ESAPI.properties.validation.Implementation object not found.")
                }
                e = new b.validation.Implementation()
            }
            return e
        }, httpUtilities: function () {
            if (!h) {
                h = new org.owasp.esapi.HTTPUtilities()
            }
            return h
        }
    }
};
var $ESAPI = null;
org.owasp.esapi.ESAPI.initialize = function () {
    $ESAPI = new org.owasp.esapi.ESAPI(Base.esapi.properties)
};
$namespace("org.owasp.esapi");
org.owasp.esapi.Encoder = function () {
};
$namespace("org.owasp.esapi");
org.owasp.esapi.EncoderConstants = {
    CHAR_LOWERS: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    CHAR_UPPERS: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    CHAR_DIGITS: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    CHAR_SPECIALS: ["!", "$", "*", "+", "-", ".", "=", "?", "@", "^", "_", "|", "~"],
    CHAR_LETTERS: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    CHAR_ALNUM: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
};
$namespace("org.owasp.esapi");
org.owasp.esapi.EnterpriseSecurityException = function (b, a, e) {
    var f = a;
    var d = new Exception(b, e);
    return {
        getMessage: d.getMessage, getUserMessage: d.getMessage, getLogMessage: function () {
            return f
        }, getStackTrace: d.getStackTrace, printStackTrace: d.printStackTrace
    }
};
$namespace("org.owasp.esapi");
org.owasp.esapi.HTTPUtilities = function () {
    var b = $ESAPI.logger("HTTPUtilities");
    var d = $ESAPI.resourceBundle();
    var a = org.owasp.esapi.Logger.EventType;
    return {
        addCookie: function (h) {
            $type(h, org.owasp.esapi.net.Cookie);
            if (window.top.location.protocol != "http:" || window.top.location.protocol != "https:") {
                throw new RuntimeException(d.getString("HTTPUtilities.Cookie.Protocol", {protocol: window.top.location.protocol}))
            }
            var f = h.getName(), m = h.getValue(), k = h.getMaxAge(), i = h.getDomain(), p = h.getPath(),
                e = h.getSecure();
            var n = new org.owasp.esapi.ValidationErrorList();
            var l = $ESAPI.validator().getValidInput("cookie name", f, "HttpCookieName", 50, false, n);
            var g = $ESAPI.validator().getValidInput("cookie value", m, "HttpCookieValue", 5000, false, n);
            if (n.size() == 0) {
                var j = f + "=" + escape(m);
                j += k ? ";expires=" + (new Date((new Date()).getTime() + (1000 * k)).toGMTString()) : "";
                j += p ? ";path=" + p : "";
                j += i ? ";domain=" + i : "";
                j += e || $ESAPI.properties.httputilities.cookies.ForceSecure ? ";secure" : "";
                document.cookie = j
            } else {
                b.warning(a.SECURITY_FAILURE, d.getString("HTTPUtilities.Cookie.UnsafeData", {name: f, value: m}))
            }
        }, getCookie: function (j) {
            var f = document.cookie.split("; ");
            for (var h = 0, e = f.length; h < e; h++) {
                var g = f[h].split("=");
                if (g[0] == escape(j)) {
                    return new org.owasp.esapi.net.Cookie(j, g[1] ? unescape(g[1]) : "")
                }
            }
            return null
        }, killAllCookies: function () {
            var f = document.cookie.split("; ");
            for (var j = 0, e = f.length; j < e; j++) {
                var h = f[j].split("=");
                var g = unescape(h[0]);
                if (!this.killCookie(g)) {
                    throw new RuntimeException(d.getString("HTTPUtilities.Cookie.CantKill", {name: g}))
                }
            }
        }, killCookie: function (e) {
            var f = this.getCookie(e);
            if (f) {
                f.setMaxAge(-10);
                this.addCookie(f);
                if (this.getCookie(e)) {
                    throw new RuntimeException(d.getString("HTTPUtilities.Cookie.CantKill", {name: e}))
                }
                return true
            }
            return false
        }, getRequestParameter: function (f) {
            var e = window.top.location.search.substring(1);
            var g = e.indexOf(f);
            if (g < 0) {
                return null
            }
            g = g + f.length;
            var h = e.indexOf("&", g);
            if (h < 0) {
                h = e.length
            }
            return unescape(e.substring(g, h))
        }
    }
};
$namespace("org.owasp.esapi");
org.owasp.esapi.IntrusionException = function (d, b, a) {
    var e = new org.owasp.esapi.EnterpriseSecurityException(d, b, a);
    return {
        getMessage: e.getMessage,
        getUserMessage: e.getMessage,
        getLogMessage: e.getLogMessage,
        getStackTrace: e.getStackTrace,
        printStackTrace: e.printStackTrace
    }
};
$namespace("org.owasp.esapi");
org.owasp.esapi.LogFactory = function () {
    return {getLogger: false}
};
$namespace("org.owasp.esapi");
org.owasp.esapi.Logger = function () {
    return {
        setLevel: false,
        fatal: false,
        error: false,
        isErrorEnabled: false,
        warning: false,
        isWarningEnabled: false,
        info: false,
        isInfoEnabled: false,
        debug: false,
        isDebugEnabled: false,
        trace: false,
        isTraceEnabled: false
    }
};
org.owasp.esapi.Logger.EventType = function (d, b) {
    var a = d;
    var e = b;
    return {
        isSuccess: function () {
            return e
        }, toString: function () {
            return a
        }
    }
};
with (org.owasp.esapi.Logger) {
    EventType.SECURITY_SUCCESS = new EventType("SECURITY SUCCESS", true);
    EventType.SECURITY_FAILURE = new EventType("SECURITY FAILURE", false);
    EventType.EVENT_SUCCESS = new EventType("EVENT SUCCESS", true);
    EventType.EVENT_FAILURE = new EventType("EVENT FAILURE", false);
    OFF = Number.MAX_VALUE;
    FATAL = 1000;
    ERROR = 800;
    WARNING = 600;
    INFO = 400;
    DEBUG = 200;
    TRACE = 100;
    ALL = Number.MIN_VALUE
}
$namespace("org.owasp.esapi");
org.owasp.esapi.PreparedString = function (d, a, g) {
    var f = [];
    var e = [];

    function b(k) {
        var h = 0, l = 0;
        for (var j = 0; j < k.length; j++) {
            if (k.charAt(j) == g) {
                l++;
                f.push(k.substr(h, j));
                h = j + 1
            }
        }
        f.push(k.substr(h));
        e = new Array(l)
    }

    if (!g) {
        g = "?"
    }
    b(d);
    return {
        set: function (h, j, i) {
            if (h < 1 || h > e.length) {
                throw new IllegalArgumentException("Attempt to set parameter: " + h + " on a PreparedString with only " + e.length + " placeholders")
            }
            if (!i) {
                i = a
            }
            e[h - 1] = i.encode([], j)
        }, toString: function () {
            for (var h = 0; h < e.length; h++) {
                if (e[h] == null) {
                    throw new RuntimeException("Attempt to render PreparedString without setting parameter " + (h + 1))
                }
            }
            var j = "", k = 0;
            for (var l = 0; l < f.length; l++) {
                j += f[l];
                if (k < e.length) {
                    j += e[k++]
                }
            }
            return j
        }
    }
};
$namespace("org.owasp.esapi");
org.owasp.esapi.ValidationErrorList = function () {
    var a = Array();
    return {
        addError: function (b, d) {
            if (b == null) {
                throw new RuntimeException("Context cannot be null: " + d.getLogMessage(), d)
            }
            if (d == null) {
                throw new RuntimeException("Context (" + b + ") - Error cannot be null")
            }
            if (a[b]) {
                throw new RuntimeException("Context (" + b + ") already exists. must be unique.")
            }
            a[b] = d
        }, errors: function () {
            return a
        }, isEmpty: function () {
            return a.length == 0
        }, size: function () {
            return a.length
        }
    }
};
$namespace("org.owasp.esapi");
org.owasp.esapi.ValidationRule = function () {
    return {
        getValid: false,
        setAllowNull: false,
        getTypeName: false,
        setTypeName: false,
        setEncoder: false,
        assertValid: false,
        getSafe: false,
        isValid: false,
        whitelist: false
    }
};
$namespace("org.owasp.esapi");
org.owasp.esapi.Validator = function () {
    return {
        addRule: false,
        getRule: false,
        getValidInput: false,
        isValidDate: false,
        getValidDate: false,
        isValidSafeHTML: false,
        getValidSafeHTML: false,
        isValidCreditCard: false,
        getValidCreditCard: false,
        isValidFilename: false,
        getValidFilename: false,
        isValidNumber: false,
        getValidNumber: false,
        isValidPrintable: false,
        getValidPrintable: false
    }
};
$namespace("org.owasp.esapi.codecs.Base64");
org.owasp.esapi.codecs.Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (h) {
        if (!h) {
            return null
        }
        var e = "";
        var d, b, a, m, l, k, j;
        var f = 0;
        var g = org.owasp.esapi.codecs.UTF8.encode(h);
        while (f < g.length) {
            d = g.charCodeAt(f++);
            b = g.charCodeAt(f++);
            a = g.charCodeAt(f++);
            m = d >> 2;
            l = ((d & 3) << 4) | (b >> 4);
            k = ((b & 15) << 2) | (a >> 6);
            j = a & 63;
            if (isNaN(b)) {
                k = j = 64
            } else {
                if (isNaN(a)) {
                    j = 64
                }
            }
            e += this._keyStr.charAt(m) + this._keyStr.charAt(l) + this._keyStr.charAt(k) + this._keyStr.charAt(j)
        }
        return e
    },
    decode: function (h) {
        if (!h) {
            return null
        }
        var e = "";
        var d, b, a, m, l, k, j;
        var f = 0;
        var g = h.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < g.length) {
            m = this._keyStr.indexOf(g.charAt(f++));
            l = this._keyStr.indexOf(g.charAt(f++));
            k = this._keyStr.indexOf(g.charAt(f++));
            j = this._keyStr.indexOf(g.charAt(f++));
            d = (m << 2) | (l >> 4);
            b = ((l & 15) << 4) | (k >> 2);
            a = ((k & 3) << 6) | j;
            e += String.fromCharCode(d);
            if (k != 64) {
                e += String.fromCharCode(b)
            }
            if (j != 64) {
                e += String.fromCharCode(a)
            }
        }
        e = org.owasp.esapi.codecs.UTF8.decode(e);
        return e
    }
};
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.CSSCodec = function () {
    var a = new org.owasp.esapi.codecs.Codec();
    return {
        encode: a.encode, decode: a.decode, encodeCharacter: function (b, e) {
            if (b.contains(e)) {
                return e
            }
            var d = org.owasp.esapi.codecs.Codec.getHexForNonAlphanumeric(e);
            if (d == null) {
                return e
            }
            return "\\" + d + " "
        }, decodeCharacter: function (l) {
            l.mark();
            var h = l.next();
            if (h == null) {
                l.reset();
                return null
            }
            if (h != "\\") {
                l.reset();
                return null
            }
            var d = l.next();
            if (d == null) {
                l.reset();
                return null
            }
            if (l.isHexDigit(d)) {
                var b = d;
                for (var f = 0; f < 6; f++) {
                    var k = l.next();
                    if (k == null || k.charCodeAt(0) == 32) {
                        break
                    }
                    if (l.isHexDigit(k)) {
                        b += k
                    } else {
                        input.pushback(k);
                        break
                    }
                }
                try {
                    var j = parseInt(b, 16);
                    return String.fromCharCode(j)
                } catch (g) {
                    l.reset();
                    return null
                }
            }
            return d
        }
    }
};
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.Codec = function () {
    return {
        encode: function (d, e) {
            var a = "";
            for (var b = 0; b < e.length; b++) {
                var f = e.charAt(b);
                a += this.encodeCharacter(d, f)
            }
            return a
        }, encodeCharacter: function (a, b) {
            return b
        }, decode: function (b) {
            var a = "";
            var d = new org.owasp.esapi.codecs.PushbackString(b);
            while (d.hasNext()) {
                var e = this.decodeCharacter(d);
                if (e != null) {
                    a += e
                } else {
                    a += d.next()
                }
            }
            return a
        }, decodeCharacter: function (a) {
            return a.next()
        }
    }
};
org.owasp.esapi.codecs.Codec.getHexForNonAlphanumeric = function (a) {
    if (a.charCodeAt(0) < 256) {
        return org.owasp.esapi.codecs.Codec.hex[a.charCodeAt(0)]
    }
    return a.charCodeAt(0).toString(16)
};
org.owasp.esapi.codecs.Codec.hex = [];
for (var c = 0; c < 255; c++) {
    if (c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122) {
        org.owasp.esapi.codecs.Codec.hex[c] = null
    } else {
        org.owasp.esapi.codecs.Codec.hex[c] = c.toString(16)
    }
}
var entityToCharacterMap = [];
entityToCharacterMap["&quot"] = "34";
entityToCharacterMap["&amp"] = "38";
entityToCharacterMap["&lt"] = "60";
entityToCharacterMap["&gt"] = "62";
entityToCharacterMap["&nbsp"] = "160";
entityToCharacterMap["&iexcl"] = "161";
entityToCharacterMap["&cent"] = "162";
entityToCharacterMap["&pound"] = "163";
entityToCharacterMap["&curren"] = "164";
entityToCharacterMap["&yen"] = "165";
entityToCharacterMap["&brvbar"] = "166";
entityToCharacterMap["&sect"] = "167";
entityToCharacterMap["&uml"] = "168";
entityToCharacterMap["&copy"] = "169";
entityToCharacterMap["&ordf"] = "170";
entityToCharacterMap["&laquo"] = "171";
entityToCharacterMap["&not"] = "172";
entityToCharacterMap["&shy"] = "173";
entityToCharacterMap["&reg"] = "174";
entityToCharacterMap["&macr"] = "175";
entityToCharacterMap["&deg"] = "176";
entityToCharacterMap["&plusmn"] = "177";
entityToCharacterMap["&sup2"] = "178";
entityToCharacterMap["&sup3"] = "179";
entityToCharacterMap["&acute"] = "180";
entityToCharacterMap["&micro"] = "181";
entityToCharacterMap["&para"] = "182";
entityToCharacterMap["&middot"] = "183";
entityToCharacterMap["&cedil"] = "184";
entityToCharacterMap["&sup1"] = "185";
entityToCharacterMap["&ordm"] = "186";
entityToCharacterMap["&raquo"] = "187";
entityToCharacterMap["&frac14"] = "188";
entityToCharacterMap["&frac12"] = "189";
entityToCharacterMap["&frac34"] = "190";
entityToCharacterMap["&iquest"] = "191";
entityToCharacterMap["&Agrave"] = "192";
entityToCharacterMap["&Aacute"] = "193";
entityToCharacterMap["&Acirc"] = "194";
entityToCharacterMap["&Atilde"] = "195";
entityToCharacterMap["&Auml"] = "196";
entityToCharacterMap["&Aring"] = "197";
entityToCharacterMap["&AElig"] = "198";
entityToCharacterMap["&Ccedil"] = "199";
entityToCharacterMap["&Egrave"] = "200";
entityToCharacterMap["&Eacute"] = "201";
entityToCharacterMap["&Ecirc"] = "202";
entityToCharacterMap["&Euml"] = "203";
entityToCharacterMap["&Igrave"] = "204";
entityToCharacterMap["&Iacute"] = "205";
entityToCharacterMap["&Icirc"] = "206";
entityToCharacterMap["&Iuml"] = "207";
entityToCharacterMap["&ETH"] = "208";
entityToCharacterMap["&Ntilde"] = "209";
entityToCharacterMap["&Ograve"] = "210";
entityToCharacterMap["&Oacute"] = "211";
entityToCharacterMap["&Ocirc"] = "212";
entityToCharacterMap["&Otilde"] = "213";
entityToCharacterMap["&Ouml"] = "214";
entityToCharacterMap["&times"] = "215";
entityToCharacterMap["&Oslash"] = "216";
entityToCharacterMap["&Ugrave"] = "217";
entityToCharacterMap["&Uacute"] = "218";
entityToCharacterMap["&Ucirc"] = "219";
entityToCharacterMap["&Uuml"] = "220";
entityToCharacterMap["&Yacute"] = "221";
entityToCharacterMap["&THORN"] = "222";
entityToCharacterMap["&szlig"] = "223";
entityToCharacterMap["&agrave"] = "224";
entityToCharacterMap["&aacute"] = "225";
entityToCharacterMap["&acirc"] = "226";
entityToCharacterMap["&atilde"] = "227";
entityToCharacterMap["&auml"] = "228";
entityToCharacterMap["&aring"] = "229";
entityToCharacterMap["&aelig"] = "230";
entityToCharacterMap["&ccedil"] = "231";
entityToCharacterMap["&egrave"] = "232";
entityToCharacterMap["&eacute"] = "233";
entityToCharacterMap["&ecirc"] = "234";
entityToCharacterMap["&euml"] = "235";
entityToCharacterMap["&igrave"] = "236";
entityToCharacterMap["&iacute"] = "237";
entityToCharacterMap["&icirc"] = "238";
entityToCharacterMap["&iuml"] = "239";
entityToCharacterMap["&eth"] = "240";
entityToCharacterMap["&ntilde"] = "241";
entityToCharacterMap["&ograve"] = "242";
entityToCharacterMap["&oacute"] = "243";
entityToCharacterMap["&ocirc"] = "244";
entityToCharacterMap["&otilde"] = "245";
entityToCharacterMap["&ouml"] = "246";
entityToCharacterMap["&divide"] = "247";
entityToCharacterMap["&oslash"] = "248";
entityToCharacterMap["&ugrave"] = "249";
entityToCharacterMap["&uacute"] = "250";
entityToCharacterMap["&ucirc"] = "251";
entityToCharacterMap["&uuml"] = "252";
entityToCharacterMap["&yacute"] = "253";
entityToCharacterMap["&thorn"] = "254";
entityToCharacterMap["&yuml"] = "255";
entityToCharacterMap["&OElig"] = "338";
entityToCharacterMap["&oelig"] = "339";
entityToCharacterMap["&Scaron"] = "352";
entityToCharacterMap["&scaron"] = "353";
entityToCharacterMap["&Yuml"] = "376";
entityToCharacterMap["&fnof"] = "402";
entityToCharacterMap["&circ"] = "710";
entityToCharacterMap["&tilde"] = "732";
entityToCharacterMap["&Alpha"] = "913";
entityToCharacterMap["&Beta"] = "914";
entityToCharacterMap["&Gamma"] = "915";
entityToCharacterMap["&Delta"] = "916";
entityToCharacterMap["&Epsilon"] = "917";
entityToCharacterMap["&Zeta"] = "918";
entityToCharacterMap["&Eta"] = "919";
entityToCharacterMap["&Theta"] = "920";
entityToCharacterMap["&Iota"] = "921";
entityToCharacterMap["&Kappa"] = "922";
entityToCharacterMap["&Lambda"] = "923";
entityToCharacterMap["&Mu"] = "924";
entityToCharacterMap["&Nu"] = "925";
entityToCharacterMap["&Xi"] = "926";
entityToCharacterMap["&Omicron"] = "927";
entityToCharacterMap["&Pi"] = "928";
entityToCharacterMap["&Rho"] = "929";
entityToCharacterMap["&Sigma"] = "931";
entityToCharacterMap["&Tau"] = "932";
entityToCharacterMap["&Upsilon"] = "933";
entityToCharacterMap["&Phi"] = "934";
entityToCharacterMap["&Chi"] = "935";
entityToCharacterMap["&Psi"] = "936";
entityToCharacterMap["&Omega"] = "937";
entityToCharacterMap["&alpha"] = "945";
entityToCharacterMap["&beta"] = "946";
entityToCharacterMap["&gamma"] = "947";
entityToCharacterMap["&delta"] = "948";
entityToCharacterMap["&epsilon"] = "949";
entityToCharacterMap["&zeta"] = "950";
entityToCharacterMap["&eta"] = "951";
entityToCharacterMap["&theta"] = "952";
entityToCharacterMap["&iota"] = "953";
entityToCharacterMap["&kappa"] = "954";
entityToCharacterMap["&lambda"] = "955";
entityToCharacterMap["&mu"] = "956";
entityToCharacterMap["&nu"] = "957";
entityToCharacterMap["&xi"] = "958";
entityToCharacterMap["&omicron"] = "959";
entityToCharacterMap["&pi"] = "960";
entityToCharacterMap["&rho"] = "961";
entityToCharacterMap["&sigmaf"] = "962";
entityToCharacterMap["&sigma"] = "963";
entityToCharacterMap["&tau"] = "964";
entityToCharacterMap["&upsilon"] = "965";
entityToCharacterMap["&phi"] = "966";
entityToCharacterMap["&chi"] = "967";
entityToCharacterMap["&psi"] = "968";
entityToCharacterMap["&omega"] = "969";
entityToCharacterMap["&thetasym"] = "977";
entityToCharacterMap["&upsih"] = "978";
entityToCharacterMap["&piv"] = "982";
entityToCharacterMap["&ensp"] = "8194";
entityToCharacterMap["&emsp"] = "8195";
entityToCharacterMap["&thinsp"] = "8201";
entityToCharacterMap["&zwnj"] = "8204";
entityToCharacterMap["&zwj"] = "8205";
entityToCharacterMap["&lrm"] = "8206";
entityToCharacterMap["&rlm"] = "8207";
entityToCharacterMap["&ndash"] = "8211";
entityToCharacterMap["&mdash"] = "8212";
entityToCharacterMap["&lsquo"] = "8216";
entityToCharacterMap["&rsquo"] = "8217";
entityToCharacterMap["&sbquo"] = "8218";
entityToCharacterMap["&ldquo"] = "8220";
entityToCharacterMap["&rdquo"] = "8221";
entityToCharacterMap["&bdquo"] = "8222";
entityToCharacterMap["&dagger"] = "8224";
entityToCharacterMap["&Dagger"] = "8225";
entityToCharacterMap["&bull"] = "8226";
entityToCharacterMap["&hellip"] = "8230";
entityToCharacterMap["&permil"] = "8240";
entityToCharacterMap["&prime"] = "8242";
entityToCharacterMap["&Prime"] = "8243";
entityToCharacterMap["&lsaquo"] = "8249";
entityToCharacterMap["&rsaquo"] = "8250";
entityToCharacterMap["&oline"] = "8254";
entityToCharacterMap["&frasl"] = "8260";
entityToCharacterMap["&euro"] = "8364";
entityToCharacterMap["&image"] = "8365";
entityToCharacterMap["&weierp"] = "8472";
entityToCharacterMap["&real"] = "8476";
entityToCharacterMap["&trade"] = "8482";
entityToCharacterMap["&alefsym"] = "8501";
entityToCharacterMap["&larr"] = "8592";
entityToCharacterMap["&uarr"] = "8593";
entityToCharacterMap["&rarr"] = "8594";
entityToCharacterMap["&darr"] = "8595";
entityToCharacterMap["&harr"] = "8596";
entityToCharacterMap["&crarr"] = "8629";
entityToCharacterMap["&lArr"] = "8656";
entityToCharacterMap["&uArr"] = "8657";
entityToCharacterMap["&rArr"] = "8658";
entityToCharacterMap["&dArr"] = "8659";
entityToCharacterMap["&hArr"] = "8660";
entityToCharacterMap["&forall"] = "8704";
entityToCharacterMap["&part"] = "8706";
entityToCharacterMap["&exist"] = "8707";
entityToCharacterMap["&empty"] = "8709";
entityToCharacterMap["&nabla"] = "8711";
entityToCharacterMap["&isin"] = "8712";
entityToCharacterMap["&notin"] = "8713";
entityToCharacterMap["&ni"] = "8715";
entityToCharacterMap["&prod"] = "8719";
entityToCharacterMap["&sum"] = "8721";
entityToCharacterMap["&minus"] = "8722";
entityToCharacterMap["&lowast"] = "8727";
entityToCharacterMap["&radic"] = "8730";
entityToCharacterMap["&prop"] = "8733";
entityToCharacterMap["&infin"] = "8734";
entityToCharacterMap["&ang"] = "8736";
entityToCharacterMap["&and"] = "8743";
entityToCharacterMap["&or"] = "8744";
entityToCharacterMap["&cap"] = "8745";
entityToCharacterMap["&cup"] = "8746";
entityToCharacterMap["&int"] = "8747";
entityToCharacterMap["&there4"] = "8756";
entityToCharacterMap["&sim"] = "8764";
entityToCharacterMap["&cong"] = "8773";
entityToCharacterMap["&asymp"] = "8776";
entityToCharacterMap["&ne"] = "8800";
entityToCharacterMap["&equiv"] = "8801";
entityToCharacterMap["&le"] = "8804";
entityToCharacterMap["&ge"] = "8805";
entityToCharacterMap["&sub"] = "8834";
entityToCharacterMap["&sup"] = "8835";
entityToCharacterMap["&nsub"] = "8836";
entityToCharacterMap["&sube"] = "8838";
entityToCharacterMap["&supe"] = "8839";
entityToCharacterMap["&oplus"] = "8853";
entityToCharacterMap["&otimes"] = "8855";
entityToCharacterMap["&perp"] = "8869";
entityToCharacterMap["&sdot"] = "8901";
entityToCharacterMap["&lceil"] = "8968";
entityToCharacterMap["&rceil"] = "8969";
entityToCharacterMap["&lfloor"] = "8970";
entityToCharacterMap["&rfloor"] = "8971";
entityToCharacterMap["&lang"] = "9001";
entityToCharacterMap["&rang"] = "9002";
entityToCharacterMap["&loz"] = "9674";
entityToCharacterMap["&spades"] = "9824";
entityToCharacterMap["&clubs"] = "9827";
entityToCharacterMap["&hearts"] = "9829";
entityToCharacterMap["&diams"] = "9830";
var characterToEntityMap = [];
for (var entity in entityToCharacterMap) {
    characterToEntityMap[entityToCharacterMap[entity]] = entity
}
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.HTMLEntityCodec = function () {
    var f = new org.owasp.esapi.codecs.Codec();
    var a = function (g) {
        var h = g.peek();
        if (h == null) {
            return null
        }
        if (h == "x" || h == "X") {
            g.next();
            return d(g)
        }
        return e(g)
    };
    var e = function (g) {
        var h = "";
        while (g.hasNext()) {
            var j = g.peek();
            if (j.match(/[0-9]/)) {
                h += j;
                g.next()
            } else {
                if (j == ";") {
                    g.next();
                    break
                } else {
                    break
                }
            }
        }
        try {
            return parseInt(h)
        } catch (i) {
            return null
        }
    };
    var d = function (g) {
        var h = "";
        while (g.hasNext()) {
            var j = g.peek();
            if (j.match(/[0-9A-Fa-f]/)) {
                h += j;
                g.next()
            } else {
                if (j == ";") {
                    g.next();
                    break
                } else {
                    break
                }
            }
        }
        try {
            return parseInt(h, 16)
        } catch (i) {
            return null
        }
    };
    var b = function (h) {
        var g = "";
        while (h.hasNext()) {
            var i = h.peek();
            if (i.match(/[A-Za-z]/)) {
                g += i;
                h.next();
                if (entityToCharacterMap.containsKey("&" + g)) {
                    if (h.peek(";")) {
                        h.next()
                    }
                    break
                }
            } else {
                if (i == ";") {
                    h.next()
                } else {
                    break
                }
            }
        }
        return String.fromCharCode(entityToCharacterMap.getCaseInsensitive("&" + g))
    };
    return {
        encode: f.encode, decode: f.decode, encodeCharacter: function (h, k) {
            if (h.contains(k)) {
                return k
            }
            var i = org.owasp.esapi.codecs.Codec.getHexForNonAlphanumeric(k);
            if (i == null) {
                return k
            }
            var j = k.charCodeAt(0);
            if ((j <= 31 && k != "\t" && k != "\n" && k != "\r") || (j >= 127 && j <= 159) || k == " ") {
                return " "
            }
            var g = characterToEntityMap[j];
            if (g != null) {
                return g + ";"
            }
            return "&#x" + i + ";"
        }, decodeCharacter: function (k) {
            var g = k;
            g.mark();
            var i = g.next();
            if (i == null || i != "&") {
                g.reset();
                return null
            }
            var h = g.next();
            if (h == null) {
                g.reset();
                return null
            }
            if (h == "#") {
                var j = a(g);
                if (j != null) {
                    return j
                }
            } else {
                if (h.match(/[A-Za-z]/)) {
                    g.pushback(h);
                    j = b(g);
                    if (j != null) {
                        return j
                    }
                }
            }
            g.reset();
            return null
        }
    }
};
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.JavascriptCodec = function () {
    var a = new org.owasp.esapi.codecs.Codec();
    return {
        encode: function (f, h) {
            var d = "";
            for (var b = 0; b < h.length; b++) {
                var g = h.charAt(b);
                if (f.contains(g)) {
                    d += g
                } else {
                    var i = org.owasp.esapi.codecs.Codec.getHexForNonAlphanumeric(g);
                    if (i == null) {
                        d += g
                    } else {
                        var e = g.charCodeAt(0).toString(16);
                        if (g.charCodeAt(0) < 256) {
                            var j = "00".substr(e.length);
                            d += "\\x" + j + e.toUpperCase()
                        } else {
                            j = "0000".substr(e.length);
                            d += "\\u" + j + e.toUpperCase()
                        }
                    }
                }
            }
            return d
        }, decode: a.decode, decodeCharacter: function (p) {
            p.mark();
            var k = p.next();
            if (k == null) {
                p.reset();
                return null
            }
            if (k != "\\") {
                p.reset();
                return null
            }
            var b = p.next();
            if (b == null) {
                p.reset();
                return null
            }
            if (b == "b") {
                return 8
            } else {
                if (b == "t") {
                    return 9
                } else {
                    if (b == "n") {
                        return 10
                    } else {
                        if (b == "v") {
                            return 11
                        } else {
                            if (b == "f") {
                                return 12
                            } else {
                                if (b == "r") {
                                    return 13
                                } else {
                                    if (b == '"') {
                                        return 34
                                    } else {
                                        if (b == "'") {
                                            return 39
                                        } else {
                                            if (b == "\\") {
                                                return 92
                                            } else {
                                                if (b.toLowerCase() == "x") {
                                                    h = "";
                                                    for (var j = 0; j < 2; j++) {
                                                        var m = p.nextHex();
                                                        if (m != null) {
                                                            h += m
                                                        } else {
                                                            input.reset();
                                                            return null
                                                        }
                                                    }
                                                    try {
                                                        d = parseInt(h, 16);
                                                        return String.fromCharCode(d)
                                                    } catch (l) {
                                                        p.reset();
                                                        return null
                                                    }
                                                } else {
                                                    if (b.toLowerCase() == "u") {
                                                        h = "";
                                                        for (j = 0; j < 4; j++) {
                                                            m = p.nextHex();
                                                            if (m != null) {
                                                                h += m
                                                            } else {
                                                                input.reset();
                                                                return null
                                                            }
                                                        }
                                                        try {
                                                            var d = parseInt(h, 16);
                                                            return String.fromCharCode(d)
                                                        } catch (l) {
                                                            p.reset();
                                                            return null
                                                        }
                                                    } else {
                                                        if (p.isOctalDigit(b)) {
                                                            var h = b;
                                                            var g = p.next();
                                                            if (!p.isOctalDigit(g)) {
                                                                p.pushback(g)
                                                            } else {
                                                                h += g;
                                                                var f = p.next();
                                                                if (!p.isOctalDigit(f)) {
                                                                    p.pushback(f)
                                                                } else {
                                                                    h += f
                                                                }
                                                            }
                                                            try {
                                                                d = parseInt(h, 8);
                                                                return String.fromCharCode(d)
                                                            } catch (l) {
                                                                p.reset();
                                                                return null
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
            }
            return b
        }
    }
};
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.PercentCodec = function () {
    var e = new org.owasp.esapi.codecs.Codec();
    var d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var b = "-._~";
    var a = true;
    var g = d + (a ? "" : b);
    var f = function (h) {
        var i = "";
        if (h < -128 || h > 127) {
            throw new IllegalArgumentException("b is not a byte (was " + h + ")")
        }
        h &= 255;
        if (h < 16) {
            i += "0"
        }
        return i + h.toString(16).toUpperCase()
    };
    return {
        encode: e.encode, decode: e.decode, encodeCharacter: function (k, l) {
            if (g.indexOf(l) > -1) {
                return l
            }
            var i = org.owasp.esapi.codecs.UTF8.encode(l);
            var j = "";
            for (var h = 0; h < i.length; h++) {
                j += "%" + f(i.charCodeAt(h))
            }
            return j
        }, decodeCharacter: function (q) {
            q.mark();
            var l = q.next();
            if (l == null || l != "%") {
                q.reset();
                return null
            }
            var h = "";
            for (var j = 0; j < 2; j++) {
                var p = q.nextHex();
                if (p != null) {
                    h += p
                }
            }
            if (h.length == 2) {
                try {
                    var m = parseInt(h, 16);
                    return String.fromCharCode(m)
                } catch (k) {
                }
            }
            q.reset();
            return null
        }
    }
};
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.PushbackString = function (b) {
    var e = b, g = "", a = "", f = 0, d = 0;
    return {
        pushback: function (h) {
            g = h
        }, index: function () {
            return f
        }, hasNext: function () {
            if (g != null) {
                return true
            }
            return !(e == null || e.length == 0 || f >= e.length)
        }, next: function () {
            if (g != null) {
                var h = g;
                g = null;
                return h
            }
            if (e == null || e.length == 0 || f >= e.length) {
                return null
            }
            return e.charAt(f++)
        }, nextHex: function () {
            var h = this.next();
            if (this.isHexDigit(h)) {
                return h
            }
            return null
        }, nextOctal: function () {
            var h = this.next();
            if (this.isOctalDigit(h)) {
                return h
            }
            return null
        }, isHexDigit: function (h) {
            return h != null && ((h >= "0" && h <= "9") || (h >= "a" && h <= "f") || (h >= "A" && h <= "F"))
        }, isOctalDigit: function (h) {
            return h != null && (h >= "0" && h <= "7")
        }, peek: function (h) {
            if (!h) {
                if (g != null) {
                    return g
                }
                if (e == null || e.length == 0 || f >= e.length) {
                    return null
                }
                return e.charAt(f)
            } else {
                if (g != null && g == h) {
                    return true
                }
                if (e == null || e.length == 0 || f >= e.length) {
                    return false
                }
                return e.charAt(f) == h
            }
        }, mark: function () {
            a = g;
            d = f
        }, reset: function () {
            g = a;
            f = d
        }, remainder: function () {
            var h = e.substr(f);
            if (g != null) {
                h = g + h
            }
            return h
        }
    }
};
$namespace("org.owasp.esapi.codecs");
org.owasp.esapi.codecs.UTF8 = {
    encode: function (d) {
        var b = d.replace(/\r\n/g, "\n");
        var a = "";
        for (var f = 0; f < b.length; f++) {
            var e = b.charCodeAt(f);
            if (e < 128) {
                a += String.fromCharCode(e)
            } else {
                if ((e > 127) && (e < 2048)) {
                    a += String.fromCharCode((e >> 6) | 192);
                    a += String.fromCharCode((e & 63) | 128)
                } else {
                    a += String.fromCharCode((e >> 12) | 224);
                    a += String.fromCharCode(((e >> 6) & 63) | 128);
                    a += String.fromCharCode((e & 63) | 128)
                }
            }
        }
        return a
    }, decode: function (d) {
        var a = "";
        var b = c = c1 = c2 = 0;
        while (b < d.length) {
            c = d.charCodeAt(b);
            if (c < 128) {
                a += String.fromCharCode(c);
                b++
            } else {
                if ((c > 191) && (c < 224)) {
                    c2 = d.charCodeAt(b + 1);
                    a += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    b += 2
                } else {
                    c2 = utftext.charCodeAt(b + 1);
                    c3 = utftext.charCodeAt(b + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    b += 3
                }
            }
        }
        return a
    }
};
$namespace("org.owasp.esapi.i18n");
org.owasp.esapi.i18n.ArrayResourceBundle = function (sName, oLocale, aMessages, oParent) {
    with (org.owasp.esapi.i18n) {
        var _super = new ResourceBundle(sName, oLocale, oParent)
    }
    var messages = aMessages;
    return {
        getParent: _super.getParent,
        getLocale: _super.getLocale,
        getName: _super.getName,
        getString: _super.getString,
        getMessage: function (sKey) {
            return messages[sKey]
        }
    }
};
$namespace("org.owasp.esapi.i18n");
org.owasp.esapi.i18n.Locale = function (f, d, a) {
    var g = f, e = d, b = a;
    return {
        getLanguage: function () {
            return g
        }, getCountry: function () {
            return e
        }, getVariant: function () {
            return b
        }, toString: function () {
            return g + (e ? "-" + e + (b ? "-" + b : "") : "")
        }
    }
};
org.owasp.esapi.i18n.Locale.US = new org.owasp.esapi.i18n.Locale("en", "US");
org.owasp.esapi.i18n.Locale.GB = new org.owasp.esapi.i18n.Locale("en", "GB");
org.owasp.esapi.i18n.Locale.getLocale = function (b) {
    var a = b.split("-");
    return new org.owasp.esapi.i18n.Locale(a[0], (a.length > 1 ? a[1] : ""), (a.length > 2 ? a.length[2] : ""))
};
org.owasp.esapi.i18n.Locale.getDefault = function () {
    var a = (navigator.language ? navigator.language : (navigator.userLanguage ? navigator.userLanguage : "en-US")).split("-");
    return new org.owasp.esapi.i18n.Locale(a[0], (a.length > 1 ? a[1] : ""), (a.length > 2 ? a.length[2] : ""))
};
$namespace("org.owasp.esapi.i18n");
org.owasp.esapi.i18n.ObjectResourceBundle = function (e, d) {
    var b = new org.owasp.esapi.i18n.ResourceBundle(e.name, org.owasp.esapi.i18n.Locale.getLocale(e.locale), d);
    var a = e.messages;
    return {
        getParent: b.getParent,
        getLocale: b.getLocale,
        getName: b.getName,
        getString: b.getString,
        getMessage: function (f) {
            return a[f]
        }
    }
};
$namespace("org.owasp.esapi.i18n");
org.owasp.esapi.i18n.ResourceBundle = function (g, e, b) {
    var f = b;
    var a = e;
    var d = g;
    if (!d) {
        throw new SyntaxError("Name required for implementations of org.owasp.esapi.i18n.ResourceBundle")
    }
    if (!a) {
        throw new SyntaxError("Locale required for implementations of org.owasp.esapi.i18n.ResourceBundle")
    }
    return {
        getParent: function () {
            return f
        }, getLocale: function () {
            return a
        }, getName: function () {
            return d
        }, getMessage: function (h) {
            return h
        }, getString: function (l, p) {
            if (arguments.length < 1) {
                throw new IllegalArgumentException("No key passed to getString")
            }
            var m = this.getMessage(l);
            if (!m) {
                if (f) {
                    return f.getString(l, p)
                } else {
                    return l
                }
            }
            if (!m.match(/\{([A-Za-z]+)\}/) || !p) {
                return m
            }
            var h = "", n = 0;
            while (true) {
                var j = m.indexOf("{", n);
                var k = m.indexOf("}", j);
                if (j < 0) {
                    h += m.substr(n, m.length - n);
                    break
                }
                if (j >= 0 && k < -1) {
                    throw new SyntaxError("Invalid Message - Unclosed Context Reference: " + m)
                }
                h += m.substring(n, j);
                var i = m.substring(j + 1, k);
                if (p[i]) {
                    h += p[i]
                } else {
                    h += m.substring(j, k + 1)
                }
                n = k + 1
            }
            return h
        }
    }
};
org.owasp.esapi.i18n.ResourceBundle.getResourceBundle = function (sResource, oLocale) {
    var classname = sResource + "_" + oLocale.toString().replace("-", "_");
    with (org.owasp.esapi.i18n) {
        if (ResourceBundle[classname] instanceof Object) {
            return ResourceBundle[classname]
        } else {
            return new ResourceBundle[classname]()
        }
    }
};
$namespace("org.owasp.esapi.net");
org.owasp.esapi.net.Cookie = function (g, n) {
    var b;
    var m;
    var h;
    var f;
    var l;
    var p;
    var a;
    var k;
    var d = $ESAPI.resourceBundle();
    var i = ",; ";
    var e = function (u) {
        for (var r = 0, q = u.length; r < q; r++) {
            var t = u.charCodeAt(r), s = u.charAt(r);
            if (t < 32 || t >= 127 || i.indexOf(s) != -1) {
                return false
            }
        }
        return true
    };
    if (!e(g) || g.toLowerCase() == "comment" || g.toLowerCase() == "discard" || g.toLowerCase() == "domain" || g.toLowerCase() == "expires" || g.toLowerCase() == "max-age" || g.toLowerCase() == "path" || g.toLowerCase() == "secure" || g.toLowerCase() == "version" || g.charAt(0) == "$") {
        var j = d.getString("Cookie.Name", {name: g});
        throw new IllegalArgumentException(j)
    }
    b = g;
    m = n;
    return {
        setComment: function (q) {
            h = q
        }, getComment: function () {
            return h
        }, setDomain: function (q) {
            f = q.toLowerCase()
        }, getDomain: function () {
            return f
        }, setMaxAge: function (q) {
            l = q
        }, getMaxAge: function () {
            return l
        }, setPath: function (q) {
            p = q
        }, getPath: function () {
            return p
        }, setSecure: function (q) {
            a = q
        }, getSecure: function () {
            return a
        }, getName: function () {
            return b
        }, setValue: function (q) {
            m = q
        }, getValue: function () {
            return m
        }, setVersion: function (q) {
            if (q < 0 || q > 1) {
                throw new IllegalArgumentException(d.getString("Cookie.Version", {version: q}))
            }
            k = q
        }, getVersion: function () {
            return k
        }
    }
};
$namespace("org.owasp.esapi.reference.encoding");
org.owasp.esapi.reference.encoding.DefaultEncoder = function (a) {
    var h = [], k = new org.owasp.esapi.codecs.HTMLEntityCodec(), f = new org.owasp.esapi.codecs.JavascriptCodec(),
        g = new org.owasp.esapi.codecs.CSSCodec(), b = new org.owasp.esapi.codecs.PercentCodec();
    if (!a) {
        h.push(k);
        h.push(f);
        h.push(g);
        h.push(b)
    } else {
        h = a
    }
    var e = new Array(",", ".", "-", "_", " ");
    var d = new Array(",", ".", "-", "_");
    var j = new Array();
    var i = new Array(",", ".", "_");
    return {
        cananicalize: function (r, m) {
            if (!r) {
                return null
            }
            var l = r, p = null, s = 1, n = 0, q = false;
            while (!q) {
                q = true;
                h.each(function (u) {
                    var t = l;
                    l = u.decode(l);
                    if (t != l) {
                        if (p != null && p != u) {
                            s++
                        }
                        p = u;
                        if (q) {
                            n++
                        }
                        q = false
                    }
                })
            }
            if (n >= 2 && s > 1) {
                if (m) {
                    throw new org.owasp.esapi.IntrusionException("Input validation failure", "Multiple (" + n + "x) and mixed encoding (" + s + "x) detected in " + r)
                }
            } else {
                if (n >= 2) {
                    if (m) {
                        throw new org.owasp.esapi.IntrusionException("Input validation failure", "Multiple (" + n + "x) encoding detected in " + r)
                    }
                } else {
                    if (s > 1) {
                        if (m) {
                            throw new org.owasp.esapi.IntrusionException("Input validation failure", "Mixed (" + s + "x) encoding detected in " + r)
                        }
                    }
                }
            }
            return l
        }, normalize: function (l) {
            return l.replace(/[^\x00-\x7F]/g, "")
        }, encodeForHTML: function (l) {
            return !l ? null : k.encode(e, l)
        }, decodeForHTML: function (l) {
            return !l ? null : k.decode(l)
        }, encodeForHTMLAttribute: function (l) {
            return !l ? null : k.encode(d, l)
        }, encodeForCSS: function (l) {
            return !l ? null : g.encode(j, l)
        }, encodeForJavaScript: function (l) {
            return !l ? null : f.encode(i, l)
        }, encodeForJavascript: this.encodeForJavaScript, encodeForURL: function (l) {
            return !l ? null : escape(l)
        }, decodeFromURL: function (l) {
            return !l ? null : unescape(l)
        }, encodeForBase64: function (l) {
            return !l ? null : org.owasp.esapi.codecs.Base64.encode(l)
        }, decodeFromBase64: function (l) {
            return !l ? null : org.owasp.esapi.codecs.Base64.decode(l)
        }
    }
};
$namespace("org.owasp.esapi.reference.logging");
org.owasp.esapi.reference.logging.Log4JSLogFactory = function () {
    var d = Array();
    var b = function (m) {
        var f = null;
        var e = m ? m : null;
        var k = Log4js.Level;
        var i = false, j = false, l = false, h = $ESAPI.encoder().encodeForHTML;
        f = Log4js.getLogger(e);
        var g = function (p) {
            var n = org.owasp.esapi.Logger;
            switch (p) {
                case n.OFF:
                    return Log4js.Level.OFF;
                case n.FATAL:
                    return Log4js.Level.FATAL;
                case n.ERROR:
                    return Log4js.Level.ERROR;
                case n.WARNING:
                    return Log4js.Level.WARN;
                case n.INFO:
                    return Log4js.Level.INFO;
                case n.DEBUG:
                    return Log4js.Level.DEBUG;
                case n.TRACE:
                    return Log4js.Level.TRACE;
                case n.ALL:
                    return Log4js.Level.ALL
            }
        };
        return {
            setLevel: function (n) {
                try {
                    f.setLevel(g(n))
                } catch (p) {
                    this.error(org.owasp.esapi.Logger.SECURITY_FAILURE, "", p)
                }
            }, trace: function (p, n, q) {
                this.log(k.TRACE, p, n, q)
            }, debug: function (p, n, q) {
                this.log(k.DEBUG, p, n, q)
            }, info: function (p, n, q) {
                this.log(k.INFO, p, n, q)
            }, warning: function (p, n, q) {
                this.log(k.WARN, p, n, q)
            }, error: function (p, n, q) {
                this.log(k.ERROR, p, n, q)
            }, fatal: function (p, n, q) {
                this.log(k.FATAL, p, n, q)
            }, log: function (s, r, p, t) {
                switch (s) {
                    case k.TRACE:
                        if (!f.isTraceEnabled()) {
                            return
                        }
                        break;
                    case k.DEBUG:
                        if (!f.isDebugEnabled()) {
                            return
                        }
                        break;
                    case k.INFO:
                        if (!f.isInfoEnabled()) {
                            return
                        }
                        break;
                    case k.WARNING:
                        if (!f.isWarnEnabled()) {
                            return
                        }
                        break;
                    case k.ERROR:
                        if (!f.isErrorEnabled()) {
                            return
                        }
                        break;
                    case k.FATAL:
                        if (!f.isFatalEnabled()) {
                            return
                        }
                        break
                }
                if (!p) {
                    p = ""
                }
                p = "[" + r.toString() + "] - " + p;
                var n = p.replace("\n", "_").replace("\r", "_");
                if (l) {
                    n = h(n);
                    if (n != p) {
                        n += " [Encoded]"
                    }
                }
                var q = (i ? window.location.href : "") + (j ? "/" + $ESAPI.properties.application.Name : "");
                f.log(s, (q != "" ? "[" + q + "] " : "") + n, t)
            }, addAppender: function (n) {
                f.addAppender(n)
            }, isLogUrl: function () {
                return i
            }, setLogUrl: function (n) {
                i = n
            }, isLogApplicationName: function () {
                return j
            }, setLogApplicationName: function (n) {
                j = n
            }, isEncodingRequired: function () {
                return l
            }, setEncodingRequired: function (n) {
                l = n
            }, setEncodingFunction: function (n) {
                h = n
            }, isDebugEnabled: function () {
                return f.isDebugEnabled()
            }, isErrorEnabled: function () {
                return f.isErrorEnabled()
            }, isFatalEnabled: function () {
                return f.isFatalEnabled()
            }, isInfoEnabled: function () {
                return f.isInfoEnabled()
            }, isTraceEnabled: function () {
                return f.isTraceEnabled()
            }, isWarningEnabled: function () {
                return f.isWarnEnabled()
            }
        }
    };
    var a = function (f) {
        var e = $ESAPI.properties.logging;
        if (e[f]) {
            e = e[f]
        }
        return e
    };
    return {
        getLogger: function (g) {
            var h = (typeof g == "string") ? g : g.constructor.toString();
            var f = d[h];
            if (!f) {
                f = new b(h);
                var e = a(g);
                f.setLevel(e.Level);
                f.setLogUrl(e.LogUrl);
                f.setLogApplicationName(e.LogApplicationName);
                f.setEncodingRequired(e.EncodingRequired);
                if (e.EncodingFunction) {
                    f.setEncodingFunction(e.EncodingFunction)
                }
                e.Appenders.each(function (i) {
                    if (e.Layout) {
                        i.setLayout(e.Layout)
                    }
                    f.addAppender(i)
                });
                d[h] = f
            }
            return f
        }
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.BaseValidationRule = function (f, h, a) {
    var g = $ESAPI.logger("Validation");
    var b = org.owasp.esapi.Logger.EventType;
    var i = f;
    var j = h ? h : $ESAPI.encoder();
    var l = false;
    var e = org.owasp.esapi.i18n.ResourceBundle;
    var k = a ? a : $ESAPI.locale();
    var d;
    if ($ESAPI.properties.validation.ResourceBundle) {
        d = e.getResourceBundle($ESAPI.properties.validation.ResourceBundle, k)
    }
    if (!d) {
        d = $ESAPI.resourceBundle();
        g.info(b.EVENT_FAILURE, "No Validation ResourceBundle - Defaulting to " + d.getName() + "(" + d.getLocale().toString() + ")")
    }
    g.info(b.EVENT_SUCCESS, "Validation Rule Initialized with ResourceBundle: " + d.getName());
    return {
        setAllowNull: function (m) {
            l = m
        }, isAllowNull: function () {
            return l
        }, getTypeName: function () {
            return i
        }, setTypeName: function (m) {
            i = m
        }, setEncoder: function (m) {
            j = m
        }, getEncoder: function () {
            return j
        }, assertValid: function (m, n) {
            this.getValid(m, n)
        }, getValid: function (m, p, r) {
            var q = null;
            try {
                q = this.getValidInput(m, p)
            } catch (n) {
                return this.sanitize(m, p)
            }
            return q
        }, getValidInput: function (m, n) {
            return n
        }, getSafe: function (m, p) {
            var q = null;
            try {
                q = this.getValidInput(m, p)
            } catch (n) {
                return this.sanitize(m, p)
            }
            return q
        }, sanitize: function (m, n) {
            return n
        }, isValid: function (m, p) {
            var q = false;
            try {
                this.getValidInput(m, p);
                q = true
            } catch (n) {
                return false
            }
            return q
        }, whitelist: function (n, p) {
            var q = "";
            for (var m = 0; m < n.length; m++) {
                var r = n.charAt(m);
                if (p.contains(r)) {
                    q += r
                }
            }
            return q
        }, getUserMessage: function (p, m, n) {
            return this.getMessage(p + ".Usr", m + ".Usr", n)
        }, getLogMessage: function (p, m, n) {
            return this.getMessage(p + ".Log", m + ".Log", n)
        }, getMessage: function (p, m, n) {
            return d.getString(p, n) ? d.getString(p, n) : d.getString(m, n)
        }, validationException: function (p, m, q, n) {
            throw new org.owasp.esapi.reference.validation.ValidationException(this.getUserMessage(p + "." + q, m + "." + q, n), this.getLogMessage(p + "." + q, m + "." + q, n), p)
        }
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.CreditCardValidationRule = function (b, f, a) {
    var j = new org.owasp.esapi.reference.validation.BaseValidationRule(b, f, a);
    var h = "CreditCard";
    var d = 19;
    var g;
    var e = function () {
        var l = new RegExp($ESAPI.properties.validation.CreditCard);
        var k = new org.owasp.esapi.reference.validation.StringValidationRule("ccrule", j.getEncoder(), a, l);
        k.setMaxLength(d);
        k.setAllowNull(false);
        return k
    };
    ccRule = e();
    var i = function (k) {
        var s = "";
        var q;
        for (var n = 0; o < k.length; n++) {
            q = k.charAt(n);
            if (q.match(/[0-9]/)) {
                s += q
            }
        }
        var p = 0, r = 0, l = 0, t = false;
        for (var m = s.length - 1; m >= 0; m--) {
            r = parseInt(s.substring(m, n + 1));
            if (t) {
                l = r * 2;
                if (l > 9) {
                    l -= 9
                }
            } else {
                l = r
            }
            p += l;
            t = !t
        }
        return p % 10 == 0
    };
    return {
        getMaxCardLength: function () {
            return d
        },
        setMaxCardLength: function (k) {
            d = k
        },
        setAllowNull: j.setAllowNull,
        isAllowNull: j.isAllowNull,
        getTypeName: j.getTypeName,
        setTypeName: j.setTypeName,
        setEncoder: j.setEncoder,
        getEncoder: j.getEncoder,
        assertValid: j.assertValid,
        getValid: j.getValid,
        getValidInput: function (l, m) {
            if (!m || m.trim() == "") {
                if (this.isAllowNull()) {
                    return null
                }
                j.validationException(l, h, "Required", {context: l, input: m})
            }
            var k = g.getValid(l, m);
            if (!i(k)) {
                j.validationException(l, h, "Invalid", {context: l, input: m})
            }
            return k
        },
        getSafe: j.getSafe,
        sanitize: function (k, l) {
            return this.whitelist(l, org.owasp.esapi.EncoderConstants.CHAR_DIGITS)
        },
        isValid: j.isValid,
        whitelist: j.whitelist
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.DateValidationRule = function (a, d, b) {
    var f = new org.owasp.esapi.reference.validation.BaseValidationRule(a, d, b);
    var h = "Date";
    var g = DateFormat.getDateInstance();
    var e = function (j, k) {
        if (!j || j.trim() == "") {
            if (f.isAllowNull()) {
                return null
            }
            f.validationException(j, h, "Required", {context: j, input: k, format: g})
        }
        var i = f.getEncoder().cananicalize(k);
        try {
            return g.parse(i)
        } catch (l) {
            f.validationException(j, h, "Invalid", {context: j, input: k, format: g})
        }
    };
    return {
        setDateFormat: function (i) {
            if (!i) {
                throw new IllegalArgumentException("DateValidationRule.setDateFormat requires a non-null DateFormat")
            }
            g = i
        },
        setAllowNull: f.setAllowNull,
        isAllowNull: f.isAllowNull,
        getTypeName: f.getTypeName,
        setTypeName: f.setTypeName,
        setEncoder: f.setEncoder,
        getEncoder: f.getEncoder,
        assertValid: f.assertValid,
        getValid: f.getValid,
        getValidInput: function (i, j) {
            return e(i, j)
        },
        getSafe: f.getSafe,
        sanitize: function (i, k) {
            var j = new Date(0);
            try {
                j = e(i, k)
            } catch (l) {
            }
            return j
        },
        isValid: f.isValid,
        whitelist: f.whitelist
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.DefaultValidator = function (e, b) {
    var g = Array();
    var d = e ? e : $ESAPI.encoder();
    var a = b ? b : org.owasp.esapi.i18n.Locale.getDefault();
    var f = org.owasp.esapi.reference.validation;
    return {
        addRule: function (h) {
            g[h.getName()] = h
        }, getRule: function (h) {
            return g[h]
        }, isValidInput: function (h, k, m, j, i) {
            try {
                this.getValidInput(h, k, m, j, i);
                return true
            } catch (l) {
                return false
            }
        }, getValidInput: function (i, q, h, l, k, r) {
            var n = new org.owasp.esapi.reference.validation.StringValidationRule(h, d, a);
            var j = new RegExp($ESAPI.properties.validation[h]);
            if (j && j instanceof RegExp) {
                n.addWhitelistPattern(j)
            } else {
                throw new IllegalArgumentException("Invalid Type: " + h + " not found.")
            }
            n.setMaxLength(l);
            n.setAllowNull(k);
            try {
                return n.getValid(i, q)
            } catch (m) {
                if (m instanceof j.ValidationErrorList && r) {
                    r.addError(i, m)
                }
                throw m
            }
        }, isValidDate: function (i, k, h, j) {
            try {
                this.getValidDate(i, k, h, j);
                return true
            } catch (l) {
                return false
            }
        }, getValidDate: function (i, k, h, j, n) {
            var l = new f.DateValidationRule(i, d, a);
            l.setAllowNull(j);
            l.setDateFormat(h);
            try {
                return l.getValid(i, k)
            } catch (m) {
                if (m instanceof f.ValidationErrorList && n) {
                    n.addError(i, m)
                }
                throw m
            }
        }, getValidCreditCard: function (h, j, i, m) {
            var k = new f.CreditCardValidationRule(h, d, a);
            k.setAllowNull(i);
            try {
                return k.getValid(h, j)
            } catch (l) {
                if (l instanceof f.ValidationErrorList && m) {
                    m.addError(h, l)
                }
                throw l
            }
        }, isValidCreditCard: function (h, j, i) {
            try {
                this.getValidCreditCard(h, j, i);
                return true
            } catch (k) {
                return false
            }
        }, getValidNumber: function (i, k, j, n, p, m) {
            var h = new f.NumberValidationRule(i, d, a, n, p);
            h.setAllowNull(j);
            try {
                return h.getValid(i, k)
            } catch (l) {
                if (l instanceof f.ValidationErrorList && m) {
                    m.addError(i, l)
                }
                throw l
            }
        }, isValidNumber: function (h, j, i, l, m) {
            try {
                this.getValidNumber(h, j, i, l, m);
                return true
            } catch (k) {
                return false
            }
        }, getValidInteger: function (i, k, j, n, p, m) {
            var h = new f.IntegerValidationRule(i, d, a, n, p);
            h.setAllowNull(j);
            try {
                return h.getValid(i, k)
            } catch (l) {
                if (l instanceof f.ValidationErrorList && m) {
                    m.addError(i, l)
                }
                throw l
            }
        }, isValidInteger: function (h, j, i, l, m) {
            try {
                this.getValidInteger(h, j, i, l, m);
                return true
            } catch (k) {
                return false
            }
        }
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.IntegerValidationRule = function (b, e, a, k, h) {
    var j = new org.owasp.esapi.reference.validation.BaseValidationRule(b, e, a);
    var d = "Integer";
    var i = k ? k : Number.MIN_VALUE;
    var f = h ? h : Number.MAX_VALUE;
    if (i >= f) {
        throw new IllegalArgumentException("minValue must be less than maxValue")
    }
    var g = function (m, p) {
        if (!p || p.trim() == "") {
            if (j.allowNull()) {
                return null
            }
            j.validationException(m, d, "Required", {context: m, input: p, minValue: i, maxValue: f})
        }
        var l = j.getEncoder().cananicalize(p);
        var q = parseInt(l);
        if (q == "NaN") {
            j.validationException(m, d, "NaN", {context: m, input: p, minValue: i, maxValue: f})
        }
        if (q < i) {
            j.validationException(m, d, "MinValue", {context: m, input: p, minValue: i, maxValue: f})
        }
        if (q > f) {
            j.validationException(m, d, "MaxValue", {context: m, input: p, minValue: i, maxValue: f})
        }
        return q
    };
    return {
        setMinValue: function (l) {
            i = l
        },
        getMinValue: function () {
            return i
        },
        setMaxValue: function (l) {
            f = l
        },
        getMaxValue: function () {
            return f
        },
        setAllowNull: j.setAllowNull,
        isAllowNull: j.isAllowNull,
        getTypeName: j.getTypeName,
        setTypeName: j.setTypeName,
        setEncoder: j.setEncoder,
        getEncoder: j.getEncoder,
        assertValid: j.assertValid,
        getValid: j.getValid,
        getValidInput: function (l, m) {
            return g(l, m)
        },
        getSafe: j.getSafe,
        sanitize: function (l, m) {
            var q = 0;
            try {
                q = g(l, m)
            } catch (p) {
            }
            return q
        },
        isValid: j.isValid,
        whitelist: j.whitelist
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.NumberValidationRule = function (b, f, a, h, e) {
    var k = new org.owasp.esapi.reference.validation.BaseValidationRule(b, f, a);
    var d = "Number";
    var j = h ? h : Number.MIN_VALUE;
    var g = e ? e : Number.MAX_VALUE;
    if (j >= g) {
        throw new IllegalArgumentException("MinValue must be less that MaxValue")
    }
    var i = function (m, n) {
        if (!n || n.trim() == "") {
            if (k.isAllowNull()) {
                return null
            }
            k.validationException(m, d, "Required", {context: m, input: n, minValue: j, maxValue: g})
        }
        var l = k.getEncoder().cananicalize(n);
        var p = 0;
        try {
            p = parseFloat(l)
        } catch (q) {
            k.validationException(m, d, "Invalid", {context: m, input: n, minValue: j, maxValue: g})
        }
        if (p == "NaN") {
            k.validationException(m, d, "NaN", {context: m, input: n, minValue: j, maxValue: g})
        }
        if (p < j) {
            k.validationException(m, d, "MinValue", {context: m, input: n, minValue: j, maxValue: g})
        }
        if (p > g) {
            k.validationException(m, d, "MaxValue", {context: m, input: n, minValue: j, maxValue: g})
        }
        return p
    };
    return {
        setMinValue: function (l) {
            j = l
        },
        getMinValue: function () {
            return j
        },
        setMaxValue: function (l) {
            g = l
        },
        getMaxValue: function () {
            return g
        },
        setAllowNull: k.setAllowNull,
        isAllowNull: k.isAllowNull,
        getTypeName: k.getTypeName,
        setTypeName: k.setTypeName,
        setEncoder: k.setEncoder,
        getEncoder: k.getEncoder,
        assertValid: k.assertValid,
        getValid: k.getValid,
        getValidInput: function (l, m) {
            return i(l, m)
        },
        getSafe: k.getSafe,
        sanitize: function (l, m) {
            var q = 0;
            try {
                q = i(l, m)
            } catch (p) {
            }
            return q
        },
        isValid: k.isValid,
        whitelist: k.whitelist
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.StringValidationRule = function (g, l, a, p) {
    var q = new org.owasp.esapi.reference.validation.BaseValidationRule(g, l, a);
    var h = "String";
    var n = Array();
    var f = Array();
    var e = 0;
    var b = Number.MAX_VALUE;
    var m = true;
    if (p) {
        if (p instanceof String) {
            n.push(new RegExp(p))
        } else {
            if (p instanceof RegExp) {
                n.push(p)
            } else {
                throw new IllegalArgumentException("sWhiteListPattern must be a string containing RegExp or a RegExp Object")
            }
        }
    }
    var k = function (r, t, s) {
        n.each(function (u) {
            if (t.match(u)) {
                q.validationException(r, h, "Whitelist", {
                    context: r,
                    input: t,
                    orig: s,
                    pattern: u.toString(),
                    minLength: e,
                    maxLength: b,
                    validateInputAndCanonical: m
                })
            }
        })
    };
    var j = function (r, t, s) {
        f.each(function (u) {
            if (t.match(u)) {
                q.validationException(r, h, "Blacklist", {
                    context: r,
                    input: t,
                    orig: s,
                    pattern: u.toString(),
                    minLength: e,
                    maxLength: b,
                    validateInputAndCanonical: m
                })
            }
        })
    };
    var d = function (r, t, s) {
        if (t.length < e) {
            q.validationException(r, h, "MinLength", {
                context: r,
                input: t,
                orig: s,
                minLength: e,
                maxLength: b,
                validateInputAndCanonical: m
            })
        }
        if (t.length > b) {
            q.validationException(r, h, "MaxLength", {
                context: r,
                input: t,
                orig: s,
                minLength: e,
                maxLength: b,
                validateInputAndCanonical: m
            })
        }
        return t
    };
    var i = function (r, t, s) {
        if (!t || t.trim() == "") {
            if (q.isAllowNull()) {
                return null
            }
            q.validationException(r, h, "Required", {
                context: r,
                input: t,
                orig: s,
                minLength: e,
                maxLength: b,
                validateInputAndCanonical: m
            })
        }
    };
    return {
        addWhitelistPattern: function (r) {
            if (r instanceof String) {
                n.push(new RegExp(r))
            } else {
                if (r instanceof RegExp) {
                    n.push(r)
                } else {
                    throw new IllegalArgumentException("p must be a string containing RegExp or a RegExp Object")
                }
            }
        },
        addBlacklistPattern: function (r) {
            if (r instanceof String) {
                f.push(new RegExp(r))
            } else {
                if (r instanceof RegExp) {
                    f.push(r)
                } else {
                    throw new IllegalArgumentException("p must be a string containing RegExp or a RegExp Object")
                }
            }
        },
        setMinLength: function (r) {
            e = r
        },
        getMinLength: function () {
            return e
        },
        setMaxLength: function (r) {
            b = r
        },
        getMaxLength: function () {
            return b
        },
        setValidateInputAndCanonical: function (r) {
            m = r
        },
        isValidateInputAndCanonical: function () {
            return m
        },
        setAllowNull: q.setAllowNull,
        isAllowNull: q.isAllowNull,
        getTypeName: q.getTypeName,
        setTypeName: q.setTypeName,
        setEncoder: q.setEncoder,
        getEncoder: q.getEncoder,
        assertValid: q.assertValid,
        getValid: q.getValid,
        getValidInput: function (s, t) {
            var r = null;
            if (i(s, t) == null) {
                return null
            }
            if (m) {
                d(s, t);
                k(s, t);
                j(s, t)
            }
            r = this.getEncoder().cananicalize(t);
            if (i(s, r, t) == null) {
                return null
            }
            d(s, r, t);
            k(s, r, t);
            j(s, r, t);
            return r
        },
        getSafe: q.getSafe,
        sanitize: function (r, s) {
            return this.whitelist(s, org.owasp.esapi.EncoderConstants.CHAR_ALNUM)
        },
        isValid: q.isValid,
        whitelist: q.whitelist
    }
};
$namespace("org.owasp.esapi.reference.validation");
org.owasp.esapi.reference.validation.ValidationException = function (d, b) {
    var f, a;
    if (arguments[2] && arguments[2] instanceof Exception) {
        f = arguments[2];
        if (arguments[3] && arguments[3] instanceof String) {
            a = arguments[3]
        }
    } else {
        if (arguments[2] && arguments[2] instanceof String) {
            a = arguments[2]
        }
    }
    var e = new org.owasp.esapi.EnterpriseSecurityException(d, b, f);
    return {
        setContext: function (g) {
            a = g
        },
        getContext: function () {
            return a
        },
        getMessage: e.getMessage,
        getUserMessage: e.getMessage,
        getLogMessage: e.getLogMessage,
        getStackTrace: e.getStackTrace,
        printStackTrace: e.printStackTrace
    }
};