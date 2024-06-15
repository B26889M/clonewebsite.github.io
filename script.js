function BG() {
    var e, t, n = BG.arguments, i = n[1], a = 0;
    if (i)
        for (e = document.getElementsByTagName("DIV"),
        a = 0; a < e.length; a++)
            for (t = 2; t < n.length; t++)
                new RegExp("\\b" + n[t] + "\\b").test(e[a].className) && (n[0] ? e[a].className += " " + i : e[a].className = e[a].className.replace(" " + i, ""))
}
var dropdowncontent = {
    disableanchorlink: !0,
    hidedivmouseout: [!0, 200],
    ajaxloadingmsg: "Loading content. Please wait...",
    ajaxbustcache: !0,
    getposOffset: function(e, t) {
        return e.offsetParent ? e[t] + this.getposOffset(e.offsetParent, t) : e[t]
    },
    isContained: function(e, t) {
        for (var n = (t = window.event || t).relatedTarget || ("mouseover" == t.type ? t.fromElement : t.toElement); n && n != e; )
            try {
                n = n.parentNode
            } catch (t) {
                n = e
            }
        return n == e
    },
    show: function(e, t, n) {
        if (!this.isContained(e, n) || n && "click" == n.type) {
            if ("click" == (n = window.event || n).type && "visible" == t.style.visibility)
                return void (t.style.visibility = "hidden");
            var i = "left" == t.dropposition[0] ? -(t.offsetWidth - e.offsetWidth) : 0
              , a = "top" == t.dropposition[1] ? -t.offsetHeight : e.offsetHeight;
            t.style.left = this.getposOffset(e, "offsetLeft") + i + "px",
            t.style.top = this.getposOffset(e, "offsetTop") + a + "px",
            t.style.clip = "top" == t.dropposition[1] ? "rect(auto auto auto 0)" : "rect(0 auto 0 0)",
            t.style.visibility = "visible",
            t.startTime = (new Date).getTime(),
            t.contentheight = parseInt(t.offsetHeight),
            void 0 !== window["hidetimer_" + t.id] && clearTimeout(window["hidetimer_" + t.id]),
            this.slideengine(t, "top" == t.dropposition[1] ? "up" : "down")
        }
    },
    curveincrement: function(e) {
        return (1 - Math.cos(e * Math.PI)) / 2
    },
    slideengine: function(e, t) {
        var n = (new Date).getTime() - e.startTime;
        if (n < e.glidetime) {
            var i = ("down" == t ? this.curveincrement(n / e.glidetime) : 1 - this.curveincrement(n / e.glidetime)) * e.contentheight + "px";
            e.style.clip = "down" == t ? "rect(0 auto " + i + " 0)" : "rect(" + i + " auto auto 0)",
            window["glidetimer_" + e.id] = setTimeout(function() {
                dropdowncontent.slideengine(e, t)
            }, 10)
        } else
            e.style.clip = "rect(0 auto auto 0)"
    },
    hide: function(e, t, n) {
        dropdowncontent.isContained(e, n) || (window["hidetimer_" + t.id] = setTimeout(function() {
            t.style.visibility = "hidden",
            t.style.left = t.style.top = 0,
            clearTimeout(window["glidetimer_" + t.id])
        }, dropdowncontent.hidedivmouseout[1]))
    },
    hidediv: function(e) {
        document.getElementById(e).style.visibility = "hidden"
    },
    ajaxconnect: function(e, t) {
        var n = !1
          , i = "";
        if (window.XMLHttpRequest)
            n = new XMLHttpRequest;
        else {
            if (!window.ActiveXObject)
                return !1;
            try {
                n = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    n = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }
        }
        document.getElementById(t).innerHTML = this.ajaxloadingmsg,
        n.onreadystatechange = function() {
            dropdowncontent.loadpage(n, t)
        }
        ,
        this.ajaxbustcache && (i = -1 != e.indexOf("?") ? "&" + (new Date).getTime() : "?" + (new Date).getTime()),
        n.open("GET", e + i, !0),
        n.send(null)
    },
    loadpage: function(e, t) {
        4 != e.readyState || 200 != e.status && -1 != window.location.href.indexOf("http") || (document.getElementById(t).innerHTML = e.responseText)
    },
    init: function(e, t, n, i) {
        var a = document.getElementById(e);
        if (a)
            var o = document.getElementById(a.getAttribute("rel"));
        if (a && o) {
            var s = a.getAttribute("rev");
            null != s && "" != s && this.ajaxconnect(s, a.getAttribute("rel")),
            o.dropposition = t.split("-"),
            o.glidetime = n || 1e3,
            o.style.left = o.style.top = 0,
            void 0 === i || "mouseover" == i ? (a.onmouseover = function(e) {
                dropdowncontent.show(this, o, e)
            }
            ,
            a.onmouseout = function(e) {
                dropdowncontent.hide(o, o, e)
            }
            ,
            this.disableanchorlink && (a.onclick = function() {
                return !1
            }
            )) : a.onclick = function(e) {
                return dropdowncontent.show(this, o, e),
                !1
            }
            ,
            1 == this.hidedivmouseout[0] && (o.onmouseout = function(e) {
                dropdowncontent.hide(this, o, e)
            }
            )
        }
    }
};
