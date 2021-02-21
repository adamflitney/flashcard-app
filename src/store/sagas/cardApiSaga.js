import { takeEvery, call, put, select } from 'redux-saga/effects'
import {
  GET_CARDS,
  GETTING_CARDS,
  CARDS_LOADED,
  CARDS_NOT_LOADED,
  UPDATE_CARD,
  ADD_CARD,
  DELETE_CARD,
  NEW_CARD_ADDED,
  CARD_UPDATED,
  UPDATE_DECK,
  CARD_DELETED,
} from '../../constants/actionTypes'
import {
  getAllCards,
  updateCard,
  addNewCard,
  deleteCard,
} from '../../api/cardAPI'

import { getDeck } from '../selectors'

export function* watchGetCards() {
  console.log('someone requested Cards?')
  yield takeEvery(GET_CARDS, getCardsSaga)
}

export function* watchUpdateCard() {
  console.log('update dat Card!')
  yield takeEvery(UPDATE_CARD, updateCardSaga)
}

export function* watchAddCard() {
  console.log('another Card?!')
  yield takeEvery(ADD_CARD, addCardSaga)
}

export function* watchDeleteCard() {
  console.log('another Card?!')
  yield takeEvery(DELETE_CARD, deleteCardSaga)
}

function* getCardsSaga() {
  console.log('saga gettin sum Cards')
  yield put({ type: GETTING_CARDS })
  try {
    const payload = yield call(getAllCards)
    yield put({ type: CARDS_LOADED, payload })
  } catch (e) {
    console.log('wtf happened here??')
    yield put({ type: CARDS_NOT_LOADED, payload: e })
  }
}

function* updateCardSaga(action) {
  console.log('updatin dat Card', action)
  try {
    const result = yield call(
      updateCard,
      action.payload.ref,
      action.payload.data
    )
    console.log('updated Card', result)
    yield put({ type: CARD_UPDATED, payload: result })
  } catch (error) {
    console.log(error)
  }
}

function* addCardSaga(action) {
  console.log('addin dat Card', action)
  try {
    const result = yield call(addNewCard, action.payload)
    console.log('Card added', result)
    yield put({ type: NEW_CARD_ADDED, payload: result })
    console.log(result[Object.keys(result)[0]].deckRef)
    let parentDeck = yield select(
      getDeck,
      result[Object.keys(result)[0]].deckRef
    )
    parentDeck = {
      ref: result[Object.keys(result)[0]].deckRef,
      data: { ...parentDeck },
    }
    yield put({ type: UPDATE_DECK, payload: parentDeck })
    console.log('parent deck for new card', parentDeck)
  } catch (error) {
    console.log(error)
  }
}

function* deleteCardSaga(action) {
  console.log('bye bye Card', action.payload)
  try {
    const result = yield call(deleteCard, action.payload)
    yield put({ type: CARD_DELETED, payload: result })
    console.log('Card removed', result)
    let parentDeck = yield select(
      getDeck,
      result[Object.keys(result)[0]].deckRef
    )
    console.log('parentdeck', parentDeck)
    const deckUpdatedCardsList = parentDeck.cards.filter((card) => {
      return card !== action.payload
    })
    parentDeck = {
      ref: result[Object.keys(result)[0]].deckRef,
      data: { ...parentDeck, cards: deckUpdatedCardsList },
    }
    yield put({ type: UPDATE_DECK, payload: parentDeck })
  } catch (error) {
    console.log(error)
  }
}
