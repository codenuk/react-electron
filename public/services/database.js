const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const pathDatabase = path
  .join('database.db')
  .replace('app.asar', 'app.asar.unpacked')

const intitialSetup = async () => {
  try {
    const db = new sqlite3.Database(pathDatabase, err => {
      if (err) {
        console.error('Error connecting database: ', err)
      }
    })
  
    // Create a table
    db.run('CREATE TABLE IF NOT EXISTS contacts (name TEXT, email TEXT)', err => {
      if (err) {
        console.error('Error creating table: ', err)
      }
    })
  
    // Close the database
    db.close(err => {
      if (err) {
        console.error('Error closing database: ', err)
      }
    })
    return true
  } catch (error) {
    return error
  }
}

const insertContacts = async (_, values) => {
  try {
    const { name, email } = values

    const promiseInsertData = new Promise((resolve, reject) => {
      const db = new sqlite3.Database(pathDatabase)
      const sql = `INSERT INTO contacts(name, email) VALUES(?, ?)`
      // insert one row into the langs table

      db.run(sql, [name, email], function (err) {
        if (err) {
          console.log('err insertContacts: ', err)
          reject(err)
        }

        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`)
        resolve(true)
      })

      // close the database connection
      db.close()
    })

    const insertData = await promiseInsertData
    return insertData
  } catch (error) {
    return error
  }
}

const getAllContacts = async () => {
  try {
    const promiseGetData = new Promise((resolve, reject) => {
      // open the database
      const db = new sqlite3.Database(pathDatabase)

      const sql = `SELECT * FROM contacts`
      db.all(sql, [], (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })

      // close the database connection
      db.close()
    })
    const getData = await promiseGetData

    return getData
  } catch (error) {
    return error
  }
}

module.exports = { intitialSetup, getAllContacts, insertContacts }
