import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    exists(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        return rowIndex !== -1;
    }

    completed(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex].completed_at = 'completed'
            this.#persist();
        }
    }


    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) {
            const row = this.#database[table][rowIndex]

            const updatedItem = {
                id: row.id,
                title: data.title || row.title,
                description: data.description || row.description,
                updated_at: data.updated_at,
                completed_at: row.completed_at,
                created_at: row.created_at
            }
            this.#database[table][rowIndex] = updatedItem;

            this.#persist();
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist();
        }
    }
}