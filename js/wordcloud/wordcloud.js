jQuery(function ($) {

	var $r = $('#result');

	$('#english').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english});
			} catch (e) { alert(e); }
		}
	);

	$('#ellipticity').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, ellipticity: 1.5});
			} catch (e) { alert(e); }
		}
	);
	
	$('#center').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, center: [580, 0]});
			} catch (e) { alert(e); }
		}
	);

	
	$('#minSize_function').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, minSize: 20});
			} catch (e) { alert(e); }
		}
	);
	
	$('#rotateRatio_function').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, rotateRatio: 1});
			} catch (e) { alert(e); }
		}
	);

	$('#rotateRatio0_function').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, rotateRatio: 0});
			} catch (e) { alert(e); }
		}
	);

	$('#drawMask').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, drawMask: true});
			} catch (e) { alert(e); }
		}
	);

	$('#drawMask').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, drawMask: true});
			} catch (e) { alert(e); }
		}
	);

	$('#mask').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, drawMask: true, maskColor: 'rgba(0,0,255,0.8)', maskGridWidth: 1});
			} catch (e) { alert(e); }
		}
	);

	$('#color').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, wordColor: 'rgba(255,128,128,0.8)', backgroundColor: 'rgba(0,0,255,0.3)'});
			} catch (e) { alert(e); }
		}
	);

	$('#wait').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, wait: 1000});
			} catch (e) { alert(e); }
		}
	);

	$('#abort').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, abortThreshold: 100, abort: function () { alert('aborted!');}});
			} catch (e) { alert(e); }
		}
	);

	$('#weightFactor').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, weightFactor: 0.5});
			} catch (e) { alert(e); }
		}
	);

	$('#weightFactor_function').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, weightFactor: function (w) { return Math.random()*w; }});
			} catch (e) { alert(e); }
		}
	);

	$('#wordColor_light').bind(
		'click',
		function () {
			var ctx = $r[0].getContext('2d');
			ctx.fillStyle = '#600';
			ctx.fillRect(0, 0, 580, 400);
			try {
				$r.wordCloud({wordList: list_english, wordColor: 'random-light' });
			} catch (e) { alert(e); }
		}
	);


	$('#wordColor_function').bind(
		'click',
		function () {
			try {
				$r.wordCloud(
					{
						wordList: list_english,
						wordColor: function (word, weight, fontSize, radius, theta) {
							if (theta < 2*Math.PI/3) {
								return '#600';
							} else if (theta < 2*Math.PI*2/3) {
								return '#060';
							} else {
								return '#006';
							}
						}
					}
				);
			} catch (e) { alert(e); }
		}
	);

	$('#clearCanvas').bind(
		'click',
		function () {
			var im = new Image();
			im.onload = function () {
				var ctx = $r[0].getContext('2d');
				ctx.fillStyle = '#ddf'; // Need to cover available area for text with backgroundColor first
				ctx.fillRect(0, 0, 580, 400);
				ctx.drawImage(im, 75, 200);
				try {			
					$r.wordCloud({wordList: list_english, backgroundColor: '#ddf', clearCanvas: false});
				} catch (e) { alert(e); }
			}
			// image location is restricted by the same origin policy for getPixelData to work.
			im.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2AsJCwIrqr4+WgAABI5JREFUeJzt3cuOVEUcx/HviBccjIkJq2m5+wreNjMHSCRxJ8YNC+JCV+hO38AH8bZT8B3YiQIbHgACLFkYTAgwqIvTFY5NX86l6l+33zfpZCYz3VXpz9TpTPXp7i1sexU41Pn+LePxa+gA8Mb86/tbhgPPgN+Adw3HrL3vXjIaaAZcQbjWPbMAdrjvGYylFgoNLNzIhQSeAZcRbtRCATvc9wPdvurX0xDAwk2nJ76BhZtYPoGFm2C+gGfArwg3uXwAO9wPPNyW8txUYOEm3hRg4WbQWGDhZtIY4BnwC8LNopcH/r5WbmYNWcHCzbC+wMLNtD7AOwg32zYB79BuPwo309YBa+UW0Cpgh/uh4VxUgJYBC7egFoGFW1hd4B3aHSrhFlR3J+sCcG1+eQbs054h/9qI230EvAkcHHHdx8D2/LpDT8zfB14BXqc9w39I/8zH21647mHg6MDbUpl0FrgL/Jvp5VurVzbk2Fnge+DtyPOYlICXVwQuCHhZZygEFwS82BngBwrBBQF3Kw4XBOwq6rDcTcDPcY9EnkeQagcuGhfqBi4eF+oFrgIX6gSuBhc4VBtwTbhAXSu4OlyoB7hKXKgDuFpcKB/4NBXjQtnAp2n3lqvFhXKBhTuvROAcDst/WQ1UGrDDTfkkuT+An43GOlAScC6454EHRuMdLAU4J9x7loOWACzcNeUOLNwN5QycM67Z/Z4rcM64MO4lPaPKETh3XNNyAy4Fd99oLlkBl4IL7SsoTcoFuCRcy7y/43uISsR9GnAu3fZTBy4RF+BJoLm8UMrApeKaliqwcD2VIrBwPZYasHA9lxKwcAOUCrBwA5UCsHADFhu4oU7coW/SNrqYwA3tqa214UIFTxc21ItrWgzghjoPy92s9qLNgRta3GPG4w7JYuWa7UUP/dykKTXosGye1QpuEG63op7wbxDuYman7IQ+RDfkgfsJcD/2REIUcgU3CDd6oYAbhJtEIYAbhJtMvoEbhJtUPoEb8tihqgYX/AE35LFDVRUu+AHeQ7hDM9tBnAq8R/uYK9xhjfmwsVFN+UvaA35Ej7lJN3YFC3daST9dKNzpJQss3MwaAixcfz2yGqgvsHD9ZvV04XYfYOFm3CbgXYSbdeuAd4GfEG6u/Q3cWvXDXeAO8T/Bet3lGjCbfDfE6SJh75uHwNerBt8FbgeeQM24EBZYuAkUCli4iRQC+CHw1aoBhWvblwi3WFyASxjhAlz1OJhw++ULeCMuwDvATU8DCrdfX2CE60oRuVRcgM+Zjntp6KApIZeMC9OAR+G6UkAuHRfgMyLguk4BN0ZOQLj9+pRIuK4YyLXgwnBgr7iuU8D1gRMRbr+GAAfBdVkg14YL/YGD4rpOEg65RlzoB2yC6wqBXCsubAY2xXWdBP7cMDHh9msdcBRclw/k36kbF1YDR8V1nWA8snDblgEnges6QXvCm3DHtQicFK7rOP1XsnD/Xxc4SVzXcTavZOG+2MdkgOs6xmpk4S7vHO15y8njupYh1/6v0Lo+Ar6JPYmhHeU5snDXtxV7AmM7AlxBuMn0H/K66ODcIItdAAAAAElFTkSuQmCC';

		}
	);

	$('#fillbox').bind(
		'click',
		function () {
			try {
				$r.wordCloud({wordList: list_english, fillBox: true});
			} catch (e) { alert(e); }
		}
	);


});



var list_english = [];
var orderKey ='count';
var order = 'desc';
var words = sortWordbyField(orderKey, order);
var end = words.length;
/*var toshow=100;
if (end<toshow)
{
	toshow=end;
}*/

for (var i=0;i<end;i++)
{
	var wordArray = [];
	wordArray.push(words[i].word);
	wordArray.push(Math.floor((end-i)/end*58)+10);
	list_english.push(wordArray);
}

var $r = $('#result');
try {
				$r.wordCloud({wordList: list_english, rotateRatio: 0});
			} catch (e) { alert(e); }

/*words.forEach(function(mywords) {
		var wordArray = [];
		wordArray.push(mywords.word);
	wordArray.push(parseInt(mywords.count)+1);
	list_english.push(wordArray);
	})*/