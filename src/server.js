import express from "express";
import dotenv from "dotenv";
import githubRoutes from "./routes/github.js";

dotenv.config();
const app = express();


app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        express.raw({ type: "application/json" })(req, res, next);
    } else {
        express.json()(req, res, next);
    }
});

app.use("/webhook", githubRoutes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
