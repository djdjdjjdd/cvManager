const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const database = require("./config/database")
const cors = require('cors')
database.connect()
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json())
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find({
        deleted: false
    });
    console.log(tasks)
})
app.use(cors())
app.get("/tasks/detail/:id", async (req, res) => {
    const id = req.params.id
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    res.json(task)
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})