import { Database } from "./database.js"
import { randomUUID } from "node:crypto"

const database = new Database()

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        handler: (req, res) => {
            return res.writeHead(202).end()
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (req, res) => {
            return res.writeHead(203).end()
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (req, res) => {
            return res.writeHead(204).end()
        }
    }
]