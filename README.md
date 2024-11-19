# **Task Manager**

Um gerenciador de tarefas simples, utilizando **Node.js**, **Express**, **SQLite** e os padrões **Singleton** e **MVC**. Este projeto foi desenvolvido como um exemplo prático de organização e uso de padrões de design.

---

## 🚀 **Como Usar**

1. Clone o repositório:  
   ```bash
   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager

2. Instale as dependências:
   ```bash
   npm install

3. Inicie o servidor:
   ```bash
   node app.js

4. Teste as rotas:

- Listar Tarefas (GET):

	```http
	http://localhost:3000/tasks

- Criar Tarefa (POST):

	Enviar JSON para http://localhost:3000/tasks:  

	```json
	{
	"title": "Minha tarefa"
	}
- Deletar Tarefa (DELETE):
	```http
	http://localhost:3000/tasks/:id
	
## ⚙️ **Estrutura do Projeto** 

```bash
task-manager/
├── controllers/       # Controladores (lógica de aplicação)
│   └── taskController.js
├── models/            # Modelos (interação com o banco de dados)
│   └── taskModel.js
├── views/             # Visualizações (aqui usamos JSON)
│   └── index.html
├── database/          # Configuração do banco de dados
│   └── db.js
├── app.js             # Arquivo principal do servidor
└── package.json       # Configurações do projeto

```

## 🔑 **Design Patterns e Padrões Arquiteturais**

#### **Singleton Pattern**

#### **O que é?**

O **Singleton Pattern** é um padrão de design criacional que garante que uma classe tenha **apenas uma instância** durante o ciclo de vida da aplicação e fornece um ponto de acesso global a essa instância. É útil para recursos compartilhados, como conexões de banco de dados.

#### **Como foi usado no projeto?**

No arquivo `database/db.js`, usamos o Singleton para gerenciar a conexão com o SQLite, garantindo que toda a aplicação utilize a mesma conexão.

**Código de exemplo:**

```javascript
class Database {
    constructor() {
        if (!Database.instance) { // Verifica se a instância já existe
            this.db = new sqlite3.Database('./task_manager.db', (err) => {
                if (err) {
                    console.error("Erro ao conectar ao SQLite:", err.message);
                } else {
                    console.log("Conectado ao SQLite com sucesso.");
                }
            });
            Database.instance = this; // Salva a instância única
        }
        return Database.instance; // Retorna a mesma instância
    }

    getConnection() {
        return this.db; // Fornece acesso à conexão
    }
}

```

#### **Por que usar?**

- Evita múltiplas conexões desnecessárias.
- Controla o acesso centralizado ao banco de dados.

### **MVC (Model-View-Controller)**

#### **O que é?**

O **MVC** é um padrão arquitetural que separa a aplicação em três camadas principais:

1. **Model (Modelo):** Gerencia a lógica de negócios e manipulação de dados.
2. **View (Visualização):** Apresenta os dados ao usuário.
3. **Controller (Controlador):** Conecta as interações do usuário (View) com os dados (Model).

#### **Como foi usado no projeto?**

1. **Model:** (`models/taskModel.js`)
   O modelo interage diretamente com o banco SQLite, realizando operações como criar, buscar e deletar tarefas.
   **Exemplo de método:**

   ```javascript
   static getAll(callback) {
       db.all("SELECT * FROM tasks", [], (err, rows) => {
           callback(err, rows);
       });
   }
   ```

2. **View:** (JSON)
   A View no projeto é representada pelas respostas JSON retornadas pela API, como listas de tarefas ou confirmações de operações.
   **Exemplo de resposta:**

   ```javascript
   jsonCopiar código[
     { "id": 1, "title": "Aprender JavaScript", "completed": 0 }
   ]
   ```

3. **Controller:** (`controllers/taskController.js`)
   O controlador conecta as requisições HTTP com os métodos do modelo e formata as respostas.
   **Exemplo de método:**

   ```javascript
   Copiar códigostatic async listTasks(req, res) {
       TaskModel.getAll((err, tasks) => {
           if (err) {
               res.status(500).send("Erro ao buscar tarefas.");
           } else {
               res.json(tasks); // Responde com os dados formatados
           }
       });
   }
   ```

#### **Por que usar?**

- Separa responsabilidades, facilitando a manutenção.
- Deixa o código mais organizado e escalável.

------

## 🛠️ **Tecnologias**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)

------

## 📄 **Licença**

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENCE) para mais detalhes.
