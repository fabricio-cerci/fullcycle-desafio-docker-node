const express = require("express")
const { faker } = require('@faker-js/faker');
const app = express()
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const mysql = require("mysql")
let persons = []
const connection = mysql.createConnection(config)
const queryPersons = `SELECT * FROM people;`
connection.query("CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id));", (error) => {
  if (error) console.log("Tabela persons já criada!")
})

app.get("/", (req, res) => {
  insertPerson()
  return connection.query(queryPersons, (error, results) => {
    persons = results.map(result => result.name)
    res.send(`<h1>Full Cycle Rocks!!</h1><h2>Nomes cadastrados no banco:</h2><ul>${persons.reduce((initial, next) => initial + `<li>${JSON.stringify(next)}</li>`, "")}</ul>`)
  });
})

function insertPerson() {
  const sql = `INSERT INTO people(name) values('${faker.name.firstName()}');`
  connection.query(sql)
}

app.listen(3000, () => {
  console.log("Rodando na porta 3000")
})