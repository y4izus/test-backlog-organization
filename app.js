const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { json, urlencoded } = bodyParser

// Configure body-parser
app.use(json())
app.use(urlencoded({
    extended: false
}))

app.post('/issue-receive', (req, res) => {
    const { body } = req
    console.log('=====', body)
    res.send(body)
})

app.get('/', (req, res) => {
    res.send('HOME')
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))