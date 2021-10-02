const { Client } = require("@notionhq/client")
const dotenv = require("dotenv")

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASEID