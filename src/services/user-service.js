const UserRepository = require('../repositories/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');

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
            throw error;
        }
    }
    
    async login(email, plainPassword) {
        try {
            const user = await this.UserRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                console.log("Passwords don't match");
                throw { error: "Incorrect password" }
            }
            
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT; 
        } catch (error) {
            console.log("Something went wrong in user-service login");
            throw error;
        }
    }
    
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in user-service token-creation");
            throw error;
        }
    }
    
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in user-service token-verification");
            throw error;
        }
    }
    
    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in user-service password-verification");
            throw error;
        }
    }
}


module.exports = UserService;