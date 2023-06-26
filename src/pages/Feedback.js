import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGravatar } from '../redux/action';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const lowAssertions = 3;
    return (
      <header>
        <img
          alt="img"
          src={ fetchGravatar(gravatarEmail) }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <h2 data-testid="feedback-text">
          { assertions < lowAssertions
            ? <p>Could be better...</p> : <p>Well Done!</p> }

        </h2>
        <div className="status">
          <h1>Status:   </h1>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>

        </div>
        <textarea data-testid="feedback-text" />
        <button
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Play Again

        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Feedback);
