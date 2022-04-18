const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors")
const jwt = require('jsonwebtoken')
const mysql = require("mysql2");
const app = express();

// Settings
app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
);


// Connection

const connection = mysql.createConnection({
  host: "medcloud.c9kxg983k5ek.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "!!010203",
  database: "medcloud",
});

// Controller

class Controller {
  getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM patient", (err, rows) => {
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
      connection.query(
        `SELECT * FROM patient WHERE id = ${id}`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  insert(data) {
    const val = new Validate();
    if (
      val.isName(data.name) &&
      val.isEmail(data.email) &&
      val.isBirthDate(data.birth_date) &&
      val.isNotEmpty(data.address)
    ) {
      return new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO patient (name, email, birth_date, address) VALUES ('${data.name}', '${data.email}', '${data.birth_date}', '${data.address}')`,
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    } else {
      return { msg: "Dados Inválidos" };
    }
  }

  update(id, data) {
    const val = new Validate();
    if (
      val.isInteger(id) &&
      val.isName(data.name) &&
      val.isEmail(data.email) &&
      val.isBirthDate(data.birth_date) &&
      val.isNotEmpty(data.address)
    ) {
      return new Promise((resolve, reject) => {
        connection.query(
          `UPDATE patient SET name = '${data.name}', email = '${data.email}', birth_date = '${data.birth_date}', address = '${data.address}' WHERE id = ${id}`,
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    } else {
      return { msg: "Dados Inválidos" };
    }
  }

  delete(id) {
    const val = new Validate();
    if (val.isInteger(id)) {
      return new Promise((resolve, reject) => {
        connection.query(
          `DELETE FROM patient WHERE id = ${id}`,
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    } else {
      return { msg: "'ID' Inválido" };
    }
  }
}

// Instance Controller
const controller = new Controller();

// Validate
class Validate {
  isNotEmpty(value) {
    return value !== "";
  }

  isInteger(number) {
    return /^\d+$/.test(number);
  }

  isName(name) {
    return /^[a-zA-Z ]+$/.test(name);
  }

  isEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  isBirthDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }
}

//Middleware
// app.use((req, res, next) => {
//   const token = req.headers.authorization;

//   if(req.url == '/api/auth' || req.url == '/api/auth/'){
//     return next();
//   }

//   if (token) {
//     jwt.verify(token, "secretMedCloud", (err, decoded) => {
//       if (err) {
//         res.status(401).json({ msg: "Token inválido" });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ msg: "Token não informado" });
//   }
// });


// Routes

app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;

  email === 'medcloud@gmail.com' && password === '@!010203' 
    ? jwt.sign({ email }, "secretMedCloud", { expiresIn: "3h" }, (err, token) => {
        res.json({ token });
      })
    : res.status(401).json({ msg: "Usuário ou senha inválidos" });
});


app.get("/api/patient", async (req, res, next) => {
  return res.status(200).json(await controller.getAll());
});

app.get("/api/patient/:id", async (req, res, next) => {
  return res.status(200).json(await controller.getOne(req.params.id));
});

app.post("/api/patient/", async (req, res, next) => {
  return res.status(200).json(await controller.insert(req.body));
});

app.put("/api/patient/:id", async (req, res, next) => {
  return res.status(200).json(await controller.update(req.params.id, req.body));
});

app.delete("/api/patient/:id", async (req, res, next) => {
  return res.status(200).json(await controller.delete(req.params.id));
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.patient = serverless(app);
