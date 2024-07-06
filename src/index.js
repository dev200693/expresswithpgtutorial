const express = require('express');
const { Client } = require('pg');
const inputValidation = require('./middlewares/inputValidation');

const taskRouter = express.Router();

const app = express();

app.use(express.json());

app.use('/task', taskRouter);

app.get('/', (req, res) => {
    res.send('HELLO THERE')
});

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

//create a task
taskRouter.post('/', inputValidation.validateCreateTaskReq, async (req, res) => {

    const { description } = req.body;

    const query = `insert into todos.task 
    (description , completed) values ('${description}' , false)`
    try {
        await client.query(query);

        return res.status(201).send({ isSuccess: true, message: 'Task creation successful' })
    }
    catch (err) {
        console.log('err', err);
        return res.status(500).send({ isSuccess: 'false', message: 'Task creation failed' });
    }
});

//get all tasks
//Assigment --> implement pagination
taskRouter.get('/', async (req, res) => {


    const query = `select * from todos.task limit 10`
    try {
        const response = await client.query(query);
        const { rows } = response;
        return res.status(200).send({ isSuccess: true, message: 'Tasks fecthing successful', data: rows })
    }
    catch (err) {
        console.log('err', err);
        return res.status(500).send({ isSuccess: 'false', message: 'Tasks fecthing failed' });
    }
});


//EDIT task

taskRouter.patch('/:id', async (req, res) => {

    const taskId = req.params.id;
    const description = req.body.description;
    const query = `update todos.task set description='${description}' where id = ${taskId}`
    try {
        const response = await client.query(query);
        const { rows } = response;
        return res.status(202).send({ isSuccess: true, message: 'Task updation successful', data: rows })
    }
    catch (err) {
        console.log('err', err);
        return res.status(500).send({ isSuccess: 'false', message: 'Task updation failed' });
    }
});


//creating a connection pool


app.listen(3001, () => {

    console.log('server started');
});




var obj = { "name": "Devarshi Roy", "age": 30 };


JSON.stringify(obj);