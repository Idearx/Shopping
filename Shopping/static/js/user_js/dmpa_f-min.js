var win = parent ? parent.window : window;
(function (b, a) {
    (function (h, k, j) {
        var c, e = 0, f = a.getElementById("dmpa_script"), i = "nebula-collector.huawei.com",
            g = "/api/2.0/dmpa-min.js", m = "_dmpa_id";
        if (k.getElementsByTagName("script").length > 1) {
            e = k.getElementsByTagName("script").length - 1
        }
        f = (f ? f : k.getElementsByTagName("script")[e]);
        var l = b.location.protocol;
        loaderJs = function (n, p, o) {
            if (!k.getElementById(p)) {
                c = k.createElement(j);
                o = o || function () {
                };
                c.onload = c.onreadystatechange = function () {
                    if (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState) {
                        o();
                        this.onload = this.onreadystatechange = null
                    }
                };
                c.src = l + "//" + n;
                c.async = true;
                p && (c.id = p);
                f.parentNode.insertBefore(c, f)
            }
        };
        if (a.cookie.indexOf(m) < 0 || d(m) === "undefined") {
            setTimeout(function () {
                loaderJs(i + "/dmpa/open/dc/dataStdId?dmpaid=1", "dmpaId", function () {
                    setTimeout(function () {
                        loaderJs(i + g, "dmpa")
                    }, 0)
                })
            }, 0)
        } else {
            setTimeout(function () {
                loaderJs(i + g, "dmpa")
            }, 0)
        }

        function d(q) {
            var n = a.cookie.split(";");
            for (var p = 0; p < n.length; p++) {
                if (n[p].indexOf(q) >= 0) {
                    var r = n[p].split("=");
                    for (var o = 0; o < r.length; o++) {
                        var s = r[1];
                        var t = s.split(".")[0];
                        return t
                    }
                }
            }
        }
    })(b, a, "script")
}(win, win.document));