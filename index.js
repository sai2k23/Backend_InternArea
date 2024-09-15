const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");
const port = 5000;

app.use(cors({
    origin: "http://localhost:3000", // Allow requests from localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true, // Allow credentials (like cookies)
}));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello, this is my backend");
});

app.use("/api/application", router);
connect();

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
