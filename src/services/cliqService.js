import axios from "axios";

const sendCliqMessage = async (text) => {
    try {
        await axios.post(
            process.env.CLIQ_WEBHOOK_URL,
            { text },
            {
                headers: {
                    Authorization: `Zoho-oauthtoken ${process.env.CLIQ_BOT_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (err) {
        console.error("Error sending message to Cliq:", err.response?.data || err);
    }
};

export default sendCliqMessage;
