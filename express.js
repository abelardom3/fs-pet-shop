const express = require('express')
const app = express()
const fs = require('fs')


const port = 8000


app.get('/pets', (req, res) => {
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        res.status(200)
        res.contentType('application/json')
        res.send(data)
    })

})

app.get('/pets/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        const parseData = JSON.parse(data)

        if (id >= parseData.length || id < 0) {
            res.status(404)
            res.contentType('text/plain')
            res.send('Not Found')
        } else {
            const jsonData = JSON.stringify(parseData[id])
            res.status(200)
            res.contentType('application/json')
            res.send(jsonData)
        }
    })

})


app.post('/pets', (req, res) => {

    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        const parseData = JSON.parse(data)
        const name = req.query.name
        const age = parseInt(req.query.age)
        const kind = req.query.kind

        const newPet = { age, kind, name }
        parseData.push(newPet)
        const strData = JSON.stringify(parseData)


        if (age && kind && age) {
            fs.writeFile('./pets.json', strData, (err) => {
                res.status(200)
                res.contentType('application/json')
                res.send(strData)
            })

        } else {
            res.send('List all arguments')
        }

    })



})






app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})

