import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Title</h1>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          {' '}
          Ínicio
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
};

export default connect()(Ranking);
