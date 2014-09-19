function swnotify(a) {
  var b = {
    type: "basic",
    title: "",
    message: a,
    iconUrl: "../../img/sw_48.png"
  };
  chrome.notifications.create("swnotify", b, callback)
}

function callback(a) {
  setTimeout(function() {
    chrome.notifications.clear(a, function(a) {})
  }, 5e3)
}

function setIcon(a) {
  if (a) {
    var b = {};
    a && a.text != undefined && (b.text = a.text), a && a.tabId && (b.tabId = a.tabId), chrome.browserAction.setBadgeText(b)
  }
}

function colorful(a) {
  var b = a,
    c = 0;
  while (b.indexOf("<li>") >= 0) c = Math.floor(Math.random() * 16777215).toString(16), b = b.replace("<li>", '<li style="color:#' + c + '">');
  return b
}

function SyncSave() {
  Sync.save()
}

function refreshIcon() {
  var a = 0,
    b = getAllWord();
  b && (a = b.length), a < 1e4 ? itemcountstr = a.toString() : itemcountstr = "1W+", setIcon({
    text: itemcountstr
  })
}

function getCurrentTabAndSendMessages() {
  chrome.tabs.query({
    active: !0,
    currentWindow: !0
  }, function(a) {
    chrome.tabs.sendMessage(a[0].id, messages[0]), messages = []
  })
}

function sendContextunhighlightword(a) {
  messages.push({
    command: "unhighlightword",
    word: a
  }), getCurrentTabAndSendMessages()
}

function sendContexthighlightword(a) {
  messages.push({
    command: "highlightword",
    word: a
  }), getCurrentTabAndSendMessages()
}

function getWordCount() {
  var a = 0,
    b = getAllWord();
  return b && (a = b.length), a
}

function getMeaningAndSound_Bing(a) {
  var b, c = {},
    d, e, f, g, h;
  c.tt = [];
  var i, j, k = a.ROOT;
  return k.DEF && (c.ps = k.PROS.PRO ? k.PROS.PRO.length ? k.PROS.PRO[0].$ : k.PROS.PRO.$ : "", c.pron = k.AH ? "http://media.engkoo.com:8129/en-us/" + k.AH.$ + ".mp3" : "", d = k.DEF[0].SENS, d && (d.length || (d = [d]), $.each(d, function(a, b) {
    var d;
    if (b.SEN.length) {
      d = [];
      for (var e = 0; e < b.SEN.length; e += 1) d.push(b.SEN[e].D.$);
      d = d.join(",")
    } else d = b.SEN.D.$;
    c.tt.push({
      pos: b.$POS + ".",
      acceptation: d
    })
  }))), c
}

function addAll(a) {
  addEverWord(a)
}

function addEverWord(a) {
  bTranslatingChineseEverWord = !0, translatingword = a, $.ajaxSetup({
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
    d == "" && (d = a), d += "\r\n", d = "<li>" + d, d = d.replace(/\r\n/g, "</li><li>"), d = d.slice(0, -4), d = d.replace(/<li><\/li>/g, ""), d = unescape(d), addChineseAndSoundAndPic(a, d, c, e, f, g, h, i, j), d != a && Sync.save(), bTranslatingChineseEverWord = !1, translatingword = ""
  }).error(function(b) {
    addChineseAndSoundAndPic(a, "取词异常:" + b.description, "", "", "", "", "", "", ""), bTranslatingChineseEverWord = !1, translatingword = ""
  })
}

function search_EverWord(a, b) {
  omniword = a, omnisound = "", omnimeaning = "", globalcallback = b, omnisound = "", $.ajaxSetup({
    async: !0
  }), $.getJSON("http://everword.sinaapp.com/word.php?", {
    word: omniword,
    username: window.localStorage.getItem("_sys_username"),
    timestamp: window.localStorage.getItem("_sys_timestamp")
  }, function(a) {
    var b = a.sound,
      c = a.chinese,
      d = a.pic,
      e = a.picw,
      f = a.pich,
      g = a.tburl,
      h = a.tbw,
      i = a.tbh;
    c == "" && (c = word), c += "\r\n", c = "<li>" + c, c = c.replace(/\r\n/g, "</li><li>"), c = c.slice(0, -4), c = c.replace(/<li><\/li>/g, ""), c = unescape(c), b != "" && myplaysound(b, ""), c != "" && globalcallback(c)
  })
}

function processRequest(a, b, c) {
  var d = {
    checked: a.value
  };
  switch (a.command) {
    case "getwords":
      var e = getAllWord();
      c({
        farewell: e
      });
      return;
    case "addwords":
      var f = JSON.parse(a.word),
        g = f.word;
      addWord(g), refreshIcon(), addAll(g);
      break;
    case "addcount":
      var f = JSON.parse(a.word);
      addCount(f.word);
      break;
    case "delwords":
      var f = JSON.parse(a.word);
      delWord(f.word), refreshIcon(), SyncSave();
      break;
    case "getchinese":
      var f = JSON.parse(a.word),
        h = getChinese(f.word),
        i = getTb(f.word),
        j = '<div><img   style="float: left;" src="' + i + '"/></div><div style="text-align:left;">' + colorful(h) + "</div></div>",
        k = getSound(f.word);
      c({
        farewell: j,
        sound: k
      });
      return;
    case "transgetchinese":
      var f = JSON.parse(a.word);
      if (bTranslatingChineseEverWord && translatingword == f.word) var h = "正在翻译",
        j = h,
        k = "";
      else {
        var h = getChinese(f.word),
          i = getTb(f.word);
        i || (i = "");
        var j = '<div><div style="text-align:left;">' + colorful(h) + '</div><img   style="float: left;" src="' + i + '"/></div>',
          k = getSound(f.word)
      }
      c({
        farewell: j,
        sound: k
      });
      return;
    case "getcaptureword":
      var l = localStorage.ckCaptureWord;
      l != "NotCaptureWord" && (l = "CaptureWord"), c({
        farewell: l
      });
      return;
    case "setcaptureword":
      var l = localStorage.ckCaptureWord;
      l != "NotCaptureWord" ? (localStorage.ckCaptureWord = "NotCaptureWord", swnotify("您关闭了双击取词（Ctrl+Alt+C）")) : (localStorage.ckCaptureWord = "CaptureWord", swnotify("您打开了双击取词（Ctrl+Alt+C）"));
      break;
    case "getxuantingcaptureword":
      var m = localStorage.ckXuanTingCaptureWord;
      m != "NotCaptureWord" && (m = "CaptureWord"), c({
        farewell: m
      });
      return;
    case "setxuantingcaptureword":
      var m = localStorage.ckXuanTingCaptureWord;
      m != "NotCaptureWord" ? (localStorage.ckXuanTingCaptureWord = "NotCaptureWord", swnotify("您关闭了悬停取词")) : (localStorage.ckXuanTingCaptureWord = "CaptureWord", swnotify("您打开了悬停取词"));
      break;
    case "bgplaysound":
      var n = JSON.parse(a.soundandchinese),
        k = n.sound,
        h = n.chinese;
      myplaysound(k, chinesetottsurl(h));
      break;
    case "notify":
      var o = a.notify;
      swnotify(o);
      break;
    case "resetbtranslating":
      bTranslatingChineseEverWord = !1;
      break;
    case "randomwebsite":
      RandomWebsite()
  }
  c({})
}

function getOmniaddAndOmniword(a) {
  if (a == "") {
    omniadd = !0, omniword = a;
    return
  }
  if (a.indexOf("-") == 0) {
    omniadd = !1, omniword = "", a.length > 1 && (omniword = a.substring(1));
    return
  }
  omniadd = !0, omniword = a
}

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: "直接输入单词翻译,输入:-单词，将单词从生词本去除"
  })
}

function updateDefaultSuggestion(a) {
  getOmniaddAndOmniword(a), a == "" ? description = "请输入要翻译的单词,要从生词本去除单词请输入:-单词" : omniadd ? description = "下面会列出" + omniword + "中文释义，按回车键会将该词加入生词本" : description = "按回车键会将生词" + omniword + "从生词本清除", chrome.omnibox.setDefaultSuggestion({
    description: description
  })
}

function searchInWords(a, b) {
  var c = getChinese(a);
  b(c)
}
var messages = [],
  myaudio = new Audio,
  currentRequest = null,
  omniword = "",
  omnimeaning = "",
  omnisound = "",
  omnipic = "",
  omnipicw = "0",
  omnipich = "0",
  omnitb = "",
  omnitbw = "0",
  omnitbh = "0",
  omniadd = !0,
  globalword = "",
  translatingword = "",
  globalmeaning = "",
  globalcallback, bTranslatingChineseEverWord = !1,
  currentTabText = "";
chrome.tabs.onUpdated.addListener(function(a, b, c) {
  chrome.tabs.getSelected(null, function(a) {
    chrome.tabs.sendMessage(a.id, {
      command: "gettext"
    }, function(a) {
      currentTabText = "", a && (currentTabText = a.data)
    })
  })
}), chrome.tabs.onActiveChanged.addListener(function(a, b, c) {
  chrome.tabs.getSelected(null, function(a) {
    chrome.tabs.sendMessage(a.id, {
      command: "gettext"
    }, function(a) {
      currentTabText = "", a && (currentTabText = a.data)
    })
  })
}), chrome.runtime.onMessage.addListener(processRequest), chrome.omnibox.onInputChanged.addListener(function(a, b) {
  currentRequest != null && (currentRequest.onreadystatechange = null, currentRequest.abort(), currentRequest = null), getOmniaddAndOmniword(a), updateDefaultSuggestion(a);
  if (a == "") return;
  omniadd ? currentRequest = search_EverWord(a, function(c) {
    var d = [],
      e = myhtml2txt(c, " ");
    e = e.replace(/\s{2,}/g, " "), d.push({
      content: a + "的中文释义",
      description: e
    }), b(d)
  }) : searchInWords(omniword, function(a) {
    var c = [],
      d = myhtml2txt(a, " ");
    d = d.replace(/\s{2,}/g, " "), c.push({
      content: "从生词本删除" + omniword,
      description: d
    }), b(c)
  })
}), resetDefaultSuggestion(), chrome.omnibox.onInputStarted.addListener(function() {
  updateDefaultSuggestion("")
}), chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion()
}), chrome.omnibox.onInputEntered.addListener(function(a) {
  var b = "";
  omniadd ? (addWord(omniword), addChineseAndSoundAndPic(omniword, omnimeaning, omnisound, omnipic, omnipicw, omnipich, omnitb, omnitbw, omnitbh), sendContexthighlightword(omniword), b = omniword + "已加入生词本") : (delWord(omniword), sendContextunhighlightword(omniword), b = omniword + "已从生词本删除"), swnotify(b), refreshIcon(), SyncSave()
}), refreshIcon();