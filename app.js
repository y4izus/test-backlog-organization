const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
const { json, urlencoded } = bodyParser
require('dotenv').config()

// Configure body-parser
app.use(json())
app.use(urlencoded({
    extended: false
}))

function simpleStringify(object) {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof (object[prop]) == 'object') {
            continue;
        }
        if (typeof (object[prop]) == 'function') {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
}

app.post('/issue-receive', (req, res) => {
    const { action, label } = req.body

    action == 'labeled'
        ? res.send(`LABELED TO: ${label.name}`)
        : res.send(`ACTION: ${action}`)
})

app.post('/test', async (req, res) => {
    const { GITHUB_TOKEN, LOGIN } = process.env
    const gitHubEndpoint = 'https://api.github.com/graphql'
    const oauth = { Authorization: `bearer ${GITHUB_TOKEN}` }
    const query = `query {
        repositoryOwner(login: "${LOGIN}", name: "test-backlog-organization") { 
            issues(last:20) {
                edges {
                    node {
                        title
                        url
                        labels(first:5) {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }`

    const issues = await axios.post(gitHubEndpoint, { query }, { headers: oauth })

    res.send(`${simpleStringify(issues)}`)
})

app.get('/', (req, res) => {
    res.send('HOME')
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))