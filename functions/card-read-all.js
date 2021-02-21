const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET,
})

exports.handler = (event, context, callback) => {
  console.log('Function `deck-read-all` invoked')
  return client
    .query(q.Paginate(q.Documents(q.Collection('cards'))))
    .then((response) => {
      const cardRefs = response.data
      console.log('card refs', cardRefs)
      console.log(`${cardRefs.length} cards found`)
      // create new query out of deck refs. http://bit.ly/2LG3MLg
      const getAllCardDataQuery = cardRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllCardDataQuery).then((ret) => {
        const results = {}
        if (ret && ret.length >= 1) {
          ret.forEach((element) => {
            results[element.ref.value.id] = element.data
          })
        }
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(results),
        })
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
