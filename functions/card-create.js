const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET,
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log('function: card-create invoked', data)
  const cardObject = { data: data }

  return client
    .query(q.Create(q.Collection('cards'), cardObject))
    .then((response) => {
      console.log('success', response)
      const newCardObject = {
        [response.ref.value.id]: response.data,
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(newCardObject),
      })
    })
    .catch((error) => {
      console.log('error', error)
      return callback(null, { statusCode: 400, body: JSON.stringify(error) })
    })
}
