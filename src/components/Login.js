import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  buttonDisabled = () => {
    const { name, email } = this.state;
    return name && email;
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <input
          data-testid="input-player-name"
          onChange={ this.handleChange }
          type="text"
          name="name"
        />
        <input
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          type="email"
          name="email"
        />
        <button data-testid="btn-play" disabled={ !this.buttonDisabled() }>Play</button>
        <button onClick={ () => history.push('/settings') } data-testid="btn-settings">Settings</button>
      </div>
    );
  }
}
