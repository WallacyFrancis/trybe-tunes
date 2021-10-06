// Wallacy francis
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.requestMusic = this.requestMusic.bind(this);
    this.requestAlbumInfo = this.requestAlbumInfo.bind(this);
    this.state = {
      loading: false,
      tracks: [],
      error: false,
      errorMsg: '',
      artist: '',
      album: '',
    };
  }

  componentDidMount() {
    this.requestMusic();
  }

  async requestMusic() {
    this.setState({ loading: true });
    const URL = window.location.href;
    const id = URL.split('album/');
    try {
      const musics = await getMusics(id[1]);
      this.requestAlbumInfo(musics);
      return musics;
    } catch (e) {
      this.setState({
        error: true,
        errorMsg: `Ops! aconteceu um erro ${e}, recarregue sua página`,
        loading: false,
      });
    }
  }

  requestAlbumInfo(album) {
    const objToArr = Object.values(album);
    this.setState({
      artist: objToArr[0].artistName,
      album: objToArr[0].collectionName,
    });
    objToArr.shift();
    this.setState({
      tracks: objToArr,
      loading: false,
    });
  }

  render() {
    const { loading, tracks, error, errorMsg, album, artist } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Carregando /> : '' }
        { error ? errorMsg : ''}
        <h3 data-testid="album-name">{ album }</h3>
        <h4 data-testid="artist-name">{ artist }</h4>
        {
          tracks.map((music, index) => (
            <MusicCard
              key={ index }
              previewUrl={ music.collectionViewUrl }
              trackName={ music.artistViewUrl }
              number={ index + 1 }
              trackId={ music.trackId }
            />
          ))
        }
      </div>
    );
  }
}

export default Album;
