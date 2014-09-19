$(document).ready(function() {
  
  
  $('#button_import').bind("click",importWords);
 
	/*var orderKey = localStorage['_sys_orderkey'];
	var order = localStorage['_sys_order'];
	
	var list = getAllWord();
	var itemcount = list.length;
	var words = sortWordbyField(orderKey, order);
	
		for (var k = 0; k < itemcount; k++) {
		$("#div_words").append(words[k].word);
		$("#div_words").append("<br>");	
	}*/
});

function importWords() {
  string = document.all.ta_words.value;
  /*alert(string);*/
  wordArray = string.split('\n');
 /* alert('string splited'+ string);
  alert('wordArray = ' + wordArray);
  alert('wordArray.length()= '+ wordArray.length);*/
  for(var i = 0; i < wordArray.length; i++){
    alert(wordArray[i]);
        
  }
  
  
}