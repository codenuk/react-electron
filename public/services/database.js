const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const insertString = async values => {
  // const { id } = values

  let db = new sqlite3.Database(path.join(__dirname, '../database.db'))
  
  // insert one row into the langs table
  db.run(`INSERT INTO test(id) VALUES(?)`, ['ASDASDASD'], function (err) {
    if (err) {
      return console.log(err.message)
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`)
  })

  // close the database connection
  db.close()
}

const getAllString = async () => {
  // open the database
  let db = new sqlite3.Database(path.join(__dirname, '../database.db'))
  console.log(db)

  let sql = `SELECT * FROM test`

  console.log(sql)

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err)
      throw err
    }
    rows.forEach(row => {
      console.log(row)
    })
  })

  // close the database connection
  db.close()
}

module.exports = { getAllString, insertString }
