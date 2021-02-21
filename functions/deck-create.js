const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET,
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log('function: deck-create invoked', data)
  const deckObject = { data: data }

  return client
    .query(q.Create(q.Collection('decks'), deckObject))
    .then((response) => {
      console.log('success', response)
      const newDeckObject = {
        [response.ref.value.id]: response.data,
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(newDeckObject),
      })
    })
    .catch((error) => {
      console.log('error', error)
      return callback(null, { statusCode: 400, body: JSON.stringify(error) })
    })
}
