$(document).ready(function() {
	var orderKey = localStorage['_sys_orderkey'];
	var order = localStorage['_sys_order'];
	
	var list = getAllWord();
	var itemcount = list.length;
	var words = sortWordbyField(orderKey, order);
	
		for (var k = 0; k < itemcount; k++) {
		$("#div_words").append(words[k].word);
		$("#div_words").append("<br>");	
	}
});