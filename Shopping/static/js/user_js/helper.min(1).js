var decodeXSS = function (input) {
    if ("string" === typeof input && input.indexOf("&") > -1) {
        var tmp = document.createElement("textarea");
        tmp.innerHTML = input;
        input = tmp.value
    }
    return input
};
var htmlspecialchars = function (input) {
    if ("string" === typeof input) {
        input = input.replaceAll("&", "&amp;");
        input = input.replaceAll("<", "&lt;");
        input = input.replaceAll(">", "&gt;");
        input = input.replaceAll('"', "&quot;");
        input = input.replaceAll("'", "&#x27;");
        input = input.replaceAll("\\(", "&#x28;");
        input = input.replaceAll("\\)", "&#x29;");
        input = input.replaceAll("\\[", "&#x5b;");
        input = input.replaceAll("\\]", "&#x5d;");
        input = input.replaceAll("\\{", "&#x7b;");
        input = input.replaceAll("\\}", "&#x7d;")
    }
    return input
};
var htmlspecialcharsOnce = function (input) {
    return htmlspecialchars(decodeXSS(input))
};
var encryptJSON = function (jsonObj) {
    if (typeof jsonObj === "object") {
        for (var key in jsonObj) {
            if (typeof jsonObj[key] === "object") {
                encryptJSON(jsonObj[key])
            } else if (typeof jsonObj[key] === "string" && !/^[\w\d\s\-\:\+]+$/.test(jsonObj[key])) {
                jsonObj[key] = htmlspecialchars(jsonObj[key])
            }
        }
    }
};
var parseJSON = function (s) {
    try {
        var r = JSON.parse(s);
        if (r) return r;
        return false
    } catch (e) {
        return false
    }
};
jQuery(function () {
    ec.load("ec.XSSUtils")
});
$.support.cors = true;
$.ajaxSetup({
    xhrFields: {withCredentials: true}, statusCode: {
        405: function () {
            alert("参数校验未通过，请检查输入的数据是否准确")
        }, 597: function () {
            alert("身份验证失败，请刷新后重试")
        }
    }, dataFilter: function (data, type) {
        if ("json" === type && "string" === typeof this.url) {
            var url = this.url.toLowerCase();
            if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("//")) {
                url = url.substring(url.indexOf("//") + 2) + "/";
                var ODList = [document.domain + "/", "www.vmall.com/"];
                var trusted = false;
                for (var i = 0; i < ODList.length; i++) {
                    if (url.startsWith(ODList[i])) {
                        trusted = true;
                        break
                    }
                }
                if (!trusted) {
                    try {
                        data = JSON.parse(data);
                        if (url.indexOf("/rms/comment/getcommentlist.json?") > -1 || url.indexOf("/rms/comment/getreplylist.json?") > -1 || url.indexOf("/rms/comment/getusercommentdetail.json?") > -1) {
                            encryptJSON(data)
                        } else {
                            ec.encryptJSON(data)
                        }
                        data = JSON.stringify(data)
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
        return data
    }
});
jQuery.fn.textS = function (value) {
    if ("undefined" === typeof value) {
        return this.text()
    }
    return this.text(decodeXSS(value))
};
jQuery.fn.valS = function (value) {
    if ("undefined" === typeof value) {
        return this.val()
    }
    return this.val(decodeXSS(value))
};
jQuery.fn.attrS = function (k, v) {
    if ("string" === typeof v) {
        return this.attr(k, decodeXSS(v))
    }
    return this.attr(k, v)
};