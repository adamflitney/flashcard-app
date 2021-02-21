import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setCurrentDeck, setCurrentCard, updateCard } from '../store/actions'
import Flashcard from '../components/Flashcard'

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
`

const SessionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Answers = styled.div`
  margin-top: 30px;
`

const AnswerButton = styled.button`
  background: #ccc;
  border: none;
  border-radius: 5px;
  margin: 0 10px;
  padding: 15px 30px;
`

const SessionCompleteSection = styled.div``

const StudySession = ({
  decks,
  cards,
  currentDeck,
  setCurrentDeck,
  updateCard,
}) => {
  const [currentReviewingCard, setCurrentReviewingCard] = useState(0)
  const [currentReviewingDeck, setCurrentReviewingDeck] = useState({
    name: '',
    cards: [],
  })
  const [showBack, setShowBack] = useState(false)
  const [finishedSession, setFinishedSession] = useState(false)
  const [answers, setAnswers] = useState({})

  const hasCards = currentReviewingDeck && currentReviewingDeck.cards.length > 0

  useEffect(() => {
    setCurrentCard(0)
    setCurrentReviewingDeck(decks[currentDeck])
    console.log('current reviewing deck', currentReviewingDeck)
  }, [currentDeck])

  const onAnswer = (difficulty) => {
    setAnswers({
      ...answers,
      [difficulty]: answers[difficulty] ? answers[difficulty] + 1 : 1,
    })
    updateStats(currentReviewingDeck.cards[currentReviewingCard], difficulty)
    if (currentReviewingDeck.cards.length - 1 >= currentReviewingCard + 1) {
      setShowBack(false)
      setCurrentReviewingCard(currentReviewingCard + 1)
    } else {
      setFinishedSession(true)
    }
  }

  const updateStats = (cardRef, result) => {
    console.log('update stats!', { cardRef, result })
    let card = cards[cardRef]
    const statistic = {
      reviewedDateTime: Date.now(),
      result: result,
    }

    if (card.stats && card.stats.length) {
      card.stats.push(statistic)
    } else {
      card.stats = [statistic]
    }
    card = {
      ref: cardRef,
      data: card,
    }
    updateCard(card)
  }

  const flipCard = () => {
    setShowBack(!showBack)
  }
  return (
    <div>
      <SessionHeader>
        <h1>{currentReviewingDeck.name}</h1>
        <h2>
          {currentReviewingCard + 1} / {currentReviewingDeck.cards.length}
        </h2>
      </SessionHeader>
      {hasCards && (
        <SessionContent>
          <Flashcard
            card={cards[currentReviewingDeck.cards[currentReviewingCard]]}
            reverse={showBack}
            onClick={flipCard}
          />
          {showBack && (
            <Answers>
              <AnswerButton onClick={() => onAnswer('hard')}>Hard</AnswerButton>
              <AnswerButton onClick={() => onAnswer('easy')}>Easy</AnswerButton>
            </Answers>
          )}
        </SessionContent>
      )}
      {finishedSession && (
        <SessionCompleteSection>
          <h2>Sesion Complete!</h2>
          <h3>Stats:</h3>
          <p>Cards reviewed: {currentReviewingCard + 1}</p>
          <p>Number of cards that were 'easy': {answers.easy}</p>
          <p>Number of cards that were 'hard': {answers.hard}</p>
          <button onClick={() => setCurrentDeck('')}>Exit</button>
        </SessionCompleteSection>
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
    setCurrentDeck: (deckRef) => dispatch(setCurrentDeck(deckRef)),
    setCurrentCard: (cardRef) => dispatch(setCurrentCard(cardRef)),
    updateCard: (card) => dispatch(updateCard(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudySession)
