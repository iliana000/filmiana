import express from 'express'
// import { graphqlHTTP } from 'express-graphql'

import filmsRoutes from './routes/filmsRoutes'
// import schema from './schema/schema'

const PORT = process.env.PORT || 3000
const app = express()

// app.use('/graphql', graphqlHTTP({ schema }))

// middleware to cope with CORS
app.use(function (req, res, next) {
  res
    .header('Access-Control-Allow-Origin', 'http://localhost:19006')
    .header('Access-Control-Allow-Methods', 'DELETE')
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(filmsRoutes)
app.use(express.json)

app.listen(PORT, () =>
  console.log(`The server has been started on port ${PORT}`),
)
