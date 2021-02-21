import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const CardRepresentation = styled.div`
  width: 200px;
  height: 300px;
  margin: 10px 50px;
  background-color: #999999;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`

const CardText = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
`

const flashcard = ({ cards, card, reverse, onClick }) => {
  console.log('card', card)
  return (
    <CardRepresentation onClick={onClick}>
      <CardText>
        {!reverse ? <p>{card.frontText}</p> : <p>{card.backText}</p>}
      </CardText>
    </CardRepresentation>
  )
}

const mapStateToProps = (state) => ({
  cards: state.cards.cards,
})

export default connect(mapStateToProps)(flashcard)
