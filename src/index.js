const express = require('express');
const { Client } = require('pg');

const app = express();

app.get('/', (req, res) => {
    res.send('HELLO THERE')
});

//creating a connection pool
const client =
    new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgre',
        port: '5432'
    }) // How long a client is allowed to remain idle before being closed }); 

//checking PG connection
client.connect().then(() => { console.log('Connected to PostgreSQL database!'); })
    .catch((err) => { console.error('Error connecting to the database:', err); });

app.listen(3001, () => {

    console.log('server started');
});

