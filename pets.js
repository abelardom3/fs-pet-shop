var fs = require("fs")


if (!process.argv[2]) {
    console.log('Usage: node pets.js [read | create | update | destroy]')
}

const command = process.argv[2]
const index = process.argv[3]


if (command === 'read' && !index) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        if (error) {
            console.log('error')
        } else {
            const petsData = JSON.parse(data)
            console.log(petsData)
        }
    })


}
else if (command === 'read' && index) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        const petsData = JSON.parse(data)
        if (error) {
            console.log('error')
        }

        else if (index < 0 || index > petsData.length) {
            console.log('Index is out of range')
        }
        else {
            console.log(petsData[index])
        }
    })
}



if (command === 'create' && !index) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        if (error) {
            console.log('error')
        }
        console.log('Usage: node pets.js create AGE KIND NAME')
    })

}



if (command === 'create' && index) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        let petsData = JSON.parse(data)
        if (error) {
            console.log('error')
        }

        const age = parseInt(process.argv[3])
        const kind = process.argv[4];
        const name = process.argv[5];
        var newPet = { age, kind, name }

        petsData.push(newPet)

        const petJson = JSON.stringify(petsData)

        if (age && kind && name) {
            fs.writeFile('pets.json', petJson, function (error) {
                console.log(newPet)
            })

        } else {
            console.log('need all 3 arguments')
            console.log('Usage: node pets.js create AGE KIND NAME')
        }

        // console.log(newPet)
        // console.log('Usage: node pets.js create AGE KIND NAME')

    })

}



if (command === 'update' && !index) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        if (error) {
            console.log('error')
        } else {
            console.log("Usage: node pets.js update INDEX AGE KIND NAME")
        }
    })
}


if (command === 'update' && index) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        const petsData = JSON.parse(data)
        if (error) {
            console.log('error')
        }

        console.log(petsData[index])













    })

}









































