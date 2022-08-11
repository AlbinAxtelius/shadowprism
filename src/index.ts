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

export default app
