// Import database
const knex = require('./../db')

// Retrieve all books
exports.lastAll = async (req, res) => {
  // Get all first names from database
  knex
    .select('*') // select all records
    .from('last') // from '' table
    .then(userData => {
      // Send last names extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving last names: ${err}` })
    })
}

// Retrieve all last names where nation1 = query
exports.lastSearch = async (req, res) => {
  let param = req.query.queryString

  knex
    .select('*') // select all records
    .from('last') // from 'last' table
    .where({'nation1': param})
    .then(userData => {
      // Send last names extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving lasts: ${err}` })
    })
}

// Retrieve all last names where nation1 = query
exports.lastRandomSearch = async (req, res) => {
  let param = req.query.queryString

  knex
    .select('*') // select all records
    .from('last') // from 'last' table
    .where({'nation1': param})
    .orderByRaw('RANDOM()')
    .limit(1)
    .then(userData => {
      // Send last names extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving lasts: ${err}` })
    })
}