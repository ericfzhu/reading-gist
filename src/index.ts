import { generateBarChart } from './bar';
import { updateGist } from './api';

const { Client } = require("@notionhq/client");
const dotenv = require('dotenv');

dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASEID;

const MAX_LEN = 54;
const MAX_LINES = 5;

async function getBooks(): Promise<Book[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Status',
          select: {
            equals: 'Reading',
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
  return response.results.map((page: any) => {
    return {
      title: page.properties.Name.title[0].text.content,
      percent: page.properties.Progress.number,
    };
  });
}

function generateLines(books: Book[]) {
  const barWidth = Math.floor(MAX_LEN / 4);
  return books
    .slice(0, MAX_LINES)
    .map(({ title, percent }: { title: string; percent: number }) => {
      const bar = generateBarChart(percent, barWidth);
      const percentage = `${percent}%`.padStart(4, ' ');
      const length = MAX_LEN - bar.length - percentage.length - 1;
      let text;
      if (title.length > length) {
        text = title.substring(0, length - 3).concat('...');
      } else {
        text = title.padEnd(length, ' ');
      }
      return `${text} ${bar}${percentage}`;
    });
}

(async () => {
  try {
    const books: any = await getBooks();
    console.log(`Found ${books.length} book(s)`);
    const lines = generateLines(books);
    const url = await updateGist(
      `📚 Currently reading books (${lines.length}／${books.length})`,
      lines.join('\n'),
    );

    console.log(`Updated: ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
