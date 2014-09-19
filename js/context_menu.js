function contextMenuOnClick(a, b) {
  var c = a.selectionText.replace(/^\s+|\s+$/g, "").toLowerCase();
  if (c == "") {
    notword();
    return
  }
  if (!c) {
    notword();
    return
  }
  if (c.length == 1) {
    notword();
    return
  }
  if (/[^a-zA-Z]/g.test(c)) {
    notword();
    return
  }
  if (c.indexOf(" ") >= 0) {
    notword();
    return
  }
  var d = getChinese(c),
    e = getSound(c);
  if (d == "生词本中没有这个词") addEverWordChineseSoundContextMenu(c);
  else {
    myplaysound(e, "");
    var f = myhtml2txt(d, "\r\n");
    f = f.replace(/\s{2,\r\n}/g, "\r\n"), f += "\r\n\r\n【单词在生词本中已存在】", swnotify(f)
  }
}

function addEverWordChineseSoundContextMenu(a) {
  globalword_contextmenu = a, globalmeaning_contextmenu = "";
  var b = "";
  $.ajaxSetup({
    async: !0
  }), $.getJSON("http://everword.sinaapp.com/word.php?", {
    word: a,
    username: window.localStorage.getItem("_sys_username"),
    timestamp: window.localStorage.getItem("_sys_timestamp")
  }, function(b) {
    var c = b.sound,
      d = b.chinese,
      e = b.pic,
      f = b.picw,
      g = b.pich,
      h = b.tburl,
      i = b.tbw,
      j = b.tbh;
    d == "" && (d = word), d += "\r\n", d = "<li>" + d, d = d.replace(/\r\n/g, "</li><li>"), d = d.slice(0, -4), d = d.replace(/<li><\/li>/g, ""), d = unescape(d), addChineseAndSoundAndPic(a, d, c, e, f, g, h, i, j), refreshIcon(), myplaysound(c, "");
    var k = myhtml2txt(d, " ");
    k = k.replace(/\s{2,}/g, " "), k += "\r\n\r\n【单词已加入生词本】", swnotify(k), Sync.save()
  }).error(function(a) {
    var b = "取词异常，，或许您可以重启浏览器看看:" + a.description;
    swnotify(b)
  })
}

function notword() {
  swnotify("单词圣手只对包含26种英文字母(a到z)的单词取词")
}
var globalword_contextmenu, globalmeaning_contextmenu, parent = chrome.contextMenus.create({
  title: "单词圣手翻译",
  contexts: ["selection"],
  onclick: contextMenuOnClick
});