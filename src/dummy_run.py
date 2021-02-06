from flask import request
from os import environ
from flask import jsonify,make_response
from flask import Flask
import requests

app = Flask(__name__)

# Declaring Constants
FLASK_HOST = environ.get("FLASK_HOST") or '0.0.0.0'

def get_news_sources(query_string):
    url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI"
    querystring = {"q":query_string ,
                   "pageNumber":"1",
                   "pageSize":"5",
                   "autoCorrect":"true",
                   "fromPublishedDate":"null",
                   "toPublishedDate":"null"}
    headers = {
        'x-rapidapi-key': "c3e7d0ee77msh246370b804cef68p133cb5jsnbca1eae2f5f1",
        'x-rapidapi-host': "contextualwebsearch-websearch-v1.p.rapidapi.com"
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    json_data= response.json()
    NewsStories = json_data['value']
    titles= []
    descriptions = []
    urls = []
    for news_story in NewsStories:
        titles.append(news_story['title'])
        descriptions.append(news_story['description'])
        urls.append( news_story['url'])
    #print('titles', titles)
    #print('descriptions', descriptions)
    #print('urls', urls)
    return (titles,descriptions,urls )


@app.route('/predict', methods=["POST", "GET"])
def get_prediction_from_model():
        try:
            data = request.get_json()
            article = data['article']
            #print('text: {}\n'.format(text))
            #todo make a real endpoint
            return jsonify({"prob" : '0.262'})
        except Exception as e:
            return jsonify({"result": "Error getting the  Score"})

@app.route('/get_context', methods=["POST", "GET"])
def get_prediction_from_model():
        try:
            query_obj = request.get_json()
            query_string = query_obj['query']
            titles, descriptions, urls = get_news_sources(query_string)

            return jsonify({ 'titles': titles ,'descriptions' :descriptions, 'urls' : urls})
        except Exception as e:
            return jsonify({"result": "Error getting Reliable "})


# Staring the App
if __name__ == '__main__':
    app.run(host=FLASK_HOST)