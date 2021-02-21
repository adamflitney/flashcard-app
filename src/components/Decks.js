import React from 'react'
import { connect } from 'react-redux'
import Deck from '../components/Deck'
import styled from 'styled-components'

const DeckList = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Decks = ({ decks, onDeckSelected }) => {
  return (
    <DeckList>
      {Object.keys(decks).map((deckRef) => {
        return (
          <Deck
            deck={decks[deckRef]}
            onClick={() => {
              console.log('deck clicked', deckRef)
              onDeckSelected(deckRef)
            }}
            key={deckRef}
          />
        )
      })}
    </DeckList>
  )
}

const mapStateToProps = (state) => {
  return { decks: state.decks.decks }
}

export default connect(mapStateToProps)(Decks)
