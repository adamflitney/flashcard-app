const getId = require('./utils/getId')
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET,
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  console.log(`Function 'card-update' invoked. update id: ${id}`)
  return client
    .query(q.Update(q.Ref(q.Collection('cards'), id), { data }))
    .then((response) => {
      console.log('success', response)
      const updatedCardObject = {
        [response.ref.value.id]: response.data,
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(updatedCardObject),
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
