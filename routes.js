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













module.exports = routes;