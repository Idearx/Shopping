window.Swiper = function (aa, ab) {
    function ac(ae, af) {
        return document.querySelectorAll ? (af || document).querySelectorAll(ae) : jQuery(ae, af)
    }

    function ad(ae) {
        return "[object Array]" === Object.prototype.toString.apply(ae) ? !0 : !1
    }

    function y() {
        var ae = e - h;
        return ab.freeMode && (ae = e - h), ab.slidesPerView > b.slides.length && !ab.centeredSlides && (ae = 0), 0 > ae && (ae = 0), ae
    }

    function z() {
        function ae(am) {
            var aj, ak, al = function () {
                "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.reInit(), ab.onImagesReady && b.fireCallback(ab.onImagesReady, b)))
            };
            am.complete ? al() : (ak = am.currentSrc || am.getAttribute("src"), ak ? (aj = new Image, aj.onload = al, aj.onerror = al, aj.src = ak) : al())
        }

        var af = b.h.addEventListener, ag = "wrapper" === ab.eventTarget ? b.wrapper : b.container;
        if (b.browser.ie10 || b.browser.ie11 ? (af(ag, b.touchEvents.touchStart, J), af(document, b.touchEvents.touchMove, K), af(document, b.touchEvents.touchEnd, L)) : (b.support.touch && (af(ag, "touchstart", J), af(ag, "touchmove", K), af(ag, "touchend", L)), ab.simulateTouch && (af(ag, "mousedown", J), af(document, "mousemove", K), af(document, "mouseup", L))), ab.autoResize && af(window, "resize", b.resizeFix), A(), b._wheelEvent = !1, ab.mousewheelControl) {
            if (void 0 !== document.onmousewheel && (b._wheelEvent = "mousewheel"), !b._wheelEvent) {
                try {
                    new WheelEvent("wheel"), b._wheelEvent = "wheel"
                } catch (ah) {
                }
            }
            b._wheelEvent || (b._wheelEvent = "DOMMouseScroll"), b._wheelEvent && af(b.container, b._wheelEvent, D)
        }
        if (ab.keyboardControl && af(document, "keydown", C), ab.updateOnImagesReady) {
            b.imagesToLoad = ac("img", b.container);
            for (var ai = 0; ai < b.imagesToLoad.length; ai++) {
                ae(b.imagesToLoad[ai])
            }
        }
    }

    function A() {
        var ae, af = b.h.addEventListener;
        if (ab.preventLinks) {
            var ag = ac("a", b.container);
            for (ae = 0; ae < ag.length; ae++) {
                af(ag[ae], "click", H)
            }
        }
        if (ab.releaseFormElements) {
            var ah = ac("input, textarea, select", b.container);
            for (ae = 0; ae < ah.length; ae++) {
                af(ah[ae], b.touchEvents.touchStart, I, !0), b.support.touch && ab.simulateTouch && af(ah[ae], "mousedown", I, !0)
            }
        }
        if (ab.onSlideClick) {
            for (ae = 0; ae < b.slides.length; ae++) {
                af(b.slides[ae], "click", E)
            }
        }
        if (ab.onSlideTouch) {
            for (ae = 0; ae < b.slides.length; ae++) {
                af(b.slides[ae], b.touchEvents.touchStart, F)
            }
        }
    }

    function B() {
        var ae, af = b.h.removeEventListener;
        if (ab.onSlideClick) {
            for (ae = 0; ae < b.slides.length; ae++) {
                af(b.slides[ae], "click", E)
            }
        }
        if (ab.onSlideTouch) {
            for (ae = 0; ae < b.slides.length; ae++) {
                af(b.slides[ae], b.touchEvents.touchStart, F)
            }
        }
        if (ab.releaseFormElements) {
            var ag = ac("input, textarea, select", b.container);
            for (ae = 0; ae < ag.length; ae++) {
                af(ag[ae], b.touchEvents.touchStart, I, !0), b.support.touch && ab.simulateTouch && af(ag[ae], "mousedown", I, !0)
            }
        }
        if (ab.preventLinks) {
            var ah = ac("a", b.container);
            for (ae = 0; ae < ah.length; ae++) {
                af(ah[ae], "click", H)
            }
        }
    }

    function C(al) {
        var am = al.keyCode || al.charCode;
        if (!(al.shiftKey || al.altKey || al.ctrlKey || al.metaKey)) {
            if (37 === am || 39 === am || 38 === am || 40 === am) {
                for (var an = !1, ao = b.h.getOffset(b.container), ae = b.h.windowScroll().left, af = b.h.windowScroll().top, ag = b.h.windowWidth(), ah = b.h.windowHeight(), ai = [[ao.left, ao.top], [ao.left + b.width, ao.top], [ao.left, ao.top + b.height], [ao.left + b.width, ao.top + b.height]], aj = 0; aj < ai.length; aj++) {
                    var ak = ai[aj];
                    ak[0] >= ae && ak[0] <= ae + ag && ak[1] >= af && ak[1] <= af + ah && (an = !0)
                }
                if (!an) {
                    return
                }
            }
            l ? ((37 === am || 39 === am) && (al.preventDefault ? al.preventDefault() : al.returnValue = !1), 39 === am && b.swipeNext(), 37 === am && b.swipePrev()) : ((38 === am || 40 === am) && (al.preventDefault ? al.preventDefault() : al.returnValue = !1), 40 === am && b.swipeNext(), 38 === am && b.swipePrev())
        }
    }

    function D(ae) {
        var af = b._wheelEvent, ag = 0;
        if (ae.detail) {
            ag = -ae.detail
        } else {
            if ("mousewheel" === af) {
                if (ab.mousewheelControlForceToAxis) {
                    if (l) {
                        if (!(Math.abs(ae.wheelDeltaX) > Math.abs(ae.wheelDeltaY))) {
                            return
                        }
                        ag = ae.wheelDeltaX
                    } else {
                        if (!(Math.abs(ae.wheelDeltaY) > Math.abs(ae.wheelDeltaX))) {
                            return
                        }
                        ag = ae.wheelDeltaY
                    }
                } else {
                    ag = ae.wheelDelta
                }
            } else {
                if ("DOMMouseScroll" === af) {
                    ag = -ae.detail
                } else {
                    if ("wheel" === af) {
                        if (ab.mousewheelControlForceToAxis) {
                            if (l) {
                                if (!(Math.abs(ae.deltaX) > Math.abs(ae.deltaY))) {
                                    return
                                }
                                ag = -ae.deltaX
                            } else {
                                if (!(Math.abs(ae.deltaY) > Math.abs(ae.deltaX))) {
                                    return
                                }
                                ag = -ae.deltaY
                            }
                        } else {
                            ag = Math.abs(ae.deltaX) > Math.abs(ae.deltaY) ? -ae.deltaX : -ae.deltaY
                        }
                    }
                }
            }
        }
        if (ab.freeMode) {
            var ah = b.getWrapperTranslate() + ag;
            if (ah > 0 && (ah = 0), ah < -y() && (ah = -y()), b.setWrapperTransition(0), b.setWrapperTranslate(ah), b.updateActiveSlide(ah), 0 === ah || ah === -y()) {
                return
            }
        } else {
            (new Date).getTime() - t > 60 && (0 > ag ? b.swipeNext() : b.swipePrev()), t = (new Date).getTime()
        }
        return ab.autoplay && b.stopAutoplay(!0), ae.preventDefault ? ae.preventDefault() : ae.returnValue = !1, !1
    }

    function E(ae) {
        b.allowSlideClick && (G(ae), b.fireCallback(ab.onSlideClick, b, ae))
    }

    function F(ae) {
        G(ae), b.fireCallback(ab.onSlideTouch, b, ae)
    }

    function G(ae) {
        if (ae.currentTarget) {
            b.clickedSlide = ae.currentTarget
        } else {
            var af = ae.srcElement;
            do {
                if (af.className.indexOf(ab.slideClass) > -1) {
                    break
                }
                af = af.parentNode
            } while (af);
            b.clickedSlide = af
        }
        b.clickedSlideIndex = b.slides.indexOf(b.clickedSlide), b.clickedSlideLoopIndex = b.clickedSlideIndex - (b.loopedSlides || 0)
    }

    function H(ae) {
        return b.allowLinks ? void 0 : (ae.preventDefault ? ae.preventDefault() : ae.returnValue = !1, ab.preventLinksPropagation && "stopPropagation" in ae && ae.stopPropagation(), !1)
    }

    function I(ae) {
        return ae.stopPropagation ? ae.stopPropagation() : ae.returnValue = !1, !1
    }

    function J(ae) {
        if (ab.preventLinks && (b.allowLinks = !0), b.isTouched || ab.onlyExternal) {
            return !1
        }
        var af = ae.target || ae.srcElement;
        document.activeElement && document.activeElement !== document.body && document.activeElement !== af && document.activeElement.blur();
        var ag = "input select textarea".split(" ");
        if (ab.noSwiping && af && N(af)) {
            return !1
        }
        if (Y = !1, b.isTouched = !0, U = "touchstart" === ae.type, !U && "which" in ae && 3 === ae.which) {
            return b.isTouched = !1, !1
        }
        if (!U || 1 === ae.targetTouches.length) {
            b.callPlugins("onTouchStartBegin"), !U && !b.isAndroid && ag.indexOf(af.tagName.toLowerCase()) < 0 && (ae.preventDefault ? ae.preventDefault() : ae.returnValue = !1);
            var ah = U ? ae.targetTouches[0].pageX : ae.pageX || ae.clientX,
                ai = U ? ae.targetTouches[0].pageY : ae.pageY || ae.clientY;
            b.touches.startX = b.touches.currentX = ah, b.touches.startY = b.touches.currentY = ai, b.touches.start = b.touches.current = l ? ah : ai, b.setWrapperTransition(0), b.positions.start = b.positions.current = b.getWrapperTranslate(), b.setWrapperTranslate(b.positions.start), b.times.start = (new Date).getTime(), g = void 0, ab.moveStartThreshold > 0 && (v = !1), ab.onTouchStart && b.fireCallback(ab.onTouchStart, b, ae), b.callPlugins("onTouchStartEnd")
        }
    }

    function K(af) {
        if (b.isTouched && !ab.onlyExternal && (!U || "mousemove" !== af.type)) {
            var ak = U ? af.targetTouches[0].pageX : af.pageX || af.clientX,
                ae = U ? af.targetTouches[0].pageY : af.pageY || af.clientY;
            if ("undefined" == typeof g && l && (g = !!(g || Math.abs(ae - b.touches.startY) > Math.abs(ak - b.touches.startX))), "undefined" != typeof g || l || (g = !!(g || Math.abs(ae - b.touches.startY) < Math.abs(ak - b.touches.startX))), g) {
                return void (b.isTouched = !1)
            }
            if (l) {
                if (!ab.swipeToNext && ak < b.touches.startX || !ab.swipeToPrev && ak > b.touches.startX) {
                    return
                }
            } else {
                if (!ab.swipeToNext && ae < b.touches.startY || !ab.swipeToPrev && ae > b.touches.startY) {
                    return
                }
            }
            if (af.assignedToSwiper) {
                return void (b.isTouched = !1)
            }
            if (af.assignedToSwiper = !0, ab.preventLinks && (b.allowLinks = !1), ab.onSlideClick && (b.allowSlideClick = !1), ab.autoplay && b.stopAutoplay(!0), !U || 1 === af.touches.length) {
                if (b.isMoved || (b.callPlugins("onTouchMoveStart"), ab.loop && (b.fixLoop(), b.positions.start = b.getWrapperTranslate()), ab.onTouchMoveStart && b.fireCallback(ab.onTouchMoveStart, b)), b.isMoved = !0, af.preventDefault ? af.preventDefault() : af.returnValue = !1, b.touches.current = l ? ak : ae, b.positions.current = (b.touches.current - b.touches.start) * ab.touchRatio + b.positions.start, b.positions.current > 0 && ab.onResistanceBefore && b.fireCallback(ab.onResistanceBefore, b, b.positions.current), b.positions.current < -y() && ab.onResistanceAfter && b.fireCallback(ab.onResistanceAfter, b, Math.abs(b.positions.current + y())), ab.resistance && "100%" !== ab.resistance) {
                    var ag;
                    if (b.positions.current > 0 && (ag = 1 - b.positions.current / h / 2, b.positions.current = .5 > ag ? h / 2 : b.positions.current * ag), b.positions.current < -y()) {
                        var ah = (b.touches.current - b.touches.start) * ab.touchRatio + (y() + b.positions.start);
                        ag = (h + ah) / h;
                        var ai = b.positions.current - ah * (1 - ag) / 2, aj = -y() - h / 2;
                        b.positions.current = aj > ai || 0 >= ag ? aj : ai
                    }
                }
                if (ab.resistance && "100%" === ab.resistance && (b.positions.current > 0 && (!ab.freeMode || ab.freeModeFluid) && (b.positions.current = 0), b.positions.current < -y() && (!ab.freeMode || ab.freeModeFluid) && (b.positions.current = -y())), !ab.followFinger) {
                    return
                }
                if (ab.moveStartThreshold) {
                    if (Math.abs(b.touches.current - b.touches.start) > ab.moveStartThreshold || v) {
                        if (!v) {
                            return v = !0, void (b.touches.start = b.touches.current)
                        }
                        b.setWrapperTranslate(b.positions.current)
                    } else {
                        b.positions.current = b.positions.start
                    }
                } else {
                    b.setWrapperTranslate(b.positions.current)
                }
                return (ab.freeMode || ab.watchActiveIndex) && b.updateActiveSlide(b.positions.current), ab.grabCursor && (b.container.style.cursor = "move", b.container.style.cursor = "grabbing", b.container.style.cursor = "-moz-grabbin", b.container.style.cursor = "-webkit-grabbing"), w || (w = b.touches.current), x || (x = (new Date).getTime()), b.velocity = (b.touches.current - w) / ((new Date).getTime() - x) / 2, Math.abs(b.touches.current - w) < 2 && (b.velocity = 0), w = b.touches.current, x = (new Date).getTime(), b.callPlugins("onTouchMoveEnd"), ab.onTouchMove && b.fireCallback(ab.onTouchMove, b, af), !1
            }
        }
    }

    function L(ar) {
        if (g && b.swipeReset(), !ab.onlyExternal && b.isTouched) {
            b.isTouched = !1, ab.grabCursor && (b.container.style.cursor = "move", b.container.style.cursor = "grab", b.container.style.cursor = "-moz-grab", b.container.style.cursor = "-webkit-grab"), b.positions.current || 0 === b.positions.current || (b.positions.current = b.positions.start), ab.followFinger && b.setWrapperTranslate(b.positions.current), b.times.end = (new Date).getTime(), b.touches.diff = b.touches.current - b.touches.start, b.touches.abs = Math.abs(b.touches.diff), b.positions.diff = b.positions.current - b.positions.start, b.positions.abs = Math.abs(b.positions.diff);
            var au = b.positions.diff, ae = b.positions.abs, af = b.times.end - b.times.start;
            5 > ae && 300 > af && b.allowLinks === !1 && (ab.freeMode || 0 === ae || b.swipeReset(), ab.preventLinks && (b.allowLinks = !0), ab.onSlideClick && (b.allowSlideClick = !0)), setTimeout(function () {
                "undefined" != typeof b && null !== b && (ab.preventLinks && (b.allowLinks = !0), ab.onSlideClick && (b.allowSlideClick = !0))
            }, 100);
            var ag = y();
            if (!b.isMoved && ab.freeMode) {
                return b.isMoved = !1, ab.onTouchEnd && b.fireCallback(ab.onTouchEnd, b, ar), void b.callPlugins("onTouchEnd")
            }
            if (!b.isMoved || b.positions.current > 0 || b.positions.current < -ag) {
                return b.swipeReset(), ab.onTouchEnd && b.fireCallback(ab.onTouchEnd, b, ar), void b.callPlugins("onTouchEnd")
            }
            if (b.isMoved = !1, ab.freeMode) {
                if (ab.freeModeFluid) {
                    var ah, aj = 1e3 * ab.momentumRatio, al = b.velocity * aj, am = b.positions.current + al, an = !1,
                        ao = 20 * Math.abs(b.velocity) * ab.momentumBounceRatio;
                    -ag > am && (ab.momentumBounce && b.support.transitions ? (-ao > am + ag && (am = -ag - ao), ah = -ag, an = !0, Y = !0) : am = -ag), am > 0 && (ab.momentumBounce && b.support.transitions ? (am > ao && (am = ao), ah = 0, an = !0, Y = !0) : am = 0), 0 !== b.velocity && (aj = Math.abs((am - b.positions.current) / b.velocity)), b.setWrapperTranslate(am), b.setWrapperTransition(aj), ab.momentumBounce && an && b.wrapperTransitionEnd(function () {
                        Y && (ab.onMomentumBounce && b.fireCallback(ab.onMomentumBounce, b), b.callPlugins("onMomentumBounce"), b.setWrapperTranslate(ah), b.setWrapperTransition(300))
                    }), b.updateActiveSlide(am)
                }
                return (!ab.freeModeFluid || af >= 300) && b.updateActiveSlide(b.positions.current), ab.onTouchEnd && b.fireCallback(ab.onTouchEnd, b, ar), void b.callPlugins("onTouchEnd")
            }
            f = 0 > au ? "toNext" : "toPrev", "toNext" === f && 300 >= af && (30 > ae || !ab.shortSwipes ? b.swipeReset() : b.swipeNext(!0, !0)), "toPrev" === f && 300 >= af && (30 > ae || !ab.shortSwipes ? b.swipeReset() : b.swipePrev(!0, !0));
            var ap = 0;
            if ("auto" === ab.slidesPerView) {
                for (var aq, at = Math.abs(b.getWrapperTranslate()), ai = 0, ak = 0; ak < b.slides.length; ak++) {
                    if (aq = l ? b.slides[ak].getWidth(!0, ab.roundLengths) : b.slides[ak].getHeight(!0, ab.roundLengths), ai += aq, ai > at) {
                        ap = aq;
                        break
                    }
                }
                ap > h && (ap = h)
            } else {
                ap = d * ab.slidesPerView
            }
            "toNext" === f && af > 300 && (ae >= ap * ab.longSwipesRatio ? b.swipeNext(!0, !0) : b.swipeReset()), "toPrev" === f && af > 300 && (ae >= ap * ab.longSwipesRatio ? b.swipePrev(!0, !0) : b.swipeReset()), ab.onTouchEnd && b.fireCallback(ab.onTouchEnd, b, ar), b.callPlugins("onTouchEnd")
        }
    }

    function M(ae, af) {
        return ae && ae.getAttribute("class") && ae.getAttribute("class").indexOf(af) > -1
    }

    function N(ae) {
        var af = !1;
        do {
            M(ae, ab.noSwipingClass) && (af = !0), ae = ae.parentElement
        } while (!af && ae.parentElement && !M(ae, ab.wrapperClass));
        return !af && M(ae, ab.wrapperClass) && M(ae, ab.noSwipingClass) && (af = !0), af
    }

    function O(ag, ah) {
        var ae, af = document.createElement("div");
        return af.innerHTML = ah, ae = af.firstChild, ae.className += " " + ag, ae.outerHTML
    }

    function P(am, an, ae) {
        function af() {
            var ap = +new Date, ao = ap - ah;
            ai += aj * ao / (1e3 / 60), al = "toNext" === ak ? ai > am : am > ai, al ? (b.setWrapperTranslate(Math.ceil(ai)), b._DOMAnimating = !0, window.setTimeout(function () {
                af()
            }, 1e3 / 60)) : (ab.onSlideChangeEnd && ("to" === an ? ae.runCallbacks === !0 && b.fireCallback(ab.onSlideChangeEnd, b, ak) : b.fireCallback(ab.onSlideChangeEnd, b, ak)), b.setWrapperTranslate(am), b._DOMAnimating = !1)
        }

        var ag = "to" === an && ae.speed >= 0 ? ae.speed : ab.speed, ah = +new Date;
        if (b.support.transitions || !ab.DOMAnimation) {
            b.setWrapperTranslate(am), b.setWrapperTransition(ag)
        } else {
            var ai = b.getWrapperTranslate(), aj = Math.ceil((am - ai) / ag * (1e3 / 60)),
                ak = ai > am ? "toNext" : "toPrev", al = "toNext" === ak ? ai > am : am > ai;
            if (b._DOMAnimating) {
                return
            }
            af()
        }
        b.updateActiveSlide(am), ab.onSlideNext && "next" === an && ae.runCallbacks === !0 && b.fireCallback(ab.onSlideNext, b, am), ab.onSlidePrev && "prev" === an && ae.runCallbacks === !0 && b.fireCallback(ab.onSlidePrev, b, am), ab.onSlideReset && "reset" === an && ae.runCallbacks === !0 && b.fireCallback(ab.onSlideReset, b, am), "next" !== an && "prev" !== an && "to" !== an || ae.runCallbacks !== !0 || Q(an)
    }

    function Q(ae) {
        if (b.callPlugins("onSlideChangeStart"), ab.onSlideChangeStart) {
            if (ab.queueStartCallbacks && b.support.transitions) {
                if (b._queueStartCallbacks) {
                    return
                }
                b._queueStartCallbacks = !0, b.fireCallback(ab.onSlideChangeStart, b, ae), b.wrapperTransitionEnd(function () {
                    b._queueStartCallbacks = !1
                })
            } else {
                b.fireCallback(ab.onSlideChangeStart, b, ae)
            }
        }
        if (ab.onSlideChangeEnd) {
            if (b.support.transitions) {
                if (ab.queueEndCallbacks) {
                    if (b._queueEndCallbacks) {
                        return
                    }
                    b._queueEndCallbacks = !0, b.wrapperTransitionEnd(function (af) {
                        b.fireCallback(ab.onSlideChangeEnd, af, ae)
                    })
                } else {
                    b.wrapperTransitionEnd(function (af) {
                        b.fireCallback(ab.onSlideChangeEnd, af, ae)
                    })
                }
            } else {
                ab.DOMAnimation || setTimeout(function () {
                    b.fireCallback(ab.onSlideChangeEnd, b, ae)
                }, 10)
            }
        }
    }

    function R() {
        var ae = b.paginationButtons;
        if (ae) {
            for (var af = 0; af < ae.length; af++) {
                b.h.removeEventListener(ae[af], "click", T)
            }
        }
    }

    function S() {
        var ae = b.paginationButtons;
        if (ae) {
            for (var af = 0; af < ae.length; af++) {
                b.h.addEventListener(ae[af], "click", T)
            }
        }
    }

    function T(ae) {
        for (var af, ag = ae.target || ae.srcElement, ah = b.paginationButtons, ai = 0; ai < ah.length; ai++) {
            ag === ah[ai] && (af = ai)
        }
        ab.autoplay && b.stopAutoplay(!0), b.swipeTo(af)
    }

    function V() {
        W = setTimeout(function () {
            ab.loop ? (b.fixLoop(), b.swipeNext(!0, !0)) : b.swipeNext(!0, !0) || (ab.autoplayStopOnLast ? (clearTimeout(W), W = void 0) : b.swipeTo(0)), b.wrapperTransitionEnd(function () {
                "undefined" != typeof W && V()
            })
        }, ab.autoplay)
    }

    function X() {
        b.calcSlides(), ab.loader.slides.length > 0 && 0 === b.slides.length && b.loadSlides(), ab.loop && b.createLoop(), b.init(), z(), ab.pagination && b.createPagination(!0), ab.loop || ab.initialSlide > 0 ? b.swipeTo(ab.initialSlide, 0, !1) : b.updateActiveSlide(0), ab.autoplay && b.startAutoplay(), b.centerIndex = b.activeIndex, ab.onSwiperCreated && b.fireCallback(ab.onSwiperCreated, b), b.callPlugins("onSwiperCreated")
    }

    if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
        var a = HTMLElement.prototype;
        a.__defineGetter__ && a.__defineGetter__("outerHTML", function () {
            return (new XMLSerializer).serializeToString(this)
        })
    }
    if (window.getComputedStyle || (window.getComputedStyle = function (ae) {
        return this.el = ae, this.getPropertyValue = function (af) {
            var ag = /(\-([a-z]){1})/g;
            return "float" === af && (af = "styleFloat"), ag.test(af) && (af = af.replace(ag, function () {
                return arguments[2].toUpperCase()
            })), ae.currentStyle[af] ? ae.currentStyle[af] : null
        }, this
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (ag, ah) {
        for (var ae = ah || 0, af = this.length; af > ae; ae++) {
            if (this[ae] === ag) {
                return ae
            }
        }
        return -1
    }), (document.querySelectorAll || window.jQuery) && "undefined" != typeof aa && (aa.nodeType || 0 !== ac(aa).length)) {
        var b = this;
        b.touches = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
            abs: 0
        }, b.positions = {start: 0, abs: 0, diff: 0, current: 0}, b.times = {
            start: 0,
            end: 0
        }, b.id = (new Date).getTime(), b.container = aa.nodeType ? aa : ac(aa)[0], b.isTouched = !1, b.isMoved = !1, b.activeIndex = 0, b.centerIndex = 0, b.activeLoaderIndex = 0, b.activeLoopIndex = 0, b.previousIndex = null, b.velocity = 0, b.snapGrid = [], b.slidesGrid = [], b.imagesToLoad = [], b.imagesLoaded = 0, b.wrapperLeft = 0, b.wrapperRight = 0, b.wrapperTop = 0, b.wrapperBottom = 0, b.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;
        var c, d, e, f, g, h, i = {
            eventTarget: "wrapper",
            mode: "horizontal",
            touchRatio: 1,
            speed: 300,
            freeMode: !1,
            freeModeFluid: !1,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerViewFit: !0,
            simulateTouch: !0,
            followFinger: !0,
            shortSwipes: !0,
            longSwipesRatio: .5,
            moveStartThreshold: !1,
            onlyExternal: !1,
            createPagination: !0,
            pagination: !1,
            paginationElement: "span",
            paginationClickable: !1,
            paginationAsRange: !0,
            resistance: !0,
            scrollContainer: !1,
            preventLinks: !0,
            preventLinksPropagation: !1,
            noSwiping: !1,
            noSwipingClass: "swiper-no-swiping",
            initialSlide: 0,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelControlForceToAxis: !1,
            useCSS3Transforms: !0,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            loop: !1,
            loopAdditionalSlides: 0,
            roundLengths: !1,
            calculateHeight: !1,
            cssWidthAndHeight: !1,
            updateOnImagesReady: !0,
            releaseFormElements: !0,
            watchActiveIndex: !1,
            visibilityFullFit: !1,
            offsetPxBefore: 0,
            offsetPxAfter: 0,
            offsetSlidesBefore: 0,
            offsetSlidesAfter: 0,
            centeredSlides: !1,
            queueStartCallbacks: !1,
            queueEndCallbacks: !1,
            autoResize: !0,
            resizeReInit: !1,
            DOMAnimation: !0,
            loader: {slides: [], slidesHTMLType: "inner", surroundGroups: 1, logic: "reload", loadAllSlides: !1},
            swipeToPrev: !0,
            swipeToNext: !0,
            slideElement: "div",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            wrapperClass: "swiper-wrapper",
            paginationElementClass: "swiper-pagination-switch",
            paginationActiveClass: "swiper-active-switch",
            paginationVisibleClass: "swiper-visible-switch",
            btnPrefix: "swiper-button"
        };
        ab = ab || {};
        for (var j in i) {
            if (j in ab && "object" == typeof ab[j]) {
                for (var k in i[j]) {
                    k in ab[j] || (ab[j][k] = i[j][k])
                }
            } else {
                j in ab || (ab[j] = i[j])
            }
        }
        b.params = ab, ab.scrollContainer && (ab.freeMode = !0, ab.freeModeFluid = !0), ab.loop && (ab.resistance = "100%");
        var l = "horizontal" === ab.mode, m = ["mousedown", "mousemove", "mouseup"];
        b.browser.ie10 && (m = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.browser.ie11 && (m = ["pointerdown", "pointermove", "pointerup"]), b.touchEvents = {
            touchStart: b.support.touch || !ab.simulateTouch ? "touchstart" : m[0],
            touchMove: b.support.touch || !ab.simulateTouch ? "touchmove" : m[1],
            touchEnd: b.support.touch || !ab.simulateTouch ? "touchend" : m[2]
        };
        for (var n = b.container.childNodes.length - 1; n >= 0; n--) {
            if (b.container.childNodes[n].className) {
                for (var o = b.container.childNodes[n].className.split(/\s+/), p = 0; p < o.length; p++) {
                    o[p] === ab.wrapperClass && (c = b.container.childNodes[n])
                }
            }
        }
        b.wrapper = c, b._extendSwiperSlide = function (ae) {
            return ae.append = function () {
                return ab.loop ? ae.insertAfter(b.slides.length - b.loopedSlides) : (b.wrapper.appendChild(ae), b.reInit()), ae
            }, ae.prepend = function () {
                return ab.loop ? (b.wrapper.insertBefore(ae, b.slides[b.loopedSlides]), b.removeLoopedSlides(), b.calcSlides(), b.createLoop()) : b.wrapper.insertBefore(ae, b.wrapper.firstChild), b.reInit(), ae
            }, ae.insertAfter = function (ag) {
                if ("undefined" == typeof ag) {
                    return !1
                }
                var af;
                return ab.loop ? (af = b.slides[ag + 1 + b.loopedSlides], af ? b.wrapper.insertBefore(ae, af) : b.wrapper.appendChild(ae), b.removeLoopedSlides(), b.calcSlides(), b.createLoop()) : (af = b.slides[ag + 1], b.wrapper.insertBefore(ae, af)), b.reInit(), ae
            }, ae.clone = function () {
                return b._extendSwiperSlide(ae.cloneNode(!0))
            }, ae.remove = function () {
                b.wrapper.removeChild(ae), b.reInit()
            }, ae.html = function (af) {
                return "undefined" == typeof af ? ae.innerHTML : (ae.innerHTML = af, ae)
            }, ae.index = function () {
                for (var af, ag = b.slides.length - 1; ag >= 0; ag--) {
                    ae === b.slides[ag] && (af = ag)
                }
                return af
            }, ae.isActive = function () {
                return ae.index() === b.activeIndex ? !0 : !1
            }, ae.swiperSlideDataStorage || (ae.swiperSlideDataStorage = {}), ae.getData = function (af) {
                return ae.swiperSlideDataStorage[af]
            }, ae.setData = function (af, ag) {
                return ae.swiperSlideDataStorage[af] = ag, ae
            }, ae.data = function (af, ag) {
                return "undefined" == typeof ag ? ae.getAttribute("data-" + af) : (ae.setAttribute("data-" + af, ag), ae)
            }, ae.getWidth = function (af, ag) {
                return b.h.getWidth(ae, af, ag)
            }, ae.getHeight = function (af, ag) {
                return b.h.getHeight(ae, af, ag)
            }, ae.getOffset = function () {
                return b.h.getOffset(ae)
            }, ae
        }, b.calcSlides = function (ae) {
            var af = b.slides ? b.slides.length : !1;
            b.slides = [], b.displaySlides = [];
            for (var ag = 0; ag < b.wrapper.childNodes.length; ag++) {
                if (b.wrapper.childNodes[ag].className) {
                    for (var ah = b.wrapper.childNodes[ag].className, ai = ah.split(/\s+/), aj = 0; aj < ai.length; aj++) {
                        ai[aj] === ab.slideClass && b.slides.push(b.wrapper.childNodes[ag])
                    }
                }
            }
            for (ag = b.slides.length - 1; ag >= 0; ag--) {
                b._extendSwiperSlide(b.slides[ag])
            }
            af !== !1 && (af !== b.slides.length || ae) && (B(), A(), b.updateActiveSlide(), b.params.pagination && b.createPagination(), b.callPlugins("numberOfSlidesChanged"))
        }, b.createSlide = function (ae, af, ag) {
            af = af || b.params.slideClass, ag = ag || ab.slideElement;
            var ah = document.createElement(ag);
            return ah.innerHTML = ae || "", ah.className = af, b._extendSwiperSlide(ah)
        }, b.appendSlide = function (af, ag, ae) {
            return af ? af.nodeType ? b._extendSwiperSlide(af).append() : b.createSlide(af, ag, ae).append() : void 0
        }, b.prependSlide = function (af, ag, ae) {
            return af ? af.nodeType ? b._extendSwiperSlide(af).prepend() : b.createSlide(af, ag, ae).prepend() : void 0
        }, b.insertSlideAfter = function (ag, ah, ae, af) {
            return "undefined" == typeof ag ? !1 : ah.nodeType ? b._extendSwiperSlide(ah).insertAfter(ag) : b.createSlide(ah, ae, af).insertAfter(ag)
        }, b.removeSlide = function (ae) {
            if (b.slides[ae]) {
                if (ab.loop) {
                    if (!b.slides[ae + b.loopedSlides]) {
                        return !1
                    }
                    b.slides[ae + b.loopedSlides].remove(), b.removeLoopedSlides(), b.calcSlides(), b.createLoop()
                } else {
                    b.slides[ae].remove()
                }
                return !0
            }
            return !1
        }, b.removeLastSlide = function () {
            return b.slides.length > 0 ? (ab.loop ? (b.slides[b.slides.length - 1 - b.loopedSlides].remove(), b.removeLoopedSlides(), b.calcSlides(), b.createLoop()) : b.slides[b.slides.length - 1].remove(), !0) : !1
        }, b.removeAllSlides = function () {
            for (var ae = b.slides.length, af = b.slides.length - 1; af >= 0; af--) {
                b.slides[af].remove(), af === ae - 1 && b.setWrapperTranslate(0)
            }
        }, b.getSlide = function (ae) {
            return b.slides[ae]
        }, b.getLastSlide = function () {
            return b.slides[b.slides.length - 1]
        }, b.getFirstSlide = function () {
            return b.slides[0]
        }, b.activeSlide = function () {
            return b.slides[b.activeIndex]
        }, b.fireCallback = function () {
            var ae = arguments[0];
            if ("[object Array]" === Object.prototype.toString.call(ae)) {
                for (var af = 0; af < ae.length; af++) {
                    "function" == typeof ae[af] && ae[af](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }
            } else {
                "[object String]" === Object.prototype.toString.call(ae) ? ab["on" + ae] && b.fireCallback(ab["on" + ae], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) : ae(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }
        }, b.addCallback = function (ag, ah) {
            var ae, af = this;
            return af.params["on" + ag] ? ad(this.params["on" + ag]) ? this.params["on" + ag].push(ah) : "function" == typeof this.params["on" + ag] ? (ae = this.params["on" + ag], this.params["on" + ag] = [], this.params["on" + ag].push(ae), this.params["on" + ag].push(ah)) : void 0 : (this.params["on" + ag] = [], this.params["on" + ag].push(ah))
        }, b.removeCallbacks = function (ae) {
            b.params["on" + ae] && (b.params["on" + ae] = null)
        };
        var q = [];
        for (var r in b.plugins) {
            if (ab[r]) {
                var s = b.plugins[r](b, ab[r]);
                s && q.push(s)
            }
        }
        b.callPlugins = function (af, ag) {
            ag || (ag = {});
            for (var ae = 0; ae < q.length; ae++) {
                af in q[ae] && q[ae][af](ag)
            }
        }, !b.browser.ie10 && !b.browser.ie11 || ab.onlyExternal || b.wrapper.classList.add("swiper-wp8-" + (l ? "horizontal" : "vertical")), ab.freeMode && (b.container.className += " swiper-free-mode"), b.initialized = !1, b.init = function (ae, af) {
            var ag = b.h.getWidth(b.container, !1, ab.roundLengths),
                ah = b.h.getHeight(b.container, !1, ab.roundLengths);
            if (ag !== b.width || ah !== b.height || ae) {
                b.width = ag, b.height = ah;
                var ai, aj, am, ao, aq, ar, at;
                h = l ? ag : ah;
                var au = b.wrapper;
                if (ae && b.calcSlides(af), "auto" === ab.slidesPerView) {
                    var av = 0, aw = 0;
                    ab.slidesOffset > 0 && (au.style.paddingLeft = "", au.style.paddingRight = "", au.style.paddingTop = "", au.style.paddingBottom = ""), au.style.width = "", au.style.height = "", ab.offsetPxBefore > 0 && (l ? b.wrapperLeft = ab.offsetPxBefore : b.wrapperTop = ab.offsetPxBefore), ab.offsetPxAfter > 0 && (l ? b.wrapperRight = ab.offsetPxAfter : b.wrapperBottom = ab.offsetPxAfter), ab.centeredSlides && (l ? (b.wrapperLeft = (h - this.slides[0].getWidth(!0, ab.roundLengths)) / 2, b.wrapperRight = (h - b.slides[b.slides.length - 1].getWidth(!0, ab.roundLengths)) / 2) : (b.wrapperTop = (h - b.slides[0].getHeight(!0, ab.roundLengths)) / 2, b.wrapperBottom = (h - b.slides[b.slides.length - 1].getHeight(!0, ab.roundLengths)) / 2)), l ? (b.wrapperLeft >= 0 && (au.style.paddingLeft = b.wrapperLeft + "px"), b.wrapperRight >= 0 && (au.style.paddingRight = b.wrapperRight + "px")) : (b.wrapperTop >= 0 && (au.style.paddingTop = b.wrapperTop + "px"), b.wrapperBottom >= 0 && (au.style.paddingBottom = b.wrapperBottom + "px")), ar = 0;
                    var ax = 0;
                    for (b.snapGrid = [], b.slidesGrid = [], am = 0, at = 0; at < b.slides.length; at++) {
                        ai = b.slides[at].getWidth(!0, ab.roundLengths), aj = b.slides[at].getHeight(!0, ab.roundLengths), ab.calculateHeight && (am = Math.max(am, aj));
                        var ay = l ? ai : aj;
                        if (ab.centeredSlides) {
                            var ak = at === b.slides.length - 1 ? 0 : b.slides[at + 1].getWidth(!0, ab.roundLengths),
                                al = at === b.slides.length - 1 ? 0 : b.slides[at + 1].getHeight(!0, ab.roundLengths),
                                an = l ? ak : al;
                            if (ay > h) {
                                if (ab.slidesPerViewFit) {
                                    b.snapGrid.push(ar + b.wrapperLeft), b.snapGrid.push(ar + ay - h + b.wrapperLeft)
                                } else {
                                    for (var ap = 0; ap <= Math.floor(ay / (h + b.wrapperLeft)); ap++) {
                                        b.snapGrid.push(0 === ap ? ar + b.wrapperLeft : ar + b.wrapperLeft + h * ap)
                                    }
                                }
                                b.slidesGrid.push(ar + b.wrapperLeft)
                            } else {
                                b.snapGrid.push(ax), b.slidesGrid.push(ax)
                            }
                            ax += ay / 2 + an / 2
                        } else {
                            if (ay > h) {
                                if (ab.slidesPerViewFit) {
                                    b.snapGrid.push(ar), b.snapGrid.push(ar + ay - h)
                                } else {
                                    if (0 !== h) {
                                        for (var az = 0; az <= Math.floor(ay / h); az++) {
                                            b.snapGrid.push(ar + h * az)
                                        }
                                    } else {
                                        b.snapGrid.push(ar)
                                    }
                                }
                            } else {
                                b.snapGrid.push(ar)
                            }
                            b.slidesGrid.push(ar)
                        }
                        ar += ay, av += ai, aw += aj
                    }
                    ab.calculateHeight && (b.height = am), l ? (e = av + b.wrapperRight + b.wrapperLeft, ab.cssWidthAndHeight && "height" !== ab.cssWidthAndHeight || (au.style.width = av + "px"), ab.cssWidthAndHeight && "width" !== ab.cssWidthAndHeight || (au.style.height = b.height + "px")) : (ab.cssWidthAndHeight && "height" !== ab.cssWidthAndHeight || (au.style.width = b.width + "px"), ab.cssWidthAndHeight && "width" !== ab.cssWidthAndHeight || (au.style.height = aw + "px"), e = aw + b.wrapperTop + b.wrapperBottom)
                } else {
                    if (ab.scrollContainer) {
                        au.style.width = "", au.style.height = "", ao = b.slides[0].getWidth(!0, ab.roundLengths), aq = b.slides[0].getHeight(!0, ab.roundLengths), e = l ? ao : aq, au.style.width = ao + "px", au.style.height = aq + "px", d = l ? ao : aq
                    } else {
                        if (ab.calculateHeight) {
                            for (am = 0, aq = 0, l || (b.container.style.height = ""), au.style.height = "", at = 0; at < b.slides.length; at++) {
                                b.slides[at].style.height = "", am = Math.max(b.slides[at].getHeight(!0), am), l || (aq += b.slides[at].getHeight(!0))
                            }
                            aj = am, b.height = aj, l ? aq = aj : (h = aj, b.container.style.height = h + "px")
                        } else {
                            aj = l ? b.height : b.height / ab.slidesPerView, ab.roundLengths && (aj = Math.ceil(aj)), aq = l ? b.height : b.slides.length * aj
                        }
                        for (ai = l ? b.width / ab.slidesPerView : b.width, ab.roundLengths && (ai = Math.ceil(ai)), ao = l ? b.slides.length * ai : b.width, d = l ? ai : aj, ab.offsetSlidesBefore > 0 && (l ? b.wrapperLeft = d * ab.offsetSlidesBefore : b.wrapperTop = d * ab.offsetSlidesBefore), ab.offsetSlidesAfter > 0 && (l ? b.wrapperRight = d * ab.offsetSlidesAfter : b.wrapperBottom = d * ab.offsetSlidesAfter), ab.offsetPxBefore > 0 && (l ? b.wrapperLeft = ab.offsetPxBefore : b.wrapperTop = ab.offsetPxBefore), ab.offsetPxAfter > 0 && (l ? b.wrapperRight = ab.offsetPxAfter : b.wrapperBottom = ab.offsetPxAfter), ab.centeredSlides && (l ? (b.wrapperLeft = (h - d) / 2, b.wrapperRight = (h - d) / 2) : (b.wrapperTop = (h - d) / 2, b.wrapperBottom = (h - d) / 2)), l ? (b.wrapperLeft > 0 && (au.style.paddingLeft = b.wrapperLeft + "px"), b.wrapperRight > 0 && (au.style.paddingRight = b.wrapperRight + "px")) : (b.wrapperTop > 0 && (au.style.paddingTop = b.wrapperTop + "px"), b.wrapperBottom > 0 && (au.style.paddingBottom = b.wrapperBottom + "px")), e = l ? ao + b.wrapperRight + b.wrapperLeft : aq + b.wrapperTop + b.wrapperBottom, parseFloat(ao) > 0 && (!ab.cssWidthAndHeight || "height" === ab.cssWidthAndHeight) && (au.style.width = ao + "px"), parseFloat(aq) > 0 && (!ab.cssWidthAndHeight || "width" === ab.cssWidthAndHeight) && (au.style.height = aq + "px"), ar = 0, b.snapGrid = [], b.slidesGrid = [], at = 0; at < b.slides.length; at++) {
                            b.snapGrid.push(ar), b.slidesGrid.push(ar), ar += d, parseFloat(ai) > 0 && (!ab.cssWidthAndHeight || "height" === ab.cssWidthAndHeight), parseFloat(aj) > 0 && (!ab.cssWidthAndHeight || "width" === ab.cssWidthAndHeight)
                        }
                    }
                }
                b.initialized ? (b.callPlugins("onInit"), ab.onInit && b.fireCallback(ab.onInit, b)) : (b.callPlugins("onFirstInit"), ab.onFirstInit && b.fireCallback(ab.onFirstInit, b)), b.initialized = !0
            }
        }, b.reInit = function (ae) {
            b.init(!0, ae)
        }, b.resizeFix = function (ae) {
            b.callPlugins("beforeResizeFix"), b.init(ab.resizeReInit || ae), ab.freeMode ? b.getWrapperTranslate() < -y() && (b.setWrapperTransition(0), b.setWrapperTranslate(-y())) : (b.swipeTo(ab.loop ? b.activeLoopIndex : b.activeIndex, 0, !1), ab.autoplay && (b.support.transitions && "undefined" != typeof W ? "undefined" != typeof W && (clearTimeout(W), W = void 0, b.startAutoplay()) : "undefined" != typeof Z && (clearInterval(Z), Z = void 0, b.startAutoplay()))), b.callPlugins("afterResizeFix")
        }, b.destroy = function (ae) {
            var af = b.h.removeEventListener, ag = "wrapper" === ab.eventTarget ? b.wrapper : b.container;
            if (b.browser.ie10 || b.browser.ie11 ? (af(ag, b.touchEvents.touchStart, J), af(document, b.touchEvents.touchMove, K), af(document, b.touchEvents.touchEnd, L)) : (b.support.touch && (af(ag, "touchstart", J), af(ag, "touchmove", K), af(ag, "touchend", L)), ab.simulateTouch && (af(ag, "mousedown", J), af(document, "mousemove", K), af(document, "mouseup", L))), ab.autoResize && af(window, "resize", b.resizeFix), B(), ab.paginationClickable && R(), ab.mousewheelControl && b._wheelEvent && af(b.container, b._wheelEvent, D), ab.keyboardControl && af(document, "keydown", C), ab.autoplay && b.stopAutoplay(), ae) {
                b.wrapper.removeAttribute("style");
                for (var ah = 0; ah < b.slides.length; ah++) {
                    b.slides[ah].removeAttribute("style")
                }
            }
            b.callPlugins("onDestroy"), window.jQuery && window.jQuery(b.container).data("swiper") && window.jQuery(b.container).removeData("swiper"), window.Zepto && window.Zepto(b.container).data("swiper") && window.Zepto(b.container).removeData("swiper"), b = null
        }, b.disableKeyboardControl = function () {
            ab.keyboardControl = !1, b.h.removeEventListener(document, "keydown", C)
        }, b.enableKeyboardControl = function () {
            ab.keyboardControl = !0, b.h.addEventListener(document, "keydown", C)
        };
        var t = (new Date).getTime();
        if (b.disableMousewheelControl = function () {
            return b._wheelEvent ? (ab.mousewheelControl = !1, b.h.removeEventListener(b.container, b._wheelEvent, D), !0) : !1
        }, b.enableMousewheelControl = function () {
            return b._wheelEvent ? (ab.mousewheelControl = !0, b.h.addEventListener(b.container, b._wheelEvent, D), !0) : !1
        }, ab.grabCursor) {
            var u = b.container.style;
            u.cursor = "move", u.cursor = "grab", u.cursor = "-moz-grab", u.cursor = "-webkit-grab"
        }
        b.allowSlideClick = !0, b.allowLinks = !0;
        var v, w, x, U = !1, Y = !0;
        b.swipeNext = function (ae, af) {
            "undefined" == typeof ae && (ae = !0), !af && ab.loop && b.fixLoop(), !af && ab.autoplay && b.stopAutoplay(!0), b.callPlugins("onSwipeNext");
            var ag = b.getWrapperTranslate().toFixed(2), ah = ag;
            if ("auto" === ab.slidesPerView) {
                for (var ai = 0; ai < b.snapGrid.length; ai++) {
                    if (-ag >= b.snapGrid[ai].toFixed(2) && -ag < b.snapGrid[ai + 1].toFixed(2)) {
                        ah = -b.snapGrid[ai + 1];
                        break
                    }
                }
            } else {
                var aj = d * ab.slidesPerGroup;
                ah = -(Math.floor(Math.abs(ag) / Math.floor(aj)) * aj + aj)
            }
            return ah < -y() && (ah = -y()), ah === ag ? !1 : (P(ah, "next", {runCallbacks: ae}), !0)
        }, b.swipePrev = function (ae, af) {
            "undefined" == typeof ae && (ae = !0), !af && ab.loop && b.fixLoop(), !af && ab.autoplay && b.stopAutoplay(!0), b.callPlugins("onSwipePrev");
            var ag, ah = Math.ceil(b.getWrapperTranslate());
            if ("auto" === ab.slidesPerView) {
                ag = 0;
                for (var ai = 1; ai < b.snapGrid.length; ai++) {
                    if (-ah === b.snapGrid[ai]) {
                        ag = -b.snapGrid[ai - 1];
                        break
                    }
                    if (-ah > b.snapGrid[ai] && -ah < b.snapGrid[ai + 1]) {
                        ag = -b.snapGrid[ai];
                        break
                    }
                }
            } else {
                var aj = d * ab.slidesPerGroup;
                ag = -(Math.ceil(-ah / aj) - 1) * aj
            }
            return ag > 0 && (ag = 0), ag === ah ? !1 : (P(ag, "prev", {runCallbacks: ae}), !0)
        }, b.swipeReset = function (ae) {
            "undefined" == typeof ae && (ae = !0), b.callPlugins("onSwipeReset");
            var af, ag = b.getWrapperTranslate(), ah = d * ab.slidesPerGroup;
            -y();
            if ("auto" === ab.slidesPerView) {
                af = 0;
                for (var ai = 0; ai < b.snapGrid.length; ai++) {
                    if (-ag === b.snapGrid[ai]) {
                        return
                    }
                    if (-ag >= b.snapGrid[ai] && -ag < b.snapGrid[ai + 1]) {
                        af = b.positions.diff > 0 ? -b.snapGrid[ai + 1] : -b.snapGrid[ai];
                        break
                    }
                }
                -ag >= b.snapGrid[b.snapGrid.length - 1] && (af = -b.snapGrid[b.snapGrid.length - 1]), ag <= -y() && (af = -y())
            } else {
                af = 0 > ag ? Math.round(ag / ah) * ah : 0, ag <= -y() && (af = -y())
            }
            return ab.scrollContainer && (af = 0 > ag ? ag : 0), af < -y() && (af = -y()), ab.scrollContainer && h > d && (af = 0), af === ag ? !1 : (P(af, "reset", {runCallbacks: ae}), !0)
        }, b.swipeTo = function (ae, af, ag) {
            ae = parseInt(ae, 10), b.callPlugins("onSwipeTo", {
                index: ae,
                speed: af
            }), ab.loop && (ae += b.loopedSlides);
            var ah = b.getWrapperTranslate();
            if (!(!isFinite(ae) || ae > b.slides.length - 1 || 0 > ae)) {
                var ai;
                return ai = "auto" === ab.slidesPerView ? -b.slidesGrid[ae] : -ae * d, ai < -y() && (ai = -y()), ai === ah ? !1 : ("undefined" == typeof ag && (ag = !0), P(ai, "to", {
                    index: ae,
                    speed: af,
                    runCallbacks: ag
                }), !0)
            }
        }, b._queueStartCallbacks = !1, b._queueEndCallbacks = !1, b.updateActiveSlide = function (af) {
            if (b.initialized && 0 !== b.slides.length) {
                b.previousIndex = b.activeIndex, "undefined" == typeof af && (af = b.getWrapperTranslate()), af > 0 && (af = 0);
                var aj;
                if ("auto" === ab.slidesPerView) {
                    if (b.activeIndex = b.slidesGrid.indexOf(-af), b.activeIndex < 0) {
                        for (aj = 0; aj < b.slidesGrid.length - 1 && !(-af > b.slidesGrid[aj] && -af < b.slidesGrid[aj + 1]); aj++) {
                        }
                        var ak = Math.abs(b.slidesGrid[aj] + af), al = Math.abs(b.slidesGrid[aj + 1] + af);
                        b.activeIndex = al >= ak ? aj : aj + 1
                    }
                } else {
                    b.activeIndex = Math[ab.visibilityFullFit ? "ceil" : "round"](-af / d)
                }
                if (b.activeIndex === b.slides.length && (b.activeIndex = b.slides.length - 1), b.activeIndex < 0 && (b.activeIndex = 0), b.slides[b.activeIndex]) {
                    if (b.calcVisibleSlides(af), b.support.classList) {
                        var ae;
                        for (aj = 0; aj < b.slides.length; aj++) {
                            ae = b.slides[aj], ae.classList.remove(ab.slideActiveClass), b.visibleSlides.indexOf(ae) >= 0 ? ae.classList.add(ab.slideVisibleClass) : ae.classList.remove(ab.slideVisibleClass)
                        }
                        b.slides[b.activeIndex].classList.add(ab.slideActiveClass)
                    } else {
                        var ag = new RegExp("\\s*" + ab.slideActiveClass),
                            ah = new RegExp("\\s*" + ab.slideVisibleClass);
                        for (aj = 0; aj < b.slides.length; aj++) {
                            b.slides[aj].className = b.slides[aj].className.replace(ag, "").replace(ah, ""), b.visibleSlides.indexOf(b.slides[aj]) >= 0 && (b.slides[aj].className += " " + ab.slideVisibleClass)
                        }
                        b.slides[b.activeIndex].className += " " + ab.slideActiveClass
                    }
                    if (ab.loop) {
                        var ai = b.loopedSlides;
                        b.activeLoopIndex = b.activeIndex - ai, b.activeLoopIndex >= b.slides.length - 2 * ai && (b.activeLoopIndex = b.slides.length - 2 * ai - b.activeLoopIndex), b.activeLoopIndex < 0 && (b.activeLoopIndex = b.slides.length - 2 * ai + b.activeLoopIndex), b.activeLoopIndex < 0 && (b.activeLoopIndex = 0)
                    } else {
                        b.activeLoopIndex = b.activeIndex
                    }
                    ab.pagination && b.updatePagination(af)
                }
            }
        }, b.createPagination = function (ae) {
            if (ab.paginationClickable && b.paginationButtons && R(), b.paginationContainer = ab.pagination.nodeType ? ab.pagination : ac(ab.pagination)[0], ab.createPagination) {
                var af = "", ag = b.slides.length, ah = ag;
                ab.loop && (ah -= 2 * b.loopedSlides);
                for (var ai = 0; ah > ai; ai++) {
                    af += "<" + ab.paginationElement + ' class="' + ab.paginationElementClass + '"></' + ab.paginationElement + ">"
                }
                b.paginationContainer.innerHTML = af
            }
            b.paginationButtons = ac("." + ab.paginationElementClass, b.paginationContainer), ae || b.updatePagination(), b.callPlugins("onCreatePagination"), ab.paginationClickable && S()
        }, b.updatePagination = function (af) {
            if (ab.pagination && !(b.slides.length < 1)) {
                var ai = ac("." + ab.paginationActiveClass, b.paginationContainer);
                if (ai) {
                    var aj = b.paginationButtons;
                    if (0 !== aj.length) {
                        for (var al = 0; al < aj.length; al++) {
                            aj[al].className = ab.paginationElementClass
                        }
                        var ae = ab.loop ? b.loopedSlides : 0;
                        if (ab.paginationAsRange) {
                            b.visibleSlides || b.calcVisibleSlides(af);
                            var ag, ah = [];
                            for (ag = 0; ag < b.visibleSlides.length; ag++) {
                                var ak = b.slides.indexOf(b.visibleSlides[ag]) - ae;
                                ab.loop && 0 > ak && (ak = b.slides.length - 2 * b.loopedSlides + ak), ab.loop && ak >= b.slides.length - 2 * b.loopedSlides && (ak = b.slides.length - 2 * b.loopedSlides - ak, ak = Math.abs(ak)), ah.push(ak)
                            }
                            for (ag = 0; ag < ah.length; ag++) {
                                aj[ah[ag]] && (aj[ah[ag]].className += " " + ab.paginationVisibleClass)
                            }
                            ab.loop ? void 0 !== aj[b.activeLoopIndex] && (aj[b.activeLoopIndex].className += " " + ab.paginationActiveClass) : aj[b.activeIndex] && (aj[b.activeIndex].className += " " + ab.paginationActiveClass)
                        } else {
                            ab.loop ? aj[b.activeLoopIndex] && (aj[b.activeLoopIndex].className += " " + ab.paginationActiveClass + " " + ab.paginationVisibleClass) : aj[b.activeIndex] && (aj[b.activeIndex].className += " " + ab.paginationActiveClass + " " + ab.paginationVisibleClass)
                        }
                    }
                }
            }
        }, b.calcVisibleSlides = function (af) {
            var ak = [], ae = 0, ag = 0, ah = 0;
            l && b.wrapperLeft > 0 && (af += b.wrapperLeft), !l && b.wrapperTop > 0 && (af += b.wrapperTop);
            for (var ai = 0; ai < b.slides.length; ai++) {
                ae += ag, ag = "auto" === ab.slidesPerView ? l ? b.h.getWidth(b.slides[ai], !0, ab.roundLengths) : b.h.getHeight(b.slides[ai], !0, ab.roundLengths) : d, ah = ae + ag;
                var aj = !1;
                ab.visibilityFullFit ? (ae >= -af && -af + h >= ah && (aj = !0), -af >= ae && ah >= -af + h && (aj = !0)) : (ah > -af && -af + h >= ah && (aj = !0), ae >= -af && -af + h > ae && (aj = !0), -af > ae && ah > -af + h && (aj = !0)), aj && ak.push(b.slides[ai])
            }
            0 === ak.length && (ak = [b.slides[b.activeIndex]]), b.visibleSlides = ak
        };
        var W, Z;
        b.startAutoplay = function () {
            if (b.support.transitions) {
                if ("undefined" != typeof W) {
                    return !1
                }
                if (!ab.autoplay) {
                    return
                }
                b.callPlugins("onAutoplayStart"), ab.onAutoplayStart && b.fireCallback(ab.onAutoplayStart, b), V()
            } else {
                if ("undefined" != typeof Z) {
                    return !1
                }
                if (!ab.autoplay) {
                    return
                }
                b.callPlugins("onAutoplayStart"), ab.onAutoplayStart && b.fireCallback(ab.onAutoplayStart, b), Z = setInterval(function () {
                    ab.loop ? (b.fixLoop(), b.swipeNext(!0, !0)) : b.swipeNext(!0, !0) || (ab.autoplayStopOnLast ? (clearInterval(Z), Z = void 0) : b.swipeTo(0))
                }, ab.autoplay)
            }
        }, b.stopAutoplay = function (ae) {
            if (b.support.transitions) {
                if (!W) {
                    return
                }
                W && clearTimeout(W), W = void 0, ae && !ab.autoplayDisableOnInteraction && b.wrapperTransitionEnd(function () {
                    V()
                }), b.callPlugins("onAutoplayStop"), ab.onAutoplayStop && b.fireCallback(ab.onAutoplayStop, b)
            } else {
                Z && clearInterval(Z), Z = void 0, b.callPlugins("onAutoplayStop"), ab.onAutoplayStop && b.fireCallback(ab.onAutoplayStop, b)
            }
        }, b.loopCreated = !1, b.removeLoopedSlides = function () {
            if (b.loopCreated) {
                for (var ae = 0; ae < b.slides.length; ae++) {
                    b.slides[ae].getData("looped") === !0 && b.wrapper.removeChild(b.slides[ae])
                }
            }
        }, b.createLoop = function () {
            if (0 !== b.slides.length) {
                b.loopedSlides = "auto" === ab.slidesPerView ? ab.loopedSlides || 1 : Math.floor(ab.slidesPerView) + ab.loopAdditionalSlides, b.loopedSlides > b.slides.length && (b.loopedSlides = b.slides.length);
                var am, an = "", ae = "", af = "", ag = b.slides.length, ah = Math.floor(b.loopedSlides / ag),
                    ai = b.loopedSlides % ag;
                for (am = 0; ah * ag > am; am++) {
                    var aj = am;
                    if (am >= ag) {
                        var ak = Math.floor(am / ag);
                        aj = am - ag * ak
                    }
                    af += b.slides[aj].outerHTML
                }
                for (am = 0; ai > am; am++) {
                    ae += O(ab.slideDuplicateClass, b.slides[am].outerHTML)
                }
                for (am = ag - ai; ag > am; am++) {
                    an += O(ab.slideDuplicateClass, b.slides[am].outerHTML)
                }
                var al = an + af + c.innerHTML + af + ae;
                for (c.innerHTML = al, b.loopCreated = !0, b.calcSlides(), am = 0; am < b.slides.length; am++) {
                    (am < b.loopedSlides || am >= b.slides.length - b.loopedSlides) && b.slides[am].setData("looped", !0)
                }
                b.callPlugins("onCreateLoop")
            }
        }, b.fixLoop = function () {
            var ae;
            b.activeIndex < b.loopedSlides ? (ae = b.slides.length - 3 * b.loopedSlides + b.activeIndex, b.swipeTo(ae, 0, !1)) : ("auto" === ab.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * ab.slidesPerView) && (ae = -b.slides.length + b.activeIndex + b.loopedSlides, b.swipeTo(ae, 0, !1))
        }, b.loadSlides = function () {
            var ae = "";
            b.activeLoaderIndex = 0;
            for (var af = ab.loader.slides, ag = ab.loader.loadAllSlides ? af.length : ab.slidesPerView * (1 + ab.loader.surroundGroups), ah = 0; ag > ah; ah++) {
                ae += "outer" === ab.loader.slidesHTMLType ? af[ah] : "<" + ab.slideElement + ' class="' + ab.slideClass + '" data-swiperindex="' + ah + '">' + af[ah] + "</" + ab.slideElement + ">"
            }
            b.wrapper.innerHTML = ae, b.calcSlides(!0), ab.loader.loadAllSlides || b.wrapperTransitionEnd(b.reloadSlides, !0)
        }, b.reloadSlides = function () {
            var al = ab.loader.slides, am = parseInt(b.activeSlide().data("swiperindex"), 10);
            if (!(0 > am || am > al.length - 1)) {
                b.activeLoaderIndex = am;
                var an = Math.max(0, am - ab.slidesPerView * ab.loader.surroundGroups),
                    ao = Math.min(am + ab.slidesPerView * (1 + ab.loader.surroundGroups) - 1, al.length - 1);
                if (am > 0) {
                    var ae = -d * (am - an);
                    b.setWrapperTranslate(ae), b.setWrapperTransition(0)
                }
                var af;
                if ("reload" === ab.loader.logic) {
                    b.wrapper.innerHTML = "";
                    var ag = "";
                    for (af = an; ao >= af; af++) {
                        ag += "outer" === ab.loader.slidesHTMLType ? al[af] : "<" + ab.slideElement + ' class="' + ab.slideClass + '" data-swiperindex="' + af + '">' + al[af] + "</" + ab.slideElement + ">"
                    }
                    b.wrapper.innerHTML = ag
                } else {
                    var ah = 1e3, ai = 0;
                    for (af = 0; af < b.slides.length; af++) {
                        var aj = b.slides[af].data("swiperindex");
                        an > aj || aj > ao ? b.wrapper.removeChild(b.slides[af]) : (ah = Math.min(aj, ah), ai = Math.max(aj, ai))
                    }
                    for (af = an; ao >= af; af++) {
                        var ak;
                        ah > af && (ak = document.createElement(ab.slideElement), ak.className = ab.slideClass, ak.setAttribute("data-swiperindex", af), ak.innerHTML = al[af], b.wrapper.insertBefore(ak, b.wrapper.firstChild)), af > ai && (ak = document.createElement(ab.slideElement), ak.className = ab.slideClass, ak.setAttribute("data-swiperindex", af), ak.innerHTML = al[af], b.wrapper.appendChild(ak))
                    }
                }
                b.reInit(!0)
            }
        }, X()
    }
};
Swiper.prototype = {
    plugins: {}, wrapperTransitionEnd: function (e, f) {
        function g(h) {
            if (h.target === c && (e(b), b.params.queueEndCallbacks && (b._queueEndCallbacks = !1), !f)) {
                for (a = 0; a < d.length; a++) {
                    b.h.removeEventListener(c, d[a], g)
                }
            }
        }

        var a, b = this, c = b.wrapper,
            d = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
        if (e) {
            for (a = 0; a < d.length; a++) {
                b.h.addEventListener(c, d[a], g)
            }
        }
    }, getWrapperTranslate: function (e) {
        var f, a, b, c, d = this.wrapper;
        return "undefined" == typeof e && (e = "horizontal" === this.params.mode ? "x" : "y"), this.support.transforms && this.params.useCSS3Transforms ? (b = window.getComputedStyle(d, null), window.WebKitCSSMatrix ? c = new WebKitCSSMatrix("none" === b.webkitTransform ? "" : b.webkitTransform) : (c = b.MozTransform || b.OTransform || b.MsTransform || b.msTransform || b.transform || b.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), f = c.toString().split(",")), "x" === e && (a = window.WebKitCSSMatrix ? c.m41 : parseFloat(16 === f.length ? f[12] : f[4])), "y" === e && (a = window.WebKitCSSMatrix ? c.m42 : parseFloat(16 === f.length ? f[13] : f[5]))) : ("x" === e && (a = parseFloat(d.style.left, 10) || 0), "y" === e && (a = parseFloat(d.style.top, 10) || 0)), a || 0
    }, setWrapperTranslate: function (f, n, a) {
        var o = $("#" + this.container.id).find(".swiper-wrapper").width(), e = $("#" + this.container.id).width();
        var b, c = this.wrapper.style, d = {x: 0, y: 0, z: 0};
        3 === arguments.length ? (d.x = f, d.y = n, d.z = a) : ("undefined" == typeof n && (n = "horizontal" === this.params.mode ? "x" : "y"), d[n] = f), this.support.transforms && this.params.useCSS3Transforms ? (b = this.support.transforms3d ? "translate3d(" + d.x + "px, " + d.y + "px, " + d.z + "px)" : "translate(" + d.x + "px, " + d.y + "px)", c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = b) : (c.left = d.x + "px", c.top = d.y + "px"), this.callPlugins("onSetWrapperTransform", d), this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, d);
        if (Math.abs(f) == 0) {
            $("#" + this.container.id).parent().find("." + this.params.btnPrefix + "-prev").addClass("disabled")
        } else {
            $("#" + this.container.id).parent().find("." + this.params.btnPrefix + "-prev").removeClass("disabled")
        }
        if (o - Math.ceil(-f) <= e) {
            $("#" + this.container.id).parent().find("." + this.params.btnPrefix + "-next").addClass("disabled")
        } else {
            $("#" + this.container.id).parent().find("." + this.params.btnPrefix + "-next").removeClass("disabled")
        }
    }, setWrapperTransition: function (a) {
        var b = this.wrapper.style;
        b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = a / 1e3 + "s", this.callPlugins("onSetWrapperTransition", {duration: a}), this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, a)
    }, h: {
        getWidth: function (d, e, a) {
            var b = window.getComputedStyle(d, null).getPropertyValue("width"), c = parseFloat(b);
            return (isNaN(c) || b.indexOf("%") > 0 || 0 > c) && (c = d.offsetWidth - parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-right"))), e && (c += parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-right"))), a ? Math.ceil(c) : c
        }, getHeight: function (d, e, a) {
            if (e) {
                return d.offsetHeight
            }
            var b = window.getComputedStyle(d, null).getPropertyValue("height"), c = parseFloat(b);
            return (isNaN(c) || b.indexOf("%") > 0 || 0 > c) && (c = d.offsetHeight - parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-bottom"))), e && (c += parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(d, null).getPropertyValue("padding-bottom"))), a ? Math.ceil(c) : c
        }, getOffset: function (e) {
            var f = e.getBoundingClientRect(), g = document.body, a = e.clientTop || g.clientTop || 0,
                b = e.clientLeft || g.clientLeft || 0, c = window.pageYOffset || e.scrollTop,
                d = window.pageXOffset || e.scrollLeft;
            return document.documentElement && !window.pageYOffset && (c = document.documentElement.scrollTop, d = document.documentElement.scrollLeft), {
                top: f.top + c - a,
                left: f.left + d - b
            }
        }, windowWidth: function () {
            return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0
        }, windowHeight: function () {
            return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0
        }, windowScroll: function () {
            return "undefined" != typeof pageYOffset ? {
                left: window.pageXOffset,
                top: window.pageYOffset
            } : document.documentElement ? {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            } : void 0
        }, addEventListener: function (c, d, a, b) {
            "undefined" == typeof b && (b = !1), c.addEventListener ? c.addEventListener(d, a, b) : c.attachEvent && c.attachEvent("on" + d, a)
        }, removeEventListener: function (c, d, a, b) {
            "undefined" == typeof b && (b = !1), c.removeEventListener ? c.removeEventListener(d, a, b) : c.detachEvent && c.detachEvent("on" + d, a)
        }
    }, setTransform: function (b, c) {
        var a = b.style;
        a.webkitTransform = a.MsTransform = a.msTransform = a.MozTransform = a.OTransform = a.transform = c
    }, setTranslate: function (d, e) {
        var a = d.style, b = {x: e.x || 0, y: e.y || 0, z: e.z || 0},
            c = this.support.transforms3d ? "translate3d(" + b.x + "px," + b.y + "px," + b.z + "px)" : "translate(" + b.x + "px," + b.y + "px)";
        a.webkitTransform = a.MsTransform = a.msTransform = a.MozTransform = a.OTransform = a.transform = c, this.support.transforms || (a.left = b.x + "px", a.top = b.y + "px")
    }, setTransition: function (b, c) {
        var a = b.style;
        a.webkitTransitionDuration = a.MsTransitionDuration = a.msTransitionDuration = a.MozTransitionDuration = a.OTransitionDuration = a.transitionDuration = c + "ms"
    }, support: {
        touch: window.Modernizr && Modernizr.touch === !0 || function () {
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
        }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
            var a = document.createElement("div").style;
            return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a
        }(), transforms: window.Modernizr && Modernizr.csstransforms === !0 || function () {
            var a = document.createElement("div").style;
            return "transform" in a || "WebkitTransform" in a || "MozTransform" in a || "msTransform" in a || "MsTransform" in a || "OTransform" in a
        }(), transitions: window.Modernizr && Modernizr.csstransitions === !0 || function () {
            var a = document.createElement("div").style;
            return "transition" in a || "WebkitTransition" in a || "MozTransition" in a || "msTransition" in a || "MsTransition" in a || "OTransition" in a
        }(), classList: function () {
            var a = document.createElement("div");
            return "classList" in a
        }()
    }, browser: {
        ie8: function () {
            var b = -1;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                var c = navigator.userAgent, a = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
                null !== a.exec(c) && (b = parseFloat(RegExp.$1))
            }
            return -1 !== b && 9 > b
        }(), ie10: window.navigator.msPointerEnabled, ie11: window.navigator.pointerEnabled
    }
}, (window.jQuery || window.Zepto) && !function (a) {
    a.fn.swiper = function (b) {
        var c;
        return this.each(function (d) {
            var e = a(this), f = new Swiper(e[0], b);
            d || (c = f), e.data("swiper", f)
        }), c
    }
}(window.jQuery || window.Zepto), "undefined" != typeof module ? module.exports = Swiper : "function" == typeof define && define.amd && define([], function () {
    return Swiper
});