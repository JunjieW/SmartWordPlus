document.write('<link rel="stylesheet" type="text/css" media="all" href="../../css/wordbook/hideOnLoad.css" />');
			
			if(window.location.hash.match('\/')) {
				window.location = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + window.location.hash.slice(1);
			}

			var SERVER_VARIABLES = {
				PAGE : "页",
				PAGES : "页",
				THING : "单词",
				FOREWORD : "前言",
				LANG : "zh-CN",
				SITE_VERSION : 49,
				FACEBOOK_MESSAGE : "很给力的chrome划词翻译扩展：https://chrome.google.com/webstore/detail/odhiddefamddbjhpaoagfkmgkkfhjnkd",
				FACEBOOK_MESSAGE_SINGLE : "今天，我找到了一个好玩意：",
				TWITTER_MESSAGE : "很给力的chrome划词翻译扩展：https://chrome.google.com/webstore/detail/odhiddefamddbjhpaoagfkmgkkfhjnkd",
				TWITTER_MESSAGE_SINGLE : "今天，我找到了一个好玩意： ",
				BUZZ_MESSAGE : "很给力的chrome划词翻译扩展：https://chrome.google.com/webstore/detail/odhiddefamddbjhpaoagfkmgkkfhjnkd",
				BUZZ_MESSAGE_SINGLE : "今天，我找到了一个好玩意： ",
				SOLID_BOOK_COLOR : "#5873a0"
			};

			// Set language for use by Google +1 button.
			window.___gcfg = {
				lang : SERVER_VARIABLES.LANG
			};
			
			var bgPage = chrome.extension.getBackgroundPage();
			
			$(".jesse_live_try").live("mouseover",function(){
						var word=$(this).attr("id").replace('sound_','');
						var sound=getSound(word);
						var chinese=getChinese(word);
						var imgid="img"+word;
						playsoundandshowimg(sound,chinese,imgid)
					});
					
			$(".jesse_live_del").live("dblclick",function(){
						//console.log("del click");
						var word=$(this).attr("id").replace('del_','');
						getid(word).innerHTML="<strike><font size=24>"+word+"</font></strike>";
						delWord(word);
						bgPage.refreshIcon();
					});
					
			function googleImage(imgid,max_width,max_height){
				var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=2&start=1&callback=?&q=" + getid(imgid).alt;
            $.getJSON(url, function(data) {
                if(data.responseData.results.length > 0){
					//getid(imgid).src=data.responseData.results[0].tbUrl.replace("\u003d","=");
                    getid(imgid).src=data.responseData.results[0].unescapedUrl;
					//$("#"+imgid).aeImageResize({ height: 250, width: 250 });
					var jesseimg=$("#"+imgid);
					//console.log(jesseimg.width() +","+jesseimg.height() );
					var jessewidth=data.responseData.results[0].width;
					var jesseheight=data.responseData.results[0].height;
					
					var jessewidthfinal=jessewidth;
					var jesseheightfinal=jesseheight;
					
					if (jessewidth> max_width) {
						jessewidthfinal = max_width;
						jesseheightfinal = Math.ceil(jesseheight / jessewidth * max_width);
					}
					if (jesseheightfinal > max_height) {
						var jessewidthfinal= Math.ceil(jessewidthfinal / jesseheightfinal * max_height);
						var jesseheightfinal = max_height;
					} 
					jesseimg.css({ height: jesseheightfinal, width: jessewidthfinal });
					//jesseimg.css({ height: h, width: w });
				}
                else
                    getid(imgid).src="";
				});
			}
			
			function playsoundandshowimg(sound,tts,imgid)
			{
				myplaysound(sound,chinesetottsurl(tts));
				googleImage(imgid.replace("&quot;",""),800,350);
			}
			function getid(element) {
				//if (typeof element == 'string')
				return document.getElementById(element);
			}

			function SortData(datas, field, type) {
				SortFun.field = field;
				datas.sort(SortFun);
				if(type == "desc") {
					datas.reverse();
				}
			}

			function SortFun(data1, data2) {
				if(data1[SortFun.field] > data2[SortFun.field]) {
					return 1;
				} else if(data1[SortFun.field] < data2[SortFun.field]) {
					return -1;
				}
				return 0;
			}

			function sortWordbyField(field, type) {
				var wordjson = [];
				var list = getAllWord();
				for(var i = 0; i < list.length; i++) {
					var obj = getWordProperty(list[i]);
					var j_obj = {
						"word" : list[i],
						"chinese" : obj.chinese,
						"sound" : obj.sound,
						"count" : obj.count
					};
					wordjson.push(j_obj);
				}

				SortData(wordjson, field, type);
				return wordjson;
			}

			function InitWordPage() {
				var orderKey = "count";
				var order = "desc";

				var words = sortWordbyField(orderKey, order)
				var end=words.length;
				if(end>100)
				{
					end=100;
				}
				var pagesstr="";
				var strlength=0;
				var ONEPAGE=7;
				
				getid("table-of-contents").innerHTML = "";
				var divtable=document.createElement("div");
				divtable.className ="center";
				divtable.innerHTML='<div class="header"><a class="go-back" href="#">返回</a><h2><span>目录</span></h2><hr></div>';
				var ultable = document.createElement("ul");
				for(var k=0;k<end;k++){
					var h=k+1+'';
					var theword=words[k].word;
					var litable=document.createElement("li");
					litable.className = theword;
					litable.innerHTML='<a href="#" data-article="'+theword+'"><div class="medium-book"><div class="illustration"></div><p>单词'+h+'</p></div> <h3>'+theword+'</h3></a>'
					ultable.appendChild(litable);
				}
				divtable.appendChild(ultable);
				getid("table-of-contents").appendChild(divtable);
				
				getid("chapter-nav").innerHTML = "";
				var pword=document.createElement("p");
				pword.innerHTML='单词';
				getid("chapter-nav").appendChild(pword);
				var ulword = document.createElement("ul");
				for(var k=0;k<end;k++){
					var h=k+1+'';
					var theword=words[k].word;
					var liword=document.createElement("li");
					liword.className = theword+" read";
					liword.innerHTML='<a href="#" class="cnItem" title="'+theword+'" data-title="'+theword+'" data-subtitle="'+theword+'" data-article="'+theword+'" data-globalstartpage="'+h+'" data-globalendpage="'+h+'" data-numberofpages="1"> <div class="illustration"></div> <span>'+h+'</span> </a>';
					liword.innerHTML+='<a class="over" href="#"><div class="description"><p class="title">'+theword+'</p><p class="pagenumber">'+h+'</p></div><div class="small-book"><div class="illustration"></div><p class="index">'+h+'</p></div></a>'
					ulword.appendChild(liword);
				}
				
				getid("chapter-nav").appendChild(ulword);
				
				getid("pages").innerHTML = "";
				var section = document.createElement("section");
				section.id = "original";
				section.className = "template-start-7 title-foreword page-1 globalPage-1 current";
				section.style.display="block";
				section.style.width="800px";
				var pagediv = document.createElement("div");
				pagediv.className="page";
				pagediv.innerHTML = '<div class="page-title"><h2>生词本</h2></div>';
				pagediv.innerHTML += '<div class="image1"><img src="../../img/wordbook/cloud01.png" data-src="../../img/wordbook/cloud01.png">';
				pagediv.innerHTML += '	<canvas width="240" height="200" style="position: absolute; left: 293px; top: 80px; "></canvas>';
				pagediv.innerHTML += '</div>';
				section.appendChild(pagediv);
				getid("pages").appendChild(section);
				document.all['original'].style.zIndex=499;
				//$("#original").style.zIndex=499;
				
				
				for(var k=0;k<end;k++){
					//pagesstr='<div class="page-title"><font size="24">'+words[k].word;
					var pagetitlediv=$("<div/>", {id:words[k].word,"class": "page-title","align":"center"});
					var font=$("<font></font>",{size:24});
					font.append(words[k].word);
					pagetitlediv.append(font);
					var sound=words[k].sound;
					var chinese=words[k].chinese;
					var word=words[k].word;
					var titlea=$("<a/>",{id:"sound_"+words[k].word,href:"#","class":"jesse_live_try"});
					var img=$("<img>",{width:16,height:16,src:"../../img/SpeakerOffA16.png"});
					titlea.append(img);
					pagetitlediv.append(titlea);
					var titlea2=$("<a/>",{id:"del_"+words[k].word,href:"#","class":"jesse_live_del"});
					var img2=$("<img>",{width:16,height:16,src:"../../img/del.png"});
					titlea2.append(img2);
					pagetitlediv.append(titlea2);
					var leftdiv=$("<div></div>", {"class": "left"});
					leftdiv.append(words[k].chinese);
					var rightdiv=$("<div></div>", {"class": "right"});
					var ppp=$("<p></p>", {"class": "continuation"});
					var imagediv=$("<div></div>", {"class": "image1"});
					var wordimg=$("<img></img>",{id:'img'+words[k].word,"class":"resizeme",alt:words[k].word});
					imagediv.append(wordimg);
					ppp.append(imagediv);
					rightdiv.append(ppp);
					var h=k+1+'';
					var hh=k+2+'';
					var contentsection=$("<section></section>",{id:"content"+h,"class":"template-"+words[k].word+" title-"+words[k].word+" page-1 globalPage-"+hh});
					var pagediv=$("<div></div>", {"class": "page"});
					pagediv.append(pagetitlediv);
					pagediv.append(leftdiv);
					pagediv.append(rightdiv);
					
					contentsection.append(pagediv);
					$("#pages").append(contentsection);
					document.all['content'+h].style.zIndex=498-k;
					
				}
				//console.log(getid("pages").innerHTML);
				
				var endsection=document.createElement("section");
				var endh=end+2+"";
				endsection.id="endsection";
				endsection.className = "template-3 title-theend page-1 globalPage-"+endh;
				endsection.innerHTML = '<div class="page">';
				endsection.innerHTML += '<p></p>';
				endsection.innerHTML += '		<span class="pageNumber">'+endh+'</span>';
				endsection.innerHTML += '	</div>';
				getid("pages").appendChild(endsection);
				document.all['endsection'].style.zIndex=498-end;
			}