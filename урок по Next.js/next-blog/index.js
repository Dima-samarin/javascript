const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

 
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(express.json({extended: true}))
app.use('/api/post', require('./routes/post.routes'))

async function start() {
    try {
       await mongoose.connect('mongodb+srv://Roman:4862599lol@cluster0.whr1s.mongodb.net/blog?retryWrites=true&w=majority', {
           useNewUrlParser: true, 
           useUnifiedTopology: true,
           useCreateIndex: true
        })
        mongoose.set('useFindAndModify', true)
       app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    })
    } catch (e) {
        console.log(e)
    }
}
start()