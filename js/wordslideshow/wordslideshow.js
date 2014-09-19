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
            
			
			function googleImageSlide(imgid,max_width,max_height){
				var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=2&start=1&callback=?&q=" + imgid;
				$.getJSON(url, function(data) {
				//console.log(imgid);
                if(data && data.responseData && data.responseData.results && data.responseData.results.length > 0){
                	getid('a_'+imgid).href=data.responseData.results[0].unescapedUrl;
					getid(imgid).src=data.responseData.results[0].unescapedUrl;
						var jesseimg=$("#"+imgid);
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
				}
                else
				{
					getid('a_'+imgid).href="";
                    getid(imgid).src="";
				}
				});
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
						"count" : obj.count,
					};
					wordjson.push(j_obj);
				}

				SortData(wordjson, field, type);
				return wordjson;
			}
			
			 function pick(n, min, max){
				var values = [], i = max;
				while(i >= min) values.push(i--);
				var results = [];
				var maxIndex = max;
				for(i=1; i <= n; i++){
					maxIndex--;
					var index = Math.floor(maxIndex * Math.random());
					results.push(values[index]);
					values[index] = values[maxIndex];
				}
				return results;
			}
			
			function InitSlideShow() {
				var orderKey = "count";
				var order = "desc";

				var words = sortWordbyField(orderKey, order);
				var totallength=words.length;
				var length=words.length;
				if(length>7)
				{
					length=7;
				}
				
				var arr = pick(length,1,totallength);
				
				
				getid("slides_container").innerHTML = "";
				for(var k=0;k<length;k++){
					var h=k+1+'';
					console.log(arr[k]-1);
					var theword=words[arr[k]-1].word;
					var thechinese=words[arr[k]-1].chinese;
					var divtable=document.createElement("div");
					divtable.className='slide';
					divtable.align='middle';
					divtable.innerHTML='<a id="a_'+theword+'" href="#" title="'+theword+'" align="middle" target="_blank"><img  id="'+theword+'" src="" width="800" height="600" alt="'+theword+'"></a> <div class="caption"  style="bottom:0"><p align="middle">'+theword+'&nbsp;&nbsp;<font color="black">'+myhtml2txt(thechinese,' ')+'</font></p></div>';

					getid("slides_container").appendChild(divtable);
					googleImageSlide(theword,800,570);
				}
			}
			
			InitSlideShow();
			//while(globalcount<totalcount-1)
			//{
			//	window.setTimeout(function() {  
			//		console.log(globalcount); 
			//	}, 60000);  
			//}
			
		$(function(){
			$('#slides').slides({
				preload: true,
				preloadImage: 'img/loading.gif',
				play: 5000,
				pause: 2500,
				hoverPause: true,
				animationStart: function(current){
					$('.caption').animate({
						bottom:-35
					},100);
					if (window.console && console.log) {
						// example return of current slide number
						console.log('animationStart on slide: ', current);
					};
				},
				animationComplete: function(current){
					$('.caption').animate({
						bottom:0
					},200);
					if (window.console && console.log) {
						// example return of current slide number
						console.log('animationComplete on slide: ', current);
					};
				},
				slidesLoaded: function() {
					$('.caption').animate({
						bottom:0
					},200);
				}
			});
		});