import React, { Component } from 'react';

export default class Game extends Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt="img" />
        <p data-testid="header-player-name" />
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}
