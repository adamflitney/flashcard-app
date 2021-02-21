import { takeEvery, call, put } from 'redux-saga/effects'
import {
  GET_DECKS,
  GETTING_DECKS,
  DECKS_LOADED,
  DECKS_NOT_LOADED,
  UPDATE_DECK,
  ADD_DECK,
  DELETE_DECK,
  NEW_DECK_ADDED,
  DECK_UPDATED,
  DECK_DELETED,
} from '../../constants/actionTypes'
import {
  getAllDecks,
  updateDeck,
  addNewDeck,
  deleteDeck,
} from '../../api/deckAPI'

export function* watchGetDecks() {
  console.log('someone requested decks?')
  yield takeEvery(GET_DECKS, getDecksSaga)
}

export function* watchUpdateDeck() {
  console.log('update dat deck!')
  yield takeEvery(UPDATE_DECK, updateDeckSaga)
}

export function* watchAddDeck() {
  console.log('another deck?!')
  yield takeEvery(ADD_DECK, addDeckSaga)
}

export function* watchDeleteDeck() {
  console.log('another deck?!')
  yield takeEvery(DELETE_DECK, deleteDeckSaga)
}

function* getDecksSaga() {
  console.log('saga gettin sum decks')
  yield put({ type: GETTING_DECKS })
  try {
    const payload = yield call(getAllDecks)
    console.log('decks', payload)
    yield put({ type: DECKS_LOADED, payload })
  } catch (e) {
    console.log('wtf happened here??')
    yield put({ type: DECKS_NOT_LOADED, payload: e })
  }
}

function* updateDeckSaga(action) {
  console.log('updatin dat deck', action)
  try {
    const result = yield call(
      updateDeck,
      action.payload.ref,
      action.payload.data
    )
    console.log('updated deck', result)
    yield put({ type: DECK_UPDATED, payload: result })
  } catch (error) {
    console.log(error)
  }
}

function* addDeckSaga(action) {
  console.log('addin dat deck', action)
  try {
    const result = yield call(addNewDeck, action.payload)
    console.log('deck added', result)
    yield put({ type: NEW_DECK_ADDED, payload: result })
  } catch (error) {
    console.log(error)
  }
}

function* deleteDeckSaga(action) {
  console.log('bye bye deck')
  try {
    const result = yield call(deleteDeck, action.payload)
    console.log('deck removed', result)
    yield put({ type: DECK_DELETED, payload: result })
  } catch (error) {
    console.log(error)
  }
}
