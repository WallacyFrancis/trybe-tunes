import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.verificaNumCaracter = this.verificaNumCaracter.bind(this);
    this.saveUserClick = this.saveUserClick.bind(this);
    this.state = {
      showButton: false,
      userName: '',
      loading: false,
      redirectPage: false,
    };
  }

  verificaNumCaracter(event) {
    const caracters = event.target.value;
    const LIMIT_NUM = 3;
    if (caracters.length >= LIMIT_NUM) {
      this.setState({ showButton: true });
    } else {
      this.setState(
        {
          showButton: false,
        },
      );
    }
    this.setState({ userName: caracters });
  }

  async saveUserClick() {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false, redirectPage: true });
  }

  render() {
    console.log(this.saveUserClick);
    const { showButton, loading, redirectPage } = this.state;

    if (redirectPage) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Nome:
            <input
              data-testid="login-name-input"
              name="login-name-input"
              id="login-name-input"
              type="text"
              onChange={ this.verificaNumCaracter }
            />
          </label>
          <button
            type="button"
            id="submit"
            data-testid="login-submit-button"
            disabled={ !showButton }
            onClick={ this.saveUserClick }
          >
            Entrar
          </button>
        </form>
        { loading ? <Carregando /> : '' }
      </div>
    );
  }
}

export default Login;
