import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSecretWord, resetWord } from './actions'

export class UnconnectedResetButton extends Component {

  reset = () => {
    this.props.getSecretWord()
    this.props.resetWord()
  }
  
  render() {
    const contents = this.props.display
      ? (
        <button data-test="reset-button" onClick={this.reset} className="btn btn-danger mb-2">New Word</button>
      )
      : null
    return (
      <div data-test="component-reset">
        {contents}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { display } = state
  return { display }
}

const mapDispatchToProps = dispatch => {
  return {
    getSecretWord: () => dispatch(getSecretWord()),
    resetWord: () => dispatch(resetWord())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedResetButton);
