import express from "express"
import cors from "cors"
import { Curiosity } from "./curiosity"
const PORT = 3333

const app = express()

app.use(express.json())
app.use(cors())

app.post("/move",(req,res)=>{
  const {position,movement} = req.body

  const response = new Curiosity(position).move(movement)

  res.json(response)
})


app.listen(PORT, ()=>console.log(`listening to: http://localhost:${PORT}`))