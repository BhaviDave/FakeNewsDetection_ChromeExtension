chrome.tabs.executeScript({
	code: "window.getSelection().toString();"
}, function (selection) {
	if (selection[0] == "") {
		document.getElementById("textarea").placeholder = "Please highlight text to analyze.";
	} else {
		document.getElementById("textarea").value = selection[0];
	}
});


// Get the button, and when the user clicks on it, execute myFunction
document.getElementById("check").onclick = function() {make_api_call()};

function make_api_call() {
  //todo make api call
  alert("Real or Fake");
}