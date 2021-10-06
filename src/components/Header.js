import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../Carregando';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
    this.requestUser = this.requestUser.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  async requestUser() {
    const userName = await getUser();
    this.setState({ user: userName.name, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h3>TrybeTunes</h3>
        <span data-testid="header-user-name">{ loading ? <Carregando /> : user }</span>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <br />
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <br />
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
