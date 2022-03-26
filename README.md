<p align="center">
    <img src="assets/logo.png" alt="icon" width="125px" />
</p>
<h1 align="center">
    Reading Gist
</h1>

<h3 align="center">Updates a reading gist to show currently reading books using Notion</h3>

<h4 align="center">
    This project was inspired by <a href="https://github.com/matchai/awesome-pinned-gists">awesome pinned gists</a>
</h4>

## Getting Started

1. Create a new public [Gist](https://gist.github.com/)
2. Create a [personal access token](https://github.com/settings/tokens/new) with the `gist` scope
3. Fork this repo by pressing the Fork button in the top right of this page or via GitHub CLI

```bash
gh repo fork https://github.com/ericfzhu/reading-gist.git
```

4. Go to Settings > Secrets > Actions and add the following values:
   1. `GH_TOKEN`: The personal access token you just created
   2. `GIST_ID`: The id of your gist url (`https://gist.github.com/ericfzhu/**f250c8f66128ae70883a031b8dbca982**`)
   3. `NOTION_API_KEY` and `NOTION_DATABASEID`: Follow Notion's [Getting Started](https://developers.notion.com/docs/getting-started) guide to acquire these (Don't forget to invite your integration into your workspace)
5. Go to Actions and press `Enable`
6. Pin your new Gist to your profile!

## Usage

This repo requires a database page on Notion that contains a column called `Name` for the book title and a column called `Progress` for the current percentage progress in the book.
