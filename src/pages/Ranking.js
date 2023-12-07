import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGravatar } from '../redux/action';

class Ranking extends Component {
  componentDidMount() {
    this.addPlayer();
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  savePlayersToLocalStorage = (players) => {
    localStorage.setItem('players', JSON.stringify(players));
  };

  addPlayer = () => {
    const { name, assertions, score, gravatarEmail } = this.props;
    console.log(name, assertions, score, gravatarEmail);
    const currentPlayer = { name, assertions, score, gravatarEmail };

    const existingPlayers = JSON.parse(localStorage.getItem('players')) || [];

    const updatedPlayers = [...existingPlayers, currentPlayer];

    updatedPlayers.sort((a, b) => b.score - a.score);

    this.savePlayersToLocalStorage(updatedPlayers);
    this.forceUpdate();
  };

  render() {
    const { gravatarEmail } = this.props;
    const players = JSON.parse(localStorage.getItem('players')) || [];
    console.log(players);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Title</h1>

        <div>
          <ul>
            {players && players.map((player, index) => (
              <li key={ index }>
                <div className="div-ranking">
                  <img src={ fetchGravatar(gravatarEmail) } alt={ player.name } />
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          {' '}
          Voltar para o Inicio
          {' '}
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Ranking);
