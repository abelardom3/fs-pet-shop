'use strict'
const http = require('http')
const port = process.env.PORT || 8000
const fs = require('fs')


const server = http.createServer((req, res) => {

    if (req.url === '/pets') {
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            const petsData = data;

            if (err) {
                console.log('error')
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(petsData)

            }
        })
    }



    const items = req.url.split('/')
    const index = items[items.length - 1]
    if (items.length > 2 && req.url === `/pets/${index}`) {

        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            const objPets = JSON.parse(data)


            if (err) {
                console.log('error')
            } else if (index < 0 || index >= objPets.length) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/plain')
                res.end('Not Found ')
            }

            else {
                const returnPet = objPets[index]
                const returnJson = JSON.stringify(returnPet)

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(returnJson)
            }
        })


    }
})


server.listen(port, () => {
    console.log('Listening on port', port)
})
