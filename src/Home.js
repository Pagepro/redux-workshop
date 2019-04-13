import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { setGameStart } from './actions'

const Home = props => {
  return (
    <div className='l-centered'>
      <Link
        className='c-start-link'
        to='/setup'
        onClick={props.setGameStart}
        >
        Start
      </Link>
      <h1>Jakubczyk</h1>
    </div>
  )
}

Home.propTypes = {
  setGameStart: PropTypes.func
}

export default connect(null, { setGameStart })(Home)
