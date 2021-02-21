import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { updateCard, deleteCard, setCurrentCard } from '../store/actions'

const FlashcardEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const Card = styled.div`
  width: 200px;
  height: 300px;
  border: 2px solid #999999;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const RemoveButton = styled.button`
  max-width: 100px;
`

function FlashcardEditor({
  cards,
  currentCard,
  deleteCard,
  updateCard,
  setCurrentCard,
}) {
  const [currentCardContents, setCurrentCardContents] = useState(
    cards[currentCard]
  )

  const handleTextChange = (e) => {
    const updatedCard = {
      ...currentCardContents,
      [e.target.name]: e.target.value,
    }
    setCurrentCardContents(updatedCard)
  }

  const saveAndQuit = () => {
    updateCard({
      ref: currentCard,
      data: currentCardContents,
    })
    setCurrentCard('')
  }

  return (
    <FlashcardEditorWrapper>
      <RemoveButton onClick={() => deleteCard(currentCard)}>
        Remove Card
      </RemoveButton>
      <CardWrapper>
        <Card>
          <h2>Front</h2>
          <input
            name='frontText'
            type='text'
            value={currentCardContents.frontText}
            onChange={handleTextChange}
          />
        </Card>
        <Card>
          <h2>Back</h2>
          <input
            name='backText'
            type='text'
            value={currentCardContents.backText}
            onChange={handleTextChange}
          />
        </Card>
      </CardWrapper>
      <ButtonWrapper>
        <button onClick={() => saveAndQuit()}>Done</button>
      </ButtonWrapper>
    </FlashcardEditorWrapper>
  )
}

const mapStateToProps = (state) => ({
  cards: state.cards.cards,
  currentCard: state.cards.currentCard,
})

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCard: (card) => dispatch(deleteCard(card)),
    updateCard: (card) => dispatch(updateCard(card)),
    setCurrentCard: (card) => dispatch(setCurrentCard(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardEditor)
