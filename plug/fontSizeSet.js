/*(function (e, t) {
    function i() {
        var i = t.documentElement;
        n = i.offsetWidth, i.style.fontSize = 0.3125 * n + "px";
        var o = parseFloat(e.getComputedStyle(i, null)["font-size"]),
            u = 0.3125 * n;
        o !== u && (o > u + 1 || o < u - 1) && (i.style.fontSize = "126.4px")
    }
    var n, r = function () { setTimeout(function () { i() }, 300) };
    i(), e.addEventListener("resize", r)
})(window, document);
*/


/*设计图里的数值/100=css里设计的rem
 ** 例如设计图里设计的调试为20px，在css里设计0.2rem，计算方法是：20px/100 = 0.2rem
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var recalc = function () {
        var width = docEl.clientWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        docEl.dataset.width = width
        docEl.dataset.percent = 100 * (width / 750);
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalc()
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);
