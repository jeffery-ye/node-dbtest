const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

app.get('/user/:id', (req, res) => {
  console.log("Fetching user with ID:" + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'siyuan', 
    password: 'siyuan05',
    database: 'nodejs'
  })
  const userID = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userID], (err, rows) => {

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
  })
})

app.get("/", (req, res) => {
  console.log("Response to Root Route")
  res.send("Hello")
})




app.listen(3002, () => {
  console.log("Server Running on Port 3002")
})