export const addNewDeck = (data) => {
  return fetch('/.netlify/functions/deck-create', {
    body: JSON.stringify(data),
    method: 'POST',
  })
    .then((response) => {
      console.log('API response', response)
      return response.json()
    })
    .catch((error) => {
      console.log('API error', error)
    })
}

export const getAllDecks = () => {
  return fetch('/.netlify/functions/deck-read-all').then((response) => {
    return response.json()
  })
}

export const getDeck = (deckId) => {
  return fetch(`/.netlify/functions/deck-read/${deckId}`).then((response) => {
    return response.json()
  })
}

export const updateDeck = (deckId, data) => {
  console.log(JSON.stringify(data))
  return fetch(`/.netlify/functions/deck-update/${deckId}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((response) => {
    console.log('response: ', response)
    return response.json()
  })
}

export const deleteDeck = (deckId) => {
  return fetch(`/.netlify/functions/deck-delete/${deckId}`, {
    method: 'POST',
  }).then((response) => {
    return response.json()
  })
}

export const deleteManyDecks = (deckIds) => {
  return fetch(`/.netlify/functions/deck-delete-batch`, {
    body: JSON.stringify({
      ids: deckIds,
    }),
    method: 'POST',
  }).then((response) => {
    return response.json()
  })
}
