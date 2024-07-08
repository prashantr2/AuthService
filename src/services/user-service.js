const UserRepository = require('../repositories/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');
const AppError = require('../utils/error-handlers');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async create(data) {
        try {
            const user = await this.userRepository.create({
                email: data.email,
                password: data.password,
            }); 
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in user-service");
            throw new AppError('ServerError', 
                'Something went wrong in user-service',
                'Logical Issue Found',
                500);
        }
    }
    
    async login(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                console.log("Passwords don't match");
                throw { error: "Incorrect password" }
            }
            
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return { token: newJWT }; 
        } catch (error) {
            console.log("Something went wrong in user-service login");
            throw error;
        }
    }
    
    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid Token' }
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: 'No user with the token exists' }
            }
            return user.id;
        } catch (error) {
            console.log(error);
            console.log("Something went wrong in user-service");
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
    
    isAdmin(userId) {
        try {
            
        } catch (error) {
            console.log("Something went wrong!");
        }
    }
}


module.exports = UserService;