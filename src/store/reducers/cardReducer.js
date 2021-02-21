import {
  CARDS_LOADED,
  CARDS_NOT_LOADED,
  GETTING_CARDS,
  NEW_CARD_ADDED,
  SET_CURRENT_CARD,
  CARD_UPDATED,
  CARD_DELETED,
} from '../../constants/actionTypes'

const initialState = {
  cards: {},
  currentCard: '',
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_CARDS:
      console.log('getting cards')
      state = { ...state, loading: true }
      break
    case CARDS_LOADED:
      console.log('got some cards')
      state = { ...state, loading: false, cards: action.payload }
      break
    case CARDS_NOT_LOADED:
      console.log('didnt get any cards')
      state = { ...state, loading: false }
      break
    case NEW_CARD_ADDED: {
      let newCards = state.cards
      let newCardRef = Object.keys(action.payload)[0]
      newCards[newCardRef] = action.payload[newCardRef]
      state = { ...state, cards: newCards, currentCard: newCardRef }
      break
    }
    case CARD_UPDATED: {
      let updatedCards = state.cards
      let updatedCardRef = Object.keys(action.payload)[0]
      updatedCards[updatedCardRef] = action.payload[updatedCardRef]
      state = { ...state, cards: updatedCards }
      break
    }
    case SET_CURRENT_CARD:
      state = { ...state, currentCard: action.payload }
      break
    case CARD_DELETED: {
      let updatedCards = {}
      console.log('card deleted payload', action.payload)
      Object.keys(state.cards).forEach((cardKey) => {
        if (cardKey !== Object.keys(action.payload)[0]) {
          updatedCards[cardKey] = state.cards[cardKey]
        }
      })
      state = { ...state, cards: updatedCards, currentCard: '' }
      break
    }
    default:
      break
  }
  return state
}

export default rootReducer
