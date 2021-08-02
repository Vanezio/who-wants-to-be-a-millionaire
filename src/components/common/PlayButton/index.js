import React from 'react';
import PropTypes from 'prop-types';
import './css/style.css';

const PlayButton = ({ text, changePageChild, funcValue }) => (
        <button className="play-button" onClick={() => { changePageChild(funcValue); }}>{text}</button>
);

PlayButton.propTypes = {
  text: PropTypes.string,
  changePageChild: PropTypes.func,
  funcValue: PropTypes.string,
};

export default PlayButton;
