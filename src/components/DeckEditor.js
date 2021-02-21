import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  updateDeck,
  deleteDeck,
  setCurrentDeck,
  addCard,
  setCurrentCard,
} from '../store/actions'
import Flashcard from '../components/Flashcard'
import FlashcardEditor from './FlashcardEditor'

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardsList = styled.div`
  display: flex;
`

const DeckWrapper = styled.div``

const DeckEditor = ({
  decks,
  cards,
  addNewCard,
  updateDeck,
  deleteDeck,
  currentDeck,
  currentCard,
  setCurrentDeck,
  setCurrentCard,
}) => {
  const [currentName, setCurrentName] = useState(decks[currentDeck].name)
  const [someState, setSomeState] = useState(null)

  useEffect(() => {
    setSomeState(currentCard)
  }, [currentCard])
  const hasCards = decks[currentDeck] && decks[currentDeck].cards?.length >= 1

  const changeName = (e) => {
    setCurrentName(e.target.value)
  }

  const saveCurrentDeck = () => {
    updateDeck({
      ref: currentDeck,
      data: { ...decks[currentDeck], name: currentName },
    })
  }

  const editCard = (cardRef) => {
    setCurrentCard(cardRef)
  }

  const createNewCard = () => {
    const card = {
      deckRef: currentDeck,
      frontText: '',
      backText: '',
    }
    addNewCard(card)
  }

  return (
    <div>
      {currentCard && <FlashcardEditor />}
      {!currentCard && (
        <DeckWrapper>
          <TopRow>
            <button
              onClick={() => {
                deleteDeck(currentDeck)
              }}
            >
              Delete Deck
            </button>
            <div>
              <label htmlFor='deckName'>Deck Name</label>
              <input
                name='deckName'
                value={currentName}
                onChange={changeName}
                onBlur={() => saveCurrentDeck(currentDeck)}
                type='text'
              />
            </div>
            <button onClick={() => createNewCard()}>Add Card</button>
          </TopRow>
          <CardsList>
            {hasCards &&
              decks[currentDeck].cards.map((cardRef) => {
                return (
                  <Flashcard
                    card={cardRef}
                    onClick={() => {
                      editCard(cardRef)
                    }}
                    key={cardRef}
                  />
                )
              })}
          </CardsList>
          <button onClick={() => setCurrentDeck('')}>Exit</button>
        </DeckWrapper>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  decks: state.decks.decks,
  cards: state.cards.cards,
  currentDeck: state.decks.currentDeck,
  currentCard: state.cards.currentCard,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateDeck: (deck) => dispatch(updateDeck(deck)),
    setCurrentDeck: (deck) => dispatch(setCurrentDeck(deck)),
    deleteDeck: (deck) => dispatch(deleteDeck(deck)),
    addNewCard: (card) => dispatch(addCard(card)),
    setCurrentCard: (card) => dispatch(setCurrentCard(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditor)
