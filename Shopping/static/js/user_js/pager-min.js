(function (b) {
    var a = function (d) {
        var c = /^\d*$/;
        return c.test(d)
    };
    b.fn.pager = function (d) {
        function c(f, g) {
            this.render = function () {
                if (f.pageNumber > f.pageCount) {
                    return
                }
                var k = b("<ul></ul>");
                var j = f.item;
                for (var h = 0; h < j.length; h++) {
                    k.append(this.handler(j[h]))
                }
                return k
            };
            this.handler = function (h) {
                switch (h) {
                    case"recordCount":
                        var i = f.text.recordCount;
                        i = i.replace(/{#recordCount}/g, f.recordCount);
                        return b('<li class="recordCount">' + i + "</li>");
                    case"first":
                    case"pre":
                    case"next":
                    case"last":
                        return this.renderButton(h);
                    case"pageCount":
                        var i = f.text.pageCount;
                        i = i.replace(/{#pageCount}/g, f.pageCount);
                        return b('<li class="pageCount">' + i + "</li>");
                    case"qpage":
                        return this.renderQPages();
                    case"pageSizer":
                        return this.renderPageSizer();
                    case"quickPager":
                        return this.renderQuickPager();
                    default:
                        return '<li class="text">' + h + "</li>"
                }
            };
            this.renderButton = function (l) {
                var i = 1;
                var k = f.text[l];
                switch (l) {
                    case"first":
                        i = 1;
                        break;
                    case"pre":
                        i = f.pageNumber - 1;
                        break;
                    case"next":
                        i = f.pageNumber + 1;
                        break;
                    case"last":
                        i = f.pageCount;
                        break;
                    case"pageCount":
                        i = f.pageCount;
                        break
                }
                var h = new RegExp("{#" + l + "}", "gi");
                k = k.replace(h, i);
                var j = b('<li class="pgNext link ' + l + '">' + k + "</li>");
                if (l == "first" || l == "pre") {
                    f.pageNumber <= 1 ? j.addClass(l + "-empty") : j.bind("click", {E: this}, function (m) {
                        m.data.E.callBack(i)
                    })
                } else {
                    f.pageNumber >= f.pageCount ? j.addClass(l + "-empty") : j.bind("click", {E: this}, function (m) {
                        m.data.E.callBack(i)
                    })
                }
                return j
            };
            this.renderQPages = function () {
                var j = f.text.qpage;
                var o = b("<span class='qpages'></span>");
                var h = 1;
                var F = f.qpageSize;
                var E = parseInt(F / 2);
                if (f.pageNumber > E) {
                    h = f.pageNumber - E;
                    F = f.pageNumber + E
                }
                if (F > f.pageCount) {
                    h = f.pageCount - E * 2;
                    F = f.pageCount
                }
                if (h < 1) {
                    h = 1
                }
                for (var i = h; i <= F; i++) {
                    var C = b('<li class="page-number link">' + j.replace(/{#qpage}/g, i) + "</li>");
                    i == f.pageNumber ? C.addClass("pgCurrent") : C.bind("click", {E: this}, function (p) {
                        p.data.E.callBack(this.firstChild.data)
                    });
                    C.appendTo(o)
                }
                if (h > 1) {
                    if (h > 2) {
                        o.prepend('<li class="text">...</li>')
                    }
                    var C = b('<li class="page-number link page-number-first">' + j.replace(/{#qpage}/g, 1) + "</li>");
                    C.bind("click", {F: this}, function (p) {
                        p.data.F.callBack("1")
                    });
                    o.prepend(C)
                }
                if (F < f.pageCount) {
                    if (F < f.pageCount - 1) {
                        o.append('<li class="text">...</li>')
                    }
                    var C = b('<li class="page-number link page-number-last">' + j.replace(/{#qpage}/g, f.pageCount) + "</li>");
                    C.bind("click", {E: this}, function (p) {
                        p.data.E.callBack(f.pageCount)
                    });
                    o.append(C)
                }
                return o
            };
            this.renderQuickPager = function () {
                if (f.pageCount <= 1) {
                    return null
                }
                var l = null;
                var k = b('<li class="text quickPager"></li>');
                if (f.pageCount <= 10) {
                    var j = "<select>";
                    for (var h = 1; h <= f.pageCount; h++) {
                        j += '<option value="' + h + '"';
                        if (h == f.pageNumber) {
                            j += " selected"
                        }
                        j += ">" + h + "</option>"
                    }
                    j += "</select>";
                    l = b(j);
                    l.bind("change", {E: this}, function (i) {
                        i.data.E.callBack(b(this).attr("value"))
                    })
                } else {
                    l = b('<span class="fl">第</span><div id="chatpage"><input id="quickPager" class="pagenum fl" value="' + f.pageNumber + '" style="width:' + (f.pageNumber.toString().length + 1) * 10 + 'px;"><a id="enter" class="enter fl" href="javascript:void(0)"></a></div><span class="fl">&nbsp;/' + f.pageCount + "&nbsp;页</span>");
                    l.find("#quickPager").bind("keypress", {E: this}, function (i) {
                        var m = i.data.E;
                        if (i.keyCode == 13) {
                            var n = b(this).attr("value");
                            if (!a(n)) {
                                alert("请输入数字！");
                                return false
                            }
                            if (parseInt(n) > f.pageCount) {
                                alert("最大页数为" + f.pageCount + "！");
                                return false
                            }
                            m.callBack(n);
                            return false
                        }
                    });
                    l.find("a#enter").bind("click", {E: this}, function (i) {
                        var m = i.data.E;
                        var n = l.find("#quickPager").attr("value");
                        if (!a(n)) {
                            alert("请输入数字！");
                            return false
                        }
                        if (parseInt(n) > f.pageCount) {
                            alert("最大页数为" + f.pageCount + "！");
                            return false
                        }
                        m.callBack(n);
                        return false
                    })
                }
                k.append(l);
                return k
            };
            this.renderPageSizer = function () {
                var m;
                if (f.rowList) {
                    var j = f.text.pageSizer;
                    j = j.replace(/{#pageSizer}/g, '</span><div id="select" class="fl"></div><span class="fl">');
                    m = b('<li class="text pageSizer"><span class="fl">' + j + "</span></li>");
                    var h = '<select name="pageSize">';
                    for (var l = 0; l < f.rowList.length; l++) {
                        h += '<option value="' + f.rowList[l] + '"';
                        if (f.rowList[l] == f.pageSize) {
                            h += " selected"
                        }
                        h += ">" + f.rowList[l] + "</option>"
                    }
                    h += "</select>";
                    var k = b(h);
                    k.bind("change", {E: this}, function (i) {
                        if (f.pageSize == this.value) {
                            return
                        }
                        f.pageSize = this.value;
                        i.data.E.callBack(f.pageNumber)
                    });
                    b("#select", m).append(k)
                }
                return m
            };
            this.callBack = function (h) {
                if (typeof h != "number") {
                    h = parseInt(h)
                }
                if (h) {
                    f.pageNumber = h
                }
                if (typeof f.callBack == "function") {
                    f.callBack(f)
                }
            };
            g.empty().append(this.render())
        }

        var e = {
            pageNumber: 1,
            pageCount: 1,
            pageSize: null,
            recordCount: 0,
            qpageSize: 9,
            rowList: null,
            text: {
                recordCount: "总数目:{#recordCount}",
                first: "首页",
                pre: "上一页",
                qpage: "{#qpage}",
                pageCount: "{#pageCount}",
                next: "下一页",
                last: "末页",
                pageSizer: "每页{#pageSizer}/行"
            },
            item: ["recordCount", "first", "pre", "qpage", "next", "quickPager"]
        };
        d.text = b.extend({}, e.text, d.text);
        d = b.extend({}, e, d);
        return this.each(function () {
            new c(d, b(this))
        })
    }
})($);