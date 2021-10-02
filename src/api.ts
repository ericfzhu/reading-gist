const dotenv = require("dotenv");
const { Octokit } = require("@octokit/rest");

dotenv.config();

const octokit = new Octokit({ auth: process.env.GH_TOKEN });

export async function updateGist(
    title: string,
    content: string
): Promise<string> {
    const gist_id = process.env.GIST_ID || '';
    const gist = await octokit.gists.get({ gist_id });
    const filename = Object.keys(gist.data.files)[0];
    await octokit.gists.update({
        gist_id,
        files: {
            [filename]: {
                filename: title,
                content,
            },
        },
    });
    return gist.url;
}