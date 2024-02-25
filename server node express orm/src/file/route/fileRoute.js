const express = require("express");
const router = express.Router();
const fileController = require("../controller/fileController");


// view project
router.post("/view", fileController.viewFile);

// create project
router.post("/create", fileController.createFile);

// update project
router.post("/update", fileController.updateFile);

// delete project
router.post("/delete", fileController.deleteFile);

module.exports = router;