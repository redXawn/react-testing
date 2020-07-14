import React, { Component } from 'react'
import { connect } from 'react-redux';

import { setSecretWord } from './actions'

export class AddSecretWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      toggleButton: false
    }
  }

  submitWord = () => {
    this.setState({
      toggleButton: false
    })
    this.props.setSecretWord(this.state.word)
  }

  render() {
    if (this.state.toggleButton) {
      return (
        <div>
          <input data-test="input-secret" value={this.state.word} onChange={e => this.setState({word: e.target.value})} className="mb-2 mx-sm-3" type="text" placeholder="enter secret word"/>
          <button data-test="submit-button" onClick={this.submitWord} className="btn btn-primary mb-2">Post Secret Word</button>
        </div>
      )
    } else {
      return (
        <button data-test="toggle-button" onClick={() => this.setState({toggleButton: true})} className="btn btn-primary mb-2">Input Secret Word</button>
        )
    }
  }
}

const mapStateToProps = ({ success }) => {
  return { success }
}

const mapDispatchToProps = dispatch => {
  return {
    setSecretWord: (payload) => dispatch(setSecretWord(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSecretWord)