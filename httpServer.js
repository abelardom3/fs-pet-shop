'use strict'
const http = require('http')
const port = process.env.PORT || 8000
const fs = require('fs')


const server = http.createServer((req, res) => {

    if (req.url === '/pets') {
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            const petsData = data;
            console.log(items)
            if (err) {
                console.log('error')
            } else {
                res.status = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(petsData)

            }
        })
    }





    const items = req.url.split('/')
    if (items.length > 2) {
        const index = items[items.length - 1]
        console.log(index)
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            const petsData = data;
            console.log(items)
            if (err) {
                console.log('error')
            } else {
                const obj = JSON.parse(petsData)
                const returnPet = obj[index]
                const returnJson = JSON.stringify(returnPet)





                res.end(returnJson)
            }



        })


    }
})
















server.listen(port, () => {
    console.log('Listening on port', port)
})
