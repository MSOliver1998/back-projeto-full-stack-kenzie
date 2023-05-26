import app from './app'
import { AppDataSource } from './data-source'
import 'dotenv/config'

const port=Number(process.env.PORT) || 3000

AppDataSource.initialize()
    .then(() => {
        console.log('Database is connected')
        app.listen(port, () => {
            console.log(`Server is running in http://localhost:${port}`)
        })
    })
    .catch((err) => console.log(err))
