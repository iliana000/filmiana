import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'

import filmsRoutes from './__old__routes/__old__filmsRoutes'
import schema from './schema/schema'

const PORT = process.env.PORT || 3000
const app = express()

// middleware to cope with CORS
// for qraphql
app.use(cors())
// for fetch
app.use(function (req, res, next) {
  res
    .header('Access-Control-Allow-Origin', 'http://localhost:19006')
    .header('Access-Control-Allow-Methods', 'DELETE')
  next()
})

// mongo
mongoose.connect(
  'mongodb+srv://iliana:njhjynj@cluster0.mzfdg9z.mongodb.net/?retryWrites=true&w=majority',
)
mongoose.connection.once('open', () => {
  console.log('connected to db')
})

// graphql
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.use(express.urlencoded({ extended: true }))
app.use(filmsRoutes)
app.use(express.json)

app.listen(PORT, () =>
  console.log(`The server has been started on port ${PORT}`),
)
