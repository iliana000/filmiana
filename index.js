import express from 'express'
import serverRoutes from './routes/servers.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(serverRoutes)
app.use(express.json)
app.use(express.urlencoded({extended:false}))

app.listen(PORT, () => console.log(`The server has been started on port ${PORT}`))