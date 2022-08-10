// import "dotenv/config";
import express from "express"
import { messagesRouter } from "./routes/messagesRouter"

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/messages", messagesRouter)

app.listen(4000, () => {
  console.log(`Server is listening on port ${4000}`)
})
