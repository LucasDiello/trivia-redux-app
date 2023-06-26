import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Title</h1>
      </div>
    );
  }
}

export default connect()(Ranking);
