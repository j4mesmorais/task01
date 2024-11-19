const db = require('../database/db').getConnection();

class TaskModel {
    static createTable() {
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        )`);
    }

    static getAll(callback) {
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            callback(err, rows);
        });
    }

    static create(task, callback) {
        const { title } = task;
        db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
            callback(err, this.lastID);
        });
    }

    static delete(id, callback) {
        db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
            callback(err);
        });
    }
}

module.exports = TaskModel;
