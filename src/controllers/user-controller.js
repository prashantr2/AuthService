const UserService = require('../services/user-service');

const userService = new UserService();

const signup = async(req, res) => {
    try {
        const user = await userService.create(req.body); 
        return res.status(201).json({
            sucess: true,
            msg: "Successfully created a user",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucess: false,
            msg: "Something went wrong",
        })
    }
}

const login = async(req, res) => {
    try {
        const response = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({
            sucess: true,
            msg: "Successfully logged in",
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucess: false,
            msg: "Something went wrong",
            error: error
        })
    }
}

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            sucess: true,
            error: {},
            data: response,
            msg: "User is authenticated and token is valid"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucess: false,
            msg: "Something went wrong",
            error: error
        })
    }
}

module.exports = {
    signup,
    login,
    isAuthenticated,
}