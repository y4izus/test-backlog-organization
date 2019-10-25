const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { json, urlencoded } = bodyParser

// Configure body-parser
app.use(json())
app.use(urlencoded({
    extended: false
}))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))