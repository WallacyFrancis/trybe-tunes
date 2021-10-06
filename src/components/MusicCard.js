import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Carregando from '../Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const checkdValue = event.target.checked;
    if (checkdValue) {
      this.setState({ loading: true });
      const componetId = event.target.id;
      const requesMusic = await getMusics(componetId);
      await addSong(requesMusic[0]);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { trackName, previewUrl, number, trackId } = this.props;
    return (
      <div>
        <span>{ loading ? <Carregando /> : '' }</span>
        <section>
          <label
            data-testid={ `checkbox-music-${trackId}` }
            htmlFor={ trackId }
          >
            <span>
              Track Name
              {' '}
              {number}
            </span>
            <br />
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>{ trackName }</code>
            </audio>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              name="checkbox-music"
              onChange={ this.handleChange }
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default MusicCard;
