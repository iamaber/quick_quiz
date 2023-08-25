const authMiddleware = require("../middlewares/authMiddleware");
const Exam = require("../models/examModel");
const User = require("../models/userModel");
const report = require("../models/reportModel");
const router = require("express").Router();

router.post("/add-report", authMiddleware, async(req,res) => {
    try {
       const newReport  =new Report(req,body);
       await newReport.save();
       res.send({
        message :"Attempt added successfully",
        success : true,

       });
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success : false,
        });
        
    }
});
//get all reports
router.post("/get-all-reports-by-user", authMiddleware, async(req,res) => {
    try {

        const { examName, userName} = req.body;
        const exams = await Exam.find({ name : {
            $regex : examName,
        },
    });
    const matchedExamIds =exam.map((exam) =>exam_id);
    const users = await User.find({ name : {
            $regex : userName,
        },
    });
    const matchedUserIds =users.map((user) =>user_id);
    const reports = await Report.find({
        exam: {
        $in: matchedExamIds,
        },
        user:{
            $in: matchedUserIds, 
        },
        .populate("exam")
        .populate("user")
        .sort({creatAt: -1});

    })
       
       res.send({
        message :"Attempt fetched successfully",
        data : reports,
        success : true,

       });
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success : false,
        });
        
    }
});


//get all reports by user


router.post("/get-all-reports-by-user", authMiddleware, async(req,res) => {
    try {
       const newReport  =new Report(req,body);
       await newReport.save();
       res.send({
        message :"Attempt added successfully",
        success : true,

       });
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success : false,
        });
        
    }
});

module.exports = router;

