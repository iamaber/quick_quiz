const authMiddleware = require("../middlewares/authMiddleware");
const Exam = require("../models/examModel");
const User = require("../models/userModel");
const Report = require("../models/reportsModel"); // Corrected the import
const router = require("express").Router();

// Add report
router.post("/add-report", authMiddleware, async (req, res) => {
  try {
    const newReport = new Report(req.body); // Changed req,body to req.body
    await newReport.save();
    res.send({
      message: "Attempt added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// Get all reports
router.post("/get-all-reports", authMiddleware, async (req, res) => {
  try {
    const { examName, userName } = req.body;

    // Fetch matching exams
    const exams = await Exam.find({
      name: {
        $regex: examName,
      },
    });
    const matchedExamIds = exams.map((exam) => exam._id); // Changed exam_id to _id

    // Fetch matching users
    const users = await User.find({
      name: {
        $regex: userName,
      },
    });
    const matchedUserIds = users.map((user) => user._id); // Changed user_id to _id

    // Fetch reports
    const reports = await Report.find({
      exam: {
        $in: matchedExamIds,
      },
      user: {
        $in: matchedUserIds,
      },
    })
      .populate("exam")
      .populate("user")
      .sort({ createdAt: -1 }); // Corrected spelling to createdAt

    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// Get all reports by user
router.post("/get-all-reports-by-user", authMiddleware, async (req, res) => {
  try {
    const { userName } = req.body; // Added missing declaration
    // Fetch matching users
    const users = await User.find({
      name: {
        $regex: userName,
      },
    });
    const matchedUserIds = users.map((user) => user._id); // Changed user_id to _id

    // Fetch reports
    const reports = await Report.find({
      user: {
        $in: matchedUserIds,
      },
    })
      .populate("exam")
      .populate("user")
      .sort({ createdAt: -1 }); // Corrected spelling to createdAt

    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router;
