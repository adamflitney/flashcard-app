import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllCards, getAllDecks } from '../../store/actions'
import Nav from '../../components/Nav'
import HomePage from '../HomePage'
import StudyPage from '../StudyPage'
import ManagePage from '../ManagePage'

function App({ getDecks, getCards }) {
  useEffect(() => {
    // Get All Data
    getCards()
    getDecks()
  }, [])

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/study'>
            <StudyPage />
          </Route>
          <Route path='/manage'>
            <ManagePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDecks: () => dispatch(getAllDecks()),
    getCards: () => dispatch(getAllCards()),
  }
}

export default connect(null, mapDispatchToProps)(App)
