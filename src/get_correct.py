import requests

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


if __name__ == '__main__' :
    get_news_sources('covid 19 is a novel virus that ')
