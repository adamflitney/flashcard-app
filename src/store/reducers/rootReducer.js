import { combineReducers } from 'redux'
import deckReducer from './deckReducer'
import cardReducer from './cardReducer'

const rootReducer = combineReducers({
  decks: deckReducer,
  cards: cardReducer,
})

export default rootReducer
