shortcut={all_shortcuts:{},add:function(a,b,c){var d={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(!c)c=d;else for(var e in d)typeof c[e]=="undefined"&&(c[e]=d[e]);var f=c.target;typeof c.target=="string"&&(f=document.getElementById(c.target));var g=this;a=a.toLowerCase();var h=function(d){d=d||window.event;if(c.disable_in_input){var e;d.target?e=d.target:d.srcElement&&(e=d.srcElement),e.nodeType==3&&(e=e.parentNode);if(e.tagName=="INPUT"||e.tagName=="TEXTAREA")return}d.keyCode?code=d.keyCode:d.which&&(code=d.which);var f=String.fromCharCode(code).toLowerCase();code==188&&(f=","),code==190&&(f=".");var g=a.split("+"),h=0,i={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},j={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},l={shift:{wanted:!1,pressed:!1},ctrl:{wanted:!1,pressed:!1},alt:{wanted:!1,pressed:!1},meta:{wanted:!1,pressed:!1}};d.ctrlKey&&(l.ctrl.pressed=!0),d.shiftKey&&(l.shift.pressed=!0),d.altKey&&(l.alt.pressed=!0),d.metaKey&&(l.meta.pressed=!0);for(var m=0;k=g[m],m<g.length;m++)k=="ctrl"||k=="control"?(h++,l.ctrl.wanted=!0):k=="shift"?(h++,l.shift.wanted=!0):k=="alt"?(h++,l.alt.wanted=!0):k=="meta"?(h++,l.meta.wanted=!0):k.length>1?j[k]==code&&h++:c.keycode?c["keycode"]==code&&h++:f==k?h++:i[f]&&d.shiftKey&&(f=i[f],f==k&&h++);if(h==g.length&&l.ctrl.pressed==l.ctrl.wanted&&l.shift.pressed==l.shift.wanted&&l.alt.pressed==l.alt.wanted&&l.meta.pressed==l.meta.wanted){b(d);if(!c.propagate)return d.cancelBubble=!0,d.returnValue=!1,d.stopPropagation&&(d.stopPropagation(),d.preventDefault()),!1}};this.all_shortcuts[a]={callback:h,target:f,event:c.type},f.addEventListener?f.addEventListener(c.type,h,!1):f.attachEvent?f.attachEvent("on"+c.type,h):f["on"+c.type]=h},remove:function(a){a=a.toLowerCase();var b=this.all_shortcuts[a];delete this.all_shortcuts[a];if(!b)return;var c=b.event,d=b.target,e=b.callback;d.detachEvent?d.detachEvent("on"+c,e):d.removeEventListener?d.removeEventListener(c,e,!1):d["on"+c]=!1}};