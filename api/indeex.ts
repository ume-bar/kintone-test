import express from 'express'
import * as buildings from './buildings'

const handler = express()
handler.use(express.json())

handler.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
    )

    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

const multer = require('multer')
const upload = multer({
    dest: 'uploads/',
    limits: { fieldSize: 100 * 1024 * 1024 },
})

// builgings
handler.get('/buildings', buildings.list)
handler.post('/buildings', buildings.create)
handler.get('/buildings/:buildingId', buildings.get)
handler.delete('/buildings/:buildingId', buildings.destroy)


module.exports = {
    path: '/api',
    handler,
}