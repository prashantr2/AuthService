const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req, res) => {
    try {
        console.log(req.body);
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

module.exports = {
    create,
}