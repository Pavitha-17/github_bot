import cliqService from "../services/cliqService.js";

export default function handleGitHubEvent(event, payload) {
    try {
        console.log("📩 Handling GitHub Event:", event);

        if (event === "push") {
            const message = `*New Push Event*

*Repository:* ${payload.repository.full_name}
*Pushed by:* ${payload.pusher.name}
*Message:* ${payload.head_commit.message}
*URL:* ${payload.head_commit.url}`;

            cliqService(message);
        }

        else if (event === "pull_request") {
            const message = `🔀 *Pull Request Event*

*Repository:* ${payload.repository.full_name}
*Action:* ${payload.action}
*Title:* ${payload.pull_request.title}
*By:* ${payload.pull_request.user.login}
*URL:* ${payload.pull_request.html_url}`;

            cliqService(message);
        }

        else if (event === "ping") {
            console.log("Ping event received");
            cliqService(" GitHub webhook connected successfully!");
        }

        else {
            cliqService(`ℹ GitHub event received: *${event}*`);
        }

    } catch (err) {
        console.error(" GitHub Event Handler Error:", err);
    }
}
