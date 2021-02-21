import {
  ADD_DECK,
  UPDATE_DECK,
  DELETE_DECK,
  GET_DECKS,
  SET_CURRENT_DECK,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  GET_CARDS,
  SET_CURRENT_CARD,
} from '../../constants/actionTypes'

export const addDeck = (payload) => {
  return { type: ADD_DECK, payload }
}

export const getAllDecks = () => {
  console.log('getalldecks action called')
  return { type: GET_DECKS }
}

export const updateDeck = (payload) => {
  return { type: UPDATE_DECK, payload }
}

export const setCurrentDeck = (payload) => {
  return { type: SET_CURRENT_DECK, payload }
}

export const deleteDeck = (payload) => {
  return { type: DELETE_DECK, payload }
}

export const addCard = (payload) => {
  return { type: ADD_CARD, payload }
}

export const getAllCards = () => {
  return { type: GET_CARDS }
}

export const updateCard = (payload) => {
  return { type: UPDATE_CARD, payload }
}

export const setCurrentCard = (payload) => {
  return { type: SET_CURRENT_CARD, payload }
}

export const deleteCard = (payload) => {
  return { type: DELETE_CARD, payload }
}
