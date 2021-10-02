import { generateBarChart } from "./bar";
import { updateGist } from "./api";

const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASEID

const MAX_LEN = 54;
const MAX_LINES = 5;

function getBooks() {
    const response = notion.databases.query({
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
                property: 'Progress',
                direction: 'descending',
            },
        ],
    });

    if (response.results) {
        const books = response.results.map((page: any) => {
            return {
                name: page.properties.Name.title[0]?.plain_text,
            };
        });
        console.log(books);
        return books;
    }

}

// function generateLines(response) {
//     const barWidth = Math.floor(MAX_LEN / 4);
//     const lines = response.slice(0, MAX_LINES).map(({ title, percent }) => {
//         const bar = generateBarChart(percent, barWidth);
//         const percentage = `${percent}%`.padStart(4, ' ');
//         const length = MAX_LEN - bar.length - percentage.length - 1;
//         let text = title;
//         if (title.length > length) {
//             text = title.substring(0, length - 3).concat('...');
//         } else {
//             text = title.padEnd(length, ' ');
//         }
//         return `${text} ${bar}${percentage}`;
//     });
//     return lines;
// }

(async () => {
    try {
        const books = await getBooks();
        for (let i = 0; i < 4; i++) {
            console.log(books[i].properties.id)
        }
        // console.log(books)
        // console.log(`Found ${books.length} book(s)`);
        // const lines = generateLines(books);
        // const url = await updateGist(
        //     `📚 Currently reading books (${lines.length}／${books.length})`,
        //     lines.join('\n')
        // );
        // console.log(`Updated: ${url}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();