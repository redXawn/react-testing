import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import GuessedWords from './GuessedWords'
import Congrats from './Congrats'
import Input from './input'
import ResetButton from './NewWordButton'
import AddButton from './AddSecretWord'
import { getSecretWord, resetWord } from './actions'

export class UnconnectedApp extends Component {

  componentDidMount() {
    this.props.getSecretWord()
  }

  reset = () => {
    this.props.getSecretWord()
    this.props.resetWord()
  }

  render() {
    return (
      <div data-test="app-container" className="container">
        <h1>Jotto</h1>
        <h3>The secret word is {this.props.secretWord}</h3>
        <AddButton/>
        <Congrats success={this.props.success}/>
        <ResetButton/>
        <Input/>
        <GuessedWords guessedWords={this.props.guessedWords}/>
        <h3 data-test="app-guess-length">Total Guessess: {this.props.guessedWords.length}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state
  return { success, guessedWords, secretWord }
}

const mapDispatchToProps = dispatch => {
  return {
    getSecretWord: () => dispatch(getSecretWord()),
    resetWord: () => dispatch(resetWord())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);
