const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes');


const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234', 
    database: 'activities'
}

//middlewares
app.use(myconn(mysql, dbOptions, 'single'))

app.use(express.json())
//--------------




//routes
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api', routes)


//-------------------------------------

//server running
app.listen(app.get('port'), () => {
    console.log(`Server running in: http://localhost:${app.get('port')}`)
})

//---------------------------------------------------