import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes/index.js'

const PORT = process.env.PORT || 3001


const app = express()
app.use(cors())
app.use(express.json())
app.use(router);
app.get('/', (req, res) => res.send('server ok'))

app.listen(PORT, () => console.log(`Server on port ${PORT}`))