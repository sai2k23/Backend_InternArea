// Routes/Application.js
const express = require("express");
const router = express.Router();
const Application = require("../Model/Application");

// Create new application (POST)
router.post("/", async (req, res) => {
    const { coverLetter, user, company, category, body, applicationId } = req.body;

    const newApplication = new Application({
        coverLetter,
        user,
        company,
        category,
        body,
        applicationId
    });

    try {
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error("Error saving application:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all applications (GET)
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get application by ID (GET /:id)
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json(application);
    } catch (error) {
        console.error("Error fetching application:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update application status (PUT /updateStatus/:id)
router.put('/api/application/updateStatus/:id', async (req, res) => {
    console.log("Application ID:", req.params.id); // Debugging ID
    console.log("Status:", req.body.status);

    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (status !== "accepted" && status !== "rejected") {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        // Find application and update status
        const application = await Application.findByIdAndUpdate(id, { status });
        if (!application) {
            return res.status(404).json({ error: "Application not found." });
        }

        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
