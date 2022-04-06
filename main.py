import json
import re
import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

GOODREADS_ID = os.environ.get('GOODREADS_ID')

html = f"https://www.goodreads.com/review/list/{GOODREADS_ID}?shelf=currently-reading"
API = "https://api.github.com/gists"

# Get the list of book titles from GoodReads via BeautifulSoup
page = requests.get(html)
soup = BeautifulSoup(page.content, "html.parser")
titles = [
    result["title"]
    for result in soup.find_all("a", title=True, href=re.compile("/book/show/"))
]
CONTENT = "\n".join(titles[:5])

# Get the current filename of the gist
response = requests.get(f'{API}/{os.environ.get("GIST_ID")}')
filename = list(response.json()["files"].keys())[0]

# Updates the gist with the new filename and content
requests.patch(
    f"https://api.github.com/gists/{os.getenv('GIST_ID')}",
    data=json.dumps(
        {
            "files": {
                filename: {"filename": "📚 Currently reading books", "content": CONTENT}
            }
        }
    ),
    headers={"Authorization": f'token {os.getenv("GH_TOKEN")}'},
)
