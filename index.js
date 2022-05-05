//Create express app
const express = require("express");
const app = express()

//import database
const database = require("./database")

//Create HTTP server and listen on port 3000 for requests
const port = 3000

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
})

app.get("/api/data", (req, res, next) => {
  let sql = "SELECT * FROM carData"
  let params = []
  database.all(sql, params, (err, rows) => {
    if(err){
      res.status(400).json({"err" : err.message})
      return
    }
    res.json({
      "message" : "success",
      "data" : rows
    })
  })
})

app.get("/api/ranked", (req, res, next) => {
  let sql = `SELECT RANK() OVER(ORDER BY scores.Car_Score DESC) AS rank, 
              scores.Car_ID,
              carData.Year,
              carData.Make,
              carData.Model,
              scores.Car_Score
            FROM car_scores scores
            JOIN carData carData
            ON scores.Car_ID = carData.ID`
  let params = []

  database.all(sql, params, (err, rows) => {
    if(err){
      res.status(400).json({"err" : err.message})
      return
    }
    res.json({
      "message" : "success",
      "data" : rows
    })
  })
})

app.get("/api/top3", (req, res, next) => {
  sql = `SELECT * FROM (
          SELECT Car_ID, Year, Make, Model, Car_Score,
          ROW_NUMBER() OVER (PARTITION BY Make ORDER BY Car_Score DESC) AS subrank
          FROM ranked
        )
        WHERE subrank<=3`
  let params = []
  database.all(sql, params, (err, rows) => {
    if(err){
      res.status(400).json({"err" : err.message})
      return
    }
    res.json({
      "message" : "success",
      "data" : rows
    })
  })
})

//Get car based on id
app.get("/api/:id", (req, res, next) => {
  let sql = `SELECT * FROM carData WHERE ID = ${req.params.id}`
  let params = []
  database.all(sql, params, (err, rows) => {
    if(err){
      res.status(400).json({"err" : err.message})
      return
    }
    res.json({
      "message" : "success",
      "data" : rows
    })
  })
})

//Get all cars of a certain make
app.get("/api/make/:value", (req, res, next) => {
  let sql = `SELECT * FROM carData
            WHERE Make = '${req.params.value}';`
  let params = []
  database.all(sql, params, (err, rows) => {
    if(err){
      res.status(400).json({"err" : err.message})
      return
    }
    res.json({
      "message" : "success",
      "data" : rows
    })
  })
})

//adds car to carData table and computes 
app.post("/api/car", (req, res, next) => {
  let scores = req.body.scores.split(",")
  let totalScore = 0
  for(let i = 0; i < 25; i++){
    totalScore += scores[i]
  }
  
  console.log(scores)
  let sql = `INSERT INTO data
              VALUES ('${req.body.Timestamp}', '${req.body.Email}', '${req.body.Name}',
              '${req.body.Year}', '${req.body.Make}', '${req.body.Model}',
              '${req.body.Car_ID}', '${req.body.Judge_ID}', '${req.body.Judge_Name}',
              '${scores[0]}', '${scores[1]}', '${scores[2]}','${scores[3]}', '${scores[4]}', '${scores[5]}',
              '${scores[6]}', '${scores[7]}', '${scores[8]}','${scores[9]}', '${scores[10]}', '${scores[11]}',
              '${scores[12]}', '${scores[13]}', '${scores[14]}', '${scores[15]}', '${scores[16]}', '${scores[17]}',
              '${scores[18]}', '${scores[19]}', '${scores[20]}', '${scores[21]}', '${scores[22]}', '${scores[23]}',
              '${scores[24]}');

              INSERT INTO car_scores
              VALUES ('${req.body.ID}', '${totalScore}');
              `
  let params = []
  database.run(sql, params, (err, result) => {
    if(err){
      res.status(400).json({"err" : err.message})
      return
    }
    res.json({"message" : `'${req.body.Make}' '${req.body.Model}' added to carData table`,
              "ID" : req.body.ID
            })
  })
})

//delete car based on id
app.delete("/api/:id", (req, res, next) => {
  database.run(
    `DELETE FROM carData WHERE ID = ${req.params.id};
     DELETE FROM car_scores WHERE Car_ID = ${req.params.id}`,
     function(err, result){
       if(err){
         res.status(400).json({"err" : err.message})
         return
       }
       res.json({
         "message" : `Deleted car ${req.params.id}`
       })
     }
  )
})

//delete all cars of a given make



app.use(function(req, res) {
  res.status(404)
})
