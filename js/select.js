function tellBackgroundToNotify(a) {
  chrome.runtime.sendMessage({
    command: "notify",
    notify: a
  })
}

function tellBackgroundToPlaySound(a, b) {
  var c = {};
  c.sound = a, c.chinese = b;
  var d = JSON.stringify(c);
  chrome.runtime.sendMessage({
    command: "bgplaysound",
    soundandchinese: d
  })
}

function tellBackgroundToGetCaptureWord(a, b) {
  chrome.runtime.sendMessage({
    command: "getcaptureword"
  }, function(c) {
    var d = c.farewell;
    d != "NotCaptureWord" && a(b)
  })
}

function tellBackgroundToSetCaptureWord() {
  chrome.runtime.sendMessage({
    command: "setcaptureword"
  })
}

function tellBackgroundToGetXuanTingCaptureWord(a, b) {
  chrome.runtime.sendMessage({
    command: "getxuantingcaptureword"
  }, function(c) {
    var d = c.farewell;
    d != "NotCaptureWord" && a(b)
  })
}

function tellBackgroundToSetXuanTingCaptureWord() {
  chrome.runtime.sendMessage({
    command: "setxuantingcaptureword"
  })
}

function tellBackgroundToGetChinese(a, b) {
  var c = {};
  c.word = a;
  var d = JSON.stringify(c);
  chrome.runtime.sendMessage({
    command: "getchinese",
    word: d
  }, function(a) {
    var c = a.farewell,
      d = a.sound;
    b(c, d)
  })
}

function tellBackgroundToAddWord(a) {
  var b = {};
  b.word = a;
  var c = JSON.stringify(b);
  chrome.runtime.sendMessage({
    command: "addwords",
    word: c
  })
}

function tellBackgroundToDelWord(a) {
  var b = {};
  b.word = a;
  var c = JSON.stringify(b);
  chrome.runtime.sendMessage({
    command: "delwords",
    word: c
  })
}

function tellBackgroundToAddCount(a) {
  var b = {};
  b.word = a;
  var c = JSON.stringify(b);
  chrome.runtime.sendMessage({
    command: "addcount",
    word: c
  })
}

function tellBackgroundToResetTranslatingFlag() {
  chrome.runtime.sendMessage({
    command: "resetbtranslating"
  })
}

function tellBackgroundToRandomWebsite() {
  chrome.runtime.sendMessage({
    command: "randomwebsite"
  })
}

function shortCut() {}

function dragStart(a) {
  return globalworddrag = getWordAtPoint(a.target, a.x, a.y), !0
}

function dragOver(a) {
  return a.preventDefault && a.preventDefault(), a.dataTransfer.effectAllowed = "copy", a.dataTransfer.dropEffect = "copy", !0
}

function doDrag(a) {
  return !0
}

function doDrop(a) {
  if (a.dataTransfer.dropEffect == "copy") {
    a.preventDefault && a.preventDefault();
    if (document.readyState != "complete") return !0;
    if (globalworddrag) return chrome.runtime.sendMessage({
      command: "getwords"
    }, function(b) {
      processToUnHighlightDragElement(b, a)
    }), !1
  }
}

function processToUnHighlightDragElement(a, b) {
  var c = !1,
    d = a.farewell,
    e = globalworddrag.toLowerCase();
  if (d == null || d == "") {
    tellBackgroundToAddWord(e), localSearchHighlight(e);
    return
  }
  for (var f = 0; f < d.length; f++) {
    var g = new RegExp("\\b" + d[f] + "\\b");
    if (e.search(g) > -1) {
      c = !0, e = d[f];
      break
    }
  }
  c ? (tellBackgroundToDelWord(e), unhighlightword(document.getElementsByTagName("body")[0], e)) : (tellBackgroundToAddWord(e), localSearchHighlight(e), showTooltipWithWord(b, e, jessesavedSelection))
}

function getWordAtPoint(a, b, c) {
  if (a.nodeType == a.TEXT_NODE) {
    var d = a.ownerDocument.createRange();
    d.selectNodeContents(a);
    var e = 0,
      f = d.endOffset;
    while (e + 1 < f) {
      d.setStart(a, e), d.setEnd(a, e + 1);
      if (d.getBoundingClientRect().left <= b && d.getBoundingClientRect().right >= b && d.getBoundingClientRect().top <= c && d.getBoundingClientRect().bottom >= c) {
        d.expand("word");
        var g = d.toString();
        return d.detach(), g
      }
      e += 1
    }
  } else
    for (var h = 0; h < a.childNodes.length; h++) {
      var d = a.childNodes[h].ownerDocument.createRange();
      d.selectNodeContents(a.childNodes[h]);
      if (d.getBoundingClientRect().left <= b && d.getBoundingClientRect().right >= b && d.getBoundingClientRect().top <= c && d.getBoundingClientRect().bottom >= c) return d.detach(), getWordAtPoint(a.childNodes[h], b, c);
      d.detach()
    }
  return null
}

function processRequest(a, b, c) {
  switch (a.command) {
    case "unhighlightword":
      var d = a.word;
      unhighlightword(document.getElementsByTagName("body")[0], d);
      break;
    case "highlightword":
      var d = a.word;
      localSearchHighlight(d);
      break;
    case "gettext":
      c({
        data: document.all[0].innerText.toLowerCase()
      })
  }
}

function updateStyleNode(a) {
  stylenode = typeof stylenode != "undefined" ? stylenode : document.getElementsByTagName("head")[0].appendChild(document.createElement("style")), stylenode.innerHTML = a
}

function html2txt(a, b) {
  var c;
  return c = a.replace(/<.*?>/g, b), c
}

function funcGetChineseAndSoundShowNotify(a, b) {
  if ((a == ENTRYISNULL || a == TOBETRANSLATED) && trytimes < MAXTRYTIMES) trytimes++, getChineseAndSoundShowNotify(globalword);
  else {
    trytimes = 0, TRANSLATING = "翻译中2";
    var c = b,
      d = a;
    c != "" && tellBackgroundToPlaySound(c, "");
    var e = "";
    a != TOBETRANSLATED ? (e = html2txt(a, "\r\n"), e = e.replace(/\s{2,\r\n}/g, "\r\n"), e += "\r\n\r\n【生词高亮会在页面完全加载后启用】") : e = "请等会试试看", tellBackgroundToNotify(e)
  }
}

function getChineseAndSoundShowNotify(a) {
  tellBackgroundToGetChinese(a, funcGetChineseAndSoundShowNotify)
}

function funcSelectedBeforReady(a, b) {
  if (a != ENTRYISNULL) {
    var c = b,
      d = a;
    c != "" && tellBackgroundToPlaySound(c, "");
    var e = html2txt(a, "\r\n");
    e = e.replace(/\s{2,\r\n}/g, "\r\n"), e += "\r\n\r\n【生词高亮会在页面完全加载后启用】", tellBackgroundToNotify(e)
  } else {
    var e = "亲，不带这么着急的，让眼睛四处瞅瞅";
    e += "\r\n\r\n【生词高亮会在页面完全加载后启用】", tellBackgroundToNotify(e)
  }
}

function setCaptureWord(a) {
  a.button == 3 && tellBackgroundToSetCaptureWord()
}

function highlightSelectionCore(a, b) {
  if (a == "") return;
  if (!a) return;
  if (a.length == 1) return;
  if (/[^a-zA-Z]/g.test(a)) return;
  if (a.indexOf(" ") >= 0) return;
  globalword = a.toLowerCase();
  if (document.readyState != "complete") {
    tellBackgroundToGetChinese(globalword, funcSelectedBeforReady);
    return
  }
  jessesavedSelection = saveSelection(), chrome.runtime.sendMessage({
    command: "getwords"
  }, function(a) {
    processToHighlightOrNot(a, b, globalword, jessesavedSelection)
  })
}

function highlightSelection(a) {
  if (a != undefined)
    if (a.button == 2 || a.ctrlKey || a.shiftKey || a.altKey) return;
  var b = a.target || window.event.srcElement;
  if (b instanceof HTMLInputElement) return;
  if (b instanceof HTMLTextAreaElement) return;
  var c = window.getSelection().toString().replace(/^\s+|\s+$/g, "");
  globalword = c, highlightSelectionCore(c, a)
}

function highlightSelectionBefore(a) {
  tellBackgroundToGetCaptureWord(highlightSelection, a)
}

function highlightWordAtPoint(a) {
  var b = getWordAtPoint(a.target, a.x, a.y);
  if (beforeselected == b) return;
  beforeselected = b, highlightSelectionCore(b, a)
}

function processToHighlightOnly(a, b, c, d) {
  var e = !1,
    f = a.farewell,
    g = c;
  if (f == null || f == "") {
    tellBackgroundToAddWord(g), localSearchHighlight(g);
    return
  }
  for (var h = 0; h < f.length; h++) {
    var i = new RegExp("\\b" + f[h] + "\\b");
    if (c.search(i) > -1) {
      e = !0, g = f[h];
      break
    }
  }
  e || (tellBackgroundToAddWord(g), localSearchHighlight(g), showTooltipWithWord(b, g, d))
}

function highlightSelectionCoreOneSecond(a, b) {
  if (a == "") return;
  if (!a) return;
  if (a.length == 1) return;
  if (/[^a-zA-Z]/g.test(a)) return;
  if (a.indexOf(" ") >= 0) return;
  globalword = a.toLowerCase();
  if (document.readyState != "complete") {
    tellBackgroundToGetChinese(globalword, funcSelectedBeforReady);
    return
  }
  jessesavedSelection = saveSelection(), chrome.runtime.sendMessage({
    command: "getwords"
  }, function(a) {
    processToHighlightOnly(a, b, globalword, jessesavedSelection)
  })
}

function highlightWordAtPointOneSecond(a) {
  var b = getWordAtPoint(a.target, a.x, a.y);
  if (beforeselected == b) return;
  beforeselected = b, highlightSelectionCoreOneSecond(b, a)
}

function cancelQuickSelect(a) {
  bCancelQuickSelect = 1
}

function highlightSelectionCtrlPress(a) {
  clearTimeout(timeout), bCancelQuickSelect = 0, timeout = setTimeout(function() {
    if (bCancelQuickSelect == 1) return;
    tellBackgroundToGetXuanTingCaptureWord(highlightWordAtPointOneSecond, a)
  }, 1e3);
  if (a != undefined) {
    if (a.button == 2) return;
    if (!a.altKey) return
  }
  highlightWordAtPoint(a)
}

function getwordsandhighlight(a) {
  document.readyState == "complete" && chrome.runtime.sendMessage({
    command: "getwords"
  }, processHightlightAll2)
}

function clearHighlightsOnPage() {
  unhighlight(document.getElementsByTagName("body")[0]), cssstr = "", updateStyleNode(cssstr), lastText = ""
}

function processHightlightAll2(a) {
  var b = a.farewell;
  if (b == null || b == "") return;
  var c = [];
  docmenttext = document.documentElement.innerText.toLowerCase();
  for (var d = 0; d < b.length; d++) docmenttext.indexOf(b[d]) > -1 && c.push(b[d]);
  c.length > 0 && timedChunk(b, localSearchHighlight, null, function() {})
}

function timedChunk(a, b, c, d) {
  var e = a.concat(),
    f = 25;
  setTimeout(function() {
    var g = +(new Date);
    do b.call(c, e.shift()); while (e.length > 0 && +(new Date) - g < 50);
    e.length > 0 ? setTimeout(arguments.callee, f) : d && d(a)
  }, f)
}

function processToHighlightOrNot(a, b, c, d) {
  var e = !1,
    f = a.farewell,
    g = c;
  if (f == null || f == "") {
    tellBackgroundToAddWord(g), localSearchHighlight(g);
    return
  }
  for (var h = 0; h < f.length; h++) {
    var i = new RegExp("\\b" + f[h] + "\\b");
    if (c.search(i) > -1) {
      e = !0, g = f[h];
      break
    }
  }
  e ? (tellBackgroundToDelWord(g), unhighlightword(document.getElementsByTagName("body")[0], g)) : (tellBackgroundToAddWord(g), localSearchHighlight(g), showTooltipWithWord(b, g, d))
}
var lastText = "",
  cssstr = "",
  jessesavedSelection, trytimes = 0,
  MAXTRYTIMES = 1e3,
  ENTRYISNULL = "生词本中没有这个词",
  TOBETRANSLATED = "后台翻译中",
  beforeselected = "",
  globalword = "",
  globalwordbefore = "",
  globalworddrag = "",
  bCancelQuickSelect = 0;
document.addEventListener("mouseup", highlightSelectionBefore, !1),
document.addEventListener("mousedown", cancelQuickSelect, !1), 
document.addEventListener("mousemove", highlightSelectionCtrlPress, !1), 
document.addEventListener("readystatechange", getwordsandhighlight, !1), 
chrome.extension.onMessage.addListener(processRequest),
/* shortcut.add("Ctrl+Alt+X", function() {
  tellBackgroundToRandomWebsite()
}), 
shortcut.add("Ctrl+Alt+C", function() {
  tellBackgroundToSetCaptureWord()
}),*/ 
document.addEventListener("dragstart", dragStart, !1), document.addEventListener("drag", doDrag, !1), document.addEventListener("dragover", dragOver, !1), document.addEventListener("dragend", doDrop, !1), document.addEventListener("drop", doDrop, !1);
var timeout;