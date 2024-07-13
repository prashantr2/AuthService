const UserService = require('../services/user-service');

const userService = new UserService();

const signup = async(req, res) => {
    try {
        const user = await userService.create(req.body); 
        return res.status(201).json({
            success: true,
            msg: "Successfully created a user",
            data: user,
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            error: error.msg,
            data: {},
            success: false,
            explanation: error.explanation
        })
    }
}

const login = async(req, res) => {
    try {
        const response = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            msg: "Successfully logged in",
            data: response
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            msg: error.msg,
            error: error.explanation
        })
    }
}

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            msg: "User is authenticated and token is valid"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            msg: "Something went wrong",
            error: error
        })
    }
}

const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            msg: "Successfully fetched whether user is admin or not"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            msg: "Something went wrong",
            error: error
        })
    }
}

module.exports = {
    signup,
    login,
    isAuthenticated,
    isAdmin,
}