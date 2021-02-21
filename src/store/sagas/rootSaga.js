import { all } from 'redux-saga/effects'
import {
  watchGetDecks,
  watchUpdateDeck,
  watchAddDeck,
  watchDeleteDeck,
} from './deckApiSaga'
import {
  watchGetCards,
  watchUpdateCard,
  watchAddCard,
  watchDeleteCard,
} from './cardApiSaga'

export default function* rootSaga() {
  yield all([
    watchGetDecks(),
    watchUpdateDeck(),
    watchAddDeck(),
    watchDeleteDeck(),
    watchGetCards(),
    watchUpdateCard(),
    watchAddCard(),
    watchDeleteCard(),
  ])
}
