const serverless = require("serverless-http");
const express = require("express");
const mysql = require('mysql2')
const app = express();

const connection = mysql.createConnection({
  host: "medcloud.c9kxg983k5ek.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "!!010203",
  database: "medcloud",
});

class Controller {
  getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM v$patient", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM v$patient WHERE id = ${id}", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

}

const controller = new Controller()

app.get("/api/patient", async (req, res, next) => {
  return res.status(200).json(await controller.getAll());
});

app.get("/api/patient/:id", async (req, res, next) => {
  return res.status(200).json({hello: 'world'});
});


app.use((req, res, next) => {
  console.log(req)
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.patient = serverless(app);
