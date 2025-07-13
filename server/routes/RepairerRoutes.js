const express = require("express");
const Issue = require("../models/Issue");
const Repairer = require("../models/Repairer");
const router = express.Router();

// Middleware to check repairer authentication
const requireRepairerAuth = (req, res, next) => {
  if (req.session && req.session.userId && req.session.isRepairer) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Get issues matching repairer's expertise
router.get("/issues", requireRepairerAuth, async (req, res) => {
  try {
    const repairer = await Repairer.findById(req.session.userId);
    const expertise = repairer.expertise || [];
    const issues = await Issue.find({
      $or: [
        { deviceType: { $in: expertise } },
        { vehicleType: { $in: expertise } },
      ],
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .populate("user", "name"); // <-- populate user name

    res.json({ issues });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", requireRepairerAuth, async (req, res) => {
  try {
    const repairer = await Repairer.findById(req.session.userId);
    if (!repairer)
      return res.status(404).json({ message: "Repairer not found" });
    res.json({
      isRepairer: repairer.isRepairer, // <-- fetch from DB
      expertise: repairer.expertise,
      name: repairer.name,
      email: repairer.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/issues/:id/claim", requireRepairerAuth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    if (issue.status !== "pending")
      return res.status(400).json({ message: "Issue already claimed" });

    issue.status = "working";
    issue.repairer = req.session.userId;
    await issue.save();

    // Add the issue to the repairer's issues array if not already present
    await Repairer.findByIdAndUpdate(req.session.userId, {
      $addToSet: { issues: issue._id },
    });

    res.json({ message: "Issue claimed", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/claimed", requireRepairerAuth, async (req, res) => {
  try {
    const repairer = await Repairer.findById(req.session.userId).populate({
      path: "issues",
      populate: { path: "user", select: "name" },
    });
    res.json({ issues: repairer.issues || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
