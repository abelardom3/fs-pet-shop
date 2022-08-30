const express = require('express');
const app = express();
const port = 8000;
const { Pool } = require('pg')

const pool = new Pool({
    user: 'abela',
    password: '812315',
    host: 'localhost',
    port: 5432,
    database: 'petshop'
});


app.use(express.json())







app.get('/pets', async (req, res) => {

    try {
        let result = await pool.query('SELECT * FROM pets')
        res.send(result.rows)

    } catch (error) {
        console.error(error);
    }


})


app.get('/pets/:id', async (req, res) => {
    const { id } = req.params

    try {
        let { rows } = await pool.query('SELECT * FROM pets WHERE id = $1', [id])
        res.send(rows)
    } catch (error) {
        res.send(error.message)
    }


})



app.post('/pets', async (req, res) => {
    const { name, age, kind } = req.body

    try {
        let { rows } = await pool.query('INSERT INTO pets(name,age,kind) VALUES($1,$2,$3);', [name, age, kind])
        res.send(req.body)

    } catch (error) {
        res.send(error.message)
    }

})






app.delete('/pets/:id', async (req, res) => {
    const { id } = req.params
    try {
        let deleted = await pool.query('SELECT * FROM pets WHERE id = $1;', [id])
        let { rows } = await pool.query('DELETE FROM pets WHERE id = $1;', [id])
        res.send(rows)


    } catch (error) {
        res.send(error.message)
    }


})







app.patch('/pets/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, kind } = req.body;

    try {
        let { rows } = await pool.query('UPDATE pets SET name = $1, age = $2, kind = $3 WHERE id = $4;', [name, age, kind, id])
        res.send(rows)

    } catch (error) {
        req.send(error.message)
    }


})

























app.listen(port, () => {
    console.log('Listening on port 8000')
})





