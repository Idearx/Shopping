(function () {
    ol.ajaxer = function () {
        var self = this;
        this.ajaxer = null;
        this.getOptions = function (options) {
            return {
                data: options.data,
                type: options.type,
                url: options.url,
                timeout: options.timeout > 0 ? options.timeout : undefined,
                async: options.async,
                dataType: options.dataType,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                beforeSend: function (xhr) {
                    if (typeof options.beforeSendFunction == "function") options.beforeSendFunction(xhr);
                    if (options.button != null) $(options.button).attr("disabled", "disabled");
                    if (options.loadingLayer != null) $(options.loadingLayer).css("display", "block")
                },
                success: function (data) {
                    if (typeof options.afterSendFunction == "function") options.afterSendFunction(data);
                    if (options.loadingLayer != null) $(options.loadingLayer).hide();
                    if (typeof options.successFunction == "function") options.successFunction(data);
                    if (options.button != null) $(options.button).removeAttr("disabled")
                },
                error: function (xhr, status) {
                    if (typeof options.afterSendFunction == "function") options.afterSendFunction(xhr, status);
                    if (options.loadingLayer != null) $(options.loadingLayer).hide();
                    if (options.button != null) $(options.button).removeAttr("disabled");
                    if (status === "timeout" && typeof options.timeoutFunction == "function") {
                        setTimeout(options.timeoutFunction, 1)
                    } else {
                        if (typeof options.errorFunction == "function") options.errorFunction(xhr, status)
                    }
                }
            }
        };
        this.submit = function (opt) {
            opt = $.extend({}, ol.ajaxer.settings, opt);
            opt.type = "POST";
            var o = $(opt.form);
            if (opt.url) {
                o.attr("action", opt.url)
            } else {
                opt.url = o.attr("action")
            }
            if (this.ajaxer && typeof this.ajaxer.abort == "function") this.ajaxer.abort();
            return this.ajaxer = o.ajaxSubmit(this.getOptions(opt))
        };
        this.post = function (opt) {
            return this.submit(opt)
        }, this.get = function (opt) {
            opt = $.extend({}, ol.ajaxer.settings, opt);
            opt.type = "GET";
            if (this.ajaxer && typeof this.ajaxer.abort == "function") this.ajaxer.abort();
            return this.ajaxer = $.ajax(this.getOptions(opt))
        };
        this.load = function (opt) {
            opt = $.extend({}, ol.ajaxer.settings, opt);
            opt.type = "GET";
            opt.dataType = "html";
            if (this.ajaxer && typeof this.ajaxer.abort == "function") this.ajaxer.abort();
            return this.ajaxer = $.ajax(this.getOptions(opt))
        }
    };
    ol.ajaxer.settings = {
        form: "<form></form>",
        type: "post",
        url: null,
        async: true,
        data: {},
        dataType: "json",
        loadingLayer: null,
        button: null,
        beforeSendFunction: null,
        afterSendFunction: null,
        successFunction: null,
        errorFunction: null,
        timeoutFunction: null
    }
})();
ol.ajax = ol.ajaxer;