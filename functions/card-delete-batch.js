const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET,
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log('data', data)
  console.log('Function `card-delete-batch` invoked', data.ids)
  // construct batch query from IDs
  const deleteManyCardsQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(q.Collection('cards'), id))
  })
  return client
    .query(deleteManyCardsQuery)
    .then((response) => {
      console.log('success', response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
    })
    .catch((error) => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
