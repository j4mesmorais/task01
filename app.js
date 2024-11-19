const express = require('express');
const bodyParser = require('body-parser');
const TaskController = require('./controllers/taskController');
const TaskModel = require('./models/taskModel');

const app = express();
app.use(bodyParser.json());

// Criar tabela no banco
TaskModel.createTable();

// Rotas
app.get('/tasks', TaskController.listTasks);
app.post('/tasks', TaskController.createTask);
app.delete('/tasks/:id', TaskController.deleteTask);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
