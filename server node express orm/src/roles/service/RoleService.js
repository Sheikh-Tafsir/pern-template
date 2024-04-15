const RoleModel = require("../model/RoleModel");
const PermissionModel = require("../model/PermissionModel");
const RolePermissionModel = require("../model/RolePermissionModel");

//signup
const createRole = async (name) => {
    try {
        // Check if the email is already taken
        const existingUserByName = await RoleModel.findOne({ where: { name: name } });
        if (existingUserByName) {
            return { message: "Name already taken" };
        }

        // Create the user
        const roleModel = await RoleModel.create({
            name:name,
        });

        return {
            message: "Role Creation successful",
            role: roleModel,
        };
    } catch (error) {
        console.error("Error creating role:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//create permission
const createPermission = async (name) => {
    try {
        // Check if the email is already taken
        const existingUserByName = await PermissionModel.findOne({ where: { name: name } });
        if (existingUserByName) {
            return { message: "Name already taken" };
        }

        // Create the user
        const roleModel = await PermissionModel.create({
            name:name,
        });

        return {
            message: "Permission creation successful",
            role: roleModel,
        };
    } catch (error) {
        console.error("Error creating permission:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//assign permission
const assignPermission = async (roleId, permissionId) => {
    try {
        // Check if the email is already taken
        const existingAssignment = await RolePermissionModel.findOne({ 
            where: { 
                roleId: roleId,
                permissionId: permissionId
            } 
        });
        if (existingAssignment) {
            return { message: "Permission already assigned to this role" };
        }
        console.log("hi");
        // Create the user
        const rolePermissionModel = await RolePermissionModel.create({
            roleId: roleId,
            permissionId: permissionId
        });
        console.log("hi2");

        return {
            message: "Permission assigned",
            role: rolePermissionModel,
        };
    } catch (error) {
        console.error("Error granting permission:", error);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

const getAllRoles = async () => {
    try{
        const roleModel = await RoleModel.findAll();

        //console.log(roles);
        return {
            message: "found all role",
            roles: roleModel,
        };
    } catch (error) {
        console.error("Error getting all roles:", error.message);
        return {
            message: error.message,
        };
    }
}

const getAllPermissions = async () => {
    try{
        const permissionModel = await PermissionModel.findAll();

        //console.log(roles);
        return {
            message: "found all permissions",
            permissions: permissionModel,
        };
    } catch (error) {
        console.error("Error getting all permissions:", error.message);
        return {
            message: error.message,
        };
    }
}

module.exports = { 
    createRole,
    createPermission,
    assignPermission,
    getAllRoles,
    getAllPermissions,
}