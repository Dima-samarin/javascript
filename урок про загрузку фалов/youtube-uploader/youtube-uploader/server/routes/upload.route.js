const { Router } = require('express')
const fileMiddleware = require('../middleware/file')

const router = Router()

router.post('/upload', fileMiddleware.single('avatar') ,(req, res) => {
    try {
        if(req.file) {
            res.json(req.file)
        }
    } catch (error) {
        console.log(eror);
    }
})

module.exports = router