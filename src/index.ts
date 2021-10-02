const { Client } = require("@notionhq/client");
const dotenv = require("dotenv")

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASEID

const MAX_LEN = 54;
const MAX_LINES = 5;

(async () => {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            or: [
                {
                    property: 'Status',
                    select: {
                        equals: "Reading",
                    },
                },
            ],
        },
        sorts: [
            {
                property: 'End',
                direction: 'ascending',
            },
        ],
    });
    console.log(response);
})();