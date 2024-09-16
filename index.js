// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");
const adminRouter = require("./Routes/admin"); 
const app = express();
const port = 5000;

// Enable CORS for requests coming from localhost:3000
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parser middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// Set security headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// Test route
app.get("/", (req, res) => {
    res.send("Hello, this is my backend");
});

// Main routes
app.use("/api/application", router);
app.use("/api/admin", adminRouter); // Mount the admin router
// Connect to the database
connect();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = router;