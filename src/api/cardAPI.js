export const addNewCard = (data) => {
  return fetch('/.netlify/functions/card-create', {
    body: JSON.stringify(data),
    method: 'POST',
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.log('API error', error)
    })
}

export const getAllCards = () => {
  return fetch('/.netlify/functions/card-read-all').then((response) => {
    return response.json()
  })
}

export const getCard = (cardId) => {
  return fetch(`/.netlify/functions/card-read/${cardId}`).then((response) => {
    return response.json()
  })
}

export const updateCard = (cardId, data) => {
  console.log(JSON.stringify(data))
  return fetch(`/.netlify/functions/card-update/${cardId}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((response) => {
    console.log('response: ', response)
    return response.json()
  })
}

export const deleteCard = (cardId) => {
  return fetch(`/.netlify/functions/card-delete/${cardId}`, {
    method: 'POST',
  }).then((response) => {
    return response.json()
  })
}

export const deleteManyCards = (cardIds) => {
  return fetch(`/.netlify/functions/card-delete-batch`, {
    body: JSON.stringify({
      ids: cardIds,
    }),
    method: 'POST',
  }).then((response) => {
    return response.json()
  })
}
