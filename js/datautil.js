function addChineseAndSound(a, b, c) {
  var d = window.localStorage[a];
  if (d == null) {
    var e = new Date,
      f = e.toLocaleDateString(),
      g = {
        chinese: b,
        sound: c,
        count: "0",
        ctime: f,
        pic: "",
        picw: "0",
        pich: "0",
        tb: "",
        tbw: "0",
        tbh: "0"
      };
    window.localStorage[a] = JSON.stringify(g)
  } else {
    var h = JSON.parse(d);
    h.chinese = b, h.sound = c, window.localStorage.removeItem(a), window.localStorage[a] = JSON.stringify(h)
  }
}

function addPic(a, b, c, d, e, f, g) {
  var h = window.localStorage[a];
  if (h == null) {
    var i = new Date,
      j = i.toLocaleDateString(),
      k = {
        chinese: "",
        sound: "",
        count: "0",
        ctime: j,
        pic: b,
        picw: c,
        pich: d,
        tb: e,
        tbw: f,
        tbh: g
      };
    window.localStorage[a] = JSON.stringify(k)
  } else {
    var l = JSON.parse(h);
    l.pic = b, l.picw = c, l.pich = d, l.tb = e, l.tbw = f, l.tbh = g, window.localStorage.removeItem(a), window.localStorage[a] = JSON.stringify(l)
  }
}

function addChineseAndSoundAndPic(a, b, c, d, e, f, g, h, i) {
  var j = window.localStorage[a];
  if (j == null) {
    var k = new Date,
      l = k.toLocaleDateString(),
      m = {
        chinese: b,
        sound: c,
        count: "0",
        ctime: l,
        pic: d,
        picw: e,
        pich: f,
        tb: g,
        tbw: h,
        tbh: i
      };
    window.localStorage[a] = JSON.stringify(m)
  } else {
    var n = JSON.parse(j);
    n.chinese = b, n.sound = c, n.pic = d, n.picw = e, n.pich = f, n.tb = g, n.tbw = h, n.tbh = i, window.localStorage.removeItem(a), window.localStorage[a] = JSON.stringify(n)
  }
}

function addCount(a) {
  var b = window.localStorage[a];
  if (b != null) {
    var c = JSON.parse(b);
    c.count = parseInt(c.count) + 1, window.localStorage.removeItem(a), window.localStorage[a] = JSON.stringify(c)
  }
}

function getWordProperty(a) {
  var b = window.localStorage[a];
  if (b == null) return "";
  var c = JSON.parse(b),
    d = {};
  return d.chinese = c.chinese, d.sound = c.sound, d.count = c.count, d.ctime = c.ctime, d.pic = c.pic, d.picw = c.picw, d.pich = c.pich, d.tb = c.tb, d.tbw = c.tbw, d.tbh = c.tbh, d
}

function getChinese(a) {
  var b = window.localStorage[a];
  if (b == null) return "生词本中没有这个词";
  var c = JSON.parse(b);
  return c.chinese
}

function getSound(a) {
  var b = window.localStorage[a];
  if (b == null) return "";
  var c = JSON.parse(b);
  return c.sound
}

function getCtime(a) {
  var b = window.localStorage[a];
  if (b == null) return "";
  var c = JSON.parse(b);
  return c.ctime
}

function getCount(a) {
  var b = window.localStorage[a];
  if (b == null) return "";
  var c = JSON.parse(b);
  return c.count
}

function getPic(a) {
  var b = window.localStorage[a];
  if (b == null) return "";
  var c = JSON.parse(b);
  return c.pic
}

function getTb(a) {
  var b = window.localStorage[a];
  if (b == null) return "";
  var c = JSON.parse(b);
  return c.tb
}

function getAllWord() {
  var a = window.localStorage[WORD_KEY];
  if (a == null) return;
  var b = JSON.parse(a);
  return b.root
}

function addWord(a) {
  if (a == "") return;
  var b = window.localStorage[WORD_KEY];
  if (b == null) {
    var c = {
      root: [a]
    };
    window.localStorage[WORD_KEY] = JSON.stringify(c)
  } else {
    var d = JSON.parse(b);
    d.root.push(a), d.root = d.root.distinct(), window.localStorage.removeItem(WORD_KEY), window.localStorage[WORD_KEY] = JSON.stringify(d)
  }
  addChineseAndSound(a, "后台翻译中", "")
}

function delWord(a) {
  if (a == null || a == "") return;
  var b = window.localStorage[WORD_KEY];
  if (b == null) {
    window.localStorage.removeItem(a);
    return
  }
  var c = JSON.parse(b);
  c.root = c.root.del(a), window.localStorage.removeItem(a), window.localStorage.removeItem(WORD_KEY), window.localStorage[WORD_KEY] = JSON.stringify(c)
}
Array.prototype.distinct = function() {
  var a = [],
    b = {};
  for (var c = 0, d; c < this.length; c++) d = this[c], b[d] || (a.push(d), b[d] = !0);
  return a
}, Array.prototype.del = function(a) {
  var b = [];
  for (var c = 0, d; c < this.length; c++) d = this[c], a.toString() != this[c].toString() && b.push(d);
  return b
};
var WORD_KEY = "MAIN_WORD_ITEM";