import { Database } from "./database.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"


const database = new Database()


export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title) {
                return res.writeHead(400).end(JSON.stringify({ error: 'O título e obrigatório' }))
            }
            if (!description) {
                return res.writeHead(400).end(JSON.stringify({ error: 'A descrição e obrigatória' }))
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            if(!title || !description) {
                return res.writeHead(400).end(JSON.stringify({error: 'título ou descrição e obrigatório'}))
            }

            if(!database.exists('tasks', id)) {
                return res.writeHead(404).end();
            }

            database.update('tasks', id, {
                title,
                description,
                updated_at: new Date()
            })
            return res.writeHead(202).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            
            if(!database.exists('tasks', id)) {
                return res.writeHead(404).end();
            }

            database.delete('tasks', id)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            database.completed('tasks', id)
            return res.writeHead(204).end()
        }
    }
]