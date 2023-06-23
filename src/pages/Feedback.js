import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Feedback);
