export default async function sendToCliq(text) {
    try {
        console.log("➡ Sending message to Cliq...");

        const res = await fetch(process.env.CLIQ_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        if (!res.ok) {
            console.log("❌ Error sending to Cliq:", await res.text());
        } else {
            console.log("✅ Message sent to Cliq");
        }
    } catch (err) {
        console.error("❌ Failed to send message:", err);
    }
}
