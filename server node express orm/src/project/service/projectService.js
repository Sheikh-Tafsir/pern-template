const ProjectModel = require("../model/projectModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.PASSWORD_ENCRYPT_SECRET_KEY;
const bcrypt = require('bcrypt');

//view
const viewProject = async (name, userName) => {
    try {
        const project = await ProjectModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (!project) {
            return { message: "Project not found" };
        }

        return {
            message: "Project found",
            project: project,
        };

    } catch (error) {
        console.error("Error during view:", error.message);
        return {
            message: error.message,
        };
    }
};

//create
const createProject = async (name, userName) => {
    try {
        const project = await ProjectModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (project) {
            return { message: "Project name already taken" }
           // throw new Error("User does not exist");
        }
        
        const newProject = await ProjectModel.create({
            name: name,
            userName: userName,
            type: 'folder',
        });

        return {
            message: "project created",
            project: newProject,
        };

    } catch (error) {
        console.error("Error during login:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

const updateProject = async (name, userName, folderStructure) => {
    try {
        const project = await ProjectModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (!project) {
            return { message: "Project not found" };
        }
        
        project.name = name;
        project.folderStructure = folderStructure;
        await project.save();

        return {
            message: "Project updated",
            project: project,
        };

    } catch (error) {
        console.error("Error during update:", error.message);
        return {
            message: error.message,
        };
    }
};

const deleteProject = async (name, userName) => {
    try {
        const project = await ProjectModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (!project) {
            return { message: "Project not found" };
        }
        
        await project.destroy();

        return { message: "Project deleted" };

    } catch (error) {
        console.error("Error during delete:", error.message);
        return {
            message: error.message,
        };
    }
};



module.exports = {
    viewProject,
    createProject,
    updateProject,
    deleteProject,
};
