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

    fetch('http://127.0.0.1:8080/predict', requestOptions)
    .then((response) => {
        return response.json();
    })
    .then((results) => {
        var  prob = results.prob;
        var output = (parseFloat(prob) * 100).toString();
        document.getElementById("res").innerText = "Chances of this news article being fake is: " + output + "%";


        console.log(results.prob);
        if(results.prob < 100) //todo change this to threshold
        {
            var notifOptions={
            type : 'basic',
            iconUrl : 'fake_news_colour_192.png',
            title : 'Fake News!',
            message : 'Uh Oh! Looks like that claim is disputed. Check our sources'
            };

            //chrome.notifications.create("Fake News Notif", notifOptions);

            chrome.notifications.create(notifOptions, callback);

                function callback(){
                    console.log('Popup done!')
                }

            document.getElementById("textarea").style.display='none';
            document.getElementById("res").style.display='none';
            document.getElementById("check").style.display='none';

            var q= document.getElementById("textarea").value;
            fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q="+q+"&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "c3e7d0ee77msh246370b804cef68p133cb5jsnbca1eae2f5f1",
                    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                function createElement(text,tag)
                    {
                        var h = document.createElement(tag);
                        var t = document.createTextNode(text);
                        h.appendChild(t);
                        document.body.appendChild(h);
                    }

                for (var val of response.value)
                {
                   // var h1 = document.createElement('h1');
                    //h1.appendChild(document.createTextNode(text));
                    //document.body.appendChild(h1);
                    createElement(val.title,'h1');
                    createElement(val.url,'p');
                    createElement(val.description,'p');
                    //document.write(val.title + "<br />");
                    //document.write(val.url + "<br />");
                   // document.write(val.description + "<br />");
                }
            })
            .catch(err => {
                console.error(err);
            });

        }

    })
    .catch((err) => {
         console.log("err");
    });
}
