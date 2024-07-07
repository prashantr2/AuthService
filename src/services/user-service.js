const UserRepository = require('../repositories/user-repository');

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }
    
    async create(data) {
        try {
            const user = await this.UserRepository.create({
                email: data.email,
                password: data.password,
            }); 
            return user;
        } catch (error) {
            console.log("Something went wrong in user-service");
            throw {error};
        }
    }
}


module.exports = UserService;