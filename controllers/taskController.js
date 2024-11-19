const TaskModel = require('../models/taskModel');

class TaskController {
    static async listTasks(req, res) {
        TaskModel.getAll((err, tasks) => {
            if (err) {
                res.status(500).send("Erro ao buscar tarefas.");
            } else {
                res.json(tasks);
            }
        });
    }

    static async createTask(req, res) {
        const task = req.body;
        TaskModel.create(task, (err, taskId) => {
            if (err) {
                res.status(500).send("Erro ao criar tarefa.");
            } else {
                res.json({ id: taskId, ...task });
            }
        });
    }

    static async deleteTask(req, res) {
        const { id } = req.params;
        TaskModel.delete(id, (err) => {
            if (err) {
                res.status(500).send("Erro ao deletar tarefa.");
            } else {
                res.status(204).send();
            }
        });
    }
}

module.exports = TaskController;
