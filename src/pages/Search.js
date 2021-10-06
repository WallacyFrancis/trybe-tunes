import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      showButton: false,
      loading: false,
      requestApi: false,
      artist: '',
      albuns: [],
      error: 'Nenhum álbum foi encontrado',
    };
    this.searchButton = this.searchButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showDiv = this.showDiv.bind(this);
    this.controlObject = this.controlObject.bind(this);
  }

  async handleClick() {
    const inputValue = document.getElementsByTagName('input')[0];
    this.setState({ loading: true, artist: inputValue.value, albuns: [] });
    const response = await searchAlbumsAPI(inputValue.value);
    this.setState({ showButton: false, loading: false, requestApi: true });
    this.controlObject(response);
    inputValue.value = '';
  }

  controlObject(objectName) {
    this.setState({ albuns: objectName });
  }

  searchButton(event) {
    const caracters = event.target.value;
    const LIMIT_NUM = 2;
    if (caracters.length >= LIMIT_NUM) {
      this.setState({ showButton: true });
    } else {
      this.setState({ showButton: false });
    }
  }

  showDiv() {
    const { requestApi } = this.state;
    if (requestApi) {
      return false;
    }
    return true;
  }

  render() {
    const { showButton, loading, requestApi, artist, albuns, error } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Carregando />
            : (
              <form>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  name="search-artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.searchButton }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ !showButton }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </form>
            )
        }

        <div>
          {
            requestApi
              ? (
                <div>
                  { albuns.length === 0 && loading === false ? error
                    : (
                      <span>
                        Resultado de álbuns de:
                        {' '}
                        { artist }
                      </span>
                    )}
                  { albuns.map((album) => (
                    <div key={ album.artistId }>
                      <h4>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          {album.collectionName}
                        </Link>
                      </h4>
                    </div>
                  ))}
                </div>
              )
              : ''
          }
        </div>
      </div>
    );
  }
}

export default Search;
