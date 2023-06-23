import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailLogin, fetchToken, nameLogin } from '../redux/action';

class Login extends Component {
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

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(nameLogin(name));
    dispatch(emailLogin(email));
    history.push('/game');
  };

  render() {
    const { history, dispatch } = this.props;
    dispatch(fetchToken());

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
        <button
          onClick={ this.handleClick }
          data-testid="btn-play"
          disabled={ !this.buttonDisabled() }
        >
          Play
        </button>
        <button
          onClick={ () => history.push('/settings') }
          data-testid="btn-settings"
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
