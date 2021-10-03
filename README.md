<h1 align="center">
  📚 Book Box
  <br>
</h1>

<h3 align="center">Updates a reading list gist to show currently reading books on Notion</h3>

<p align="center">
    <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat" alt="Typescript"/>
    </a>
    <a href="https://github.com/makenotion/notion-sdk-js">
        <img src="https://img.shields.io/badge/-Notion%20SDK-000000?logo=notion&style=flat" alt="Notion.so">
    </a>
</p>

<h4 align="center">
    This project was inspired by <a href="https://github.com/matchai/awesome-pinned-gists">awesome pinned gists</a>
</h4>

## Getting Started

1. Create a new public [Gist](https://gist.github.com/)
2. Create a [personal access token](https://github.com/settings/tokens/new) with the `gist` scope
3. Fork this repo
4. Go to Settings > Settings and add the following values:
   1. `GH_TOKEN`: The personal access token you just created
   2. `GIST_ID`: The id of your gist url (`https://gist.github.com/ericfzhu/**f250c8f66128ae70883a031b8dbca982**`)
   3. `NOTION_API_KEY` and `NOTION_DATABASEID`: Follow Notion's [Getting Started](https://developers.notion.com/docs/getting-started) guide to acquire these (Don't forget to invite your integration into your workspace!)
5. Go to Actions and press `Enable`
6. Pin your new Gist to your profile!


## Usage
This project requires your Notion workspace to be a database, and contain a column called `Name` for the title of the book and a column called `Progress` for the current percentage progress in the book. 


### Background
The nature of this project may seem fairly manual, that's due to the fact that Goodreads is no longer issuing new API tokens and I wanted a way to showcase what I'm currently reading