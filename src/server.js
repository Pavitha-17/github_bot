import express from "express";
import dotenv from "dotenv";
import githubRoutes from "./routes/github.js";

dotenv.config();
const app = express();

// Parse JSON only for other routes, NOT for /webhook
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next(); 
    } else {
        express.json()(req, res, next);
    }
});


// GitHub webhook handler
app.use("/webhook", githubRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
