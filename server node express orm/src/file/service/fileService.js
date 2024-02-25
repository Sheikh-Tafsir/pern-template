const FileModel = require("../model/fileModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.PASSWORD_ENCRYPT_SECRET_KEY;
const bcrypt = require('bcrypt');

//view
const viewFile = async (name, userName) => {
    try {
        const file = await FileModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (!file) {
            return { message: "File not found" };
        }

        return {
            message: "File found",
            file: file,
        };

    } catch (error) {
        console.error("Error during view:", error.message);
        return {
            message: error.message,
        };
    }
};

//create
const createFile = async (name, userName) => {
    try {
        const file = await FileModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (file) {
            return { message: "Project name already taken" }
           // throw new Error("User does not exist");
        }
        
        const newProject = await FileModel.create({
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

const updateFile = async (name, userName, folderStructure) => {
    try {
        const file = await FileModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (!file) {
            return { message: "Project not found" };
        }
        
        file.name = name;
        file.folderStructure = folderStructure;
        await file.save();

        return {
            message: "File updated",
            file: file,
        };

    } catch (error) {
        console.error("Error during update:", error.message);
        return {
            message: error.message,
        };
    }
};

const deleteFile = async (name, userName) => {
    try {
        const file = await FileModel.findOne({
            where: {
                name: name,
                userName: userName
            }
        });
        
        if (!file) {
            return { message: "File not found" };
        }
        
        await file.destroy();

        return { message: "File deleted" };

    } catch (error) {
        console.error("Error during delete:", error.message);
        return {
            message: error.message,
        };
    }
};



module.exports = {
    viewFile,
    createFile,
    updateFile,
    deleteFile,
};
