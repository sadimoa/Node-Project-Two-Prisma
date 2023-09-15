import express, {json} from 'express'

const server = express()
import authorRouter from './authors.js'
import bookStoreRouter from './bookstores.js'
import bookRouter from './books.js'

server.use(json())
server.use('/api/authors', authorRouter)
server.use('/api/bookstore', bookStoreRouter)
server.use('/api/book', bookRouter)

export default server

