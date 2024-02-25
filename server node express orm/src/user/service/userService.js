const UserModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.PASSWORD_ENCRYPT_SECRET_KEY;
const bcrypt = require('bcrypt');

//login
const login = async (name, password) => {
    try {
        const user = await UserModel.findOne({
            where: {
                name: name
            }
        });
        
        if (!user) {
            return { message: "User does not exist" }
           // throw new Error("User does not exist");
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return { message: "Password is incorrect" }
            //throw new Error("Password is incorrect")
        }

        const token = jwt.sign({ name: name }, SECRET_KEY);

        return {
            message: "Login successful",
            user: user,
            token: token
        };
    } catch (error) {
        console.error("Error during login:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//signup
const signup = async (name, email, password) => {
    try {
        const existingUserByName = await UserModel.findOne({ where: { name: name } });
        if (existingUserByName) {
            return { message: "Name already taken" };
        }

        // Check if the email is already taken
        const existingUserByEmail = await UserModel.findOne({ where: { email: email } });
        if (existingUserByEmail) {
            return { message: "Email already taken" };
        }

        const hashedPassword = hashPassword(password);

        // Create the user
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword // Store the hashed password
        });

        const token = jwt.sign({ name: name }, SECRET_KEY);

        return {
            message: "Signup successful",
            user: user,
            token: token
        };
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//update
const updateProfile = async (id, name, email, image, phoneNo, postalCode, address, addressLatitude, addressLongitude) => {
    try {
        // Check if the provided name already exists for another user
        const existingUserWithName = await UserModel.findOne({ where: { name: name, id: { [Op.ne]: id } } });
        if (existingUserWithName) {
            return res.status(409).json({ error: "User with this name already exists" });
        }

        // Check if the provided email already exists for another user
        const existingUserWithEmail = await UserModel.findOne({ where: { email: email, id: { [Op.ne]: id } } });
        if (existingUserWithEmail) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        // Update the user profile
        const updatedUser = await UserModel.update(
            {
              name: name,
              email: email,
              image: image,
              phoneNo: phoneNo,
              postalCode: postalCode,
              address: address,
              addressLongitude: addressLongitude,
              addressLatitude: addressLatitude,
            },
            { where: { id: id }, returning: true }
        );
      
        if (updatedUser[0] === 0) {
            return { message: "User not found" };
        }

        return {
            message: "Profile updated successfully",
            user: updatedUser[1][0]
        }
          
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//Function to hash the password (you need to implement this based on your chosen library)
const hashPassword = async (password) => {
    return password
    // try {
    //   const salt = await bcrypt.genSalt(saltRounds);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   return hashedPassword;
    // } catch (error) {
    //   throw error;
    // }
};

const comparePassword = async (typedPassword, userPassword) => {
    //return await bcrypt.compare(typedPassword, userPassword);
    return typedPassword == userPassword;
};

module.exports = {
    login,  
    signup,
    updateProfile

};
