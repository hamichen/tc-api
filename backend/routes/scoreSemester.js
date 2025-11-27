// routes/sync.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
// step 1
const { score } = require("../services/scoreSemester");

router.get("/", async (req, res) => {
  try {
    
    // sterp 2
    const data = await score();

    
    if (!data ) {
      return res.status(400).json({
        success: false,
        message: "校務 API 回傳格式錯誤"
      });
    }


    console.log("[SYNC] school.json updated.");

    res.json({
      success: true,
      data: data  // step3 
    });
  } catch (err) {
    console.error("[SYNC ERROR]", err);
    res.status(500).json({
      success: false,
      message: "同步失敗",
      error: err.message
    });
  }
});

module.exports = router;
