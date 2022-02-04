// Import database
const knex = require('./../db')

// Retrieve all books
exports.firstAll = async (req, res) => {
  // Get all first names from database
  knex
    .select('*') // select all records
    .from('first') // from '' table
    .then(userData => {
      // Send first names extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving first names: ${err}` })
    })
}

// Retrieve all first names where nation1 = query
exports.firstSearch = async (req, res) => {
  let param = req.query.queryString

  knex
    .select('*') // select all records
    .from('first') // from 'first' table
    .where({'nation1': param})
    .then(userData => {
      // Send first names extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

// Retrieve all first names where nation1 = query
exports.firstRandomSearch = async (req, res) => {
  let param = req.query.queryString

  knex
    .select('*') // select all records
    .from('first') // from 'first' table
    .where({'nation1': param})
    .orderByRaw('RANDOM()')
    .limit(1)
    .then(userData => {
      // Send first names extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}