import { AppDataSource } from './data-source'
import * as express from 'express'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import 'reflect-metadata'
import { resourceRouter } from './routes/resource.routes'
import { errorHandler } from './middleware/error.handler'
dotenv.config()

const app = express()
app.use(express.json())
app.use(errorHandler)
const { PORT = 3000 } = process.env
app.use('/api', resourceRouter)

app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
})

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log('Server is running on http://localhost:' + PORT)
        })
        console.log('Data Source has been initialized!')
    })
    .catch((error) => console.log(error))
