const getId = require('./utils/getId')
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET,
})

exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  console.log(`Function 'deck-delete' invoked. delete id: ${id}`)
  return client
    .query(q.Delete(q.Ref(q.Collection('decks'), id)))
    .then((response) => {
      console.log('success', response)
      const removedDeckObject = {
        [response.ref.value.id]: response.data,
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(removedDeckObject),
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
