const {Router} =  require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')

router.post(
    '/registration', 
    [
        check('email', 'Некорректный логин').isEmail(),
        check('password', 'Пароль не корректный').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const { email, password } = req.body

        const isUsed = await User.findOne({email})

        if (isUsed) {
            return res.status(300).json({message: 'Данный email уже используется'})
        } 

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({email, password:hashedPassword })
        
        await user.save()
        res.status(201).json({message: 'Пользователь создан'})
    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
    }
})

router.post(
    '/login', 
    [
        check('email', 'Введите корректый email').isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
    
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            
            const {email, password} = req.body
            const user = await User.findOne({email})

            if(!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const jwtSecret = config.get('jwtSecret')
            
            const token = jwt.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
        } catch (error) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }   
})


module.exports = router