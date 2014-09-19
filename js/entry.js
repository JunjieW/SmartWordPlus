$(document).ready(function() {
	$("#main_container").gesture(
		function(gs) {
			var gestureName = gs.getName();
			if (gestureName == "right") {
				ShowNextPage();
			} else if (gestureName == "left") {
				ShowPrevPage();
			}
		}
	);
});