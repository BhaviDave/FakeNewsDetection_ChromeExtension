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
        article: document.getElementById("textarea").value
        };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post_data)
    };

    fetch('http://127.0.0.1:5000/predict', requestOptions)
    .then((response) => {
        return response.json();
    })
    .then((results) => {
        var  prob = results.prob;
        var output = (parseFloat(prob) * 100).toString();
        document.getElementById("res").innerText = "Chances of this news article being fake is: " + output + "%";
        console.log(results.prob);
    })
    .catch((err) => {
         console.log("err");
    });
}
