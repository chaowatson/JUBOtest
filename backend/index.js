import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import PatientsDAO from "./dao/patientsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.JUBO_DB_URI,
)
.catch(err =>{
  console.error(err.stack)
  process.exit(1)
})
.then(async client => {
  await PatientsDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})
