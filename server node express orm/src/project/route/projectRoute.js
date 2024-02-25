const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");


// view project
router.post("/view", projectController.viewProject);

// create project
router.post("/create", projectController.createProject);

// update project
router.post("/update", projectController.updateProject);

// delete project
router.post("/delete", projectController.deleteProject);

module.exports = router;