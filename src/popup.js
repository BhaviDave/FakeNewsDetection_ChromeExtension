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
  //alert("Real or Fake");
    const post_data = {
        article: 'request.message'
        };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post_data)
    };

    fetch('http://127.0.0.1:5000/check_story', requestOptions)
    .then((response) => {
        return response.json();
    })
    .then((results) => {
        console.log(results);
    })
    .catch((err) => {
         console.log("err");
    });
}
