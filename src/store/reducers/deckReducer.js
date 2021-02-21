import {
  DECKS_LOADED,
  DECKS_NOT_LOADED,
  GETTING_DECKS,
  NEW_DECK_ADDED,
  DECK_UPDATED,
  SET_CURRENT_DECK,
  DECK_DELETED,
  NEW_CARD_ADDED,
} from '../../constants/actionTypes'

const initialState = {
  decks: [],
  currentDeck: '',
}

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_DECKS:
      console.log('getting decks')
      state = { ...state, loading: true }
      break
    case DECKS_LOADED:
      console.log('got some decks')
      state = { ...state, loading: false, decks: action.payload }
      break
    case DECKS_NOT_LOADED:
      console.log('didnt get any decks')
      state = { ...state, loading: false }
      break
    case NEW_DECK_ADDED: {
      let newDecks = state.decks
      let newDeckRef = Object.keys(action.payload)[0]
      newDecks[newDeckRef] = action.payload[newDeckRef]
      state = { ...state, decks: newDecks, currentDeck: newDeckRef }
      break
    }
    case DECK_UPDATED: {
      let updatedDecks = state.decks
      let updatedDeckRef = Object.keys(action.payload)[0]
      updatedDecks[updatedDeckRef] = action.payload[updatedDeckRef]
      state = { ...state, decks: updatedDecks, currentDeck: updatedDeckRef }
      break
    }
    case SET_CURRENT_DECK:
      state = { ...state, currentDeck: action.payload }
      break
    default:
      break
    case DECK_DELETED: {
      let updatedDecks = {}
      Object.keys(state.decks).forEach((deckKey) => {
        if (deckKey !== Object.keys(action.payload)[0]) {
          updatedDecks[deckKey] = state.decks[deckKey]
        }
      })
      state = { ...state, decks: updatedDecks, currentDeck: '' }
      break
    }
    case NEW_CARD_ADDED: {
      const cardRef = Object.keys(action.payload)[0]
      let updatedDecks = state.decks
      console.log(action.payload[cardRef])
      updatedDecks[action.payload[cardRef].deckRef].cards.push(cardRef)
      state = { ...state, decks: updatedDecks }
    }
  }
  return state
}

export default deckReducer
