import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Decks from '../../components/Decks'
import StudySession from '../../components/StudySession'

import { setCurrentDeck, setCurrentCard } from '../../store/actions'

const ContentWrapper = styled.div`
  margin: 0 50px;
`

const StudyPage = ({ currentDeck, setCurrentDeck }) => {
  return (
    <ContentWrapper>
      <h1>StudyPage</h1>

      {!currentDeck ? (
        <Decks onDeckSelected={(deckRef) => setCurrentDeck(deckRef)} />
      ) : (
        <StudySession />
      )}
    </ContentWrapper>
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
    setCurrentDeck: (deck) => dispatch(setCurrentDeck(deck)),
    setCurrentCard: (card) => dispatch(setCurrentCard(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage)
