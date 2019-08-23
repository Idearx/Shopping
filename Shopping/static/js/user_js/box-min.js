window.ol || (window.ol = {});
(function () {
    var $win, $doc, isIE6 = true, _defaults = {
        boxid: "ol_box",
        boxclass: "ol_box",
        type: "dialog",
        title: "",
        width: 0,
        height: 0,
        showTitle: true,
        showButton: true,
        showCancel: true,
        showOk: true,
        okBtnName: "确定",
        cancelBtnName: "取消",
        timeout: 0,
        draggable: true,
        modal: true,
        zIndex: 5e3,
        remember: false,
        position: "center",
        clickOut: null,
        onclose: null,
        onopen: null,
        oncancel: null,
        onok: null,
        blur: null,
        focus: null,
        autoHeight: true,
        autoPosition: true,
        cache: false
    };
    var _getDoc = function () {
        return document.compatMode == "CSS1Compat" ? document.documentElement : document.body
    };
    var _getWinSize = function () {
        var doc = _getDoc();
        return {
            width: Math.max(doc.scrollWidth, doc.clientWidth || 0) - 1,
            height: Math.max(doc.scrollHeight, doc.clientHeight || 0) - 1
        }
    };
    var type = {};
    type.dialog = {
        html: "<div>" + '<div class="box-ct">' + '\t<div class="box-header">' + '\t\t<div class="box-tl"></div>' + '\t\t<div class="box-tc">' + '\t\t\t<div class="box-tc1"></div>' + '\t\t\t<div class="box-tc2"><a href="javascript:;" onclick="return false;" title="关闭" class="box-close"></a><span class="box-title"></span></div>' + "\t\t</div>" + '\t\t<div class="box-tr"></div>' + "\t</div>" + '\t<table width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;background:#fff;">' + "\t\t<tr>" + '\t\t\t<td class="box-cl"></td>' + '\t\t\t<td class="box-cc">' + '\t\t\t\t<div class="box-content"></div>' + '\t\t\t\t<div class="box-button">' + '\t\t\t\t\t<a class="box-cancel" href="javascript:;"><span>取消</span></a>' + '\t\t\t\t\t<a class="box-ok" href="javascript:;"><span>确定</span></a>' + "\t\t\t\t</div>" + "\t\t\t</td>" + '\t\t\t<td class="box-cr"></td>' + "\t\t</tr>" + "\t</table>" + '\t<div class="box-bottom">' + '\t\t<div class="box-bl"></div>' + '\t\t<div class="box-bc"></div>' + '\t\t<div class="box-br"></div>' + "\t</div>" + "</div>" + "</div>",
        initContent: function (self) {
            self.setContent(self.content)
        },
        setContent: function (self, content, callback) {
            self.content = content || self.content;
            self.setContent(self.content);
            if (typeof callback == "function") callback()
        }
    };
    type.ajax = {
        initContent: function (self) {
        }, setContent: function (self, content, callback) {
            self._b_button.hide();
            self.setContent('<div class="box-loading"></div>');
            if (self._b_content.height() < 90) self._b_content.height(Math.max(90, self.options.height));
            if (self._box.width() < 200) self._box.width(Math.max(200, self.options.width));
            var ajaxurl = content || self.content;
            if (typeof ajaxurl != "string") {
                alert("please set ajax url.");
                return
            }
            self.content = ajaxurl;
            if (self.options.cache == false) {
                if (ajaxurl.indexOf("?") == -1) {
                    ajaxurl += "?_t=" + Math.random()
                } else {
                    ajaxurl += "&_t=" + Math.random()
                }
            }
            $.get(ajaxurl, function (data) {
                if (self.options.showButton) self._b_button.show();
                self.setContent(data);
                if (typeof callback == "function") callback()
            })
        }
    };
    type.iframe = {
        initContent: function (self) {
        }, setContent: function (self, content, callback) {
            var url = content || self.content;
            if (typeof url != "string") {
                alert("please set iframe url.");
                return
            }
            self.content = url;
            var name = "box-iframe-" + (new Date).getTime();
            self.setContent('<iframe class="boxIframe" width="100%" height="100%" frameborder="0" name="' + name + '"></iframe><script>ec.redirectTo({url: "' + url + '", win: window["' + name + '"]});<\/script>');
            if (typeof callback == "function") callback()
        }, closeEvent: function (self) {
            if (!self.options.remember) {
                self.find("iframe").each(function () {
                    this.contentWindow.close();
                    $(this).remove()
                })
            }
        }
    };
    ol.box = function (content, options) {
        this.options = null;
        this._type = null;
        this._mask = null;
        this._events = {};
        this._box = null;
        this._b_content = null;
        this._b_button = null;
        this.content = content;
        this._initedContent = false;
        this._onbox = false;
        this._isOpen = false;
        $win = $(window);
        $doc = $(document);
        isIE6 = $.browser.msie && $.browser.version == "6.0", this.options = $.extend({}, _defaults, options);
        this.init()
    };
    ol.box.prototype = {
        init: function () {
            this.initConfig();
            if (this.options.modal) this.initMask();
            this.initBox();
            this.initEvent()
        }, initBox: function () {
            $("#" + this.options.boxid).remove();
            this._box = $(this._type.html).css({
                visibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: this.options.zIndex
            });
            this._b_button = this._box.find(".box-button");
            this._b_content = this._box.find(".box-content");
            this.renderBox(this.options);
            this._box.appendTo("body");
            this._type.initContent(this)
        }, initConfig: function () {
            switch (this.options.type) {
                case"ajax":
                    this._type = type.ajax;
                    break;
                case"iframe":
                    this._type = type.iframe;
                    break;
                default:
                    this._type = type.dialog;
                    break
            }
            this._type = $.extend({}, type.dialog, this._type)
        }, initEvent: function () {
            var thix = this;
            if (this.options.draggable && this.options.showTitle) {
                this._box.find(".box-header").mousedown(function (event) {
                    var h = this;
                    o = document, ox = parseInt(thix._box.css("left"), 10), oy = parseInt(thix._box.css("top"), 10), mx = event.clientX, my = event.clientY, size = _getWinSize(), box_w = thix._box.outerWidth(true), box_h = thix._box.outerHeight(true);
                    if (h.setCapture) h.setCapture();
                    var mousemove = function (event) {
                        if (window.getSelection) {
                            window.getSelection().removeAllRanges()
                        } else {
                            document.selection.empty()
                        }
                        var left = Math.max(ox + event.clientX - mx, 0), top = Math.max(oy + event.clientY - my, 0);
                        left = Math.min(left, size.width - box_w);
                        top = Math.min(top, size.height - box_h);
                        thix._box.css({left: left, top: top})
                    };
                    var mouseup = function () {
                        if (h.releaseCapture) h.releaseCapture();
                        $doc.unbind("mousemove", mousemove);
                        $doc.unbind("mouseup", mouseup)
                    };
                    $doc.mousemove(mousemove).mouseup(mouseup)
                })
            } else {
                this._box.find(".box-header").css("cursor", "default")
            }
        }, renderBox: function (options) {
            var css = {zIndex: options.zIndex, position: "absolute"};
            if (options.boxid) this._box.attr("id", options.boxid);
            if (options.boxclass) this._box.attr("class", options.boxclass);
            if (!options.showTitle) {
                this._box.find(".box-header").hide()
            } else {
                this.setTitle(options.title)
            }
            if (!options.showButton) {
                this._b_button.hide()
            } else {
                if (!options.showCancel) {
                    this._b_button.find(".box-cancel").hide()
                }
                if (!options.showOk) {
                    this._b_button.find(".box-ok").hide()
                }
            }
            this._b_button.find(".box-ok span").html(options.okBtnName);
            this._b_button.find(".box-cancel span").html(options.cancelBtnName);
            this._box.css(css)
        }, setTitle: function (title) {
            if (title.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "") == "") {
                this._box.find(".box-title").remove();
                return this
            }
            this._box.find(".box-title").html(title);
            return this
        }, setContent: function (content) {
            if (typeof content == "undefined" || content == null) return;
            this._initedContent = true;
            this._b_content.empty().html(content);
            var thix = this;
            if (this.options.width > 0) {
                this._box.css("width", this.options.width)
            } else {
                this._box.css("width", null)
            }
            if (this.options.height > 0) {
                var css = {height: this.options.height};
                this.options.autoHeight || (css["overflow-y"] = "auto");
                this._b_content.css(css)
            } else {
                this._b_content.css("height", "auto")
            }
            this.setPosition();
            this._box.find(".box-close, .box-cancel, .box-ok").unbind("click").click(function () {
                thix.close()
            });
            if (typeof this.options.onok == "function") {
                this._box.find(".box-ok").unbind("click").click(function () {
                    thix.options.onok.call(this, thix)
                })
            }
            if (typeof this.options.oncancel == "function") {
                this._box.find(".box-cancel").unbind("click").click(function () {
                    thix.options.oncancel.call(this, thix)
                })
            }
            this._box.find(".box-close, .box-cancel, .box-ok").unbind("keypress").bind("keypress", function (e) {
                e = e || window.event;
                var key = e.which || e.charCode || e.keyCode;
                switch (key) {
                    case 27:
                        thix.close();
                        return false;
                    case 32:
                    case 13:
                        $(document.activeElement).trigger("click");
                        return false
                }
            })
        }, openEvent: function () {
            if (this._isOpen) return;
            var thix = this;
            if (this.options.autoPosition) {
                if (this.options.position != "center") {
                    var timer;
                    this._events["scroll"] = function () {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            thix.setPosition()
                        }, 300)
                    };
                    $win.scroll(this._events["scroll"])
                }
                this._events["resize"] = function () {
                    thix.setPosition()
                };
                $win.resize(this._events["resize"])
            }
            if (this.options.timeout > 0) {
                this._events["timeout"] = setTimeout(function () {
                    thix.close()
                }, this.options.timeout)
            }
            this._onbox = true;
            if (this.options.clickOut) {
                this._events["box_click"] = function (event) {
                    thix._onbox = true
                };
                this._events["document_click"] = function (event) {
                    if (event.button != 0) return true;
                    if (thix._onbox === false) {
                        thix.options.clickOut(thix)
                    }
                    thix._onbox = false
                };
                this._box.bind("click", this._events["box_click"]);
                $doc.bind("click", this._events["document_click"])
            }
            if (this.options.modal) {
                this.showMask()
            }
            if (this.options.onopen) this.options.onopen(this);
            if (this.options.focus) {
                $(this.options.focus).focus()
            }
            this._isOpen = true
        }, closeEvent: function () {
            clearTimeout(this._events["timeout"]);
            if (this._events["scroll"]) $win.unbind("scroll", this._events["scroll"]);
            if (this._events["resize"]) $win.unbind("resize", this._events["resize"]);
            if (this._events["box_click"]) this._box.unbind("click", this._events["box_click"]);
            if (this._events["document_click"]) $doc.unbind("click", this._events["document_click"]);
            if (this.options.modal) {
                this.hideMask()
            }
            if (this.options.onclose) this.options.onclose(this);
            if (this.options.blur) {
                $(this.options.blur).focus()
            }
            this._isOpen = false;
            if (this._type.closeEvent) this._type.closeEvent(this)
        }, setPosition: function () {
            if (this.options.position == "center") {
                var w_h = $win.height();
                var w_w = $win.width();
                var box_w = this._box.outerWidth(true);
                var box_c_h = this._b_content.outerHeight(true);
                var box_h_h = this._box.find(".box-header:first").outerHeight(true);
                var box_h_b = this._box.find(".box-bottom:first").outerHeight(true);
                var box_h = box_c_h + box_h_h + box_h_b;
                var offset = {x: (w_w - box_w) / 2, y: (w_h - box_h) / 2};
                var css = {position: "fixed"};
                if (offset.x < 0) {
                    css.width = w_w;
                    offset.x = 0
                }
                if (offset.y < 0) {
                    css.height = w_h;
                    offset.y = 0
                }
                css.top = offset.y;
                css.left = offset.x;
                if (isIE6) {
                    css.position = "absolute";
                    var h = $("html");
                    if (!h.css("background-image") || h.css("background-image") == "none") h.css("background-image", "url(about:blank)");
                    this._box[0].style.setExpression("left", "(document.documentElement || document.body).scrollLeft+" + css.left + '+"px"');
                    this._box[0].style.setExpression("top", "(document.documentElement || document.body).scrollTop+" + css.top + '+"px"');
                    delete css["top"];
                    delete css["left"]
                }
                this._box.css(css);
                return
            } else if (Object.prototype.toString.call(this.options.position) === "[object Object]") {
                var top = this.options.position.top || 0;
                var left = this.options.position.left || 0;
                if (this.options.position.ref) {
                    var ref = $(this.options.position.ref);
                    var offset = ref.offset();
                    top += offset.top;
                    top += ref.outerHeight(true);
                    left += offset.left
                }
                this._box.css({top: top, left: left})
            }
        }, renderContent: function (content, callback) {
            if (typeof content != "undefined" && content != null) this._initedContent = false;
            if (!this._initedContent || !this.options.remember) {
                this._type.setContent(this, content, callback)
            } else {
                this.setPosition();
                this.openEvent()
            }
        }, open: function (content, options) {
            if (this._isOpen) {
                this.closeEvent()
            }
            this.options = $.extend({}, this.options, options);
            var thix = this;
            this.renderContent(content, function () {
                thix.openEvent()
            });
            this._box.stop().css({visibility: "visible", opacity: null});
            return this
        }, close: function () {
            this.closeEvent();
            this._box.css("visibility", "hidden")
        }, isOpen: function () {
            return this._isOpen
        }, fadeIn: function (content, options, ms) {
            this.options = $.extend({}, this.options, options);
            this.renderContent(content);
            var opacity = this._box.css("opacity") || 1;
            this._box.css({opacity: 0, visibility: "visible"}).stop().animate({opacity: opacity}, ms);
            this.openEvent()
        }, fadeOut: function (ms) {
            var thix = this;
            this.closeEvent();
            this._box.stop().animate({opacity: 0}, ms, function () {
                thix._box.css({visibility: "hidden", opacity: null})
            })
        }, find: function (selector) {
            return this._b_content.find(selector)
        }, getBox: function () {
            return this._box
        }, initMask: function () {
            if ($(".ol_box_mask")) {
                $(".ol_box_mask").remove()
            }
            this._mask = $("<div class='ol_box_mask'></div>").css({
                visibility: "hidden",
                width: 0,
                height: 0,
                zIndex: this.options.zIndex
            }).appendTo("body");
            var thix = this;
            this._events["masker_resize"] = function () {
                thix._mask.css(_getWinSize())
            }
        }, showMask: function () {
            var css = _getWinSize();
            css.visibility = "visible";
            this._mask.css(css);
            $win.bind("resize", this._events["masker_resize"])
        }, hideMask: function () {
            this._mask.css({visibility: "hidden", width: 0, height: 0});
            $win.unbind("resize", this._events["masker_resize"])
        }
    }
})();