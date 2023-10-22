const temporaryTaskStorage = []

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body
            temporaryTaskStorage.push({ title, description })
            return res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            return res.end(JSON.stringify(temporaryTaskStorage))
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