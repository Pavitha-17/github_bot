export const commitMessageFormat = (payload) => {
    const repo = payload.repository.full_name;
    const branch = payload.ref.replace("refs/heads/", "");
    const commits = payload.commits;

    let message = `🔔 *New Commit in ${repo}* (branch: *${branch}*)\n\n`;

    commits.forEach((c, index) => {
        message += `*Commit ${index + 1}:*\n`;
        message += `👤 Author: ${c.author.username}\n`;
        message += `📝 Message: ${c.message}\n`;
        message += `🔗 URL: ${c.url}\n\n`;
    });

    return message;
};

export const pullRequestFormat = (payload) => {
    return `
 *Pull Request #${payload.number} – ${payload.action}*

 Author: ${payload.sender.login}
 Title: ${payload.pull_request.title}
 URL: ${payload.pull_request.html_url}
 Description:
${payload.pull_request.body || "_No description_"}
    `;
};
