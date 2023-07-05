const express = require('express')
const routes = express.Router();


routes.get('/', (req, res) => {
    req.getConnection((err, conn) =>{
        if (err){
            return res.send(err);
        }else{
            conn.query('SELECT * FROM activity', (err, rows) => {
                if (err) {
                    return res.send(err);
                }else{
                    res.json(rows);
                }
            })
        }
    })
})

//insert a to-do
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        } else {
            conn.query('INSERT INTO activity set ?', [req.body], (err, rows) => {
                if (err) {
                    return res.send(err)
                } else {
                    res.status(200).json({ message: 'Successful request', data: [req.body] });
                    console.log('----------------')
                    console.log('|to-do inserted|')
                    console.log('----------------')
                    // return res.send('to-do inserted')
                }
            })
        }
    })

})











module.exports = routes;