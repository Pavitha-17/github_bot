import express from "express";
import crypto from "crypto";
import handleGitHubEvent from "../services/githubService.js";

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), (req, res) => {
    try {
        const signature = req.headers["x-hub-signature-256"];
        const eventType = req.headers["x-github-event"];
        const secret = process.env.GITHUB_WEBHOOK_SECRET;

        const computed = "sha256=" +
            crypto.createHmac("sha256", secret)
                  .update(req.body)
                  .digest("hex");

        // Allow PING without signature
        if (eventType !== "ping") {
            if (!signature) {
                console.log("❌ Missing signature");
                return res.status(400).send("Missing signature");
            }
            if (signature !== computed) {
                console.log("❌ Signature mismatch");
                return res.status(401).send("Invalid signature");
            }
        }

        const payload = JSON.parse(req.body.toString());
        console.log("🟢 GitHub Event:", eventType);

        handleGitHubEvent(eventType, payload);

        res.status(200).send("OK");

    } catch (err) {
        console.error("❌ Webhook error:", err);
        res.status(500).send("Webhook error");
    }
});


export default router;
