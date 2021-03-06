function colorful(a) {
  var b = a,
    c = 0;
  while (b.indexOf("<li>") >= 0) c = Math.floor(Math.random() * 16777215).toString(16), b = b.replace("<li>", '<li style="color:#' + c + '">');
  return b
}

function ShowPage(a) {
  GetPageCount(function(b) {
    document.getElementById("itemcount").innerHTML = a + "/" + b + "页", document.getElementById("div_words").innerHTML = "";
    if (b < a) return;
    ListWordPageList(a)
  })
}

function addWordUnit(a) {
  var b = $("<div/>", {
      "class": "wordUnit"
    }),
    c = $("<div/>", {
      "class": "wordTitle"
    });
  $("<div/>", {
    text: a.word,
    "class": "keyWord"
  }).appendTo(c), c.appendTo(b);
  if (a.sound != "") {
    var d = $("<a/>", {
        href: "javascript:void(0);",
        mouseover: function() {
          myplaysound(a.sound, chinesetottsurl(a.chinese))
        }
      }),
      e = $("<img/>", {
        border: "0",
        width: "16",
        height: "16",
        src: "../img/SpeakerOffA16.png"
      });
    e.appendTo(d), c.append(d)
  }
  var f = $("<div/>", {
      "class": "opBtn"
    }),
    g = $("<a/>", {
      title: "删除",
      href: "#",
      click: function() {
        addNewWordUnit(currentpage), b.remove(), RemoveWord(a.word)
      }
    }),
    h = $("<img/>", {
      src: "../img/del.png"
    });
  h.appendTo(g), g.appendTo(f), f.appendTo(c);
  var i = '<div class="opBtn">' + a.count + "</div>";
  c.append(i);
  var j = "";
  a.tb && (j = a.tb);
  var k = '<div  class="message"><div style="text-align:left;">' + colorful(a.chinese) + "</div></div>";
  b.append(k), b.appendTo($("#div_words"))
}
var currentpage = 1,
  PAGE_SIZE = 7,
  bgPage = chrome.extension.getBackgroundPage();
$(document).ready(function() {
  localStorage.rdOrderKey || (localStorage.rdOrderKey = "count"), localStorage.rdOrder || (localStorage.rdOrder = "desc"), SetGroupValue("rdOrderKey", localStorage.rdOrderKey), SetGroupValue("rdOrder", localStorage.rdOrder);
  var a = document.getElementsByName("ckCurrent");
  localStorage["ckCurrent"] == "currenttab" ? (currentTabText = bgPage.currentTabText, a[0].checked = !0, bOnlyCurrentTab = !0) : (a[0].checked = !1, bOnlyCurrentTab = !1);
  var b = document.getElementsByName("ckCaptureWord");
  localStorage["ckCaptureWord"] == "NotCaptureWord" ? b[0].checked = !1 : b[0].checked = !0;
  var c = document.getElementsByName("ckXuanTingCaptureWord");
  localStorage["ckXuanTingCaptureWord"] == "NotCaptureWord" ? c[0].checked = !1 : c[0].checked = !0, ShowPage(currentpage), UpdateWordCounts(), $("#xuanting").bind("click", function(a) {
    SetXuanTingCaptureWord()
  }), $("#quci").bind("click", function(a) {
    SetCaptureWord()
  }), $("#sanchongmen").bind("click", function(a) {
    RandomWebsite()
  }), $("#kapian").bind("click", function(a) {
    chrome.tabs.create({
      url: "htm/wordcard/wordcard.htm"
    })
  }), $("#yun").bind("click", function(a) {
    chrome.tabs.create({
      url: "htm/wordcloud/wordcloud.htm"
    })
  }), $("#shu").bind("click", function(a) {
    chrome.tabs.create({
      url: "htm/wordbook/book.htm"
    })
  }), $("#huandeng").bind("click", function(a) {
    chrome.tabs.create({
      url: "htm/wordslideshow/slideshow.htm"
    })
  }), $("#daochu").bind("click", function(a) {
    chrome.tabs.create({
      url: "htm/wordexport/wordexport.htm"
    })
  }), $("#daoru").bind("click", function(a) {
    chrome.tabs.create({
      url: "htm/wordimport/wordimport.htm"
    })  
  }), $("#cishu").bind("click", function(a) {
    SetOrder()
  }), $("#zimu").bind("click", function(a) {
    SetOrder()
  }), $("#jiangxu").bind("click", function(a) {
    SetOrder()
  }), $("#shengxu").bind("click", function(a) {
    SetOrder()
  }), $("#dangqianye").bind("click", function(a) {
    SetOrder()
  }), $("#prevpage").bind("click", function(a) {
    ShowPrevPage()
  }), $("#nextpage").bind("click", function(a) {
    ShowNextPage()
  })
});