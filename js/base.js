function myhtml2txt(a, b) {
  var c;
  return c = a.replace(/<.*?>/g, b), c
}

function chinesetottsurl(a) {
  if (a == "") return "";
  if (!a) return "外星人，攻打，地球，了，吗？";
  var b = myhtml2txt(a, ","),
    c;
  return b = b.replace(/^\s+|\s+$/g, ""), b = b.replace("vbl.", ","), b = b.replace("vi.", ","), b = b.replace("vt.", ","), b = b.replace("adj.", ","), b = b.replace("adv.", ","), b = b.replace("pron.", ","), b = b.replace("num.", ","), b = b.replace("art.", ","), b = b.replace("prep.", ","), b = b.replace("conj.", ","), b = b.replace("int.", ","), b = b.replace("n.", ","), c = "http://translate.google.com/translate_tts?tl=zh-CN&q=" + encodeURIComponent(b), c
}

function myplaysound(a, b) {
  if (a == "") return;
  myaudio.src = a, myaudio2.src = b, myaudio.play(), myaudio.addEventListener("ended", function() {
    b != "" && myaudio2.play()
  }, !1)
}

function random1web() {
  var a = getAllWord(),
    b = a.length,
    c = Math.floor(Math.random() * b),
    d = a[c],
    e = Math.floor(Math.random() * b),
    f = a[e];
  chrome.tabs.create({
    url: "http://www.google.com/search?q=" + d + "+" + f + "&btnI=1&hl=en"
  })
}

function RandomWebsite() {
  random1web(), random1web(), random1web()
}
var myaudio = new Audio,
  myaudio2 = new Audio;