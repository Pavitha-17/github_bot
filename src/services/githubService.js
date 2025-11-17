import sendCliqMessage from "./cliqService.js";
import { commitMessageFormat, pullRequestFormat } from "../utils/formatMessage.js";

const handleGitHubEvent = async (eventType, payload) => {

    // ---- Commit Push Event ----
    if (eventType === "push") {
        const branch = payload.ref.replace("refs/heads/", "");

        // Only notify specific branch team
        const allowedBranches = ["main", "dev", "feature"];

        if (!allowedBranches.includes(branch)) return;

        const formatted = commitMessageFormat(payload);
        await sendCliqMessage(formatted);
    }

    // ---- Pull Request Event ----
    if (eventType === "pull_request") {
        const formatted = pullRequestFormat(payload);
        await sendCliqMessage(formatted);
    }

    // ---- More GitHub events you can add later ----
};

export default handleGitHubEvent;
