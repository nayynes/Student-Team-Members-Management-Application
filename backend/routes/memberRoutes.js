const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const multer = require("multer");

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ==========================
// POST - Add Member
// ==========================
router.post("/members", upload.single("image"), async (req, res) => {
  try {
    const newMember = new Member({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      image: req.file ? req.file.filename : ""
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// GET - All Members
// ==========================
router.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// GET - Single Member
// ==========================
router.get("/members/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;