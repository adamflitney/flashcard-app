import React from 'react'
import styled from 'styled-components'

const DeckRepresentation = styled.div`
  width: 200px;
  height: 300px;
  background-color: #999999;
  border-radius: 10px;
`

export default function deck({ deck, onClick }) {
  return (
    <DeckRepresentation onClick={onClick}>
      <h2>{deck.name}</h2>
    </DeckRepresentation>
  )
}
