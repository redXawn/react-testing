import React, { Component } from 'react';
import { connect } from 'react-redux'

import { guessWord, giveUp } from './actions/index'

export class UnconnectInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGuess: ''
    }
  }

  setWord = (e) => {
    this.setState({
      currentGuess: e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault()
    this.props.guessWord(this.state.currentGuess)
    this.setState({currentGuess: ''})
  }

  giveup= (e) => {
    e.preventDefault()
    this.props.giveUp()
  }
  
  render() {
    let contents
    if (!this.props.success && !this.props.display) {
      contents = (
        <form className="form-inline">
          <input data-test="input-box" value={this.state.currentGuess} onChange={e => this.setState({currentGuess: e.target.value})} className="mb-2 mx-sm-3" type="text" placeholder="enter guess"/>
          <button data-test="submit-button" onClick={this.submit} className="btn btn-primary mb-2">Submit</button>
          {
            this.props.guessedWords.length > 0 ? 
            (
              <button data-test="giveup-button" onClick={this.giveup} className="btn btn-danger mb-2">Give Up</button>
            )
            :
            null
          }
        </form>
      )
    } else if (this.props.display) {
      contents = (
        <h1 data-test="giveup-text">The secret word was {this.props.secretWord}</h1>
      )
    }
    return (
      <div data-test="component-input">
        {contents}
      </div>
    )
  }
}

const mapStateToProps = ({ success, display, secretWord, guessedWords }) => {
  return { success, display, secretWord, guessedWords }
}

const mapDispatchToProps = dispatch => {
  return {
    guessWord: (payload) => dispatch(guessWord(payload)),
    giveUp: () => dispatch(giveUp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectInput)