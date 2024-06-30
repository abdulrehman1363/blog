const Joi = require('joi')
const User = require('../models/user')
const { userSchema, loginSchema } = require('../utils/authValidation');

class AuthController{
    async registerUser(req, res){
        const { error } = userSchema.validate(req.body)

        if(error) {
            return res.status(400).send({message: error.details[0].message});
        }

        const { firstName, lastName, email, password } = req.body

        try {
            const user = await User.findOne({email: email})
        
            if(user){
                return res.status(400).send({message: 'User already exists'})
            }

            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password
            })

            res.status(201).send(newUser);

        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async loginUser(req, res) {
        const { error } = loginSchema.validate(req.body)

        if (error) {
            res.status(400).send({message: error.details[0].message});
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({email})

            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await user.comparePassword(password);
            
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = await user.generateAuthToken()

            res.status(200).json({ token });


        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


}

module.exports = new AuthController();