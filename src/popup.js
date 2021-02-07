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
    //'https://fakeapp-service-m6opf6hawa-uc.a.run.app/predict', requestOptions)
    .then((response) => {
        return response.json();
    })
    .then((results) => {
        var  prob = results.prob;
        //a.toFixed(2);
        var output = (parseFloat(prob).toFixed(2) * 100).toString();
        document.getElementById("res").innerText = "Chances of this news article being fake is: " + output + "%";


        console.log(results.prob);
        if(results.prob >= 100) //todo change this to threshold
        {
              document.getElementById("res").style.color = 'green';
        }
        else
        {
            document.getElementById("res").style.color = 'red';
            var notifOptions={
            type : 'basic',
            iconUrl : 'RealityCheck_200.png',
            title : 'Fake News!',
            message : 'Uh Oh! Looks like that claim is disputed. Check our sources'
            };

            //chrome.notifications.create("Fake News Notif", notifOptions);

            chrome.notifications.create(notifOptions, callback);

                function callback(){
                    console.log('Popup done!');
                }


            var q= document.getElementById("textarea").value;
            console.log(q);
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
                document.getElementById("textarea").style.display='none';
            //document.getElementById("res").style.display='none';
            document.getElementById("check").style.display='none';

                function createElement(text,tag)
                    {
                        var h = document.createElement(tag);

                        var t = document.createTextNode(text);
                        h.appendChild(t);
                        document.body.appendChild(h);

                    }

                for (var val of response.value)
                {
                   //title
                   var h1 = document.createElement('h1');
                   h1.appendChild(document.createTextNode(val.title));
                   document.body.appendChild(h1);

                   //link
                   newlink = document.createElement('a');
                 newlink.innerHTML = val.url;
                   newlink.setAttribute('title', val.url);
                   newlink.setAttribute('href', val.url);
                   document.body.appendChild(newlink);

                    //para
                    var para = document.createElement("P");
                    para.innerText = val.description;
                    document.body.appendChild(para);

                    //createElement(val.url,'p');
                    //createElement(val.description,'p');
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