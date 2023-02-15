const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware для того, что бы express понимал, что при PUT и POST запросах
// данные будут прииходить в формате json
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Roman:4862599lol@cluster0.whr1s.mongodb.net/todo?retryWrites=true&' +
        'w=majority', {
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
