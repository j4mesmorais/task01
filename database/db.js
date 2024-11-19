const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor() {
        if (!Database.instance) {
            this.db = new sqlite3.Database('./task_manager.db', (err) => {
                if (err) {
                    console.error("Erro ao conectar ao SQLite:", err.message);
                } else {
                    console.log("Conectado ao SQLite com sucesso.");
                }
            });
            Database.instance = this;
        }
        return Database.instance;
    }

    getConnection() {
        return this.db;
    }
}

module.exports = new Database();
