import express from "express";
import route from "./routes";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({origin:"*"}))
app.use("/api/v1", route);


app.get("/", (req, res) => {
  res.send("server is healthy");
});

app.listen(3000, () => {
  console.log("Server run on port 3000");
});
