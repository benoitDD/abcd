const express = require('express')
const path = require('path')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

.use('/public', express.static(path.join(__dirname, '../public')))

.listen(9090, () => console.log('Ready to listen on port 9090'))

