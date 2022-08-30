const express = require('express')
const app = express()
const fs = require('fs')
const port = 8000


app.use(express.json())




app.get('/pets', (req, res) => {
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.status(200)
        res.contentType('application/json')
        res.send(data)

    })
})


app.get('/pets/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        if (id >= parseData.length || id < 0) {
            res.status(404)
            res.contentType('text/plain')
            res.send('Not Found')
        } else {
            const stringData = JSON.stringify(parseData[id])
            res.status(200)
            res.contentType('application/json')
            res.send(stringData)
        }
    })
})






app.post("/pets", (req, res) => {
    const addData = req.body
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        parseData.push(addData)
        const stringData = JSON.stringify(parseData)
        fs.writeFile('./pets.json', stringData, (err) => {
            res.status(200)
            res.contentType('application/json')
            res.send(addData)
        })
    })

})










app.patch('/pets/:id', (req, res) => {
    const id = req.params.id
    const addData = req.body
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        const objData = parseData[id]
        objData.name = addData.name
        const stringData = JSON.stringify(parseData)
        console.log(stringData)

        fs.writeFile('./pets.json', stringData, (err) => {
            if (err) throw err
            res.status(200)
            res.contentType('application/json')
            res.send(objData)
        })

    })

})







app.delete('/pets/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./pets.json', (err, data) => {
        const parseData = JSON.parse(data)
        const atData = parseData[id]
        const newData = parseData.filter(c => c !== atData)
        const stringData = JSON.stringify(newData)

        fs.writeFile('./pets.json', stringData, (err) => {
            res.status(200)
            res.contentType('application/json')
            res.send(atData)
        })
    })

})






app.listen(port, () => {
    console.log('Listening on port 8000')
})




