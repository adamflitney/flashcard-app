import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { addDeck, getAllDecks, setCurrentDeck } from '../../store/actions'
import Decks from '../../components/Decks'
import DeckEditor from '../../components/DeckEditor'

const ManagePage = ({ createNewDeck, currentDeck, setCurrentDeck }) => {
  const history = useHistory()

  useEffect(() => {
    // getDecks()
  }, [])

  const onDeckSelected = (deckRef) => {
    console.log('deck selected:', deckRef)
    setCurrentDeck(deckRef)
  }

  const createDeck = () => {
    setCurrentDeck('')
    createNewDeck({ name: '', cards: [] })
  }

  return (
    <div>
      <h1>ManagePage</h1>

      {currentDeck && <DeckEditor />}
      {!currentDeck && (
        <>
          <Decks onDeckSelected={onDeckSelected} />
          <button onClick={createDeck}>Add new Deck</button>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    decks: state.decks.decks,
    currentDeck: state.decks.currentDeck,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewDeck: (deck) => dispatch(addDeck(deck)),
    getDecks: () => dispatch(getAllDecks()),
    setCurrentDeck: (deck) => dispatch(setCurrentDeck(deck)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePage)
