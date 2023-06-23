import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGravatar } from '../redux/action';

class Feedback extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <img
          alt="img"
          src={ fetchGravatar(gravatarEmail) }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <textarea data-testid="feedback-text" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
